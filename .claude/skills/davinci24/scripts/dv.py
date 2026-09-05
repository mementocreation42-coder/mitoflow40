#!/usr/bin/env python3
"""DaVinci24 — 受付から引き継ぎ書までを 2 コマンドに畳む CLI。

  python3 scripts/dv.py prep   <source...> [--name 氏名] [--date YYYYMMDD] [--sex 男性|女性] [--memo テキスト]
  python3 scripts/dv.py finish <inputs/氏名_日付> [--sex 男性|女性] [--tested-at YYYY-MM-DD] [--rename]
  python3 scripts/dv.py tiles  <inputs/氏名_日付> [--file blood1.jpg] [--rotate 90|180|270]
  python3 scripts/dv.py health-index <export.xml> <out.json>

prep   … どこにあるデータでも（フォルダ／画像／PDF／CSV／Apple Health export.xml）inputs/<氏名_日付>/ に整える。
         画像は EXIF 補正して拡大タイルを outputs/<f>/tiles/ に作る（Claude はタイルを読む）。
         Apple Health は 1 回だけ日別に索引化（~/.cache/davinci24/ にキャッシュ）し、以後の期間切り出しは瞬時。
finish … Claude が書いた outputs/<f>/extracted.json を judge.ts で判定し、デバイス要約（検査日前後＋最新の窓）、
         intake.md の骨組み（三角測量の種だけ空欄）まで自動生成する。
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
from collections import defaultdict
from datetime import date, datetime, timedelta
from pathlib import Path
from statistics import mean, median

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent                      # .claude/skills/davinci24
INPUTS = ROOT / "inputs"
OUTPUTS = ROOT / "outputs"
CACHE = Path.home() / ".cache" / "davinci24"

IMG_EXT = {".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif", ".tif", ".tiff"}
DOC_EXT = {".pdf"}
CSV_EXT = {".csv", ".txt"}
DEVICE_HINT = re.compile(r"watch|apple|oura|garmin|fitbit|whoop|hrv|sleep|睡眠|血圧|体組成|体重|glucose|libre|cgm|health|device|apple_watch", re.I)
SKIP_NAME = re.compile(r"^(\._|\.DS_Store|Thumbs\.db)")


def log(msg: str = "") -> None:
    print(msg, flush=True)


def sha1(path: Path) -> str:
    h = hashlib.sha1()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def read_meta(dir_: Path) -> dict[str, str]:
    p = dir_ / "meta.txt"
    if not p.exists():
        return {}
    out: dict[str, str] = {}
    for line in p.read_text(encoding="utf-8").splitlines():
        m = re.match(r"^([^:：]+)[:：]\s*(.*)$", line)
        if m:
            out[m.group(1).strip()] = m.group(2).strip()
    return out


def write_meta(dir_: Path, meta: dict[str, str]) -> None:
    order = ["氏名", "カナ", "メール", "性別", "生年月日", "年齢", "検査日", "検査機関", "主訴", "clientId", "提出", "備考"]
    keys = order + [k for k in meta if k not in order]
    lines = [f"{k}: {meta.get(k, '')}" for k in keys if k in meta or k in ("氏名", "性別", "検査日", "備考")]
    (dir_ / "meta.txt").write_text("\n".join(lines) + "\n", encoding="utf-8")


def normalize_sex(s: str | None) -> str:
    if not s:
        return ""
    s = s.strip().lower()
    if s in ("male", "m", "男", "男性"):
        return "男性"
    if s in ("female", "f", "女", "女性"):
        return "女性"
    return s


def sex_flag(sex: str) -> str:
    return "female" if normalize_sex(sex) == "女性" else "male"


# ───────────────────────── 画像 ─────────────────────────

def exif_date(path: Path) -> str | None:
    """写真の撮影日（YYYYMMDD）。無ければ None"""
    try:
        from PIL import Image
        with Image.open(path) as im:
            exif = im.getexif()
            for tag in (36867, 306):  # DateTimeOriginal, DateTime
                v = exif.get(tag)
                if v:
                    return str(v)[:10].replace(":", "")
    except Exception:
        pass
    return None


def normalize_image(src: Path, dst: Path) -> None:
    """EXIF の向きを反映した JPEG として保存（HEIC は sips で JPEG 化してから）"""
    from PIL import Image, ImageOps
    work = src
    if src.suffix.lower() in (".heic", ".heif"):
        tmp = dst.with_suffix(".tmp.jpg")
        subprocess.run(["sips", "-s", "format", "jpeg", "-s", "formatOptions", "92", str(src), "--out", str(tmp)], check=True, capture_output=True)
        work = tmp
    with Image.open(work) as im:
        im = ImageOps.exif_transpose(im)
        if im.mode not in ("RGB", "L"):
            im = im.convert("RGB")
        im.save(dst, "JPEG", quality=92)
    if work != src:
        work.unlink(missing_ok=True)


def blood_images(dir_: Path) -> list[Path]:
    """タイル化する血液票の画像。Inbox は PNG/WebP のまま保存するので jpg 以外も拾う"""
    return sorted(p for p in dir_.glob("blood*") if p.suffix.lower() in (".jpg", ".jpeg", ".png", ".webp"))


def make_tiles(img: Path, out_dir: Path, rotate: int = 0) -> list[Path]:
    """読み取り用タイル：全体（長辺2000px）＋ 2×2 の四分割（各長辺2400px）。回転は 90/180/270"""
    from PIL import Image
    out_dir.mkdir(parents=True, exist_ok=True)
    stem = img.stem
    for old in out_dir.glob(f"{stem}_*.jpg"):
        old.unlink()
    made: list[Path] = []
    with Image.open(img) as im:
        if rotate:
            im = im.rotate(-rotate, expand=True)  # PIL は反時計回りが正なので符号を反転
        w, h = im.size
        full = im.copy()
        full.thumbnail((2000, 2000))
        p = out_dir / f"{stem}_full.jpg"
        full.save(p, "JPEG", quality=88)
        made.append(p)
        boxes = {
            "tl": (0, 0, w // 2 + w // 20, h // 2 + h // 20),
            "tr": (w // 2 - w // 20, 0, w, h // 2 + h // 20),
            "bl": (0, h // 2 - h // 20, w // 2 + w // 20, h),
            "br": (w // 2 - w // 20, h // 2 - h // 20, w, h),
        }
        for key, box in boxes.items():
            tile = im.crop(box)
            tile.thumbnail((2400, 2400))
            p = out_dir / f"{stem}_{key}.jpg"
            tile.save(p, "JPEG", quality=90)
            made.append(p)
    return made


# ───────────────────────── Apple Health 索引 ─────────────────────────

NUMERIC_TYPES = {
    "HKQuantityTypeIdentifierHeartRateVariabilitySDNN": "hrv",
    "HKQuantityTypeIdentifierRestingHeartRate": "rhr",
    "HKQuantityTypeIdentifierHeartRate": "hr",
    "HKQuantityTypeIdentifierVO2Max": "vo2max",
    "HKQuantityTypeIdentifierStepCount": "steps",
    "HKQuantityTypeIdentifierActiveEnergyBurned": "active_kcal",
    "HKQuantityTypeIdentifierAppleExerciseTime": "exercise_min",
    "HKQuantityTypeIdentifierBodyMass": "weight",
    "HKQuantityTypeIdentifierBodyFatPercentage": "body_fat",
    "HKQuantityTypeIdentifierOxygenSaturation": "spo2",
    "HKQuantityTypeIdentifierRespiratoryRate": "resp",
    "HKQuantityTypeIdentifierBloodPressureSystolic": "bp_sys",
    "HKQuantityTypeIdentifierBloodPressureDiastolic": "bp_dia",
    "HKQuantityTypeIdentifierBloodGlucose": "glucose",
}
SUM_TYPES = {"steps", "active_kcal", "exercise_min"}
SLEEP_STAGE = {
    "HKCategoryValueSleepAnalysisInBed": "in_bed",
    "HKCategoryValueSleepAnalysisAsleepUnspecified": "asleep",
    "HKCategoryValueSleepAnalysisAsleepCore": "core",
    "HKCategoryValueSleepAnalysisAsleepDeep": "deep",
    "HKCategoryValueSleepAnalysisAsleepREM": "rem",
    "HKCategoryValueSleepAnalysisAwake": "awake",
}


def _parse_dt(s: str) -> datetime:
    return datetime.strptime(s[:19], "%Y-%m-%d %H:%M:%S")


def _merge_seconds(intervals: list[tuple[datetime, datetime]]) -> float:
    """重なる区間を統合して合計秒（iPhone と Watch の二重記録を数えない）"""
    if not intervals:
        return 0.0
    intervals.sort()
    total = 0.0
    cs, ce = intervals[0]
    for s, e in intervals[1:]:
        if s <= ce:
            ce = max(ce, e)
        else:
            total += (ce - cs).total_seconds()
            cs, ce = s, e
    total += (ce - cs).total_seconds()
    return total


def build_health_index(xml_path: Path, out_path: Path) -> dict:
    import xml.etree.ElementTree as ET
    samples: dict[str, dict[str, list[float]]] = defaultdict(lambda: defaultdict(list))
    sleep: dict[str, dict[str, list[tuple[datetime, datetime]]]] = defaultdict(lambda: defaultdict(list))
    first = last = None
    export_date = None
    for _, el in ET.iterparse(str(xml_path), events=("end",)):
        if el.tag == "ExportDate":
            export_date = el.get("value", "")[:10]
            continue
        if el.tag != "Record":
            continue
        rtype = el.get("type", "")
        try:
            start = _parse_dt(el.get("startDate", ""))
            end = _parse_dt(el.get("endDate", ""))
        except Exception:
            el.clear()
            continue
        first = start if first is None or start < first else first
        last = start if last is None or start > last else last
        if rtype == "HKCategoryTypeIdentifierSleepAnalysis":
            stage = SLEEP_STAGE.get(el.get("value", ""))
            if stage:
                night = (end - timedelta(hours=12)).date().isoformat()  # 起床日の前夜に寄せる
                sleep[night][stage].append((start, end))
        elif rtype in NUMERIC_TYPES:
            try:
                v = float(el.get("value", ""))
            except ValueError:
                el.clear()
                continue
            key = NUMERIC_TYPES[rtype]
            if key == "spo2" and v <= 1.0:
                v *= 100
            samples[start.date().isoformat()][key].append(v)
        el.clear()

    days: dict[str, dict[str, float]] = {}
    for d, metrics in samples.items():
        row: dict[str, float] = {}
        for k, vals in metrics.items():
            if k in SUM_TYPES:
                row[k] = round(sum(vals), 1)
            else:
                row[k] = round(mean(vals), 2)
                if k in ("hrv", "hr"):
                    row[k + "_median"] = round(median(vals), 2)
                    row[k + "_n"] = len(vals)
                if k == "hr":
                    row["hr_max"] = round(max(vals), 0)
        days[d] = row
    nights: dict[str, dict[str, float]] = {}
    for night, stages in sleep.items():
        row = {st: round(_merge_seconds(iv) / 3600, 2) for st, iv in stages.items()}
        asleep_iv = [iv for st in ("asleep", "core", "deep", "rem") for iv in stages.get(st, [])]
        row["asleep_total"] = round(_merge_seconds(asleep_iv) / 3600, 2)
        nights[night] = row
    index = {
        "source": str(xml_path), "exportDate": export_date,
        "range": [first.date().isoformat() if first else None, last.date().isoformat() if last else None],
        "days": dict(sorted(days.items())), "nights": dict(sorted(nights.items())),
    }
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(index, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    return index


def cached_health_index(xml_path: Path) -> Path:
    CACHE.mkdir(parents=True, exist_ok=True)
    st = xml_path.stat()
    key = hashlib.sha1(f"{xml_path.resolve()}|{st.st_size}|{int(st.st_mtime)}".encode()).hexdigest()[:16]
    out = CACHE / f"apple_health_{key}.json"
    if not out.exists():
        log(f"  Apple Health を索引化中（初回のみ・{st.st_size // 1_000_000}MB）…")
        build_health_index(xml_path, out)
    return out


def summarize_window(index: dict, start: date, end: date) -> dict:
    days = {d: r for d, r in index["days"].items() if start.isoformat() <= d <= end.isoformat()}
    nights = {d: r for d, r in index["nights"].items() if start.isoformat() <= d <= end.isoformat()}

    def agg(key: str, how: str = "mean") -> tuple[float | None, int]:
        vals = [r[key] for r in days.values() if key in r]
        if not vals:
            return None, 0
        return (round(mean(vals), 1) if how == "mean" else round(median(vals), 1)), len(vals)

    out = {"start": start.isoformat(), "end": end.isoformat(), "days": len(days), "nights": len(nights)}
    for k in ("hrv", "rhr", "resp", "spo2", "vo2max", "steps", "active_kcal", "exercise_min", "weight", "body_fat", "bp_sys", "bp_dia", "glucose"):
        v, n = agg(k)
        if v is not None:
            out[k] = v
            out[k + "_n"] = n
    hrv_med = [r["hrv_median"] for r in days.values() if "hrv_median" in r]
    if hrv_med:
        out["hrv_median"] = round(median(hrv_med), 1)
    hr_max = [r["hr_max"] for r in days.values() if "hr_max" in r]
    if hr_max:
        out["hr_max"] = round(max(hr_max))
    for st in ("asleep_total", "in_bed", "deep", "rem", "core", "awake"):
        vals = [r[st] for r in nights.values() if st in r]
        if vals:
            out["sleep_" + st] = round(mean(vals), 2)
            out["sleep_" + st + "_median"] = round(median(vals), 2)
    totals = sorted(r["asleep_total"] for r in nights.values() if "asleep_total" in r)
    if totals:
        out["sleep_short_nights"] = sum(1 for t in totals if t < 5.5)
        out["sleep_min"] = totals[0]
        out["sleep_max"] = totals[-1]
    return out


def fmt_value(v: float, unit: str) -> str:
    """judge.ts が /μL に桁補正した値（4870000 /μL）は「487 万/μL」で見せる"""
    if unit and "μL" in unit and abs(v) >= 100000:
        return f"{v / 10000:g} 万{unit}"
    return f"{v:g}{(' ' + unit) if unit else ''}"


def fmt(v: float | None, unit: str = "", nd: int = 1) -> str:
    if v is None:
        return "—"
    return f"{v:.{nd}f}{unit}" if isinstance(v, float) else f"{v}{unit}"


def device_block(index: dict, windows: list[tuple[str, dict]], other_files: list[str], source_note: str) -> str:
    rng = index.get("range", [None, None])
    lines = [f"# デバイス正規化（Apple Health 書き出し {rng[0]}〜{rng[1]}・export {index.get('exportDate')}）",
             f"デバイス: Apple Watch ＋ iPhone ヘルスケア（機種は書き出しからは不明）", f"出典: {source_note}", ""]
    head = "| 指標 | " + " | ".join(label for label, _ in windows) + " |"
    sep = "|---|" + "---|" * len(windows)

    def row(label: str, key: str, unit: str = "", nd: int = 1, extra: str | None = None) -> str:
        cells = []
        for _, w in windows:
            v = w.get(key)
            s = fmt(v, unit, nd)
            if extra and w.get(extra) is not None:
                s += f"（中央値 {fmt(w.get(extra), unit, nd)}）"
            cells.append(s)
        return f"| {label} | " + " | ".join(cells) + " |"

    def has_any(*keys: str) -> bool:
        return any(w.get(k) is not None for _, w in windows for k in keys)

    lines += ["【睡眠】", head, sep,
              row("睡眠時間（平均）", "sleep_asleep_total", "h", 2, "sleep_asleep_total_median"),
              row("在床", "sleep_in_bed", "h", 2), row("深い睡眠", "sleep_deep", "h", 2), row("REM", "sleep_rem", "h", 2),
              row("コア", "sleep_core", "h", 2), row("覚醒", "sleep_awake", "h", 2)]
    lines.append("| 5.5h 未満の夜 | " + " | ".join(f"{w.get('sleep_short_nights', '—')} 夜／{w.get('nights', 0)} 夜" for _, w in windows) + " |")
    lines.append("| 最短〜最長 | " + " | ".join(f"{fmt(w.get('sleep_min'), 'h', 1)}〜{fmt(w.get('sleep_max'), 'h', 1)}" for _, w in windows) + " |")
    if has_any("hrv", "rhr", "resp", "spo2"):
        lines += ["", "【自律神経・回復】", head, sep,
                  row("HRV (SDNN)", "hrv", " ms", 1, "hrv_median"), row("安静時心拍", "rhr", " bpm", 1), row("呼吸数", "resp", " /分", 1), row("SpO2", "spo2", " %", 1)]
    if has_any("vo2max", "hr_max"):
        lines += ["", "【心肺・体力】", head, sep, row("VO2max", "vo2max", " mL/kg/min", 1), row("最大心拍（記録）", "hr_max", " bpm", 0)]
    if has_any("steps", "active_kcal", "exercise_min"):
        lines += ["", "【活動】", head, sep, row("歩数/日", "steps", " 歩", 0), row("活動エネルギー/日", "active_kcal", " kcal", 0), row("エクササイズ/日", "exercise_min", " 分", 0)]
    if has_any("bp_sys", "bp_dia"):
        lines += ["", "【血圧】", head, sep, row("収縮期", "bp_sys", " mmHg", 0), row("拡張期", "bp_dia", " mmHg", 0)]
    if has_any("weight", "body_fat"):
        lines += ["", "【体組成】", head, sep, row("体重", "weight", " kg", 1), row("体脂肪率", "body_fat", " %", 1)]
    if has_any("glucose"):
        lines += ["", "【血糖（CGM）】", head, sep, row("平均血糖", "glucose", " mg/dL", 0)]
    absent = [n for n, ks in (("血圧", ("bp_sys",)), ("体組成", ("weight", "body_fat")), ("血糖（CGM）", ("glucose",))) if not has_any(*ks)]
    lines += ["", "【正規化メモ】",
              "- 窓の日数: " + " ／ ".join(f"{label} {w['days']} 日（睡眠 {w['nights']} 夜）" for label, w in windows),
              "- 睡眠は iPhone と Watch の重複区間を統合して集計（二重計上なし）。夜は起床日の前夜に寄せている",
              "- 「—」はその窓にデータなし" + (f"。書き出しに無いカテゴリ: {'・'.join(absent)}" if absent else "")]
    if other_files:
        lines.append("- 未正規化のデバイスファイル（Claude が読んで追記）: " + ", ".join(other_files))
    return "\n".join(lines) + "\n"


# ───────────────────────── prep ─────────────────────────

def classify(path: Path) -> str | None:
    if SKIP_NAME.match(path.name):
        return None
    ext = path.suffix.lower()
    if path.name == "export.xml":
        return "health"
    if ext in IMG_EXT or ext in DOC_EXT:
        return "device" if DEVICE_HINT.search(str(path)) else "blood"
    if ext in CSV_EXT and not path.name.startswith(("meta", "counseling", "感覚メモ", "README", "apple_health_")):
        return "device" if DEVICE_HINT.search(str(path)) or ext == ".csv" else None
    return None


def collect(sources: list[str]) -> tuple[list[tuple[Path, str]], Path | None]:
    files: list[tuple[Path, str]] = []
    meta_src: Path | None = None
    for s in sources:
        p = Path(s).expanduser()
        if not p.exists():
            log(f"  ⚠ 見つかりません: {p}")
            continue
        if p.is_dir():
            if (p / "meta.txt").exists():
                meta_src = p
            # Apple Health の書き出しフォルダ（export.xml がある階層）は export.xml だけ取る。
            # electrocardiograms/*.csv や workout-routes/*.gpx は素材ではなく書き出しの付属物
            export_dirs = {q.parent for q in p.rglob("export.xml")}
            for q in sorted(p.rglob("*")):
                if not q.is_file() or len(q.relative_to(p).parts) > 4:
                    continue
                if any(d == q.parent or d in q.parents for d in export_dirs) and q.name != "export.xml":
                    continue
                k = classify(q)
                if k:
                    files.append((q, k))
        else:
            k = classify(p) or ("health" if p.name.endswith(".xml") else "blood")
            files.append((p, k))
    return files, meta_src


def next_index(dir_: Path, prefix: str) -> int:
    nums = [int(m.group(1)) for f in dir_.glob(f"{prefix}*") if (m := re.match(rf"{prefix}(\d+)", f.name))]
    return (max(nums) if nums else 0) + 1


def cmd_prep(a: argparse.Namespace) -> int:
    files, meta_src = collect(a.source)
    src_meta = read_meta(meta_src) if meta_src else {}
    name = (a.name or src_meta.get("氏名") or "").replace("/", "").strip()
    sex = normalize_sex(a.sex or src_meta.get("性別"))
    date_s = (a.date or src_meta.get("検査日", "").replace("-", "")[:8] or "")
    blood_files = [p for p, k in files if k == "blood"]
    if not date_s and blood_files:
        date_s = exif_date(blood_files[0]) or ""
    if not date_s:
        date_s = datetime.now().strftime("%Y%m%d")
    if not name:
        name = "未確定"
    folder = f"{name}_{date_s}"
    dir_ = INPUTS / folder
    out = OUTPUTS / folder
    (dir_ / "device").mkdir(parents=True, exist_ok=True)
    out.mkdir(parents=True, exist_ok=True)

    meta = read_meta(dir_)
    meta.update({k: v for k, v in src_meta.items() if v})
    meta["氏名"] = name
    if sex:
        meta["性別"] = sex
    meta.setdefault("検査日", f"{date_s[:4]}-{date_s[4:6]}-{date_s[6:]}" if len(date_s) == 8 else date_s)
    srcs = "; ".join(str(Path(s).expanduser()) for s in a.source)
    if srcs not in meta.get("備考", ""):
        meta["備考"] = (meta.get("備考", "") + (" ／ " if meta.get("備考") else "") + f"dv prep から取り込み: {srcs}").strip()
    write_meta(dir_, meta)
    if a.memo:
        memo_path = dir_ / "感覚メモ.txt"
        existed = memo_path.exists() and memo_path.read_text(encoding="utf-8").strip() != ""
        if not existed or a.memo.strip() not in memo_path.read_text(encoding="utf-8"):
            with open(memo_path, "a", encoding="utf-8") as f:
                f.write(("\n\n--- 追記 " + datetime.now().strftime("%Y-%m-%d %H:%M") + " ---\n" if existed else "") + a.memo.strip() + "\n")

    existing = {sha1(p) for p in list(dir_.glob("blood*")) + list((dir_ / "device").glob("*")) if p.is_file()}
    added = {"blood": [], "device": [], "health": []}
    skipped = 0
    for p, kind in files:
        if kind == "health":
            idx = cached_health_index(p)
            shutil.copy(idx, dir_ / "device" / "apple_health_index.json")
            (dir_ / "device" / "apple_health_source.txt").write_text(f"{p}\n", encoding="utf-8")
            added["health"].append(str(p))
            continue
        if sha1(p) in existing:
            skipped += 1
            continue
        ext = p.suffix.lower()
        if kind == "blood":
            i = next_index(dir_, "blood")
            if ext in IMG_EXT:
                dst = dir_ / f"blood{i}.jpg"
                normalize_image(p, dst)
            else:
                dst = dir_ / f"blood{i}{ext}"
                shutil.copy(p, dst)
            added["blood"].append(dst.name)
        else:
            i = next_index(dir_ / "device", "device")
            if ext in IMG_EXT:
                dst = dir_ / "device" / f"device{i}.jpg"
                normalize_image(p, dst)
            else:
                dst = dir_ / "device" / f"device{i}{ext}"
                shutil.copy(p, dst)
            added["device"].append(dst.name)

    # タイル（全ての blood 画像）
    tiles: list[Path] = []
    for img in blood_images(dir_):
        tiles += make_tiles(img, out / "tiles", a.rotate)
    # extracted.json の雛形（無ければ）
    ex = out / "extracted.json"
    if not ex.exists():
        ex.write_text(json.dumps({"subject": name, "testedAt": None, "lab": None, "note": "", "items": [], "nonNumeric": {}}, ensure_ascii=False, indent=2), encoding="utf-8")

    log(f"✅ inputs/{folder}/  （氏名 {name} ／ 性別 {sex or '未設定'} ／ 検査日 {meta['検査日']}）")
    log(f"  血液票: 追加 {len(added['blood'])}（{', '.join(added['blood']) or 'なし'}）／ デバイス: 追加 {len(added['device'])}"
        + (f" ／ Apple Health 索引化 {len(added['health'])}" if added["health"] else "") + (f" ／ 重複スキップ {skipped}" if skipped else ""))
    if (dir_ / "device" / "apple_health_index.json").exists():
        idx = json.loads((dir_ / "device" / "apple_health_index.json").read_text())
        log(f"  Apple Health: {idx['range'][0]}〜{idx['range'][1]}（{len(idx['days'])} 日・睡眠 {len(idx['nights'])} 夜）→ finish で検査日前後の窓を自動集計")
    pdfs = [p.name for p in dir_.glob("blood*.pdf")]
    log("")
    log("次にやること：")
    log(f"  1. タイルを Read する（{len(tiles)} 枚）:")
    for t in tiles:
        log(f"     {t}")
    for p in pdfs:
        log(f"     {dir_ / p}（PDF はそのまま Read）")
    log(f"  2. {ex} に items を書く（まず *_full.jpg で向きを確認。文字が横向きなら: python3 scripts/dv.py tiles inputs/{folder} --rotate 90 で四分割を作り直してから読む）")
    log(f"  3. python3 scripts/dv.py finish inputs/{folder}" + (f" --sex {sex}" if sex else " --sex 男性|女性") + " [--tested-at YYYY-MM-DD --rename]")
    return 0


def cmd_tiles(a: argparse.Namespace) -> int:
    dir_ = Path(a.folder).expanduser()
    if not dir_.is_absolute():
        dir_ = ROOT / dir_
    out = OUTPUTS / dir_.name / "tiles"
    imgs = [dir_ / a.file] if a.file else blood_images(dir_)
    for img in imgs:
        made = make_tiles(img, out, a.rotate)
        log(f"{img.name}: {len(made)} 枚（回転 {a.rotate}°）")
        for t in made:
            log(f"  {t}")
    return 0


def _norm_label(s: str) -> str:
    return re.sub(r"[\s（）()\[\]・･\-–—/／]", "", s).lower()


def raw_if_informative(label: str, raw: str | None) -> str:
    """票の表記が Mitoflow 名の別表記に過ぎないなら省く。「随時」「食後」など条件が付くときだけ添える"""
    if not raw:
        return ""
    a, b = _norm_label(label), _norm_label(raw)
    if a == b or a in b or b in a:
        return ""
    return raw


# ───────────────────────── finish ─────────────────────────

def cmd_finish(a: argparse.Namespace) -> int:
    dir_ = Path(a.folder).expanduser()
    if not dir_.is_absolute():
        dir_ = ROOT / dir_
    if not dir_.exists():
        log(f"❌ フォルダがありません: {dir_}")
        return 1
    folder = dir_.name
    out = OUTPUTS / folder
    out.mkdir(parents=True, exist_ok=True)
    meta = read_meta(dir_)
    sex = normalize_sex(a.sex or meta.get("性別"))
    if not sex:
        log("❌ 性別が分かりません。--sex 男性|女性 を付けてください（判定基準が変わります）")
        return 1
    ex_path = out / "extracted.json"
    if not ex_path.exists():
        log(f"❌ {ex_path} がありません。先に血液票を読んで items を書いてください")
        return 1
    ex = json.loads(ex_path.read_text(encoding="utf-8"))
    if not ex.get("items"):
        log("❌ extracted.json の items が空です")
        return 1

    # 検査日の確定 → 必要ならフォルダ名を直す
    tested = a.tested_at or ex.get("testedAt") or meta.get("検査日")
    if tested and re.match(r"^\d{4}-\d{2}-\d{2}$", tested):
        meta["検査日"] = tested
        want = f"{folder.rsplit('_', 1)[0]}_{tested.replace('-', '')}"
        if want != folder and a.rename:
            for base in (INPUTS, OUTPUTS):
                if (base / folder).exists() and not (base / want).exists():
                    (base / folder).rename(base / want)
            folder, dir_, out = want, INPUTS / want, OUTPUTS / want
            ex_path = out / "extracted.json"
            log(f"  フォルダ名を検査日に合わせました → {folder}")
    if sex:
        meta["性別"] = sex
    write_meta(dir_, meta)

    # 1) 判定
    r = subprocess.run(["node", "--no-warnings", str(HERE / "judge.ts"), str(ex_path), "--sex", sex_flag(sex)], capture_output=True, text=True)
    if r.returncode != 0:
        log("❌ judge.ts が失敗:\n" + r.stderr[-2000:])
        return 1
    judged = json.loads((out / "judged.json").read_text(encoding="utf-8"))
    report_md = (out / "report.md").read_text(encoding="utf-8")

    # 2) デバイス
    device_files = [p.name for p in sorted((dir_ / "device").glob("*")) if p.is_file() and not p.name.startswith("apple_health_") and not SKIP_NAME.match(p.name)]
    device_txt = ""
    idx_path = dir_ / "device" / "apple_health_index.json"
    if idx_path.exists():
        index = json.loads(idx_path.read_text(encoding="utf-8"))
        windows: list[tuple[str, dict]] = []
        if tested:
            t = date.fromisoformat(tested)
            windows.append((f"検査日前後 {t - timedelta(days=30)}〜{t + timedelta(days=14)}", summarize_window(index, t - timedelta(days=30), t + timedelta(days=14))))
        if index["range"][1]:
            last = date.fromisoformat(index["range"][1])
            windows.append((f"最新 {last - timedelta(days=30)}〜{last}", summarize_window(index, last - timedelta(days=30), last)))
        src_note = (dir_ / "device" / "apple_health_source.txt").read_text().strip() if (dir_ / "device" / "apple_health_source.txt").exists() else "apple_health_index.json"
        device_txt = device_block(index, windows, device_files, src_note)
    elif device_files:
        device_txt = "# デバイス正規化（未正規化）\n未正規化のデバイスファイル（Claude が読んで reference/device_format.md の形式で追記）: " + ", ".join(device_files) + "\n"
    if device_txt:
        (out / "device_data.txt").write_text(device_txt, encoding="utf-8")

    # 3) カウンセリング・感覚メモ
    counseling_raw = ""
    if (dir_ / "counseling.txt").exists():
        counseling_raw = (dir_ / "counseling.txt").read_text(encoding="utf-8").strip()
    counseling_imgs = [p.name for p in sorted(dir_.glob("counseling*")) if p.is_file() and p.name != "counseling.txt"]
    memo = (dir_ / "感覚メモ.txt").read_text(encoding="utf-8").strip() if (dir_ / "感覚メモ.txt").exists() else ""

    # 4) intake.md の骨組み
    rows = judged.get("rows", [])
    prev = (ex.get("previous") or {})
    prev_items = prev.get("items") or {}
    marks = {"red": "🔴", "yellow": "🟡", "green": "🟢"}
    flagged = [r for r in rows if r.get("light") in ("red", "yellow")]
    meta_line = " ／ ".join(f"{k}: {v}" for k, v in meta.items() if v and k not in ("備考",))
    lines = [f"# DaVinci24 Intake — {meta.get('氏名', ex.get('subject', ''))}（{tested or '検査日不明'}）", "",
             "## メタ", meta_line, (f"検査機関（票の表記）: {ex['lab']}" if ex.get("lab") and ex["lab"] not in meta.get("検査機関", "") else ""),
             (f"採血条件など: {ex['note']}" if ex.get("note") else ""), (f"備考: {meta['備考']}" if meta.get("備考") else ""), "",
             "## 血液（🔴🟡🟢）",
             f"{len(rows)} 項目 ・ 🟢 {sum(1 for r in rows if r.get('light') == 'green')} ・ 🟡 {sum(1 for r in rows if r.get('light') == 'yellow')} ・ 🔴 {sum(1 for r in rows if r.get('light') == 'red')}（判定基準: {sex}・Mitoflow40 理想値）", ""]
    has_prev = bool(prev_items)
    lines.append("| | 項目 | " + (f"{tested or '今回'} | 前回 {prev.get('testedAt', '')} | " if has_prev else "値 | ") + "理想値 | 票の基準 | 判定 |")
    lines.append("|---|---|" + ("---|---|" if has_prev else "---|") + "---|---|---|")
    for r in rows:
        prev_v = ""
        if has_prev:
            key = next((k for k in prev_items if k and (k in r["label"] or r["label"] in k or k.lower() in r["raw"].lower())), None)
            prev_v = str(prev_items[key]) if key else "—"
        raw = raw_if_informative(r["label"], r.get("raw"))
        label = r["label"] + (f"（票: {raw}）" if raw else "")
        lines.append(f"| {r['mark']} | {label} | **{fmt_value(r['value'], r.get('unit', ''))}** | " + (f"{prev_v} | " if has_prev else "") + f"{r.get('optimal', '')} | {r.get('sheetRef', '') or '—'} | {r.get('direction', '')} |")
    lines += ["", "**🔴🟡 の要約**（Claude が記入：各項目 1〜2 行、断定しない）"]
    lines += [f"- {marks[r['light']]} **{r['label']} {fmt_value(r['value'], r.get('unit', ''))}**（理想 {r.get('optimal', '')}"
              + (f"・票の表記「{raw_if_informative(r['label'], r.get('raw'))}」" if raw_if_informative(r["label"], r.get("raw")) else "") + "）: " for r in flagged] or ["- 🟡🔴 なし"]
    lines += ["", "## デバイス"]
    lines += (device_txt.rstrip().splitlines()[1:] if device_txt else ["（デバイスデータなし）"])  # 先頭の # 見出しは intake 側の見出しと重なるので落とす
    lines += ["", "## カウンセリング"]
    if counseling_raw or counseling_imgs:
        if counseling_raw:
            lines += ["（counseling.txt の原文。特徴的な回答を Claude が抜粋・正規化 → counseling_data.txt）", "", "```", counseling_raw[:3000], "```"]
        if counseling_imgs:
            lines.append("シート画像/PDF: " + ", ".join(counseling_imgs) + "（Claude が Read して正規化）")
    else:
        lines.append("（提出なし）")
    lines += ["", "## 解析者の感覚"]
    lines += (["（原文のまま）", "", memo] if memo else ["（感覚メモなし）"])
    lines += ["", "## 三角測量の種", "（Claude が記入）", "**一致している点**", "- ", "", "**矛盾・引っかかる点**", "- ", "", "**次に足すと三角測量が閉じる項目**", "- ", ""]
    lines += ["## 未収載・読めなかったもの"]
    unmatched = judged.get("unmatched", [])
    if unmatched:
        lines.append("- Mitoflow40 未収載（値のみ）: " + "、".join(f"{u.get('name')} {u.get('value')}{(' ' + u['unit']) if u.get('unit') else ''}" for u in unmatched))
    nn = ex.get("nonNumeric") or {}
    if nn:
        lines.append("- 定性・所見: " + "、".join(f"{k} {v}" for k, v in nn.items()))
    if has_prev:
        lines.append(f"- 経年表は最新列（{tested}）を主に読み、前回列（{prev.get('testedAt', '')}）は extracted.json の previous に控えた")
    lines += ["", "> AI（Claude）が画像から読み取った数値です。原票と照合してください。判定は理想値からの距離による仮の見立てで、診断ではありません。"]
    (out / "intake.md").write_text("\n".join(l for l in lines if l is not None) + "\n", encoding="utf-8")

    # 5) 報告
    log(f"✅ outputs/{folder}/  report.md / blood_data.txt / judged.json" + (" / device_data.txt" if device_txt else "") + " / intake.md（骨組み）")
    log(f"  🔴 {sum(1 for r in rows if r.get('light') == 'red')} ・ 🟡 {sum(1 for r in rows if r.get('light') == 'yellow')} ・ 🟢 {sum(1 for r in rows if r.get('light') == 'green')} ・ 未収載 {len(unmatched)}")
    for r in flagged:
        log(f"  {r['mark']} {r['label']}: {fmt_value(r['value'], r.get('unit', ''))}（理想 {r.get('optimal', '')}・{r.get('direction', '')}）")
    log("")
    log("次にやること：intake.md の「🔴🟡 の要約」と「三角測量の種」を Edit で埋めて、チャットに 🔴🟡 と三角測量を報告（原票との照合を添える）。")
    log(f"  {out / 'intake.md'}")
    return 0


def cmd_health_index(a: argparse.Namespace) -> int:
    idx = build_health_index(Path(a.xml), Path(a.out))
    log(f"✅ {a.out}  {idx['range'][0]}〜{idx['range'][1]}（{len(idx['days'])} 日・睡眠 {len(idx['nights'])} 夜）")
    return 0


def main() -> int:
    ap = argparse.ArgumentParser(prog="dv.py", description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    p = sub.add_parser("prep", help="どこにあるデータでも inputs/ に整える（画像タイル・Apple Health 索引）")
    p.add_argument("source", nargs="+")
    p.add_argument("--name")
    p.add_argument("--date", help="YYYYMMDD（省略時: meta.txt → 写真の撮影日 → 今日）")
    p.add_argument("--sex")
    p.add_argument("--memo", help="感覚メモ（そのまま 感覚メモ.txt に追記）")
    p.add_argument("--rotate", type=int, default=0, choices=[0, 90, 180, 270], help="票の写真が横向きと分かっているとき（時計回りの角度）")
    p.set_defaults(fn=cmd_prep)
    f = sub.add_parser("finish", help="判定・デバイス要約・intake.md の骨組みを生成")
    f.add_argument("folder")
    f.add_argument("--sex")
    f.add_argument("--tested-at", dest="tested_at", help="YYYY-MM-DD（extracted.json の testedAt より優先）")
    f.add_argument("--rename", action="store_true", help="検査日にフォルダ名を合わせる")
    f.set_defaults(fn=cmd_finish)
    t = sub.add_parser("tiles", help="読み取り用タイルを作り直す（回転指定）")
    t.add_argument("folder")
    t.add_argument("--file")
    t.add_argument("--rotate", type=int, default=0, choices=[0, 90, 180, 270])
    t.set_defaults(fn=cmd_tiles)
    h = sub.add_parser("health-index", help="Apple Health export.xml を日別に索引化")
    h.add_argument("xml")
    h.add_argument("out")
    h.set_defaults(fn=cmd_health_index)
    a = ap.parse_args()
    return a.fn(a)


if __name__ == "__main__":
    sys.exit(main())

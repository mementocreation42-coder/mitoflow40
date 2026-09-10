#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
n=1 ジャーナル用・週次データ JSON（Apple Health のみ）

  python3 .claude/skills/n1-journal/scripts/weekly.py                 # 直近の「終わった週」（月〜日）
  python3 .claude/skills/n1-journal/scripts/weekly.py --week 2026-09-03   # その日を含む週
  python3 .claude/skills/n1-journal/scripts/weekly.py --export ~/Desktop/apple_health_export/export.xml

出力: .claude/skills/n1-journal/outputs/week_<開始日>.json と week_<開始日>.md（貼れる表）
索引は DaVinci24 の dv.py（cached_health_index）をそのまま使う。数値は Apple Health にあるものだけ。無い日は無いまま（埋めない）。
"""
from __future__ import annotations
import argparse, json, sys
from datetime import date, datetime, timedelta
from pathlib import Path
from statistics import mean

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent.parent / "davinci24" / "scripts"))
import dv  # noqa: E402  DaVinci24 の索引化を流用

DEFAULT_EXPORTS = [
    Path.home() / "Desktop" / "apple_health_export" / "export.xml",
    Path("/Volumes/Works/2026プロジェクト/2026Mitoflow40/血液検査データサンプル/apple_health_export/export.xml"),
    Path("/Volumes/Works/2026プロジェクト/Mitoflow40/血液検査データサンプル/export.xml"),
]
# 週の表に出す指標（キー, 見出し, 単位, 小数桁, 大きいほど良いか）
METRICS = [
    ("hrv", "HRV（SDNN）", "ms", 0, True),
    ("rhr", "安静時心拍", "bpm", 0, False),
    ("asleep_total", "睡眠", "h", 1, True),
    ("deep", "深い睡眠", "h", 1, True),
    ("rem", "レム睡眠", "h", 1, True),
    ("steps", "歩数", "歩", 0, True),
    ("exercise_min", "エクササイズ", "分", 0, True),
    ("active_kcal", "アクティブ", "kcal", 0, True),
    ("vo2max", "VO2max", "", 1, True),
    ("weight", "体重", "kg", 1, None),
    ("spo2", "SpO2", "%", 1, True),
    ("resp", "呼吸数", "/分", 1, None),
]
SLEEP_KEYS = {"asleep_total", "deep", "rem", "core", "in_bed", "awake"}


def load_index(arg: str | None) -> dict:
    """export.xml があれば索引化（キャッシュ）。無ければ ~/.cache/davinci24 の最新の索引を使う（外付けが外れている時など）。"""
    cands = [Path(arg).expanduser()] if arg else DEFAULT_EXPORTS
    ok = [p for p in cands if p.exists()]
    if ok:
        xml = max(ok, key=lambda p: p.stat().st_mtime)
        idx = json.loads(dv.cached_health_index(xml).read_text(encoding="utf-8"))
        idx["_from"] = str(xml)
        return idx
    cached = sorted(dv.CACHE.glob("apple_health_*.json"), key=lambda p: p.stat().st_mtime)
    if not cached:
        sys.exit("export.xml が見つからず、索引のキャッシュもありません。--export で場所を指定してください")
    idx = json.loads(cached[-1].read_text(encoding="utf-8"))
    idx["_from"] = f"{cached[-1]}（キャッシュ。export.xml が見つからないので前回の索引を使用）"
    print(f"※ export.xml が見つからないため、前回の索引（{idx.get('exportDate')} 書き出し）を使います", file=sys.stderr)
    return idx


def week_of(d: date) -> tuple[date, date]:
    start = d - timedelta(days=d.weekday())  # 月曜
    return start, start + timedelta(days=6)


def day_rows(index: dict, start: date, end: date) -> dict[str, dict]:
    rows = {}
    d = start
    while d <= end:
        k = d.isoformat()
        row = dict(index["days"].get(k, {}))
        row.update({s: v for s, v in index["nights"].get(k, {}).items()})  # 起床日の夜（前夜）の睡眠
        rows[k] = row
        d += timedelta(days=1)
    return rows


def aggregate(rows: dict[str, dict]) -> dict:
    out = {}
    for key, *_ in METRICS:
        vals = [r[key] for r in rows.values() if key in r]
        if vals:
            out[key] = {"mean": round(mean(vals), 2), "min": round(min(vals), 2), "max": round(max(vals), 2), "days": len(vals)}
    return out


def delta(cur: dict, ref: dict, key: str):
    if key not in cur or key not in ref or not ref[key]["mean"]:
        return None
    a, b = cur[key]["mean"], ref[key]["mean"]
    return {"abs": round(a - b, 2), "pct": round((a - b) / b * 100, 1)}


def fmt(v, digits):
    if v is None:
        return "—"
    return f"{v:,.{digits}f}" if digits else f"{round(v):,}"


def build_week(index: dict, start: date, end: date) -> tuple[dict, list[str]]:
    prev_s, prev_e = start - timedelta(days=7), end - timedelta(days=7)
    base_s, base_e = start - timedelta(days=28), start - timedelta(days=1)  # 直前 4 週

    cur_rows = day_rows(index, start, end)
    cur, prev, base = aggregate(cur_rows), aggregate(day_rows(index, prev_s, prev_e)), aggregate(day_rows(index, base_s, base_e))
    export_date = index.get("exportDate")
    covered = export_date is not None and export_date >= end.isoformat()

    metrics = {}
    for key, label, unit, digits, higher in METRICS:
        if key not in cur:
            continue
        m = {"label": label, "unit": unit, **cur[key], "vs_prev": delta(cur, prev, key), "vs_4w": delta(cur, base, key), "higher_is_better": higher}
        if key in ("hrv", "asleep_total", "steps"):
            best = max(((d, r[key]) for d, r in cur_rows.items() if key in r), key=lambda x: x[1])
            worst = min(((d, r[key]) for d, r in cur_rows.items() if key in r), key=lambda x: x[1])
            m["best_day"], m["worst_day"] = {"date": best[0], "value": best[1]}, {"date": worst[0], "value": worst[1]}
        metrics[key] = m

    # 目につく変化（±8% 以上、かつ 4 日以上データがある指標）。判断はしない、並べるだけ
    notable = []
    for key, m in metrics.items():
        d4 = m.get("vs_4w")
        if d4 and m["days"] >= 4 and abs(d4["pct"]) >= 8:
            direction = "上がった" if d4["abs"] > 0 else "下がった"
            notable.append({"key": key, "label": m["label"], "pct": d4["pct"], "text": f"{m['label']}が直前 4 週の平均より {abs(d4['pct'])}% {direction}"})

    result = {
        "kind": "n1-weekly", "source": "Apple Health", "export": index.get("_from"), "exportDate": export_date,
        "week": {"start": start.isoformat(), "end": end.isoformat(), "covered_by_export": covered},
        "days": cur_rows, "metrics": metrics, "notable": notable,
        "prev_week": {"start": prev_s.isoformat(), "end": prev_e.isoformat(), "metrics": prev},
        "baseline_4w": {"start": base_s.isoformat(), "end": base_e.isoformat(), "metrics": base},
        "generatedAt": datetime.now().isoformat(timespec="seconds"),
    }
    lines = [f"## 今週の数字（{start.strftime('%-m/%-d')}〜{end.strftime('%-m/%-d')}）", "",
             "| 指標 | 今週 | 前週比 | 4 週平均比 | データ日数 |", "|---|---|---|---|---|"]
    for key, label, unit, digits, _ in METRICS:
        m = metrics.get(key)
        if not m:
            continue
        def pct(x):
            return "—" if not x else f"{'+' if x['pct'] > 0 else ''}{x['pct']}%"
        lines.append(f"| {label} | {fmt(m['mean'], digits)} {unit} | {pct(m['vs_prev'])} | {pct(m['vs_4w'])} | {m['days']}/7 |")
    if notable:
        lines += ["", "目につく変化：", *[f"- {n['text']}" for n in notable]]
    if not covered:
        lines += ["", f"※ export の日付は {export_date}。この週の後半はまだ書き出されていない可能性があります。"]
    lines += ["", f"出典：Apple Health（{export_date} 書き出し）。数値はあるものだけ。無い日は数えていません。"]
    return result, lines


SALOS_FILE = Path.home() / "Desktop" / "ScondBrain" / "SAL Studio" / "SAL OS" / "data" / "n1" / "weeks.json"
DAY_KEYS = ("hrv", "rhr", "asleep_total", "deep", "rem", "steps", "exercise_min", "active_kcal", "vo2max", "weight")


def write_salos(results: list[dict]) -> Path:
    """SAL OS の data/n1/weeks.json に週を追記（同じ週は置き換え）。日別は主要指標だけに絞る"""
    SALOS_FILE.parent.mkdir(parents=True, exist_ok=True)
    data = {"source": "Apple Health", "weeks": []}
    if SALOS_FILE.exists():
        try:
            data = json.loads(SALOS_FILE.read_text(encoding="utf-8"))
        except Exception:
            pass
    by = {w["week"]["start"]: w for w in data.get("weeks", [])}
    for r in results:
        by[r["week"]["start"]] = {
            "week": r["week"], "exportDate": r["exportDate"],
            "metrics": {k: {kk: v[kk] for kk in ("label", "unit", "mean", "min", "max", "days", "vs_prev", "vs_4w", "higher_is_better") if kk in v} for k, v in r["metrics"].items()},
            "days": {d: {k: row[k] for k in DAY_KEYS if k in row} for d, row in r["days"].items()},
            "notable": r["notable"],
        }
    data["weeks"] = [by[k] for k in sorted(by)]
    data["updatedAt"] = datetime.now().isoformat(timespec="seconds")
    data["exportDate"] = max((w.get("exportDate") or "" for w in data["weeks"]), default=None) or None
    SALOS_FILE.write_text(json.dumps(data, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    return SALOS_FILE


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--export", help="Apple Health の export.xml")
    ap.add_argument("--week", help="この日を含む週（YYYY-MM-DD）。省略時は直近の終わった週")
    ap.add_argument("--out", help="出力ディレクトリ（既定: skills/n1-journal/outputs）")
    ap.add_argument("--to-salos", action="store_true", help="SAL OS の data/n1/weeks.json にも書く（ダッシュボードの「からだ（n=1）」）")
    ap.add_argument("--backfill", type=int, default=0, help="その週から遡って N 週ぶんまとめて処理（SAL OS の推移グラフ用）")
    a = ap.parse_args()

    index = load_index(a.export)
    today = date.today()
    if a.week:
        start, end = week_of(datetime.strptime(a.week, "%Y-%m-%d").date())
    else:
        start, end = week_of(today - timedelta(days=7))  # 先週（月〜日）
    weeks = [(start - timedelta(days=7 * i), end - timedelta(days=7 * i)) for i in range(max(a.backfill, 1))]
    out_dir = Path(a.out).expanduser() if a.out else HERE.parent / "outputs"
    out_dir.mkdir(parents=True, exist_ok=True)
    results = []
    for ws, we in sorted(weeks):
        result, lines = build_week(index, ws, we)
        if not result["metrics"]:
            last = index.get("range", [None, None])[1]
            msg = f"{ws}〜{we} のデータがありません（索引は {last} まで）。Apple Health を書き出し直すか、--week {last} のように指定してください"
            if len(weeks) == 1:
                sys.exit(msg)
            print("※ " + msg, file=sys.stderr)
            continue
        results.append(result)
        (out_dir / f"week_{ws.isoformat()}.json").write_text(json.dumps(result, ensure_ascii=False, indent=1), encoding="utf-8")
        (out_dir / f"week_{ws.isoformat()}.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
        print(f"week {ws}〜{we}  metrics {len(result['metrics'])}  notable {len(result['notable'])}  covered={result['week']['covered_by_export']}")
    print(f"→ {out_dir}")
    if a.to_salos and results:
        print(f"→ SAL OS: {write_salos(results)}（{len(results)} 週）")


if __name__ == "__main__":
    main()

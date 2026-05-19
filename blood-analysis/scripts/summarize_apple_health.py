#!/usr/bin/env python3
"""Apple Health export.xml から直近N日の主要指標サマリを抽出する。

使い方:
  python3 summarize_apple_health.py <export.xml path> [days=30]

出力: stdout に Markdown でサマリを出力。これをそのままClaudeに渡せる。
"""
import sys
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta, timezone
from collections import defaultdict
from statistics import mean, median

TARGET_TYPES = {
    "HKQuantityTypeIdentifierHeartRateVariabilitySDNN": "HRV (SDNN, ms)",
    "HKQuantityTypeIdentifierRestingHeartRate": "安静時心拍 (bpm)",
    "HKQuantityTypeIdentifierHeartRate": "心拍 (bpm)",
    "HKQuantityTypeIdentifierVO2Max": "VO2max (mL/kg/min)",
    "HKQuantityTypeIdentifierStepCount": "歩数 (steps)",
    "HKQuantityTypeIdentifierActiveEnergyBurned": "活動エネルギー (kcal)",
    "HKQuantityTypeIdentifierAppleExerciseTime": "運動時間 (min)",
    "HKQuantityTypeIdentifierBodyMass": "体重 (kg)",
    "HKQuantityTypeIdentifierOxygenSaturation": "SpO2 (%)",
    "HKQuantityTypeIdentifierRespiratoryRate": "呼吸数 (回/分)",
    "HKCategoryTypeIdentifierSleepAnalysis": "睡眠",
}

SLEEP_VALUE_MAP = {
    "HKCategoryValueSleepAnalysisInBed": "在床",
    "HKCategoryValueSleepAnalysisAsleepUnspecified": "睡眠",
    "HKCategoryValueSleepAnalysisAsleepCore": "コア睡眠",
    "HKCategoryValueSleepAnalysisAsleepDeep": "深睡眠",
    "HKCategoryValueSleepAnalysisAsleepREM": "REM睡眠",
    "HKCategoryValueSleepAnalysisAwake": "覚醒",
}


def parse_dt(s):
    return datetime.strptime(s[:19], "%Y-%m-%d %H:%M:%S")


def summarize(path, days):
    cutoff = datetime.now() - timedelta(days=days)
    numeric = defaultdict(list)
    daily_steps = defaultdict(float)
    daily_active = defaultdict(float)
    sleep_durations = defaultdict(lambda: defaultdict(float))  # date -> stage -> seconds

    for event, elem in ET.iterparse(path, events=("end",)):
        if elem.tag != "Record":
            continue
        rtype = elem.get("type")
        if rtype not in TARGET_TYPES:
            elem.clear()
            continue
        try:
            start = parse_dt(elem.get("startDate", ""))
            end = parse_dt(elem.get("endDate", ""))
        except Exception:
            elem.clear()
            continue
        if start < cutoff:
            elem.clear()
            continue

        date_key = start.date().isoformat()

        if rtype == "HKCategoryTypeIdentifierSleepAnalysis":
            stage = SLEEP_VALUE_MAP.get(elem.get("value", ""), elem.get("value", ""))
            sleep_durations[date_key][stage] += (end - start).total_seconds()
        else:
            try:
                v = float(elem.get("value", ""))
            except ValueError:
                elem.clear()
                continue
            if rtype == "HKQuantityTypeIdentifierStepCount":
                daily_steps[date_key] += v
            elif rtype == "HKQuantityTypeIdentifierActiveEnergyBurned":
                daily_active[date_key] += v
            else:
                numeric[rtype].append(v)
        elem.clear()

    out = [f"# Apple Health サマリ（直近{days}日）", ""]

    out.append("## 主要指標（期間平均・中央値）")
    out.append("| 指標 | 平均 | 中央値 | 最小 | 最大 | N |")
    out.append("|---|---|---|---|---|---|")
    for rtype, label in TARGET_TYPES.items():
        if rtype in numeric and numeric[rtype]:
            vals = numeric[rtype]
            out.append(f"| {label} | {mean(vals):.1f} | {median(vals):.1f} | {min(vals):.1f} | {max(vals):.1f} | {len(vals)} |")

    if daily_steps:
        vals = list(daily_steps.values())
        out.append(f"| 歩数/日 (集計) | {mean(vals):.0f} | {median(vals):.0f} | {min(vals):.0f} | {max(vals):.0f} | {len(vals)} |")
    if daily_active:
        vals = list(daily_active.values())
        out.append(f"| 活動kcal/日 (集計) | {mean(vals):.0f} | {median(vals):.0f} | {min(vals):.0f} | {max(vals):.0f} | {len(vals)} |")

    if sleep_durations:
        out.append("")
        out.append("## 睡眠（直近の日別・時間）")
        stages = ["在床", "睡眠", "コア睡眠", "深睡眠", "REM睡眠", "覚醒"]
        out.append("| 日付 | " + " | ".join(stages) + " |")
        out.append("|" + "---|" * (len(stages) + 1))
        for date_key in sorted(sleep_durations.keys())[-14:]:  # 直近14日
            row = [date_key]
            for s in stages:
                sec = sleep_durations[date_key].get(s, 0)
                row.append(f"{sec/3600:.1f}h" if sec else "-")
            out.append("| " + " | ".join(row) + " |")

        # 期間平均
        stage_totals = defaultdict(list)
        for d, stages_d in sleep_durations.items():
            for s, sec in stages_d.items():
                stage_totals[s].append(sec / 3600)
        out.append("")
        out.append("## 睡眠ステージ・期間平均（時間/日）")
        for s in stages:
            if s in stage_totals:
                out.append(f"- {s}: 平均 {mean(stage_totals[s]):.2f}h（中央値 {median(stage_totals[s]):.2f}h）")

    print("\n".join(out))


if __name__ == "__main__":
    path = sys.argv[1] if len(sys.argv) > 1 else "/Users/enigamid/Desktop/apple_health_export/export.xml"
    days = int(sys.argv[2]) if len(sys.argv) > 2 else 30
    summarize(path, days)

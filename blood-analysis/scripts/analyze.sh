#!/bin/bash
# 解析パイプライン補助スクリプト
# 使い方: ./scripts/analyze.sh <inputs配下のフォルダ名>
# 例:     ./scripts/analyze.sh 小林大介_20260518
#
# このスクリプトは:
#   1. 入力フォルダの存在チェック
#   2. Apple Watch サマリ生成（export.xmlがあれば）
#   3. 出力フォルダ作成
#   4. Claude が処理すべき内容を表示
# を行う。実際の解析は Claude Code が SKILL.md に従って実行する。

set -e
SUBJECT="${1:?subject folder name required (e.g. 小林大介_20260518)}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
IN="$ROOT/inputs/$SUBJECT"
OUT="$ROOT/outputs/$SUBJECT"
WATCH_XML="$HOME/Desktop/apple_health_export/export.xml"

if [ ! -d "$IN" ]; then
  echo "❌ 入力フォルダが見つかりません: $IN"
  exit 1
fi

mkdir -p "$OUT"

# Apple Watch サマリ（あれば）
if [ -f "$WATCH_XML" ]; then
  echo "⌚ Apple Watch サマリを生成中..."
  python3 "$ROOT/scripts/summarize_apple_health.py" "$WATCH_XML" 30 > "$OUT/watch_summary.md"
  echo "  → $OUT/watch_summary.md"
else
  echo "⌚ Apple Watch データなし（スキップ）"
fi

echo ""
echo "📋 入力ファイル:"
ls -1 "$IN"
echo ""
echo "✅ 準備完了。Claude が以下を順に実行します:"
echo "   1. meta.txt を読み subject 情報を取得"
echo "   2. counseling.txt があれば読み込み"
echo "   3. blood*.{jpg,png} を Vision で読み取り"
echo "   4. watch_summary.md があれば読み込み"
echo "   5. reference/ の理想値・解釈ルール参照"
echo "   6. 複合スコア → CORE PATTERN 抽出"
echo "   7. Notion DB に解析者用レポート投稿"
echo "   8. templates/client_report.html を $OUT/client.html に複製・個別化"
echo "   9. HTML → PDF 変換 → 自動オープン"
echo ""
echo "OUT=$OUT"

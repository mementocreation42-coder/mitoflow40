#!/bin/bash
# レポートを mitoflow40.com に公開する
# 使い方: ./scripts/publish_report.sh <氏名_日付>
# 例:     ./scripts/publish_report.sh 小林大介_20251026
#
# 1. 推測不可能なトークンを生成
# 2. outputs/<氏名_日付>/client.html を public/reports/<token>.html に配置
# 3. assets も同期
# 4. 公開URLを表示

set -e
SUBJECT="${1:?subject required (e.g. 小林大介_20251026)}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC_HTML="$ROOT/outputs/$SUBJECT/client.html"
SRC_ASSETS="$ROOT/outputs/$SUBJECT/assets"
MITOFLOW_ROOT="$ROOT/.."
PUBLIC_REPORTS="$MITOFLOW_ROOT/public/reports"

if [ ! -f "$SRC_HTML" ]; then
  echo "❌ レポートが見つかりません: $SRC_HTML"
  echo "先に解析を実行してください。"
  exit 1
fi

# トークン生成（24文字・英数）
TOKEN=$(openssl rand -base64 18 | tr -d '=+/' | cut -c1-24)
mkdir -p "$PUBLIC_REPORTS"

# HTMLコピー（asset参照を /reports/assets/ に書き換え）
sed 's|src="assets/|src="/reports/assets/|g; s|url(.assets/|url(/reports/assets/|g' "$SRC_HTML" > "$PUBLIC_REPORTS/${TOKEN}.html"

# assets同期（共通・gitコミット対象）
mkdir -p "$PUBLIC_REPORTS/assets"
cp -n "$SRC_ASSETS"/*.png "$PUBLIC_REPORTS/assets/" 2>/dev/null || true

# Vercel Blobへアップロード（BLOB_READ_WRITE_TOKEN が設定されていれば）
BLOB_URL=""
ANALYST_BLOB_URL=""
SRC_ANALYST_MD="$ROOT/outputs/$SUBJECT/analyst.md"
if [ -n "$BLOB_READ_WRITE_TOKEN" ]; then
  BLOB_URL=$(cd "$MITOFLOW_ROOT" && BLOB_READ_WRITE_TOKEN="$BLOB_READ_WRITE_TOKEN" node "$ROOT/scripts/upload_to_blob.mjs" "$PUBLIC_REPORTS/${TOKEN}.html" "$TOKEN" 2>/dev/null || true)
  if [ -f "$SRC_ANALYST_MD" ]; then
    ANALYST_BLOB_URL=$(cd "$MITOFLOW_ROOT" && BLOB_READ_WRITE_TOKEN="$BLOB_READ_WRITE_TOKEN" node "$ROOT/scripts/upload_analyst_to_blob.mjs" "$SRC_ANALYST_MD" "$TOKEN" 2>/dev/null || true)
  fi
fi

# トークン記録（Notionに紐付け用）
echo "$(date +%Y-%m-%d) | $SUBJECT | $TOKEN${BLOB_URL:+ | $BLOB_URL}" >> "$ROOT/outputs/_published_tokens.log"

# URL表示
PUB_DATE=$(date +%Y-%m-%d)
echo ""
echo "✅ 公開完了"
echo ""
echo "  お客様用:    https://mitoflow40.com/r/$TOKEN"
echo "  解析者用:    https://mitoflow40.com/r/$TOKEN/analyst"
echo "  ローカル:    http://localhost:3000/r/$TOKEN"
if [ -n "$BLOB_URL" ]; then
  echo "  Blob (client):  $BLOB_URL"
fi
if [ -n "$ANALYST_BLOB_URL" ]; then
  echo "  Blob (analyst): $ANALYST_BLOB_URL"
elif [ ! -f "$SRC_ANALYST_MD" ]; then
  echo "  ⚠️ 解析者用Markdown未配置: $SRC_ANALYST_MD"
fi
if [ -z "$BLOB_READ_WRITE_TOKEN" ]; then
  echo "  ⚠️ Vercel Blobへのアップロードはスキップ（BLOB_READ_WRITE_TOKEN 未設定）"
fi
echo ""
echo "📝 Notion書き戻し（Claudeに実行させる）:"
echo "  顧客ID「$SUBJECT」のページを検索し、以下を更新:"
echo "    公開URL    = https://mitoflow40.com/r/$TOKEN"
echo "    解析者URL  = https://mitoflow40.com/r/$TOKEN/analyst"
echo "    公開日     = $PUB_DATE"
echo ""
echo "📋 お客様に送るメール文案:"
echo "----------------------------------------"
echo "${SUBJECT%%_*} 様"
echo ""
echo "MitoFlow40 解析レポートが完成しました。"
echo "下記URLからご覧ください（推測不可能なURLのため、第三者には共有されません）。"
echo ""
echo "https://mitoflow40.com/r/$TOKEN"
echo ""
echo "スマートフォン・PC どちらからでもご覧いただけます。"
echo ""
echo "ご質問があればお気軽にどうぞ。"
echo ""
echo "MitoFlow40 / 小林大介"
echo "----------------------------------------"

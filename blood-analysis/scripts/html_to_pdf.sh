#!/bin/bash
# HTML → PDF 変換 (macOS Chrome headless)
# 使い方: ./html_to_pdf.sh <input.html> <output.pdf>
set -e
INPUT="${1:?input html required}"
OUTPUT="${2:?output pdf required}"
ABS_INPUT="$(cd "$(dirname "$INPUT")" && pwd)/$(basename "$INPUT")"
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$OUTPUT" "file://$ABS_INPUT" 2>/dev/null
echo "Generated: $OUTPUT"
open "$OUTPUT"

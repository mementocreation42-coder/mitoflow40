#!/usr/bin/env node
// 解析者用Markdownを HTML 化して Vercel Blob にアップロード
// 使い方: BLOB_READ_WRITE_TOKEN=xxx node upload_analyst_to_blob.mjs <localMdPath> <token>
// 出力: Blob の public URL を stdout に1行

import { put } from '@vercel/blob';
import { readFile } from 'node:fs/promises';
import { marked } from 'marked';

const [, , localMdPath, token] = process.argv;
if (!localMdPath || !token) {
  console.error('usage: upload_analyst_to_blob.mjs <localMdPath> <token>');
  process.exit(1);
}

const md = await readFile(localMdPath, 'utf-8');
const body = marked.parse(md);

const html = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>MitoFlow40 — Analyst Report</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Noto+Sans+JP:wght@400;500;700&family=JetBrains+Mono&display=swap" rel="stylesheet">
<style>
  :root { --text:#1A1A1A; --muted:#555; --border:#E5E5E5; --bg:#FAFAF7; --accent:#FF9855; }
  * { box-sizing: border-box; }
  body { font-family: 'Inter','Noto Sans JP',sans-serif; color: var(--text); line-height: 1.85; max-width: 820px; margin: 0 auto; padding: 48px 24px 96px; background: var(--bg); font-size: 15px; }
  h1,h2,h3,h4 { font-weight: 700; line-height: 1.4; }
  h1 { font-size: 26px; border-bottom: 2px solid var(--text); padding-bottom: 12px; margin-bottom: 24px; }
  h2 { font-size: 20px; margin-top: 44px; margin-bottom: 14px; padding-left: 12px; border-left: 4px solid var(--accent); }
  h3 { font-size: 16px; margin-top: 28px; margin-bottom: 10px; color: var(--muted); }
  h4 { font-size: 14px; margin-top: 20px; }
  p { margin: 10px 0; }
  ul, ol { padding-left: 24px; margin: 10px 0; }
  li { margin: 4px 0; }
  hr { border: none; border-top: 1px solid var(--border); margin: 32px 0; }
  strong { color: var(--text); }
  code { font-family: 'JetBrains Mono', monospace; background: #EEE; padding: 1px 6px; border-radius: 3px; font-size: 13px; }
  pre { background: #1A1A1A; color: #F5F5F5; padding: 16px; border-radius: 6px; overflow-x: auto; font-family: 'JetBrains Mono', monospace; font-size: 13px; line-height: 1.6; }
  pre code { background: none; padding: 0; color: inherit; }
  table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px; }
  th, td { border: 1px solid var(--border); padding: 8px 12px; text-align: left; vertical-align: top; }
  th { background: #EEE; font-weight: 700; }
  blockquote { border-left: 4px solid var(--muted); padding-left: 16px; color: var(--muted); margin: 16px 0; }
  .meta { color: var(--muted); font-size: 13px; margin-bottom: 16px; }
  .footer { margin-top: 64px; padding-top: 16px; border-top: 1px solid var(--border); color: var(--muted); font-size: 12px; }
</style>
</head>
<body>
${body}
<div class="footer">MitoFlow40 / 解析者用レポート — 本ページは公開検索対象外 (noindex)。</div>
</body>
</html>`;

const { url } = await put(`reports/${token}-analyst.html`, html, {
  access: 'public',
  contentType: 'text/html; charset=utf-8',
  addRandomSuffix: false,
  allowOverwrite: true,
});

console.log(url);

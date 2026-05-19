#!/usr/bin/env node
// Vercel Blob にレポートHTMLをアップロード
// 使い方: BLOB_READ_WRITE_TOKEN=xxx node upload_to_blob.mjs <localHtmlPath> <token>
//
// - localHtmlPath: アップロード対象のHTMLファイル
// - token: 公開URL用のランダムトークン（reports/<token>.html として保存）
//
// 出力: 1行だけ Blob の public URL を stdout に
//
// 注意:
// - addRandomSuffix:false で URL は安定（reports/<token>.html）
// - access:'public' なので URL を知っていれば誰でも閲覧可能（noindex/未公開の前提）

import { put } from '@vercel/blob';
import { readFile } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';

const [, , localHtmlPath, token] = process.argv;
if (!localHtmlPath || !token) {
  console.error('usage: upload_to_blob.mjs <localHtmlPath> <token>');
  process.exit(1);
}

const html = await readFile(localHtmlPath, 'utf-8');

// HTMLのassets参照を絶対URL化済み版に書き換え（既にpublish_report.shで /reports/assets/ に書き換え済み）
// ここではさらに /reports/assets/ → blob 上の assets/ への絶対URLに直す必要があるが、
// 共通assetsは別途一括アップロード推奨。まずはHTML本体だけ上げる。

const { url } = await put(`reports/${token}.html`, html, {
  access: 'public',
  contentType: 'text/html; charset=utf-8',
  addRandomSuffix: false,
  allowOverwrite: true,
});

console.log(url);

---
name: mitoflow-library
description: Mitoflow40 のライブラリ（しくみ・血液検査・栄養素・食べ物・症状・ホルモン・臓器・遺伝子・疾患・思索・ジャーナル）を丸ごと知識ベース化したもの。解析レポートにライブラリのページを引用するとき、新しいページ・記事を書くとき、ライブラリの穴を探すときに使う。「ライブラリでは◯◯をどう書いている？」「このページを書いて」「解析にライブラリを添えて」「1000ページ化」と言われたら使う。
---

# Mitoflow40 ライブラリ 知識ベース

サイトのソース（`lib/*.ts` と `app/*/page.tsx`、ジャーナルは WordPress）から生成した `knowledge/` を、解析と執筆の両方で使う。
**索引だけ読んで、必要なファイルだけ開く**（全部で 20 万字以上ある。毎回まとめて読まない）。

```
knowledge/INDEX.md            ← まずここ。種類ごとに 1 行 1 ページ（タイトル・公開 URL・一言）
knowledge/pages/<slug>.md     ← 静的ページ（本文・ページ内データ・リンク・被リンク）
knowledge/biomarkers/<slug>.md ← 血液検査 52（理想値・高い/低い・ヒント・関連栄養素・参照元）
knowledge/{nutrients,foods,symptoms,hormones,organs,genes,conditions,essays}/<slug>.md
knowledge/journal/<slug>.md   ← ジャーナル記事（本文テキスト）
reference/voice.md            ← 語り口と、ページ／項目の型
lib/paths.ts（サイト側）      ← 教科書＝読む順。4 章 36 枚。ページ末尾の「前へ／次へ」は components/TextbookNav.tsx が layout から差す
reference/digest/synthesis.md ← 全 328 ページを通読した総合ノート（背骨・型・用語・本人プロフィール・穴）。迷ったらここ
reference/digest/{pages,collections,journal}.md ← ページごとの読書メモ（要点・★印・食い違い）
```

## 使い方 A：解析にライブラリを引用する（blood-analysis・DaVinci24）
0. `reference/digest/synthesis.md` §1〜§4 を一度読む（ペア・比率で読む、炎症で歪む指標、本人プロフィール）。
1. 判定で 🔴🟡 になった項目の slug で `knowledge/biomarkers/<slug>.md` を開く。
2. 「Mitoflow40 の理想値」「高いとき／低いとき」「ヒント」「関連する栄養素」「このページへのリンク元」を読み、クライアントに渡す言葉の根拠にする。
3. レポートや intake.md には**公開 URL**（各ファイル冒頭の `- URL:`）を添える。血液項目そのもの（/biomarkers/<slug>）に加えて、リンク元にあるしくみのページ（例：HbA1c → /blood-sugar）や疾患ページを 1〜2 本選ぶ。
4. 引用は「ライブラリではこう整理している」の範囲。ページに無いことを補って書かない。断定しない。

## 使い方 B：ページ・記事を書く
1. `reference/voice.md` と `reference/digest/synthesis.md` §1〜§3 を読む（背骨・型・用語）。同じ主題のメモを `digest/pages.md`／`collections.md`／`journal.md` で探し、本人の体験があればジャーナルから「本人の記録」として 1 段落だけ引く（事実の根拠には使わない）。
2. `INDEX.md` で同じ分類の既存ページを 2〜3 本選び、`pages/*.md` を読んで語り口と構成をそろえる。近い主題が既にあれば新規ではなく改稿を提案する。
3. 書き先を決める：
   - しくみ・コンセプト → `app/<slug>/page.tsx` を新設し `lib/pages.ts` に 1 行追加
   - 血液検査・栄養素・食べ物・症状・ホルモン・臓器・遺伝子・疾患・思索 → 対応する `lib/*.ts` に 1 件追加（既存 1 件と同じキーで）
   - ジャーナル → 管理画面の記事管理（WordPress）
4. 既存ページへの `<Link>` を「あわせて読む」に入れ、関連コレクション（relatedNutrients など）の slug は `INDEX.md` にある slug だけを使う。
5. 書き終えたら `node .claude/skills/mitoflow-library/scripts/build.mjs --no-journal` で知識を作り直す（新しいページも索引に載る）。

## 使い方 D：教科書（読む順）を育てる
- `/textbook` は既存ページを並べ替えた薄い層。新しいページを書いたら、どの章の何番目に入るかを `lib/paths.ts` に足す（書き換えではなく追加）。章は 4 本（はじめての 7 枚／血液検査 11 枚／40 代の疲れ 10 枚／食事を整える 9 枚）。順番の下敷きはジャーナルの連載 #00〜#28（体験は `journal` 欄に n=1 として添えるだけ）。読み進みは端末内（localStorage `mf:textbook:v1`）に記録され、章を読み切るとバッジ・称号（読者→見習い→読み手→読み解き手→整える人）・連続日数が `/textbook` に出る（`lib/textbook-progress.ts`）。送信はしない。

## 使い方 C：穴を探す（1000 ページ化）
- まず `reference/digest/synthesis.md` §5（穴と食い違い）。
- `INDEX.md` の件数と分類を見て、薄い分類・無い主題を挙げる。血液検査の `関連する栄養素` や疾患の `relatedBiomarkers` に出てくるのに単独ページが無いものは、優先候補。
- 方針は docs/library-1000-requirements.md（1 枚を大切に積む。量のために薄い記事を量産しない）。

## 更新
```
node .claude/skills/mitoflow-library/scripts/build.mjs            # 全部（ジャーナルはネット越しに取得）
node .claude/skills/mitoflow-library/scripts/build.mjs --no-journal
```
生成物は git に入れてよい（サイト由来のテキストのみ。個人データは含まない）。サイトを更新したら再生成する。

## ルール
- **ライブラリ＝知見、ジャーナル＝n=1**。事実・数値・しくみの根拠はライブラリ本体（`lib/*.ts`・`app/*/page.tsx`）を正とする。ジャーナルは本人の体験記録として「本人の記録」と明示して引き、事実の根拠には使わない。両者が食い違うときはライブラリ側を採り、必要ならライブラリを直す。
- 断定しない（診断ではない）。必要な医療を遠ざけない。高額商品に慎重に。判断の主役はクライアント自身。
- 引用するときは公開 URL を添え、ページの記述を超えて言わない。
- 管理側の文言は「クライアント」で統一（「お客さん」「お客様」は使わない）。

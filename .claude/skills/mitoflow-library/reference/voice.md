# Mitoflow40 ライブラリの語り口と型

## 編集姿勢（本人の指示で確定しているもの）
- **中立だが明確な POV**：「否定も盲信もしない／中立に整理」を基調にしつつ、はっきりした主張を持つ。根拠の確かさは `EVIDENCE（比較的確かなこと）` と `NEUTRAL（根拠は未確立）` で分けて見せる（例：/sound の周波数ヒーリング、/water の機能水、conditions の `kind`）。
- **従来パラダイムを歴史から問い直す**：「なぜそう考えるようになったのか」を史実で辿る（例：/calories はアトウォーターと 19 世紀熱力学からカロリー概念の普及を説明し、「カロリーベースの健康観は古い」と位置づける）。
- **細胞・生化学に軸を置く**：表面的な指標より、ATP・ミトコンドリア・TCA 回路・代謝を「本体」とする（「カロリーより本体は ATP」）。
- **締めの定型**：必要な医療を遠ざけない／高額商品に慎重に／判断の主役はあなた自身。
- **断定しない**：「〜の可能性」「〜と読み取れます」。診断ではない。

## 静的ページの型（/sound・/calories に合わせる）
ヒーロー（タイトル＋一言）→ 定義 → 歴史／誤解 → 本質（細胞・ATP）→ 暮らし・立場 → あわせて読む（Link）。
- `export const metadata`（title は「◯◯ ｜ 一言 | Mitoflow40」、description、canonical、openGraph）
- ページ内データは `const myths = [...]` のような配列にして map で描く（知識ベースはこの配列も読む）
- `JsonLd`（medicalWebPage・breadcrumb）と `Breadcrumbs` を入れる
- 追加したら `lib/pages.ts` に 1 行（path・priority・changeFrequency・search{title, sub, group}）。sitemap と横断検索に自動反映
- 「あわせて読む」は既存ページへの `<Link href="/...">`。関連は `lib/related.ts` が逆引きする

## コレクション項目の型（lib/*.ts に 1 件足すだけで /種類/slug が生える）
- 血液検査 `lib/biomarkers.ts`：name・en・category・tagline・role・standardRange（一般）・optimalRange（Mitoflow40 理想値、性別で分ける）・highSigns・lowSigns・relatedNutrients・relatedGenes・tips。理想値の書式は `lib/biomarker-ranges.ts` の `parseRange` が読める形（「男性 60〜150 ng/mL、女性 40〜100 ng/mL」「20 U/L 以下」「90 以上」「430〜570万/μL」）
- 疾患・状態 `lib/conditions.ts`：summary・signs・sections（kind: evidence/neutral/history/core、最低 3 節）・selfCare・whenToSeeDoctor・relatedBiomarkers/Symptoms/Nutrients/Foods・relatedLinks・references・updatedAt。`validateConditions` が import 時に検証する
- 思索 `lib/essays.ts`：「◯◯とは？」を必ず体・健康・生き方へ着地させる（lead → sections → closing → related）
- 栄養素・食べ物・症状・ホルモン・臓器・遺伝子：既存項目 1 件を開いて同じキーで書く

## 文体の細部
- 一文は短く。専門用語は初出で一言そえる。数値は単位つき。
- 「あなた」に向けて書くが、押しつけない。読者の判断材料を並べる。
- 見出しは問いか主張。「まとめ」より「立場」。
- 要件の全体は docs/library-1000-requirements.md（§6 品質・編集要件）。

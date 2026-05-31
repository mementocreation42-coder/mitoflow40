import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

// AI を使ったセルフチェック解析。Claude Haiku で 1リクエスト ≒ ¥0.15。
// フロントエンドで計算済みの scores / archetype / profile を受け取り、
// 個別化された解析テキストとアクション3つを返す。

export const runtime = 'nodejs';

const MODEL = 'claude-haiku-4-5';

const SYSTEM_PROMPT = `あなたは MitoFlow40 の解析者・小林大介の代理として、ミトコンドリア視点のセルフチェック結果を読み解くアシスタントです。

## 役割
12問のセルフチェックとプロフィール（年齢・性別・BMI）から、ユーザーの「自覚症状」をミトコンドリア機能の観点で読み解き、温度感のあるパーソナル解析を返します。

## 絶対ルール（最重要）
1. **断定しない、可能性で語る**。すべての主張は以下のいずれかで結ぶ：
   - 「〜の可能性があります」
   - 「〜というサインかもしれません」
   - 「〜と読み取れます」
   - 「〜が予測されます」
   - 「〜という仮説が立てられます」
2. **以下の表現は絶対に使わない**：
   - 「〜である」「〜と診断される」「〜が原因です」
   - 「〜しています」（断定形）
   - 「〜です」で終わる説明文（事実認定の口調）
3. **医療診断ではない**。あくまで「自覚症状の整理」レベル。
4. **無料セルフチェックという制約を常に意識**。「自覚症状の組合せから読み取れる可能性」であり、客観データ（血液・Apple Watch）が無い時点での仮説であることを文中で示唆する。
5. 出力は必ず JSON のみ。コメント・前後の説明文一切なし。
6. 深さは「全体の30%」程度。「これ以上の解析には血液検査と Apple Watch のデータが必要」というニュアンスで余白を残す。

## トーン
- 温かみのある、けれど媚びない一人称
- 専門用語は最小限、使う場合は補足
- 「あなた」と呼びかけ、距離感を縮める
- ユーザーが「自分のことを理解された」と感じる解像度

## 出力フォーマット（厳守）
\`\`\`json
{
  "personal_analysis": "300〜450字。archetype の説明を超えて、回答パターンとプロフィールから読み取れる個別の物語。「あなたの回答からは…が読み取れます」「…という可能性が見えます」のように、必ず可能性ベースで語る。「あなたは○○です」のような断定形は禁止。",
  "personal_actions": [
    "30〜60字の試してみる価値があるアクション1",
    "30〜60字の試してみる価値があるアクション2",
    "30〜60字の試してみる価値があるアクション3"
  ],
  "next_question": "30〜80字。読者の好奇心を引き出す問いかけ。例:「では、その疲れは本当に『年齢のせい』でしょうか？血液を見れば違う答えが出るかもしれません。」"
}
\`\`\`

無料セルフチェックなので、最後の next_question で「血液データやライフログを重ねると、もっと深く読める」という余白を残す。`;

type RequestBody = {
    profile: { age: number; gender: 'male' | 'female' | 'other' | ''; bmi: number };
    axisScores: { energy: number; mental: number; recovery: number; flex: number };
    total: number;
    archetypeName: string;
    archetypeCatch: string;
    flags: { caffeineFlag: boolean; nightOwlFlag: boolean };
};

export async function POST(req: Request) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ ok: false, error: 'API key not configured' }, { status: 500 });
    }

    try {
        const body = (await req.json()) as RequestBody;
        if (!body.archetypeName || !body.axisScores) {
            return NextResponse.json({ ok: false, error: 'invalid input' }, { status: 400 });
        }

        const userMessage = `以下のセルフチェック結果を読み解いてください。

## プロフィール
- 年齢: ${body.profile.age}歳
- 性別: ${body.profile.gender === 'male' ? '男性' : body.profile.gender === 'female' ? '女性' : 'その他'}
- BMI: ${body.profile.bmi ? body.profile.bmi.toFixed(1) : '未入力'}

## 4軸スコア (0-100)
- Energy（エネルギー）: ${body.axisScores.energy}
- Mental Clarity（脳のクリアさ）: ${body.axisScores.mental}
- Recovery（回復力）: ${body.axisScores.recovery}
- Metabolic Flexibility（代謝の柔軟性）: ${body.axisScores.flex}
- 総合: ${body.total}/100

## 判定された Archetype
- タイプ: ${body.archetypeName}
- キャッチ: ${body.archetypeCatch}

## 検出フラグ
- カフェイン依存: ${body.flags.caffeineFlag ? 'あり' : 'なし'}
- 夜更かし傾向: ${body.flags.nightOwlFlag ? 'あり' : 'なし'}

このユーザーに、archetypeを超えた個別の物語と、3つの具体的アクション、最後に好奇心を引き出す問いかけを JSON で返してください。`;

        const client = new Anthropic({ apiKey });
        const response = await client.messages.create({
            model: MODEL,
            max_tokens: 1200,
            system: SYSTEM_PROMPT,
            messages: [{ role: 'user', content: userMessage }],
        });

        const text = response.content
            .filter((b): b is Anthropic.TextBlock => b.type === 'text')
            .map((b) => b.text)
            .join('');

        // JSON抽出（```json ... ``` の中身、または直接JSON）
        const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('JSON not found in response');
        }
        const parsed = JSON.parse(jsonMatch[0].replace(/^```json\s*|\s*```$/g, ''));

        // 匿名統計として Notion に保存（NOTION_API_KEY が設定されていれば）。
        // Vercel のサーバーレス環境では fire-and-forget だとレスポンス返却後に
        // 実行が凍結され fetch が完了しないため、必ず await する。
        // 保存失敗はユーザー体験に影響させず、ログのみ残す。
        try {
            await saveToNotion(body, parsed.personal_analysis);
        } catch (err) {
            console.error('[api/check] notion save failed (non-fatal):', err);
        }

        return NextResponse.json({
            ok: true,
            data: {
                personal_analysis: parsed.personal_analysis,
                personal_actions: parsed.personal_actions,
                next_question: parsed.next_question,
            },
        });
    } catch (e) {
        console.error('[api/check] error:', e);
        return NextResponse.json({ ok: false, error: 'analysis failed' }, { status: 500 });
    }
}

const NOTION_DATA_SOURCE_ID = '23ea23f3-9334-47fd-8c3c-9db844209060';

async function saveToNotion(body: RequestBody, aiAnalysis: string): Promise<void> {
    const notionKey = process.env.NOTION_API_KEY;
    if (!notionKey) return; // 未設定なら保存スキップ

    const flagsArr: { name: string }[] = [];
    if (body.flags.caffeineFlag) flagsArr.push({ name: 'カフェイン依存' });
    if (body.flags.nightOwlFlag) flagsArr.push({ name: '夜更かし' });

    const now = new Date();
    const isoDate = now.toISOString();
    const jstString = now.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });

    const properties: Record<string, unknown> = {
        '日時': { title: [{ text: { content: jstString } }] },
        'Archetype': { select: { name: body.archetypeName } },
        '総合スコア': { number: body.total },
        '年齢': { number: body.profile.age || null },
        '性別': body.profile.gender ? { select: { name: body.profile.gender === 'male' ? '男性' : body.profile.gender === 'female' ? '女性' : 'その他' } } : { select: null },
        'BMI': { number: body.profile.bmi || null },
        'エネルギー': { number: body.axisScores.energy },
        '脳のクリアさ': { number: body.axisScores.mental },
        '回復力': { number: body.axisScores.recovery },
        '代謝の柔軟性': { number: body.axisScores.flex },
        'フラグ': { multi_select: flagsArr },
        'AI解析': { rich_text: [{ text: { content: aiAnalysis.slice(0, 2000) } }] },
    };

    const res = await fetch('https://api.notion.com/v1/pages', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${notionKey}`,
            'Notion-Version': '2022-06-28',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            parent: { type: 'data_source_id', data_source_id: NOTION_DATA_SOURCE_ID },
            properties,
        }),
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Notion ${res.status}: ${text.slice(0, 200)}`);
    }
    // dummy use of isoDate to avoid unused warning
    void isoDate;
}

import { list, put, del } from '@vercel/blob';
import { createHmac } from 'node:crypto';
import { memo, invalidate, TTL } from './req-cache';

// クライアントから届いた健康情報（/api/intake が保存したもの）を、
// 管理画面から読み出すためのヘルパー。保存先は Vercel Blob の intake/<id>/… 。

// 添付の種類。フォームの枠（血液検査／Apple Watch 等のウェアラブル）で決まる。旧データは undefined（= その他）
export type IntakeFileKind = 'blood' | 'device' | 'other';
export const FILE_KIND_LABEL: Record<IntakeFileKind, string> = { blood: '血液検査', device: 'Apple Watch・ウェアラブル', other: 'その他' };

export interface IntakeFile {
    name: string;
    url: string;
    size: number;
    type: string;
    kind?: IntakeFileKind;
}

export interface IntakeSubmission {
    submissionId: string;
    name: string;
    email: string;
    age?: string;
    gender?: string;
    complaint?: string;
    notes?: string;
    // コア問診の回答（key→値）。key は下の QUESTIONNAIRE_FIELDS / CONDITION_SCORES を参照
    questionnaire?: Record<string, string>;
    submittedAt: string;
    files: IntakeFile[];
}

// ===== 問診（カウンセリングシート）の項目定義（フォーム・API・表示で共有）=====
// 旧カウンセリングフォームの全項目を移植。セクション単位で持ち、フォームのステップと表示に使う。

export type QType = 'text' | 'textarea' | 'choice' | 'scale';

export interface QField {
    key: string;
    label: string;
    type: QType;
    options?: string[];   // choice 用
    low?: string;         // scale 用（1側のラベル）
    high?: string;        // scale 用（5側のラベル）
    placeholder?: string;
    rows?: number;
}

export interface QSection {
    title: string;
    note?: string;
    fields: QField[];
    femaleOnly?: boolean; // 性別が女性のときだけ表示
    symptoms?: boolean;   // 症状チェックの特別セクション
}

// 症状チェックの項目と頻度ラベル
export const SYMPTOMS: string[] = [
    '頭痛', '冷え', '浮腫み', '便秘', '下痢', '胸焼け', 'お腹の張り',
    '肩こり', '腰痛', '関節痛', '皮膚トラブル', '抜け毛',
    '集中力低下', '記憶力低下', 'イライラ', '不安感', '気分の落ち込み',
    'めまい', '動悸', '息切れ',
];
export const SYMPTOM_LEVELS: { value: string; label: string; color: string }[] = [
    { value: 'always', label: 'いつも', color: '#FF9855' },
    { value: 'sometimes', label: '時々', color: '#E8C547' },
    { value: 'rarely', label: 'まれ', color: '#B2EBF2' },
];

export const QUESTIONNAIRE_SECTIONS: QSection[] = [
    {
        title: '主訴・目的・体質',
        fields: [
            { key: 'goal', label: 'ゴール・目的（達成したい状態）', type: 'textarea', placeholder: '例: 朝スッキリ起きられる体に、半年で体脂肪率-3%' },
            { key: 'pastConditions', label: '既往歴・現在治療中の疾患', type: 'textarea', rows: 2, placeholder: '例: 高血圧、花粉症' },
            { key: 'medications', label: '服薬', type: 'textarea', rows: 2, placeholder: '例: アムロジピン 5mg/日' },
            { key: 'supplements', label: 'サプリメント（ブランド・用量）', type: 'textarea', rows: 2, placeholder: '例: ビタミンD 4000IU、マグネシウム 300mg' },
            { key: 'familyHistory', label: '家族の既往歴', type: 'text', placeholder: '例: 父=糖尿病、母=甲状腺機能低下' },
        ],
    },
    {
        title: '体調スコア',
        note: 'この1ヶ月の平均的な状態を 1（最悪）〜 5（最高）でお答えください。',
        fields: [
            { key: 'fatigue', label: '疲労感', type: 'scale', low: 'いつも疲れる', high: '疲れにくい' },
            { key: 'energy', label: '気力・活力', type: 'scale', low: '出ない', high: '満タン' },
            { key: 'focus', label: '集中力', type: 'scale', low: '続かない', high: '長時間集中' },
            { key: 'mood', label: '気分の安定度', type: 'scale', low: '不安定', high: '安定' },
            { key: 'sleepQuality', label: '睡眠の質（主観）', type: 'scale', low: '悪い', high: '良い' },
            { key: 'threeMonthCompare', label: '3ヶ月前と比べて、体の調子は？', type: 'choice', options: ['良くなった', '変わらない', '悪くなった'] },
        ],
    },
    {
        title: '症状チェック',
        note: '該当する症状の頻度を選んでください。なければ空欄でOK。',
        symptoms: true,
        fields: [],
    },
    {
        title: '食事',
        fields: [
            { key: 'water', label: '水分摂取量/日', type: 'choice', options: ['500mL以下', '500mL〜1L', '1L〜2L', '2L以上'] },
            { key: 'appetite', label: '食欲', type: 'choice', options: ['ある', 'ふつう', 'あまりない', '日によって違う'] },
            { key: 'mealCount', label: '食事回数', type: 'choice', options: ['1食', '2食', '3食', '3食+間食'] },
            { key: 'mealAmount', label: '食事量', type: 'choice', options: ['少ない', 'ふつう', '多い'] },
            { key: 'mealTime', label: '1食にかける時間', type: 'choice', options: ['15分未満', '15-30分', '30-60分', '1時間以上'] },
            { key: 'proteinSources', label: '朝・昼・夕のタンパク質源', type: 'textarea', rows: 2, placeholder: '例: 朝=卵2個、昼=鶏胸肉、夕=魚' },
            { key: 'vegetableServings', label: '野菜の量（皿/日 ≒ 握りこぶし1個分が1皿）', type: 'choice', options: ['0-1', '2-3', '4-5', '6以上'] },
            { key: 'fastFood', label: 'ファーストフード頻度', type: 'choice', options: ['月0', '月1-3', '週1-2', '週3以上'] },
            { key: 'eatOut', label: '外食・惣菜頻度', type: 'choice', options: ['月0-1', '週1-2', '週3-4', 'ほぼ毎日'] },
            { key: 'avoidedFoods', label: '控えている食事（あれば）', type: 'text', placeholder: '例: グルテン、カゼイン、白砂糖' },
            { key: 'sweets', label: '菓子類頻度', type: 'choice', options: ['月0', '週1-2', '週3-4', 'ほぼ毎日'] },
            { key: 'drinks', label: '飲料（よく飲むもの）', type: 'text', placeholder: '例: コーヒー3杯、お茶、水' },
            { key: 'alcohol', label: '飲酒頻度', type: 'choice', options: ['飲まない', '週1-2', '週3-4', 'ほぼ毎日'] },
        ],
    },
    {
        title: '睡眠',
        fields: [
            { key: 'sleepHours', label: '平均睡眠時間', type: 'choice', options: ['5h以下', '5-6h', '6-7h', '7-8h', '8h以上'] },
            { key: 'fallAsleep', label: '寝つき', type: 'choice', options: ['良い', 'ふつう', '悪い'] },
            { key: 'wakeup', label: '目覚め', type: 'choice', options: ['スッキリ', 'ふつう', 'だるい'] },
            { key: 'midnightWake', label: '夜中の覚醒', type: 'choice', options: ['ない', '時々', '頻繁'] },
            { key: 'dinnerToBed', label: '夕食から就寝までの時間', type: 'choice', options: ['1時間未満', '1-2時間', '2-3時間', '3時間以上'] },
        ],
    },
    {
        title: '運動・ストレス・排便',
        fields: [
            { key: 'walking', label: '歩行時間/日', type: 'choice', options: ['30分未満', '30-60分', '60-90分', '90分以上'] },
            { key: 'exerciseFreq', label: '運動頻度（30分以上の有酸素 or 筋トレ）', type: 'choice', options: ['しない', '月1-3', '週1-2', '週3-4', 'ほぼ毎日'] },
            { key: 'stressRelief', label: 'ストレス解消法', type: 'text', placeholder: '例: 入浴、瞑想、散歩' },
            { key: 'smoking', label: '喫煙', type: 'text', placeholder: '例: しない / 1日5本×10年' },
            { key: 'poopFreq', label: '排便頻度', type: 'choice', options: ['毎日1回', '毎日2回以上', '2日に1回', '3日に1回以下'] },
            { key: 'poopState', label: '便の状態', type: 'choice', options: ['バナナ状', '柔らかい', '硬い', '下痢気味', '日によって違う'] },
        ],
    },
    {
        title: '女性の方へ',
        femaleOnly: true,
        fields: [
            { key: 'menstrualCycle', label: '月経周期（日数）', type: 'text', placeholder: '例: 28日、不規則' },
            { key: 'pms', label: 'PMS（月経前症候群）症状', type: 'textarea', rows: 2, placeholder: '例: イライラ、頭痛、むくみ' },
        ],
    },
];

// 表示・保存で使う「key→ラベル」の順序付きリスト（カナ・症状も含む）
const DISPLAY_DESCRIPTORS: { key: string; label: string; scale?: boolean }[] = [
    { key: 'kana', label: 'カナ' },
    ...QUESTIONNAIRE_SECTIONS.flatMap((s) => s.fields.map((f) => ({ key: f.key, label: f.label, scale: f.type === 'scale' }))),
    { key: 'symptoms', label: '症状' },
];

// すべての問診 key（API が formData から拾う用）
export const ALL_QUESTIONNAIRE_KEYS: string[] = DISPLAY_DESCRIPTORS.map((d) => d.key);

// CSV等の「全カラム」用：問診の key→ラベルを順序どおり全部返す（未回答も列として必要なため）
export function questionnaireColumns(): { key: string; label: string }[] {
    return DISPLAY_DESCRIPTORS.map((d) => ({ key: d.key, label: d.label }));
}

// 表示用：回答済みの項目だけを label→value で順に返す
export function questionnaireEntries(q: Record<string, string> | undefined): { label: string; value: string }[] {
    if (!q) return [];
    const out: { label: string; value: string }[] = [];
    for (const d of DISPLAY_DESCRIPTORS) {
        const v = q[d.key];
        if (v && v.trim()) out.push({ label: d.label, value: d.scale ? `${v} / 5` : v });
    }
    return out;
}

function token(): string | undefined {
    return process.env.BLOB_READ_WRITE_TOKEN;
}

// intake/<id>/submission-xxxxx.json の一覧を新しい順に返す（本体はまだ読まない軽量版）
export async function listSubmissions(): Promise<{ submissionId: string; jsonUrl: string; uploadedAt: string }[]> {
    const t = token();
    if (!t) return [];
    // intake/ 配下には添付ファイルや日次バックアップも同居するため、1 回の list（最大 1000 件）に収まらなくなる。
    // cursor で最後まで辿らないと、古い提出が黙って一覧から消える。
    const blobs: { pathname: string; url: string; uploadedAt: Date | string }[] = [];
    let cursor: string | undefined;
    do {
        const page = await list({ prefix: 'intake/', token: t, cursor, limit: 1000 });
        blobs.push(...page.blobs);
        cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
    const records = blobs
        .filter((b) => /\/submission[-.].*\.json$/.test(b.pathname))
        .map((b) => ({
            submissionId: b.pathname.split('/')[1] || b.pathname,
            jsonUrl: b.url,
            uploadedAt: (b.uploadedAt instanceof Date ? b.uploadedAt.toISOString() : String(b.uploadedAt)),
        }));
    records.sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));
    return records;
}

// 一覧＋本文を読み込む（カード表示用に氏名などが必要なため）。短期キャッシュ（書き込み時に invalidate）
export function listSubmissionsWithMeta(): Promise<IntakeSubmission[]> {
    return memo('intake:submissions', TTL.list, listSubmissionsWithMetaUncached);
}
async function listSubmissionsWithMetaUncached(): Promise<IntakeSubmission[]> {
    const rows = await listSubmissions();
    const out = await Promise.all(
        rows.map(async (r) => {
            try {
                const res = await fetch(r.jsonUrl, { cache: 'no-store' });
                if (!res.ok) return null;
                const rec = (await res.json()) as IntakeSubmission;
                return rec;
            } catch {
                return null;
            }
        })
    );
    return out.filter((x): x is IntakeSubmission => Boolean(x));
}

// 単一の受付を取得（詳細ページ用）
export async function getSubmission(id: string): Promise<IntakeSubmission | null> {
    const t = token();
    if (!t) return null;
    if (!/^[a-z0-9-]{8,80}$/i.test(id)) return null;
    const { blobs } = await list({ prefix: `intake/${id}/`, token: t });
    const jsonBlob = blobs.find((b) => /\/submission[-.].*\.json$/.test(b.pathname));
    if (!jsonBlob) return null;
    try {
        const res = await fetch(jsonBlob.url, { cache: 'no-store' });
        if (!res.ok) return null;
        return (await res.json()) as IntakeSubmission;
    } catch {
        return null;
    }
}

// ===== クライアント単位（メールアドレスで名寄せ）=====

export interface IntakeClient {
    clientId: string; // メールのハッシュ（URLに個人情報を出さないため）
    name: string;     // 最新送信時の氏名
    email: string;
    submissionCount: number;
    fileCount: number;
    latestAt: string;
    submissions: IntakeSubmission[]; // 新しい順
}

// 開発用の既定シークレット。ソースに書かれている以上、秘密ではない。
const DEV_LINK_SECRET = 'mitoflow40-intake-dev-secret';

// INTAKE_LINK_SECRET が設定されているか。未設定だと clientId は既定値から算出され、
// メールアドレスさえ分かれば第三者にマイページURLを再現されうる（＝健康データが露出する）。
export function isLinkSecretConfigured(): boolean {
    return Boolean(process.env.INTAKE_LINK_SECRET);
}

let warnedMissingSecret = false;

// メールアドレスから安定した非可逆IDを作る（マイページURL用）。
// 秘密鍵付きHMACなので、シークレットが設定されていればメールを知っていてもIDは逆算できない。
export function clientIdFromEmail(email: string): string {
    const secret = process.env.INTAKE_LINK_SECRET;
    if (!secret && process.env.NODE_ENV === 'production' && !warnedMissingSecret) {
        warnedMissingSecret = true;
        console.error(
            '[intake] SECURITY: INTAKE_LINK_SECRET が未設定です。マイページURLが既定シークレットから算出されるため、' +
            'メールアドレスを知る第三者にURLを推測されます。Vercel の環境変数に設定してください。'
        );
    }
    return createHmac('sha256', secret || DEV_LINK_SECRET).update(email.trim().toLowerCase()).digest('hex').slice(0, 24);
}

function groupByClient(submissions: IntakeSubmission[]): IntakeClient[] {
    const map = new Map<string, IntakeSubmission[]>();
    for (const s of submissions) {
        const key = clientIdFromEmail(s.email);
        const arr = map.get(key) || [];
        arr.push(s);
        map.set(key, arr);
    }
    const clients: IntakeClient[] = [];
    for (const [clientId, subs] of map) {
        subs.sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
        const latest = subs[0];
        clients.push({
            clientId,
            name: latest.name,
            email: latest.email,
            submissionCount: subs.length,
            fileCount: subs.reduce((n, s) => n + (s.files?.length ?? 0), 0),
            latestAt: latest.submittedAt,
            submissions: subs,
        });
    }
    clients.sort((a, b) => b.latestAt.localeCompare(a.latestAt));
    return clients;
}

// クライアント一覧（新しい送信があった順）
export async function listClients(): Promise<IntakeClient[]> {
    const submissions = await listSubmissionsWithMeta();
    return groupByClient(submissions);
}

// 単一クライアント（clientId＝メールのハッシュ）
export async function getClient(clientId: string): Promise<IntakeClient | null> {
    if (!/^[a-f0-9]{24}$/.test(clientId)) return null;
    const clients = await listClients();
    return clients.find((c) => c.clientId === clientId) || null;
}

// ===== 解析レポートの紐付け（履歴つき）=====
// クライアント（clientId）に、レポート基盤 /r/<token> のトークンを結びつける。
// 継続の顧客は解析が積み上がるので、最新1つではなく履歴として持つ。
// 保存先: intake/_reports/<clientId>.json（固定パス）
//   { token, updatedAt,            … 最新（旧フォーマット互換）
//     history: [{ token, addedAt, label?, analystToken? }, …] }   … 新しい順

const REPORTS_PREFIX = 'intake/_reports/';

export interface ClientReport {
    token: string;
    updatedAt: string;
}

export interface ClientReportEntry {
    token: string;          // お客様用 /r/<token>
    addedAt: string;
    label?: string;         // 例: 2026-08-24 の解析
    analystToken?: string;  // 解析者用 /r/<analystToken>/analyst（お客様には見せない）
}

export interface ClientReports {
    latest: ClientReport | null;
    history: ClientReportEntry[];
}

interface ReportRecord extends ClientReport {
    history?: ClientReportEntry[];
}

// URL・/r/xxxx・素のトークンのいずれからでもトークンだけを取り出す
export function extractReportToken(input: string): string | null {
    const last = input.trim().split('?')[0].split('/').filter(Boolean).pop() || '';
    return /^[a-zA-Z0-9_-]{8,64}$/.test(last) ? last : null;
}

async function readReportRecord(clientId: string): Promise<{ record: ReportRecord; url: string } | null> {
    const t = token();
    if (!t || !/^[a-f0-9]{24}$/.test(clientId)) return null;
    const { blobs } = await list({ prefix: `${REPORTS_PREFIX}${clientId}`, token: t });
    const b = blobs.find((x) => x.pathname.endsWith(`${clientId}.json`));
    if (!b) return null;
    try {
        const res = await fetch(b.url, { cache: 'no-store' });
        if (!res.ok) return null;
        return { record: (await res.json()) as ReportRecord, url: b.url };
    } catch {
        return null;
    }
}

function historyOf(record: ReportRecord | null): ClientReportEntry[] {
    if (!record) return [];
    const h = record.history ?? (record.token ? [{ token: record.token, addedAt: record.updatedAt }] : []);
    return [...h].sort((a, b) => b.addedAt.localeCompare(a.addedAt));
}

async function writeReportRecord(clientId: string, history: ClientReportEntry[]): Promise<void> {
    const t = token();
    if (!t) throw new Error('storage not configured');
    invalidate('intake');
    const latest = history[0];
    const record: ReportRecord = { token: latest?.token ?? '', updatedAt: latest?.addedAt ?? new Date().toISOString(), history };
    await put(`${REPORTS_PREFIX}${clientId}.json`, JSON.stringify(record), {
        access: 'public', token: t, addRandomSuffix: false, contentType: 'application/json', allowOverwrite: true,
    });
}

// 全クライアントのレポート履歴を1回の list で読む（顧客詳細・一覧の共通ソース。memo）
export function listAllClientReports(): Promise<Map<string, ClientReports>> {
    return memo('intake:reports', TTL.list, async () => {
        const t = token();
        const out = new Map<string, ClientReports>();
        if (!t) return out;
        const { blobs } = await list({ prefix: REPORTS_PREFIX, token: t });
        await Promise.all(blobs.map(async (b) => {
            const m = b.pathname.match(/([a-f0-9]{24})\.json$/);
            if (!m) return;
            try {
                const res = await fetch(b.url, { cache: 'no-store' });
                if (!res.ok) return;
                const history = historyOf((await res.json()) as ReportRecord);
                out.set(m[1], { latest: history[0] ? { token: history[0].token, updatedAt: history[0].addedAt } : null, history });
            } catch { /* skip */ }
        }));
        return out;
    });
}

// 最新のレポート（互換 API）
export async function getClientReport(clientId: string): Promise<ClientReport | null> {
    const r = await readReportRecord(clientId);
    const latest = historyOf(r?.record ?? null)[0];
    return latest ? { token: latest.token, updatedAt: latest.addedAt } : null;
}

// 履歴つき
export async function getClientReports(clientId: string): Promise<ClientReports> {
    const r = await readReportRecord(clientId);
    const history = historyOf(r?.record ?? null);
    return { latest: history[0] ? { token: history[0].token, updatedAt: history[0].addedAt } : null, history };
}

// 追加（同じトークンがあれば先頭へ移してラベル等を更新）
export async function setClientReport(clientId: string, reportToken: string, opts: { label?: string; analystToken?: string } = {}): Promise<void> {
    if (!/^[a-f0-9]{24}$/.test(clientId)) throw new Error('invalid clientId');
    const tok = extractReportToken(reportToken);
    if (!tok) throw new Error('invalid report token');
    const analystToken = opts.analystToken ? extractReportToken(opts.analystToken) ?? undefined : undefined;
    const r = await readReportRecord(clientId);
    const rest = historyOf(r?.record ?? null).filter((e) => e.token !== tok);
    const prev = historyOf(r?.record ?? null).find((e) => e.token === tok);
    const entry: ClientReportEntry = {
        token: tok,
        addedAt: prev?.addedAt ?? new Date().toISOString(),
        label: (opts.label ?? prev?.label)?.trim().slice(0, 80) || undefined,
        analystToken: analystToken ?? prev?.analystToken,
    };
    await writeReportRecord(clientId, [entry, ...rest].sort((a, b) => b.addedAt.localeCompare(a.addedAt)));
}

// 履歴から外す（貼り間違いなど）。空になればファイルごと消す
export async function removeClientReport(clientId: string, reportToken: string): Promise<void> {
    const t = token();
    if (!t) throw new Error('storage not configured');
    if (!/^[a-f0-9]{24}$/.test(clientId)) throw new Error('invalid clientId');
    const tok = extractReportToken(reportToken);
    if (!tok) throw new Error('invalid report token');
    const r = await readReportRecord(clientId);
    if (!r) return;
    const rest = historyOf(r.record).filter((e) => e.token !== tok);
    invalidate('intake');
    if (rest.length === 0) { await del(r.url, { token: t }); return; }
    await writeReportRecord(clientId, rest);
}

// ===== 対応ステータス＋担当メモ（CRM）=====
// クライアント（clientId）ごとの状態と施術者メモ。保存先: intake/_meta/<clientId>.json

const META_PREFIX = 'intake/_meta/';

export const CLIENT_STATUSES = ['未対応', '対応中', '解析中', '完了', '保留'] as const;
export type ClientStatus = (typeof CLIENT_STATUSES)[number];

export interface ClientMeta {
    status: ClientStatus;
    memo: string;
    updatedAt: string;
}

// 全クライアントの対応ステータスを1回の list で読む（一覧ページ用。N 回の list を避ける）
export function listAllClientMetas(): Promise<Map<string, ClientMeta>> {
    return memo('intake:metas', TTL.list, async () => {
        const t = token();
        const out = new Map<string, ClientMeta>();
        if (!t) return out;
        const { blobs } = await list({ prefix: META_PREFIX, token: t });
        await Promise.all(blobs.map(async (b) => {
            const m = b.pathname.match(/([a-f0-9]{24})\.json$/);
            if (!m) return;
            try {
                const res = await fetch(b.url, { cache: 'no-store' });
                if (res.ok) out.set(m[1], (await res.json()) as ClientMeta);
            } catch { /* skip */ }
        }));
        return out;
    });
}

export async function getClientMeta(clientId: string): Promise<ClientMeta | null> {
    const t = token();
    if (!t) return null;
    if (!/^[a-f0-9]{24}$/.test(clientId)) return null;
    const { blobs } = await list({ prefix: `${META_PREFIX}${clientId}`, token: t });
    const b = blobs.find((x) => x.pathname.endsWith(`${clientId}.json`));
    if (!b) return null;
    try {
        const res = await fetch(b.url, { cache: 'no-store' });
        if (!res.ok) return null;
        return (await res.json()) as ClientMeta;
    } catch {
        return null;
    }
}

export async function setClientMeta(clientId: string, status: string, memo: string): Promise<void> {
    const t = token();
    if (!t) throw new Error('storage not configured');
    if (!/^[a-f0-9]{24}$/.test(clientId)) throw new Error('invalid clientId');
    const safeStatus = (CLIENT_STATUSES as readonly string[]).includes(status) ? (status as ClientStatus) : '未対応';
    const record: ClientMeta = { status: safeStatus, memo: memo.slice(0, 4000), updatedAt: new Date().toISOString() };
    invalidate('intake');
    await put(`${META_PREFIX}${clientId}.json`, JSON.stringify(record), {
        access: 'public', token: t, addRandomSuffix: false, contentType: 'application/json', allowOverwrite: true,
    });
}


// ===== 削除（本人の削除要求・重複整理に対応）=====

// 単一のカウンセリング票（submission）を削除
export async function deleteSubmission(submissionId: string): Promise<number> {
    const t = token();
    if (!t) throw new Error('storage not configured');
    if (!/^[a-z0-9-]{8,80}$/i.test(submissionId)) throw new Error('invalid submissionId');
    const { blobs } = await list({ prefix: `intake/${submissionId}/`, token: t });
    for (const b of blobs) await del(b.url, { token: t });
    invalidate('intake');
    return blobs.length;
}

// クライアントを丸ごと削除（全票＋メタ＋レポート紐付け）
export async function deleteClient(clientId: string): Promise<{ submissions: number; blobs: number }> {
    const t = token();
    if (!t) throw new Error('storage not configured');
    if (!/^[a-f0-9]{24}$/.test(clientId)) throw new Error('invalid clientId');
    const { blobs } = await list({ prefix: 'intake/', token: t });
    let deletedBlobs = 0;
    const submissionIds = new Set<string>();
    // 該当クライアントの submission フォルダを特定
    for (const b of blobs) {
        if (!/\/submission[-.].*\.json$/.test(b.pathname)) continue;
        try {
            const res = await fetch(b.url, { cache: 'no-store' });
            if (!res.ok) continue;
            const rec = (await res.json()) as IntakeSubmission;
            if (clientIdFromEmail(rec.email) === clientId) submissionIds.add(b.pathname.split('/')[1]);
        } catch { /* skip */ }
    }
    for (const b of blobs) {
        const seg = b.pathname.split('/')[1] || '';
        const isTargetSubmission = submissionIds.has(seg);
        const isTargetMeta = b.pathname === `${META_PREFIX}${clientId}.json`;
        const isTargetReport = b.pathname === `${REPORTS_PREFIX}${clientId}.json`;
        if (isTargetSubmission || isTargetMeta || isTargetReport) {
            await del(b.url, { token: t });
            deletedBlobs++;
        }
    }
    // セルフチェックの結果（/check でメール入力時に保存）も本人のデータなので一緒に消す
    const checks = await list({ prefix: `check/${clientId}/`, token: t });
    for (const b of checks.blobs) { await del(b.url, { token: t }); deletedBlobs++; }
    invalidate('intake'); invalidate('check');
    return { submissions: submissionIds.size, blobs: deletedBlobs };
}

// ===== 自動バックアップ（全データを1つのJSONにスナップショット）=====
export async function backupAllToBlob(): Promise<{ path: string; url: string; clientCount: number }> {
    const t = token();
    if (!t) throw new Error('storage not configured');
    const clients = await listClients();
    const payload = { backedUpAt: new Date().toISOString(), clientCount: clients.length, clients };
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    const path = `intake/_backups/backup-${stamp}.json`;
    const blob = await put(path, JSON.stringify(payload), {
        access: 'public', token: t, addRandomSuffix: false, contentType: 'application/json', allowOverwrite: true,
    });
    return { path, url: blob.url, clientCount: clients.length };
}

// 保管期間ポリシー：指定日数より古い票を削除（保持したいなら実行しない）
export async function purgeOlderThan(days: number): Promise<number> {
    const t = token();
    if (!t) throw new Error('storage not configured');
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
    const subs = await listSubmissionsWithMeta();
    let purged = 0;
    for (const s of subs) {
        if (new Date(s.submittedAt).getTime() < cutoff) {
            purged += await deleteSubmission(s.submissionId);
        }
    }
    return purged;
}

export function formatDateTime(iso: string): string {
    try {
        return new Date(iso).toLocaleString('ja-JP', { dateStyle: 'medium', timeStyle: 'short' });
    } catch {
        return iso;
    }
}

export function isBlobConfigured(): boolean {
    return Boolean(token());
}

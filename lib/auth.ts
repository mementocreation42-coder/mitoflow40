// ── 仮のログイン基盤（雰囲気確認用スタブ）─────────────────────────
// あとで Supabase 等に差し替える想定。いまは常に「未ログイン」を返す。
// 本実装時は、この関数の中身だけをセッション確認に置き換えれば、
// ページ側・MemberGate 側は一切変更不要。
export async function isMember(): Promise<boolean> {
    // TODO: Supabase などのセッション確認に差し替える
    return false;
}

// 会員限定（深さで線引き）にする血液検査項目。
// 雰囲気確認のため、まずはフェリチン1項目だけをゲート対象にする。
// 雰囲気確認は済んだため、本番では一旦ゲート対象を空にする（仕組みは温存）。
// 会員制を有効化するときは、ここに対象スラッグを追加し、isMember() を実装する。
const GATED_BIOMARKERS = new Set<string>([]);

export function isBiomarkerGated(slug: string): boolean {
    return GATED_BIOMARKERS.has(slug);
}

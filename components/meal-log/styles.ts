export const inputCls = 'w-full rounded-lg border-2 border-[#1A1A1A] bg-white px-3 py-2 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#FF9855]';
export const labelCls = 'block text-xs font-bold text-[#4A4A4A] mb-1';
export const pillCls = 'rounded-full border-2 border-[#1A1A1A] px-4 py-2 text-sm font-bold disabled:opacity-40';

// たんぱく質・脂質・炭水化物の色（dataviz の validator で色覚多様性・明度差を確認済み。値は必ず文字でも添える）
export const PFC_COLOR = { prot: '#eb6834', fat: '#2a78d6', carb: '#1baf7a' } as const;
// 状態の色（必ずラベルと一緒に使う）
export const STATUS = { good: '#0ca30c', critical: '#d03b3b', neutral: '#8a8985', track: '#ECEBE6' } as const;

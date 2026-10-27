// 便の形（ブリストルスケール 7 段階）。端末側（/meal-log）と管理画面の両方で使うので、'use client' の外に置く。
export const STOOL_TYPES = [
    { n: 1, label: 'コロコロ便', hint: '硬い粒がバラバラ' },
    { n: 2, label: '硬い便', hint: '粒がかたまって硬い' },
    { n: 3, label: 'やや硬い便', hint: '表面にひびがある' },
    { n: 4, label: '普通便', hint: 'なめらかなバナナ状' },
    { n: 5, label: 'やや軟らかい便', hint: '柔らかく形がある' },
    { n: 6, label: '泥状便', hint: '形がくずれている' },
    { n: 7, label: '水様便', hint: '水のよう' },
] as const;

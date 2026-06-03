// 著者・監修者情報（E-E-A-T）
export const AUTHOR = {
    name: '小林大介',
    nameEn: 'Daisuke Kobayashi',
    url: 'https://mitoflow40.com/author',
    image: 'https://mitoflow40.com/images/profile.jpg',
    jobTitle: 'パーソナルヘルスケア実践者 / 精密栄養学',
    description:
        '1980年生まれ、愛知県一宮市出身・徳島県在住。ビデオグラファー／フォトグラファー／ライター／作家。40歳を機に感じた疲れや気力の低下をきっかけに健康へ関心を深め、2025年2月より精密栄養学を軸に学び・実践。血液検査と生活ログをもとに自身の体で検証を重ね、エネルギー生成と体質改善を体感。クリエイターの感性と実践者の視点で、40代からの健康戦略「Mitoflow40」を発信。',
    sameAs: [
        'https://www.shinealight.jp/universe',
    ],
};

// schema.org Person オブジェクト
export const authorPerson = {
    '@type': 'Person',
    '@id': 'https://mitoflow40.com/#author',
    name: AUTHOR.name,
    alternateName: AUTHOR.nameEn,
    url: AUTHOR.url,
    image: AUTHOR.image,
    jobTitle: AUTHOR.jobTitle,
    description: AUTHOR.description,
    sameAs: AUTHOR.sameAs,
};

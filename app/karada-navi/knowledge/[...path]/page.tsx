import { notFound } from 'next/navigation';
import KnowledgeReader, { type KnowledgeDocument } from '@/components/KnowledgeReader';
import { searchIndex } from '@/lib/searchIndex';
import { nutrients } from '@/lib/nutrients';
import { biomarkers } from '@/lib/biomarkers';
import { foods } from '@/lib/foods';
import { symptoms } from '@/lib/symptoms';
import { genes } from '@/lib/genes';
import { hormones } from '@/lib/hormones';
import { organs } from '@/lib/organs';

type Props = { params: Promise<{ path: string[] }> };

export default async function KnowledgePage({ params }: Props) {
    const { path } = await params;
    const href = `/${path.join('/')}`;
    const document = resolveDocument(path, href);
    if (!document) notFound();
    return <KnowledgeReader document={document} />;
}

function relatedFor(href: string, group: string) {
    return searchIndex.filter((item) => item.href !== href && item.group === group).slice(0, 4).map((item) => ({ title: item.title, group: item.group, href: `/karada-navi/knowledge${item.href}` }));
}

function resolveDocument(path: string[], href: string): KnowledgeDocument | null {
    const [collection, slug] = path;
    if (collection === 'nutrients' && slug) {
        const item = nutrients.find((entry) => entry.slug === slug); if (!item) return null;
        return { title: item.name, en: item.en, group: '栄養素', tagline: item.tagline, color: item.color, body: item.role, sections: [{ title: '不足を考えるサイン', items: item.deficiencySigns }, { title: '食品から摂る', items: item.foods }, { title: '取り入れ方', items: item.tips }], related: relatedFor(href, '栄養素') };
    }
    if (collection === 'biomarkers' && slug) {
        const item = biomarkers.find((entry) => entry.slug === slug); if (!item) return null;
        return { title: item.name, en: item.en, group: '血液検査', tagline: item.tagline, color: item.color, body: item.role, sections: [{ title: '基準範囲', items: [item.standardRange, ...(item.optimalRange ? [`参考となる理想範囲：${item.optimalRange}`] : [])] }, { title: '高い・低いときの背景', items: [`高いとき：${item.highSigns}`, `低いとき：${item.lowSigns}`] }, { title: '読み解くヒント', items: item.tips }], related: relatedFor(href, '血液検査') };
    }
    if (collection === 'foods' && slug) {
        const item = foods.find((entry) => entry.slug === slug); if (!item) return null;
        return { title: item.name, en: item.en, group: '食べ物', tagline: item.tagline, color: item.color, body: item.description, sections: [{ title: '食べ方のヒント', items: item.tips }, { title: '主な栄養素', items: item.nutrients.map((nutrient) => nutrients.find((entry) => entry.slug === nutrient)?.name || nutrient) }], related: relatedFor(href, '食べ物') };
    }
    if (collection === 'symptoms' && slug) {
        const item = symptoms.find((entry) => entry.slug === slug); if (!item) return null;
        return { title: item.name, en: item.en, group: '症状', tagline: item.tagline, color: item.color, body: item.intro, sections: [{ title: '考えられる背景', items: item.causes }, { title: 'まず観察すること', items: item.selfCare }], related: relatedFor(href, '症状') };
    }
    if (collection === 'genes' && slug) {
        const item = genes.find((entry) => entry.slug === slug); if (!item) return null;
        return { title: item.symbol, en: item.name, group: '遺伝子', tagline: item.tagline, color: item.color, body: item.role, sections: [{ title: '働きが弱い場合の傾向', items: item.dirtyEffects }, { title: '整える視点', items: item.cleanStrategies.map((entry) => `${entry.title}：${entry.description}`) }, { title: '関係する栄養', items: item.nutrients }], related: relatedFor(href, '遺伝子') };
    }
    if (collection === 'hormones' && slug) {
        const item = hormones.find((entry) => entry.slug === slug); if (!item) return null;
        return { title: item.name, en: item.en, group: 'ホルモン', tagline: item.tagline, color: item.color, body: item.role, sections: [{ title: '主な働き', items: item.functions }, { title: '40代からの変化', items: [item.agingNote] }], related: relatedFor(href, 'ホルモン') };
    }
    if (collection === 'organs' && slug) {
        const item = organs.find((entry) => entry.slug === slug); if (!item) return null;
        return { title: item.name, en: item.en, group: '内臓・臓器', tagline: item.tagline, color: item.color, body: item.role, sections: [{ title: '主な働き', items: item.functions }, { title: '40代からの変化', items: [item.agingNote] }], related: relatedFor(href, '内臓・臓器') };
    }
    const indexed = searchIndex.find((item) => item.href === href);
    if (!indexed) return null;
    return { title: indexed.title, en: indexed.sub, group: indexed.group, tagline: indexed.sub, color: '#DCF1EA', body: '', sections: [], related: [], sourceHref: href };
}

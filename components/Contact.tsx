'use client';

import { useState } from 'react';
import Image from 'next/image';
import FadeOnScroll from './FadeOnScroll';

const INQUIRY_TYPES: { id: string; label: string; template: string }[] = [
    {
        id: 'first',
        label: '初回相談',
        template: '初めまして。ミトコンドリア解析サービスに興味があります。\n（気になっている体調・目的・聞いてみたいことがあれば自由にお書きください）\n\n',
    },
    {
        id: 'price',
        label: '料金について',
        template: '料金プランや支払い方法について教えてください。\n（プラン選びで迷っている点・予算感などあれば添えてください）\n\n',
    },
    {
        id: 'booking',
        label: '予約・スケジュール',
        template: '解析の予約・スケジュールを相談したいです。\n希望時期：\nご都合の良い曜日・時間帯：\n\n',
    },
    {
        id: 'quick',
        label: 'ちょっと聞きたい',
        template: 'ちょっとした疑問なのですが、\n（軽い質問・気になっている点を1行から）\n\n',
    },
    {
        id: 'media',
        label: 'メディア・取材',
        template: '取材・記事執筆・コラボレーションのご相談です。\n媒体名：\n趣旨：\n希望時期：\n\n',
    },
];

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [activeType, setActiveType] = useState<string | null>(null);

    const pickType = (t: typeof INQUIRY_TYPES[number]) => {
        setActiveType(t.id);
        setFormData((d) => ({ ...d, message: t.template + d.message.replace(/^.*?\n\n/, '') }));
        const el = document.getElementById('contact-message');
        if (el) {
            el.focus();
            setTimeout(() => {
                const range = document.createRange();
                range.selectNodeContents(el);
                range.collapse(false);
                const sel = window.getSelection();
                sel?.removeAllRanges();
                sel?.addRange(range);
            }, 50);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || '送信に失敗しました');
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setActiveType(null);
        } catch (error) {
            setStatus('error');
            setErrorMessage(error instanceof Error ? error.message : '送信に失敗しました');
        }
    };

    return (
        <section id="contact" className="py-24 bg-[#6CC6E8] border-t border-[#1A1A1A] relative overflow-hidden">
            <div className="max-w-[820px] mx-auto px-4 relative z-10">

                {/* ヘッダー */}
                <FadeOnScroll>
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#1A1A1A] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            CONTACT
                        </h2>
                        <p className="text-sm text-[#1A1A1A]/80">疑問・予約・ちょっとした質問、なんでもどうぞ。</p>
                    </div>
                </FadeOnScroll>

                {/* カウンセラー紹介ミニカード */}
                <FadeOnScroll delay={0.1}>
                    <div className="bg-white rounded-2xl border border-[#1A1A1A] p-5 md:p-6 mb-8 flex flex-col md:flex-row items-center gap-5">
                        <div className="flex-shrink-0">
                            <Image src="/images/profile.jpg" alt="小林大介" width={80} height={80}
                                className="rounded-full object-cover border-2 border-[#1A1A1A]"
                                style={{ width: 80, height: 80 }} />
                        </div>
                        <div className="text-center md:text-left">
                            <div className="text-xs font-bold tracking-wider text-[#FF9855] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                YOUR COUNSELOR
                            </div>
                            <div className="text-lg font-bold text-[#1A1A1A] mb-1">小林大介</div>
                            <p className="text-xs text-[#1A1A1A]/80 leading-relaxed">
                                お問い合わせは、私が直接お返事します。<br />
                                <span className="font-bold">通常2営業日以内</span>にメールで返信。気軽にどうぞ。
                            </p>
                        </div>
                    </div>
                </FadeOnScroll>

                {/* メイン: フォーム or 完了 */}
                <FadeOnScroll delay={0.15}>
                    {status === 'success' ? (
                        <div className="bg-white rounded-2xl border border-[#1A1A1A] p-8 md:p-10 text-center">
                            <div className="text-4xl mb-4">✓</div>
                            <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">送信完了しました</h3>
                            <div className="text-sm text-[#1A1A1A]/80 leading-relaxed max-w-[480px] mx-auto space-y-2">
                                <p>お問い合わせありがとうございます。</p>
                                <p>まず自動返信メールが届きます。<br />その後 <strong>2営業日以内に小林より直接お返事</strong> します。</p>
                                <p className="text-xs text-[#4A4A4A] pt-3">迷惑メールフォルダもご確認ください。</p>
                            </div>
                            <button onClick={() => setStatus('idle')}
                                className="mt-6 px-6 py-2 bg-[#1A1A1A] text-white rounded-full text-sm font-bold hover:bg-[#333] transition">
                                新しいお問い合わせ
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">

                            {/* 相談タイプ選択 */}
                            <div className="bg-white rounded-2xl border border-[#1A1A1A] p-5 md:p-6">
                                <div className="text-xs font-bold tracking-wider text-[#1A1A1A]/70 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                    INQUIRY TYPE ／ どんなご相談ですか？
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {INQUIRY_TYPES.map((t) => (
                                        <button key={t.id} type="button" onClick={() => pickType(t)}
                                            className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold border transition ${activeType === t.id ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white text-[#1A1A1A] border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white'}`}>
                                            {t.label}
                                        </button>
                                    ))}
                                </div>
                                <p className="text-[11px] text-[#4A4A4A] mt-3">タグをクリックすると下のメッセージ欄に下書きが入ります。自由に編集してください。</p>
                            </div>

                            {/* フォーム */}
                            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#1A1A1A] p-5 md:p-6 space-y-5">
                                {status === 'error' && (
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
                                        {errorMessage}
                                    </div>
                                )}

                                <div>
                                    <label htmlFor="name" className="block text-xs font-bold mb-1.5 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.05em' }}>
                                        NAME ／ お名前 <span className="text-[#E54848]">*</span>
                                    </label>
                                    <input type="text" id="name" required disabled={status === 'loading'}
                                        className="w-full px-4 py-2.5 border border-[#D5D5D5] rounded-lg bg-white focus:outline-none focus:border-[#FF9855] text-sm disabled:opacity-50"
                                        value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-xs font-bold mb-1.5 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.05em' }}>
                                        EMAIL ／ メールアドレス <span className="text-[#E54848]">*</span>
                                    </label>
                                    <input type="email" id="email" required disabled={status === 'loading'}
                                        className="w-full px-4 py-2.5 border border-[#D5D5D5] rounded-lg bg-white focus:outline-none focus:border-[#FF9855] text-sm disabled:opacity-50"
                                        value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                </div>

                                <div>
                                    <label htmlFor="contact-message" className="block text-xs font-bold mb-1.5 text-[#1A1A1A]" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.05em' }}>
                                        MESSAGE ／ メッセージ <span className="text-[#E54848]">*</span>
                                    </label>
                                    <textarea id="contact-message" rows={7} required disabled={status === 'loading'}
                                        placeholder="気になっていること、ご質問、ご相談内容を自由にお書きください。"
                                        className="w-full px-4 py-2.5 border border-[#D5D5D5] rounded-lg bg-white focus:outline-none focus:border-[#FF9855] text-sm resize-y disabled:opacity-50"
                                        value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                                </div>

                                <div className="text-center pt-2">
                                    <button type="submit" disabled={status === 'loading'}
                                        className="px-10 py-3.5 bg-[#1A1A1A] text-white font-bold rounded-full hover:bg-[#333] transition disabled:opacity-50 text-sm"
                                        style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.05em' }}>
                                        {status === 'loading' ? '送信中...' : '送信する →'}
                                    </button>
                                    <p className="text-[11px] text-[#4A4A4A] mt-3">
                                        送信後、自動返信メール → 2営業日以内に小林より個別返信。
                                    </p>
                                </div>
                            </form>

                            {/* 直接メール代替 */}
                            <div className="text-center text-sm text-[#1A1A1A]/80">
                                またはメールで直接: <a href="mailto:info@mitoflow40.com" className="font-bold underline hover:text-[#FF9855]">info@mitoflow40.com</a>
                            </div>
                        </div>
                    )}
                </FadeOnScroll>

            </div>

            {/* Illustrations */}
            <Image
                src="/images/contact-illustration-left.png"
                alt=""
                width={300}
                height={300}
                className="absolute bottom-[-20px] left-[-50px] md:left-[20px] w-[180px] md:w-[260px] h-auto object-contain pointer-events-none opacity-80 z-0"
            />
            <Image
                src="/images/contact-illustration-right.png"
                alt=""
                width={300}
                height={300}
                className="absolute bottom-[-30px] right-[-50px] md:right-[20px] w-[180px] md:w-[260px] h-auto object-contain pointer-events-none opacity-80 z-0"
            />
        </section>
    );
}

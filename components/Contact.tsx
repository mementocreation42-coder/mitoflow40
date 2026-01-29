'use client';

import { useState } from 'react';
import Image from 'next/image';
import FadeOnScroll from './FadeOnScroll';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || '送信に失敗しました');
            }

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setStatus('error');
            setErrorMessage(error instanceof Error ? error.message : '送信に失敗しました');
        }
    };

    return (
        <section id="contact" className="py-24 bg-[#6CC6E8] border-t border-[#1A1A1A] relative overflow-hidden">
            <div className="max-w-[800px] mx-auto px-4 relative z-10">
                <FadeOnScroll>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            CONTACT
                        </h2>
                        <p className="text-[#1A1A1A]/70">ご予約・お問い合わせ</p>
                    </div>
                </FadeOnScroll>

                <FadeOnScroll delay={0.2}>
                    {status === 'success' ? (
                        <div className="max-w-[600px] mx-auto text-center bg-white/50 backdrop-blur-sm p-8 rounded-xl border border-[#1A1A1A]">
                            <div className="text-4xl mb-4">✓</div>
                            <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">送信完了</h3>
                            <p className="text-[#1A1A1A]/80">
                                お問い合わせありがとうございます。<br />
                                内容を確認の上、折り返しご連絡いたします。
                            </p>
                            <button
                                onClick={() => setStatus('idle')}
                                className="mt-6 px-6 py-2 bg-[#1A1A1A] text-white rounded-full hover:bg-[#333333] transition-colors"
                            >
                                新しいお問い合わせ
                            </button>
                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="max-w-[600px] mx-auto space-y-6"
                        >
                            {status === 'error' && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                                    {errorMessage}
                                </div>
                            )}

                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-[#1A1A1A] mb-2 uppercase tracking-wide"
                                >
                                    NAME
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    disabled={status === 'loading'}
                                    className="w-full px-4 py-3 border border-[#1A1A1A]/30 rounded-lg bg-[#A8D8EA] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/50 disabled:opacity-50"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-[#1A1A1A] mb-2 uppercase tracking-wide"
                                >
                                    EMAIL
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    disabled={status === 'loading'}
                                    className="w-full px-4 py-3 border border-[#1A1A1A]/30 rounded-lg bg-[#A8D8EA] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/50 disabled:opacity-50"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-[#1A1A1A] mb-2 uppercase tracking-wide"
                                >
                                    MESSAGE
                                </label>
                                <textarea
                                    id="message"
                                    rows={6}
                                    required
                                    disabled={status === 'loading'}
                                    className="w-full px-4 py-3 border border-[#1A1A1A]/30 rounded-lg bg-[#A8D8EA] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/50 resize-none disabled:opacity-50"
                                    value={formData.message}
                                    onChange={(e) =>
                                        setFormData({ ...formData, message: e.target.value })
                                    }
                                />
                            </div>

                            <div className="text-center">
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="px-12 py-4 bg-[#1A1A1A] text-white font-semibold rounded-full hover:bg-[#333333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {status === 'loading' ? '送信中...' : '送信する'}
                                </button>
                            </div>
                        </form>
                    )}
                </FadeOnScroll>
            </div>

            {/* Illustrations */}
            <Image
                src="/images/contact-illustration-left.png"
                alt=""
                width={300}
                height={300}
                className="absolute bottom-[-20px] left-[-50px] md:left-[20px] w-[200px] md:w-[300px] h-auto object-contain pointer-events-none opacity-90 z-0"
            />
            <Image
                src="/images/contact-illustration-right.png"
                alt=""
                width={300}
                height={300}
                className="absolute bottom-[-30px] right-[-50px] md:right-[20px] w-[200px] md:w-[300px] h-auto object-contain pointer-events-none opacity-90 z-0"
            />
        </section>
    );
}

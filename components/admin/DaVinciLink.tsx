'use client';

import { useEffect, useState } from 'react';
import { INBOX_ORIGIN } from './inbox';

// DaVinci24 受付（解析者の Mac 上の localhost:2424）へのリンク。
// 受付が起動しているかを ping で確かめ、止まっているときは真っ白な接続エラーの代わりに案内を出す。
// mode:'no-cors' の fetch は、到達できれば opaque 応答で resolve し、接続拒否なら reject する。

export default function DaVinciLink({ href, className, children, title }: { href: string; className?: string; children: React.ReactNode; title?: string }) {
    const [reachable, setReachable] = useState<boolean | null>(null);

    useEffect(() => {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 1500);
        fetch(`${INBOX_ORIGIN}/`, { mode: 'no-cors', signal: ctrl.signal, cache: 'no-store' })
            .then(() => setReachable(true))
            .catch(() => setReachable(false))
            .finally(() => clearTimeout(timer));
        return () => { ctrl.abort(); clearTimeout(timer); };
    }, []);

    const down = reachable === false;
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
            style={down ? { opacity: 0.55 } : undefined}
            title={down ? '受付が起動していません。Claude Code に「受付を開いて」と伝えるか、node .claude/skills/davinci24/scripts/inbox.mjs を実行してください' : title}
            onClick={(e) => {
                if (!down) return;
                e.preventDefault();
                alert('DaVinci24 受付（localhost:2424）が起動していません。\nClaude Code に「受付を開いて」と伝えるか、ターミナルで\n  node .claude/skills/davinci24/scripts/inbox.mjs\nを実行してから開いてください。');
            }}
        >
            {children}{down && <span style={{ fontSize: 10, marginLeft: 4, opacity: 0.8 }}>（停止中）</span>}
        </a>
    );
}

'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

// 一覧の 1 行。削除されたら React の state で非表示にする（DOM を直接消すと React の再描画と衝突する）。
const Ctx = createContext<() => void>(() => {});
export const useMarkDeleted = () => useContext(Ctx);

export default function PostRow({ className, children }: { className?: string; children: ReactNode }) {
  const [deleted, setDeleted] = useState(false);
  if (deleted) return null;
  return (
    <Ctx.Provider value={() => setDeleted(true)}>
      <article className={className}>{children}</article>
    </Ctx.Provider>
  );
}

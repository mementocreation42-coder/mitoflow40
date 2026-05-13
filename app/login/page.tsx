'use client';

import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { login } from './actions';
import { Suspense } from 'react';

function LoginForm() {
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/admin';
  const [state, formAction, isPending] = useActionState(login, { error: '' });

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#0a0a0a',
      fontFamily: '"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
    }}>
      <div style={{
        background: '#141414', border: '1px solid #222', borderRadius: 16,
        padding: '48px 40px', width: 360, boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', letterSpacing: '-0.5px' }}>
            Mitoflow40
          </div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 4, letterSpacing: '0.1em' }}>
            ADMIN
          </div>
        </div>

        <form action={formAction}>
          <input type="hidden" name="from" value={from} />

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 12, color: '#888', marginBottom: 8 }}>
              パスワード
            </label>
            <input
              name="password"
              type="password"
              required
              autoFocus
              placeholder="••••••••"
              style={{
                width: '100%', padding: '12px 14px', background: '#1e1e1e',
                border: '1px solid #2a2a2a', borderRadius: 8, color: '#fff',
                fontSize: 15, outline: 'none', boxSizing: 'border-box',
              }}
            />
          </div>

          {state.error && (
            <p style={{ color: '#f87171', fontSize: 13, marginBottom: 16 }}>{state.error}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            style={{
              width: '100%', padding: '13px', background: isPending ? '#333' : '#22c55e',
              color: '#000', border: 'none', borderRadius: 8, fontSize: 14,
              fontWeight: 600, cursor: isPending ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
            }}
          >
            {isPending ? 'ログイン中...' : 'ログイン'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

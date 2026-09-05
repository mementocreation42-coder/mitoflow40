// Node から Mitoflow40 本体の TypeScript（lib/*.ts）を直接 import するための解決フック。
// Next 側のコードは './intake' のように拡張子なしで相対 import するが、Node の ESM はそれを解決できない。
// ここで「相対 import に拡張子が無ければ .ts（次に .tsx）を試す」だけを足す。型の除去は Node 22.18+/24 の標準機能。
//   使い方: import { register } from 'node:module'; register('./ts-hooks.mjs', import.meta.url);
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export async function resolve(specifier, context, next) {
    if ((specifier.startsWith('./') || specifier.startsWith('../')) && !/\.[a-zA-Z0-9]+$/.test(specifier) && context.parentURL) {
        const base = new URL(specifier, context.parentURL);
        for (const ext of ['.ts', '.tsx']) {
            if (existsSync(fileURLToPath(base) + ext)) return next(base.href + ext, context);
        }
    }
    return next(specifier, context);
}

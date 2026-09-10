# -*- coding: utf-8 -*-
# トップのヒーローイラスト（public/images/hero/hero-illustration-bl.png）を、人物 5 人とミトコンドリア 4 個の 9 レイヤーに分ける。
# 使い方: python3 scripts/hero-motion/split.py <出力ディレクトリ>
import sys
from pathlib import Path
from PIL import Image
import numpy as np
from scipy import ndimage

OUT = Path(sys.argv[1]); OUT.mkdir(parents=True, exist_ok=True)
im = Image.open('public/images/hero/hero-illustration-bl.png').convert('RGBA')
rgba = np.array(im); a = rgba[:, :, 3]
hsv = np.array(im.convert('RGB').convert('HSV')).astype(float)
H, Sat, V = hsv[:, :, 0] * 360 / 255, hsv[:, :, 1] / 255, hsv[:, :, 2] / 255
lab, n = ndimage.label(a > 8)
# 成分 1 は上の 3 人（手と髪が触れていて 1 つにつながっている）→ 座標の k-means で 3 つに分け、紫（髪・パンツ）は必ず女性へ
m1 = lab == 1
ys, xs = np.where(m1); pts = np.stack([xs, ys], 1).astype(float)
seeds = np.array([[310, 150], [560, 330], [760, 170]], float)  # 青い男性・紫の髪の女性・緑のシャツの人
for _ in range(20):
    k = ((pts[:, None, :] - seeds[None, :, :]) ** 2).sum(2).argmin(1)
    for j in range(3): seeds[j] = pts[k == j].mean(0)
assign = np.zeros_like(a, int); assign[ys, xs] = k + 1
purple = m1 & (H >= 235) & (H <= 290) & (Sat > 0.25) & (V > 0.35)
assign[purple] = 2
assign[ndimage.binary_dilation(purple, iterations=4) & m1 & (assign == 1)] = 2
for j in (1, 2, 3):  # 各ラベルは最大成分だけ残す
    l, c = ndimage.label(assign == j)
    if c > 1:
        sizes = ndimage.sum(np.ones_like(a), l, range(1, c + 1)); keep = int(np.argmax(sizes)) + 1
        assign[(assign == j) & (l != keep)] = 0
_, (iy, ix) = ndimage.distance_transform_edt(assign == 0, return_indices=True)
assign = np.where(m1 & (assign == 0), assign[iy, ix], assign)
layers = {'blue_man': assign == 1, 'purple_woman': assign == 2, 'green_person': assign == 3}
for cid, name in {6: 'yellow_man', 5: 'falling_woman', 7: 'mito_br', 2: 'mito_tl', 4: 'mito_ml', 3: 'mito_tr'}.items():
    layers[name] = lab == cid
for name, m in layers.items():
    out = np.zeros_like(rgba); out[m] = rgba[m]; Image.fromarray(out).save(OUT / f'{name}.png')
    yy, xx = np.where(m); print(name, int(m.sum()), xx.min(), yy.min(), xx.max(), yy.max())

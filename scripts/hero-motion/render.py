# -*- coding: utf-8 -*-
import math, sys
from pathlib import Path
from PIL import Image
import numpy as np
S = Path(sys.argv[1]); SW, SH = 1024, 752; OFFY = 48; W, H = SW, SH + OFFY; FPS = 24; T = 9.0; N = int(FPS * T)

def load(name):
    im = Image.open(S / f'{name}.png').convert('RGBA'); return im
layers = {n: np.array(load(n)) for n in ['mito_tl','mito_ml','mito_tr','mito_br','falling_woman','blue_man','green_person','purple_woman','yellow_man']}
# 緑の人物に付いた女性の黒いブーツ（x 690-750, y 255-325 の暗い画素）を女性へ戻す
g = layers['green_person']; w = layers['purple_woman']
ys, xs = np.mgrid[0:SH, 0:SW]
dark = (g[:,:,3] > 0) & (xs >= 690) & (xs <= 750) & (ys >= 255) & (ys <= 325) & (g[:,:,:3].max(2) < 90)
w[dark] = g[dark]; g[dark] = 0
# 各レイヤーを bbox で切り出し
parts = {}
for n, arr in layers.items():
    a = arr[:,:,3]; yy, xx = np.where(a > 0); x0, y0, x1, y1 = xx.min(), yy.min(), xx.max()+1, yy.max()+1
    pad = 12; x0p, y0p = max(0, x0-pad), max(0, y0-pad); x1p, y1p = min(SW, x1+pad), min(SH, y1+pad)
    parts[n] = dict(img=Image.fromarray(arr[y0p:y1p, x0p:x1p]), pos=(x0p, y0p + OFFY))
# 動き：振幅（px）・回転（度）・位相。周期は 9 秒で整数回ループ（つなぎ目なし）
M = {
    'mito_tl':       dict(ax=18, ay=30, rot=16, ph=0.10, n2=2),
    'mito_ml':       dict(ax=14, ay=28, rot=-14, ph=0.55, n2=2),
    'mito_tr':       dict(ax=16, ay=32, rot=18, ph=0.30, n2=2),
    'mito_br':       dict(ax=20, ay=34, rot=-13, ph=0.80, n2=2),
    'falling_woman': dict(ax=10, ay=24, rot=3.5, ph=0.65, n2=1),
    'blue_man':      dict(ax=9,  ay=20, rot=2.4, ph=0.20, n2=1),
    'purple_woman':  dict(ax=9,  ay=20, rot=2.0, ph=0.24, n2=1),   # 男性と手が触れているので位相をそろえる
    'green_person':  dict(ax=10, ay=22, rot=2.8, ph=0.28, n2=1),
    'yellow_man':    dict(ax=7,  ay=0,  rot=0.0, ph=0.90, n2=1),   # 下端で切れている人物：上下や回転で切れ目が見えないよう横にだけ漂う
}
def motion(m, t):
    u = t / T
    dx = m['ax'] * math.sin(2*math.pi*(u + m['ph'])) + 0.35*m['ax']*math.sin(2*math.pi*(m['n2']*u + m['ph']*1.7))
    dy = m['ay'] * math.sin(2*math.pi*(u + m['ph'] + 0.25)) + 0.35*m['ay']*math.sin(2*math.pi*(m['n2']*u + m['ph']*2.3))
    r  = m['rot'] * math.sin(2*math.pi*(u + m['ph'] + 0.1))
    return dx, dy, r
for i in range(N):
    t = i / FPS
    frame = Image.new('RGBA', (W, H), (0,0,0,0))
    for n, p in parts.items():
        dx, dy, r = motion(M[n], t)
        img = p['img']; cx, cy = img.width/2, img.height/2
        rot = img.rotate(r, resample=Image.BICUBIC, expand=True)
        x = p['pos'][0] + cx - rot.width/2 + dx; y = p['pos'][1] + cy - rot.height/2 + dy
        # サブピクセル位置は整数へ（アルファ合成のにじみを避ける）
        frame.alpha_composite(rot, (int(round(x)), int(round(y))))
    frame.save(S / 'frames' / f'f_{i:04d}.png')
print('frames', N)
# 確認用コンタクトシート
sheet = Image.new('RGBA', (W*3//2, H//2), (255,255,255,255))
for k, fi in enumerate([0, N//3, 2*N//3]):
    im = Image.open(S / 'frames' / f'f_{fi:04d}.png').resize((W//2, H//2)); sheet.paste(im, (k*W//2, 0), im)
sheet.save(S / '_sheet.png')

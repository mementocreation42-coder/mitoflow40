# ヒーローのイラストを動かす（透過動画の作り方）

トップの `hero-illustration-bl.png`（無重力で漂う 5 人と 4 個のミトコンドリア）を部品ごとに分け、
それぞれ違う位相でゆっくり漂わせた 9 秒ループの透過動画にして、`components/HeroMotion.tsx` で貼っている。
CSS アニメーションではなく、動画ファイルそのものを差し替えれば別の動きにできる（DaVinci Resolve 等で作った透過動画でも可）。

```
python3 scripts/hero-motion/split.py  /tmp/hero        # 9 枚のレイヤー PNG
python3 scripts/hero-motion/render.py /tmp/hero        # frames/f_0000.png … 216 枚（24fps × 9 秒）＋ _sheet.png
cd /tmp/hero
ffmpeg -framerate 24 -i frames/f_%04d.png -c:v libvpx-vp9 -pix_fmt yuva420p -b:v 0 -crf 40 -deadline good -cpu-used 2 -row-mt 1 -auto-alt-ref 0 hero.webm
ffmpeg -framerate 24 -i frames/f_%04d.png -vf format=bgra -c:v hevc_videotoolbox -alpha_quality 0.6 -q:v 42 -tag:v hvc1 hero.mp4
cp hero.webm public/videos/hero-illustration.webm   # Chrome / Firefox（VP9 アルファ）
cp hero.mp4  public/videos/hero-illustration.mp4    # Safari（HEVC アルファ）
```

- 動きの強さ・位相は `render.py` の `M` を編集する（人物は小さく、ミトコンドリアは大きく。手が触れている青い男性と紫の女性は位相をそろえる）
- 必要: Python 3 + Pillow + numpy + scipy、ffmpeg（libvpx-vp9、macOS の hevc_videotoolbox）
- `HeroMotion.tsx` は Safari には mp4、それ以外には webm を出し、動きを減らす設定の人には静止画を出す

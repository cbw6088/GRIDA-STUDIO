"""소개 섹션 일러스트(SVG) 생성 스크립트. 실행: python3 scripts/make-intro-art.py"""
import os, random
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "intro")
os.makedirs(OUT, exist_ok=True)
INK, SLATE, MUTE = "#17201B", "#56625B", "#96A199"
BG, BG2, PAPER, TONE, DEEP = "#E7EFEA", "#D6E6DB", "#FCFDFC", "#C9DDD0", "#4E7C63"
ACC = "#FF6B3D"

DEFS = f'''<defs>
<filter id="sh" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur in="SourceAlpha" stdDeviation="18"/><feOffset dx="14" dy="22"/><feComponentTransfer><feFuncA type="linear" slope=".18"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="shs" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur in="SourceAlpha" stdDeviation="8"/><feOffset dx="6" dy="10"/><feComponentTransfer><feFuncA type="linear" slope=".16"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="blur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="22"/></filter>
<filter id="pencil"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="2"/><feDisplacementMap in="SourceGraphic" scale="1.6"/></filter>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F6F9F7"/><stop offset="1" stop-color="{BG2}"/></linearGradient>
<linearGradient id="light" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFFFF" stop-opacity=".75"/><stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/></linearGradient>
</defs>'''

def leaves(cx, cy, scale, n=7, seed=1, op=.10):
    random.seed(seed); out=[]
    for i in range(n):
        a = -70 + i*24 + random.uniform(-8, 8)
        L = random.uniform(150, 230)*scale
        out.append(f'<g transform="translate({cx} {cy}) rotate({a:.0f})"><path d="M0 0 C {L*.25:.0f} {-L*.12:.0f}, {L*.7:.0f} {-L*.14:.0f}, {L:.0f} 0 C {L*.7:.0f} {L*.14:.0f}, {L*.25:.0f} {L*.12:.0f}, 0 0 Z" fill="{INK}" opacity="{op}"/></g>')
    return f'<g filter="url(#blur)">{"".join(out)}</g>'

def window_light(w, h):
    return (f'<polygon points="{w*.15},0 {w*.55},0 {w*1.05},{h*.75} {w*.65},{h*.75}" fill="url(#light)" opacity=".7"/>'
            f'<polygon points="{w*.62},0 {w*.78},0 {w*1.1},{h*.45} {w*.94},{h*.45}" fill="url(#light)" opacity=".5"/>')

def svg(w, h, body):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">{DEFS}<rect width="{w}" height="{h}" fill="url(#bg)"/>{body}</svg>'

# 1) main: 스케치북 위에 그린 화면 밑그림 + 연필 + 찻잔 (800x1000)
sk = []
sk.append(f'<g transform="translate(130 210) rotate(-6)" filter="url(#sh)">'
          f'<rect width="470" height="600" rx="10" fill="{PAPER}"/>'
          f'<rect x="0" y="0" width="22" height="600" rx="6" fill="#EEF3EF"/>'
          + "".join(f'<circle cx="11" cy="{40+i*44}" r="4" fill="{BG2}"/>' for i in range(13)) +
          f'<g filter="url(#pencil)" fill="none" stroke="{SLATE}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" opacity=".85">'
          f'<rect x="70" y="60" width="350" height="250" rx="12"/>'
          f'<line x1="70" y1="96" x2="420" y2="96"/>'
          f'<circle cx="92" cy="78" r="4"/><circle cx="108" cy="78" r="4"/><circle cx="124" cy="78" r="4"/>'
          f'<path d="M100 140 H 260"/><path d="M100 166 H 220"/>'
          f'<rect x="100" y="196" width="88" height="30" rx="15"/>'
          f'<rect x="100" y="248" width="94" height="40" rx="8"/><rect x="200" y="248" width="94" height="40" rx="8"/><rect x="300" y="248" width="94" height="40" rx="8"/>'
          f'<path d="M300 130 L 390 220 M 390 130 L 300 220"/><rect x="300" y="130" width="90" height="90" rx="6"/>'
          f'<path d="M70 360 H 300" stroke-width="2"/><path d="M70 390 H 260" stroke-width="2"/><path d="M70 420 H 330" stroke-width="2"/>'
          f'<path d="M70 480 C 120 460, 160 500, 210 478 S 300 470, 330 486" stroke="{DEEP}"/>'
          f'</g>'
          f'<g transform="translate(330 470)"><circle r="9" fill="{ACC}"/><path d="M8 3 C 8 14, 3 21, -5 26" stroke="{ACC}" stroke-width="5" stroke-linecap="round" fill="none"/></g>'
          f'</g>')
# 연필
sk.append(f'<g transform="translate(520 760) rotate(-58)" filter="url(#shs)">'
          f'<rect x="0" y="-11" width="300" height="22" rx="3" fill="#F4F2EE"/>'
          f'<rect x="0" y="-11" width="300" height="7" fill="#FFFFFF" opacity=".7"/>'
          f'<rect x="270" y="-11" width="30" height="22" fill="{TONE}"/>'
          f'<polygon points="0,-11 0,11 -40,0" fill="#E7D7C5"/><polygon points="-26,-4 -26,4 -40,0" fill="{INK}"/></g>')
# 찻잔
sk.append(f'<g transform="translate(640 210)" filter="url(#sh)"><circle r="92" fill="#F1F5F2"/><circle r="70" fill="#FFFFFF"/><circle r="60" fill="#B9D3C1"/><circle r="60" fill="url(#light)" opacity=".6"/></g>'
          f'<path d="M 728 236 C 770 236, 770 296, 724 290" fill="none" stroke="#F4F6F8" stroke-width="16" stroke-linecap="round"/>')
main = svg(800, 1000, leaves(60, 40, 1.4, 9, 3, .09) + window_light(800, 1000) + "".join(sk) + leaves(820, 980, 1.1, 6, 5, .07))
open(os.path.join(OUT, "intro-main.svg"), "w").write(main)

# 2) side1: 색과 글꼴 견본 카드 (800x600)
cards = []
for i, (rot, col) in enumerate([(-12, TONE), (-3, "#A8C8B3"), (7, "#24523E")]):
    fg = INK
    cards.append(f'<g transform="translate({250+i*130} {320}) rotate({rot})" filter="url(#sh)">'
                 f'<rect x="-110" y="-170" width="220" height="320" rx="16" fill="{PAPER}"/>'
                 f'<rect x="-90" y="-150" width="180" height="190" rx="10" fill="{col}"/>'
                 f'<text x="-90" y="90" font-family="Pretendard, Apple SD Gothic Neo, sans-serif" font-size="30" font-weight="700" fill="{INK}">{["가","Aa","그"][i]}</text>'
                 f'<rect x="-90" y="110" width="120" height="8" rx="4" fill="{BG2}"/></g>')
s1 = svg(800, 600, leaves(700, 40, 1.0, 7, 8, .08) + window_light(800, 600) + "".join(cards))
open(os.path.join(OUT, "intro-side-1.svg"), "w").write(s1)

# 3) side2: 떠 있는 브라우저 창 + 커서 (800x600)
b = (f'<g transform="translate(130 110)" filter="url(#sh)"><rect width="540" height="380" rx="22" fill="{PAPER}"/>'
     f'<rect width="540" height="44" rx="22" fill="#EEF3EF"/><rect y="22" width="540" height="22" fill="#EEF3EF"/>'
     f'<circle cx="28" cy="22" r="6" fill="{TONE}"/><circle cx="48" cy="22" r="6" fill="{TONE}"/><circle cx="68" cy="22" r="6" fill="{TONE}"/>'
     f'<rect x="40" y="80" width="230" height="20" rx="10" fill="{INK}" opacity=".85"/><rect x="40" y="112" width="170" height="12" rx="6" fill="{BG2}"/>'
     f'<rect x="40" y="146" width="96" height="34" rx="17" fill="#24523E"/>'
     f'<rect x="300" y="72" width="200" height="140" rx="14" fill="{BG}"/>'
     f'<circle cx="355" cy="120" r="22" fill="#FFFFFF" opacity=".8"/><path d="M300 190 L 360 150 L 410 185 L 450 160 L 500 200 L 500 212 L 300 212 Z" fill="{TONE}"/>'
     + "".join(f'<rect x="{40+i*156}" y="240" width="140" height="100" rx="12" fill="#F1F5F2"/>' for i in range(3)) +
     f'</g><g transform="translate(560 420)" filter="url(#shs)"><path d="M0 0 L 0 46 L 12 35 L 22 56 L 31 52 L 21 31 L 37 31 Z" fill="{INK}" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="round"/></g>')
s2 = svg(800, 600, window_light(800, 600) + b + leaves(-20, 600, 1.0, 6, 11, .07))
open(os.path.join(OUT, "intro-side-2.svg"), "w").write(s2)

# 4) side3: 세워 둔 휴대폰 화면 + 화분 그림자 (800x600)
ph = (f'<g transform="translate(300 70)" filter="url(#sh)"><rect width="230" height="460" rx="36" fill="{INK}"/>'
      f'<rect x="10" y="10" width="210" height="440" rx="28" fill="{PAPER}"/>'
      f'<rect x="88" y="22" width="54" height="10" rx="5" fill="{INK}"/>'
      f'<rect x="28" y="60" width="174" height="150" rx="16" fill="{BG}"/>'
      f'<path d="M28 186 L 80 146 L 120 176 L 150 156 L 202 196 L 202 210 L 28 210 Z" fill="{TONE}"/>'
      f'<rect x="28" y="232" width="130" height="14" rx="7" fill="{INK}" opacity=".85"/><rect x="28" y="256" width="100" height="9" rx="4.5" fill="{BG2}"/>'
      f'<rect x="28" y="284" width="80" height="28" rx="14" fill="#24523E"/>'
      f'<rect x="28" y="334" width="80" height="80" rx="12" fill="#F1F5F2"/><rect x="122" y="334" width="80" height="80" rx="12" fill="#F1F5F2"/></g>')
s3 = svg(800, 600, leaves(120, 40, 1.2, 8, 21, .10) + window_light(800, 600) + ph)
open(os.path.join(OUT, "intro-side-3.svg"), "w").write(s3)
print("ok")

from PIL import Image, ImageDraw, ImageFont, ImageFilter
from pathlib import Path
import math, random

ROOT=Path('/mnt/data/party-picker')
A=ROOT/'assets'; C=A/'categories'; I=A/'icons'
A.mkdir(exist_ok=True); C.mkdir(exist_ok=True); I.mkdir(exist_ok=True)
FONT='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
FONT_REG='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'

def font(sz,bold=True): return ImageFont.truetype(FONT if bold else FONT_REG,sz)

def gradient(w,h,c1,c2):
    im=Image.new('RGB',(w,h)); p=im.load()
    a=tuple(int(c1[i:i+2],16) for i in (1,3,5)); b=tuple(int(c2[i:i+2],16) for i in (1,3,5))
    for y in range(h):
        for x in range(w):
            t=(x/w*.65+y/h*.35)
            p[x,y]=tuple(int(a[k]*(1-t)+b[k]*t) for k in range(3))
    return im

def add_confetti(draw,w,h,seed=1,alpha=False):
    rnd=random.Random(seed)
    colors=['#ff5aa5','#49e5ff','#ffd45d','#8cf58a','#9d7bff']
    for _ in range(38):
        x=rnd.randint(0,w); y=rnd.randint(0,h); r=rnd.randint(4,13); col=rnd.choice(colors)
        if rnd.random()<.5: draw.ellipse((x-r,y-r,x+r,y+r),fill=col)
        else: draw.rounded_rectangle((x-r*2,y-r/2,x+r*2,y+r/2),radius=4,fill=col)

# Logo, transparent
im=Image.new('RGBA',(900,260),(0,0,0,0)); d=ImageDraw.Draw(im)
# icon: 4 cards / wheel petals
cx,cy=100,130
cols=['#ff5aa5','#49e5ff','#ffd45d','#9d7bff']
for i,col in enumerate(cols):
    ang=i*math.pi/2+math.pi/4
    x=cx+math.cos(ang)*44; y=cy+math.sin(ang)*44
    d.rounded_rectangle((x-38,y-38,x+38,y+38),radius=18,fill=col)
d.ellipse((cx-30,cy-30,cx+30,cy+30),fill='#0b1020')
d.ellipse((cx-12,cy-12,cx+12,cy+12),fill='white')
d.text((185,48),'PARTY',font=font(72),fill='white')
d.text((185,124),'PICKER',font=font(72),fill='#49e5ff')
d.text((190,207),'UNOFFICIAL GAME-NIGHT COMPANION',font=font(19),fill='#aeb8d0')
im.save(A/'logo.png')

# Hero pattern
w,h=1400,760
hero=Image.new('RGBA',(w,h),(0,0,0,0)); hd=ImageDraw.Draw(hero,'RGBA')
rnd=random.Random(42)
for _ in range(18):
    x=rnd.randint(600,1350); y=rnd.randint(20,740); rr=rnd.randint(28,95)
    col=rnd.choice([(255,90,165,70),(73,229,255,65),(255,212,93,60),(157,123,255,70),(140,245,138,50)])
    hd.rounded_rectangle((x-rr,y-rr,x+rr,y+rr),radius=int(rr*.4),fill=col)
# Wheel rings
for r,a in [(250,45),(190,55),(125,70)]: hd.ellipse((1050-r,380-r,1050+r,380+r),outline=(255,255,255,a),width=16)
for i in range(10):
    ang=2*math.pi*i/10
    x=1050+math.cos(ang)*220; y=380+math.sin(ang)*220
    hd.ellipse((x-20,y-20,x+20,y+20),fill=rnd.choice([(255,90,165,210),(73,229,255,210),(255,212,93,210),(157,123,255,210)]))
hero=hero.filter(ImageFilter.GaussianBlur(.4)); hero.save(A/'hero-pattern.png')

# Category icons

def icon_base():
    im=Image.new('RGBA',(256,256),(0,0,0,0)); d=ImageDraw.Draw(im)
    d.rounded_rectangle((18,18,238,238),radius=64,fill='#17233d',outline='#ffffff22',width=3)
    return im,d

def save_drawing():
    im,d=icon_base(); d.line((70,176,168,78),fill='#ff5aa5',width=28); d.polygon([(169,78),(194,52),(204,88)],fill='#ffd45d'); d.line((60,194,184,194),fill='#49e5ff',width=12); d.arc((48,48,126,126),10,285,fill='#8cf58a',width=10); im.save(C/'drawing.png')
def save_quiz():
    im,d=icon_base(); d.ellipse((55,45,201,191),fill='#49e5ff'); d.polygon([(96,185),(78,219),(124,190)],fill='#49e5ff'); d.text((93,57),'?',font=font(92),fill='#0b1020'); im.save(C/'quiz.png')
def save_speaking():
    im,d=icon_base(); d.rounded_rectangle((81,47,175,151),radius=44,fill='#ffd45d'); d.rectangle((116,140,140,191),fill='#ffd45d'); d.arc((70,91,186,196),0,180,fill='#ff5aa5',width=12); d.line((92,196,164,196),fill='#ff5aa5',width=12); im.save(C/'speaking.png')
def save_typing():
    im,d=icon_base(); d.rounded_rectangle((49,73,207,183),radius=18,fill='#9d7bff'); keys=[(66,92),(101,92),(136,92),(171,92),(66,125),(101,125),(136,125),(171,125)]
    for x,y in keys:d.rounded_rectangle((x,y,x+22,y+19),radius=5,fill='#0b1020')
    d.rounded_rectangle((82,155,174,170),radius=6,fill='#49e5ff'); im.save(C/'typing.png')
save_drawing();save_quiz();save_speaking();save_typing()

# App icons
for size in (192,512):
    im=gradient(size,size,'#101a36','#211234').convert('RGBA'); d=ImageDraw.Draw(im)
    c=size//2; rr=size*.30
    for i,col in enumerate(cols):
        ang=i*math.pi/2+math.pi/4;x=c+math.cos(ang)*rr*.5;y=c+math.sin(ang)*rr*.5;s=size*.16
        d.rounded_rectangle((x-s,y-s,x+s,y+s),radius=int(size*.07),fill=col)
    d.ellipse((c-size*.13,c-size*.13,c+size*.13,c+size*.13),fill='#0b1020')
    d.ellipse((c-size*.045,c-size*.045,c+size*.045,c+size*.045),fill='white')
    im.save(I/f'icon-{size}.png')

# Social preview
prev=gradient(1200,630,'#0a1020','#261431').convert('RGBA'); pd=ImageDraw.Draw(prev)
add_confetti(pd,1200,630,8)
pd.rounded_rectangle((70,70,1130,560),radius=50,fill=(12,18,35,235),outline=(255,255,255,35),width=3)
pd.text((120,125),'PARTY',font=font(94),fill='white');pd.text((120,220),'PICKER',font=font(94),fill='#49e5ff')
pd.text((125,344),'Browse • Filter • Spin',font=font(42),fill='#ffd45d')
pd.text((125,415),'An unofficial Jackbox game-night companion',font=font(28,False),fill='#aeb8d0')
# simple wheel
cx,cy,r=930,310,165
for i,col in enumerate(cols*2):
    start=-90+i*45; pd.pieslice((cx-r,cy-r,cx+r,cy+r),start,start+45,fill=col,outline='#0b1020',width=4)
pd.ellipse((cx-42,cy-42,cx+42,cy+42),fill='#0b1020')
prev.save(A/'social-preview.png')

# Asset style sheet
sheet=gradient(1600,1050,'#0b1020','#17142d').convert('RGBA'); sd=ImageDraw.Draw(sheet)
sd.text((70,55),'PARTY PICKER — ASSET STYLE SHEET',font=font(48),fill='white'); sd.text((73,118),'Original companion UI assets • no official game artwork',font=font(24,False),fill='#aeb8d0')
logo=Image.open(A/'logo.png'); logo.thumbnail((620,180)); sheet.alpha_composite(logo,(65,175))
# palette
palette=[('#ff5aa5','PINK'),('#49e5ff','CYAN'),('#ffd45d','YELLOW'),('#8cf58a','LIME'),('#9d7bff','VIOLET'),('#11182a','PANEL')]
for i,(c,n) in enumerate(palette):
    x=70+i*245; sd.rounded_rectangle((x,380,x+205,460),radius=20,fill=c); sd.text((x,474),n,font=font(18),fill='white'); sd.text((x,500),c.upper(),font=font(16,False),fill='#aeb8d0')
# icons
for i,name in enumerate(['drawing','quiz','speaking','typing']):
    icon=Image.open(C/f'{name}.png'); icon.thumbnail((150,150)); x=80+i*365; sheet.alpha_composite(icon,(x,585)); sd.text((x+170,620),name.title(),font=font(30),fill='white'); sd.text((x+170,661),'Primary filter',font=font(18,False),fill='#aeb8d0')
# sample pack chips
sd.text((70,805),'PACK COLOUR SYSTEM',font=font(25),fill='white')
pcs=[('#ff5aa5','#7b61ff'),('#20d7c9','#1e88ff'),('#ff8558','#ffca5a'),('#b15cff','#ff6ba8'),('#5ae0ff','#5e7dff'),('#a4f07b','#38c5a0')]
for i,(a,b) in enumerate(pcs):
    x=70+i*245; tile=gradient(210,125,a,b); mask=Image.new('L',tile.size); md=ImageDraw.Draw(mask);md.rounded_rectangle((0,0,210,125),radius=28,fill=255); sheet.paste(tile.convert('RGBA'),(x,860),mask)
    sd.text((x+20,882),f'{i+1}',font=font(56),fill='white')
sd.text((70,1010),'Visual direction: dark game-night UI • bright functional accents • abstract shapes • no character mimicry',font=font(18,False),fill='#aeb8d0')
sheet.save(ROOT/'ASSET_STYLE_SHEET.png')
print('assets generated')

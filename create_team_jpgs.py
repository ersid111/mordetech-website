from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

out = Path('images')
out.mkdir(exist_ok=True)
images = [
    ('team-siddheshwar.jpg', (200, 225, 255), 'SM'),
    ('team-priyanka.jpg', (235, 225, 255), 'PM'),
    ('team-amrut.jpg', (220, 255, 235), 'AD'),
]

for name, color, text in images:
    img = Image.new('RGB', (400, 400), color)
    draw = ImageDraw.Draw(img)
    try:
        font = ImageFont.truetype('arial.ttf', 120)
    except Exception:
        font = ImageFont.load_default()
    w, h = draw.textsize(text, font=font)
    draw.text(((400 - w) / 2, (400 - h) / 2), text, fill=(40, 40, 80), font=font)
    img.save(out / name, format='JPEG', quality=90)

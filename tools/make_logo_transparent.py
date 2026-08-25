from PIL import Image
import os

src = r"g:/MyWebsite/Assets/logo/Untitled design (6).png"
dst = r"g:/MyWebsite/Assets/logo/Untitled design (6)-transparent.png"

if not os.path.exists(src):
    print('Source logo not found:', src)
    raise SystemExit(1)

im = Image.open(src).convert('RGBA')
px = im.load()
width, height = im.size
threshold = 250
for y in range(height):
    for x in range(width):
        r,g,b,a = px[x,y]
        if r>=threshold and g>=threshold and b>=threshold:
            px[x,y] = (r,g,b,0)

im.save(dst)
print('Saved transparent logo to', dst)

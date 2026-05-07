import os
from PIL import Image

directory = "/Users/sudeepsinha/Documents/axomcars-landing/images/showrooms/rangia"
for filename in os.listdir(directory):
    if filename.endswith(".webp"):
        base = os.path.splitext(filename)[0]
        jpg_path = os.path.join(directory, base + ".jpg")
        img = Image.open(os.path.join(directory, filename))
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
        img.save(jpg_path, format="JPEG", quality=80)
        print(f"Generated {jpg_path}")

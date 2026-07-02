import os
import glob
import re

workspace = "/Users/sudeepsinha/Documents/axomcars-landing"
html_files = glob.glob(os.path.join(workspace, "*.html"))

missing_images = set()

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check for img src and source srcset
    images = re.findall(r'src="([^"]+\.(png|jpg|jpeg|webp|avif|svg))"', content)
    images += re.findall(r'srcset="([^"\s]+\.(png|jpg|jpeg|webp|avif|svg))', content)
    
    for img in images:
        img_path = img[0]
        if not img_path.startswith('http') and not img_path.startswith('data:'):
            if not os.path.exists(os.path.join(workspace, img_path)):
                missing_images.add((os.path.basename(file), img_path))

if missing_images:
    for src, missing in missing_images:
        print(f"Missing image in {src}: {missing}")
else:
    print("No missing local images found.")


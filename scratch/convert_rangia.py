import os
from PIL import Image
from pillow_heif import register_heif_opener

register_heif_opener()

directory = "/Users/sudeepsinha/Documents/axomcars-landing/images/showrooms/rangia"
for filename in os.listdir(directory):
    if filename.endswith(".jpeg") or filename.endswith(".png") or filename.endswith(".jpg"):
        filepath = os.path.join(directory, filename)
        img = Image.open(filepath)
        
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
            
        base = os.path.splitext(filename)[0]
        
        # Save as AVIF
        avif_path = os.path.join(directory, base + ".avif")
        img.save(avif_path, format="AVIF", quality=80)
        
        # Save as WebP
        webp_path = os.path.join(directory, base + ".webp")
        img.save(webp_path, format="WEBP", quality=80)
        
        print(f"Converted {filename} to avif and webp")
        
        # Remove original
        os.remove(filepath)
        print(f"Deleted {filename}")

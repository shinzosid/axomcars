import os
from PIL import Image

def convert_avif(base_path, filename):
    avif_path = os.path.join(base_path, f"{filename}.avif")
    webp_path = os.path.join(base_path, f"{filename}.webp")
    jpg_path = os.path.join(base_path, f"{filename}.jpg")
    
    print(f"Opening {avif_path}...")
    with Image.open(avif_path) as img:
        # Convert to RGB for JPEG
        rgb_img = img.convert("RGB")
        
        # Save as WebP
        print(f"Saving {webp_path}...")
        img.save(webp_path, "WEBP", quality=90)
        
        # Save as JPG
        print(f"Saving {jpg_path}...")
        rgb_img.save(jpg_path, "JPEG", quality=90)

if __name__ == "__main__":
    tiago_dir = "images/cars/tiago"
    convert_avif(tiago_dir, "tiagoexterior")
    convert_avif(tiago_dir, "tiagointerior")
    print("Done!")

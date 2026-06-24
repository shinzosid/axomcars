import os
import urllib.request
import urllib.error

tiago_dir = "/Users/sudeepsinha/Documents/axomcars-landing/images/cars/tiago"
endpoint = "https://twdrrfkafjjtnfpaqpoj.supabase.co/functions/v1/upload-to-r2"
admin_secret = "axom_broadcast_2026"
anon_key = "sb_publishable_7z5RVXIbAp-1YKsRBi7i3g_q5xx8neW"

files_to_upload = [
    {"name": "tiagoexterior.webp", "mime": "image/webp"},
    {"name": "tiagoexterior.jpg", "mime": "image/jpeg"},
    {"name": "tiagointerior.webp", "mime": "image/webp"},
    {"name": "tiagointerior.jpg", "mime": "image/jpeg"},
]

for item in files_to_upload:
    filename = item["name"]
    mime_type = item["mime"]
    filepath = os.path.join(tiago_dir, filename)
    
    if not os.path.exists(filepath):
        print(f"Error: {filepath} does not exist!")
        continue
        
    print(f"Uploading {filename} ({mime_type})...")
    with open(filepath, "rb") as f:
        data = f.read()
        
    req = urllib.request.Request(
        endpoint,
        data=data,
        headers={
            "Authorization": f"Bearer {anon_key}",
            "x-admin-secret": admin_secret,
            "x-folder": "cars/tiago",
            "x-file-name": filename,
            "Content-Type": mime_type
        },
        method="POST"
    )
    
    try:
        with urllib.request.urlopen(req) as response:
            res_data = response.read().decode("utf-8")
            print(f"Success for {filename}: {res_data}")
    except urllib.error.HTTPError as e:
        print(f"HTTP Error for {filename}: {e.code} - {e.read().decode('utf-8')}")
    except Exception as e:
        print(f"Error uploading {filename}: {str(e)}")

import os
import re

html_files = []
for root, dirs, files in os.walk('.'):
    if 'node_modules' in root or '.git' in root or 'scratch' in root or 'venv' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            html_files.append(os.path.join(root, file))

valid_files = set(os.path.basename(f) for f in html_files)

all_internal_links = []
unique_internal_destinations = set()

tata_vehicle_links = []
unique_tata_destinations = set()

non_vehicle_links = []
broken_destinations = set()

for fpath in html_files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    hrefs = re.findall(r'href=["\']([^"\']+)["\']', content)
    for href in hrefs:
        # Ignore external, anchor links, JS, mailto, tel
        if (href.startswith('http') or href.startswith('mailto:') or 
            href.startswith('tel:') or href.startswith('#') or 
            href.startswith('javascript:') or href.endswith('.css') or
            href.endswith('.js') or href.endswith('.png') or href.endswith('.webmanifest') or
            href.endswith('.avif') or href.endswith('.webp') or 'favicon' in href):
            continue
            
        # Clean up href to get the actual target (remove anchor parts, query params)
        target = href.split('#')[0].split('?')[0].strip('/')
        
        # If target is empty, it means it's just '/' which is index.html
        if not target:
            target = 'index.html'
        
        # If the target doesn't have an extension, assume .html (since that's how static hosting works here)
        if not target.endswith('.html') and not target.endswith('.css') and not target.endswith('.js') and '.' not in target:
            target_file = target + '.html'
        else:
            target_file = target
            
        target_basename = os.path.basename(target_file)
        
        all_internal_links.append(href)
        unique_internal_destinations.add(target_basename)
        
        if target_basename not in valid_files:
            broken_destinations.add((fpath, href, target_basename))
            
        if target_basename.startswith('tata-assam-') and target_basename.endswith('.html'):
            tata_vehicle_links.append(href)
            unique_tata_destinations.add(target_basename)
        else:
            non_vehicle_links.append(href)

print("1. Total internal href links:", len(all_internal_links))
print("2. Total unique internal destinations:", len(unique_internal_destinations))
print("3. Total tata-assam-[vehicle-slug].html links:", len(tata_vehicle_links))
print("4. Total unique vehicle-detail destinations:", len(unique_tata_destinations))
print("5. Total non-vehicle internal links:", len(non_vehicle_links))
print("6. Broken destinations found:", len(broken_destinations))
for f, l, t in broken_destinations:
    print(f"   Broken link in {f}: {l} (expected {t})")


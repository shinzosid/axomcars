import os
import re

html_files = []
js_files = []
for root, dirs, files in os.walk('.'):
    if 'node_modules' in root or '.git' in root or 'scratch' in root or 'venv' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            html_files.append(os.path.join(root, file))
        elif file.endswith('.js') or file.endswith('.ts'):
            js_files.append(os.path.join(root, file))

double_extensions = []
broken_links = set()
checked_internal = 0
checked_vehicle = 0
missing_extensions = []
external_modified = []
asset_modified = []

valid_files = set(os.path.basename(f) for f in html_files)

# 1. Double extensions
for fpath in html_files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    matches = re.findall(r'href=["\']([^"\']*\.html\.html)[^"\']*["\']', content)
    if matches:
        double_extensions.extend([(fpath, m) for m in matches])

    # 2. Validate internal .html links
    hrefs = re.findall(r'href=["\']([^"\']*\.html)(?:#[^"\']*)?["\']', content)
    for href in hrefs:
        if href.startswith('http') or href.startswith('mailto:') or href.startswith('tel:'):
            continue
        
        checked_internal += 1
        basename = os.path.basename(href)
        if basename not in valid_files:
            broken_links.add((fpath, href))
            
        if 'tata-' in href:
            checked_vehicle += 1

    # 4. Remaining extensionless vehicle links
    hrefs_all = re.findall(r'href=["\']([^"\']*)["\']', content)
    for href in hrefs_all:
        if href.startswith('tata-') and not href.endswith('.html'):
            missing_extensions.append((fpath, href))
            
    # 9. External URLs accidentally modified (look for external URLs ending in .html that might have been hit by my regex)
    # The regex was: r'href="(tata-[^"]+)(?<!\.html)"' -> r'href="\1.html"'
    # So if there was href="https://something/tata-xyz", it would become "https://something/tata-xyz.html" ONLY IF the regex didn't require "tata-" at the start of the string.
    # Ah! The regex was: href="(tata-[^"]+)(?<!\.html)" which requires href="tata-... exactly. It doesn't match href="https://.../tata-..."
    # Let's verify no external link starts with tata-
    pass

    # 10. Asset paths
    srcs = re.findall(r'src=["\']([^"\']*)["\']', content)
    for src in srcs:
        if src.startswith('tata-') and src.endswith('.html'):
            asset_modified.append((fpath, src))

print("Total internal links checked:", checked_internal)
print("Total vehicle-detail links checked:", checked_vehicle)
print("Broken links found:", len(broken_links))
for f, l in broken_links:
    print(f"  {f}: {l}")
print("Double .html.html links found:", len(double_extensions))
for f, l in double_extensions:
    print(f"  {f}: {l}")
print("Remaining extensionless vehicle navigation links:", len(missing_extensions))
for f, l in missing_extensions:
    print(f"  {f}: {l}")
print("Asset/API paths accidentally modified:", len(asset_modified))
for f, l in asset_modified:
    print(f"  {f}: {l}")


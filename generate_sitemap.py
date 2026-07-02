import os
import glob
from datetime import datetime

workspace = "/Users/sudeepsinha/Documents/axomcars-landing"
base_url = "https://www.axomcars.in"
excluded_files = ["admin.html", "unsubscribe.html"]

html_files = glob.glob(os.path.join(workspace, "*.html"))
today = datetime.now().strftime("%Y-%m-%d")

sitemap_urls = []
for file in html_files:
    basename = os.path.basename(file)
    if basename in excluded_files:
        continue
    
    # Priority rules
    if basename == "index.html":
        priority = "1.0"
        url = base_url + "/"
    elif basename.startswith("tata-"):
        priority = "0.9"
        url = f"{base_url}/{basename}"
    elif "compare" in basename or basename in ["showrooms.html", "workshops.html", "cars.html"]:
        priority = "0.8"
        url = f"{base_url}/{basename}"
    else:
        priority = "0.6"
        url = f"{base_url}/{basename}"
        
    sitemap_urls.append(f"""  <url>
    <loc>{url}</loc>
    <lastmod>{today}</lastmod>
    <priority>{priority}</priority>
  </url>""")

sitemap_content = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{chr(10).join(sitemap_urls)}
</urlset>"""

with open(os.path.join(workspace, "sitemap.xml"), "w") as f:
    f.write(sitemap_content)

print(f"Generated sitemap.xml with {len(sitemap_urls)} pages.")

robots_content = f"""User-agent: *
Disallow: /admin.html
Disallow: /unsubscribe.html

Sitemap: {base_url}/sitemap.xml"""

with open(os.path.join(workspace, "robots.txt"), "w") as f:
    f.write(robots_content)

print("Generated robots.txt.")

# Basic QA - check for broken local links
print("\nRunning Broken Link QA:")
import re
broken_links = set()
for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check hrefs ending with .html
    links = re.findall(r'href="([^"#]+\.html)"', content)
    for link in links:
        if not link.startswith('http') and not os.path.exists(os.path.join(workspace, link)):
            broken_links.add((os.path.basename(file), link))

if broken_links:
    for src, missing in broken_links:
        print(f"Broken link in {src}: {missing}")
else:
    print("No broken local HTML links found.")


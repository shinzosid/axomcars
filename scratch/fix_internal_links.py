import os
import re
from pathlib import Path

def fix_links_in_file(filepath, base_dir):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    def replace_link(match):
        original = match.group(0)
        url = match.group(1)
        anchor = match.group(2) if match.group(2) else ""

        # Avoid stripping external URLs except axomcars
        if url.startswith("http") and "axomcars.in" not in url:
            return original

        # Strip .html
        new_url = url[:-5] if url.endswith(".html") else url

        # Convert index to /
        if new_url.endswith("index"):
            # if it was just 'index' or '../index', etc
            # This is a simple heuristic
            if new_url == "index" or new_url == "../index" or new_url.endswith("/index"):
                # if the original was exactly index.html
                if new_url == "index":
                    new_url = "/"
                elif new_url == "../index":
                    new_url = "/"
                elif new_url.endswith("/index"):
                    new_url = new_url[:-5] # remove index
        
        # We can make local links absolute to root if we wanted to, but keeping them as is (just without .html) is fine if they are clean URLs.
        # But wait, Cloudflare handles clean URLs by matching the folder/filename.
        # So href="cars/altroz" will work as long as it's relative to root. If a user is on /tata-assam-curvv, a link to "cars/altroz" goes to /cars/altroz. That's correct.

        # So simply stripping .html is mostly sufficient.
        
        return f'href="{new_url}{anchor}"'

    # Match href="something.html" or href="something.html#anchor"
    # match.group(1) = path with .html
    # match.group(2) = #anchor or None
    new_content = re.sub(r'href=[\'"]([^\'"#]+)(\#[^\'"]+)?[\'"]', 
                         lambda m: m.group(0) if not m.group(1).endswith('.html') else replace_link(m), 
                         content)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

def main():
    base_dir = "/Users/sudeepsinha/Documents/axomcars-landing"
    html_files = list(Path(base_dir).rglob("*.html"))
    html_files = [f for f in html_files if 'venv' not in f.parts and 'node_modules' not in f.parts]
    
    count = 0
    for f in html_files:
        if fix_links_in_file(f, base_dir):
            count += 1
            print(f"Updated links in {f.relative_to(base_dir)}")
            
    print(f"\nTotal files updated: {count}")

if __name__ == "__main__":
    main()

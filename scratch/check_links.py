import os
import re
from pathlib import Path
from urllib.parse import urlparse

def find_broken_links(base_dir):
    html_files = list(Path(base_dir).rglob("*.html"))
    broken_links = set()
    link_map = {} # html_file -> list of broken links
    
    # Exclude directories like venv, node_modules if any
    html_files = [f for f in html_files if 'venv' not in f.parts]
    
    for html_file in html_files:
        with open(html_file, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            # Simple regex to find href attributes
            links = re.findall(r'href=[\'"]?([^\'" >]+)', content)
            
            for link in links:
                # ignore external, mailto, tel, anchors
                if link.startswith('http') or link.startswith('mailto') or link.startswith('tel') or link.startswith('#'):
                    continue
                
                # strip anchor and query
                parsed = urlparse(link)
                path = parsed.path
                if not path or path == '/':
                    continue
                    
                # check if path is relative
                if path.startswith('/'):
                    target_path = Path(base_dir) / path.lstrip('/')
                else:
                    target_path = html_file.parent / path
                
                if not target_path.exists():
                    if html_file not in link_map:
                        link_map[html_file] = set()
                    link_map[html_file].add(link)
                    broken_links.add(link)

    for file, links in link_map.items():
        print(f"File: {file.relative_to(base_dir)}")
        for link in links:
            print(f"  Broken link: {link}")

if __name__ == "__main__":
    find_broken_links("/Users/sudeepsinha/Documents/axomcars-landing")

import re
from pathlib import Path

def find_external_links(base_dir):
    html_files = list(Path(base_dir).rglob("*.html"))
    html_files = [f for f in html_files if 'venv' not in f.parts and 'node_modules' not in f.parts]
    
    external_links = set()
    for html_file in html_files:
        with open(html_file, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            links = re.findall(r'href=[\'"]?(https?://[^\'" >]+)', content)
            for link in links:
                if 'axomcars.in' not in link:  # ignore self links
                    external_links.add(link)
    
    for link in sorted(external_links):
        print(link)

if __name__ == "__main__":
    find_external_links("/Users/sudeepsinha/Documents/axomcars-landing")

import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import time
import urllib3
urllib3.disable_warnings()

def check_live_site(url):
    print(f"Crawling {url}...")
    try:
        response = requests.get(url, verify=False, timeout=10)
        soup = BeautifulSoup(response.text, 'html.parser')
    except Exception as e:
        print(f"Failed to fetch {url}: {e}")
        return

    links_to_check = set()
    for a in soup.find_all('a', href=True):
        href = a['href']
        if href.startswith('javascript:') or href.startswith('tel:') or href.startswith('mailto:') or href.startswith('#'):
            continue
        full_url = urljoin(url, href)
        if urlparse(full_url).netloc == urlparse(url).netloc:
            links_to_check.add(full_url)
            
    print(f"Found {len(links_to_check)} internal links on homepage to check.")
    broken = []
    
    for link in links_to_check:
        try:
            r = requests.head(link, verify=False, timeout=5, allow_redirects=True)
            if r.status_code >= 400:
                broken.append((link, r.status_code))
        except Exception as e:
            broken.append((link, str(e)))
            
    print("\nBroken links found:")
    for b in broken:
        print(f"{b[0]} -> {b[1]}")
        
    if not broken:
        print("No broken links found on the homepage.")

if __name__ == "__main__":
    check_live_site("https://axomcars.in/")

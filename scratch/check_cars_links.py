import re
with open('cars.html', 'r', encoding='utf-8') as f:
    content = f.read()
links = re.findall(r'href="(.*?)"', content)
print("--- ALL HREFs IN CARS.HTML ---")
for link in set(links):
    if not link.startswith('http') and not link.startswith('tel:') and not link.startswith('mailto:') and link != '#':
        print(link)

import re
import os

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

links = re.findall(r'href="(.*?)"', content)
print("--- ALL HREFs IN INDEX.HTML ---")
for link in set(links):
    if not link.startswith('http') and not link.startswith('tel:') and not link.startswith('mailto:') and link != '#':
        print(link)

print("\n--- HTML FILES IN DIR ---")
html_files = [f for f in os.listdir('.') if f.endswith('.html')]
print(html_files)

print("\n--- HTML FILES IN CARS/ DIR ---")
if os.path.exists('cars'):
    cars_files = [f for f in os.listdir('cars') if f.endswith('.html')]
    print(cars_files)


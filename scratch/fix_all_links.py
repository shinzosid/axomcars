import re
import os

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = re.sub(r'href="(tata-[^"]+)(?<!\.html)"', r'href="\1.html"', content)
    
    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed links in {file}")

print("All links fixed.")

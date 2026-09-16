import re

files_to_fix = ['index.html']

for file in files_to_fix:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find href="tata-..." that don't end in .html
    # We want to match things like href="tata-assam-nexon" or href="tata-nexon-vs-maruti-brezza"
    # but NOT href="tata-assam-nexon.html"
    
    new_content = re.sub(r'href="(tata-[^"]+)(?<!\.html)"', r'href="\1.html"', content)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(new_content)

print("Links fixed.")

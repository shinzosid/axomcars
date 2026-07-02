import os
import re

prices = {
    'sierra': '1149000',
    'harrier-ev': '2500000',
    'harrier': '1289000',
    'safari': '1329000',
    'nexon-ev': '1449000',
    'nexon': '736990',
    'punch-ev': '1099000',
    'punch': '564990',
    'altroz': '629990',
    'tiago-ev': '799000',
    'tiago': '469990',
    'curvv-ev': '1749000',
    'curvv': '969990',
    'tigor-ev': '1249000',
    'tigor': '554990'
}

def update_schema(content, filename):
    model = None
    for k in prices.keys():
        if k in filename.lower():
            model = k
            break
            
    if not model:
        return content

    price = prices.get(model, "0")
    
    def replacer(match):
        offers_block = match.group(0)
        if '"price"' not in offers_block:
            if '"@type": "Offer"' in offers_block:
                offers_block = offers_block.replace('"@type": "Offer",', f'"@type": "Offer",\n        "priceCurrency": "INR",\n        "price": "{price}",')
            elif '"@type":"Offer"' in offers_block:
                offers_block = offers_block.replace('"@type":"Offer",', f'"@type":"Offer",\n        "priceCurrency": "INR",\n        "price": "{price}",')
            else:
                offers_block = offers_block.replace('"offers": {', f'"offers": {{\n        "priceCurrency": "INR",\n        "price": "{price}",')
        return offers_block
        
    pattern = re.compile(r'"offers"\s*:\s*\{[^}]*\}', re.DOTALL)
    new_content = pattern.sub(replacer, content)
    
    return new_content

def process_dir(directory):
    count = 0
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.html'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                new_content = update_schema(content, file)
                
                if new_content != content:
                    print(f"Updated {filepath}")
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    count += 1
    print(f"Total files updated: {count}")

process_dir('.')

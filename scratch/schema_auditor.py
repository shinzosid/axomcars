import os
import json
import re

exts = ['.html', '.py'] # add_schemas.py also contains schema logic
skip_dirs = ['node_modules', '.git', 'scratch', 'venv', '.env']

def audit():
    for root, dirs, files in os.walk('.'):
        dirs[:] = [d for d in dirs if d not in skip_dirs]
        for file in files:
            if any(file.endswith(ext) for ext in exts):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                if 'TATA.CARS' not in content:
                    continue
                
                # Check for instances inside <script type="application/ld+json"> or inside python dicts
                lines = content.split('\n')
                for i, line in enumerate(lines):
                    if 'TATA.CARS' in line and (
                        '"name"' in line or 
                        '"brand"' in line or 
                        '"manufacturer"' in line or 
                        '"legalName"' in line
                    ):
                        print(f"{path}:{i+1}:{line.strip()}")

if __name__ == '__main__':
    audit()

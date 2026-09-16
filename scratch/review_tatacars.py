import os
import json

exts = ['.html', '.css', '.js', '.ts', '.md', '.json', '.txt', '.py']
skip_dirs = ['node_modules', '.git', 'scratch', 'venv', '.env']

awkward_lines = []
schema_lines = []

for root, dirs, files in os.walk('.'):
    dirs[:] = [d for d in dirs if d not in skip_dirs]
    for file in files:
        if any(file.endswith(ext) for ext in exts):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                try:
                    lines = f.readlines()
                except UnicodeDecodeError:
                    continue
                for i, line in enumerate(lines):
                    if 'TATA.CARS' in line:
                        lower_line = line.lower()
                        # check awkward: "TATA.CARS cars", "TATA.CARS vehicles" etc
                        if 'tata.cars cars' in lower_line or 'tata.cars passenger' in lower_line or 'tata.cars vehicles' in lower_line:
                            awkward_lines.append((path, i+1, line.strip()))
                        
                        # check schema:
                        if '\"name\":' in line or '\"brand\":' in line or '\"manufacturer\":' in line or '\"legalname\":' in lower_line:
                            schema_lines.append((path, i+1, line.strip()))
                        
                        # privacy / legal
                        if 'privacy.html' in path or 'legal' in lower_line:
                            pass # We can look at privacy.html specifically

print("AWKWARD:")
for a in awkward_lines:
    print(a)

print("\nSCHEMA:")
for s in schema_lines:
    print(s)


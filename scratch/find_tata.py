import os
import re

search_patterns = [
    r'tata motors',
    r'tata motor',
    r'tata passenger'
]

compiled_patterns = [re.compile(p, re.IGNORECASE) for p in search_patterns]

# Extensions to check
exts = ['.html', '.css', '.js', '.ts', '.md', '.json', '.txt', '.py']
skip_dirs = ['node_modules', '.git', 'scratch']

matches = []

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
                    for p in compiled_patterns:
                        if p.search(line):
                            matches.append((path, i+1, line.strip()))
                            break

with open('scratch/matches.txt', 'w', encoding='utf-8') as f:
    for match in matches:
        f.write(f"{match[0]}:{match[1]}: {match[2]}\n")
print(f"Found {len(matches)} matches. Written to scratch/matches.txt")

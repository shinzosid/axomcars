import os
import re

patterns_replacements = [
    (re.compile(r'(?i)tata motors cars'), 'TATA.CARS'),
    (re.compile(r'(?i)tata passenger vehicles'), 'TATA.CARS'),
    (re.compile(r'(?i)tata motors?'), 'TATA.CARS'),
]

exts = ['.html', '.css', '.js', '.ts', '.md', '.json', '.txt', '.py']
skip_dirs = ['node_modules', '.git', 'scratch', 'venv', '.env']

files_changed = 0
total_replacements = 0

for root, dirs, files in os.walk('.'):
    dirs[:] = [d for d in dirs if d not in skip_dirs]
    for file in files:
        if any(file.endswith(ext) for ext in exts):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                try:
                    content = f.read()
                except UnicodeDecodeError:
                    continue
            
            new_content = content
            file_replacements = 0
            for pattern, replacement in patterns_replacements:
                new_content, count = pattern.subn(replacement, new_content)
                file_replacements += count
            
            if file_replacements > 0:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                files_changed += 1
                total_replacements += file_replacements

print(f"Changed {files_changed} files with {total_replacements} replacements.")

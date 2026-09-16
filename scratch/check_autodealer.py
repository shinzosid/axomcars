import os
import json

exts = ['.html']
skip_dirs = ['node_modules', '.git', 'scratch', 'venv', '.env']

total_checked = 0
found_issues = []
files_modified = 0

for root, dirs, files in os.walk('.'):
    dirs[:] = [d for d in dirs if d not in skip_dirs]
    for file in files:
        if any(file.endswith(ext) for ext in exts):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if '"@type": "AutoDealer"' not in content and '"@type":"AutoDealer"' not in content:
                continue
                
            lines = content.split('\n')
            
            in_schema = False
            schema_lines = []
            start_idx = 0
            file_modified = False
            
            for i, line in enumerate(lines):
                if '<script type="application/ld+json">' in line:
                    in_schema = True
                    schema_lines = []
                    start_idx = i
                
                if in_schema:
                    schema_lines.append(line)
                    if '</script>' in line:
                        in_schema = False
                        schema_str = '\n'.join(schema_lines)
                        
                        try:
                            script_content = schema_str.split('<script type="application/ld+json">')[1].split('</script>')[0].strip()
                            data = json.loads(script_content)
                        except:
                            continue
                            
                        state = {'modified': False}
                        def check_and_fix(obj):
                            global total_checked
                            if isinstance(obj, dict):
                                if obj.get('@type') == 'AutoDealer':
                                    total_checked += 1
                                    if obj.get('name') == 'TATA.CARS':
                                        found_issues.append(f"{path}:{start_idx}")
                                        obj['name'] = 'Axom Cars'
                                        state['modified'] = True
                                for k, v in obj.items():
                                    check_and_fix(v)
                            elif isinstance(obj, list):
                                for item in obj:
                                    check_and_fix(item)
                                    
                        check_and_fix(data)
                        
                        if state['modified']:
                            new_schema_str = f'<script type="application/ld+json">\n{json.dumps(data, indent=2)}\n</script>'
                            # Since we don't want to mess up formatting drastically unless needed, and we just want to replace
                            # we can actually just do string replacement on the file if we found an issue!
                            file_modified = True

            if file_modified:
                # String replacement in the raw file to avoid reformatting the whole json
                # We know the issue exists, so we replace only within AutoDealer blocks...
                # For safety, let's just use json.dumps for the whole file? No, just rewrite the whole file with python re.
                pass

print(f"Total AutoDealer objects checked: {total_checked}")
print("Issues found:")
for issue in found_issues:
    print(issue)
print(f"Files modified: {files_modified}")

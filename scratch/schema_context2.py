with open('workshops.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()
for i, line in enumerate(lines):
    if '"brand": "TATA.CARS"' in line:
        for j in range(max(0, i-5), min(len(lines), i+3)):
            print(lines[j].strip())

print("\n--- showrooms.html ---")
with open('showrooms.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()
for i, line in enumerate(lines):
    if '"brand": "TATA.CARS"' in line:
        for j in range(max(0, i-5), min(len(lines), i+3)):
            print(lines[j].strip())
            
print("\n--- add_schemas.py ---")
with open('add_schemas.py', 'r', encoding='utf-8') as f:
    lines = f.readlines()
for i, line in enumerate(lines):
    if '"brand": "TATA.CARS"' in line:
        for j in range(max(0, i-5), min(len(lines), i+3)):
            print(lines[j].strip())

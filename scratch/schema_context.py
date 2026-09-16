with open('tata-assam-curvv-ev.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if '"name": "TATA.CARS"' in line:
        for j in range(max(0, i-5), min(len(lines), i+3)):
            print(lines[j].strip())

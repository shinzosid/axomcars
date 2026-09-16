import json

files = ['./tata-assam-curvv-ev.html', './workshops.html', './privacy.html']
for path in files:
    with open(path, 'r') as f:
        print(f"\n--- {path} ---")
        lines = f.readlines()
        for i, line in enumerate(lines):
            if 'TATA.CARS' in line:
                start = max(0, i - 2)
                end = min(len(lines), i + 3)
                print(f"Line {i+1}:")
                for j in range(start, end):
                    print(lines[j].strip('\n'))

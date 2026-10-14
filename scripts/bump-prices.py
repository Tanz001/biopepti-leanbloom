from pathlib import Path
import re

path = Path(r"d:\WEB PROJECTS\biopepti-leanbloom\src\data\products.ts")
text = path.read_text(encoding="utf-8")
count = 0
samples = []


def bump(m: re.Match[str]) -> str:
    global count
    old = int(m.group(1))
    new = round(old * 1.45)
    count += 1
    if len(samples) < 8:
        samples.append((old, new))
    return f"price: {new}"


new_text = re.sub(r"price: (\d+)", bump, text)
path.write_text(new_text, encoding="utf-8")
print(f"updated {count} prices")
for old, new in samples:
    print(f"  {old} -> {new}")

# Also bump generator source prices so regenerating stays consistent
gen = Path(r"d:\WEB PROJECTS\biopepti-leanbloom\scripts\generate-products.py")
if gen.exists():
    gtext = gen.read_text(encoding="utf-8")
    lines = []
    gcount = 0
    for line in gtext.splitlines():
        if "|" in line and line.strip() and line.strip()[0].isdigit():
            parts = line.split("|")
            if len(parts) == 5 and parts[-1].strip().isdigit():
                old = int(parts[-1].strip())
                parts[-1] = str(round(old * 1.45))
                line = "|".join(parts)
                gcount += 1
        lines.append(line)
    gen.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"updated generator raw prices: {gcount}")

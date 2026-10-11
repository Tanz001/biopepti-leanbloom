from pathlib import Path

p = Path(r"d:\WEB PROJECTS\biopepti-leanbloom\src\data\coa.ts")
text = p.read_text(encoding="utf-8")
repl = {
    "sku: 'TZ15'": "sku: 'TR15'",
    "sku: 'BPC10'": "sku: 'BC10'",
    "sku: 'SG10'": "sku: 'SM10'",
    "sku: 'AOD10'": "sku: '10AD'",
    "sku: 'TB10'": "sku: 'BT10'",
    "sku: 'GHK100'": "sku: 'CU100'",
    "sku: 'CJC5'": "sku: 'CND5'",
    "sku: 'IPA5'": "sku: 'IP5'",
    "sku: 'EPI50'": "sku: 'ET50'",
    "sku: 'MOTS20'": "sku: 'MS20'",
    "sku: 'NAD500'": "sku: 'NJ500'",
    "sku: 'SLK10'": "sku: 'SK10'",
    "sku: 'SMX10'": "sku: 'XA10'",
    "sku: 'WBL10'": "sku: 'BB10'",
    "sku: 'MT210'": "sku: 'ML10'",
    "sku: 'AP10'": "sku: 'AP5'",
    "sku: 'PT10'": "sku: 'P41'",
    "sku: 'KPV5'": "sku: 'KP5'",
    "15mg*10vials": "15mg/vial*10 vials",
    "10mg*10vials": "10mg/vial*10 vials",
    "5mg*10vials": "5mg/vial*10 vials",
    "50mg*10vials": "50mg/vial*10 vials",
    "20mg*10vials": "20mg/vial*10 vials",
    "100mg*10vials": "100mg/vial*10 vials",
    "500mg*10vials": "500mg/vial*10 vials",
}
for a, b in repl.items():
    text = text.replace(a, b)
p.write_text(text, encoding="utf-8")
print("coa updated")

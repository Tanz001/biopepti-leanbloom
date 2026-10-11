from pathlib import Path
from collections import Counter

# Curated from assets/NCHEN.pdf (145 SKUs)
raw = """
1|TR5|Tirzepatide|5mg/vial*10 vials|21
2|TR10|Tirzepatide|10mg/vial*10 vials|31
3|TR15|Tirzepatide|15mg/vial*10 vials|41
4|TR20|Tirzepatide|20mg/vial*10 vials|52
5|TR30|Tirzepatide|30mg/vial*10 vials|63
6|TR40|Tirzepatide|40mg/vial*10 vials|86
7|TR50|Tirzepatide|50mg/vial*10 vials|100
8|TR60|Tirzepatide|60mg/vial*10 vials|112
9|TR80|Tirzepatide|80mg/vial*10 vials|143
10|TR100|Tirzepatide|100mg/vial*10 vials|174
11|TR120|Tirzepatide|120mg/vial*10 vials|204
12|RT5|Retatrutide|5mg/vial*10 vials|22
13|RT10|Retatrutide|10mg/vial*10 vials|38
14|RT15|Retatrutide|15mg/vial*10 vials|54
15|RT20|Retatrutide|20mg/vial*10 vials|64
16|RT30|Retatrutide|30mg/vial*10 vials|82
17|RT40|Retatrutide|40mg/vial*10 vials|90
18|RT50|Retatrutide|50mg/vial*10 vials|104
19|RT60|Retatrutide|60mg/vial*10 vials|116
20|CU50|GHK-Cu|50mg/vial*10 vials|20
21|CU100|GHK-Cu|100mg/vial*10 vials|36
22|AHK50|AHK-Cu|50mg/vial*10 vials|26
23|AHK100|AHK-Cu|100mg/vial*10 vials|40
24|IG01|IGF-1 LR3|0.1mg/vial*10 vials|83
25|IG1|IGF-1 LR3|1mg/vial*10 vials|114
26|SM5|Semaglutide|5mg/vial*10 vials|37
27|SM10|Semaglutide|10mg/vial*10 vials|56
28|SM15|Semaglutide|15mg/vial*10 vials|73
29|SM20|Semaglutide|20mg/vial*10 vials|92
30|SM30|Semaglutide|30mg/vial*10 vials|111
31|SM40|Semaglutide|40mg/vial*10 vials|130
32|SM50|Semaglutide|50mg/vial*10 vials|144
33|CGL5|Cagrilintide|5mg/vial*10 vials|84
34|CGL10|Cagrilintide|10mg/vial*10 vials|139
35|TSM5|Tesamorelin|5mg/vial*10 vials|64
36|TSM10|Tesamorelin|10mg/vial*10 vials|106
37|TSM20|Tesamorelin|20mg/vial*10 vials|199
38|MS5|MOTS-C|5mg/vial*10 vials|36
39|MS10|MOTS-C|10mg/vial*10 vials|54
40|MS20|MOTS-C|20mg/vial*10 vials|99
41|MS30|MOTS-C|30mg/vial*10 vials|121
42|MS40|MOTS-C|40mg/vial*10 vials|154
43|5AD|AOD9604|5mg/vial*10 vials|94
44|10AD|AOD9604|10mg/vial*10 vials|160
45|G25|GHRP-2|5mg/vial*10 vials|33
46|G210|GHRP-2|10mg/vial*10 vials|52
47|G215|GHRP-2|15mg/vial*10 vials|66
48|G65|GHRP-6|5mg/vial*10 vials|33
49|G610|GHRP-6|10mg/vial*10 vials|52
50|AR50|AICAR|50mg/vial*10 vials|94
51|NJ100|NAD+|100mg/vial*10 vials|34
52|NJ500|NAD+|500mg/vial*10 vials|62
53|NJ1000|NAD+|1000mg/vial*10 vials|111
54|H10|HGH 191 AA|10iu/vial*10 vials|32
55|H12|HGH 191 AA|12iu/vial*10 vials|42
56|H15|HGH 191 AA|15iu/vial*10 vials|53
57|H24|HGH 191 AA|24iu/vial*10 vials|83
58|H36|HGH 191 AA|36iu/vial*10 vials|121
59|HC1000|HCG|1000iu/vial*10 vials|30
60|HC2000|HCG|2000iu/vial*10 vials|48
61|HC5000|HCG|5000iu/vial*10 vials|77
62|HM75|HMG|75iu/vial*10 vials|88
63|BC5|BPC-157|5mg/vial*10 vials|26
64|BC10|BPC-157|10mg/vial*10 vials|46
65|BT5|TB-500 (Thymosin β4 Acetate)|5mg/vial*10 vials|56
66|BT10|TB-500 (Thymosin β4 Acetate)|10mg/vial*10 vials|106
67|CD5|CJC-1295 DAC|5mg/vial*10 vials|125
68|CD10|CJC-1295 DAC|10mg/vial*10 vials|228
69|CND5|CJC-1295 No DAC|5mg/vial*10 vials|63
70|CND10|CJC-1295 No DAC|10mg/vial*10 vials|125
71|BB10|Blend: BPC-157 5mg + TB-500 5mg|(5mg+5mg)/vial*10 vials|81
72|BB20|Blend: BPC-157 10mg + TB-500 10mg|(10mg+10mg)/vial*10 vials|161
73|CP10|Blend: CJC-1295 No DAC 5mg + Ipamorelin 5mg|(5mg+5mg)/vial*10 vials|86
74|GLOW70|Blend: BPC-157 10mg + TB-500 10mg + GHK-Cu 50mg|(10mg+10mg+50mg)/vial*10 vials|150
75|KLOW80|Blend: BPC-157 10mg + TB-500 10mg + GHK-Cu 50mg + KPV 10mg|(10mg+10mg+50mg+10mg)/vial*10 vials|173
76|SK5|Selank|5mg/vial*10 vials|29
77|SK10|Selank|10mg/vial*10 vials|55
78|ET10|Epithalon|10mg/vial*10 vials|39
79|ET50|Epithalon|50mg/vial*10 vials|130
80|ET100|Epithalon|100mg/vial*10 vials|241
81|P41|PT-141|10mg/vial*10 vials|55
82|IP5|Ipamorelin|5mg/vial*10 vials|28
83|IP10|Ipamorelin|10mg/vial*10 vials|54
84|DS5|DSIP|5mg/vial*10 vials|41
85|DS10|DSIP|10mg/vial*10 vials|60
86|XA5|Semax|5mg/vial*10 vials|28
87|XA10|Semax|10mg/vial*10 vials|54
88|KS5|Kisspeptin-10|5mg/vial*10 vials|38
89|KS10|Kisspeptin-10|10mg/vial*10 vials|65
90|TA5|Thymosin Alpha-1|5mg/vial*10 vials|85
91|TA10|Thymosin Alpha-1|10mg/vial*10 vials|125
92|TA50|Thymosin Alpha-1|50mg/vial*10 vials|474
93|332-10|SLU-PP-332|10mg/vial*10 vials|61
94|ML10|Melanotan II|10mg/vial*10 vials|48
95|MT1|Melanotan I|10mg/vial*10 vials|44
96|2S10|SS-31|10mg/vial*10 vials|72
97|2S20|SS-31|20mg/vial*10 vials|116
98|2S50|SS-31|50mg/vial*10 vials|350
99|MT10|Melatonin|10mg/vial*10 vials|69
100|HX5|Hexarelin|5mg/vial*10 vials|85
101|HX10|Hexarelin|10mg/vial*10 vials|97
102|AP5|Adipotide|5mg/vial*10 vials|117
103|SMO-5|Sermorelin Acetate|5mg/vial*10 vials|83
104|SMO-10|Sermorelin Acetate|10mg/vial*10 vials|124
105|NP810|SNAP-8|10mg/vial*10 vials|34
106|TY10|Thymalin|10mg/vial*10 vials|72
107|F410|FOXO4-DRI|10mg/vial*10 vials|276
108|375|LL-37|5mg/vial*10 vials|81
109|SUR10|Survodutide|10mg/vial*10 vials|172
110|RA10|Ara-290|10mg/vial*10 vials|74
111|DR5|Dermorphin|5mg/vial*10 vials|50
112|KP5|KPV|5mg/vial*10 vials|28
113|KP10|KPV|10mg/vial*10 vials|45
114|VP10|VIP|10mg/vial*10 vials|125
115|CS10|Blend: Cagrilintide 5mg + Semaglutide 5mg|(5mg+5mg)/vial*10 vials|128
116|GND2|Gonadorelin Acetate|2mg/vial*10 vials|37
117|BA3|Bacteriostatic Water|3ml/vial*10 vials|7
118|BA10|Bacteriostatic Water|10ml/vial*10 vials|9
119|AAW3|Acetic Acid Water|3ml/vial*10 vials|7
120|AAW10|Acetic Acid Water|10ml/vial*10 vials|9
121|B12|Lipo-C B12|10ml/vial*10 vials|55
122|LB|Lemon Bottle|10ml/vial*10 vials|50
123|OT5|Oxytocin Acetate|5mg/vial*10 vials|66
124|OT10|Oxytocin Acetate|10mg/vial*10 vials|79
125|FR5|HGH Fragment 176-191|5mg/vial*10 vials|80
126|5AM|5-Amino-1MQ|5mg/vial*10 vials|36
127|10AM|5-Amino-1MQ|10mg/vial*10 vials|52
128|50AM|5-Amino-1MQ|50mg/vial*10 vials|73
129|FM2|MGF|2mg/vial*10 vials|46
130|FMP2|PEG-MGF|2mg/vial*10 vials|80
131|GTT600|Glutathione|600mg/vial*10 vials|33
132|GTT1500|Glutathione|1500mg/vial*10 vials|54
133|SMK2|Semaglutide (cartridge)|2mg/cartridge*10 cartridges|128
134|SMK5|Semaglutide (cartridge)|5mg/cartridge*10 cartridges|161
135|TRK2|Tirzepatide (cartridge)|2.5mg/cartridge*10 cartridges|144
136|TRK5|Tirzepatide (cartridge)|5mg/cartridge*10 cartridges|183
137|TRK10|Tirzepatide (cartridge)|10mg/cartridge*10 cartridges|243
138|TRK15|Tirzepatide (cartridge)|15mg/cartridge*10 cartridges|304
139|FS344-1|Follistatin 344|1mg/vial*10 vials|250
140|FS344-2|Follistatin 344|2mg/vial*10 vials|466
141|M3000|Matrixyl 3000|10mg/vial*10 vials|240
142|OP-24|Oligopeptide-24|10mg/vial*10 vials|50
143|ACE031|ACE-031|1mg/vial*10 vials|250
144|GDF-8|GDF-8|1mg/vial*10 vials|251
145|PNC27|PNC-27|10mg/vial*10 vials|50
"""

CATEGORY_MAP = {
    "Weight Management": [
        "Tirzepatide",
        "Retatrutide",
        "Semaglutide",
        "Cagrilintide",
        "AOD9604",
        "Adipotide",
        "Survodutide",
        "5-Amino-1MQ",
        "HGH Fragment 176-191",
        "Lemon Bottle",
        "Blend: Cagrilintide 5mg + Semaglutide 5mg",
        "Tirzepatide (cartridge)",
        "Semaglutide (cartridge)",
    ],
    "Recovery & Repair": [
        "BPC-157",
        "TB-500 (Thymosin β4 Acetate)",
        "Blend: BPC-157 5mg + TB-500 5mg",
        "Blend: BPC-157 10mg + TB-500 10mg",
        "Blend: BPC-157 10mg + TB-500 10mg + GHK-Cu 50mg",
        "Blend: BPC-157 10mg + TB-500 10mg + GHK-Cu 50mg + KPV 10mg",
        "KPV",
        "LL-37",
        "Thymosin Alpha-1",
        "Ara-290",
        "Dermorphin",
        "VIP",
        "Glutathione",
    ],
    "Growth Hormone & Longevity": [
        "Tesamorelin",
        "MOTS-C",
        "GHRP-2",
        "GHRP-6",
        "HGH 191 AA",
        "CJC-1295 DAC",
        "CJC-1295 No DAC",
        "Ipamorelin",
        "Blend: CJC-1295 No DAC 5mg + Ipamorelin 5mg",
        "Epithalon",
        "Sermorelin Acetate",
        "Hexarelin",
        "IGF-1 LR3",
        "FOXO4-DRI",
        "SS-31",
        "Follistatin 344",
        "ACE-031",
        "GDF-8",
        "MGF",
        "PEG-MGF",
        "NAD+",
        "AICAR",
    ],
    "Cosmetic & Peptides": [
        "GHK-Cu",
        "AHK-Cu",
        "SNAP-8",
        "Matrixyl 3000",
        "Oligopeptide-24",
        "Melanotan II",
        "Melanotan I",
        "Melatonin",
    ],
    "Cognitive & Neuro": [
        "Selank",
        "Semax",
        "DSIP",
        "PT-141",
        "Kisspeptin-10",
        "Oxytocin Acetate",
        "PNC-27",
    ],
    "Cellular Research": [
        "HCG",
        "HMG",
        "Thymalin",
        "SLU-PP-332",
        "Gonadorelin Acetate",
        "Bacteriostatic Water",
        "Acetic Acid Water",
        "Lipo-C B12",
    ],
}


def category_for(name: str) -> str:
    for cat, names in CATEGORY_MAP.items():
        if name in names:
            return cat
    n = name.lower()
    if "blend" in n and ("bpc" in n or "tb" in n):
        return "Recovery & Repair"
    if any(k in n for k in ["tirz", "reta", "sema", "cagr", "aod", "adipo", "survo", "amino"]):
        return "Weight Management"
    if any(k in n for k in ["ghk", "ahk", "melano", "snap", "matrix", "oligo"]):
        return "Cosmetic & Peptides"
    if any(k in n for k in ["selank", "semax", "dsip", "pt-141", "kiss", "oxy", "pnc"]):
        return "Cognitive & Neuro"
    if any(k in n for k in ["water", "hcg", "hmg", "b12", "lemon", "gonado", "thymalin", "slu"]):
        return "Cellular Research"
    return "Growth Hormone & Longevity"


DESCRIPTIONS = {
    "Tirzepatide": "Dual GIP/GLP-1 receptor agonist research peptide for metabolic pathway studies.",
    "Retatrutide": "Triple agonist (GLP-1/GIP/Glucagon) peptide for advanced metabolic research models.",
    "Semaglutide": "Long-acting GLP-1 receptor agonist peptide for glucose and appetite pathway research.",
    "GHK-Cu": "Copper-binding tripeptide researched for tissue remodeling and cosmetic biology.",
    "AHK-Cu": "Copper peptide analog investigated in dermal and follicular research models.",
    "BPC-157": "Synthetic gastric pentadecapeptide studied in tissue repair and angiogenesis assays.",
    "TB-500 (Thymosin β4 Acetate)": "Thymosin β4 fragment researched for cell migration and recovery models.",
    "NAD+": "Nicotinamide adenine dinucleotide coenzyme for cellular energy and aging research.",
    "HGH 191 AA": "191-amino-acid recombinant growth hormone sequence for endocrine research.",
    "Epithalon": "Tetrapeptide studied in telomere and longevity research applications.",
    "MOTS-C": "Mitochondrial-derived peptide researched in metabolic and exercise biology.",
    "Ipamorelin": "Selective growth hormone secretagogue peptide for pituitary research.",
    "CJC-1295 DAC": "Long-acting GHRH analog with Drug Affinity Complex for sustained GH research.",
    "CJC-1295 No DAC": "GHRH analog without DAC for pulsed growth hormone secretagogue studies.",
    "Selank": "Synthetic tuftsin analog researched in anxiolytic and cognitive models.",
    "Semax": "ACTH(4-10) analog studied in nootropic and neuroprotective research.",
    "SS-31": "Mitochondria-targeting tetrapeptide for oxidative stress research.",
    "Bacteriostatic Water": "Sterile bacteriostatic water for research peptide reconstitution.",
    "Acetic Acid Water": "Dilute acetic acid reconstitution solution for selected research peptides.",
}


def desc_for(name: str) -> str:
    if name in DESCRIPTIONS:
        return DESCRIPTIONS[name]
    if name.startswith("Blend:"):
        return "Multi-peptide research blend formulated for combined pathway studies. Lyophilized sterile kit."
    if "cartridge" in name.lower():
        return "Pre-filled research cartridge presentation (pen not included). For laboratory use only."
    return f"High-purity lyophilized {name} research peptide kit. HPLC/MS verified for laboratory use only."


def purity_for(name: str, sku: str) -> str:
    if "HGH" in name:
        return "98%+" if sku == "H36" else "97%+"
    if name in ("Follistatin 344", "ACE-031", "GDF-8"):
        return "95%+"
    if name in ("Bacteriostatic Water", "Acetic Acid Water", "Lipo-C B12", "Lemon Bottle"):
        return "USP"
    return "≥99%"


def esc(s: str) -> str:
    return s.replace("\\", "\\\\").replace("'", "\\'")


products = []
for line in raw.strip().splitlines():
    _n, sku, name, spec, price = line.split("|")
    products.append(
        {
            "id": f"prod-{sku.lower()}",
            "sku": sku,
            "name": name,
            "spec": spec,
            "price": int(price),
            "category": category_for(name),
            "purity": purity_for(name, sku),
            "description": desc_for(name),
        }
    )

print(len(products), "products")
print("max price", max(p["price"] for p in products))
print(Counter(p["category"] for p in products))

out = []
out.append("import { Product, ProductGroup } from '../types';")
out.append("")
out.append("/** Catalog sourced from assets/NCHEN.pdf wholesale kit list. */")
out.append("export const PRODUCTS_DATA: Product[] = [")
for p in products:
    out.append("  {")
    out.append(f"    id: '{p['id']}',")
    out.append(f"    sku: '{p['sku']}',")
    out.append(f"    name: '{esc(p['name'])}',")
    out.append(f"    spec: '{esc(p['spec'])}',")
    out.append(f"    price: {p['price']},")
    out.append(f"    category: '{p['category']}',")
    out.append(f"    purity: '{p['purity']}',")
    out.append(f"    description: '{esc(p['description'])}',")
    out.append("    appearance: 'White lyophilized sterile powder',")
    out.append("    storage: 'Store desiccated at -20°C. Protect from light.',")
    out.append("    inStock: true,")
    out.append("    leadTime: 'Immediate (Ships in 24–48h)'")
    out.append("  },")
out.append("];")
out.append("")
out.append("export const PRODUCT_CATEGORIES = [")
out.append("  'All Categories',")
out.append("  'Weight Management',")
out.append("  'Recovery & Repair',")
out.append("  'Growth Hormone & Longevity',")
out.append("  'Cosmetic & Peptides',")
out.append("  'Cognitive & Neuro',")
out.append("  'Cellular Research'")
out.append("] as const;")
out.append("")
out.append("export const CATALOG_SKU_COUNT = PRODUCTS_DATA.length;")
out.append("")
out.append("export const getGroupedProducts = (): ProductGroup[] => {")
out.append("  const map = new Map<string, Product[]>();")
out.append("  PRODUCTS_DATA.forEach(p => {")
out.append("    const key = p.name;")
out.append("    if (!map.has(key)) map.set(key, []);")
out.append("    map.get(key)!.push(p);")
out.append("  });")
out.append("  return Array.from(map.entries()).map(([name, variants]) => ({")
out.append("    name,")
out.append("    category: variants[0].category,")
out.append("    description: variants[0].description,")
out.append("    variants")
out.append("  }));")
out.append("};")

path = Path(r"d:\WEB PROJECTS\biopepti-leanbloom\src\data\products.ts")
path.write_text("\n".join(out) + "\n", encoding="utf-8")
print("wrote", path)
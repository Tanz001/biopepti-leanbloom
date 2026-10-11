import { Product, ProductGroup } from '../types';

export const PRODUCTS_DATA: Product[] = [
  // AOD9604
  {
    id: 'prod-aod-5',
    sku: 'AOD5',
    name: 'AOD9604',
    spec: '5mg*10vials',
    price: 101,
    category: 'Weight Management',
    purity: '99.4%',
    casNumber: '221231-10-3',
    sequence: 'Leu-Arg-Ile-Val-Gln-Cys-Arg-Ser-Val-Glu-Gly-Ser-Cys-Gly-Phe',
    molecularWeight: '1815.1 g/mol',
    description: 'Modified fragment of human growth hormone (C-terminus 176–191) synthesized for lipid oxidation research.',
    appearance: 'White lyophilized sterile powder',
    storage: 'Store desiccated at -20°C for up to 24 months',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },
  {
    id: 'prod-aod-10',
    sku: 'AOD10',
    name: 'AOD9604',
    spec: '10mg*10vials',
    price: 135,
    category: 'Weight Management',
    purity: '99.6%',
    casNumber: '221231-10-3',
    sequence: 'Leu-Arg-Ile-Val-Gln-Cys-Arg-Ser-Val-Glu-Gly-Ser-Cys-Gly-Phe',
    molecularWeight: '1815.1 g/mol',
    description: 'High-concentration AOD-9604 research kit. Standardized USP Grade sterile vial presentation.',
    appearance: 'White lyophilized sterile powder',
    storage: 'Store desiccated at -20°C for up to 24 months',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },

  // Adipotide
  {
    id: 'prod-ap-2',
    sku: 'AP2',
    name: 'Adipotide (FTPP)',
    spec: '2mg*10vials',
    price: 80,
    category: 'Weight Management',
    purity: '98.9%',
    casNumber: '137525-51-0',
    molecularWeight: '2555.2 g/mol',
    description: 'Targeted peptidomimetic research agent investigated for selective vascular disruption in adipose tissue.',
    appearance: 'White lyophilized powder',
    storage: 'Store at -20°C. Protect from light.',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },
  {
    id: 'prod-ap-5',
    sku: 'AP5',
    name: 'Adipotide (FTPP)',
    spec: '5mg*10vials',
    price: 135,
    category: 'Weight Management',
    purity: '99.1%',
    casNumber: '137525-51-0',
    molecularWeight: '2555.2 g/mol',
    description: 'High purity pro-apoptotic peptide conjugate for metabolic and adipose tissue models.',
    appearance: 'White lyophilized powder',
    storage: 'Store at -20°C. Protect from light.',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },
  {
    id: 'prod-ap-10',
    sku: 'AP10',
    name: 'Adipotide (FTPP)',
    spec: '10mg*10vials',
    price: 200,
    category: 'Weight Management',
    purity: '99.2%',
    casNumber: '137525-51-0',
    molecularWeight: '2555.2 g/mol',
    description: 'Bulk 10mg format for high-throughput laboratory research protocols.',
    appearance: 'White lyophilized powder',
    storage: 'Store at -20°C. Protect from light.',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },

  // Cagrilintide
  {
    id: 'prod-cgl-5',
    sku: 'CGL5',
    name: 'Cagrilintide',
    spec: '5mg*10vials',
    price: 105,
    category: 'Weight Management',
    purity: '99.5%',
    casNumber: '1415456-99-3',
    molecularWeight: '4541.1 g/mol',
    description: 'Long-acting dual amylin and calcitonin receptor agonist peptide for satiety neurobiology research.',
    appearance: 'Fluffy white lyophilized powder',
    storage: 'Store desiccated at -20°C',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },
  {
    id: 'prod-cgl-10',
    sku: 'CGL10',
    name: 'Cagrilintide',
    spec: '10mg*10vials',
    price: 180,
    category: 'Weight Management',
    purity: '99.7%',
    casNumber: '1415456-99-3',
    molecularWeight: '4541.1 g/mol',
    description: 'High potency Cagrilintide standardized for synergistic peptide combination studies.',
    appearance: 'Fluffy white lyophilized powder',
    storage: 'Store desiccated at -20°C',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },

  // Tirzepatide
  {
    id: 'prod-tz-10',
    sku: 'TZ10',
    name: 'Tirzepatide',
    spec: '10mg*10vials',
    price: 110,
    category: 'Weight Management',
    purity: '99.8%',
    casNumber: '2023788-19-2',
    molecularWeight: '4813.5 g/mol',
    description: 'Dual GIP and GLP-1 receptor co-agonist designed with fatty diacid chain modification.',
    appearance: 'Sterile white lyophilized cake',
    storage: 'Store at -20°C. Reseal tightly after reconstitution.',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },
  {
    id: 'prod-tz-15',
    sku: 'TZ15',
    name: 'Tirzepatide',
    spec: '15mg*10vials',
    price: 145,
    category: 'Weight Management',
    purity: '99.8%',
    casNumber: '2023788-19-2',
    molecularWeight: '4813.5 g/mol',
    description: 'Premium wholesale 15mg format. Tested via UHPLC and Electrospray MS.',
    appearance: 'Sterile white lyophilized cake',
    storage: 'Store at -20°C. Reseal tightly after reconstitution.',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },
  {
    id: 'prod-tz-30',
    sku: 'TZ30',
    name: 'Tirzepatide',
    spec: '30mg*10vials',
    price: 245,
    category: 'Weight Management',
    purity: '99.9%',
    casNumber: '2023788-19-2',
    molecularWeight: '4813.5 g/mol',
    description: 'High-density 30mg formulation optimized for institutional wholesale accounts.',
    appearance: 'Sterile white lyophilized cake',
    storage: 'Store at -20°C.',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },

  // Retatrutide
  {
    id: 'prod-rt-5',
    sku: 'RT5',
    name: 'Retatrutide (GGG Tri-agonist)',
    spec: '5mg*10vials',
    price: 95,
    category: 'Weight Management',
    purity: '99.5%',
    casNumber: '2381089-83-2',
    molecularWeight: '4731.4 g/mol',
    description: 'Triple GIP, GLP-1, and glucagon receptor agonist peptide for advanced energetic studies.',
    appearance: 'Lyophilized powder',
    storage: 'Store at -20°C',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },
  {
    id: 'prod-rt-10',
    sku: 'RT10',
    name: 'Retatrutide (GGG Tri-agonist)',
    spec: '10mg*10vials',
    price: 155,
    category: 'Weight Management',
    purity: '99.6%',
    casNumber: '2381089-83-2',
    molecularWeight: '4731.4 g/mol',
    description: '10mg triple-hormone research peptide. Batch authenticated with HPLC chromatogram.',
    appearance: 'Lyophilized powder',
    storage: 'Store at -20°C',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },
  {
    id: 'prod-rt-15',
    sku: 'RT15',
    name: 'Retatrutide (GGG Tri-agonist)',
    spec: '15mg*10vials',
    price: 210,
    category: 'Weight Management',
    purity: '99.7%',
    casNumber: '2381089-83-2',
    molecularWeight: '4731.4 g/mol',
    description: 'High yield 15mg vials for metabolic pathway comparative profiling.',
    appearance: 'Lyophilized powder',
    storage: 'Store at -20°C',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },

  // Semaglutide
  {
    id: 'prod-sg-5',
    sku: 'SG5',
    name: 'Semaglutide',
    spec: '5mg*10vials',
    price: 85,
    category: 'Weight Management',
    purity: '99.6%',
    casNumber: '910463-68-2',
    molecularWeight: '4113.6 g/mol',
    description: 'Synthetic glucagon-like peptide-1 receptor agonist with albumin-binding fatty diacid.',
    appearance: 'White sterile cake',
    storage: 'Store at -20°C',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },
  {
    id: 'prod-sg-10',
    sku: 'SG10',
    name: 'Semaglutide',
    spec: '10mg*10vials',
    price: 130,
    category: 'Weight Management',
    purity: '99.8%',
    casNumber: '910463-68-2',
    molecularWeight: '4113.6 g/mol',
    description: '10mg wholesale Semaglutide, cGMP laboratory synthesized with certified low endotoxin (<0.05 EU/mg).',
    appearance: 'White sterile cake',
    storage: 'Store at -20°C',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },

  // BPC-157
  {
    id: 'prod-bpc-5',
    sku: 'BPC5',
    name: 'BPC-157 (Body Protection Compound)',
    spec: '5mg*10vials',
    price: 68,
    category: 'Recovery & Repair',
    purity: '99.5%',
    casNumber: '137525-51-0',
    sequence: 'Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val',
    molecularWeight: '1419.5 g/mol',
    description: 'Pentadecapeptide composed of 15 amino acids derived from gastric juice protein, widely researched for angiogenesis and tissue recovery.',
    appearance: 'Fine white powder',
    storage: 'Store at -20°C',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },
  {
    id: 'prod-bpc-10',
    sku: 'BPC10',
    name: 'BPC-157 (Body Protection Compound)',
    spec: '10mg*10vials',
    price: 98,
    category: 'Recovery & Repair',
    purity: '99.7%',
    casNumber: '137525-51-0',
    sequence: 'Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val',
    molecularWeight: '1419.5 g/mol',
    description: '10mg BPC-157 format. Stable lyophilized cake with pharmaceutical-grade mannitol excipient.',
    appearance: 'Fine white powder',
    storage: 'Store at -20°C',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },

  // TB-500
  {
    id: 'prod-tb-5',
    sku: 'TB5',
    name: 'TB-500 (Thymosin Beta-4 Fragment)',
    spec: '5mg*10vials',
    price: 75,
    category: 'Recovery & Repair',
    purity: '99.2%',
    casNumber: '77591-33-4',
    sequence: 'Ac-Leu-Lys-Lys-Thr-Glu-Thr-Gln',
    molecularWeight: '4963.5 g/mol',
    description: 'Synthetic peptide of the active domain of thymosin beta-4, investigated for cellular migration and actin sequestration.',
    appearance: 'Sterile lyophilized powder',
    storage: 'Store at -20°C',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },
  {
    id: 'prod-tb-10',
    sku: 'TB10',
    name: 'TB-500 (Thymosin Beta-4 Fragment)',
    spec: '10mg*10vials',
    price: 120,
    category: 'Recovery & Repair',
    purity: '99.4%',
    casNumber: '77591-33-4',
    molecularWeight: '4963.5 g/mol',
    description: '10mg TB-500 double pack formulation. Pure synthetic peptide sequence with documented MS spectrum.',
    appearance: 'Sterile lyophilized powder',
    storage: 'Store at -20°C',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },

  // BPC-157 + TB-500 Blend
  {
    id: 'prod-blend-10',
    sku: 'WBL10',
    name: 'Wolverine Blend (BPC-157 5mg + TB-500 5mg)',
    spec: '10mg*10vials',
    price: 140,
    category: 'Recovery & Repair',
    purity: '99.3%',
    description: 'Pre-mixed 1:1 co-lyophilized formulation of BPC-157 (5mg) and TB-500 (5mg) for dual-mechanistic research.',
    appearance: 'White homogeneous cake',
    storage: 'Store at -20°C',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },

  // GHK-Cu
  {
    id: 'prod-ghk-50',
    sku: 'GHK50',
    name: 'GHK-Cu (Copper Tripeptide-1)',
    spec: '50mg*10vials',
    price: 65,
    category: 'Cosmetic & Peptides',
    purity: '99.3%',
    casNumber: '49557-75-7',
    sequence: 'Gly-His-Lys:Cu2+',
    molecularWeight: '404.9 g/mol',
    description: 'Deep blue copper peptide complex stimulating collagen, elastin, and glycosaminoglycan synthesis in dermatological assays.',
    appearance: 'Deep vivid blue lyophilized powder',
    storage: 'Store at 2-8°C or -20°C. Protect from moisture.',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },
  {
    id: 'prod-ghk-100',
    sku: 'GHK100',
    name: 'GHK-Cu (Copper Tripeptide-1)',
    spec: '100mg*10vials',
    price: 110,
    category: 'Cosmetic & Peptides',
    purity: '99.6%',
    casNumber: '49557-75-7',
    molecularWeight: '404.9 g/mol',
    description: 'High capacity 100mg cosmetic and dermatological grade GHK-Cu. Superb chelation stability.',
    appearance: 'Deep vivid blue lyophilized powder',
    storage: 'Store at 2-8°C or -20°C',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },

  // GHK Basic (Uncomplexed)
  {
    id: 'prod-ghkb-50',
    sku: 'GHKB50',
    name: 'GHK Basic (Free Peptide)',
    spec: '50mg*10vials',
    price: 55,
    category: 'Cosmetic & Peptides',
    purity: '99.1%',
    casNumber: '49557-74-6',
    sequence: 'Gly-His-Lys',
    molecularWeight: '340.4 g/mol',
    description: 'Uncomplexed free base GHK peptide tripeptide for metal chelation and gene expression assays.',
    appearance: 'White crystalline powder',
    storage: 'Store at -20°C',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },

  // CJC-1295 (No DAC)
  {
    id: 'prod-cjc-nodac-2',
    sku: 'CJC2',
    name: 'CJC-1295 (Mod GRF 1-29)',
    spec: '2mg*10vials',
    price: 52,
    category: 'Growth Hormone & Longevity',
    purity: '99.4%',
    casNumber: '863288-34-0',
    molecularWeight: '3367.9 g/mol',
    description: 'Modified growth hormone releasing factor analogue with four amino acid substitutions for enhanced resistance to enzymatic cleavage.',
    appearance: 'White lyophilized powder',
    storage: 'Store at -20°C',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },
  {
    id: 'prod-cjc-nodac-5',
    sku: 'CJC5',
    name: 'CJC-1295 (Mod GRF 1-29)',
    spec: '5mg*10vials',
    price: 88,
    category: 'Growth Hormone & Longevity',
    purity: '99.6%',
    casNumber: '863288-34-0',
    molecularWeight: '3367.9 g/mol',
    description: 'Standard research format 5mg vials. Fully documented chromatographic purity.',
    appearance: 'White lyophilized powder',
    storage: 'Store at -20°C',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },

  // CJC-1295 DAC
  {
    id: 'prod-cjc-dac-2',
    sku: 'CJCD2',
    name: 'CJC-1295 with DAC',
    spec: '2mg*10vials',
    price: 74,
    category: 'Growth Hormone & Longevity',
    purity: '99.2%',
    casNumber: '863288-34-0',
    molecularWeight: '3647.2 g/mol',
    description: 'CJC-1295 conjugated to Maleimidoproprionic acid (DAC) enabling bioconjugation to endogenous serum albumin.',
    appearance: 'White lyophilized powder',
    storage: 'Store at -20°C',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },
  {
    id: 'prod-cjc-dac-5',
    sku: 'CJCD5',
    name: 'CJC-1295 with DAC',
    spec: '5mg*10vials',
    price: 130,
    category: 'Growth Hormone & Longevity',
    purity: '99.4%',
    casNumber: '863288-34-0',
    molecularWeight: '3647.2 g/mol',
    description: 'Long acting DAC analogue for sustained pulse hormone dynamics experimentation.',
    appearance: 'White lyophilized powder',
    storage: 'Store at -20°C',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },

  // Ipamorelin
  {
    id: 'prod-ipa-2',
    sku: 'IPA2',
    name: 'Ipamorelin',
    spec: '2mg*10vials',
    price: 48,
    category: 'Growth Hormone & Longevity',
    purity: '99.5%',
    casNumber: '170851-70-4',
    sequence: 'Aib-His-D-2-Nal-D-Phe-Lys-NH2',
    molecularWeight: '711.9 g/mol',
    description: 'Selective pentapeptide ghrelin receptor agonist stimulating growth hormone release without significant cortisol or prolactin elevation.',
    appearance: 'Fine white powder',
    storage: 'Store at -20°C',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },
  {
    id: 'prod-ipa-5',
    sku: 'IPA5',
    name: 'Ipamorelin',
    spec: '5mg*10vials',
    price: 78,
    category: 'Growth Hormone & Longevity',
    purity: '99.7%',
    casNumber: '170851-70-4',
    molecularWeight: '711.9 g/mol',
    description: 'High purity 5mg Ipamorelin. Standardized research presentation for in vitro and translational assays.',
    appearance: 'Fine white powder',
    storage: 'Store at -20°C',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },

  // CJC + Ipamorelin Blend
  {
    id: 'prod-cjc-ipa-10',
    sku: 'CIPA10',
    name: 'CJC-1295 + Ipamorelin Blend (5mg + 5mg)',
    spec: '10mg*10vials',
    price: 125,
    category: 'Growth Hormone & Longevity',
    purity: '99.4%',
    description: 'Synergistic formulation of Mod GRF 1-29 and Ipamorelin lyophilized in equivalent 1:1 mass ratio.',
    appearance: 'White uniform powder',
    storage: 'Store at -20°C',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },

  // Epithalon
  {
    id: 'prod-epi-10',
    sku: 'EPI10',
    name: 'Epithalon (Epithalamin Tetra-peptide)',
    spec: '10mg*10vials',
    price: 65,
    category: 'Growth Hormone & Longevity',
    purity: '99.6%',
    casNumber: '307297-39-8',
    sequence: 'Ala-Glu-Asp-Gly',
    molecularWeight: '390.3 g/mol',
    description: 'Synthetic pineal gland derived tetrapeptide investigated for telomerase activation and cellular longevity.',
    appearance: 'White lyophilized powder',
    storage: 'Store at -20°C',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },
  {
    id: 'prod-epi-50',
    sku: 'EPI50',
    name: 'Epithalon (Epithalamin Tetra-peptide)',
    spec: '50mg*10vials',
    price: 160,
    category: 'Growth Hormone & Longevity',
    purity: '99.7%',
    casNumber: '307297-39-8',
    molecularWeight: '390.3 g/mol',
    description: 'Bulk 50mg vial format for institutional epigenetic and chromatin stability research.',
    appearance: 'White lyophilized powder',
    storage: 'Store at -20°C',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },

  // MOTS-c
  {
    id: 'prod-mots-10',
    sku: 'MOTS10',
    name: 'MOTS-c (Mitochondrial Peptide)',
    spec: '10mg*10vials',
    price: 92,
    category: 'Cellular Research',
    purity: '99.3%',
    casNumber: '1627580-64-6',
    sequence: 'Met-Arg-Trp-Gln-Glu-Met-Gly-Tyr-Ile-Phe-Tyr-Pro-Arg-Lys-Leu-Arg',
    molecularWeight: '2174.6 g/mol',
    description: 'Mitochondrial-derived peptide encoded by the 12S rRNA region, modulating metabolic homeostasis and AMPK activation.',
    appearance: 'Lyophilized white powder',
    storage: 'Store desiccated at -20°C',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },
  {
    id: 'prod-mots-20',
    sku: 'MOTS20',
    name: 'MOTS-c (Mitochondrial Peptide)',
    spec: '20mg*10vials',
    price: 155,
    category: 'Cellular Research',
    purity: '99.5%',
    casNumber: '1627580-64-6',
    molecularWeight: '2174.6 g/mol',
    description: 'High dose 20mg format for cell culture and bio-energetic flux experiments.',
    appearance: 'Lyophilized white powder',
    storage: 'Store desiccated at -20°C',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },

  // NAD+ (Sterile research lyophilized)
  {
    id: 'prod-nad-100',
    sku: 'NAD100',
    name: 'NAD+ (Nicotinamide Adenine Dinucleotide)',
    spec: '100mg*10vials',
    price: 85,
    category: 'Cellular Research',
    purity: '99.8%',
    casNumber: '53-84-9',
    molecularWeight: '663.4 g/mol',
    description: 'Cellular coenzyme central to energy metabolism and sirtuin enzyme cofactor mechanisms. Ultra-pure lyophilized form.',
    appearance: 'Off-white lyophilized cake',
    storage: 'Store at -20°C. Protect from moisture.',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },
  {
    id: 'prod-nad-500',
    sku: 'NAD500',
    name: 'NAD+ (Nicotinamide Adenine Dinucleotide)',
    spec: '500mg*10vials',
    price: 215,
    category: 'Cellular Research',
    purity: '99.9%',
    casNumber: '53-84-9',
    molecularWeight: '663.4 g/mol',
    description: 'Bulk 500mg research vial set. Tested for minimal free nicotinamide impurities.',
    appearance: 'Off-white lyophilized cake',
    storage: 'Store at -20°C. Protect from moisture.',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },

  // Melanotan II
  {
    id: 'prod-mt2-10',
    sku: 'MT210',
    name: 'Melanotan II',
    spec: '10mg*10vials',
    price: 52,
    category: 'Cosmetic & Peptides',
    purity: '99.4%',
    casNumber: '121062-08-6',
    sequence: 'Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-NH2',
    molecularWeight: '1024.2 g/mol',
    description: 'Cyclic heptapeptide analogue of alpha-MSH acting as a non-selective melanocortin receptor agonist.',
    appearance: 'White fine powder',
    storage: 'Store at -20°C',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },

  // PT-141 (Bremelanotide)
  {
    id: 'prod-pt-10',
    sku: 'PT10',
    name: 'PT-141 (Bremelanotide)',
    spec: '10mg*10vials',
    price: 70,
    category: 'Recovery & Repair',
    purity: '99.6%',
    casNumber: '189745-66-4',
    sequence: 'Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-OH',
    molecularWeight: '1025.2 g/mol',
    description: 'Centrally active melanocortin agonist derived from MT-II with selective MC3R and MC4R activity.',
    appearance: 'White sterile cake',
    storage: 'Store at -20°C',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },

  // Selank
  {
    id: 'prod-slk-5',
    sku: 'SLK5',
    name: 'Selank',
    spec: '5mg*10vials',
    price: 49,
    category: 'Cognitive & Neuro',
    purity: '99.3%',
    casNumber: '129954-34-3',
    sequence: 'Thr-Lys-Pro-Arg-Pro-Gly-Pro',
    molecularWeight: '751.9 g/mol',
    description: 'Synthetic analogue of human immunopeptide tuftsin with added Pro-Gly-Pro tripeptide for enzymatic protection.',
    appearance: 'White lyophilized powder',
    storage: 'Store at -20°C',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },
  {
    id: 'prod-slk-10',
    sku: 'SLK10',
    name: 'Selank',
    spec: '10mg*10vials',
    price: 78,
    category: 'Cognitive & Neuro',
    purity: '99.5%',
    casNumber: '129954-34-3',
    molecularWeight: '751.9 g/mol',
    description: '10mg Selank research vials. Characterized via mass spectrometry and analytical HPLC.',
    appearance: 'White lyophilized powder',
    storage: 'Store at -20°C',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },

  // Semax
  {
    id: 'prod-smx-5',
    sku: 'SMX5',
    name: 'Semax',
    spec: '5mg*10vials',
    price: 49,
    category: 'Cognitive & Neuro',
    purity: '99.2%',
    casNumber: '80714-61-0',
    sequence: 'Met-Glu-His-Phe-Pro-Gly-Pro',
    molecularWeight: '813.9 g/mol',
    description: 'Heptapeptide analogue of ACTH (4-10) fragment with C-terminal tripeptide extension, studied for BDNF regulation.',
    appearance: 'White lyophilized powder',
    storage: 'Store at -20°C',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },
  {
    id: 'prod-smx-10',
    sku: 'SMX10',
    name: 'Semax',
    spec: '10mg*10vials',
    price: 78,
    category: 'Cognitive & Neuro',
    purity: '99.5%',
    casNumber: '80714-61-0',
    molecularWeight: '813.9 g/mol',
    description: '10mg Semax research standard. High peptide content with verified counter-ion assay.',
    appearance: 'White lyophilized powder',
    storage: 'Store at -20°C',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },

  // Tesofensine
  {
    id: 'prod-tfs-05',
    sku: 'TFS05',
    name: 'Tesofensine Research Grade',
    spec: '500mcg*10vials',
    price: 90,
    category: 'Weight Management',
    purity: '99.1%',
    casNumber: '195875-84-4',
    molecularWeight: '328.3 g/mol',
    description: 'Triple monoamine reuptake inhibitor investigating neurotransmitter pathway modulation.',
    appearance: 'Crystalline white lyophilized powder',
    storage: 'Store desiccated at -20°C',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },

  // Oxytocin
  {
    id: 'prod-oxy-2',
    sku: 'OXY2',
    name: 'Oxytocin Acetate',
    spec: '2mg*10vials',
    price: 42,
    category: 'Cognitive & Neuro',
    purity: '99.4%',
    casNumber: '50-56-6',
    sequence: 'Cys-Tyr-Ile-Gln-Asn-Cys-Pro-Leu-Gly-NH2',
    molecularWeight: '1007.2 g/mol',
    description: 'Nonapeptide neurohypophysial hormone mediating social cognition and bonding receptors in animal models.',
    appearance: 'White lyophilized powder',
    storage: 'Store at -20°C',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },

  // Hexarelin
  {
    id: 'prod-hex-2',
    sku: 'HEX2',
    name: 'Hexarelin (Examorelin)',
    spec: '2mg*10vials',
    price: 46,
    category: 'Growth Hormone & Longevity',
    purity: '99.2%',
    casNumber: '140703-51-1',
    sequence: 'His-D-2-Me-Trp-Ala-Trp-D-Phe-Lys-NH2',
    molecularWeight: '887.0 g/mol',
    description: 'Hexapeptide growth hormone secretagogue receptor agonist with demonstrated cardioprotective signaling properties.',
    appearance: 'White lyophilized powder',
    storage: 'Store at -20°C',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },

  // Sermorelin
  {
    id: 'prod-ser-2',
    sku: 'SER2',
    name: 'Sermorelin (GRF 1-29)',
    spec: '2mg*10vials',
    price: 45,
    category: 'Growth Hormone & Longevity',
    purity: '99.3%',
    casNumber: '86168-78-7',
    molecularWeight: '3357.9 g/mol',
    description: 'Truncated 29-amino acid synthetic analogue of human growth hormone releasing hormone.',
    appearance: 'White lyophilized powder',
    storage: 'Store at -20°C',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },
  {
    id: 'prod-ser-5',
    sku: 'SER5',
    name: 'Sermorelin (GRF 1-29)',
    spec: '5mg*10vials',
    price: 76,
    category: 'Growth Hormone & Longevity',
    purity: '99.5%',
    casNumber: '86168-78-7',
    molecularWeight: '3357.9 g/mol',
    description: '5mg research kit for endogenous pituitary pulsatility research.',
    appearance: 'White lyophilized powder',
    storage: 'Store at -20°C',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  },

  // LL-37 (Antimicrobial)
  {
    id: 'prod-ll-37',
    sku: 'LL37',
    name: 'LL-37 (Cathelicidin Fragment)',
    spec: '1mg*5vials',
    price: 115,
    category: 'Recovery & Repair',
    purity: '98.8%',
    casNumber: '154947-66-7',
    molecularWeight: '4493.3 g/mol',
    description: 'Human cathelicidin derived antimicrobial peptide with broad spectrum membrane pore forming activity.',
    appearance: 'Sterile white powder',
    storage: 'Store at -20°C',
    inStock: true,
    leadTime: 'Ships in 3-5 days'
  },

  // KPV
  {
    id: 'prod-kpv-5',
    sku: 'KPV5',
    name: 'KPV (alpha-MSH 11-13)',
    spec: '5mg*10vials',
    price: 58,
    category: 'Recovery & Repair',
    purity: '99.5%',
    casNumber: '67727-97-3',
    sequence: 'Lys-Pro-Val',
    molecularWeight: '383.5 g/mol',
    description: 'C-terminal tripeptide fragment of alpha-MSH possessing potent anti-inflammatory properties without melanogenesis.',
    appearance: 'White lyophilized powder',
    storage: 'Store at -20°C',
    inStock: true,
    leadTime: 'Immediate (Ships in 24h)'
  }
];

// Helper to group products by base name
export const getGroupedProducts = (): ProductGroup[] => {
  const map = new Map<string, Product[]>();
  PRODUCTS_DATA.forEach(p => {
    // Group key is product name stripped of parenthesis details
    const groupName = p.name.split('(')[0].trim();
    if (!map.has(groupName)) {
      map.set(groupName, []);
    }
    map.get(groupName)!.push(p);
  });

  const groups: ProductGroup[] = [];
  map.forEach((variants, name) => {
    groups.push({
      name,
      category: variants[0].category,
      description: variants[0].description,
      variants
    });
  });

  return groups;
};

export const PRODUCT_CATEGORIES = [
  'All Categories',
  'Weight Management',
  'Recovery & Repair',
  'Growth Hormone & Longevity',
  'Cosmetic & Peptides',
  'Cognitive & Neuro',
  'Cellular Research'
] as const;

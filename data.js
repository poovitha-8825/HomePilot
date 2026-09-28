// HousePoint Data Store - Authentic Indian Real Estate & Banking Datasets

export const CITIES = [
  { id: 'bengaluru', name: 'Bengaluru', areas: ['Whitefield', 'Sarjapur Road', 'Electronic City', 'Indiranagar', 'HSR Layout'] },
  { id: 'chennai', name: 'Chennai', areas: ['OMR', 'Velachery', 'Anna Nagar', 'Perumbakkam', 'ECR'] },
  { id: 'hyderabad', name: 'Hyderabad', areas: ['Gachibowli', 'Hitec City', 'Kondapur', 'Tellapur', 'Madhapur'] },
  { id: 'mumbai', name: 'Mumbai MMR', areas: ['Thane West', 'Andheri West', 'Kandivali', 'Bandra', 'Powai'] },
  { id: 'delhincr', name: 'Delhi NCR', areas: ['Noida Sector 150', 'Gurugram Golf Course Extn', 'Dwarka Expressway', 'Greater Noida West'] }
];

export const PROPERTIES = [
  {
    id: 'prop-1',
    title: 'Prestige Serenity Greens',
    type: '3 BHK Luxury Apartment',
    category: 'apartment',
    bhk: 3,
    city: 'bengaluru',
    location: 'Whitefield, Bengaluru',
    address: 'Channasandra Main Rd, near Hope Farm Junction, Whitefield, Bengaluru, Karnataka 560067',
    price: 8500000,
    priceFormatted: '₹85.0 Lakhs',
    carpetArea: '1,420 sq.ft',
    superArea: '1,845 sq.ft',
    floor: '7th of 18 Floors',
    facing: 'East Facing (Vaastu Compliant)',
    possession: 'Ready to Move',
    reraId: 'PRM/KA/RERA/1251/446/PR/190524/002580',
    builder: 'Prestige Group (A+ Rated)',
    rating: 4.8,
    reviewsCount: 142,
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-interior-living-room-41525-large.mp4',
    videoBadge: '45s 4K Video Tour',
    costBreakdown: {
      basePrice: 8500000,
      stampDuty: 425000, // 5% Karnataka
      registration: 85000, // 1%
      gst: 0, // Ready to move has nil GST
      maintenanceAdvance: 120000,
      corpusFund: 100000,
      totalOnRoad: 9230000
    },
    approvedBanks: ['SBI', 'HDFC', 'ICICI', 'Bank of Baroda', 'Kotak'],
    verificationStatus: {
      legalVerified: true,
      technicalVerified: true,
      lawyerFirm: 'Khaitan & Co Legal Auditors',
      valuerReport: 'Valuation passed at ₹6,150/sq.ft carpet area',
      statusText: '100% Pre-Verified for Fast Sanction (48h)'
    },
    documents: [
      {
        id: 'doc-mother-deed',
        name: '30-Year Mother Deed (Parent Title Deed)',
        code: 'MD-30',
        available: true,
        type: 'legal',
        fileSize: '4.8 MB PDF',
        explanation: 'Traces unbroken ownership history of the land for the last 30 years from original agricultural grant to current builder.',
        whyNeeded: 'Banks check this to ensure no past family heirs or claimants can challenge your house purchase in court.'
      },
      {
        id: 'doc-ec',
        name: 'Encumbrance Certificate (EC Form 15)',
        code: 'EC-15',
        available: true,
        type: 'legal',
        fileSize: '2.1 MB PDF',
        explanation: 'Official Sub-Registrar record certifying that this property is free of existing bank mortgages, court attachments, or legal claims.',
        whyNeeded: 'Mandatory proof for every bank in India showing the flat is not already pledged elsewhere.'
      },
      {
        id: 'doc-sanction-plan',
        name: 'BBMP Approved Building Plan & NOCs',
        code: 'BBMP-SANCTION',
        available: true,
        type: 'technical',
        fileSize: '8.4 MB PDF',
        explanation: 'Architectural blueprint approved by the municipal planning corporation, with Fire, Airport Authority & Pollution Control NOCs.',
        whyNeeded: 'Guarantees the building was constructed legally according to sanctioned setbacks without deviations.'
      },
      {
        id: 'doc-khata',
        name: 'e-Khata Certificate & Tax Extract',
        code: 'KHATA-A',
        available: true,
        type: 'revenue',
        fileSize: '1.2 MB PDF',
        explanation: 'BBMP A-Khata document certifying the property is registered in the municipal assessment book and eligible for construction/trading.',
        whyNeeded: 'Required for water/electricity connections and for obtaining a home loan in Karnataka.'
      },
      {
        id: 'doc-tax-receipt',
        name: 'Latest Property Tax Paid Receipt (FY 2025-26)',
        code: 'TAX-RCPT',
        available: true,
        type: 'revenue',
        fileSize: '650 KB PDF',
        explanation: 'Shows up-to-date property municipal tax has been cleared by the seller/builder with zero dues pending.',
        whyNeeded: 'Banks do not disburse funds until all local tax arrears are confirmed zero.'
      },
      {
        id: 'doc-rera',
        name: 'RERA Project Registration Certificate',
        code: 'RERA-CERT',
        available: true,
        type: 'regulatory',
        fileSize: '1.8 MB PDF',
        explanation: 'State Real Estate Regulatory Authority certificate ensuring builder compliance, escrow fund safety, and strict timely delivery norms.',
        whyNeeded: 'Protects buyers from project delays and gives legal recourse under Indian RERA Act 2016.'
      }
    ]
  },
  {
    id: 'prop-2',
    title: 'Godrej Palm Grove',
    type: '2 BHK Premium Smart Home',
    category: 'apartment',
    bhk: 2,
    city: 'chennai',
    location: 'OMR, Chennai',
    address: 'Near Sholinganallur Junction, Rajiv Gandhi Salai (OMR), Chennai, Tamil Nadu 600119',
    price: 5800000,
    priceFormatted: '₹58.0 Lakhs',
    carpetArea: '980 sq.ft',
    superArea: '1,240 sq.ft',
    floor: '4th of 14 Floors',
    facing: 'North Facing',
    possession: 'Ready in 3 Months',
    reraId: 'TN/01/Building/0192/2021',
    builder: 'Godrej Properties Ltd',
    rating: 4.7,
    reviewsCount: 98,
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-interior-living-room-41525-large.mp4',
    videoBadge: '30s HD Virtual Walk',
    costBreakdown: {
      basePrice: 5800000,
      stampDuty: 406000, // 7% TN
      registration: 232000, // 4% TN
      gst: 290000, // 5% Under construction
      maintenanceAdvance: 80000,
      corpusFund: 75000,
      totalOnRoad: 6883000
    },
    approvedBanks: ['SBI', 'HDFC', 'ICICI', 'Axis'],
    verificationStatus: {
      legalVerified: true,
      technicalVerified: true,
      lawyerFirm: 'T.S. Ramanathan Legal Chambers, Madras High Court',
      valuerReport: 'Approved at ₹5,920/sq.ft',
      statusText: 'CMDA & RERA Approved with clear Patta'
    },
    documents: [
      {
        id: 'doc-patta',
        name: 'Patta & Chitta Extract (e-District TN)',
        code: 'PATTA-TN',
        available: true,
        type: 'revenue',
        fileSize: '1.4 MB PDF',
        explanation: 'Official land revenue record maintained by the Tahsildar showing valid ownership and clear classification of land.',
        whyNeeded: 'In Tamil Nadu, banks will not process home loans without online Patta verification.'
      },
      {
        id: 'doc-ec-tn',
        name: 'Online Encumbrance Certificate (Villangam)',
        code: 'TN-EC',
        available: true,
        type: 'legal',
        fileSize: '3.0 MB PDF',
        explanation: 'TNREGINS Inspector General of Registration certified 31-year non-encumbrance certificate.',
        whyNeeded: 'Proves title is clean with zero court disputes or prior unpaid loans.'
      },
      {
        id: 'doc-cmda-plan',
        name: 'CMDA Planning Permit & Building Sanction',
        code: 'CMDA-PERMIT',
        available: true,
        type: 'technical',
        fileSize: '5.2 MB PDF',
        explanation: 'Chennai Metropolitan Development Authority approved layout and multi-storey permit.',
        whyNeeded: 'Protects from unauthorized floor demolition or sealings by municipal body.'
      }
    ]
  },
  {
    id: 'prop-3',
    title: 'Aparna CyberHeights Gated Villa',
    type: '4 BHK Independent Villa',
    category: 'villa',
    bhk: 4,
    city: 'hyderabad',
    location: 'Gachibowli, Hyderabad',
    address: 'Near Financial District, Nanakramguda / Gachibowli, Hyderabad, Telangana 500032',
    price: 24500000,
    priceFormatted: '₹2.45 Crores',
    carpetArea: '3,200 sq.ft',
    superArea: '3,850 sq.ft',
    floor: 'G+2 Floors with Private Terrace',
    facing: 'North-East (Pooja Vaastu)',
    possession: 'Ready to Move',
    reraId: 'P02400003211',
    builder: 'Aparna Constructions & Estates',
    rating: 4.9,
    reviewsCount: 88,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-interior-living-room-41525-large.mp4',
    videoBadge: '60s 4K Villa Drone Tour',
    costBreakdown: {
      basePrice: 24500000,
      stampDuty: 1470000, // 6% Telangana
      registration: 245000, // 1%
      gst: 0,
      maintenanceAdvance: 300000,
      corpusFund: 250000,
      totalOnRoad: 26765000
    },
    approvedBanks: ['SBI', 'HDFC', 'ICICI', 'Kotak', 'Bank of Baroda'],
    verificationStatus: {
      legalVerified: true,
      technicalVerified: true,
      lawyerFirm: 'Andhra High Court Empaneled Counsel',
      valuerReport: 'Valuation passed at ₹2.40 Cr market benchmark',
      statusText: 'HMDA Approved Gated Villa with OC'
    },
    documents: [
      {
        id: 'doc-hmda',
        name: 'HMDA Layout Final Sanction & Occupancy Certificate',
        code: 'HMDA-OC',
        available: true,
        type: 'technical',
        fileSize: '6.7 MB PDF',
        explanation: 'Hyderabad Metropolitan Development Authority final Occupancy Certificate confirming villa is 100% compliant with civic norms.',
        whyNeeded: 'Occupancy Certificate (OC) proves the building is certified fit for human habitation.'
      },
      {
        id: 'doc-dharani',
        name: 'Dharani Portal Title Mutation Register',
        code: 'DHARANI-MUT',
        available: true,
        type: 'revenue',
        fileSize: '1.9 MB PDF',
        explanation: 'Telangana digital land registry extract guaranteeing clear freehold title with passbook.',
        whyNeeded: 'Indisputable proof of undisputed title ownership under Telangana law.'
      }
    ]
  },
  {
    id: 'prop-4',
    title: 'Lodha Crown Jewel',
    type: '2 BHK Scenic Deck Residence',
    category: 'apartment',
    bhk: 2,
    city: 'mumbai',
    location: 'Thane West, Mumbai MMR',
    address: 'Kolshet Road, Thane West, Mumbai Metropolitan Region, Maharashtra 400607',
    price: 11500000,
    priceFormatted: '₹1.15 Crores',
    carpetArea: '760 sq.ft',
    superArea: '1,050 sq.ft',
    floor: '19th of 35 Floors',
    facing: 'West Facing (Yeoor Hills View)',
    possession: 'Ready to Move',
    reraId: 'P51700021448',
    builder: 'Lodha Group (Macrotech Developers)',
    rating: 4.8,
    reviewsCount: 215,
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-interior-living-room-41525-large.mp4',
    videoBadge: '40s Skydeck Video Reel',
    costBreakdown: {
      basePrice: 11500000,
      stampDuty: 690000, // 6% (5% + 1% local body)
      registration: 30000, // Capped in MH
      gst: 0,
      maintenanceAdvance: 150000,
      corpusFund: 100000,
      totalOnRoad: 12470000
    },
    approvedBanks: ['SBI', 'HDFC', 'ICICI', 'Kotak', 'Axis', 'Bank of Baroda'],
    verificationStatus: {
      legalVerified: true,
      technicalVerified: true,
      lawyerFirm: 'Dua Associates Mumbai',
      valuerReport: 'Valuation passed at ₹15,100/sq.ft',
      statusText: 'TMC & MahaRERA Certified with Full OC'
    },
    documents: [
      {
        id: 'doc-maharera',
        name: 'MahaRERA Registration & Escrow Certificate',
        code: 'MAHARERA-CERT',
        available: true,
        type: 'regulatory',
        fileSize: '2.5 MB PDF',
        explanation: 'Certified project registration on MahaRERA portal showing clean quarterly compliance filings and zero litigation.',
        whyNeeded: 'Standard compliance requirement for all Mumbai & Thane property loans.'
      },
      {
        id: 'doc-society-noc',
        name: 'Co-operative Housing Society NOC & Share Certificate',
        code: 'CHS-NOC',
        available: true,
        type: 'society',
        fileSize: '1.1 MB PDF',
        explanation: 'No Objection Certificate from the housing society confirming seller has cleared all maintenance and transfer dues.',
        whyNeeded: 'Bank creates a mortgage lien on the CHS share certificate.'
      }
    ]
  }
];

export const INDIAN_BANKS = [
  {
    id: 'sbi',
    name: 'State Bank of India',
    shortName: 'SBI',
    logoText: 'SBI',
    badge: 'Lowest Interest Rate',
    badgeColor: 'emerald',
    schemeName: 'SBI Regular Home Loan (EBLR Linked)',
    baseRate: 8.40,
    rateRange: '8.40% - 8.65%',
    maxTenureYears: 30,
    maxLtvRatio: 0.80, // Up to 80% of property cost
    processingFee: '₹0 (Festive Waiver)',
    processingFeeRaw: 0,
    sanctionSla: '4 - 6 Working Days',
    specialFeatures: [
      'No prepayment or foreclosure penalty ever',
      'Lowest interest rates tied to RBI Repo Rate',
      'Overdraft facility option (SBI Maxgain)',
      'Subsidies under PMAY if eligible'
    ],
    highlight: 'Recommended for maximum long-term interest savings and public sector trust.'
  },
  {
    id: 'hdfc',
    name: 'HDFC Bank',
    shortName: 'HDFC',
    logoText: 'HDFC',
    badge: 'Fastest 48h Sanction',
    badgeColor: 'blue',
    schemeName: 'HDFC Reach & Standard Home Loan',
    baseRate: 8.55,
    rateRange: '8.55% - 8.80%',
    maxTenureYears: 30,
    maxLtvRatio: 0.80,
    processingFee: '₹3,000 + GST',
    processingFeeRaw: 3540,
    sanctionSla: '48 - 72 Hours (Express)',
    specialFeatures: [
      'Fastest digital document processing',
      'Doorstep loan specialist visit',
      'Custom step-up repayment facility for young professionals',
      'Dedicated relationship manager for disbursement'
    ],
    highlight: 'Best if you need rapid loan sanction within 48-72 hours.'
  },
  {
    id: 'icici',
    name: 'ICICI Bank',
    shortName: 'ICICI',
    logoText: 'ICICI',
    badge: 'Highest Loan Eligibility',
    badgeColor: 'amber',
    schemeName: 'ICICI Extra Home Loan',
    baseRate: 8.60,
    rateRange: '8.60% - 8.90%',
    maxTenureYears: 30,
    maxLtvRatio: 0.85, // Higher LTV
    processingFee: '0.25% or ₹5,000 min',
    processingFeeRaw: 5000,
    sanctionSla: '3 - 5 Working Days',
    specialFeatures: [
      'Allows adding co-applicant income (parents/spouse) to boost loan eligibility by up to 30%',
      'Pre-approved instant top-up facility',
      'Instant digital sanction letter on WhatsApp'
    ],
    highlight: 'Ideal if you need higher loan amount or want to pool spouse/parent income.'
  },
  {
    id: 'bob',
    name: 'Bank of Baroda',
    shortName: 'BOB',
    logoText: 'BOB',
    badge: 'Zero Prepayment Fee',
    badgeColor: 'teal',
    schemeName: 'Baroda Home Loan (BRLLR Linked)',
    baseRate: 8.45,
    rateRange: '8.45% - 8.75%',
    maxTenureYears: 30,
    maxLtvRatio: 0.80,
    processingFee: '₹2,500 Flat',
    processingFeeRaw: 2500,
    sanctionSla: '5 - 7 Working Days',
    specialFeatures: [
      'Very competitive public sector interest rates',
      'Free accident insurance up to loan amount',
      'Concession of 0.05% for women borrowers'
    ],
    highlight: 'Great alternative PSU bank with special concessions for women applicants.'
  },
  {
    id: 'kotak',
    name: 'Kotak Mahindra Bank',
    shortName: 'Kotak',
    logoText: 'KOTAK',
    badge: 'Paperless Digital Flow',
    badgeColor: 'indigo',
    schemeName: 'Kotak Digi-Home Loan',
    baseRate: 8.65,
    rateRange: '8.65% - 8.95%',
    maxTenureYears: 25,
    maxLtvRatio: 0.80,
    processingFee: '₹4,999 + GST',
    processingFeeRaw: 5899,
    sanctionSla: '3 Working Days',
    specialFeatures: [
      '100% digital KYC and statement upload via Account Aggregator',
      'Transparent tracking on mobile app',
      'Zero branch visits needed until final agreement signing'
    ],
    highlight: 'Fastest paperless experience with seamless Account Aggregator bank statement integration.'
  }
];

export const BANK_DOCUMENT_CHECKLISTS = {
  sbi: {
    buyerDocs: [
      { id: 'pan', name: 'PAN Card (Permanent Account Number)', required: true, status: 'verified', authority: 'Income Tax Dept' },
      { id: 'aadhaar', name: 'Aadhaar Card (DigiLocker Verified)', required: true, status: 'verified', authority: 'UIDAI' },
      { id: 'photos', name: '3 Passport Size Photographs', required: true, status: 'verified', authority: 'Self' },
      { id: 'cibil_consent', name: 'CIBIL Credit Score Authorization Form', required: true, status: 'verified', authority: 'TransUnion CIBIL' }
    ],
    incomeDocs: [
      { id: 'salary_slips', name: 'Last 3 Months Salary Slips (with employer seal)', required: true, status: 'verified', authority: 'Employer HR' },
      { id: 'form_16', name: 'Form 16 (Part A & Part B for last 2 Assessment Years)', required: true, status: 'missing', authority: 'Employer' },
      { id: 'bank_statements', name: 'Last 6 Months Salary Account Bank Statement', required: true, status: 'verified', authority: 'Salary Bank' },
      { id: 'itr_ack', name: 'ITR-V Acknowledgement (Last 2 Years)', required: true, status: 'verified', authority: 'IT Dept Portal' }
    ],
    propertyDocs: [
      { id: 'sale_agreement', name: 'Registered Agreement for Sale / Builder Agreement', required: true, status: 'verified', authority: 'Sub-Registrar' },
      { id: 'mother_deed', name: '30-Year Chain Mother Deed (Parent Title Documents)', required: true, status: 'verified', authority: 'Sub-Registrar' },
      { id: 'ec_form_15', name: 'Encumbrance Certificate (Form 15 for 30 Years)', required: true, status: 'verified', authority: 'Sub-Registrar' },
      { id: 'sanction_plan', name: 'Approved Building Plan & Commencement Certificate', required: true, status: 'verified', authority: 'BBMP / Municipal Corp' },
      { id: 'khata_extract', name: 'Khata Certificate & Tax Paid Receipts for current FY', required: true, status: 'verified', authority: 'Municipal Revenue' }
    ],
    sellerDocs: [
      { id: 'seller_pan', name: 'Seller / Builder PAN Card & Identity Proof', required: true, status: 'verified', authority: 'Seller / Builder' },
      { id: 'society_noc', name: 'No Objection Certificate (NOC) from Society/Builder', required: true, status: 'missing', authority: 'Apartment Association / Builder' },
      { id: 'allotment_letter', name: 'Original Allotment Letter & Payment Receipts', required: true, status: 'verified', authority: 'Builder' }
    ],
    additionalDocs: [
      { id: 'margin_money_proof', name: 'Own Contribution (Margin Money) Bank Balance Proof', required: true, status: 'verified', authority: 'Savings Bank' },
      { id: 'processing_cheque', name: 'Processing Fee Payment Receipt / Cheque', required: true, status: 'verified', authority: 'Applicant' }
    ]
  }
};

export const MISSING_DOC_GUIDE = {
  'form_16': {
    title: 'Form 16 (Part A & B for Last 2 Years)',
    badge: 'Mandatory Income Document',
    whatIsIt: 'Form 16 is a certificate issued by your employer under Section 203 of the Income Tax Act. It specifies your gross salary, perquisites, tax deductions under 80C/80D, and the exact TDS deposited by the company to the government.',
    whyBankNeedsIt: 'Banks require Form 16 to verify that your salary is officially declared, taxes are deposited, and to compute your disposable take-home income for loan eligibility.',
    whoProvidesIt: 'Your Current & Previous Employers (Finance / Payroll / HR Department).',
    whereToGetIt: '1. Download from your company HRMS / Payroll portal (Darwinbox, Keka, ZingHR, Workday, etc.).\n2. Alternatively, download your AIS / 26AS directly from the official Income Tax e-Filing portal (eportal.incometax.gov.in) using your PAN and Net Banking login.\n3. Request your company accounts team to regenerate signed Form 16 Part A & B.',
    howToObtainSteps: [
      'Log into your employer payroll portal or email hr-payroll@yourcompany.com with subject "Urgent: Form 16 Part A & B for Home Loan".',
      'If you switched jobs in the last 2 years, reach out to your previous employer HR with your employee ID and PAN to receive the second Form 16.',
      'Log into incometax.gov.in → e-File → Income Tax Returns → View Form 26AS / Annual Information Statement (AIS) to download supporting proof if employer response is delayed.'
    ]
  },
  'society_noc': {
    title: 'Society / Builder No Objection Certificate (NOC)',
    badge: 'Mandatory Seller/Legal Document',
    whatIsIt: 'A formal letter issued on the official letterhead of the Apartment Owners Association (AOA) or Builder stating that the seller has zero maintenance dues, no illegal structural alterations, and the society has no objection to the bank creating an equitable mortgage.',
    whyBankNeedsIt: 'Protects the bank and buyer from unexpected maintenance liabilities, illegal encroachments, and ensures your membership can be transferred upon registration.',
    whoProvidesIt: 'Society Secretary / President or Builder Customer Care Office.',
    whereToGetIt: 'Collect directly from the registered office of the apartment society or builder helpdesk.',
    howToObtainSteps: [
      'Ask the seller or builder CRM to provide the society standard NOC format (SBI, HDFC and ICICI have their specific bank tripartite NOC formats).',
      'Ensure seller clears all pending maintenance dues, water bills, and clubhouse charges up to current month.',
      'Submit the bank-prescribed draft to the Society Management Committee for sign and seal (takes 24-48 hours).'
    ]
  },
  'ec_form_15': {
    title: 'Encumbrance Certificate (EC Form 15 for 30 Years)',
    badge: 'Critical Legal Title Document',
    whatIsIt: 'Encumbrance Certificate (Villangam / भारमुक्त प्रमाण-पत्र) lists all registered financial and sale transactions involving this land/flat for the requested historical period (15 to 30 years). Form 15 shows all recorded entries; Form 16 is a Nil Encumbrance Certificate.',
    whyBankNeedsIt: 'Guarantees the seller has not secretly taken a private mortgage or pledged the house to any other commercial bank or NBFC.',
    whoProvidesIt: 'Sub-Registrar Office (Dept of Registration & Stamps).',
    whereToGetIt: 'Available 100% online through state revenue portals:\n- Karnataka: Kaveri 2.0 Portal (kaveri.karnataka.gov.in)\n- Tamil Nadu: TNREGINS Portal (tnregins.gov.in)\n- Telangana: Dharani Portal\n- Maharashtra: IGR Maharashtra / e-Search',
    howToObtainSteps: [
      'Register on your state portal with mobile OTP.',
      'Enter Property District, Sub-Registrar Office, Survey Number / Flat Number, and Period (e.g. 01-Jan-1994 to current date).',
      'Pay official govt fee (₹100 to ₹300 via UPI/Netbanking) and download digitally signed PDF within 2 hours to 2 working days.'
    ]
  }
};

export const LOAN_STAGES = [
  {
    stageNumber: 1,
    id: 'stage_submitted',
    title: 'Application Submitted',
    status: 'completed',
    completedDate: '01 Sep 2026, 11:30 AM',
    responsiblePerson: {
      name: 'Priya Nair',
      role: 'Home Loan Relationship Manager',
      company: 'State Bank of India (RACPC Indiranagar)',
      phone: '+91 98450 12345',
      email: 'priya.nair@sbi.co.in'
    },
    whatIsHappening: 'Your online application and preliminary KYC details have been logged in the SBI Core Banking system under Application ID #SBI-HL-2026-8891.',
    durationText: 'Completed in 2 hours',
    userNextAction: 'None - KYC matched automatically with Aadhaar DigiLocker.',
    isDelayed: false
  },
  {
    stageNumber: 2,
    id: 'stage_doc_verification',
    title: 'Document Verification',
    status: 'completed',
    completedDate: '03 Sep 2026, 04:15 PM',
    responsiblePerson: {
      name: 'K. Venkatesh',
      role: 'Senior Document Scrutiny Officer',
      company: 'SBI Central Processing Hub',
      phone: '+91 98452 67890',
      email: 'cpc.docs@sbi.co.in'
    },
    whatIsHappening: 'All personal identification, 6-month bank statements, and salary slips have been audited and verified against income tax database.',
    durationText: 'Completed in 2 days',
    userNextAction: 'Completed successfully.',
    isDelayed: false
  },
  {
    stageNumber: 3,
    id: 'stage_credit_check',
    title: 'Credit & Income Check',
    status: 'completed',
    completedDate: '05 Sep 2026, 02:00 PM',
    responsiblePerson: {
      name: 'Amitabh Sen',
      role: 'Credit Risk Underwriter',
      company: 'SBI Retail Assets Division',
      phone: '+91 94480 33445',
      email: 'credit.underwriting@sbi.co.in'
    },
    whatIsHappening: 'CIBIL score of 788 confirmed with 0 missed payments. FOIR (Fixed Obligation to Income Ratio) computed at 34%, well inside the 50% safety ceiling.',
    durationText: 'Completed in 2 days',
    userNextAction: 'Income eligibility approved for up to ₹68,00,000.',
    isDelayed: false
  },
  {
    stageNumber: 4,
    id: 'stage_legal_verification',
    title: 'Legal Title Verification',
    status: 'completed',
    completedDate: '07 Sep 2026, 06:45 PM',
    responsiblePerson: {
      name: 'Advocate S. Narayanan',
      role: 'Senior Empaneled High Court Advocate',
      company: 'Trilegal Associates (SBI Panel Counsel)',
      phone: '+91 98801 77223',
      email: 'narayanan.advocate@trilegal.com'
    },
    whatIsHappening: '30-year chain title search conducted at Sub-Registrar Office. No litigation, mortgages, or heir disputes found. Clean Non-Encumbrance Certificate vetted.',
    durationText: 'Completed in 3 days',
    userNextAction: 'Legal Search Report (TSR) signed and cleared with Grade A rating.',
    isDelayed: false
  },
  {
    stageNumber: 5,
    id: 'stage_property_valuation',
    title: 'Property Valuation & Technical Scrutiny',
    status: 'completed',
    completedDate: '08 Sep 2026, 05:00 PM',
    responsiblePerson: {
      name: 'Er. Rajesh Kumar',
      role: 'Government Approved Registered Valuer',
      company: 'R.K. Engineering Valuations (SBI Panel)',
      phone: '+91 98450 99881',
      email: 'rajesh.valuer@rkvaluations.in'
    },
    whatIsHappening: 'Architectural blueprint matched against actual carpet area (1,420 sq.ft). Technical valuation set at ₹85,00,000 as per prevailing circle rate and builder pricing.',
    durationText: 'Completed in 1 day',
    userNextAction: 'Technical Valuation Report submitted to Branch Credit Desk.',
    isDelayed: false
  },
  {
    stageNumber: 6,
    id: 'stage_property_visit',
    title: 'Property Physical Visit & Inspection',
    status: 'active', // Active stage!
    completedDate: null,
    responsiblePerson: {
      name: 'Er. Rajesh Kumar & Inspector Sunil Verma',
      role: 'Field Verification Officer & Valuer',
      company: 'SBI Field Verification Agency',
      phone: '+91 98450 99881',
      email: 'rajesh.valuer@rkvaluations.in'
    },
    scheduledDate: '10 Sep 2026',
    scheduledTime: '03:30 PM - 04:30 PM',
    scheduledAddress: 'Flat 702, Tower 3, Prestige Serenity Greens, Whitefield, Bengaluru',
    whatIsHappening: 'Physical site inspection to verify property coordinates, road access, lift operation, occupancy status, and neighborhood boundaries before final credit sign-off.',
    durationText: 'Scheduled Today (Slot: 3:30 PM)',
    userNextAction: 'Ensure apartment key is available and keep duplicate copy of approved building layout ready for the inspecting officer.',
    isDelayed: false,
    needsFeedbackPrompt: true
  },
  {
    stageNumber: 7,
    id: 'stage_loan_decision',
    title: 'Loan Decision Committee',
    status: 'pending',
    completedDate: null,
    responsiblePerson: {
      name: 'Suresh Chandra Sharma',
      role: 'Assistant General Manager (AGM) Credit',
      company: 'SBI Retail Assets Central Processing Centre',
      phone: '+91 080 2558 9000',
      email: 'agm.racpc.blr@sbi.co.in'
    },
    whatIsHappening: 'Final synthesis of Legal, Technical, and Credit reports by the Branch Credit Sanctioning Committee.',
    durationText: 'Expected: Within 24 hours after site inspection',
    userNextAction: 'Awaiting committee sign-off.',
    isDelayed: false
  },
  {
    stageNumber: 8,
    id: 'stage_sanction',
    title: 'Formal Sanction Letter Issuance',
    status: 'pending',
    completedDate: null,
    responsiblePerson: {
      name: 'Priya Nair',
      role: 'Relationship Manager',
      company: 'SBI Indiranagar RACPC',
      phone: '+91 98450 12345',
      email: 'priya.nair@sbi.co.in'
    },
    whatIsHappening: 'Generation of legal Sanction Letter detailing sanctioned amount, interest rate (8.40%), EMI, conditions precedent, and validity for 6 months.',
    durationText: 'Expected within 48 hours',
    userNextAction: 'Accept digital sanction letter using Aadhaar e-Sign on HousePoint.',
    isDelayed: false
  },
  {
    stageNumber: 9,
    id: 'stage_agreement',
    title: 'Loan Agreement & MODT Execution',
    status: 'pending',
    completedDate: null,
    responsiblePerson: {
      name: 'Branch Chief Legal Officer',
      company: 'SBI RACPC Office',
      phone: '+91 080 2558 9111',
      email: 'legal.racpc.blr@sbi.co.in'
    },
    whatIsHappening: 'Signing the standard Home Loan Agreement and registration of Memorandum of Deposit of Title Deeds (MODT / Equitable Mortgage) at Sub-Registrar Office.',
    durationText: 'Requires 1 branch visit or doorstep signing',
    userNextAction: 'Deposit original sale deed and mother deed with bank safe custody.',
    isDelayed: false
  },
  {
    stageNumber: 10,
    id: 'stage_disbursement',
    title: 'Final Disbursement to Seller / Builder',
    status: 'pending',
    completedDate: null,
    responsiblePerson: {
      name: 'Disbursement Desk Manager',
      company: 'SBI RACPC Fund Settlement',
      phone: '+91 080 2558 9222',
      email: 'disbursement.sbi@sbi.co.in'
    },
    whatIsHappening: 'Bank releases RTGS payment / Banker Cheque directly to builder/seller escrow account against demand milestone letter.',
    durationText: 'Final milestone',
    userNextAction: 'Collect original possession certificate and loan disbursement receipt.',
    isDelayed: false
  }
];

export const INITIAL_USER_PROFILE = {
  name: 'Karthik Subramanian',
  phone: '+91 98765 43210',
  email: 'karthik.subramanian@gmail.com',
  employment: 'salaried',
  employer: 'Infosys Ltd (IT Services)',
  monthlyIncome: 145000,
  existingEmis: 12500, // Car loan EMI
  savingsAvailable: 2200000,
  cibilScore: 788,
  selectedPropertyId: 'prop-1',
  activeBankId: 'sbi',
  currentStageIndex: 5, // Stage 6: Property Visit
  selectedLanguage: 'en',
  hasActiveLoanApproved: false, // Can toggle to simulate post-approval
  // Post-approval loan profile when simulated
  activeLoanData: {
    loanAccountNo: 'SBI-HL-00918273645',
    sanctionedAmount: 6500000, // ₹65 Lakhs
    interestRate: 8.45,
    monthlyEmi: 56280,
    originalTenureMonths: 240, // 20 years
    emisPaidCount: 18,
    emisRemainingCount: 222,
    principalPaidSoFar: 214500,
    interestPaidSoFar: 798540,
    outstandingBalance: 6285500,
    nextEmiDueDate: '05 Oct 2026',
    estimatedClosureDate: 'September 2046',
    propertyPurchasePrice: 8500000,
    downPaymentPaid: 2000000,
    estimatedCurrentValue: 9520000 // 12% appreciation
  }
};

export const NOTIFICATIONS_DATA = [
  {
    id: 'notif-1',
    category: 'visit',
    type: 'visit_scheduled',
    title: 'Property Inspection Scheduled for Today',
    message: 'Er. Rajesh Kumar from SBI will visit Flat 702 Prestige Serenity Greens at 3:30 PM today.',
    timestamp: 'Today, 09:30 AM',
    unread: true,
    actionType: 'check_visit',
    actionLabel: 'Track Visit'
  },
  {
    id: 'notif-2',
    category: 'documents',
    type: 'missing_doc',
    title: 'Missing Document: Form 16 Needed',
    message: 'SBI Credit Desk requires your Form 16 Part A & B for FY 24-25. Tap to see where and how to obtain it.',
    timestamp: 'Yesterday, 04:10 PM',
    unread: true,
    actionType: 'open_missing_doc',
    actionParam: 'form_16',
    actionLabel: 'How to Obtain'
  },
  {
    id: 'notif-3',
    category: 'status',
    type: 'legal_clearance',
    title: 'Legal Title Verified: Grade A',
    message: 'Advocate S. Narayanan submitted a clean 30-year non-encumbrance title search report with zero issues.',
    timestamp: '07 Sep 2026',
    unread: false,
    actionType: 'view_stage',
    actionParam: 4,
    actionLabel: 'View Report'
  },
  {
    id: 'notif-4',
    category: 'delays',
    type: 'delay_notice',
    title: 'SLA Tracker: All Inspections on Track',
    message: 'Your home loan with SBI is proceeding within the 6-day standard timeline.',
    timestamp: '06 Sep 2026',
    unread: false,
    actionType: 'open_tracker',
    actionLabel: 'Check Timeline'
  },
  {
    id: 'notif-5',
    category: 'emidue',
    type: 'emi_reminder',
    title: 'Auto-Debit Advisory',
    message: 'NACH e-Mandate active for upcoming EMI debits once disbursement is triggered.',
    timestamp: '02 Sep 2026',
    unread: false,
    actionType: 'none',
    actionLabel: null
  }
];

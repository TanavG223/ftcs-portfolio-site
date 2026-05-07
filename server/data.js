const pageTitleMap = {
  1: 'Members logo',
  2: 'FTCS members',
  3: 'Phase 1 divider',
  4: 'Phase 1 workflow',
  5: 'Project folder cover',
  6: 'Unit 4 project folder',
  7: 'Problem statement cover',
  8: 'Problem statement',
  9: 'Competitor analysis cover',
  10: 'Competitor analysis',
  11: 'Group contract cover',
  12: 'Group contract',
  13: 'Team responsibilities',
  14: 'Conflict resolution agreement',
  15: 'Planning schedule',
  16: 'Project Gantt chart',
  17: 'Phase 1 review',
  18: 'Phase 2 divider',
  19: 'Survey research cover',
  20: 'Research question',
  21: 'User survey form',
  22: 'Survey response plan',
  23: 'Competitor products',
  24: 'Competitor comparison',
  25: 'Concept sketches cover',
  26: 'Bottle concept sketch',
  27: 'Phase 2 review',
  28: 'Phase 3 divider',
  29: 'Design matrix criteria',
  30: 'Design matrix',
  31: 'Selected design rationale',
  32: 'Technical design sketches',
  33: 'Sketch annotations',
  34: 'Design feedback notes',
  35: 'Design revision notes',
  36: 'Specification cover',
  37: 'Design specifications',
  38: 'Testing requirements',
  39: 'Manufacturing and cost notes',
  40: 'Phase 3 review',
  41: 'Phase 4 divider',
  42: 'CAD modeling cover',
  43: 'AutoCAD bottle drawing',
  44: 'Bottle front view',
  45: 'Bottle dimensions',
  46: 'Material callouts',
  47: 'Bottle drawing review',
  48: 'Bottle body without cap',
  49: 'Cap interface details',
  50: 'Neck and thread geometry',
  51: 'Prototype revision notes',
  52: 'Model review notes',
  53: 'Final CAD check',
  54: 'Replacement cap design',
  55: 'Phase 4 review',
  56: 'Phase 5 divider',
  57: 'Peer review cover',
  58: 'Peer review form',
  59: 'Peer review strengths',
  60: 'Peer review improvements',
  61: 'Review given to another team',
  62: 'Review response plan',
  63: 'Reflection divider',
  64: 'Project reflection',
  65: 'Phase 1 reflection',
  66: 'Phase 2 reflection',
  67: 'Phase 3 and CAD reflection',
  68: 'Final presentation divider',
  69: 'Presentation practice',
  70: 'Expo readiness',
  71: 'Final presentation checklist'
}

const pageSetMap = {
  1: 'team-cover',
  2: 'team-cover',
  3: 'phase-1',
  4: 'phase-1',
  5: 'phase-1',
  6: 'phase-1',
  7: 'problem-statement',
  8: 'problem-statement',
  9: 'competitor-analysis',
  10: 'competitor-analysis',
  11: 'group-contract',
  12: 'group-contract',
  13: 'group-contract',
  14: 'group-contract',
  15: 'planning',
  16: 'planning',
  17: 'phase-1',
  18: 'phase-2',
  19: 'survey-research',
  20: 'survey-research',
  21: 'survey-research',
  22: 'survey-research',
  23: 'competitor-research',
  24: 'competitor-research',
  25: 'concept-sketches',
  26: 'concept-sketches',
  27: 'phase-2',
  28: 'phase-3',
  29: 'decision-matrix',
  30: 'decision-matrix',
  31: 'decision-matrix',
  32: 'technical-sketches',
  33: 'technical-sketches',
  34: 'design-feedback',
  35: 'design-feedback',
  36: 'design-specifications',
  37: 'design-specifications',
  38: 'design-specifications',
  39: 'design-specifications',
  40: 'phase-3',
  41: 'phase-4',
  42: 'cad-modeling',
  43: 'cad-modeling',
  44: 'cad-modeling',
  45: 'cad-modeling',
  46: 'cad-modeling',
  47: 'cad-modeling',
  48: 'bottle-body',
  49: 'cap-interface',
  50: 'cap-interface',
  51: 'prototype-revisions',
  52: 'prototype-revisions',
  53: 'prototype-revisions',
  54: 'cap-design',
  55: 'phase-4',
  56: 'phase-5',
  57: 'peer-review',
  58: 'peer-review',
  59: 'peer-review',
  60: 'peer-review',
  61: 'peer-review',
  62: 'peer-review',
  63: 'reflection',
  64: 'reflection',
  65: 'reflection',
  66: 'reflection',
  67: 'reflection',
  68: 'final-presentation',
  69: 'final-presentation',
  70: 'final-presentation',
  71: 'final-presentation'
}

const pageSetLabelMap = {
  'team-cover': 'Team identity',
  'phase-1': 'Phase 1',
  'problem-statement': 'Problem statement',
  'competitor-analysis': 'Competitor analysis',
  'group-contract': 'Group contract',
  planning: 'Project planning',
  'phase-2': 'Phase 2',
  'survey-research': 'User research',
  'competitor-research': 'Competitor research',
  'concept-sketches': 'Concept sketches',
  'phase-3': 'Phase 3',
  'decision-matrix': 'Design matrix',
  'technical-sketches': 'Technical sketches',
  'design-feedback': 'Design feedback',
  'design-specifications': 'Design specifications',
  'phase-4': 'Phase 4',
  'cad-modeling': 'CAD modeling',
  'bottle-body': 'Bottle body',
  'cap-interface': 'Cap interface',
  'prototype-revisions': 'Prototype revisions',
  'cap-design': 'Cap design',
  'phase-5': 'Phase 5',
  'peer-review': 'Peer review',
  reflection: 'Reflection',
  'final-presentation': 'Final presentation'
}

function categoryForPage(page) {
  if (page <= 2) return 'cover'
  if ([3, 4, 5, 6, 18, 19, 27, 28, 40, 41, 55, 56, 68, 69, 70, 71].includes(page)) return 'phase'
  if ([7, 8, 9, 10, 20, 21, 22, 23, 24, 29, 30, 36, 37, 38, 39].includes(page)) return 'research'
  if (page >= 11 && page <= 17) return 'planning'
  if (page >= 25 && page <= 35) return 'sketches'
  if (page >= 42 && page <= 54) return 'prototype'
  if (page >= 57 && page <= 62) return 'reviews'
  if (page >= 63 && page <= 67) return 'reflection'
  return 'process'
}

const pages = Array.from({ length: 71 }, (_, index) => {
  const page = index + 1
  const set = pageSetMap[page] || 'portfolio-artifact'
  return {
    page,
    title: pageTitleMap[page] || 'Engineering process artifact',
    category: categoryForPage(page),
    set,
    setLabel: pageSetLabelMap[set] || 'Portfolio artifact',
    full: `/portfolio/full/page-${String(page).padStart(2, '0')}.jpg`,
    thumb: `/portfolio/thumb/page-${String(page).padStart(2, '0')}.jpg`
  }
})

const phases = [
  {
    id: 'phase-1',
    label: 'Phase 1',
    title: 'Define the problem and team rules',
    summary:
      'The team framed the disposable-plastic bottle problem, compared reusable bottle competitors, created a group contract, and assigned clear roles before design work began.',
    artifacts: ['Problem statement', 'Competitor analysis', 'Group contract', 'Gantt chart'],
    pages: [8, 10, 12, 16],
    image: '/portfolio/full/page-08.jpg'
  },
  {
    id: 'phase-2',
    label: 'Phase 2',
    title: 'Research market behavior and early sketches',
    summary:
      'Research focused on user polling, disposable and reusable bottle brands, and early sketch directions for a familiar bottle shape with a lower-waste lifecycle.',
    artifacts: ['Polling form', 'Competitor products', 'Concept sketches'],
    pages: [21, 23, 26],
    image: '/portfolio/full/page-26.jpg'
  },
  {
    id: 'phase-3',
    label: 'Phase 3',
    title: 'Select a design and write specifications',
    summary:
      'The design matrix and technical sketches narrowed the concept into measurable requirements for material, durability, weight, shape, impact, leak resistance, safety, cost, and lifecycle.',
    artifacts: ['Decision matrix', 'Technical sketches', 'Design specifications'],
    pages: [30, 32, 37],
    image: '/portfolio/full/page-37.jpg'
  },
  {
    id: 'phase-4',
    label: 'Phase 4',
    title: 'Model the bottle and cap in AutoCAD',
    summary:
      'AutoCAD drawings defined the reusable bottle body and replacement cap, including dimensional callouts, material notes, and no-cap views for the opening and closure.',
    artifacts: ['Bottle CAD', 'No-cap body', 'Replacement cap'],
    pages: [43, 48, 54],
    image: '/portfolio/featured/autocad-bottle-full.jpg'
  },
  {
    id: 'phase-5',
    label: 'Phase 5',
    title: 'Use peer review to sharpen the pitch',
    summary:
      'Peer feedback confirmed the design was realistic and organized while asking for stronger USP language, deeper competitor/material research, and clearer annotations.',
    artifacts: ['Peer review', 'Strengths', 'Growth areas'],
    pages: [58, 59, 61],
    image: '/portfolio/full/page-58.jpg'
  },
  {
    id: 'phase-6',
    label: 'Phase 6',
    title: 'Prepare for final presentation day',
    summary:
      'The final checklist covered the poster, QR code, portfolio, visuals, team practice, grammar review, and a five-minute presentation run-through.',
    artifacts: ['Expo checklist', 'Poster sections', 'Team preparation'],
    pages: [71],
    image: '/portfolio/full/page-71.jpg'
  }
]

const portfolioData = {
  project: {
    name: 'FTCS',
    title: 'Reusable Bottle, Engineered for Less Waste',
    subtitle:
      'An engineering design project for a recyclable or biodegradable reusable water bottle that keeps the convenience of a disposable bottle while reducing long-term plastic waste.',
    expoDate: 'April 29, 2026',
    portfolioPdf: '/FTCS-Portfolio.pdf',
    logo: '/portfolio/featured/ftcs-logo-team.jpg'
  },
  team: [
    { name: 'Tanav Gosala', role: 'Team Captain / Portfolio Lead' },
    { name: 'Sasvath Raajkumar', role: 'Note Taker' },
    { name: 'Cameron Jones', role: 'Scheduler' },
    { name: 'Fernando Azuaje', role: 'Presentation / Design Support' }
  ],
  stats: [
    { value: '1M+', label: 'plastic water bottles bought every minute worldwide' },
    { value: '70%', label: 'plastic bottles estimated to end up in landfill, oceans, or low-value waste streams' },
    { value: '500', label: 'reuse cycles targeted without structural failure' },
    { value: '<350g', label: 'target weight for a one-liter bottle' }
  ],
  specifications: [
    {
      name: 'Material',
      detail: 'Recyclable or biodegradable, non-toxic, environmentally friendly material.'
    },
    {
      name: 'Durability',
      detail: 'Withstand regular use, avoid leaks or cracks, and maintain integrity after repeated reuse.'
    },
    {
      name: 'Fit',
      detail: 'Around 9-10 inches tall and about 3 inches in diameter to fit common cup holders.'
    },
    {
      name: 'Impact',
      detail: 'Keep production carbon footprint below 0.5kg CO2 per bottle and remain 100% recyclable at end of life.'
    },
    {
      name: 'Leak Proof',
      detail: 'Pass a 24-hour water-tightness test at multiple angles plus drop and handling tests.'
    },
    {
      name: 'Safety',
      detail: 'BPA-free and compliant with FDA food-grade material expectations.'
    }
  ],
  competitors: [
    { name: 'Nalgene', logo: '/competitors/nalgene.png', url: 'https://nalgene.com/' },
    { name: 'Contigo', logo: '/competitors/contigo.png', url: 'https://www.gocontigo.com/' },
    { name: 'CamelBak', logo: '/competitors/camelbak.svg', url: 'https://www.camelbak.com/' },
    { name: 'Owala', logo: '/competitors/owala.svg', url: 'https://owalalife.com/' },
    { name: 'Aquafina', logo: '/competitors/aquafina.svg', url: 'https://www.aquafina.com/' },
    { name: 'Smartwater', logo: '/competitors/smartwater.png', url: 'https://www.drinksmartwater.com/' },
    { name: 'VitaminWater', logo: '/competitors/vitaminwater.png', url: 'https://www.vitaminwater.com/' },
    { name: 'Dasani', logo: '/competitors/dasani.png', url: 'https://www.dasani.com/' }
  ],
  feedback: {
    strengths: [
      'Strong organization and teamwork with little evidence of conflict.',
      'AutoCAD drawings and multiple views were clear and useful.',
      'The eco-friendly nature of the design was the strongest adoption argument.'
    ],
    growth: [
      'Explain the unique selling proposition more specifically.',
      'Add deeper material and competitor research.',
      'Annotate technical sketches so manufacturers understand each view.'
    ],
    reflection:
      'The team recovered from an unfocused Phase 1 by meeting earlier, assigning responsibilities, finishing AutoCAD work ahead of schedule, and using feedback to sharpen the pitch.'
  },
  presentationReadiness: [
    {
      title: 'Target audience',
      items: [
        'Students and everyday bottle users who want disposable-bottle convenience without creating single-use plastic waste.',
        'People who need a one-liter bottle that stays lightweight, fits common cup holders, and can survive daily reuse.'
      ]
    },
    {
      title: 'Validation plan',
      items: [
        'Use the design specifications to check a 24-hour leak test, drop and handling durability, cup-holder fit, BPA-free safety, and repeated-use performance.',
        'Compare the final bottle against reusable competitors and disposable bottles so the unique value is clear during the presentation.'
      ]
    },
    {
      title: 'Feasibility and next steps',
      items: [
        'The CAD work makes the bottle body, no-cap opening, and replacement cap clear enough for prototype planning.',
        'Next work should focus on deeper material research, clearer sketch annotations, and a sharper unique selling proposition.'
      ]
    }
  ],
  assets: {
    heroCad: '/portfolio/featured/autocad-bottle-sketch.jpg',
    noCap: '/portfolio/featured/autocad-bottle-nocap.jpg',
    cap: '/portfolio/featured/autocad-cap.jpg',
    sketch: '/portfolio/featured/hand-sketch.jpg',
    matrix: '/portfolio/featured/design-matrix.jpg'
  },
  phases,
  pages
}

export default portfolioData

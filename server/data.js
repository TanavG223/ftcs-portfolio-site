const pageTitleMap = {
  1: 'Members logo',
  2: 'FTCS members',
  8: 'Problem statement',
  10: 'Competitor analysis',
  16: 'Gantt chart',
  21: 'Polling form link',
  23: 'Competitor products',
  26: 'Concept sketch',
  30: 'Design matrix',
  32: 'Technical sketches',
  34: 'Presentation feedback',
  37: 'Design specifications',
  43: 'AutoCAD bottle drawing',
  48: 'Bottle without cap',
  54: 'Cap redesign',
  58: 'Our peer review',
  61: 'Peer review we provided',
  64: 'Project reflections',
  71: 'Presentation checklist'
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
  return {
    page,
    title: pageTitleMap[page] || `Portfolio page ${page}`,
    category: categoryForPage(page),
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
      'The team framed the plastic bottle waste problem, compared reusable bottle competitors, created a group contract, and set project roles.',
    artifacts: ['Problem statement', 'Competitor analysis', 'Group contract', 'Gantt chart'],
    pages: [8, 10, 12, 16],
    image: '/portfolio/full/page-08.jpg'
  },
  {
    id: 'phase-2',
    label: 'Phase 2',
    title: 'Research market behavior and early sketches',
    summary:
      'Research focused on user polling, existing disposable and reusable brands, and first water bottle sketch directions.',
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
      'AutoCAD drawings defined a reusable bottle body and a replacement cap, including dimensional callouts, material notes, and no-cap views.',
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
      'A student engineering portfolio for a recyclable or biodegradable reusable water bottle designed to keep disposable plastic convenience while reducing long-term environmental harm.',
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
    { value: '1M+', label: 'plastic water bottles bought every minute globally' },
    { value: '70%', label: 'plastic bottles estimated to end up in landfill or the ocean' },
    { value: '500', label: 'reuse cycles targeted without structural failure' },
    { value: '<350g', label: 'target weight for a 1 liter bottle' }
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
    'Nalgene',
    'Contigo',
    'CamelBak',
    'Owala',
    'Aquafina',
    'Smartwater',
    'VitaminWater',
    'Dasani'
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
  assets: {
    heroCad: '/portfolio/featured/autocad-bottle-full.jpg',
    noCap: '/portfolio/featured/autocad-bottle-nocap.jpg',
    cap: '/portfolio/featured/autocad-cap.jpg',
    sketch: '/portfolio/featured/hand-sketch.jpg',
    matrix: '/portfolio/featured/design-matrix.jpg'
  },
  phases,
  pages
}

export default portfolioData

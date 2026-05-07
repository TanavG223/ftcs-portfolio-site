import {
  ArrowRight,
  BadgeCheck,
  Bot,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  GalleryHorizontalEnd,
  Layers3,
  Maximize2,
  Menu,
  MonitorUp,
  MessageSquareText,
  PenTool,
  Route,
  Search,
  Target,
  X,
  ZoomIn
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import portfolioData from '../server/data.js'

const siteBase = import.meta.env.BASE_URL || '/'

function assetPath(value) {
  if (!value || /^(https?:|data:|blob:)/.test(value)) return value
  const clean = value.startsWith('/') ? value.slice(1) : value
  return `${siteBase}${clean}`
}

function normalizePortfolioData(data) {
  return {
    ...data,
    project: {
      ...data.project,
      logo: assetPath(data.project.logo),
      portfolioPdf: assetPath(data.project.portfolioPdf)
    },
    assets: Object.fromEntries(Object.entries(data.assets).map(([key, value]) => [key, assetPath(value)])),
    phases: data.phases.map((phase) => ({
      ...phase,
      image: assetPath(phase.image),
      documents: phase.documents.map((document) => ({
        ...document,
        image: assetPath(document.image)
      }))
    })),
    competitors: data.competitors.map((competitor) =>
      typeof competitor === 'string'
        ? { name: competitor }
        : { ...competitor, logo: assetPath(competitor.logo) }
    ),
    pages: data.pages.map((page) => ({
      ...page,
      full: assetPath(page.full),
      thumb: assetPath(page.thumb)
    }))
  }
}

const routes = [
  { path: '/', label: 'Overview', icon: Target },
  { path: '/research', label: 'Research', icon: Search },
  { path: '/design', label: 'Design', icon: Route },
  { path: '/prototype', label: 'Prototype', icon: Bot },
  { path: '/reviews', label: 'Reviews', icon: MessageSquareText },
  { path: '/presentation', label: 'Present', icon: MonitorUp },
  { path: '/portfolio', label: 'Portfolio', icon: GalleryHorizontalEnd }
]

const galleryFilters = [
  { id: 'all', label: 'All' },
  { id: 'research', label: 'Research' },
  { id: 'planning', label: 'Planning' },
  { id: 'sketches', label: 'Sketches' },
  { id: 'prototype', label: 'Prototype' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'reflection', label: 'Reflection' }
]

const cadSheets = [
  {
    title: 'Full Bottle CAD',
    detail: 'Dimensioned bottle body with material callouts.',
    image: assetPath('/portfolio/featured/autocad-bottle-full.jpg'),
    page: 43
  },
  {
    title: 'No-Cap Bottle View',
    detail: 'Bottle body view for cap replacement planning.',
    image: assetPath('/portfolio/featured/autocad-bottle-nocap.jpg'),
    page: 48
  },
  {
    title: 'Replacement Cap',
    detail: 'Ridged cap concept with side and top views.',
    image: assetPath('/portfolio/featured/autocad-cap.jpg'),
    page: 54
  }
]

function routeFromLocation() {
  const hashPath = window.location.hash.replace(/^#/, '')
  const path = hashPath || '/'
  return routes.some((route) => route.path === path) ? path : '/'
}

function useRoute() {
  const [route, setRoute] = useState(routeFromLocation)

  useEffect(() => {
    function onPopState() {
      setRoute(routeFromLocation())
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    window.addEventListener('hashchange', onPopState)
    return () => window.removeEventListener('hashchange', onPopState)
  }, [])

  function navigate(path) {
    if (path === route) return
    window.location.hash = path
    setRoute(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return [route, navigate]
}

export default function App() {
  const data = useMemo(() => normalizePortfolioData(portfolioData), [])
  const [route, navigate] = useRoute()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [filter, setFilter] = useState('all')
  const [lightboxPages, setLightboxPages] = useState([])
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const visiblePages = useMemo(() => {
    return filter === 'all' ? data.pages : data.pages.filter((page) => page.category === filter)
  }, [data, filter])

  useEffect(() => {
    if (lightboxIndex === null) return

    function onKeyDown(event) {
      if (event.key === 'Escape') setLightboxIndex(null)
      if (event.key === 'ArrowRight') {
        setLightboxIndex((current) => (current === null ? current : (current + 1) % lightboxPages.length))
      }
      if (event.key === 'ArrowLeft') {
        setLightboxIndex((current) =>
          current === null ? current : (current - 1 + lightboxPages.length) % lightboxPages.length
        )
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightboxIndex, lightboxPages.length])

  function openLightbox(pages, index) {
    setLightboxPages(pages)
    setLightboxIndex(index)
  }

  return (
    <div className="app-shell">
      <MotionBackdrop />
      <Sidebar
        route={route}
        navigate={navigate}
        logo={data.project.logo}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <div className="main-shell">
        <TopStatus
          route={route}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
        <main className="page-frame">
          <PageTransition route={route}>
            {route === '/' && <OverviewPage data={data} navigate={navigate} openLightbox={openLightbox} />}
            {route === '/research' && <ResearchPage data={data} navigate={navigate} openLightbox={openLightbox} />}
            {route === '/design' && <DesignPage data={data} openLightbox={openLightbox} />}
            {route === '/prototype' && <PrototypePage data={data} openLightbox={openLightbox} />}
            {route === '/reviews' && <ReviewsPage data={data} navigate={navigate} />}
            {route === '/presentation' && (
              <PresentationPage data={data} navigate={navigate} openLightbox={openLightbox} />
            )}
            {route === '/portfolio' && (
              <PortfolioPage
                data={data}
                filter={filter}
                setFilter={setFilter}
                visiblePages={visiblePages}
                openLightbox={openLightbox}
              />
            )}
          </PageTransition>
        </main>
      </div>
      <Lightbox
        pages={lightboxPages}
        lightboxIndex={lightboxIndex}
        setLightboxIndex={setLightboxIndex}
      />
    </div>
  )
}

function MotionBackdrop() {
  return (
    <div className="motion-backdrop" aria-hidden="true">
      <div className="grid-sweep" />
      <div className="scan-line" />
      <div className="cad-path path-one" />
      <div className="cad-path path-two" />
      <div className="cad-path path-three" />
    </div>
  )
}

function Sidebar({ route, navigate, logo, mobileOpen, setMobileOpen }) {
  return (
    <aside className={mobileOpen ? 'sidebar is-open' : 'sidebar'}>
      <div className="sidebar-brand">
        <img className="team-logo" src={logo} alt="FTCS team logo" />
        <div>
          <strong>Engineering Project</strong>
          <span>Reusable bottle system</span>
        </div>
      </div>
      <nav className="side-nav" aria-label="Main sections">
        {routes.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.path}
              type="button"
              className={route === item.path ? 'is-active' : ''}
              onClick={() => {
                navigate(item.path)
                setMobileOpen(false)
              }}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

function TopStatus({ route, mobileOpen, setMobileOpen }) {
  const current = routes.find((item) => item.path === route) || routes[0]
  return (
    <header className="top-status">
      <button className="icon-button menu-toggle" type="button" aria-label="Toggle menu" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <X size={21} /> : <Menu size={21} />}
      </button>
      <div className="route-readout">
        <span>{current.label}</span>
        <strong>FTCS / {current.label.toLowerCase()}</strong>
      </div>
    </header>
  )
}

function PageTransition({ route, children }) {
  return (
    <div key={route} className="page-transition">
      {children}
    </div>
  )
}

function PageHero({ label, title, text, actions, visual, className = '' }) {
  return (
    <section className={className ? `page-hero ${className}` : 'page-hero'}>
      <div className="page-hero-copy">
        <p className="section-label">{label}</p>
        <h1>{title}</h1>
        <p>{text}</p>
        {actions && <div className="hero-actions">{actions}</div>}
      </div>
      {visual && <div className="page-hero-visual">{visual}</div>}
    </section>
  )
}

function OverviewPage({ data, navigate, openLightbox }) {
  return (
    <div className="page-stack">
      <PageHero
        label="Project Overview"
        title={`${data.project.name}: ${data.project.title}`}
        text={data.project.subtitle}
        actions={
          <>
            <button type="button" className="primary-button" onClick={() => navigate('/prototype')}>
              View Prototype
              <ArrowRight size={18} />
            </button>
            <button type="button" className="secondary-button" onClick={() => navigate('/portfolio')}>
              Open Portfolio
              <GalleryHorizontalEnd size={18} />
            </button>
          </>
        }
        visual={<HeroCadShowcase data={data} openLightbox={openLightbox} />}
      />
      <SpecTicker specs={data.specifications} />
      <section className="metric-grid">
        {data.stats.map((stat) => (
          <article className="metric-card reveal-card" key={stat.value}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </section>
      <section className="route-grid" aria-label="Project sections">
        {routes.slice(1).map((item) => {
          const Icon = item.icon
          return (
            <button key={item.path} type="button" className="route-card reveal-card" onClick={() => navigate(item.path)}>
              <Icon size={24} />
              <strong>{item.label}</strong>
              <span>{routeDescription(item.path)}</span>
              <ArrowRight size={18} />
            </button>
          )
        })}
      </section>
    </div>
  )
}

function HeroCadShowcase({ data, openLightbox }) {
  const cadPages = cadSheets
    .map((sheet) => {
      const source = data.pages.find((page) => page.page === sheet.page)
      return source && {
        ...source,
        title: sheet.title,
        setLabel: 'CAD sheets',
        full: sheet.image,
        thumb: sheet.image
      }
    })
    .filter(Boolean)

  return (
    <div className="hero-cad-showcase">
      <button
        type="button"
        className="cad-sheet-button"
        aria-label="Inspect CAD sketch"
        onClick={() => openLightbox(cadPages, 0)}
      >
        <img src={data.assets.heroCad} alt="AutoCAD drawing of the FTCS bottle" />
        <span className="viewer-action">
          <Maximize2 size={16} />
          Inspect CAD
        </span>
      </button>
      <div className="floating-measure measure-a">PLA / 1mm</div>
      <div className="floating-measure measure-b">Phase 4 prototype</div>
      <div className="floating-measure measure-c">R10 bottle contour</div>
    </div>
  )
}

function routeDescription(path) {
  const map = {
    '/research': 'Problem framing, polling, competitors, and early concept evidence.',
    '/design': 'A six-phase process that moves from criteria to a selected design.',
    '/prototype': 'AutoCAD bottle and cap drawings tied back to measurable specs.',
    '/reviews': 'Peer feedback, team reflection, and final presentation improvements.',
    '/presentation': 'Poster companion, talking flow, and evidence links for the expo.',
    '/portfolio': 'Complete project evidence organized by engineering stage.'
  }
  return map[path]
}

function artifactSet(data, set, overrides = {}) {
  return data.pages
    .filter((page) => page.set === set)
    .map((page) => ({
      ...page,
      ...(overrides[page.page] || {})
    }))
}

function SpecTicker({ specs }) {
  const items = [...specs, ...specs]
  return (
    <div className="spec-ticker" aria-label="Design specification ticker">
      <div className="ticker-track">
        {items.map((spec, index) => (
          <span key={`${spec.name}-${index}`}>
            <BadgeCheck size={16} />
            {spec.name}: {spec.detail}
          </span>
        ))}
      </div>
    </div>
  )
}

function ResearchPage({ data, navigate, openLightbox }) {
  const sketchSource = data.pages.find((page) => page.page === 26)
  const matrixSource = data.pages.find((page) => page.page === 30)
  const competitorSource = data.pages.find((page) => page.page === 23)
  const sketchPages = artifactSet(data, 'concept-sketches', {
    26: {
      full: assetPath('/portfolio/featured/hand-sketch.jpg'),
      thumb: assetPath('/portfolio/featured/hand-sketch.jpg')
    }
  })
  const matrixPages = artifactSet(data, 'decision-matrix', {
    30: {
      full: assetPath('/portfolio/featured/design-matrix.jpg'),
      thumb: assetPath('/portfolio/featured/design-matrix.jpg')
    }
  })
  const competitorPages = artifactSet(data, 'competitor-research')
  const artifactPages = [
    sketchSource && {
      ...sketchSource,
      setLabel: 'Concept sketches',
      full: assetPath('/portfolio/featured/hand-sketch.jpg'),
      thumb: assetPath('/portfolio/featured/hand-sketch.jpg')
    },
    matrixSource && {
      ...matrixSource,
      setLabel: 'Design matrix',
      full: assetPath('/portfolio/featured/design-matrix.jpg'),
      thumb: assetPath('/portfolio/featured/design-matrix.jpg')
    },
    competitorSource
  ].filter(Boolean)

  return (
    <div className="page-stack">
      <PageHero
        label="Research"
        title="Research turned the plastic waste problem into design criteria."
        text="FTCS studied disposable and reusable bottle competitors, gathered user input through polling, and converted that research into early sketches and a decision matrix for the final concept."
        actions={
          <>
            <button type="button" className="primary-button" onClick={() => openLightbox(artifactPages, 0)}>
              Inspect Sketch
              <ZoomIn size={18} />
            </button>
            <button type="button" className="secondary-button" onClick={() => navigate('/design')}>
              Continue to Design
              <ArrowRight size={18} />
            </button>
          </>
        }
        visual={<HeroArtifactPair pages={artifactPages} openLightbox={openLightbox} />}
      />
      <CompetitorBoard competitors={data.competitors} />
      <section className="artifact-grid two-up">
        <ArtifactViewer
          title="Concept Sketch"
          label="Sketch artifact"
          image={assetPath('/portfolio/featured/hand-sketch.jpg')}
          detail="Early bottle sketch exploring overall form, grip, cap placement, and the direction that moved into technical drawings."
          onOpen={() => openLightbox(sketchPages, Math.max(0, sketchPages.findIndex((page) => page.page === 26)))}
          pageCount={sketchPages.length}
        />
        <ArtifactViewer
          title="Design Matrix"
          label="Decision artifact"
          image={assetPath('/portfolio/featured/design-matrix.jpg')}
          detail="Decision matrix comparing bottle concepts against environmental impact, durability, access, lightweight design, and end-of-life disposal."
          onOpen={() => openLightbox(matrixPages, Math.max(0, matrixPages.findIndex((page) => page.page === 30)))}
          pageCount={matrixPages.length}
        />
      </section>
      <section className="research-layout">
        <div className="text-panel">
          <p className="section-label">Competitor Analysis</p>
          <h2>Reusable brands solve durability, but still leave gaps.</h2>
          <p>
            The portfolio compares reusable water bottle companies and disposable bottle leaders.
            FTCS uses that research to focus on sustainable materials, long-term reuse, cost, and a
            design that still feels familiar to everyday users.
          </p>
        </div>
        <ArtifactViewer
          title="Competitor Products"
          label="Research artifact"
          image={assetPath('/portfolio/full/page-23.jpg')}
          detail="Research artifact comparing familiar disposable and reusable bottle products before the FTCS design was selected."
          onOpen={() => openLightbox(competitorPages, 0)}
          pageCount={competitorPages.length}
          compact
        />
      </section>
    </div>
  )
}

function HeroArtifactPair({ pages, openLightbox }) {
  const cards = [
    { title: 'Concept Sketch', image: assetPath('/portfolio/featured/hand-sketch.jpg'), pageIndex: 0, icon: PenTool },
    { title: 'Design Matrix', image: assetPath('/portfolio/featured/design-matrix.jpg'), pageIndex: 1, icon: Layers3 }
  ]

  return (
    <div className="hero-artifact-pair">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <button
            type="button"
            key={card.title}
            className="hero-artifact-card"
            style={{ '--tilt': index === 0 ? '-1.2deg' : '1.1deg' }}
            onClick={() => openLightbox(pages, card.pageIndex)}
          >
            <div className="hero-artifact-card-top">
              <span>
                <Icon size={16} />
                {card.title}
              </span>
              <Maximize2 size={16} />
            </div>
            <img src={card.image} alt={card.title} />
          </button>
        )
      })}
    </div>
  )
}

function CompetitorBoard({ competitors }) {
  return (
    <div className="competitor-board kinetic-board">
      {competitors.map((competitor, index) => {
        const Tile = competitor.url ? 'a' : 'article'

        return (
          <Tile
            aria-label={competitor.url ? `Open ${competitor.name} website` : undefined}
            className="competitor-tile"
            href={competitor.url}
            key={competitor.name}
            rel={competitor.url ? 'noreferrer' : undefined}
            style={{ '--delay': `${index * 70}ms` }}
            target={competitor.url ? '_blank' : undefined}
          >
            {competitor.logo ? (
              <span className="competitor-logo-shell">
                <img src={competitor.logo} alt={`${competitor.name} logo`} loading="lazy" />
              </span>
            ) : (
              <span className="competitor-initials">{competitor.name.slice(0, 2).toUpperCase()}</span>
            )}
            <strong>{competitor.name}</strong>
          </Tile>
        )
      })}
    </div>
  )
}

function DesignPage({ data, openLightbox }) {
  const [activePhase, setActivePhase] = useState(0)
  const phase = data.phases[activePhase]
  const phasePages = phase.pages.map((pageNo) => data.pages.find((page) => page.page === pageNo)).filter(Boolean)
  const phaseEvidence = phase.artifacts.map((artifact, index) => ({
    title: artifact,
    lightboxIndex: Math.min(index, Math.max(phasePages.length - 1, 0))
  }))
  const phaseDocuments = phase.documents.map((document) => ({
    ...document,
    pages: document.pages.map((pageNo) => data.pages.find((page) => page.page === pageNo)).filter(Boolean)
  }))

  return (
    <div className="page-stack">
      <PageHero
        label="Design Process"
        title="The design process moved from research to a testable bottle concept."
        text="Each phase narrowed the project: define the problem, research users and competitors, select the strongest concept, model it in AutoCAD, respond to peer review, and prepare the final presentation."
        actions={
          <button type="button" className="primary-button" onClick={() => openLightbox(phasePages, 0)}>
            Inspect Phase Artifacts
            <Maximize2 size={18} />
          </button>
        }
        visual={<PhaseRail phases={data.phases} activePhase={activePhase} setActivePhase={setActivePhase} />}
      />
      <section className="phase-console">
        <div className="phase-copy">
          <p className="section-label">{phase.label}</p>
          <h2>{phase.title}</h2>
          <p>{phase.summary}</p>
          <div className="phase-evidence-head">
            <p className="section-label">Included evidence</p>
            <span>{phase.artifacts.length} artifacts</span>
          </div>
          <ul className="artifact-list">
            {phaseEvidence.map((artifact) => (
              <li key={artifact.title}>
                <button
                  type="button"
                  onClick={() => openLightbox(phasePages, artifact.lightboxIndex)}
                  disabled={!phasePages.length}
                >
                  <CheckCircle2 size={18} />
                  <span>{artifact.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <ArtifactViewer
          title={phase.title}
          label="Linked artifacts"
          image={phase.image}
          detail="Key evidence from this phase of the FTCS engineering portfolio."
          onOpen={() => openLightbox(phasePages, 0)}
          pageCount={phasePages.length}
          compact
        />
      </section>
      <section className="artifact-grid phase-document-grid">
        {phaseDocuments.map((document) => (
          <ArtifactViewer
            key={document.title}
            title={document.title}
            label={document.label}
            image={document.image}
            detail={document.detail}
            onOpen={() => openLightbox(document.pages, 0)}
            pageCount={document.pages.length}
            compact={phaseDocuments.length > 3}
          />
        ))}
      </section>
    </div>
  )
}

function PhaseRail({ phases, activePhase, setActivePhase }) {
  return (
    <div className="phase-rail" role="tablist" aria-label="Project phases">
      {phases.map((phase, index) => (
        <button
          key={phase.id}
          type="button"
          role="tab"
          aria-selected={index === activePhase}
          className={index === activePhase ? 'is-active' : ''}
          onClick={() => setActivePhase(index)}
        >
          <span>{String(index + 1).padStart(2, '0')}</span>
          <strong>{phase.label}</strong>
        </button>
      ))}
    </div>
  )
}

function PrototypePage({ data, openLightbox }) {
  const [activeSheet, setActiveSheet] = useState(0)
  const active = cadSheets[activeSheet]
  const cadPages = cadSheets
    .map((sheet) => {
      const source = data.pages.find((page) => page.page === sheet.page)
      return source && {
        ...source,
        title: sheet.title,
        category: 'CAD artifact',
        full: sheet.image,
        thumb: sheet.image
      }
    })
    .filter(Boolean)

  return (
    <div className="page-stack">
      <PageHero
        label="Prototype"
        title="AutoCAD translated the selected concept into bottle and cap geometry."
        text="The prototype work defines the bottle body, no-cap opening, and replacement cap with dimensioned CAD drawings that connect the research criteria to a buildable design."
        actions={
          <button type="button" className="primary-button" onClick={() => openLightbox(cadPages, activeSheet)}>
            Inspect Sheet
            <Maximize2 size={18} />
          </button>
        }
        visual={
          <div className="cad-carousel">
            <img src={active.image} alt={active.title} />
            <div className="cad-carousel-label">{active.title}</div>
          </div>
        }
      />
      <section className="sheet-tabs" role="tablist" aria-label="CAD sheets">
        {cadSheets.map((sheet, index) => (
          <button
            key={sheet.title}
            type="button"
            role="tab"
            aria-selected={index === activeSheet}
            className={index === activeSheet ? 'is-active' : ''}
            onClick={() => setActiveSheet(index)}
          >
            <PenTool size={18} />
            <strong>{sheet.title}</strong>
            <span>{sheet.detail}</span>
          </button>
        ))}
      </section>
      <section className="prototype-detail">
        <ArtifactViewer
          title={active.title}
          label="CAD artifact"
          image={active.image}
          detail={active.detail}
          onOpen={() => openLightbox(cadPages, activeSheet)}
          pageCount={cadPages.length}
          wide
        />
        <div className="spec-list">
          {data.specifications.map((spec) => (
            <article key={spec.name} className="spec-item reveal-card">
              <span>{spec.name}</span>
              <p>{spec.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

function ReviewsPage({ data, navigate }) {
  return (
    <div className="page-stack">
      <PageHero
        label="Peer Review"
        title="Peer review strengthened the final engineering pitch."
        text={data.feedback.reflection}
        className="reviews-hero"
        actions={
          <button type="button" className="primary-button" onClick={() => navigate('/portfolio')}>
            View Evidence
            <ArrowRight size={18} />
          </button>
        }
        visual={<TeamPanel team={data.team} />}
      />
      <section className="review-grid">
        <ReviewColumn title="Strengths" items={data.feedback.strengths} tone="good" />
        <ReviewColumn title="Areas of growth" items={data.feedback.growth} tone="growth" />
        <article className="review-column reflection-card">
          <h3>Final takeaway</h3>
          <p>
            The project moved from a rough first phase into a clearer engineering process by using
            meetings, earlier deadlines, AutoCAD progress, peer feedback, and a stronger presentation
            checklist.
          </p>
        </article>
      </section>
      <section className="review-grid" aria-label="Presentation readiness">
        {data.presentationReadiness.map((column) => (
          <ReviewColumn key={column.title} title={column.title} items={column.items} />
        ))}
      </section>
    </div>
  )
}

function PresentationPage({ data, navigate, openLightbox }) {
  const checklistPages = [70, 71].map((pageNo) => data.pages.find((page) => page.page === pageNo)).filter(Boolean)
  const posterSections = data.posterSections.map((section) => ({
    ...section,
    pages: section.pages.map((pageNo) => data.pages.find((page) => page.page === pageNo)).filter(Boolean)
  }))

  return (
    <div className="page-stack">
      <PageHero
        label="Poster Companion"
        title="Use the site as the presentation-ready portfolio behind the poster."
        text="The poster can stay visual and simple. This page gives the audience fast proof: the talking flow, every poster section, and the exact portfolio artifacts behind each claim."
        className="presentation-hero"
        actions={
          <>
            <button type="button" className="primary-button" onClick={() => openLightbox(checklistPages, 0)}>
              Inspect Checklist
              <Maximize2 size={18} />
            </button>
            <button type="button" className="secondary-button" onClick={() => navigate('/portfolio')}>
              Full Archive
              <GalleryHorizontalEnd size={18} />
            </button>
          </>
        }
        visual={<PresentationConsole data={data} />}
      />

      <section className="presentation-flow" aria-label="Five minute presentation flow">
        {data.presentationFlow.map((step, index) => (
          <article className="presentation-step reveal-card" key={step.title}>
            <span>{step.time}</span>
            <strong>{String(index + 1).padStart(2, '0')}</strong>
            <h3>{step.title}</h3>
            <p>{step.detail}</p>
          </article>
        ))}
      </section>

      <section className="poster-support-grid" aria-label="Poster evidence support">
        {posterSections.map((section, index) => (
          <article className="poster-support-card reveal-card" key={section.title}>
            <div>
              <span>Poster section {String(index + 1).padStart(2, '0')}</span>
              <h3>{section.title}</h3>
              <p>{section.detail}</p>
            </div>
            <strong>{section.evidence}</strong>
            <div className="poster-card-actions">
              <button type="button" onClick={() => openLightbox(section.pages, 0)}>
                Inspect Evidence
              </button>
              <button type="button" onClick={() => navigate(section.route)}>
                Open Section
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

function PresentationConsole({ data }) {
  return (
    <div className="presentation-console">
      <span>Expo mode</span>
      <strong>Poster + live portfolio</strong>
      <div className="presentation-console-grid">
        <article>
          <b>{data.posterSections.length}</b>
          <small>poster sections backed by evidence</small>
        </article>
        <article>
          <b>5 min</b>
          <small>talking flow with CAD proof</small>
        </article>
        <article>
          <b>71</b>
          <small>portfolio artifacts available</small>
        </article>
      </div>
    </div>
  )
}

function TeamPanel({ team }) {
  return (
    <div className="team-panel">
      {team.map((member, index) => (
        <article style={{ '--delay': `${index * 90}ms` }} key={member.name}>
          <strong>{member.name}</strong>
          <span>{member.role}</span>
        </article>
      ))}
    </div>
  )
}

function ReviewColumn({ title, items, tone }) {
  return (
    <article className={`review-column ${tone || ''}`}>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  )
}

function PortfolioPage({ data, visiblePages, filter, setFilter, openLightbox }) {
  return (
    <div className="page-stack">
      <PageHero
        label="Portfolio Archive"
        title="The full engineering archive documents every major decision."
        text="The archive preserves the team logo, research, planning, sketches, CAD work, review notes, reflections, and final presentation checklist as evidence for the FTCS bottle design."
        visual={
          <div className="archive-counter">
            <strong>{visiblePages.length}</strong>
            <span>portfolio artifacts</span>
            <small>{filter === 'all' ? 'Complete archive selected' : `${filter} evidence selected`}</small>
          </div>
        }
      />
      <div className="filter-row" role="tablist" aria-label="Filter portfolio archive">
        {galleryFilters.map((item) => (
          <button
            key={item.id}
            type="button"
            className={filter === item.id ? 'is-active' : ''}
            aria-selected={filter === item.id}
            onClick={() => setFilter(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="page-grid">
        {visiblePages.map((page, index) => (
          <button
            key={page.page}
            className="page-tile reveal-card"
            type="button"
            onClick={() => openLightbox(visiblePages, index)}
          >
            <img src={page.thumb} alt={page.title} loading="lazy" />
            <span>{page.setLabel}</span>
            <strong>{page.title}</strong>
          </button>
        ))}
      </div>
    </div>
  )
}

function ArtifactViewer({ title, label, image, detail, onOpen, pageCount = 1, compact = false, wide = false }) {
  return (
    <article className={`artifact-viewer ${compact ? 'compact' : ''} ${wide ? 'wide' : ''}`}>
      <div className="artifact-topline">
        <span>{label}</span>
        <button type="button" onClick={onOpen} aria-label={`Open ${title}`}>
          <Maximize2 size={16} />
          Inspect
        </button>
      </div>
      <button type="button" className="artifact-image-frame" onClick={onOpen}>
        <img src={image} alt={title} loading="eager" />
        <PageDots count={pageCount} />
      </button>
      <div className="artifact-copy">
        <h3>{title}</h3>
        <p>{detail}</p>
      </div>
    </article>
  )
}

function PageDots({ count }) {
  if (count <= 1) return null

  const visibleDots = Array.from({ length: Math.min(count, 8) })

  return (
    <span className="page-dots" aria-label={`${count} linked images`}>
      <span className="page-dot-count">{count} images</span>
      <span className="page-dot-track" aria-hidden="true">
        {visibleDots.map((_, index) => (
          <span key={index} className={index === 0 ? 'is-active' : ''} />
        ))}
      </span>
    </span>
  )
}

function Lightbox({ pages, lightboxIndex, setLightboxIndex }) {
  if (lightboxIndex === null || !pages[lightboxIndex]) return null

  const page = pages[lightboxIndex]
  const previous = () => setLightboxIndex((lightboxIndex - 1 + pages.length) % pages.length)
  const next = () => setLightboxIndex((lightboxIndex + 1) % pages.length)

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${page.title} preview`}>
      <div className="lightbox-top">
        <div>
          <span>{page.setLabel || page.category}</span>
          <strong>{page.title}</strong>
        </div>
        <button className="icon-button" type="button" aria-label="Close preview" onClick={() => setLightboxIndex(null)}>
          <X size={22} />
        </button>
      </div>
      {pages.length > 1 && (
        <button className="lightbox-nav prev" type="button" aria-label="Previous artifact" onClick={previous}>
          <ChevronLeft size={28} />
        </button>
      )}
      <img src={page.full} alt={page.title} />
      {pages.length > 1 && (
        <button className="lightbox-nav next" type="button" aria-label="Next artifact" onClick={next}>
          <ChevronRight size={28} />
        </button>
      )}
    </div>
  )
}

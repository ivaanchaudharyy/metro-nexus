import { useEffect, useMemo, useState } from 'react'

const lines = [
  {
    id: 'kaal',
    name: 'Kaal Chakra',
    catalogue: 'KC—1988',
    district: 'Nyay Nagar',
    genre: 'Noir / Detectives',
    color: '#ff4f9a',
    tint: 'pink',
    route: 'Court Quarter → Foundry → Rain Gate',
    description: 'A rain-polished route through the city’s old judicial and industrial memory. Every platform keeps a secret in the margins.',
    note: 'The rail hums like a case file being reopened.',
  },
  {
    id: 'gyan',
    name: 'Gyan Ganj',
    catalogue: 'GG—2012',
    district: 'Vidya Vihar',
    genre: 'Coming-of-age / Adventure',
    color: '#62f3bd',
    tint: 'mint',
    route: 'Root Terminal → Open Quad → Moss Gardens',
    description: 'The line for first chapters: campuses, open quadrangles, and the bright detours that make a city feel newly discovered.',
    note: 'A quiet carriage can contain an entire future.',
  },
  {
    id: 'silicon',
    name: 'Silicon Sarai',
    catalogue: 'SS—2030',
    district: 'Circuit Colony',
    genre: 'Hard science fiction',
    color: '#52b6ff',
    tint: 'blue',
    route: 'Packet Square → Node 88 → Glass Mile',
    description: 'A high-speed index of the compute district, threading server towers and midnight laboratories into one cobalt corridor.',
    note: 'The city compiles itself between stations.',
  },
  {
    id: 'rangmahal',
    name: 'Rangmahal',
    catalogue: 'RM—2018',
    district: 'Kalakriti Quarter',
    genre: 'Magical realism',
    color: '#b68cff',
    tint: 'violet',
    route: 'Marigold Steps → Lantern Hall → Dream Market',
    description: 'A moving gallery connecting mural-lined theatres, night markets, and stories that refuse to remain inside their frames.',
    note: 'Some shadows ask to ride two stops farther.',
  },
  {
    id: 'haveli',
    name: 'Purani Haveli',
    catalogue: 'PH—1857',
    district: 'Chandni Kila',
    genre: 'Gothic / Mythology',
    color: '#d4ff58',
    tint: 'lime',
    route: 'Stone Archive → Kila Gate → Ancestral Well',
    description: 'The oldest book in the network: sandstone arches, fibre-optic veins, and a route through the city’s inherited voices.',
    note: 'The walls remember each hand that has passed.',
  },
]

const initialReviews = [
  { id: 1, line: 'gyan', author: 'Mira J.', score: 5, text: 'The quiet carriage between Root Terminal and Open Quad is beautifully paced.', type: 'Rider note', time: '12 min ago' },
  { id: 2, line: 'silicon', author: 'C. Rao', score: 4, text: 'Node 88 signage was clear. The platform transfer could use one more live display.', type: 'Rider note', time: '28 min ago' },
  { id: 3, line: 'kaal', author: 'Asha P.', score: 3, text: 'Please check the reading lights in the third carriage near Rain Gate.', type: 'Line report', time: '43 min ago' },
]

const timeline = [
  ['07:42', 'Open the folio', 'Your Nexus ID recalls the routes and saved city passages you have chosen to keep.'],
  ['07:48', 'Enter the stacks', 'The station board writes the clearest route decision in the margin, before you board.'],
  ['07:55', 'Travel the chapter', 'Live accessibility, crowding and service updates become a readable travel timeline.'],
  ['08:12', 'Leave a mark', 'Rate the journey or send a line-specific report. Your note is added to the public ledger.'],
]

function makeNexusId() {
  const token = globalThis.crypto?.randomUUID?.().replaceAll('-', '').slice(0, 8).toUpperCase()
    ?? Math.random().toString(36).slice(2, 10).toUpperCase()
  return `NX-${new Date().getFullYear()}-${token}`
}

function loadStored(key, fallback) {
  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : fallback
  } catch {
    return fallback
  }
}

export default function App() {
  const [view, setView] = useState('archive')
  const [selected, setSelected] = useState(2)
  const [turning, setTurning] = useState(false)
  const [toast, setToast] = useState('')
  const [reviews, setReviews] = useState(() => loadStored('mn-reviews', initialReviews))
  const [profile, setProfile] = useState(() => loadStored('mn-profile', { id: makeNexusId(), name: 'Unclaimed reader', joined: '11 JUL 2038' }))
  const [reviewForm, setReviewForm] = useState({ line: 'silicon', score: 5, type: 'Rider note', text: '' })
  const [nameDraft, setNameDraft] = useState(profile.name)
  const activeLine = lines[selected]

  useEffect(() => window.localStorage.setItem('mn-reviews', JSON.stringify(reviews)), [reviews])
  useEffect(() => window.localStorage.setItem('mn-profile', JSON.stringify(profile)), [profile])
  useEffect(() => {
    if (!toast) return undefined
    const timeout = window.setTimeout(() => setToast(''), 3200)
    return () => window.clearTimeout(timeout)
  }, [toast])

  const selectedReviews = useMemo(
    () => reviews.filter((review) => review.line === activeLine.id),
    [reviews, activeLine.id],
  )

  function chooseLine(index) {
    if (index === selected) return
    setTurning(true)
    window.setTimeout(() => {
      setSelected(index)
      setReviewForm((form) => ({ ...form, line: lines[index].id }))
      setTurning(false)
    }, 260)
  }

  function nextLine(direction = 1) {
    chooseLine((selected + direction + lines.length) % lines.length)
  }

  function submitReview(event) {
    event.preventDefault()
    if (!reviewForm.text.trim()) return
    const newReview = {
      id: Date.now(),
      line: reviewForm.line,
      author: profile.name || 'Nexus reader',
      score: Number(reviewForm.score),
      text: reviewForm.text.trim(),
      type: reviewForm.type,
      time: 'Just now',
    }
    setReviews((all) => [newReview, ...all])
    setReviewForm((form) => ({ ...form, text: '' }))
    setToast(reviewForm.type === 'Line report' ? 'Report indexed in the line ledger.' : 'Your rider note is now in the public ledger.')
  }

  function saveName(event) {
    event.preventDefault()
    setProfile((current) => ({ ...current, name: nameDraft.trim() || 'Unclaimed reader' }))
    setToast('Reader record updated.')
  }

  async function copyId() {
    try {
      await navigator.clipboard.writeText(profile.id)
      setToast('Nexus ID copied to your clipboard.')
    } catch {
      setToast('Nexus ID: ' + profile.id)
    }
  }

  const nav = [
    ['archive', 'Archive'],
    ['lines', 'Line folios'],
    ['map', 'City atlas'],
    ['experience', 'Experience'],
    ['id', 'Nexus ID'],
  ]

  return (
    <div className="app-shell">
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />
      <div className="aurora aurora-three" />
      <div className="scanlines" aria-hidden="true" />

      <header className="topbar">
        <button className="brand" onClick={() => setView('archive')} aria-label="Metro Nexus archive home">
          <span className="brand-mark"><i /><i /><i /></span>
          <span><strong>METRO NEXUS</strong><small>THE LIVING STACKS · 2038</small></span>
        </button>
        <nav className="nav" aria-label="Main navigation">
          {nav.map(([id, label]) => <button className={view === id ? 'is-active' : ''} onClick={() => setView(id)} key={id}>{label}</button>)}
        </nav>
        <button className="id-chip" onClick={() => setView('id')}><span className="pulse-dot" />{profile.id.slice(-8)}</button>
      </header>

      <main>
        {view === 'archive' && <Archive activeLine={activeLine} selected={selected} chooseLine={chooseLine} nextLine={nextLine} turning={turning} setView={setView} />}
        {view === 'lines' && <LineFolios activeLine={activeLine} selected={selected} chooseLine={chooseLine} nextLine={nextLine} turning={turning} setView={setView} />}
        {view === 'map' && <CityAtlas activeLine={activeLine} selected={selected} chooseLine={chooseLine} />}
        {view === 'experience' && <Experience activeLine={activeLine} profile={profile} reviewForm={reviewForm} setReviewForm={setReviewForm} submitReview={submitReview} reviews={selectedReviews} />}
        {view === 'id' && <NexusId profile={profile} nameDraft={nameDraft} setNameDraft={setNameDraft} saveName={saveName} copyId={copyId} />}
      </main>

      {toast && <div className="toast" role="status">✦ {toast}</div>}
      <footer><span>METRO NEXUS / PUBLIC TRANSPORT MEMORY SYSTEM</span><span>NO STORIES ARE LOST IN TRANSIT</span></footer>
    </div>
  )
}

function Archive({ activeLine, selected, chooseLine, nextLine, turning, setView }) {
  return <>
    <section className="hero section-wrap">
      <div className="hero-copy">
        <p className="eyebrow"><span />NETWORK 01 · CITY AS A LIBRARY</p>
        <h1>Every journey<br />belongs on a <em>shelf.</em></h1>
        <p className="lede">Metro Nexus turns a future city into a living reference library: routes are volumes, stations are pages, and the everyday commute leaves a readable trace.</p>
        <div className="hero-actions">
          <button className="primary-button" onClick={() => setView('lines')}>Open the line folios <b>↗</b></button>
          <button className="text-button" onClick={() => nextLine(1)}>Turn a page <b>→</b></button>
        </div>
        <div className="archive-stats">
          <div><strong>05</strong><span>living volumes</span></div>
          <div><strong>84</strong><span>indexed stations</span></div>
          <div><strong>24/7</strong><span>open stacks</span></div>
        </div>
      </div>
      <div className="hero-book-stage" aria-label={'Current volume: ' + activeLine.name}>
        <div className="book-orbit orbit-a" /><div className="book-orbit orbit-b" />
        <article className={'hero-book ' + activeLine.tint + (turning ? ' is-turning' : '')}>
          <div className="book-spine"><span>METRO NEXUS</span><b>{activeLine.catalogue}</b></div>
          <div className="book-cover">
            <p>VOLUME {String(selected + 1).padStart(2, '0')} / 05</p>
            <div className="cover-symbol">✦</div>
            <h2>{activeLine.name}</h2>
            <span>{activeLine.genre}</span>
            <div className="cover-route"><i />{activeLine.district}</div>
          </div>
          <div className="book-pages" />
        </article>
        <div className="book-controls"><button onClick={() => nextLine(-1)} aria-label="Previous volume">←</button><span>{String(selected + 1).padStart(2, '0')} — 05</span><button onClick={() => nextLine(1)} aria-label="Next volume">→</button></div>
      </div>
    </section>

    <section className="section-wrap chapter-grid">
      <div className="chapter-intro"><p className="eyebrow"><span />EXPLORE THE COLLECTION</p><h2>Choose your<br /><em>next chapter.</em></h2><p>Each colour is a physical line, a distinct neighborhood, and a genre through which to read it.</p></div>
      <div className="chapter-list">
        {lines.map((line, index) => <button className={'chapter-row ' + (index === selected ? 'is-selected' : '')} onClick={() => chooseLine(index)} key={line.id} style={{ '--line': line.color }}>
          <span className="chapter-number">0{index + 1}</span><span className="chapter-name"><b>{line.name}</b><small>{line.district} · {line.genre}</small></span><span className="chapter-arrow">↗</span>
        </button>)}
      </div>
    </section>
  </>
}

function LineFolios({ activeLine, selected, chooseLine, nextLine, turning, setView }) {
  return <section className="section-wrap folio-layout">
    <aside className="folio-index"><p className="eyebrow"><span />THE STACK INDEX</p><h1>Line<br /><em>folios.</em></h1><p>Turn through the collection, one moving story at a time.</p>
      <div className="mini-index">{lines.map((line, index) => <button key={line.id} className={selected === index ? 'active' : ''} onClick={() => chooseLine(index)}><i style={{ background: line.color }} />0{index + 1}<span>{line.name}</span></button>)}</div>
    </aside>
    <article className={'open-folio ' + activeLine.tint}>
      <div className="folio-top"><span>CATALOGUE / {activeLine.catalogue}</span><span>FOLIO {String(selected + 1).padStart(2, '0')} OF 05</span></div>
      <div className={'folio-pages ' + (turning ? 'turning' : '')}>
        <div className="folio-page left-page"><p className="folio-kicker">A route in {activeLine.genre}</p><h2>{activeLine.name}</h2><div className="folio-rule" /><p className="serif-copy">{activeLine.description}</p><blockquote>“{activeLine.note}”</blockquote><div className="page-footer"><span>{activeLine.district.toUpperCase()}</span><span>01</span></div></div>
        <div className="folio-page right-page"><span className="route-label">ROUTE ANNOTATION</span><div className="route-map" style={{ '--line': activeLine.color }}><i className="node n1" /><i className="node n2" /><i className="node n3" /><i className="node n4" /><svg viewBox="0 0 270 210" preserveAspectRatio="none"><path d="M4 175 C70 185 70 40 144 83 S205 192 265 35" /></svg></div><p className="route-title">{activeLine.route}</p><div className="folio-tags"><span>LIVE INDEX</span><span>ACCESSIBLE</span><span>STORY-RICH</span></div><button className="primary-button compact" onClick={() => setView('map')}>Locate in the city <b>↗</b></button><div className="page-footer"><span>METRO NEXUS</span><span>02</span></div></div>
      </div>
      <div className="folio-controls"><button onClick={() => nextLine(-1)}>← Previous</button><span>Slide to turn the page</span><button onClick={() => nextLine(1)}>Next →</button></div>
    </article>
  </section>
}

function CityAtlas({ activeLine, selected, chooseLine }) {
  return <section className="section-wrap atlas-layout">
    <div className="atlas-copy"><p className="eyebrow"><span />ATLAS / DELHI-NCR 2038</p><h1>How the city<br /><em>reads itself.</em></h1><p>Five volumes wind around a fictionalized city. Intersections are cross-references; each terminal opens onto a different kind of story.</p><div className="atlas-key">{lines.map((line, index) => <button key={line.id} onClick={() => chooseLine(index)} className={selected === index ? 'active' : ''}><i style={{ backgroundColor: line.color }} />{line.name}<span>↗</span></button>)}</div></div>
    <div className="map-card">
      <div className="map-label label-one">NYAY<br />NAGAR</div><div className="map-label label-two">CIRCUIT<br />COLONY</div><div className="map-label label-three">VIDYA<br />VIHAR</div><div className="map-label label-four">KALAKRITI<br />QUARTER</div><div className="map-label label-five">CHANDNI<br />KILA</div>
      <svg viewBox="0 0 760 570" role="img" aria-label="Metro Nexus fictional city line map">
        <g className="districts"><path d="M60 72 240 44 328 160 226 255 62 210Z"/><path d="m328 160 185-96 185 101-95 144-164 18Z"/><path d="m60 210 166 45 73 142-187 92-70-131Z"/><path d="m226 255 213 72 59 136-199 42-73-113Z"/><path d="m603 309 95-144 81 62-9 198-164 56-108-18Z"/></g>
        {lines.map((line, index) => <path key={line.id} onClick={() => chooseLine(index)} className={'metro-path ' + (selected === index ? 'selected' : '')} style={{ stroke: line.color }} d={['M76 153 C188 93 255 234 403 180 S596 107 721 197','M101 369 C245 295 267 98 414 120 S580 331 719 378','M133 78 C211 185 328 208 416 296 S570 417 710 461','M94 488 C194 377 363 463 438 359 S580 242 716 102','M87 291 C224 282 309 369 420 400 S569 412 705 277'][index]} />)}
        <g className="stations">{[[76,153],[210,136],[403,180],[566,129],[721,197],[101,369],[262,264],[414,120],[582,331],[719,378],[133,78],[328,208],[416,296],[570,417],[710,461],[94,488],[363,463],[438,359],[580,242],[716,102],[87,291],[309,369],[420,400],[569,412],[705,277]].map(([x,y], i) => <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? '8' : '5'} />)}</g>
      </svg>
      <div className="map-folio"><span>YOU ARE READING</span><b style={{ color: activeLine.color }}>{activeLine.name}</b><p>{activeLine.route}</p></div>
    </div>
    <div className="line-intro" style={{ '--line': activeLine.color }}><span>VOLUME {String(selected + 1).padStart(2, '0')}</span><h2>{activeLine.name}</h2><p>{activeLine.description}</p><small>{activeLine.district} · {activeLine.genre}</small></div>
  </section>
}

function Experience({ activeLine, profile, reviewForm, setReviewForm, submitReview, reviews }) {
  return <section className="section-wrap experience-layout">
    <div className="experience-heading"><p className="eyebrow"><span />RIDER EXPERIENCE / ANNOTATED</p><h1>A journey told<br />in <em>five beats.</em></h1><p>Instead of a decorative scene, the service itself is the illustration: a clear timeline of what a rider sees, knows, and can improve.</p></div>
    <div className="journey-timeline">{timeline.map(([time, title, copy], index) => <article className="timeline-entry" key={time}><div className="timeline-time">{time}</div><div className="timeline-node"><i>{index + 1}</i></div><div className="timeline-content"><span>CHAPTER 0{index + 1}</span><h2>{title}</h2><p>{copy}</p></div></article>)}</div>
    <div className="feedback-grid">
      <article className="review-form-card"><p className="eyebrow"><span />ADD TO THE LEDGER</p><h2>How was your<br /><em>passage?</em></h2><form onSubmit={submitReview}>
        <label>Line<select value={reviewForm.line} onChange={(e) => setReviewForm({ ...reviewForm, line: e.target.value })}>{lines.map((line) => <option value={line.id} key={line.id}>{line.name}</option>)}</select></label>
        <div className="score-row"><span>Rating</span><div>{[1,2,3,4,5].map((score) => <button type="button" onClick={() => setReviewForm({ ...reviewForm, score })} className={score <= reviewForm.score ? 'filled' : ''} key={score} aria-label={score + ' star rating'}>★</button>)}</div></div>
        <div className="type-toggle"><button type="button" onClick={() => setReviewForm({ ...reviewForm, type: 'Rider note' })} className={reviewForm.type === 'Rider note' ? 'selected' : ''}>Rider note</button><button type="button" onClick={() => setReviewForm({ ...reviewForm, type: 'Line report' })} className={reviewForm.type === 'Line report' ? 'selected' : ''}>Report an issue</button></div>
        <textarea value={reviewForm.text} onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })} placeholder={reviewForm.type === 'Line report' ? 'Tell the line stewards what needs attention…' : 'Leave a note for future riders…'} maxLength="360" required />
        <p className="form-note">Posting as {profile.name} · visible in the community ledger</p><button className="primary-button compact" type="submit">{reviewForm.type === 'Line report' ? 'Submit report' : 'Publish note'} <b>↗</b></button>
      </form></article>
      <article className="review-ledger"><div className="ledger-head"><div><p className="eyebrow"><span />LIVE COMMUNITY LEDGER</p><h2>{activeLine.name}</h2></div><span>{reviews.length} NOTES</span></div>{reviews.length ? <div className="reviews">{reviews.slice(0, 4).map((review) => <div className="review" key={review.id}><div className="review-meta"><strong>{review.author}</strong><span>{'★'.repeat(review.score)}<i>{'★'.repeat(5 - review.score)}</i></span></div><p>{review.text}</p><footer><b>{review.type}</b><time>{review.time}</time></footer></div>)}</div> : <div className="empty-ledger">This folio is waiting for its first annotation.</div>}</article>
    </div>
  </section>
}

function NexusId({ profile, nameDraft, setNameDraft, saveName, copyId }) {
  return <section className="section-wrap id-layout">
    <div className="id-heading"><p className="eyebrow"><span />PERSONAL READER RECORD</p><h1>Your movement<br />has a <em>margin.</em></h1><p>Every visitor receives a unique Nexus ID. It connects their saved routes, annotations, and service notes without making the city feel anonymous.</p><form onSubmit={saveName} className="name-form"><label>Reader name<input value={nameDraft} onChange={(e) => setNameDraft(e.target.value)} maxLength="40" /></label><button className="text-button" type="submit">Update record →</button></form></div>
    <article className="nexus-card"><div className="card-top"><span>NEXUS / CITIZEN FOLIO</span><b>ACTIVE</b></div><div className="card-center"><div className="avatar">{profile.name.slice(0, 1).toUpperCase()}</div><div><small>READER OF RECORD</small><h2>{profile.name}</h2><p>Joined the stacks · {profile.joined}</p></div></div><div className="id-number"><span>UNIQUE NEXUS ID</span><strong>{profile.id}</strong><button onClick={copyId} aria-label="Copy Nexus ID">⧉</button></div><div className="card-bottom"><div className="qr-grid" aria-hidden="true">{Array.from({ length: 49 }, (_, i) => <i className={[0,1,5,7,9,11,14,16,18,22,24,25,27,30,33,35,39,41,44,46,48].includes(i) ? 'on' : ''} key={i} />)}</div><p>Scan at any gate to retrieve<br />your saved city passages.</p><span>ISSUED ONCE<br />HELD LOCALLY</span></div></article>
    <div className="id-promise"><span>01</span><p><b>Uniquely assigned.</b> This browser issues and keeps one ID for you.</p><span>02</span><p><b>Useful by design.</b> Your feedback and saved folios can carry a consistent reader signature.</p></div>
  </section>
}

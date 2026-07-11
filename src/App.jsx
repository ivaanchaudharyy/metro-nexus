import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Compass, Cpu, Sparkles, BookOpen, Clock, Users, 
  ArrowRight, Check, RotateCcw, Plus, MessageSquare, 
  Menu, X, Landmark, AlertCircle, RefreshCw, Send, ChevronRight,
  Fingerprint, CreditCard, ShieldCheck, QrCode
} from 'lucide-react';
import { useArchiveSimulation } from './hooks/useArchiveSimulation';
import { TRANSPARENCY_MESSAGES } from './data/metroNexusData';
import PlaceholderImage from './components/PlaceholderImage';

// Icon mapper helper
const IconComponent = ({ name, className }) => {
  switch (name) {
    case 'SearchCode': return <Search className={className} />;
    case 'Compass': return <Compass className={className} />;
    case 'Cpu': return <Cpu className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'BookOpen': return <BookOpen className={className} />;
    default: return <BookOpen className={className} />;
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('HOME');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lines, pastArchives, resetLine, addManualRide } = useArchiveSimulation();
  
  // State for selected line in the Library (INTERFACES)
  const [selectedLineId, setSelectedLineId] = useState('silicon-sarai');
  
  // Custom user journal note form state
  const [writerName, setWriterName] = useState('');
  const [noteHeading, setNoteHeading] = useState('');
  const [noteBody, setNoteBody] = useState('');
  const [userNotes, setUserNotes] = useState({}); // Stores user notes keyed by lineId
  
  const [copiedColor, setCopiedColor] = useState(null);

  // Biometric scanner state for Nexus ID tab
  const [scanActive, setScanActive] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const handleCopyColor = (hex) => {
    navigator.clipboard.writeText(hex).then(() => {
      setCopiedColor(hex);
      setTimeout(() => setCopiedColor(null), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  // Trigger biometric scanning animation on Nexus ID tab click
  useEffect(() => {
    if (activeTab === 'NEXUS ID') {
      setScanActive(true);
      setScanProgress(0);
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setScanActive(false);
            return 100;
          }
          return prev + 5;
        });
      }, 70);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  // Live transparency alert switcher in Home
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0);
  useEffect(() => {
    const alertInterval = setInterval(() => {
      setCurrentAlertIndex(prev => (prev + 1) % TRANSPARENCY_MESSAGES.length);
    }, 6000);
    return () => clearInterval(alertInterval);
  }, []);

  // Slide indicator coords state
  const [indicatorCoords, setIndicatorCoords] = useState({ left: 0, width: 0 });
  const tabRefs = useRef({});
  const tabsList = ['HOME', 'STATIONS', 'BRANDING', 'INTERFACES', 'ENVIRONMENTS', 'EXPERIENCES', 'NEXUS ID'];

  // Update sliding underline coords
  useEffect(() => {
    const activeElement = tabRefs.current[activeTab];
    if (activeElement) {
      setIndicatorCoords({
        left: activeElement.offsetLeft,
        width: activeElement.offsetWidth
      });
    }
  }, [activeTab]);

  // Handle resizing window to re-compute nav underline position
  useEffect(() => {
    const handleResize = () => {
      const activeElement = tabRefs.current[activeTab];
      if (activeElement) {
        setIndicatorCoords({
          left: activeElement.offsetLeft,
          width: activeElement.offsetWidth
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab]);

  // Selected line object lookup
  const selectedLine = lines.find(l => l.id === selectedLineId) || lines[0];

  // Combined journal entries (default static + user created)
  const getJournalPages = (lineId) => {
    const defaultPages = lines.find(l => l.id === lineId)?.journalPages || [];
    const customPages = userNotes[lineId] || [];
    return [...customPages, ...defaultPages];
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!writerName.trim() || !noteHeading.trim() || !noteBody.trim()) return;

    const newNote = {
      id: `custom-${Date.now()}`,
      rider: `${writerName} (Passenger)`,
      timestamp: new Date().toISOString(),
      heading: noteHeading,
      body: noteBody
    };

    setUserNotes(prev => ({
      ...prev,
      [selectedLineId]: [newNote, ...(prev[selectedLineId] || [])]
    }));

    // Clear form
    setWriterName('');
    setNoteHeading('');
    setNoteBody('');
  };

  // Helper to format large numbers with commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  // Human friendly stamp formatting ( checkout card stamp format )
  const formatStampDate = (isoString) => {
    const d = new Date(isoString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const datePart = `${d.getDate().toString().padStart(2, '0')} ${months[d.getMonth()]} ${d.getFullYear()}`;
    const timePart = `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
    return `Entered ${datePart}, ${timePart}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#040508] text-slate-400 font-space-grotesk relative crt-screen">
      {/* 3D grid overlay */}
      <div className="fixed inset-0 cyber-grid opacity-10 pointer-events-none z-10"></div>
      
      {/* Slow shifting glowing blobs (Bladerunner 2049 look) */}
      <div className="fixed -top-32 left-1/4 w-[45vw] h-[45vw] bg-rose-950/15 rounded-full blur-[140px] pointer-events-none animate-blob-1 z-0"></div>
      <div className="fixed bottom-10 right-1/4 w-[40vw] h-[40vw] bg-emerald-950/10 rounded-full blur-[160px] pointer-events-none animate-blob-2 z-0"></div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#050608]/95 backdrop-blur-md border-b border-slate-900/60 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Brand lockup (Custom transit branch redesign) */}
          <button 
            onClick={() => setActiveTab('HOME')} 
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rose-500 rounded-md p-1 text-left relative z-20"
          >
            <svg 
              className="w-8 h-8 text-rose-500 filter drop-shadow-[0_0_8px_rgba(225,29,72,0.6)] group-hover:scale-105 transition-all duration-300" 
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M50 85V55" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
              <path d="M50 55C35 42 22 36 22 18" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              <path d="M50 55C65 42 78 36 78 18" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              <path d="M50 55V25" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              <circle cx="22" cy="18" r="6" fill="#040508" stroke="currentColor" strokeWidth="4" />
              <circle cx="78" cy="18" r="6" fill="#040508" stroke="currentColor" strokeWidth="4" />
              <circle cx="50" cy="25" r="5" fill="#040508" stroke="currentColor" strokeWidth="3" />
            </svg>
            <div>
              <span className="font-unbounded font-black text-sm tracking-wider text-white">METRO NEXUS</span>
              <p className="text-[8px] font-mono uppercase tracking-[0.25em] text-slate-500">Living Stacks • 2038</p>
            </div>
          </button>

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex relative items-center gap-1 bg-[#090b10] p-1 border border-slate-900 rounded-full">
            {/* Sliding Pill Indicator */}
            <div 
              className="absolute top-1 bottom-1 bg-gradient-to-r from-rose-600 to-rose-500 rounded-full transition-all duration-300 ease-out z-0 opacity-80"
              style={{
                left: `${indicatorCoords.left}px`,
                width: `${indicatorCoords.width}px`
              }}
            />
            {tabsList.map((tab) => (
              <button
                key={tab}
                ref={(el) => (tabRefs.current[tab] = el)}
                onClick={() => {
                  setActiveTab(tab);
                  setMobileMenuOpen(false);
                }}
                className={`relative z-10 px-4 py-2 text-[10px] font-unbounded font-medium tracking-wide uppercase transition-all duration-200 rounded-full focus-visible:outline-none glitch-hover btn-tactile ${
                  activeTab === tab 
                    ? 'text-white font-bold' 
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-500 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rose-500 rounded-md"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-[#050608] border-b border-slate-900/60 p-4 transition-all duration-300 z-30">
            <nav className="flex flex-col gap-2">
              {tabsList.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 font-unbounded text-[10px] uppercase tracking-wider rounded-lg transition-all ${
                    activeTab === tab 
                      ? 'bg-rose-600/10 border border-rose-500/30 text-white font-bold' 
                      : 'text-slate-500 hover:bg-slate-950 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 py-12 relative z-10 space-y-16">
        
        {/* 1. HOME TAB */}
        {activeTab === 'HOME' && (
          <div className="space-y-16 animate-fadeIn">
            {/* Hero Section */}
            <section className="text-center max-w-3xl mx-auto space-y-6 pt-12">
              <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight uppercase bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                The Subway With A <br />
                <span className="bg-gradient-to-r from-rose-500 via-rose-400 to-amber-500 bg-clip-text text-transparent font-extrabold">
                  Visible Soul
                </span>
              </h1>
              <p className="text-slate-400 font-space-grotesk text-xs md:text-sm leading-relaxed max-w-xl mx-auto">
                A railway designed with a visible mind. Set in Delhi-NCR (2038), Metro Nexus explains its routing decisions in plain English and compiles commuter journeys into a living archive of city stories.
              </p>
              
              <div className="pt-4 flex flex-wrap gap-4 justify-center">
                <button 
                  onClick={() => setActiveTab('INTERFACES')}
                  className="px-6 py-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-unbounded text-[10px] uppercase tracking-wider font-semibold shadow-lg shadow-rose-600/15 hover:shadow-rose-600/30 glitch-hover btn-tactile focus-visible:ring-1 focus-visible:ring-rose-500 flex items-center gap-2"
                >
                  Consult the Stacks <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => setActiveTab('NEXUS ID')}
                  className="px-6 py-3 rounded-lg bg-[#0c0e14] hover:bg-slate-900 border border-slate-800 text-slate-300 font-unbounded text-[10px] uppercase tracking-wider font-semibold glitch-hover btn-tactile focus-visible:ring-1 focus-visible:ring-slate-500"
                >
                  Access Nexus ID
                </button>
              </div>
            </section>

            {/* Radical Transparency Live AI Log Box */}
            <section className="max-w-3xl mx-auto">
              <div className="bg-[#0a0c10] border border-slate-900 rounded-2xl overflow-hidden shadow-2xl relative">
                {/* Header panel */}
                <div className="bg-[#0f1118]/80 border-b border-slate-900/60 px-6 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400">SYS_STATUS // RADICAL_TRANSPARENCY</span>
                  </div>
                  <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">STREAM_SYNC_OK</span>
                </div>
                
                {/* Body message content */}
                <div className="p-6 md:p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                    <div className="md:col-span-1 border-r border-slate-900 pr-4 text-left">
                      <span className="text-[8px] font-mono uppercase tracking-widest text-rose-500 font-bold block mb-1">ROUTE_INDEX</span>
                      <h3 className="font-unbounded text-xs font-semibold text-white">
                        {TRANSPARENCY_MESSAGES[currentAlertIndex].line}
                      </h3>
                      <span className="text-[9px] font-mono text-slate-600">{TRANSPARENCY_MESSAGES[currentAlertIndex].timestamp}</span>
                    </div>
                    <div className="md:col-span-3 space-y-2 text-left">
                      <div className="flex items-center gap-1.5 text-[8px] text-amber-500 font-mono">
                        <AlertCircle className="w-3 h-3" /> CORE TELEMETRY DECISION
                      </div>
                      <p className="font-space-grotesk text-xs text-slate-300 leading-relaxed font-light">
                        {TRANSPARENCY_MESSAGES[currentAlertIndex].message}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer instructions */}
                <div className="bg-[#07090d] px-6 py-2.5 border-t border-slate-900/50 flex items-center justify-between text-[9px] text-slate-600">
                  <span className="font-mono uppercase">Decisions explained in plain text, not hidden layers.</span>
                  <div className="flex gap-1.5">
                    {TRANSPARENCY_MESSAGES.map((_, i) => (
                      <button 
                        key={i} 
                        onClick={() => setCurrentAlertIndex(i)}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${currentAlertIndex === i ? 'bg-rose-500 w-3' : 'bg-slate-800'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Core Concepts Grid */}
            <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Concept 1 */}
              <div className="p-8 rounded-2xl bg-[#090b10] border border-slate-900 space-y-4 text-left">
                <span className="font-mono text-[9px] text-slate-600 tracking-wider block">SYS_MODULE // 01</span>
                <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-500 border border-rose-500/20">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold font-unbounded uppercase tracking-wide text-white">Radical Transparency</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  Absolute automation breeds mistrust. Metro Nexus explains its telemetry constraints and routing prioritizations in plain language. If a train slows down, you are told exactly why—whether it is server storage temperature shunts or passenger load distributions in the ahead sectors.
                </p>
              </div>

              {/* Concept 2 */}
              <div className="p-8 rounded-2xl bg-[#090b10] border border-slate-900 space-y-4 text-left">
                <span className="font-mono text-[9px] text-slate-600 tracking-wider block">SYS_MODULE // 02</span>
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold font-unbounded uppercase tracking-wide text-white">The Living Archive</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  Each route is themed around a literary genre suited to its district's spirit. Commuters append reflections, prose, and micro-journals as passenger "pages." When a line accumulates exactly 5,000,000 rides, the volume completes, binds digital ink, and stores itself in the historical gallery, resetting the canvas.
                </p>
              </div>
            </section>
          </div>
        )}

        {/* 2. INTERFACES TAB (The Interactive Archive Centerpiece) */}
        {activeTab === 'INTERFACES' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Tab Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-900/60 pb-6 text-left">
              <div>
                <span className="text-xxs font-mono text-rose-500 uppercase tracking-widest font-bold">i. the archive</span>
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">The Library Room</h2>
                <p className="text-xs text-slate-500 mt-1">Commuter histories bound in digital ink. Select a stack in circulation to consult the ledger.</p>
              </div>

              {/* Reset simulation control buttons */}
              <div className="flex items-center gap-2 self-start md:self-end bg-[#090b10] px-4 py-2.5 rounded-xl border border-slate-900 font-mono">
                <span className="text-[8px] uppercase text-slate-500 mr-2 flex items-center gap-1">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin-slow text-rose-500" /> SYS_SIMULATOR:
                </span>
                <button
                  onClick={() => addManualRide(selectedLineId)}
                  disabled={selectedLine.completed}
                  className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-[9px] font-bold rounded border border-slate-800 hover:scale-105 active:scale-95 transition-all text-slate-300"
                >
                  +1K Rides
                </button>
                <button
                  onClick={() => resetLine(selectedLineId)}
                  className="px-2.5 py-1 bg-rose-950/20 hover:bg-rose-950/40 text-[9px] font-bold rounded border border-rose-500/10 text-rose-400 hover:scale-105 active:scale-95 transition-all"
                >
                  Reset Stack
                </button>
              </div>
            </div>

            {/* Split Screen: Left Bookspines / Right Archive details */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Bookspines (lg:col-span-4) */}
              <div className="lg:col-span-4 space-y-4 text-left">
                <h3 className="font-mono text-[9px] uppercase tracking-widest text-slate-500 font-bold px-1">Stacks in Circulation</h3>
                <div className="space-y-3">
                  {lines.map((line) => {
                    const isSelected = selectedLineId === line.id;
                    const completionPct = (line.rides / line.targetRides) * 100;
                    
                    return (
                      <button
                        key={line.id}
                        onClick={() => setSelectedLineId(line.id)}
                        className={`w-full text-left relative overflow-hidden rounded-xl border p-4 transition-all duration-300 glitch-hover ${
                          isSelected 
                            ? `${line.glowCardClass} ${line.bgWashClass} scale-[1.02]` 
                            : 'bg-[#090b10]/60 border-slate-900/60 hover:border-slate-800/80 hover:scale-[1.01]'
                        } focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rose-500`}
                        style={{
                          boxShadow: isSelected ? undefined : 'inset 0 0 10px rgba(0,0,0,0.5)'
                        }}
                      >
                        {/* Decorative Spine Accent line */}
                        <div 
                          className="absolute left-0 top-0 bottom-0 w-1 transition-all"
                          style={{ backgroundColor: line.color }}
                        />

                        <div className="pl-2 space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-[8px] font-mono uppercase tracking-widest text-slate-500 block">
                                {line.district} // Catalogue No. {line.id.toUpperCase().substring(0,3)}
                              </span>
                              <h4 className="font-unbounded text-xs font-extrabold text-white mt-1">
                                {line.name}
                              </h4>
                            </div>
                            {line.completed ? (
                              <span className="px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[8px] font-mono font-bold">
                                BOUND & SHELVED
                              </span>
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                            )}
                          </div>

                          {/* Progress bar with Rest Shimmer */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-[9px] font-mono text-slate-500">
                              <span>{formatNumber(line.rides)} RIDES</span>
                              <span>{completionPct.toFixed(2)}%</span>
                            </div>
                            <div className="relative w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-900/50">
                              {/* Pulse shimmering indicator overlay */}
                              <div 
                                className="h-full rounded-full transition-all duration-300 relative shimmer-bg"
                                style={{ 
                                  width: `${completionPct}%`,
                                  backgroundColor: line.color,
                                  backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%)',
                                  backgroundSize: '200% 100%'
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Library Room Reading Panel (lg:col-span-8) */}
              <div className="lg:col-span-8 space-y-6 text-left">
                
                {/* Book Details Card header */}
                <div 
                  className={`p-6 rounded-2xl bg-gradient-to-br ${selectedLine.gradientFrom} ${selectedLine.gradientTo} border border-slate-900 overflow-hidden relative`}
                  style={{
                    borderColor: `${selectedLine.color}15`,
                    boxShadow: `0 4px 30px -4px ${selectedLine.color}05`
                  }}
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

                  <div className="flex flex-col md:flex-row gap-6 items-center justify-between relative z-10">
                    <div className="space-y-3 text-center md:text-left">
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#040508]/60 border border-slate-900 text-slate-300 text-[9px] font-mono uppercase tracking-widest">
                        <IconComponent name={selectedLine.icon} className="w-3.5 h-3.5" /> {selectedLine.catalogueNo}
                      </div>
                      <h3 className="text-lg md:text-xl font-black text-white uppercase font-unbounded">
                        The Volume of {selectedLine.district}
                      </h3>
                      <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
                        {selectedLine.rationale}
                      </p>
                    </div>

                    {/* Circular Dial Progress */}
                    <div className="relative w-20 h-20 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle 
                          cx="40" 
                          cy="40" 
                          r="34" 
                          className="text-slate-900" 
                          strokeWidth="4" 
                          stroke="currentColor" 
                          fill="transparent" 
                        />
                        <circle 
                          cx="40" 
                          cy="40" 
                          r="34" 
                          className="transition-all duration-500 ease-out"
                          strokeWidth="4" 
                          strokeDasharray={213.5}
                          strokeDashoffset={213.5 - (213.5 * Math.min(selectedLine.rides, selectedLine.targetRides)) / selectedLine.targetRides}
                          strokeLinecap="round" 
                          stroke={selectedLine.color} 
                          fill="transparent" 
                        />
                      </svg>
                      <div className="absolute text-center font-mono">
                        <span className="text-[10px] font-bold text-white">
                          {((selectedLine.rides / selectedLine.targetRides) * 100).toFixed(0)}%
                        </span>
                        <p className="text-[6px] text-slate-500 font-semibold uppercase tracking-wider block">Fully Bound</p>
                      </div>
                    </div>
                  </div>

                  {/* Complete Archive Banner Overlay */}
                  {selectedLine.completed && (
                    <div className="mt-4 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center justify-between font-mono">
                      <div className="flex items-center gap-2 text-rose-500 text-[10px]">
                        <Check className="w-4 h-4" /> This volume reached 5,000,000 rides and is now Bound & Shelved.
                      </div>
                      <button 
                        onClick={() => resetLine(selectedLine.id)}
                        className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-[9px] uppercase font-bold text-white rounded transition btn-tactile"
                      >
                        Reset Demo
                      </button>
                    </div>
                  )}
                </div>

                {/* Sub-section: Live Journal Entries */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center px-1 font-mono">
                    <h3 className="text-[10px] uppercase tracking-wider text-slate-500 font-bold flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-rose-500" /> ii. Marginalia Feed
                    </h3>
                    <span className="text-[9px] text-slate-600">{getJournalPages(selectedLineId).length} logs catalogued</span>
                  </div>

                  {/* Grid of Journal Cards (Parchment Styled) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getJournalPages(selectedLineId).map((page, idx) => (
                      <article 
                        key={page.id}
                        className={`paper-texture rounded-xl p-5 border text-slate-900 flex flex-col justify-between shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-float`}
                        style={{
                          animationDelay: `${idx * 0.4}s`,
                          animationDuration: '6s',
                          borderLeftColor: selectedLine.color,
                          borderLeftWidth: '4px',
                          borderRightColor: 'rgba(0,0,0,0.06)',
                          borderTopColor: 'rgba(0,0,0,0.06)',
                          borderBottomColor: 'rgba(0,0,0,0.08)'
                        }}
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between font-fraunces">
                            <span className="text-xxs text-[#78716c] font-bold italic tracking-wide">
                              {page.rider}
                            </span>
                            <span className="text-[8px] font-mono text-slate-500 bg-[#e7e5e4] px-1.5 py-0.5 rounded tracking-tight">
                              {formatStampDate(page.timestamp)}
                            </span>
                          </div>
                          <h4 className="font-fraunces text-sm font-black text-slate-900 border-b border-stone-300 pb-1 italic">
                            {page.heading}
                          </h4>
                          <p className="font-fraunces text-xs text-[#292524] leading-relaxed italic pr-2 font-normal pt-1">
                            "{page.body}"
                          </p>
                        </div>
                        <div className="mt-4 pt-2 border-t border-dashed border-stone-300/80 flex justify-between items-center text-[8px] font-mono text-stone-500">
                          <span>Volume {selectedLine.name.split(' ')[0]}</span>
                          <span>Page #{241 + idx}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                {/* Sub-section: Add Passenger note */}
                {!selectedLine.completed ? (
                  <form onSubmit={handleAddNote} className="bg-[#090b10] border border-slate-900 p-6 rounded-2xl space-y-4">
                    <h3 className="font-unbounded text-xs uppercase tracking-wider text-white font-bold flex items-center gap-1.5">
                      <Plus className="w-4 h-4 text-emerald-500" /> Write Marginalia
                    </h3>
                    <p className="text-[10px] text-slate-500">
                      Submit your commute log. It will automatically compile into the <strong>{selectedLine.name}</strong> ledger.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[9px] font-mono uppercase text-slate-500 block mb-1">Passholder Name</label>
                        <input 
                          type="text" 
                          required
                          value={writerName}
                          onChange={(e) => setWriterName(e.target.value)}
                          placeholder="e.g. Rahul Sharma" 
                          className="w-full bg-[#040508] border border-slate-900 rounded-lg px-4 py-2.5 text-xs text-white placeholder-slate-800 focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 focus-visible:outline-none font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono uppercase text-slate-500 block mb-1">Marginalia Heading</label>
                        <input 
                          type="text" 
                          required
                          value={noteHeading}
                          onChange={(e) => setNoteHeading(e.target.value)}
                          placeholder="e.g. Tunnels of Light" 
                          className="w-full bg-[#040508] border border-slate-900 rounded-lg px-4 py-2.5 text-xs text-white placeholder-slate-800 focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 focus-visible:outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[9px] font-mono uppercase text-slate-500 block mb-1">Commuter Prose</label>
                      <textarea 
                        required
                        rows="3"
                        value={noteBody}
                        onChange={(e) => setNoteBody(e.target.value)}
                        placeholder={`Write in the spirit of the ${selectedLine.genre} genre...`}
                        className="w-full bg-[#040508] border border-slate-900 rounded-lg p-4 text-xs text-white placeholder-slate-800 focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 focus-visible:outline-none"
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-unbounded text-[10px] uppercase tracking-wider font-semibold rounded-lg glitch-hover btn-tactile focus-visible:ring-1 focus-visible:ring-emerald-500 transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" /> Append page to Volume
                    </button>
                  </form>
                ) : (
                  <div className="bg-[#090b10] border border-slate-900 p-6 rounded-2xl text-center space-y-2 font-mono">
                    <Check className="w-6 h-6 text-rose-500 mx-auto" />
                    <h3 className="font-unbounded text-xs font-bold text-white uppercase tracking-wider">This Ledger is Sealed</h3>
                    <p className="text-[10px] text-slate-500 max-w-md mx-auto">
                      At 5,000,000 logs, this volume completes. Use the simulator panel to reset and test the writing flow.
                    </p>
                  </div>
                )}

                {/* Sub-section: The Reading Room */}
                <div className="space-y-4 pt-6">
                  <h3 className="font-mono text-[10px] uppercase tracking-widest text-slate-500 font-bold px-1 flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-rose-500" /> iii. The Reading Room
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pastArchives.map((archive) => (
                      <div 
                        key={archive.id}
                        className={`p-5 rounded-xl border bg-[#090b10]/80 border-slate-900 relative overflow-hidden flex flex-col justify-between`}
                      >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.01] rounded-full blur-xl pointer-events-none"></div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center font-mono text-[8px] text-slate-500">
                            <span className="uppercase tracking-widest">{archive.genre}</span>
                            <span className="px-1.5 py-0.5 bg-slate-950 border border-slate-900 rounded text-slate-400">
                              Shelved {archive.completedDate}
                            </span>
                          </div>
                          <h4 className="font-unbounded text-xs font-bold text-white tracking-wide">
                            {archive.name}
                          </h4>
                          <p className="text-[10px] text-slate-400 leading-relaxed font-light">
                            {archive.summary}
                          </p>
                        </div>
                        <div className="mt-4 pt-2 border-t border-slate-900/60 flex items-center justify-between text-[9px] font-mono text-slate-500">
                          <span>Route: {archive.line}</span>
                          <span className="text-white font-bold">{formatNumber(archive.finalRides)} RIDES</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* 3. BRANDING TAB (Visual Pass applied) */}
        {activeTab === 'BRANDING' && (
          <div className="space-y-12 animate-fadeIn text-left">
            {/* Header section */}
            <div className="border-b border-slate-900/60 pb-6 text-center lg:text-left">
              <span className="text-xxs font-mono text-rose-500 uppercase tracking-widest block mb-1">Visual Design System</span>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">Branding Portfolio</h2>
              <p className="text-xs text-slate-500 mt-1 max-w-xl">
                A design system built to balance the cold precision of AI transit telemetry with the warm, humanistic textures of a living library archive.
              </p>
            </div>

            {/* Logo Lockups Section */}
            <section className="space-y-6">
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-slate-500 font-bold">1. Logo Lockups & Brand Marks</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Primary Logo Card */}
                <div className="bg-[#090b10] border border-slate-900 rounded-2xl p-8 flex flex-col justify-between items-center text-center space-y-6 shadow-lg">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Primary Brand Lockup</span>
                  <div className="flex items-center gap-3 p-4 bg-[#040508] rounded-2xl border border-slate-900">
                    <svg className="w-10 h-10 text-rose-500 filter drop-shadow-[0_0_8px_rgba(225,29,72,0.5)]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M50 85V55" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                      <path d="M50 55C35 42 22 36 22 18" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                      <path d="M50 55C65 42 78 36 78 18" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                      <path d="M50 55V25" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                      <circle cx="22" cy="18" r="6" fill="#040508" stroke="currentColor" strokeWidth="4" />
                      <circle cx="78" cy="18" r="6" fill="#040508" stroke="currentColor" strokeWidth="4" />
                      <circle cx="50" cy="25" r="5" fill="#040508" stroke="currentColor" strokeWidth="3" />
                    </svg>
                    <div className="text-left">
                      <span className="font-unbounded font-black text-base tracking-wider text-white">METRO NEXUS</span>
                      <p className="text-[9px] uppercase tracking-[0.25em] text-slate-500 font-mono">Radical Transparency</p>
                    </div>
                  </div>
                  <p className="text-xxs text-slate-400 leading-relaxed max-w-xs font-light">
                    The primary lockup incorporates our geometric emblem, heavy bold display logotype, and system subtitle.
                  </p>
                </div>

                {/* Simplified Icon Card */}
                <div className="bg-[#090b10] border border-slate-900 rounded-2xl p-8 flex flex-col justify-between items-center text-center space-y-6 shadow-lg">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Brand Icon / Mark</span>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-950/20 to-[#040508] border border-slate-800 flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all duration-300">
                    <svg className="w-8 h-8 text-rose-500 filter drop-shadow-[0_0_8px_rgba(225,29,72,0.5)]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M50 85V55" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                      <path d="M50 55C35 42 22 36 22 18" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                      <circle cx="22" cy="18" r="6" fill="#040508" stroke="currentColor" strokeWidth="4" />
                      <circle cx="50" cy="55" r="6" fill="#040508" stroke="currentColor" strokeWidth="4" />
                    </svg>
                  </div>
                  <p className="text-xxs text-slate-400 leading-relaxed max-w-xs font-light">
                    A responsive shortcut icon representing the circular transit boundary and neural intersections.
                  </p>
                </div>
              </div>
            </section>

            <div className="p-4 bg-rose-950/15 border border-rose-500/20 rounded-xl text-center font-mono text-[10px] text-rose-400">
              [SYSTEM NOTE // Step 2. BRANDING Tab Visual pass applied. Detailed swatches and guidelines pending Step 1 review approval]
            </div>
          </div>
        )}

        {/* 4. STATIONS TAB (Visual Pass applied) */}
        {activeTab === 'STATIONS' && (
          <div className="space-y-12 animate-fadeIn text-left">
            {/* Header */}
            <div className="border-b border-slate-900/60 pb-6 text-center lg:text-left">
              <span className="text-xxs font-mono text-rose-500 uppercase tracking-widest block mb-1">Architecture Showcase</span>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">Station Design</h2>
              <p className="text-xs text-slate-500 mt-1 max-w-xl">
                Merging bio-mimetic engineering with digital overlays. Our stations are designed to feel like calm, breathing sanctuaries under the city.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-mono uppercase tracking-wider">
                  Flagship Station
                </span>
                <h3 className="font-unbounded text-xl md:text-2xl font-black uppercase text-white">
                  Root Terminal, Vidya Vihar
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  Serving the Gyan Ganj Coming-of-Age Line, the Root Terminal is a structural marvel. Instead of cold concrete columns, the station is supported by giant bio-engineered banyan-like arches. 
                </p>
              </div>
              <div className="lg:col-span-5">
                <PlaceholderImage 
                  aspect="aspect-[16/10]" 
                  label="Root Terminal Architectural Rendering" 
                  prompt="Interior view of a massive futuristic train station, glowing green banyan tree root pillars supporting high glass ceilings, sun rays casting shadows, bio-luminescent fiber-optics, hyperrealistic, warm lighting" 
                  glowColor="rgba(16,185,129,0.15)"
                />
              </div>
            </div>

            <div className="p-4 bg-rose-950/15 border border-rose-500/20 rounded-xl text-center font-mono text-[10px] text-rose-400">
              [SYSTEM NOTE // Step 3. STATIONS Tab Visual pass applied. Additional concept grids pending Step 1 review approval]
            </div>
          </div>
        )}

        {/* 5. ENVIRONMENTS TAB (Visual Pass applied) */}
        {activeTab === 'ENVIRONMENTS' && (
          <div className="space-y-12 animate-fadeIn text-left">
            {/* Header */}
            <div className="border-b border-slate-900/60 pb-6 text-center lg:text-left">
              <span className="text-xxs font-mono text-rose-500 uppercase tracking-widest block mb-1">Commuter Landscapes</span>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">Environments & Signage</h2>
              <p className="text-xs text-slate-500 mt-1 max-w-xl">
                Experience the design textures of Metro Nexus—from the tactile warmth of the cabin seats to the transparent interface dashboards.
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-4">
              <PlaceholderImage 
                aspect="aspect-[16/9]" 
                label="Signage Display Concept (Transparent vs Opaque)" 
                prompt="Side by side view of clean futuristic train signs displaying detailed AI telemetry reasons in plain english fonts, UI concept art" 
              />
            </div>

            <div className="p-4 bg-rose-950/15 border border-rose-500/20 rounded-xl text-center font-mono text-[10px] text-rose-400">
              [SYSTEM NOTE // Step 4. ENVIRONMENTS Tab Visual pass applied. Platform signage and cab renders pending Step 1 review approval]
            </div>
          </div>
        )}

        {/* 6. EXPERIENCES TAB (Visual Pass applied) */}
        {activeTab === 'EXPERIENCES' && (
          <div className="space-y-12 animate-fadeIn text-left">
            {/* Header */}
            <div className="border-b border-slate-900/60 pb-6 text-center lg:text-left">
              <span className="text-xxs font-mono text-rose-500 uppercase tracking-widest block mb-1">Rider Narratives</span>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">Passenger Experiences</h2>
              <p className="text-xs text-slate-500 mt-1 max-w-xl">
                A narrative walk-through of a typical commuter's day in Delhi-NCR (2038), showing how transparency and literature merge.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <PlaceholderImage 
                aspect="aspect-[16/9]" 
                label="Commute Timeline Visual" 
                prompt="An indian commuter holding a glowing transparent phone, boarding a futuristic train with crimson lights, dark atmospheric environment, rain outside" 
              />
            </div>

            <div className="p-4 bg-rose-950/15 border border-rose-500/20 rounded-xl text-center font-mono text-[10px] text-rose-400">
              [SYSTEM NOTE // Step 4. EXPERIENCES Tab Visual pass applied. Day-in-the-life beats pending Step 1 review approval]
            </div>
          </div>
        )}

        {/* 7. NEXUS ID TAB (New Tab) */}
        {activeTab === 'NEXUS ID' && (
          <div className="space-y-12 animate-fadeIn text-left">
            {/* Header */}
            <div className="border-b border-slate-900/60 pb-6 text-center lg:text-left">
              <span className="text-xxs font-mono text-rose-500 uppercase tracking-widest block mb-1">Rider Identity System</span>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">Nexus ID</h2>
              <p className="text-xs text-slate-500 mt-1 max-w-xl">
                Your holographic digital transit card, linked to local biometric indexing and the Living Archive ledger.
              </p>
            </div>

            {/* Main Holographic ID Card Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: The Card itself */}
              <div className="lg:col-span-6 flex flex-col items-center">
                {/* Holographic Card Frame */}
                <div 
                  className="w-full max-w-md aspect-[1.6/1] bg-[#090b10] border border-slate-900 rounded-2xl p-6 relative overflow-hidden shadow-2xl flex flex-col justify-between group select-none"
                  style={{
                    boxShadow: '0 0 30px -5px rgba(225, 29, 72, 0.15), inset 0 0 20px rgba(0,0,0,0.8)'
                  }}
                >
                  {/* Subtle Grid behind card content */}
                  <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none"></div>

                  {/* Scan Animation overlay */}
                  {scanActive ? (
                    <div className="absolute inset-0 bg-[#040508]/95 z-20 flex flex-col items-center justify-center space-y-4">
                      {/* Spinning biometric iris */}
                      <div className="w-12 h-12 rounded-full border-2 border-dashed border-rose-500 animate-spin flex items-center justify-center">
                        <Fingerprint className="w-6 h-6 text-rose-500/70" />
                      </div>
                      <span className="font-mono text-[9px] tracking-widest text-rose-500 animate-pulse">BIOMETRIC SYNCING: {scanProgress}%</span>
                    </div>
                  ) : (
                    <>
                      {/* Card Header */}
                      <div className="flex justify-between items-start border-b border-slate-900/60 pb-3 relative z-10">
                        <div>
                          <span className="text-[7px] font-mono uppercase tracking-widest text-slate-500 block">System Authority</span>
                          <span className="font-unbounded font-black text-xs text-white">NEXUS RIDER ID</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-mono text-[8px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 rounded">
                          <ShieldCheck className="w-3.5 h-3.5" /> SECURE_TOKEN
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="grid grid-cols-3 gap-4 py-4 relative z-10 font-mono text-left">
                        <div className="col-span-2 space-y-2">
                          <div>
                            <span className="text-[7px] text-slate-500 uppercase block">Rider Name</span>
                            <span className="text-xs font-bold text-white uppercase">ivaan & anvay</span>
                          </div>
                          <div>
                            <span className="text-[7px] text-slate-500 uppercase block">Current Stacks Streak</span>
                            <span className="text-xs font-bold text-rose-500">12 Days</span>
                          </div>
                        </div>
                        <div className="col-span-1 flex flex-col justify-between items-end border-l border-slate-900 pl-4">
                          <div>
                            <span className="text-[7px] text-slate-500 uppercase block text-right">Balance</span>
                            <span className="text-xs font-bold text-white">₹1,450.80</span>
                          </div>
                          <div className="p-1 bg-white/5 border border-slate-900 rounded">
                            <QrCode className="w-7 h-7 text-slate-400" />
                          </div>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="flex justify-between items-end border-t border-slate-900/60 pt-3 relative z-10 font-mono text-[7px] text-slate-500">
                        <span>CLASS: GYAND_GANJ // CLASS_NO_GG2012</span>
                        <span>CREDITS: 4 MARGINALIA</span>
                      </div>
                    </>
                  )}
                </div>

                <button 
                  onClick={() => {
                    setScanActive(true);
                    setScanProgress(0);
                  }}
                  className="mt-6 px-4 py-2 bg-[#090b10] hover:bg-slate-900 border border-slate-900 text-slate-400 hover:text-white rounded-lg font-mono text-[9px] tracking-wider uppercase glitch-hover btn-tactile"
                >
                  Re-Scan Biometrics
                </button>
              </div>

              {/* Right Column: Features explaining the ID */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* Explainers List */}
                <div className="space-y-4">
                  <h3 className="font-mono text-[10px] uppercase tracking-widest text-slate-500 font-bold">Identity & Privacy Policies</h3>
                  <div className="space-y-3 font-space-grotesk">
                    <div className="p-4 bg-[#090b10] border border-slate-900 rounded-xl">
                      <h4 className="text-xs font-bold text-white font-unbounded">Station Scan Entry</h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                        Say goodbye to physical chips. Your biometrics compile a dynamic local key at the station boundary gates, confirming transport credentials instantly without logging locations.
                      </p>
                    </div>

                    <div className="p-4 bg-[#090b10] border border-slate-900 rounded-xl">
                      <h4 className="text-xs font-bold text-white font-unbounded">Authorship Tracking</h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                        Every passenger log or marginalia prose you append is credited to your passholder streak, logging authorship milestones without exposing your name to other riders.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Transparency disclosure box */}
                <div className="p-5 bg-rose-950/10 border border-rose-500/15 rounded-2xl space-y-3 text-left">
                  <div className="flex items-center gap-1.5 font-mono text-[9px] text-rose-500 font-bold uppercase">
                    <AlertCircle className="w-3.5 h-3.5" /> What We Know (Privacy Disclosure)
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                    The Nexus system processes local biometric records solely on your slate. Coordinate data is transformed via SHA-256 hash variables. We do not index location logs or track your movements across nodes. Transparency logs explain all queue decisions without maintaining passenger tracking.
                  </p>
                </div>

              </div>

            </div>

            <div className="p-4 bg-rose-950/15 border border-rose-500/20 rounded-xl text-center font-mono text-[10px] text-rose-400">
              [SYSTEM NOTE // Step 4. NEXUS ID Tab Visual pass applied. Full interactive balance transfers pending Step 1 review approval]
            </div>
          </div>
        )}

      </main>

      {/* Footer lockup (As exactly requested) */}
      <footer className="bg-[#040508] border-t border-slate-900/60 py-8 px-6 text-center relative z-10">
        <div className="max-w-7xl mx-auto space-y-4">
          
          {/* Subtle 8-bit retro train detail */}
          <div className="flex items-center justify-center gap-1 opacity-20">
            <svg className="w-4 h-2.5 text-rose-500" viewBox="0 0 10 6" fill="currentColor">
              <rect x="0" y="1" width="8" height="3" />
              <rect x="8" y="2" width="2" height="2" />
              <rect x="1" y="4" width="1" height="1" />
              <rect x="6" y="4" width="1" height="1" />
            </svg>
          </div>

          <p className="font-space-mono text-[9px] text-slate-600 tracking-wider lowercase">
            a website by ivaan and anvay | byte 2026
          </p>
        </div>
      </footer>
    </div>
  );
}

// Metro Nexus Data Model (2038)
// Centralized content store for the design prototype. 

export const METRO_LINES = [
  {
    id: 'kaal-chakra',
    name: 'Kaal Chakra Line',
    catalogueNo: 'Catalogue No. KC-1988',
    genre: 'Noir / Detective Fiction',
    district: 'Nyay Nagar',
    rationale: 'Iron foundries clank under the shadow of heavy sandstone court halls. Coal dust sweeps across low-light platforms. Here, the tracks hum with industrial history and quiet, rain-slicked secrets.',
    color: '#e11d48', // Crimson
    accentClass: 'text-rose-500',
    bgAccentClass: 'bg-rose-500',
    borderAccentClass: 'border-rose-500/30',
    glowClass: 'glow-crimson',
    hoverGlowClass: 'hover:shadow-[0_0_15px_rgba(225,29,72,0.3)]',
    glowCardClass: 'glow-card-rose',
    bgWashClass: 'bg-rose-950/20 border-rose-500/25',
    gradientFrom: 'from-rose-950/40',
    gradientTo: 'to-rose-900/10',
    icon: 'SearchCode',
    imagePlaceholder: '/assets/stations/kaal-chakra.jpg', // aspect-[16/9]
    initialRides: 4982310,
    targetRides: 5000000,
    journalPages: [
      {
        id: 'kc-1',
        rider: 'Agent 407 (V. Sharma)',
        timestamp: '2038-07-11T20:12:00Z',
        heading: 'Rain on Nyay Nagar Terminal',
        body: 'The rain doesn\'t wash away the soot from the ironworks, it just turns it into ink. Sat on the platform bench of Sector 4. The clock ticked backward for a second—or maybe it was my eyes playing tricks. A woman in a synthetic trench coat dropped a silver ledger. By the time I picked it up, she had boarded the 20:14. Inside, just one line: "The algorithm knows who did it, but it\'s waiting for a jury of its peers."'
      },
      {
        id: 'kc-2',
        rider: 'Inspector Kabir',
        timestamp: '2038-07-11T21:40:00Z',
        heading: 'The 10:45 Ghost Train',
        body: 'Checked the line telemetry logs. The AI flagged a weight discrepancy in the rear cabin. 70kg extra, but cameras show empty seats. Walked through the cabin myself. Cold spot near seat 12-B. The air smelled of old paper and tobacco, even though burning leaves has been outlawed since \'32. Metro Nexus status board read: "Accounting for legacy echoes in transport matrix. No action required."'
      },
      {
        id: 'kc-3',
        rider: 'Anjali D.',
        timestamp: '2038-07-11T18:05:00Z',
        heading: 'Neon and Shadows',
        body: 'Under the flickering lights of the Nyay Nagar courthouse platform, everyone looks guilty. We avoid eyes, staring at our glowing slates. The train arrived like a steel beast slicing the fog. As the doors slid open, a whisper hummed from the ventilation grid: "Justice is automated, but truth is still typed out on carbon paper."'
      },
      {
        id: 'kc-4',
        rider: 'G. Sen',
        timestamp: '2038-07-11T15:22:00Z',
        heading: 'The Case of the Missing Segment',
        body: 'A single coordinate block disappeared from the grid today. A three-minute gaps in memory for anyone riding between Nyay Nagar West and the Iron Foundry. The Nexus terminal apologized in monospace courier text: "A memory leak occurred during indexing. We have filled the gap with a description of autumn leaves."'
      }
    ]
  },
  {
    id: 'gyan-ganj',
    name: 'Gyan Ganj Line',
    catalogueNo: 'Catalogue No. GG-2012',
    genre: 'Coming-of-Age / Adventure',
    district: 'Vidya Vihar',
    rationale: 'Banyan canopy terminal arches filter natural sun. Open quad lawns blend into campuses where student cafes leak chatter. This line records paths of discovery, youth, and sudden transitions.',
    color: '#10b981', // Emerald
    accentClass: 'text-emerald-400',
    bgAccentClass: 'bg-emerald-500',
    borderAccentClass: 'border-emerald-500/30',
    glowClass: 'glow-emerald',
    hoverGlowClass: 'hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]',
    glowCardClass: 'glow-card-emerald',
    bgWashClass: 'bg-emerald-950/20 border-emerald-500/25',
    gradientFrom: 'from-emerald-950/40',
    gradientTo: 'to-emerald-900/10',
    icon: 'Compass',
    imagePlaceholder: '/assets/stations/root-terminal.jpg',
    initialRides: 3845012,
    targetRides: 5000000,
    journalPages: [
      {
        id: 'gg-1',
        rider: 'Rohan (Sophomore, Biotech)',
        timestamp: '2038-07-11T09:15:00Z',
        heading: 'First Day at the Root Terminal',
        body: 'Walking into Root Terminal is like entering a mechanical forest. The arches look like massive banyan roots, but they glow with soft fiber-optic sap. I was terrified of my chemistry mid-term, but the screen on the train cabinet showed: "Stressing won\'t change the molecular structure. Take a deep breath." I laughed. Maybe 2038 isn\'t so bad.'
      },
      {
        id: 'gg-2',
        rider: 'Sneha Roy',
        timestamp: '2038-07-11T16:30:00Z',
        heading: 'Lost in the Quiet Car',
        body: 'Ended up on the Gyan Ganj express line. There were three of us in the lounge. We didn\'t talk, but we ended up playing an impromptu game of digital chess projected onto the wooden table between us. I lost in 12 moves to a freshman in a yellow hoodie, but she left her notebook behind. I hope I run into her tomorrow at the Quad.'
      },
      {
        id: 'gg-3',
        rider: 'Priya K.',
        timestamp: '2038-07-11T13:00:00Z',
        heading: 'The Green Canvas',
        body: 'The train windows are digital overlays today; they showcase drawings of student art projects. The banyan-like structural columns of the station hummed gently when the train pulled in. It felt less like a commute and more like stepping through a gallery of our own futures.'
      },
      {
        id: 'gg-4',
        rider: 'Kabir Dev',
        timestamp: '2038-07-11T11:45:00Z',
        heading: 'The Adventure of the Wrong Stop',
        body: 'Missed my stop because I was reading. Got off at a tiny, sunlit platform surrounded by vertical moss gardens. Met an elderly professor who showed me a secret pathway to the old library wing. Metro Nexus message on my slate: "Detours are just chapters we forgot to outline in our draft."'
      }
    ]
  },
  {
    id: 'silicon-sarai',
    name: 'Silicon Sarai Line',
    catalogueNo: 'Catalogue No. SS-2030',
    genre: 'Hard Science Fiction',
    district: 'Circuit Colony',
    rationale: 'Cleanrooms, server hubs, and cold glass towers. High-speed rail corridors cutting through hardware server banks. Commuter engineers code in real-time under glowing cobalt server racks.',
    color: '#3b82f6', // Sapphire Blue
    accentClass: 'text-blue-400',
    bgAccentClass: 'bg-blue-500',
    borderAccentClass: 'border-blue-500/30',
    glowClass: 'glow-sapphire',
    hoverGlowClass: 'hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]',
    glowCardClass: 'glow-card-sapphire',
    bgWashClass: 'bg-blue-950/20 border-blue-500/25',
    gradientFrom: 'from-blue-950/40',
    gradientTo: 'to-blue-900/10',
    icon: 'Cpu',
    imagePlaceholder: '/assets/stations/silicon-sarai.jpg',
    initialRides: 4999912,
    targetRides: 5000000,
    journalPages: [
      {
        id: 'ss-1',
        rider: 'Dev-9 (Core Eng)',
        timestamp: '2038-07-11T08:00:00Z',
        heading: 'Telemetry Shunts',
        body: 'Optimized the shunt routines in the transit core. 0.04% increase in energy recaptured during brake cycle. The central AI did not thank me. Instead, it displayed the raw equation of my change on the cabin terminal. A sterile sort of gratitude. We fly past glass server stacks that pulse blue in synchronization with our velocity.'
      },
      {
        id: 'ss-2',
        rider: 'Zoya H.',
        timestamp: '2038-07-11T19:22:00Z',
        heading: 'Quantum Intersections',
        body: 'The train stopped in the deep transit tunnel for exactly 8 seconds. The transparency banner displayed: "Holding position to prevent packet collision in physical routing buffers. 14 trains in queuing queue." We are data packets, flowing through silicon capillaries. We move, we stop, we compile.'
      },
      {
        id: 'ss-3',
        rider: 'S. Alva',
        timestamp: '2038-07-11T22:10:00Z',
        heading: 'Observations from Node 88',
        body: 'Looking out the window, the quantum compute towers glow with high-intensity ultraviolet. The system state display tells us: "Error rate at 10^-12. Normal operation." It feels safe here, insulated by layers of carbon shielding and logical operators.'
      },
      {
        id: 'ss-4',
        rider: 'Matrix_Rider',
        timestamp: '2038-07-11T23:59:00Z',
        heading: 'Almost Compiled',
        body: 'The ride counter is hovering just below the 5 million mark. The air is electric. When the threshold breaks, this whole line\'s ledger will freeze, archived forever, and a new book will start. I want to be the one on the train when it rolls over.'
      }
    ]
  },
  {
    id: 'rangmahal',
    name: 'Rangmahal Line',
    catalogueNo: 'Catalogue No. RM-2018',
    genre: 'Magical Realism',
    district: 'Kalakriti Quarter',
    rationale: 'Open amphitheaters, hand-painted murals, and street buskers on stone steps. Shadows dance on cabin walls. Where real-world train speeds collide with floating dreamscapes.',
    color: '#f59e0b', // Amber Gold
    accentClass: 'text-amber-400',
    bgAccentClass: 'bg-amber-500',
    borderAccentClass: 'border-amber-500/30',
    glowClass: 'glow-amber',
    hoverGlowClass: 'hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]',
    glowCardClass: 'glow-card-amber',
    bgWashClass: 'bg-amber-950/20 border-amber-500/25',
    gradientFrom: 'from-amber-950/40',
    gradientTo: 'to-amber-900/10',
    icon: 'Sparkles',
    imagePlaceholder: '/assets/stations/rangmahal.jpg',
    initialRides: 2110294,
    targetRides: 5000000,
    journalPages: [
      {
        id: 'rm-1',
        rider: 'Maya Sen',
        timestamp: '2038-07-11T12:30:00Z',
        heading: 'The Floating Teacup',
        body: 'Ordered lavender tea at Kalakriti Quarter platform cafe. When the train sped past, the wind did not blow the cup over; instead, it hovered an inch off the glass table for three seconds, spinning slowly. Nobody gasped. We just watched it settle back down. The Nexus announcer sang: "The laws of gravity have been temporarily suspended to honor a beautiful melody."'
      },
      {
        id: 'rm-2',
        rider: 'D. Banerji',
        timestamp: '2038-07-11T17:45:00Z',
        heading: 'Whispers in the Paint',
        body: 'The mural on Platform 3 was painting itself today. I saw a flock of green parrots fly from the canvas, flutter around the light fixtures, and dissolve into gold dust when the train doors opened. A child caught the dust in their palm, and it turned into paper confetti.'
      },
      {
        id: 'rm-3',
        rider: 'Amina',
        timestamp: '2038-07-11T15:10:00Z',
        heading: 'Shadows that Linger',
        body: 'Left my shadow behind on the train. I stood up to exit, but my shadow remained seated, reading the poetry projection on the door. The system sent an alert to my glasses: "Your shadow has requested to ride two more stops. It will rejoin you at the market."'
      },
      {
        id: 'rm-4',
        rider: 'Vikram Singh',
        timestamp: '2038-07-11T20:55:00Z',
        heading: 'An Autumn Breeze Underground',
        body: 'A gust of wind smelled of crushed cardamom and dry marigolds blew through the deep underground platform, though we are 60 meters below bedrock. The station status indicator changed to: "A dream of the countryside has leaked into the ventilation shafts. Enjoy the harvest."'
      }
    ]
  },
  {
    id: 'purani-haveli',
    name: 'Purani Haveli Line',
    catalogueNo: 'Catalogue No. PH-1857',
    genre: 'Gothic / Mythology',
    district: 'Chandni Kila',
    rationale: 'Red stone archways built centuries ago, now retrofitted with fiber-optic veins. Tunnel wind carries whispering relics and legacy stamps. Ancient memories tracing the new NCR soil.',
    color: '#8b5cf6', // Amethyst Purple
    accentClass: 'text-violet-400',
    bgAccentClass: 'bg-violet-500',
    borderAccentClass: 'border-violet-500/30',
    glowClass: 'glow-amethyst',
    hoverGlowClass: 'hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]',
    glowCardClass: 'glow-card-amethyst',
    bgWashClass: 'bg-violet-950/20 border-violet-500/25',
    gradientFrom: 'from-violet-950/40',
    gradientTo: 'to-violet-900/10',
    icon: 'BookOpen',
    imagePlaceholder: '/assets/stations/purani-haveli.jpg',
    initialRides: 4120938,
    targetRides: 5000000,
    journalPages: [
      {
        id: 'ph-1',
        rider: 'Rajmata (Retired Historiographer)',
        timestamp: '2038-07-11T14:15:00Z',
        heading: 'The Echo Chamber',
        body: 'The Chandni Kila tunnels were carved by human hands 200 years ago, then reinforced by carbon fibers yesterday. As we rode, the walls seemed to chant. The digital interface showed a translation of the brick patterns: "We are the bones of a kingdom that forgot its own name. Do not ride too fast, lest you wake the ancestors."'
      },
      {
        id: 'ph-2',
        rider: 'Ishaan G.',
        timestamp: '2038-07-11T18:40:00Z',
        heading: 'The Lantern Carrier',
        body: 'Saw a figure in an old silk tunic standing in the dark archway between the tracks, holding a flickering brass lamp. The train did not slow down, but the AI console in our carriage flashed: "Acknowledging pathfinder ghost at junction 12. Lantern light validated at 45 lumens."'
      },
      {
        id: 'ph-3',
        rider: 'Meera B.',
        timestamp: '2038-07-11T22:30:00Z',
        heading: 'Ancestral Ink',
        body: 'Touched the stone pillar at Chandni Kila. The digital ink in my sleeve screen began writing family names from five generations ago. The station console whispered: "This stone remembers everyone who has ever touched it. Welcome home, descendant."'
      },
      {
        id: 'ph-4',
        rider: 'Old_Soul_38',
        timestamp: '2038-07-11T11:00:00Z',
        heading: 'A Gothic Silence',
        body: 'A silence fell over the cabin, so thick that even the hum of the electric engines seemed to mute itself. The screen read: "Observing 30 seconds of quiet in memory of the poet who died on this platform in 1899. The tracks will sing for him shortly."'
      }
    ]
  }
];

export const PAST_ARCHIVES = [
  {
    id: 'archived-1',
    name: 'The First Folio: Chandni Kila Origins',
    line: 'Purani Haveli Line',
    genre: 'Gothic / Mythology',
    completedDate: '04 Nov 2037',
    finalRides: 5000000,
    summary: 'A collection of 14,200 short accounts of ancestral dreams and shadow encounters under the old city gates. Archived in copper-wrapped quantum drives.',
    coverColor: 'bg-violet-950/40 border-violet-500/30 text-violet-300'
  },
  {
    id: 'archived-2',
    name: 'The Chrome Chronicles: Vol. IV',
    line: 'Silicon Sarai Line',
    genre: 'Hard Science Fiction',
    completedDate: '19 Mar 2038',
    finalRides: 5000000,
    summary: 'A compilation of micro-logs detailing server maintenance runs, hardware-human symbioses, and code glitches written by commuter engineers.',
    coverColor: 'bg-blue-950/40 border-blue-500/30 text-blue-300'
  }
];

export const TRANSPARENCY_MESSAGES = [
  {
    id: 'msg-1',
    line: 'Kaal Chakra',
    message: 'Rerouting train #407 around Sector 4 thermal vent. Delay is +2.4 minutes. System explanation: A steam pipe seal has split; we are venting heat and diverting traffic to prevent cabin temperature climbs.',
    timestamp: 'Just now'
  },
  {
    id: 'msg-2',
    line: 'Silicon Sarai',
    message: 'Throttling core rail speed by 8% between Nodes 12 & 15. Delay is +45 seconds. System explanation: High-intensity calculations in Node 88 are stressing regional power banks. We slow to load-balance current draw.',
    timestamp: '1 min ago'
  },
  {
    id: 'msg-3',
    line: 'Gyan Ganj',
    message: 'Holding passenger doors for 30s at Root Terminal. Delay is +30 seconds. System explanation: A dense student group from the biotech department is transferring from the bus bays. We wait to avoid campus attendance misses.',
    timestamp: '3 mins ago'
  },
  {
    id: 'msg-4',
    line: 'Rangmahal',
    message: 'Rendering virtual stardust overlay on cabin screens. Delay is 0 seconds. System explanation: Displaying graduation media for local art academy. System priority remains normal.',
    timestamp: '5 mins ago'
  }
];

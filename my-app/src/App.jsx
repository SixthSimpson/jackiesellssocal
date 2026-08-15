import { useEffect, useState } from 'react'
import './App.css'
import logo from '/logo.svg'

const profilePhoto = `${import.meta.env.BASE_URL}Jackie_Profile.JPG`

const AGENT = {
  name: 'Jacquiline Horn',
  brokerage: 'Power Brokers',
  email: 'listedbyjackie@gmail.com',
  phone: '310-880-0846',
  phoneHref: 'tel:+13108800846',
  dre: '01492854',
  area: 'Los Angeles',
}

const SERVICES = [
  {
    title: 'Selling Your Home',
    body:
      'Strategic pricing, professional staging guidance, and marketing that puts your property in front of the right buyers across Los Angeles.',
    icon: 'sign',
  },
  {
    title: 'Finding Your Home',
    body:
      'From the first showing to the closing table, I help you navigate one of LA’s most competitive markets with confidence and clarity.',
    icon: 'key',
  },
  {
    title: 'Market Expertise',
    body:
      'A lifetime in these neighborhoods and a decade of deals — trends, timing, and the negotiation experience to get you the best possible outcome.',
    icon: 'chart',
  },
]

const STATS = [
  { value: '10+', label: 'Years of experience' },
  { value: 'LA', label: 'Local market specialist' },
  { value: '1:1', label: 'Personal service, every client' },
]

const NEIGHBORHOODS = [
  {
    title: 'The Hills & Canyons',
    blurb:
      'Hillside homes and view lots above the boulevard — from Los Feliz and the Hollywood Hills out to the quiet canyons.',
    art: 'hills',
    tags: 'Views · Canyons · Character',
  },
  {
    title: 'Downtown & Central LA',
    blurb:
      'Converted lofts and modern condos in the walkable heart of the city, with the Arts District right at the doorstep.',
    art: 'loft',
    tags: 'Lofts · Condos · Walkable',
  },
  {
    title: 'The Westside & Coast',
    blurb:
      'Coastal living from the Venice walk-streets to Santa Monica, where the ocean is part of the daily routine.',
    art: 'coast',
    tags: 'Coastal · Walk-streets · Ocean air',
  },
]

/* ── Button icons ──────────────────────────────────────────── */
function KeyIcon() {
  return (
    <svg className="ico ico-key" viewBox="0 0 32 32" width="19" height="19" aria-hidden="true">
      <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <path
        d="M16 16 L28 28 M23 23 L27 19 M19 27 L23 23"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg className="ico ico-phone" viewBox="0 0 32 32" width="19" height="19" aria-hidden="true">
      <path
        d="M7 4 L12 4 L14 11 L10.5 13.5 C12 17 15 20 18.5 21.5 L21 18 L28 20 L28 25 C28 26.7 26.7 28 25 28 C13.4 28 4 18.6 4 7 C4 5.3 5.3 4 7 4 Z"
        fill="currentColor"
      />
    </svg>
  )
}

function DoorIcon() {
  return (
    <svg className="ico ico-door" viewBox="0 0 32 32" width="19" height="19" aria-hidden="true">
      <path
        d="M4 30 L4 12 L16 3 L28 12 L28 30 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <rect className="door-leaf" x="12" y="17" width="8" height="13" rx="1" fill="currentColor" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg className="ico ico-arrow" viewBox="0 0 32 32" width="17" height="17" aria-hidden="true">
      <path
        d="M5 16 L26 16 M18 8 L26 16 L18 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg className="ico ico-send" viewBox="0 0 32 32" width="19" height="19" aria-hidden="true">
      <path d="M28 4 L3 14 L13 17.5 L17 28 Z" fill="currentColor" />
    </svg>
  )
}

/* ── Service icons ─────────────────────────────────────────── */
function ServiceIcon({ name }) {
  if (name === 'sign') {
    return (
      <svg viewBox="0 0 64 64" width="54" height="54" className="svc-icon" aria-hidden="true">
        <rect x="9" y="13" width="46" height="29" rx="4" fill="var(--navy-700)" />
        <rect x="14" y="18" width="36" height="19" rx="2" fill="none" stroke="var(--gold-soft)" strokeWidth="1.5" />
        <text
          x="32" y="32" textAnchor="middle" fontSize="12" letterSpacing="1.5"
          fill="var(--gold-soft)" fontFamily="Georgia, serif"
        >
          SOLD
        </text>
        <rect x="30" y="42" width="4" height="15" fill="var(--azure)" />
        <rect x="22" y="56" width="20" height="3" rx="1.5" fill="var(--azure)" />
      </svg>
    )
  }
  if (name === 'key') {
    return (
      <svg viewBox="0 0 64 64" width="54" height="54" className="svc-icon" aria-hidden="true">
        <path d="M32 9 L57 30 L51 30 L51 55 L13 55 L13 30 L7 30 Z" fill="var(--navy-700)" />
        <rect x="26" y="38" width="12" height="17" rx="1.5" fill="var(--gold-soft)" />
        <rect className="svc-accent" x="21" y="24" width="9" height="9" rx="1.5" fill="var(--azure-light)" />
        <rect className="svc-accent" x="34" y="24" width="9" height="9" rx="1.5" fill="var(--azure-light)" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 64 64" width="54" height="54" className="svc-icon" aria-hidden="true">
      <circle cx="32" cy="32" r="23" fill="none" stroke="var(--navy-700)" strokeWidth="3" />
      <path
        d="M18 40 L27 29 L34 35 L46 20"
        fill="none"
        stroke="var(--azure)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle className="svc-accent" cx="46" cy="20" r="4.5" fill="var(--gold)" />
    </svg>
  )
}

/* ── Neighborhood card artwork ─────────────────────────────── */
function CardArt({ kind }) {
  if (kind === 'hills') {
    return (
      <svg viewBox="0 0 320 190" aria-hidden="true">
        <rect width="320" height="190" fill="#E4F1FA" />
        <circle cx="266" cy="44" r="20" fill="var(--gold-soft)" opacity="0.75" />
        <path d="M0 190 L0 128 Q88 78 178 126 Q258 164 320 116 L320 190 Z" fill="#9BC3DF" />
        <path d="M0 190 L0 152 Q90 118 182 152 Q256 180 320 150 L320 190 Z" fill="#6B9BC4" />
        <g className="card-house">
          <polygon points="160,58 234,110 86,110" fill="var(--navy-700)" />
          <rect x="102" y="110" width="116" height="68" rx="2" fill="var(--paper)" />
          <rect x="147" y="138" width="26" height="40" rx="2" fill="var(--gold)" />
          <rect x="114" y="124" width="23" height="21" rx="2" fill="var(--azure-light)" />
          <rect x="183" y="124" width="23" height="21" rx="2" fill="var(--azure-light)" />
          <rect x="204" y="66" width="13" height="28" fill="var(--navy)" />
        </g>
        {/* Positioning lives on an outer group: a CSS transform on the animated
            group would otherwise override the SVG transform attribute. */}
        <g transform="translate(52,92)">
          <g className="palm-sway">
            <path d="M0 94 Q6 40 2 6" stroke="#9A8B72" strokeWidth="7" fill="none" strokeLinecap="round" />
            <g fill="#4F8F8A">
              <path d="M2 6 Q-28 -8 -44 8 Q-20 6 2 6 Z" />
              <path d="M2 6 Q32 -8 48 8 Q24 6 2 6 Z" />
              <path d="M2 6 Q-14 -26 -30 -22 Q-8 -8 2 6 Z" />
              <path d="M2 6 Q18 -26 34 -22 Q12 -8 2 6 Z" />
            </g>
          </g>
        </g>
      </svg>
    )
  }
  if (kind === 'loft') {
    return (
      <svg viewBox="0 0 320 190" aria-hidden="true">
        <rect width="320" height="190" fill="#DCEBF6" />
        <circle cx="54" cy="46" r="18" fill="var(--gold-soft)" opacity="0.7" />
        <g fill="#9BC3DF">
          <rect x="18" y="88" width="42" height="102" />
          <rect x="250" y="68" width="48" height="122" />
        </g>
        <g fill="#6B9BC4">
          <rect x="60" y="112" width="30" height="78" />
          <rect x="228" y="98" width="26" height="92" />
        </g>
        <g className="card-house">
          <rect x="94" y="38" width="132" height="152" fill="var(--navy-700)" />
          <rect x="90" y="30" width="140" height="10" rx="2" fill="var(--navy)" />
          <g fill="var(--gold-soft)">
            <rect x="108" y="54" width="22" height="24" rx="1.5" />
            <rect x="149" y="54" width="22" height="24" rx="1.5" />
            <rect x="190" y="54" width="22" height="24" rx="1.5" />
            <rect x="108" y="94" width="22" height="24" rx="1.5" />
            <rect x="190" y="94" width="22" height="24" rx="1.5" />
            <rect x="108" y="134" width="22" height="24" rx="1.5" />
            <rect x="190" y="134" width="22" height="24" rx="1.5" />
          </g>
          <rect x="149" y="94" width="22" height="24" rx="1.5" fill="var(--azure-light)" />
          <rect x="147" y="138" width="26" height="52" rx="2" fill="var(--azure)" />
        </g>
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 320 190" aria-hidden="true">
      <rect width="320" height="190" fill="#E4F1FA" />
      <circle cx="270" cy="42" r="19" fill="var(--gold-soft)" opacity="0.8" />
      <path d="M0 190 L0 146 Q80 134 160 146 Q240 158 320 144 L320 190 Z" fill="var(--azure-light)" />
      <path d="M0 190 L0 164 Q80 154 160 164 Q240 174 320 162 L320 190 Z" fill="var(--sand)" />
      <g className="card-house">
        <polygon points="150,54 224,104 76,104" fill="var(--azure)" />
        <rect x="92" y="104" width="116" height="62" rx="2" fill="var(--paper)" />
        <rect x="136" y="128" width="24" height="38" rx="2" fill="var(--navy-700)" />
        <rect x="104" y="116" width="21" height="19" rx="2" fill="var(--gold-soft)" />
        <rect x="175" y="116" width="21" height="19" rx="2" fill="var(--gold-soft)" />
      </g>
      <g transform="translate(272,98)">
        <g className="palm-sway">
          <path d="M0 68 Q5 30 2 4" stroke="#9A8B72" strokeWidth="6" fill="none" strokeLinecap="round" />
          <g fill="#4F8F8A">
            <path d="M2 4 Q-24 -8 -38 6 Q-16 4 2 4 Z" />
            <path d="M2 4 Q28 -8 42 6 Q20 4 2 4 Z" />
            <path d="M2 4 Q-10 -24 -26 -20 Q-6 -8 2 4 Z" />
            <path d="M2 4 Q16 -24 30 -20 Q10 -8 2 4 Z" />
          </g>
        </g>
      </g>
    </svg>
  )
}

/* ── Fixed sky: morning → afternoon → dusk ─────────────────── */
function Sky() {
  return (
    <div className="sky" aria-hidden="true">
      <div className="sky-layer sky-day" />
      <div className="sky-layer sky-mid" />
      <div className="sky-layer sky-dusk" />
      <svg className="sun" viewBox="0 0 200 200" width="150" height="150">
        <g className="sun-rays">
          <g fill="none" stroke="var(--gold-soft)" strokeWidth="4" strokeLinecap="round" opacity="0.8">
            <line x1="100" y1="14" x2="100" y2="34" />
            <line x1="100" y1="166" x2="100" y2="186" />
            <line x1="14" y1="100" x2="34" y2="100" />
            <line x1="166" y1="100" x2="186" y2="100" />
            <line x1="39" y1="39" x2="53" y2="53" />
            <line x1="147" y1="147" x2="161" y2="161" />
            <line x1="39" y1="161" x2="53" y2="147" />
            <line x1="147" y1="53" x2="161" y2="39" />
          </g>
        </g>
        <circle cx="100" cy="100" r="48" fill="var(--gold-soft)" opacity="0.45" />
        <circle cx="100" cy="100" r="38" fill="#F3DDB4" />
      </svg>
      {[1, 2, 3].map((n) => (
        <svg key={n} className={`cloud cloud-${n}`} viewBox="0 0 220 90" width={220 - n * 40} height={90 - n * 15}>
          <g fill="#FFFFFF" opacity={0.82 - n * 0.14}>
            <ellipse cx="60" cy="60" rx="55" ry="26" />
            <ellipse cx="120" cy="45" rx="48" ry="30" />
            <ellipse cx="170" cy="62" rx="45" ry="22" />
          </g>
        </svg>
      ))}
    </div>
  )
}

/* ── Parallax scene bands ──────────────────────────────────── */
function SceneDowntown() {
  return (
    <div className="scene scene-downtown" aria-hidden="true">
      <svg className="p-layer" data-speed="0.12" viewBox="0 0 1440 260" preserveAspectRatio="xMidYMax slice">
        <g fill="#A8C8E0" opacity="0.55">
          <rect x="40" y="120" width="70" height="140" />
          <rect x="150" y="80" width="60" height="180" />
          <rect x="260" y="140" width="90" height="120" />
          <rect x="420" y="60" width="55" height="200" />
          <rect x="530" y="110" width="80" height="150" />
          <rect x="700" y="40" width="65" height="220" />
          <rect x="830" y="130" width="75" height="130" />
          <rect x="960" y="70" width="60" height="190" />
          <rect x="1080" y="120" width="85" height="140" />
          <rect x="1230" y="90" width="60" height="170" />
          <rect x="1340" y="140" width="70" height="120" />
        </g>
      </svg>
      <svg className="p-layer" data-speed="0.28" viewBox="0 0 1440 240" preserveAspectRatio="xMidYMax slice">
        <g fill="#6B9BC4" opacity="0.8">
          <rect x="0" y="110" width="80" height="130" />
          <rect x="120" y="60" width="70" height="180" />
          <polygon points="270,240 270,90 305,50 340,90 340,240" />
          <rect x="420" y="100" width="90" height="140" />
          <rect x="580" y="30" width="60" height="210" />
          <circle cx="610" cy="26" r="10" />
          <rect x="720" y="90" width="75" height="150" />
          <rect x="860" y="50" width="65" height="190" />
          <rect x="990" y="120" width="95" height="120" />
          <rect x="1140" y="70" width="70" height="170" />
          <rect x="1290" y="110" width="80" height="130" />
        </g>
      </svg>
      <svg className="p-layer" data-speed="0.5" viewBox="0 0 1440 220" preserveAspectRatio="xMidYMax slice">
        <g fill="#21345E">
          <rect x="20" y="80" width="95" height="140" />
          <rect x="170" y="40" width="75" height="180" />
          <rect x="300" y="100" width="110" height="120" />
          <polygon points="480,220 480,60 520,20 560,60 560,220" />
          <rect x="640" y="70" width="85" height="150" />
          <rect x="790" y="30" width="70" height="190" />
          <rect x="920" y="90" width="100" height="130" />
          <rect x="1090" y="50" width="80" height="170" />
          <rect x="1240" y="95" width="90" height="125" />
          <rect x="1390" y="60" width="50" height="160" />
        </g>
        <g fill="#E4C489" className="windows">
          <rect x="40" y="100" width="8" height="10" /><rect x="60" y="100" width="8" height="10" />
          <rect x="40" y="125" width="8" height="10" /><rect x="80" y="125" width="8" height="10" />
          <rect x="190" y="60" width="8" height="10" /><rect x="210" y="85" width="8" height="10" />
          <rect x="190" y="110" width="8" height="10" /><rect x="325" y="120" width="8" height="10" />
          <rect x="350" y="145" width="8" height="10" /><rect x="500" y="80" width="8" height="10" />
          <rect x="525" y="105" width="8" height="10" /><rect x="660" y="90" width="8" height="10" />
          <rect x="690" y="115" width="8" height="10" /><rect x="810" y="55" width="8" height="10" />
          <rect x="835" y="80" width="8" height="10" /><rect x="945" y="110" width="8" height="10" />
          <rect x="975" y="135" width="8" height="10" /><rect x="1110" y="75" width="8" height="10" />
          <rect x="1140" y="100" width="8" height="10" /><rect x="1265" y="115" width="8" height="10" />
        </g>
      </svg>
    </div>
  )
}

function SceneHollywood() {
  return (
    <div className="scene scene-hollywood" aria-hidden="true">
      <svg className="p-layer" data-speed="0.15" viewBox="0 0 1440 300" preserveAspectRatio="xMidYMax slice">
        <path
          d="M0 300 L0 190 Q180 90 380 170 Q560 240 760 150 Q980 60 1180 160 Q1320 230 1440 180 L1440 300 Z"
          fill="#5D89B5"
          opacity="0.45"
        />
      </svg>
      <svg className="p-layer" data-speed="0.3" viewBox="0 0 1440 300" preserveAspectRatio="xMidYMax slice">
        <path
          d="M0 300 L0 220 Q220 130 460 210 Q660 270 900 190 Q1140 110 1440 220 L1440 300 Z"
          fill="#2A4368"
          opacity="0.88"
        />
        <g className="holly-sign" fill="#F4F9FC" fontFamily="Arial Black, Arial, sans-serif" fontSize="32" fontWeight="900">
          <text x="960" y="160" transform="rotate(-4 960 160)">H</text>
          <text x="998" y="156" transform="rotate(-3 998 156)">O</text>
          <text x="1038" y="153" transform="rotate(-2 1038 153)">L</text>
          <text x="1070" y="151">L</text>
          <text x="1102" y="150" transform="rotate(1 1102 150)">Y</text>
          <text x="1140" y="151" transform="rotate(2 1140 151)">W</text>
          <text x="1188" y="153" transform="rotate(3 1188 153)">O</text>
          <text x="1228" y="156" transform="rotate(4 1228 156)">O</text>
          <text x="1268" y="160" transform="rotate(5 1268 160)">D</text>
        </g>
      </svg>
      <svg className="star star-a" viewBox="0 0 24 24" width="20" height="20">
        <path d="M12 2 L14.5 9 L22 9 L16 13.5 L18 21 L12 16.5 L6 21 L8 13.5 L2 9 L9.5 9 Z" fill="var(--gold-soft)" />
      </svg>
      <svg className="star star-b" viewBox="0 0 24 24" width="14" height="14">
        <path d="M12 2 L14.5 9 L22 9 L16 13.5 L18 21 L12 16.5 L6 21 L8 13.5 L2 9 L9.5 9 Z" fill="#FFFFFF" />
      </svg>
      <svg className="star star-c" viewBox="0 0 24 24" width="17" height="17">
        <path d="M12 2 L14.5 9 L22 9 L16 13.5 L18 21 L12 16.5 L6 21 L8 13.5 L2 9 L9.5 9 Z" fill="var(--gold-soft)" />
      </svg>
    </div>
  )
}

function SceneCoast() {
  return (
    <div className="scene scene-beach" aria-hidden="true">
      <svg className="p-layer" data-speed="0.1" viewBox="0 0 1440 260" preserveAspectRatio="xMidYMax slice">
        <g stroke="#1B2A4A" strokeWidth="9" opacity="0.9">
          <line x1="1080" y1="150" x2="1080" y2="260" />
          <line x1="1140" y1="150" x2="1140" y2="260" />
          <line x1="1200" y1="150" x2="1200" y2="260" />
          <line x1="1260" y1="150" x2="1260" y2="260" />
          <line x1="1320" y1="150" x2="1320" y2="260" />
          <line x1="1380" y1="150" x2="1380" y2="260" />
        </g>
        <rect x="1050" y="134" width="390" height="18" rx="4" fill="#21345E" />
        <g className="ferris" transform="translate(1210,88)">
          <g className="ferris-spin">
            <circle r="42" fill="none" stroke="#21345E" strokeWidth="4" />
            <g stroke="#21345E" strokeWidth="2.5">
              <line x1="-42" y1="0" x2="42" y2="0" /><line x1="0" y1="-42" x2="0" y2="42" />
              <line x1="-30" y1="-30" x2="30" y2="30" /><line x1="-30" y1="30" x2="30" y2="-30" />
            </g>
            <g fill="var(--gold)">
              <circle cx="0" cy="-42" r="6" /><circle cx="0" cy="42" r="6" />
              <circle cx="-42" cy="0" r="6" /><circle cx="42" cy="0" r="6" />
              <circle cx="-30" cy="-30" r="6" /><circle cx="30" cy="30" r="6" />
              <circle cx="-30" cy="30" r="6" /><circle cx="30" cy="-30" r="6" />
            </g>
          </g>
          <polygon points="-14,44 14,44 0,0" fill="#1B2A4A" />
        </g>
      </svg>
      <svg className="p-layer" data-speed="0.25" viewBox="0 0 1440 240" preserveAspectRatio="xMidYMax slice">
        {/* Shoreline sits above the wave layer so the sand stays visible */}
        <path d="M0 240 L0 120 Q360 100 720 118 Q1080 136 1440 110 L1440 240 Z" fill="var(--sand)" />
        <g transform="translate(150,54)">
          <g className="palm-sway">
            <path d="M0 130 Q10 60 4 8" stroke="#1B2A4A" strokeWidth="11" fill="none" strokeLinecap="round" />
            <g fill="#21345E">
              <path d="M4 8 Q-40 -12 -62 10 Q-28 8 4 8 Z" />
              <path d="M4 8 Q48 -12 70 10 Q36 8 4 8 Z" />
              <path d="M4 8 Q-18 -36 -40 -30 Q-10 -12 4 8 Z" />
              <path d="M4 8 Q26 -36 48 -30 Q16 -12 4 8 Z" />
            </g>
          </g>
        </g>
        <g transform="translate(340,96) scale(0.72)">
          <g className="palm-sway-slow">
            <path d="M0 130 Q-10 60 -4 8" stroke="#1B2A4A" strokeWidth="11" fill="none" strokeLinecap="round" />
            <g fill="#21345E">
              <path d="M-4 8 Q-48 -12 -70 10 Q-36 8 -4 8 Z" />
              <path d="M-4 8 Q40 -12 62 10 Q28 8 -4 8 Z" />
              <path d="M-4 8 Q-26 -36 -48 -30 Q-16 -12 -4 8 Z" />
              <path d="M-4 8 Q18 -36 40 -30 Q10 -12 -4 8 Z" />
            </g>
          </g>
        </g>
        <g transform="translate(576,152)">
          <line x1="0" y1="0" x2="0" y2="48" stroke="#1B2A4A" strokeWidth="4" />
          <path d="M-44 4 A44 44 0 0 1 44 4 Z" fill="#21345E" />
          <path d="M-22 4 A22 38 0 0 1 22 4 Z" fill="var(--gold)" />
        </g>
      </svg>
      <svg className="p-layer wave-layer" data-speed="0.4" viewBox="0 0 1440 120" preserveAspectRatio="xMidYMax slice">
        <path
          className="wave wave-back"
          d="M-100 120 L-100 60 Q-25 30 50 60 Q125 90 200 60 Q275 30 350 60 Q425 90 500 60 Q575 30 650 60 Q725 90 800 60 Q875 30 950 60 Q1025 90 1100 60 Q1175 30 1250 60 Q1325 90 1400 60 Q1475 30 1550 60 L1550 120 Z"
          fill="#5FA3CE"
          opacity="0.75"
        />
        <path
          className="wave wave-front"
          d="M-100 120 L-100 80 Q-25 55 50 80 Q125 105 200 80 Q275 55 350 80 Q425 105 500 80 Q575 55 650 80 Q725 105 800 80 Q875 55 950 80 Q1025 105 1100 80 Q1175 55 1250 80 Q1325 105 1400 80 Q1475 55 1550 80 L1550 120 Z"
          fill="#2E6FA7"
        />
      </svg>
    </div>
  )
}

/* ── Scroll dynamics: sky shift, sun travel, parallax ──────── */
function useScrollScenery() {
  useEffect(() => {
    const clamp01 = (v) => Math.min(1, Math.max(0, v))
    const mid = document.querySelector('.sky-mid')
    const dusk = document.querySelector('.sky-dusk')
    const sun = document.querySelector('.sun')
    const layers = Array.from(document.querySelectorAll('.p-layer'))

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const doc = document.documentElement
        const max = doc.scrollHeight - window.innerHeight
        const progress = max > 0 ? clamp01(window.scrollY / max) : 0

        if (mid) mid.style.opacity = clamp01(progress / 0.5)
        if (dusk) dusk.style.opacity = clamp01((progress - 0.5) / 0.4)
        if (sun) {
          sun.style.transform = `translateY(${progress * 58}vh) scale(${1 + progress * 0.35})`
        }

        const vh = window.innerHeight
        for (const layer of layers) {
          const speed = parseFloat(layer.dataset.speed || '0.2')
          const rect = layer.closest('section').getBoundingClientRect()
          const delta = rect.top + rect.height / 2 - vh / 2
          // Amplitude stays under the layer's 60px bottom bleed so edges stay hidden
          layer.style.transform = `translateY(${delta * speed * 0.1}px)`
        }
        ticking = false
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
}

/* ── Reveal-on-scroll ──────────────────────────────────────── */
function useReveals() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in-view'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${(idx % 4) * 90}ms`
            entry.target.classList.add('in-view')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function App() {
  const [sent, setSent] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useScrollScenery()
  useReveals()

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <Sky />

      <header className="site-header">
        <a className="brand" href="#top" onClick={closeMenu}>
          <img src={logo} alt={`${AGENT.name} logo`} className="brand-logo" />
          <span className="brand-text">
            <strong>{AGENT.name}</strong>
            <small>{AGENT.brokerage}</small>
          </span>
        </a>

        <button
          type="button"
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={`burger ${menuOpen ? 'is-open' : ''}`} aria-hidden="true" />
        </button>

        <nav className={`nav ${menuOpen ? 'is-open' : ''}`}>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#neighborhoods" onClick={closeMenu}>Neighborhoods</a>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
          <a href={AGENT.phoneHref} className="nav-cta" onClick={closeMenu}>
            {AGENT.phone}
          </a>
        </nav>
      </header>

      <main id="top">
        {/* ── HERO · Downtown skyline ── */}
        <section className="hero">
          <div className="hero-inner">
            <p className="eyebrow">Los Angeles Real Estate</p>
            <h1>
              Finding your place
              <br />
              under the <span className="hl">LA sky</span>.
            </h1>
            <p className="hero-sub">
              Hi, I’m {AGENT.name} — a {AGENT.brokerage} agent helping families
              buy and sell across Los Angeles for over 10 years.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary">
                <KeyIcon />
                <span>Work with me</span>
              </a>
              <a href={AGENT.phoneHref} className="btn btn-ghost">
                <PhoneIcon />
                <span>Call {AGENT.phone}</span>
              </a>
            </div>
          </div>
          <SceneDowntown />
        </section>

        {/* ── STATS ── */}
        <section className="stats">
          {STATS.map((s) => (
            <div className="stat reveal" key={s.label}>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </section>

        {/* ── ABOUT · framed portrait ── */}
        <section id="about" className="about">
          <figure className="profile-card reveal">
            <svg className="roof" viewBox="0 0 300 104" aria-hidden="true">
              <polygon points="150,6 294,98 6,98" fill="var(--navy-700)" />
              <polygon points="150,20 268,98 32,98" fill="var(--navy)" />
              <rect x="216" y="28" width="20" height="44" rx="2" fill="var(--navy-700)" />
              <rect x="212" y="22" width="28" height="9" rx="2" fill="var(--gold)" />
            </svg>
            <div className="photo-wrap">
              <img src={profilePhoto} alt={`${AGENT.name}, ${AGENT.brokerage} real estate agent`} />
            </div>
            <figcaption>
              <strong>{AGENT.name}</strong>
              <span>{AGENT.brokerage} · DRE# {AGENT.dre}</span>
              <em>“My goal is simple: make your move feel easy, informed, and genuinely yours.”</em>
            </figcaption>
            <svg className="sold-sign" viewBox="0 0 120 90" aria-hidden="true">
              <rect x="56" y="34" width="7" height="56" fill="var(--navy)" />
              <g className="sold-swing">
                <rect x="12" y="8" width="96" height="36" rx="4" fill="var(--navy-700)" />
                <rect x="17" y="13" width="86" height="26" rx="2" fill="none" stroke="var(--gold-soft)" strokeWidth="1.5" />
                <text
                  x="60" y="32" textAnchor="middle" fontSize="17" letterSpacing="2"
                  fill="var(--gold-soft)" fontFamily="Georgia, serif"
                >
                  SOLD
                </text>
              </g>
            </svg>
          </figure>

          <div className="about-text reveal">
            <p className="eyebrow">About Jackie</p>
            <h2>A decade in the business, a lifetime in these neighborhoods.</h2>
            <p>
              For ten years I’ve helped clients across Los Angeles find the
              right home and sell for the best price. But my connection to this
              market goes back much further than my career. I grew up here, and
              that gives me an understanding of these neighborhoods you can’t
              get from a listing sheet alone. I know how they’ve changed, what
              makes each one different, and what it actually feels like to live
              in them.
            </p>
            <p>
              Real estate is personal to me, both professionally and in my own
              life — my own investments are rooted in this market too. Buying a
              home is never just a transaction. It’s one of the biggest
              decisions you’ll make, and I treat every client’s search with the
              care, honesty, and attention that decision deserves.
            </p>
            <p>
              As an agent with {AGENT.brokerage}, I combine deep local roots
              with a hands-on, one-on-one approach. Whether you’re a first-time
              buyer or a longtime owner ready for the next chapter, I’m here to
              guide you every step of the way.
            </p>
            <a href="#contact" className="btn btn-primary">
              <DoorIcon />
              <span>Let’s talk</span>
            </a>
          </div>
        </section>

        {/* ── NEIGHBORHOODS · Hollywood hills ── */}
        <section id="neighborhoods" className="neighborhoods">
          <div className="section-head reveal">
            <p className="eyebrow center">Where I Work</p>
            <h2>The neighborhoods I know best.</h2>
          </div>
          <div className="card-grid">
            {NEIGHBORHOODS.map((n) => (
              <article className="hood-card reveal" key={n.title}>
                <div className="card-art">
                  <CardArt kind={n.art} />
                </div>
                <div className="card-body">
                  <h3>{n.title}</h3>
                  <p className="card-meta">{n.tags}</p>
                  <p>{n.blurb}</p>
                  <a href="#contact" className="btn btn-card">
                    <span>Explore the area</span>
                    <ArrowIcon />
                  </a>
                </div>
              </article>
            ))}
          </div>
          <SceneHollywood />
        </section>

        {/* ── SERVICES ── */}
        <section id="services" className="services">
          <p className="eyebrow center reveal">How I Can Help</p>
          <h2 className="center reveal">Full-service guidance, start to finish.</h2>
          <div className="svc-grid">
            {SERVICES.map((s) => (
              <article className="svc-card reveal" key={s.title}>
                <ServiceIcon name={s.icon} />
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── CONTACT · the coast ── */}
        <section id="contact" className="contact">
          <div className="contact-panel reveal">
            <div className="contact-info">
              <p className="eyebrow">Let’s Talk</p>
              <h2>Ready to make your move?</h2>
              <p>
                Reach out for a no-pressure conversation about buying or selling
                in Los Angeles. I’d love to hear about your goals.
              </p>
              <ul className="contact-list">
                <li>
                  <span>Phone</span>
                  <a href={AGENT.phoneHref}>{AGENT.phone}</a>
                </li>
                <li>
                  <span>Email</span>
                  <a href={`mailto:${AGENT.email}`}>{AGENT.email}</a>
                </li>
                <li>
                  <span>Brokerage</span>
                  <p>{AGENT.brokerage}</p>
                </li>
                <li>
                  <span>License</span>
                  <p>DRE# {AGENT.dre}</p>
                </li>
              </ul>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              {sent ? (
                <div className="form-success">
                  <h3>Thank you</h3>
                  <p>
                    Your message is ready to send. I’ll be in touch soon — or
                    call me anytime at {AGENT.phone}.
                  </p>
                </div>
              ) : (
                <>
                  <label>
                    Name
                    <input type="text" name="name" required />
                  </label>
                  <label>
                    Email
                    <input type="email" name="email" required />
                  </label>
                  <label>
                    Phone
                    <input type="tel" name="phone" />
                  </label>
                  <label>
                    How can I help?
                    <textarea name="message" rows="4" required />
                  </label>
                  <button type="submit" className="btn btn-primary">
                    <SendIcon />
                    <span>Send message</span>
                  </button>
                </>
              )}
            </form>
          </div>
          <SceneCoast />
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <img src={logo} alt="" />
          <div>
            <strong>{AGENT.name}</strong>
            <small>{AGENT.brokerage} · {AGENT.area}</small>
          </div>
        </div>
        <div className="footer-meta">
          <a href={`mailto:${AGENT.email}`}>{AGENT.email}</a>
          <a href={AGENT.phoneHref}>{AGENT.phone}</a>
          <span>DRE# {AGENT.dre}</span>
        </div>
        <p className="copyright">
          © {new Date().getFullYear()} {AGENT.name}. All rights reserved.
          Serving Los Angeles and the surrounding communities.
        </p>
      </footer>
    </>
  )
}

export default App

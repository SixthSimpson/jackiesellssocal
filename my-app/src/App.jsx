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
    icon: 'tag',
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
  { value: '10+', label: 'Years of experience', emoji: '🔑' },
  { value: 'LA', label: 'Local market specialist', emoji: '🌴' },
  { value: '1:1', label: 'Personal service, every client', emoji: '💛' },
]

const NEIGHBORHOODS = [
  {
    title: 'The Hills & Canyons',
    blurb:
      'Storybook bungalows and view lots above the boulevard — morning light, evening city sparkle.',
    art: 'hills',
    tags: '🌇 Views · 🥾 Trails · 🏡 Bungalows',
  },
  {
    title: 'Downtown & Central LA',
    blurb:
      'Lofts with brick, beams, and big golden-hour windows — walkable blocks in the heart of it all.',
    art: 'loft',
    tags: '🏙 Lofts · 🎨 Arts District · ☕ Cafés',
  },
  {
    title: 'The Westside & Beach',
    blurb:
      'Salt air, sherbet sunsets, and porches made for lemonade — from Venice walk-streets to the sand.',
    art: 'beach',
    tags: '🌊 Coastal · 🚲 Boardwalk · 🌅 Sunsets',
  },
]

/* ── Animated button icons ─────────────────────────────────── */
function KeyIcon() {
  return (
    <svg className="ico ico-key" viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
      <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="3" />
      <path
        d="M16 16 L28 28 M23 23 L27 19 M19 27 L23 23"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg className="ico ico-heart" viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
      <path
        d="M16 27 C8 21 3 16 3 10.5 C3 6.9 5.9 4 9.5 4 C12 4 14.5 5.5 16 8 C17.5 5.5 20 4 22.5 4 C26.1 4 29 6.9 29 10.5 C29 16 24 21 16 27 Z"
        fill="currentColor"
      />
    </svg>
  )
}

function DoorIcon() {
  return (
    <svg className="ico ico-door" viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
      <path
        d="M4 30 L4 12 L16 3 L28 12 L28 30 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <rect className="door-leaf" x="12" y="17" width="8" height="13" rx="1" fill="currentColor" />
    </svg>
  )
}

/* ── Service icons (chunky + warm) ─────────────────────────── */
function ServiceIcon({ name }) {
  if (name === 'tag') {
    return (
      <svg viewBox="0 0 64 64" width="56" height="56" className="svc-icon" aria-hidden="true">
        <rect x="10" y="14" width="44" height="30" rx="6" fill="var(--orange)" />
        <text
          x="32" y="35" textAnchor="middle" fontSize="14" fontWeight="bold"
          fill="var(--paper)" fontFamily="Georgia, serif"
        >
          SALE
        </text>
        <rect x="29" y="44" width="6" height="14" fill="#B3752E" />
        <path
          className="svc-pulse"
          d="M50 10 l3 6 6 1 -4.5 4 1 6 -5.5 -3 -5.5 3 1 -6 -4.5 -4 6 -1 Z"
          fill="var(--gold)"
        />
      </svg>
    )
  }
  if (name === 'key') {
    return (
      <svg viewBox="0 0 64 64" width="56" height="56" className="svc-icon" aria-hidden="true">
        <path d="M32 8 L58 30 L52 30 L52 56 L12 56 L12 30 L6 30 Z" fill="var(--coral)" />
        <rect x="26" y="38" width="12" height="18" rx="2" fill="var(--paper)" />
        <circle className="svc-pulse" cx="32" cy="24" r="6" fill="var(--gold)" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 64 64" width="56" height="56" className="svc-icon" aria-hidden="true">
      <circle cx="32" cy="32" r="24" fill="var(--gold)" />
      <path d="M32 14 A18 18 0 0 1 50 32 L32 32 Z" fill="var(--coral)" />
      <circle cx="32" cy="32" r="8" fill="var(--paper)" />
    </svg>
  )
}

/* ── Cute neighborhood card artwork ────────────────────────── */
function CardArt({ kind }) {
  if (kind === 'hills') {
    return (
      <svg viewBox="0 0 320 190" aria-hidden="true">
        <rect width="320" height="190" fill="#FFE0B8" />
        <circle cx="268" cy="42" r="24" fill="var(--gold)" />
        <path d="M0 190 L0 130 Q90 82 180 128 Q260 165 320 120 L320 190 Z" fill="#E8935C" />
        <g className="card-house">
          <polygon points="160,58 236,110 84,110" fill="var(--coral)" />
          <rect x="100" y="110" width="120" height="70" rx="4" fill="var(--cream)" />
          <rect x="146" y="136" width="28" height="44" rx="3" fill="var(--orange)" />
          <circle cx="168" cy="158" r="3" fill="#C64B30" />
          <rect x="112" y="124" width="24" height="22" rx="3" fill="#8ED3E8" />
          <rect x="184" y="124" width="24" height="22" rx="3" fill="#8ED3E8" />
          <rect x="206" y="66" width="14" height="30" fill="#E85D3D" />
        </g>
        <g className="palm palm-sway" transform="translate(38,96)">
          <path d="M0 94 Q6 40 2 6" stroke="#B3752E" strokeWidth="8" fill="none" strokeLinecap="round" />
          <g fill="#4FA05E">
            <path d="M2 6 Q-28 -8 -44 8 Q-20 6 2 6 Z" />
            <path d="M2 6 Q32 -8 48 8 Q24 6 2 6 Z" />
            <path d="M2 6 Q-14 -26 -30 -22 Q-8 -8 2 6 Z" />
            <path d="M2 6 Q18 -26 34 -22 Q12 -8 2 6 Z" />
          </g>
        </g>
      </svg>
    )
  }
  if (kind === 'loft') {
    return (
      <svg viewBox="0 0 320 190" aria-hidden="true">
        <rect width="320" height="190" fill="#FFD9A8" />
        <circle cx="52" cy="46" r="20" fill="var(--sunshine)" />
        <g fill="#D97B4F" opacity="0.6">
          <rect x="20" y="90" width="40" height="100" />
          <rect x="250" y="70" width="46" height="120" />
        </g>
        <g className="card-house">
          <rect x="92" y="40" width="136" height="140" rx="6" fill="#E85D3D" />
          <g fill="#FFE9A8">
            <rect x="106" y="56" width="24" height="26" rx="3" />
            <rect x="148" y="56" width="24" height="26" rx="3" />
            <rect x="190" y="56" width="24" height="26" rx="3" />
            <rect x="106" y="96" width="24" height="26" rx="3" />
            <rect x="190" y="96" width="24" height="26" rx="3" />
            <rect x="106" y="136" width="24" height="26" rx="3" />
            <rect x="190" y="136" width="24" height="26" rx="3" />
          </g>
          <rect x="148" y="96" width="24" height="26" rx="3" fill="#8ED3E8" />
          <rect x="146" y="140" width="28" height="40" rx="3" fill="var(--gold)" />
          <rect x="88" y="32" width="144" height="12" rx="6" fill="#C64B30" />
        </g>
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 320 190" aria-hidden="true">
      <rect width="320" height="190" fill="#FFE3C7" />
      <circle cx="272" cy="40" r="22" fill="var(--orange)" />
      <path d="M0 190 L0 150 Q80 138 160 150 Q240 162 320 148 L320 190 Z" fill="#7FC8DE" />
      <path d="M0 190 L0 168 Q80 158 160 168 Q240 178 320 166 L320 190 Z" fill="#F2D49B" />
      <g className="card-house">
        <polygon points="150,52 226,104 74,104" fill="var(--orange)" />
        <rect x="90" y="104" width="120" height="64" rx="4" fill="var(--paper)" />
        <rect x="134" y="126" width="26" height="42" rx="3" fill="#7FC8DE" />
        <rect x="102" y="116" width="22" height="20" rx="3" fill="var(--gold)" />
        <rect x="176" y="116" width="22" height="20" rx="3" fill="var(--gold)" />
        <circle cx="150" cy="82" r="9" fill="var(--cream)" />
      </g>
      <g className="palm palm-sway" transform="translate(268,102)">
        <path d="M0 66 Q5 30 2 4" stroke="#B3752E" strokeWidth="7" fill="none" strokeLinecap="round" />
        <g fill="#4FA05E">
          <path d="M2 4 Q-24 -8 -38 6 Q-16 4 2 4 Z" />
          <path d="M2 4 Q28 -8 42 6 Q20 4 2 4 Z" />
          <path d="M2 4 Q-10 -24 -26 -20 Q-6 -8 2 4 Z" />
          <path d="M2 4 Q16 -24 30 -20 Q10 -8 2 4 Z" />
        </g>
      </g>
    </svg>
  )
}

/* ── Fixed sky: crossfades day → golden hour → sunset ──────── */
function Sky() {
  return (
    <div className="sky" aria-hidden="true">
      <div className="sky-layer sky-day" />
      <div className="sky-layer sky-golden" />
      <div className="sky-layer sky-sunset" />
      <svg className="sun" viewBox="0 0 200 200" width="160" height="160">
        <g className="sun-rays">
          <g fill="none" stroke="var(--gold)" strokeWidth="6" strokeLinecap="round">
            <line x1="100" y1="8" x2="100" y2="30" />
            <line x1="100" y1="170" x2="100" y2="192" />
            <line x1="8" y1="100" x2="30" y2="100" />
            <line x1="170" y1="100" x2="192" y2="100" />
            <line x1="35" y1="35" x2="51" y2="51" />
            <line x1="149" y1="149" x2="165" y2="165" />
            <line x1="35" y1="165" x2="51" y2="149" />
            <line x1="149" y1="51" x2="165" y2="35" />
          </g>
        </g>
        <circle cx="100" cy="100" r="52" fill="var(--sunshine)" />
        <circle cx="100" cy="100" r="44" fill="var(--gold)" />
      </svg>
      {[1, 2, 3].map((n) => (
        <svg key={n} className={`cloud cloud-${n}`} viewBox="0 0 220 90" width={220 - n * 40} height={90 - n * 15}>
          <g fill="#FFFDF7" opacity={1 - n * 0.15}>
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
        <g fill="#FFB88C" opacity="0.55">
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
        <g fill="#FF8E5E" opacity="0.75">
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
        <g fill="#E85D3D">
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
        <g fill="#FFE9A8" className="windows">
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
          fill="#D97B4F"
          opacity="0.5"
        />
      </svg>
      <svg className="p-layer" data-speed="0.3" viewBox="0 0 1440 300" preserveAspectRatio="xMidYMax slice">
        <path
          d="M0 300 L0 220 Q220 130 460 210 Q660 270 900 190 Q1140 110 1440 220 L1440 300 Z"
          fill="#C65F3D"
          opacity="0.8"
        />
        <g className="holly-sign" fill="#FFFDF7" fontFamily="Arial Black, Arial, sans-serif" fontSize="34" fontWeight="900">
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
      <svg className="star star-a" viewBox="0 0 24 24" width="26" height="26">
        <path d="M12 1 L15 9 L23 9 L17 14 L19 22 L12 17 L5 22 L7 14 L1 9 L9 9 Z" fill="var(--gold)" />
      </svg>
      <svg className="star star-b" viewBox="0 0 24 24" width="18" height="18">
        <path d="M12 1 L15 9 L23 9 L17 14 L19 22 L12 17 L5 22 L7 14 L1 9 L9 9 Z" fill="var(--orange)" />
      </svg>
      <svg className="star star-c" viewBox="0 0 24 24" width="22" height="22">
        <path d="M12 1 L15 9 L23 9 L17 14 L19 22 L12 17 L5 22 L7 14 L1 9 L9 9 Z" fill="var(--sunshine)" />
      </svg>
    </div>
  )
}

function SceneBeach() {
  return (
    <div className="scene scene-beach" aria-hidden="true">
      <svg className="p-layer" data-speed="0.1" viewBox="0 0 1440 260" preserveAspectRatio="xMidYMax slice">
        <g stroke="#B3752E" strokeWidth="10" opacity="0.9">
          <line x1="1080" y1="150" x2="1080" y2="260" />
          <line x1="1140" y1="150" x2="1140" y2="260" />
          <line x1="1200" y1="150" x2="1200" y2="260" />
          <line x1="1260" y1="150" x2="1260" y2="260" />
          <line x1="1320" y1="150" x2="1320" y2="260" />
        </g>
        <rect x="1050" y="132" width="330" height="20" rx="6" fill="#C68A4B" />
        <g className="ferris" transform="translate(1210,86)">
          <g className="ferris-spin">
            <circle r="44" fill="none" stroke="var(--coral)" strokeWidth="5" />
            <g stroke="var(--coral)" strokeWidth="3">
              <line x1="-44" y1="0" x2="44" y2="0" /><line x1="0" y1="-44" x2="0" y2="44" />
              <line x1="-31" y1="-31" x2="31" y2="31" /><line x1="-31" y1="31" x2="31" y2="-31" />
            </g>
            <g fill="var(--gold)">
              <circle cx="0" cy="-44" r="7" /><circle cx="0" cy="44" r="7" />
              <circle cx="-44" cy="0" r="7" /><circle cx="44" cy="0" r="7" />
              <circle cx="-31" cy="-31" r="7" /><circle cx="31" cy="31" r="7" />
              <circle cx="-31" cy="31" r="7" /><circle cx="31" cy="-31" r="7" />
            </g>
          </g>
          <polygon points="-16,46 16,46 0,0" fill="#E85D3D" />
        </g>
      </svg>
      <svg className="p-layer" data-speed="0.25" viewBox="0 0 1440 240" preserveAspectRatio="xMidYMax slice">
        <path d="M0 240 L0 190 Q360 168 720 188 Q1080 208 1440 184 L1440 240 Z" fill="#F2D49B" />
        <g className="palm palm-sway" transform="translate(140,60)">
          <path d="M0 130 Q10 60 4 8" stroke="#B3752E" strokeWidth="12" fill="none" strokeLinecap="round" />
          <g fill="#4FA05E">
            <path d="M4 8 Q-40 -12 -62 10 Q-28 8 4 8 Z" />
            <path d="M4 8 Q48 -12 70 10 Q36 8 4 8 Z" />
            <path d="M4 8 Q-18 -36 -40 -30 Q-10 -12 4 8 Z" />
            <path d="M4 8 Q26 -36 48 -30 Q16 -12 4 8 Z" />
          </g>
          <circle cx="0" cy="12" r="6" fill="#8A5A2B" /><circle cx="10" cy="14" r="6" fill="#8A5A2B" />
        </g>
        <g className="palm palm-sway-slow" transform="translate(330,100) scale(0.7)">
          <path d="M0 130 Q-10 60 -4 8" stroke="#B3752E" strokeWidth="12" fill="none" strokeLinecap="round" />
          <g fill="#5CB06C">
            <path d="M-4 8 Q-48 -12 -70 10 Q-36 8 -4 8 Z" />
            <path d="M-4 8 Q40 -12 62 10 Q28 8 -4 8 Z" />
            <path d="M-4 8 Q-26 -36 -48 -30 Q-16 -12 -4 8 Z" />
            <path d="M-4 8 Q18 -36 40 -30 Q10 -12 -4 8 Z" />
          </g>
        </g>
        <g transform="translate(560,150)">
          <line x1="0" y1="0" x2="0" y2="50" stroke="#B3752E" strokeWidth="5" />
          <path d="M-46 4 A46 46 0 0 1 46 4 Z" fill="var(--coral)" />
          <path d="M-23 4 A23 40 0 0 1 23 4 Z" fill="var(--gold)" />
        </g>
      </svg>
      <svg className="p-layer wave-layer" data-speed="0.4" viewBox="0 0 1440 120" preserveAspectRatio="xMidYMax slice">
        <path
          className="wave wave-back"
          d="M-100 120 L-100 60 Q-25 30 50 60 Q125 90 200 60 Q275 30 350 60 Q425 90 500 60 Q575 30 650 60 Q725 90 800 60 Q875 30 950 60 Q1025 90 1100 60 Q1175 30 1250 60 Q1325 90 1400 60 Q1475 30 1550 60 L1550 120 Z"
          fill="#7FC8DE"
          opacity="0.8"
        />
        <path
          className="wave wave-front"
          d="M-100 120 L-100 80 Q-25 55 50 80 Q125 105 200 80 Q275 55 350 80 Q425 105 500 80 Q575 55 650 80 Q725 105 800 80 Q875 55 950 80 Q1025 105 1100 80 Q1175 55 1250 80 Q1325 105 1400 80 Q1475 55 1550 80 L1550 120 Z"
          fill="#5FB6D4"
        />
      </svg>
    </div>
  )
}

/* ── Scroll dynamics: sky crossfade, sun travel, parallax ──── */
function useScrollScenery() {
  useEffect(() => {
    const clamp01 = (v) => Math.min(1, Math.max(0, v))
    const golden = document.querySelector('.sky-golden')
    const sunset = document.querySelector('.sky-sunset')
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

        if (golden) golden.style.opacity = clamp01(progress / 0.5)
        if (sunset) sunset.style.opacity = clamp01((progress - 0.5) / 0.4)
        if (sun) {
          sun.style.transform = `translateY(${progress * 55}vh) scale(${1 + progress * 0.45})`
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
        {/* ── HERO · Downtown LA ── */}
        <section className="hero">
          <div className="hero-inner">
            <p className="eyebrow">☀️ Los Angeles Real Estate</p>
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
                <HeartIcon />
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
              <span className="stat-emoji">{s.emoji}</span>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </section>

        {/* ── ABOUT · house-framed profile photo ── */}
        <section id="about" className="about">
          <figure className="profile-card reveal">
            <svg className="roof" viewBox="0 0 300 110" aria-hidden="true">
              <polygon points="150,6 294,104 6,104" fill="var(--coral)" />
              <polygon points="150,26 272,104 28,104" fill="var(--gold)" />
              <rect x="216" y="30" width="22" height="46" rx="4" fill="#E85D3D" />
              <rect x="212" y="24" width="30" height="10" rx="4" fill="#C64B30" />
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
              <rect x="55" y="34" width="8" height="56" fill="#B3752E" />
              <g className="sold-swing">
                <rect x="10" y="8" width="100" height="38" rx="8" fill="var(--coral)" stroke="var(--cream)" strokeWidth="4" />
                <text x="60" y="35" textAnchor="middle" fontSize="22" fontWeight="bold" fill="var(--cream)" fontFamily="Georgia, serif">
                  SOLD!
                </text>
              </g>
            </svg>
          </figure>

          <div className="about-text reveal">
            <p className="eyebrow">🏠 About Jackie</p>
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
              <span>Let’s chat</span>
            </a>
          </div>
        </section>

        {/* ── NEIGHBORHOODS · Hollywood backdrop ── */}
        <section id="neighborhoods" className="neighborhoods">
          <div className="section-head reveal">
            <p className="eyebrow">⭐ Where I Work</p>
            <h2>Neighborhoods with star quality.</h2>
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
                    <KeyIcon />
                    <span>Explore with me</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
          <SceneHollywood />
        </section>

        {/* ── SERVICES ── */}
        <section id="services" className="services">
          <p className="eyebrow center reveal">🧺 How I can help</p>
          <h2 className="center reveal">Full service, warm heart.</h2>
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

        {/* ── CONTACT · beach finale ── */}
        <section id="contact" className="contact">
          <div className="contact-panel reveal">
            <div className="contact-info">
              <p className="eyebrow">🌊 Let’s talk</p>
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
                  <h3>Thank you! 🎉</h3>
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
                    <HeartIcon />
                    <span>Send message</span>
                  </button>
                </>
              )}
            </form>
          </div>
          <SceneBeach />
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
          © {new Date().getFullYear()} {AGENT.name}. All rights reserved. Made
          with 💛 in Los Angeles.
        </p>
      </footer>
    </>
  )
}

export default App

import { useEffect, useState, useSyncExternalStore } from "react";
import "./App.css";
import logo from "/logo.svg";

// Two frames from the same shoot: the closer, smiling one leads the page,
// the wider seated one anchors the About section further down.
const profilePhoto = `${import.meta.env.BASE_URL}Jackie_Profile.JPG`;
const aboutPhoto = `${import.meta.env.BASE_URL}Jackie_Photo.jpg`;

const AGENT = {
  name: "Jacqueline Horn",
  brokerage: "Power Brokers",
  email: "listedbyjackie@gmail.com",
  phone: "310-880-0846",
  phoneHref: "tel:+13108800846",
  dre: "01492854",
  area: "Los Angeles",
};

const SERVICES = [
  {
    title: "Selling Your Home",
    body: "Strategic pricing, professional staging guidance, and marketing that puts your property in front of the right buyers across the Westside.",
    art: "living",
  },
  {
    title: "Finding Your Home",
    body: "From the first showing to the closing table, I help you navigate one of LA’s most competitive markets with confidence and clarity.",
    art: "kitchen",
  },
  {
    title: "Market Expertise",
    body: "A lifetime in these neighborhoods and a decade of deals — trends, timing, and the negotiation experience to get you the best possible outcome.",
    art: "courtyard",
  },
];

const STATS = [
  { value: "10+", label: "Years of experience" },
  { value: "LA", label: "Local market specialist" },
  { value: "1:1", label: "Personal service, every client" },
];

const NEIGHBORHOODS = [
  {
    title: "Santa Monica & Venice",
    blurb:
      "Walk-streets, canal bungalows, and Craftsman porches a few blocks from the sand — where the ocean is part of the daily routine.",
    art: "bungalow",
    tags: "Walk-streets · Canals · Ocean air",
  },
  {
    title: "Brentwood & the Palisades",
    blurb:
      "Spanish Revival and canyon estates above San Vicente, with village calm, deep gardens, and some of the Westside’s best schools.",
    art: "spanish",
    tags: "Estates · Canyons · Village calm",
  },
  {
    title: "Mar Vista & Culver City",
    blurb:
      "Post-and-beam mid-century bones on quiet grids, in the creative pocket of the Westside that still has real room to grow.",
    art: "midcentury",
    tags: "Mid-century · Creative · Value",
  },
];

/* ── Button icons ──────────────────────────────────────────── */
function KeyIcon() {
  return (
    <svg
      className="ico ico-key"
      viewBox="0 0 32 32"
      width="19"
      height="19"
      aria-hidden="true"
    >
      {/* bow (the ring you hold) */}
      <circle
        cx="10.5"
        cy="16"
        r="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
      {/* shaft, running out of the bow */}
      <path
        d="M16 16 H28.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* two bittings dropping off the shaft near the tip */}
      <path
        d="M22.5 16 V21.5 M27.5 16 V19.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      className="ico ico-phone"
      viewBox="0 0 32 32"
      width="19"
      height="19"
      aria-hidden="true"
    >
      <path
        d="M7 4 L12 4 L14 11 L10.5 13.5 C12 17 15 20 18.5 21.5 L21 18 L28 20 L28 25 C28 26.7 26.7 28 25 28 C13.4 28 4 18.6 4 7 C4 5.3 5.3 4 7 4 Z"
        fill="currentColor"
      />
    </svg>
  );
}

function DoorIcon() {
  return (
    <svg
      className="ico ico-door"
      viewBox="0 0 32 32"
      width="19"
      height="19"
      aria-hidden="true"
    >
      <path
        d="M4 30 L4 12 L16 3 L28 12 L28 30 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <rect
        className="door-leaf"
        x="12"
        y="17"
        width="8"
        height="13"
        rx="1"
        fill="currentColor"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="ico ico-arrow"
      viewBox="0 0 32 32"
      width="17"
      height="17"
      aria-hidden="true"
    >
      <path
        d="M5 16 L26 16 M18 8 L26 16 L18 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      className="ico ico-send"
      viewBox="0 0 32 32"
      width="19"
      height="19"
      aria-hidden="true"
    >
      <path d="M28 4 L3 14 L13 17.5 L17 28 Z" fill="currentColor" />
    </svg>
  );
}

/* ── Interior vignettes ────────────────────────────────────────
   Stand-ins for interior photography: warm rooms lit from one side,
   drawn with gradient fills so they read as spaces rather than icons. */
function InteriorArt({ kind }) {
  if (kind === "living") {
    return (
      <svg viewBox="0 0 220 160" className="svc-art" aria-hidden="true">
        <defs>
          <linearGradient id="lvWall" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#F4EDE1" />
            <stop offset="1" stopColor="#E5D6C0" />
          </linearGradient>
          <linearGradient id="lvLight" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#F6D9B8" stopOpacity="0.95" />
            <stop offset="1" stopColor="#F6D9B8" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="220" height="160" fill="url(#lvWall)" />
        {/* window + the light it throws across the floor */}
        <rect x="126" y="22" width="70" height="66" rx="3" fill="#C3D9E1" />
        <rect
          x="126"
          y="22"
          width="70"
          height="66"
          rx="3"
          fill="none"
          stroke="#8A6A4B"
          strokeWidth="4"
        />
        <line
          x1="161"
          y1="22"
          x2="161"
          y2="88"
          stroke="#8A6A4B"
          strokeWidth="3"
        />
        <polygon points="126,88 196,88 214,142 96,142" fill="url(#lvLight)" />
        {/* floor */}
        <rect
          x="0"
          y="126"
          width="220"
          height="34"
          fill="#C9A87C"
          opacity="0.5"
        />
        <rect
          x="18"
          y="132"
          width="150"
          height="20"
          rx="3"
          fill="#BE5F3F"
          opacity="0.28"
        />
        {/* sofa */}
        <rect x="24" y="92" width="82" height="26" rx="7" fill="#7E8F72" />
        <rect x="20" y="104" width="90" height="26" rx="6" fill="#55634C" />
        <rect x="34" y="86" width="26" height="16" rx="5" fill="#C9D2BF" />
        <rect x="68" y="86" width="26" height="16" rx="5" fill="#C9D2BF" />
        {/* plant */}
        <rect x="180" y="106" width="22" height="24" rx="3" fill="#BE5F3F" />
        <g fill="#55634C">
          <ellipse
            cx="184"
            cy="96"
            rx="12"
            ry="6"
            transform="rotate(-28 184 96)"
          />
          <ellipse
            cx="198"
            cy="94"
            rx="12"
            ry="6"
            transform="rotate(24 198 94)"
          />
          <ellipse cx="191" cy="86" rx="7" ry="13" />
        </g>
        {/* art on the wall */}
        <rect
          x="34"
          y="30"
          width="44"
          height="38"
          rx="2"
          fill="#FBF7F0"
          stroke="#B8894A"
          strokeWidth="2.5"
        />
        <path d="M40 62 L54 44 L64 56 L72 48 L72 62 Z" fill="#D9B37C" />
      </svg>
    );
  }
  if (kind === "kitchen") {
    return (
      <svg viewBox="0 0 220 160" className="svc-art" aria-hidden="true">
        <defs>
          <linearGradient id="ktWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F6EFE3" />
            <stop offset="1" stopColor="#E9DCC6" />
          </linearGradient>
          <linearGradient id="ktCounter" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8A6A4B" />
            <stop offset="1" stopColor="#5C452F" />
          </linearGradient>
        </defs>
        <rect width="220" height="160" fill="url(#ktWall)" />
        {/* zellige-ish backsplash */}
        <g fill="#C3D9E1" opacity="0.55">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <rect
              key={i}
              x={12 + i * 26}
              y="40"
              width="22"
              height="20"
              rx="2"
            />
          ))}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <rect
              key={`b${i}`}
              x={12 + i * 26}
              y="64"
              width="22"
              height="20"
              rx="2"
              opacity="0.7"
            />
          ))}
        </g>
        {/* pendant lights */}
        <g stroke="#5C452F" strokeWidth="2">
          <line x1="70" y1="0" x2="70" y2="24" />
          <line x1="150" y1="0" x2="150" y2="18" />
        </g>
        <path d="M56 24 L84 24 L78 38 L62 38 Z" fill="#B8894A" />
        <path d="M136 18 L164 18 L158 32 L142 32 Z" fill="#B8894A" />
        <circle cx="70" cy="40" r="6" fill="#F6D9B8" opacity="0.8" />
        <circle cx="150" cy="34" r="6" fill="#F6D9B8" opacity="0.8" />
        {/* island */}
        <rect x="30" y="92" width="160" height="10" rx="3" fill="#FBF7F0" />
        <rect x="36" y="102" width="148" height="44" fill="url(#ktCounter)" />
        <g fill="#D9B37C">
          <rect x="52" y="116" width="34" height="3" rx="1.5" />
          <rect x="102" y="116" width="34" height="3" rx="1.5" />
          <rect x="150" y="116" width="20" height="3" rx="1.5" />
        </g>
        <rect
          x="0"
          y="146"
          width="220"
          height="14"
          fill="#C9A87C"
          opacity="0.55"
        />
        {/* bowl of citrus, because it is Los Angeles */}
        <ellipse cx="110" cy="88" rx="18" ry="5" fill="#7E8F72" />
        <circle cx="104" cy="84" r="5" fill="#D98A6B" />
        <circle cx="114" cy="84" r="5" fill="#BE5F3F" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 220 160" className="svc-art" aria-hidden="true">
      <defs>
        <linearGradient id="cySky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F6D9B8" />
          <stop offset="1" stopColor="#FBEEDC" />
        </linearGradient>
        <linearGradient id="cyWall" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FBF7F0" />
          <stop offset="1" stopColor="#E5D6C0" />
        </linearGradient>
      </defs>
      <rect width="220" height="160" fill="url(#cyWall)" />
      {/* arched opening onto the garden */}
      <path
        d="M62 150 L62 76 A48 48 0 0 1 158 76 L158 150 Z"
        fill="url(#cySky)"
      />
      <path
        d="M62 150 L62 76 A48 48 0 0 1 158 76 L158 150"
        fill="none"
        stroke="#BE5F3F"
        strokeWidth="6"
      />
      {/* cypress beyond the arch */}
      <ellipse cx="88" cy="118" rx="11" ry="34" fill="#55634C" />
      <ellipse cx="132" cy="124" rx="9" ry="28" fill="#7E8F72" />
      {/* fountain */}
      <rect x="96" y="128" width="28" height="8" rx="3" fill="#C3D9E1" />
      <rect x="106" y="112" width="8" height="18" fill="#E5C9B6" />
      <ellipse cx="110" cy="112" rx="14" ry="5" fill="#E5C9B6" />
      {/* saltillo floor */}
      <rect
        x="0"
        y="150"
        width="220"
        height="10"
        fill="#BE5F3F"
        opacity="0.55"
      />
      {/* potted plants flanking the arch */}
      <rect x="30" y="122" width="22" height="26" rx="3" fill="#BE5F3F" />
      <g fill="#7E8F72">
        <ellipse
          cx="34"
          cy="112"
          rx="12"
          ry="6"
          transform="rotate(-30 34 112)"
        />
        <ellipse
          cx="48"
          cy="110"
          rx="12"
          ry="6"
          transform="rotate(26 48 110)"
        />
      </g>
      <rect x="170" y="126" width="20" height="22" rx="3" fill="#B8894A" />
      <g fill="#55634C">
        <ellipse
          cx="174"
          cy="118"
          rx="10"
          ry="5"
          transform="rotate(-24 174 118)"
        />
        <ellipse
          cx="186"
          cy="117"
          rx="10"
          ry="5"
          transform="rotate(22 186 117)"
        />
      </g>
    </svg>
  );
}

/* ── Neighborhood card artwork ─────────────────────────────────
   Three Westside archetypes rather than generic houses. Each one breaks
   the box on purpose: overhanging eaves, a setback wing, planting across
   the base, so no silhouette reads as a plain rectangle. */
function CardArt({ kind }) {
  if (kind === "bungalow") {
    return (
      <svg viewBox="0 0 320 190" aria-hidden="true">
        <defs>
          <linearGradient id="bgSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F3D3AE" />
            <stop offset="0.6" stopColor="#FBEEDC" />
            <stop offset="1" stopColor="#FBF7F0" />
          </linearGradient>
          <linearGradient id="bgWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FBF7F0" />
            <stop offset="1" stopColor="#E4D3B8" />
          </linearGradient>
          <linearGradient id="bgRoof" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8A6A4B" />
            <stop offset="1" stopColor="#4F3A26" />
          </linearGradient>
        </defs>
        <rect width="320" height="190" fill="url(#bgSky)" />
        <circle cx="268" cy="38" r="18" fill="#F6D9B8" opacity="0.9" />
        <rect x="0" y="108" width="320" height="9" fill="#6FA0B4" opacity="0.4" />
        <path d="M0 190 L0 117 Q160 110 320 120 L320 190 Z" fill="#E9DCC6" />

        <g className="card-house">
          {/* setback wing on the left breaks the main box */}
          <path d="M52 168 L52 118 L96 118 L96 168 Z" fill="#E4D3B8" />
          <path d="M44 118 L104 118 L96 104 L52 104 Z" fill="#5C452F" />

          {/* main gable, wide overhanging eaves, exposed rafter tails */}
          <path d="M160 40 L262 100 L58 100 Z" fill="url(#bgRoof)" />
          <path d="M160 52 L242 100 L78 100 Z" fill="#8A6A4B" opacity="0.45" />
          <g fill="#4F3A26">
            <rect x="70" y="100" width="5" height="7" rx="1.5" />
            <rect x="94" y="100" width="5" height="7" rx="1.5" />
            <rect x="118" y="100" width="5" height="7" rx="1.5" />
            <rect x="197" y="100" width="5" height="7" rx="1.5" />
            <rect x="221" y="100" width="5" height="7" rx="1.5" />
          </g>
          {/* shed dormer */}
          <path d="M132 62 L188 62 L192 74 L128 74 Z" fill="#5C452F" />
          <rect x="140" y="65" width="40" height="9" rx="1.5" fill="#D9B37C" />

          <rect x="84" y="107" width="152" height="61" fill="url(#bgWall)" />
          <g stroke="#DCC9AE" strokeWidth="1.3" opacity="0.9">
            <line x1="84" y1="119" x2="236" y2="119" />
            <line x1="84" y1="132" x2="236" y2="132" />
            <line x1="84" y1="145" x2="236" y2="145" />
          </g>

          {/* tapered porch columns on stone piers */}
          <path d="M96 107 L104 107 L102 140 L98 140 Z" fill="#8A6A4B" />
          <rect x="94" y="140" width="12" height="28" rx="2" fill="#C9A87C" />
          <path d="M216 107 L224 107 L222 140 L218 140 Z" fill="#8A6A4B" />
          <rect x="214" y="140" width="12" height="28" rx="2" fill="#C9A87C" />

          {/* door with a soft arch top */}
          <path d="M148 168 L148 130 A13 13 0 0 1 174 130 L174 168 Z" fill="#5C452F" />
          <circle cx="169" cy="150" r="1.8" fill="#D9B37C" />
          <rect x="112" y="116" width="24" height="22" rx="3" fill="#B8894A" opacity="0.9" />
          <rect x="186" y="116" width="24" height="22" rx="3" fill="#B8894A" opacity="0.9" />
        </g>

        {/* bougainvillea over the porch */}
        <g fill="#C0577E" opacity="0.92">
          <circle cx="98" cy="104" r="9" />
          <circle cx="87" cy="112" r="7" />
          <circle cx="106" cy="113" r="6" />
          <circle cx="93" cy="122" r="5" />
        </g>
        {/* clipped hedge across the base, so the wall never meets the ground flat */}
        <g fill="#7E8F72">
          <ellipse cx="70" cy="170" rx="34" ry="13" />
          <ellipse cx="252" cy="172" rx="30" ry="12" />
          <ellipse cx="160" cy="176" rx="26" ry="9" />
        </g>
        <g fill="#55634C" opacity="0.75">
          <ellipse cx="52" cy="174" rx="20" ry="9" />
          <ellipse cx="272" cy="176" rx="18" ry="8" />
        </g>

        <g transform="translate(292,100)">
          <g className="palm-sway">
            <path d="M0 66 Q5 30 2 4" stroke="#8A6A4B" strokeWidth="6" fill="none" strokeLinecap="round" />
            <g fill="#55634C">
              <path d="M2 4 Q-24 -8 -38 6 Q-16 4 2 4 Z" />
              <path d="M2 4 Q28 -8 42 6 Q20 4 2 4 Z" />
              <path d="M2 4 Q-10 -24 -26 -20 Q-6 -8 2 4 Z" />
              <path d="M2 4 Q16 -24 30 -20 Q10 -8 2 4 Z" />
            </g>
          </g>
        </g>
      </svg>
    );
  }

  if (kind === "spanish") {
    return (
      <svg viewBox="0 0 320 190" aria-hidden="true">
        <defs>
          <linearGradient id="spSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#EFD0C0" />
            <stop offset="1" stopColor="#FBF3E6" />
          </linearGradient>
          <linearGradient id="spWall" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FFFDFA" />
            <stop offset="1" stopColor="#E2D0B6" />
          </linearGradient>
          <linearGradient id="spTile" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#D98A6B" />
            <stop offset="1" stopColor="#9A4A30" />
          </linearGradient>
        </defs>
        <rect width="320" height="190" fill="url(#spSky)" />
        <circle cx="46" cy="36" r="16" fill="#F6D9B8" opacity="0.85" />
        <path d="M0 190 L0 132 Q90 104 190 128 Q260 146 320 122 L320 190 Z" fill="#C9D2BF" opacity="0.7" />
        <ellipse cx="36" cy="128" rx="11" ry="38" fill="#55634C" />
        <ellipse cx="292" cy="138" rx="9" ry="30" fill="#7E8F72" />

        <g className="card-house">
          {/* stepped massing: low arcade wing + taller tower */}
          <rect x="60" y="112" width="76" height="56" fill="url(#spWall)" />
          <rect x="136" y="88" width="112" height="80" fill="url(#spWall)" />
          <rect x="204" y="60" width="46" height="108" fill="url(#spWall)" />

          {/* curved tile eaves, each with a scalloped edge */}
          <path d="M54 112 L142 112 L138 100 L58 100 Z" fill="url(#spTile)" />
          <path d="M130 88 L254 88 L248 76 L136 76 Z" fill="url(#spTile)" />
          <path d="M198 60 L256 60 L252 48 L202 48 Z" fill="url(#spTile)" />
          <g fill="#9A4A30" opacity="0.9">
            {Array.from({ length: 8 }, (_, i) => (
              <circle key={`a${i}`} cx={60 + i * 11} cy="112" r="3.6" />
            ))}
            {Array.from({ length: 11 }, (_, i) => (
              <circle key={`b${i}`} cx={134 + i * 11} cy="88" r="3.6" />
            ))}
            {Array.from({ length: 5 }, (_, i) => (
              <circle key={`c${i}`} cx={202 + i * 11} cy="60" r="3.6" />
            ))}
          </g>

          {/* arcade — three arches instead of a flat wall */}
          <g fill="#8A6A4B" opacity="0.55">
            <path d="M70 168 L70 138 A11 11 0 0 1 92 138 L92 168 Z" />
            <path d="M98 168 L98 138 A11 11 0 0 1 120 138 L120 168 Z" />
          </g>

          {/* arched entry under the tower */}
          <path d="M160 168 L160 124 A18 18 0 0 1 196 124 L196 168 Z" fill="#5C452F" />
          <path d="M166 168 L166 126 A12 12 0 0 1 190 126 L190 168 Z" fill="#8A6A4B" />

          {/* tower window + wrought iron */}
          <path d="M214 92 L214 76 A9 9 0 0 1 232 76 L232 92 Z" fill="#B8894A" opacity="0.9" />
          <line x1="223" y1="68" x2="223" y2="92" stroke="#4A423A" strokeWidth="1.4" />
          <rect x="152" y="104" width="44" height="3" rx="1.5" fill="#4A423A" />
          <g stroke="#4A423A" strokeWidth="1.5">
            <line x1="158" y1="96" x2="158" y2="104" />
            <line x1="167" y1="96" x2="167" y2="104" />
            <line x1="176" y1="96" x2="176" y2="104" />
            <line x1="185" y1="96" x2="185" y2="104" />
            <line x1="192" y1="96" x2="192" y2="104" />
          </g>
        </g>

        {/* garden softening the base */}
        <g fill="#7E8F72">
          <ellipse cx="52" cy="170" rx="28" ry="12" />
          <ellipse cx="268" cy="172" rx="26" ry="11" />
        </g>
        <g fill="#55634C" opacity="0.8">
          <ellipse cx="132" cy="176" rx="22" ry="9" />
          <ellipse cx="228" cy="174" rx="18" ry="8" />
        </g>
        <rect x="0" y="178" width="320" height="12" fill="#C9A87C" opacity="0.45" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 320 190" aria-hidden="true">
      <defs>
        <linearGradient id="mcSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#DCC9AE" />
          <stop offset="1" stopColor="#FBF3E6" />
        </linearGradient>
        <linearGradient id="mcGlass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F6D9B8" />
          <stop offset="1" stopColor="#D9B37C" />
        </linearGradient>
      </defs>
      <rect width="320" height="190" fill="url(#mcSky)" />
      <circle cx="256" cy="44" r="19" fill="#F6D9B8" opacity="0.75" />

      <g className="card-house">
        {/* butterfly roof — an angled plane instead of a flat slab */}
        <path d="M28 92 L160 66 L292 96 L292 106 L160 76 L28 102 Z" fill="#4F3A26" />
        <path d="M28 102 L160 76 L292 106 L292 110 L160 80 L28 106 Z" fill="#8A6A4B" opacity="0.6" />

        {/* clerestory follows the roof slope */}
        <path d="M66 96 L160 78 L254 100 L254 110 L160 88 L66 106 Z" fill="#C3D9E1" opacity="0.75" />

        <rect x="66" y="106" width="188" height="54" fill="url(#mcGlass)" />
        <g stroke="#4F3A26" strokeWidth="3">
          <line x1="108" y1="90" x2="108" y2="160" />
          <line x1="160" y1="82" x2="160" y2="160" />
          <line x1="212" y1="92" x2="212" y2="160" />
        </g>

        {/* cantilevered carport, angled to match */}
        <path d="M254 100 L308 112 L308 118 L254 106 Z" fill="#5C452F" />
        <rect x="300" y="118" width="5" height="42" fill="#5C452F" />

        {/* slender posts, not fat blocks */}
        <rect x="64" y="104" width="4.5" height="56" fill="#4F3A26" />
        <rect x="252" y="102" width="4.5" height="58" fill="#4F3A26" />

        {/* breeze-block screen */}
        <g fill="#E4D3B8">
          <rect x="222" y="112" width="28" height="48" rx="2" />
        </g>
        <g fill="#DCC9AE" stroke="#C9A87C" strokeWidth="1">
          <circle cx="230" cy="122" r="4" />
          <circle cx="242" cy="122" r="4" />
          <circle cx="230" cy="136" r="4" />
          <circle cx="242" cy="136" r="4" />
          <circle cx="230" cy="150" r="4" />
          <circle cx="242" cy="150" r="4" />
        </g>
      </g>

      {/* gravel court and drought planting */}
      <path d="M0 190 L0 162 Q160 154 320 164 L320 190 Z" fill="#E9DCC6" />
      <g fill="#7E8F72">
        <ellipse cx="38" cy="164" rx="28" ry="13" />
        <ellipse cx="288" cy="168" rx="24" ry="11" />
      </g>
      <g fill="#55634C" opacity="0.8">
        <ellipse cx="26" cy="160" rx="15" ry="8" />
        <ellipse cx="302" cy="164" rx="13" ry="7" />
      </g>
      <g stroke="#55634C" strokeWidth="2.4" strokeLinecap="round" fill="none">
        <path d="M160 178 L150 162" />
        <path d="M160 178 L160 158" />
        <path d="M160 178 L170 162" />
        <path d="M160 178 L144 170" />
        <path d="M160 178 L176 170" />
      </g>
    </svg>
  );
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
          <g
            fill="none"
            stroke="var(--brass-soft)"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.8"
          >
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
        <circle
          cx="100"
          cy="100"
          r="48"
          fill="var(--brass-soft)"
          opacity="0.45"
        />
        <circle cx="100" cy="100" r="38" fill="#F6D9B8" />
      </svg>
      {[1, 2, 3].map((n) => (
        <svg
          key={n}
          className={`cloud cloud-${n}`}
          viewBox="0 0 220 90"
          width={220 - n * 40}
          height={90 - n * 15}
        >
          <g fill="#FFFDFA" opacity={0.82 - n * 0.14}>
            <ellipse cx="60" cy="60" rx="55" ry="26" />
            <ellipse cx="120" cy="45" rx="48" ry="30" />
            <ellipse cx="170" cy="62" rx="45" ry="22" />
          </g>
        </svg>
      ))}
    </div>
  );
}

/* ── Parallax scene bands ────────────────────────────────────
   The layers are width:100% SVGs, so their artwork scales with the
   viewport: a 1440-unit composition renders at ~27% on a 390px phone.
   On phones we swap in a 680-unit viewBox instead — same physical width,
   half the units, so the art draws ~2x larger — and aim that window at
   each scene's landmark rather than its empty middle. Every layer in a
   scene shares the 680 width so they stay in parallax alignment. */
const PHONE_SCENES = "(max-width: 600px)";
const PHONE_VB_WIDTH = 680;

function usePhoneScenes() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(PHONE_SCENES);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(PHONE_SCENES).matches,
  );
}

// `focus` is the left edge of the phone window, in viewBox units.
function useSceneBox(focus) {
  const phone = usePhoneScenes();
  return (height) =>
    phone ? `${focus} 0 ${PHONE_VB_WIDTH} ${height}` : `0 0 1440 ${height}`;
}

function SceneDowntown() {
  const box = useSceneBox(380); // repeating skyline — centre is fine
  return (
    <div className="scene scene-downtown" aria-hidden="true">
      <svg
        className="p-layer"
        data-speed="0.12"
        viewBox={box(260)}
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id="dtFar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#E5C9B6" />
            <stop offset="1" stopColor="#F2DFCB" />
          </linearGradient>
        </defs>
        <g fill="url(#dtFar)" opacity="0.62">
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
      <svg
        className="p-layer"
        data-speed="0.28"
        viewBox={box(240)}
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id="dtMid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#C9A87C" />
            <stop offset="1" stopColor="#A8845C" />
          </linearGradient>
        </defs>
        <g fill="url(#dtMid)" opacity="0.85">
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
      <svg
        className="p-layer"
        data-speed="0.5"
        viewBox={box(220)}
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id="dtNear" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6E5439" />
            <stop offset="1" stopColor="#4A3626" />
          </linearGradient>
        </defs>
        <g fill="url(#dtNear)">
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
        <g fill="#D9B37C" className="windows">
          <rect x="40" y="100" width="8" height="10" />
          <rect x="60" y="100" width="8" height="10" />
          <rect x="40" y="125" width="8" height="10" />
          <rect x="80" y="125" width="8" height="10" />
          <rect x="190" y="60" width="8" height="10" />
          <rect x="210" y="85" width="8" height="10" />
          <rect x="190" y="110" width="8" height="10" />
          <rect x="325" y="120" width="8" height="10" />
          <rect x="350" y="145" width="8" height="10" />
          <rect x="500" y="80" width="8" height="10" />
          <rect x="525" y="105" width="8" height="10" />
          <rect x="660" y="90" width="8" height="10" />
          <rect x="690" y="115" width="8" height="10" />
          <rect x="810" y="55" width="8" height="10" />
          <rect x="835" y="80" width="8" height="10" />
          <rect x="945" y="110" width="8" height="10" />
          <rect x="975" y="135" width="8" height="10" />
          <rect x="1110" y="75" width="8" height="10" />
          <rect x="1140" y="100" width="8" height="10" />
          <rect x="1265" y="115" width="8" height="10" />
        </g>
      </svg>
    </div>
  );
}

function SceneHollywood() {
  const box = useSceneBox(760); // frame the HOLLYWOOD sign (x 960–1300)
  return (
    <div className="scene scene-hollywood" aria-hidden="true">
      <svg
        className="p-layer"
        data-speed="0.15"
        viewBox={box(300)}
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id="hwFar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#C9D2BF" />
            <stop offset="1" stopColor="#A9B79C" />
          </linearGradient>
        </defs>
        <path
          d="M0 300 L0 190 Q180 90 380 170 Q560 240 760 150 Q980 60 1180 160 Q1320 230 1440 180 L1440 300 Z"
          fill="url(#hwFar)"
          opacity="0.6"
        />
      </svg>
      <svg
        className="p-layer"
        data-speed="0.3"
        viewBox={box(300)}
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id="hwNear" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7E8F72" />
            <stop offset="1" stopColor="#4B5742" />
          </linearGradient>
        </defs>
        <path
          d="M0 300 L0 220 Q220 130 460 210 Q660 270 900 190 Q1140 110 1440 220 L1440 300 Z"
          fill="url(#hwNear)"
          opacity="0.95"
        />
        <g
          className="holly-sign"
          fill="#FBF7F0"
          fontFamily="Arial Black, Arial, sans-serif"
          fontSize="32"
          fontWeight="900"
        >
          <text x="960" y="160" transform="rotate(-4 960 160)">
            H
          </text>
          <text x="998" y="156" transform="rotate(-3 998 156)">
            O
          </text>
          <text x="1038" y="153" transform="rotate(-2 1038 153)">
            L
          </text>
          <text x="1070" y="151">
            L
          </text>
          <text x="1102" y="150" transform="rotate(1 1102 150)">
            Y
          </text>
          <text x="1140" y="151" transform="rotate(2 1140 151)">
            W
          </text>
          <text x="1188" y="153" transform="rotate(3 1188 153)">
            O
          </text>
          <text x="1228" y="156" transform="rotate(4 1228 156)">
            O
          </text>
          <text x="1268" y="160" transform="rotate(5 1268 160)">
            D
          </text>
        </g>
      </svg>
      <svg className="star star-a" viewBox="0 0 24 24" width="20" height="20">
        <path
          d="M12 2 L14.5 9 L22 9 L16 13.5 L18 21 L12 16.5 L6 21 L8 13.5 L2 9 L9.5 9 Z"
          fill="var(--brass-soft)"
        />
      </svg>
      <svg className="star star-b" viewBox="0 0 24 24" width="14" height="14">
        <path
          d="M12 2 L14.5 9 L22 9 L16 13.5 L18 21 L12 16.5 L6 21 L8 13.5 L2 9 L9.5 9 Z"
          fill="#FFFDFA"
        />
      </svg>
      <svg className="star star-c" viewBox="0 0 24 24" width="17" height="17">
        <path
          d="M12 2 L14.5 9 L22 9 L16 13.5 L18 21 L12 16.5 L6 21 L8 13.5 L2 9 L9.5 9 Z"
          fill="var(--brass-soft)"
        />
      </svg>
    </div>
  );
}

function SceneCoast() {
  const box = useSceneBox(760); // frame the pier and ferris wheel (x 1050–1440)
  return (
    <div className="scene scene-beach" aria-hidden="true">
      <svg
        className="p-layer"
        data-speed="0.1"
        viewBox={box(260)}
        preserveAspectRatio="xMidYMax slice"
      >
        <g stroke="#4A423A" strokeWidth="9" opacity="0.9">
          <line x1="1080" y1="150" x2="1080" y2="260" />
          <line x1="1140" y1="150" x2="1140" y2="260" />
          <line x1="1200" y1="150" x2="1200" y2="260" />
          <line x1="1260" y1="150" x2="1260" y2="260" />
          <line x1="1320" y1="150" x2="1320" y2="260" />
          <line x1="1380" y1="150" x2="1380" y2="260" />
        </g>
        <rect x="1050" y="134" width="390" height="18" rx="4" fill="#5C452F" />
        <g className="ferris" transform="translate(1210,88)">
          <g className="ferris-spin">
            <circle r="42" fill="none" stroke="#5C452F" strokeWidth="4" />
            <g stroke="#5C452F" strokeWidth="2.5">
              <line x1="-42" y1="0" x2="42" y2="0" />
              <line x1="0" y1="-42" x2="0" y2="42" />
              <line x1="-30" y1="-30" x2="30" y2="30" />
              <line x1="-30" y1="30" x2="30" y2="-30" />
            </g>
            <g fill="var(--brass)">
              <circle cx="0" cy="-42" r="6" />
              <circle cx="0" cy="42" r="6" />
              <circle cx="-42" cy="0" r="6" />
              <circle cx="42" cy="0" r="6" />
              <circle cx="-30" cy="-30" r="6" />
              <circle cx="30" cy="30" r="6" />
              <circle cx="-30" cy="30" r="6" />
              <circle cx="30" cy="-30" r="6" />
            </g>
          </g>
          <polygon points="-14,44 14,44 0,0" fill="#4A423A" />
        </g>
      </svg>
      <svg
        className="p-layer"
        data-speed="0.25"
        viewBox={box(240)}
        preserveAspectRatio="xMidYMax slice"
      >
        {/* Shoreline sits above the wave layer so the sand stays visible */}
        <defs>
          <linearGradient id="csSand" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#EFE2CE" />
            <stop offset="1" stopColor="#D8C4A4" />
          </linearGradient>
        </defs>
        <path
          d="M0 240 L0 120 Q360 100 720 118 Q1080 136 1440 110 L1440 240 Z"
          fill="url(#csSand)"
        />
        <g className="beach-palm-a" transform="translate(150,54)">
          <g className="palm-sway">
            <path
              d="M0 130 Q10 60 4 8"
              stroke="#4A423A"
              strokeWidth="11"
              fill="none"
              strokeLinecap="round"
            />
            <g fill="#5C452F">
              <path d="M4 8 Q-40 -12 -62 10 Q-28 8 4 8 Z" />
              <path d="M4 8 Q48 -12 70 10 Q36 8 4 8 Z" />
              <path d="M4 8 Q-18 -36 -40 -30 Q-10 -12 4 8 Z" />
              <path d="M4 8 Q26 -36 48 -30 Q16 -12 4 8 Z" />
            </g>
          </g>
        </g>
        <g className="beach-palm-b" transform="translate(340,96) scale(0.72)">
          <g className="palm-sway-slow">
            <path
              d="M0 130 Q-10 60 -4 8"
              stroke="#4A423A"
              strokeWidth="11"
              fill="none"
              strokeLinecap="round"
            />
            <g fill="#5C452F">
              <path d="M-4 8 Q-48 -12 -70 10 Q-36 8 -4 8 Z" />
              <path d="M-4 8 Q40 -12 62 10 Q28 8 -4 8 Z" />
              <path d="M-4 8 Q-26 -36 -48 -30 Q-16 -12 -4 8 Z" />
              <path d="M-4 8 Q18 -36 40 -30 Q10 -12 -4 8 Z" />
            </g>
          </g>
        </g>
        <g className="beach-umbrella" transform="translate(576,152)">
          <line x1="0" y1="0" x2="0" y2="48" stroke="#4A423A" strokeWidth="4" />
          <path d="M-44 4 A44 44 0 0 1 44 4 Z" fill="#5C452F" />
          <path d="M-22 4 A22 38 0 0 1 22 4 Z" fill="var(--brass)" />
        </g>
      </svg>
      <svg
        className="p-layer wave-layer"
        data-speed="0.4"
        viewBox={box(120)}
        preserveAspectRatio="xMidYMax slice"
      >
        <path
          className="wave wave-back"
          d="M-100 120 L-100 60 Q-25 30 50 60 Q125 90 200 60 Q275 30 350 60 Q425 90 500 60 Q575 30 650 60 Q725 90 800 60 Q875 30 950 60 Q1025 90 1100 60 Q1175 30 1250 60 Q1325 90 1400 60 Q1475 30 1550 60 L1550 120 Z"
          fill="#6FA0B4"
          opacity="0.75"
        />
        <path
          className="wave wave-front"
          d="M-100 120 L-100 80 Q-25 55 50 80 Q125 105 200 80 Q275 55 350 80 Q425 105 500 80 Q575 55 650 80 Q725 105 800 80 Q875 55 950 80 Q1025 105 1100 80 Q1175 55 1250 80 Q1325 105 1400 80 Q1475 55 1550 80 L1550 120 Z"
          fill="#3F7189"
        />
      </svg>
    </div>
  );
}

/* ── Scroll dynamics: sky shift, sun travel, parallax ──────── */
function useScrollScenery() {
  useEffect(() => {
    const clamp01 = (v) => Math.min(1, Math.max(0, v));
    const mid = document.querySelector(".sky-mid");
    const dusk = document.querySelector(".sky-dusk");
    const sun = document.querySelector(".sun");
    const layers = Array.from(document.querySelectorAll(".p-layer"));

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        const progress = max > 0 ? clamp01(window.scrollY / max) : 0;

        if (mid) mid.style.opacity = clamp01(progress / 0.5);
        if (dusk) dusk.style.opacity = clamp01((progress - 0.5) / 0.4);
        if (sun) {
          sun.style.transform = `translateY(${progress * 58}vh) scale(${1 + progress * 0.35})`;
        }

        const vh = window.innerHeight;
        for (const layer of layers) {
          const speed = parseFloat(layer.dataset.speed || "0.2");
          const rect = layer.closest("section").getBoundingClientRect();
          const delta = rect.top + rect.height / 2 - vh / 2;
          // Amplitude stays under the layer's 60px bottom bleed so edges stay hidden
          layer.style.transform = `translateY(${delta * speed * 0.1}px)`;
        }
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
}

/* ── Reveal-on-scroll ──────────────────────────────────────── */
function useReveals() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in-view"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${(idx % 4) * 90}ms`;
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function App() {
  const [sent, setSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useScrollScenery();
  useReveals();

  // The mobile menu is a fixed overlay; without this the page scrolls behind it.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Opens the visitor's mail client with the message pre-filled. They still
  // have to press send there — the success panel says so.
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const get = (field) => (data.get(field) || "").trim();
    const name = get("name");
    const phone = get("phone");

    const subject = name ? `Website inquiry from ${name}` : "Website inquiry";
    const body = [
      `Name: ${name}`,
      `Email: ${get("email")}`,
      phone && `Phone: ${phone}`,
      "",
      get("message"),
    ]
      .filter((line) => line !== false)
      .join("\n");

    window.location.href =
      `mailto:${AGENT.email}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    setSent(true);
  };

  const closeMenu = () => setMenuOpen(false);

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
          <span
            className={`burger ${menuOpen ? "is-open" : ""}`}
            aria-hidden="true"
          />
        </button>

        <nav className={`nav ${menuOpen ? "is-open" : ""}`}>
          <a href="#about" onClick={closeMenu}>
            About
          </a>
          <a href="#neighborhoods" onClick={closeMenu}>
            Neighborhoods
          </a>
          <a href="#services" onClick={closeMenu}>
            Services
          </a>
          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>
          <a href={AGENT.phoneHref} className="nav-cta" onClick={closeMenu}>
            {AGENT.phone}
          </a>
        </nav>
      </header>

      <main id="top">
        {/* ── HERO · Downtown skyline ── */}
        <section className="hero">
          <div className="hero-inner">
            <p className="eyebrow">West Los Angeles Real Estate</p>
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

          <div className="hero-portrait">
            <div className="portrait-frame">
              <img
                src={profilePhoto}
                alt={`${AGENT.name}, ${AGENT.brokerage} real estate agent`}
                fetchPriority="high"
              />
            </div>
            <div className="portrait-badge">
              <strong>{AGENT.name}</strong>
              <span>
                {AGENT.brokerage} · DRE# {AGENT.dre}
              </span>
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
          <div className="about-inner">
            <figure className="profile-card reveal">
              {/* Softly curved tile roof with a scalloped eave — a straight
                  triangle read as a child's drawing of a house. */}
              {/* viewBox ends exactly at the scallop bottom (cy 99 + r 5), so
                  the negative margin below is a true overlap, not dead space. */}
              <svg className="roof" viewBox="0 0 300 104" aria-hidden="true">
                <defs>
                  <linearGradient id="roofTile" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#D98A6B" />
                    <stop offset="1" stopColor="#9A4A30" />
                  </linearGradient>
                </defs>
                {/* chimney with a rounded cap, set behind the roof plane */}
                <rect x="228" y="24" width="18" height="44" rx="4" fill="#8A6A4B" />
                <rect x="222" y="17" width="30" height="11" rx="5.5" fill="var(--brass)" />
                {/* the roof itself: eased pitch, overhanging eaves */}
                <path
                  d="M150 6 C168 6 258 74 288 90 C296 94 294 99 287 99 L13 99 C6 99 4 94 12 90 C42 74 132 6 150 6 Z"
                  fill="url(#roofTile)"
                />
                {/* barrel-tile courses following the slope */}
                <g stroke="#9A4A30" strokeWidth="1.5" opacity="0.45" fill="none">
                  <path d="M150 22 C164 22 238 78 264 90" />
                  <path d="M150 22 C136 22 62 78 36 90" />
                  <path d="M150 44 C160 44 214 82 232 92" />
                  <path d="M150 44 C140 44 86 82 68 92" />
                </g>
                {/* scalloped eave so the bottom edge is not a hard line */}
                <g fill="#9A4A30" opacity="0.9">
                  {Array.from({ length: 19 }, (_, i) => (
                    <circle key={i} cx={17 + i * 15} cy="99" r="5" />
                  ))}
                </g>
              </svg>
              <div className="photo-wrap">
                <img
                  src={aboutPhoto}
                  alt={`${AGENT.name}, ${AGENT.brokerage} real estate agent`}
                  loading="lazy"
                />
              </div>
              <figcaption>
                <strong>{AGENT.name}</strong>
                <span>
                  {AGENT.brokerage} · DRE# {AGENT.dre}
                </span>
                <em>
                  “My goal is simple: make your move feel easy, informed, and
                  genuinely yours.”
                </em>
              </figcaption>
              <svg
                className="sold-sign"
                viewBox="0 0 120 90"
                aria-hidden="true"
              >
                <rect x="56" y="34" width="7" height="56" fill="var(--oak)" />
                <g className="sold-swing">
                  <rect
                    x="12"
                    y="8"
                    width="96"
                    height="36"
                    rx="4"
                    fill="var(--oak-deep)"
                  />
                  <rect
                    x="17"
                    y="13"
                    width="86"
                    height="26"
                    rx="2"
                    fill="none"
                    stroke="var(--brass-soft)"
                    strokeWidth="1.5"
                  />
                  <text
                    x="60"
                    y="32"
                    textAnchor="middle"
                    fontSize="17"
                    letterSpacing="2"
                    fill="var(--brass-soft)"
                    fontFamily="Georgia, serif"
                  >
                    SOLD
                  </text>
                </g>
              </svg>
            </figure>

            <div className="about-text reveal">
              <p className="eyebrow">About Jackie</p>
              <h2>
                A decade in the business, a lifetime in these neighborhoods.
              </h2>
              <p>
                For ten years I’ve helped clients across Los Angeles find the
                right home and sell for the best price. But my connection to
                this market goes back much further than my career. I grew up
                here, and that gives me an understanding of these neighborhoods
                you can’t get from a listing sheet alone. I know how they’ve
                changed, what makes each one different, and what it actually
                feels like to live in them.
              </p>
              <p>
                Real estate is personal to me, both professionally and in my own
                life — my own investments are rooted in this market too. Buying
                a home is never just a transaction. It’s one of the biggest
                decisions you’ll make, and I treat every client’s search with
                the care, honesty, and attention that decision deserves.
              </p>
              <p>
                As an agent with {AGENT.brokerage}, I combine deep local roots
                with a hands-on, one-on-one approach. Whether you’re a
                first-time buyer or a longtime owner ready for the next chapter,
                I’m here to guide you every step of the way.
              </p>
              <a href="#contact" className="btn btn-primary">
                <DoorIcon />
                <span>Let’s talk</span>
              </a>
            </div>
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
          <div className="section-head reveal">
            <p className="eyebrow center">How I Can Help</p>
            <h2>Full-service guidance, start to finish.</h2>
          </div>
          {/* Alternating rows rather than a row of identical cards — the
              vignette swaps sides on each entry so the page has a rhythm. */}
          <div className="svc-list">
            {SERVICES.map((s, i) => (
              <article className="svc-row reveal" key={s.title}>
                <div className="svc-art-frame">
                  <InteriorArt kind={s.art} />
                </div>
                <div className="svc-copy">
                  <span className="svc-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── CONTACT · the coast ── */}
        <section id="contact" className="contact">
          <div className="contact-panel reveal">
            <div className="contact-info">
              <div className="contact-agent">
                <img src={profilePhoto} alt="" />
                <div>
                  <strong>{AGENT.name}</strong>
                  <span>{AGENT.brokerage}</span>
                </div>
              </div>
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
                  <h3>One last step</h3>
                  <p>
                    Your email app should have opened with your message ready —
                    press send there and it comes straight to me. If nothing
                    opened, reach me at{" "}
                    <a href={`mailto:${AGENT.email}`}>{AGENT.email}</a> or call{" "}
                    <a href={AGENT.phoneHref}>{AGENT.phone}</a>.
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
            <small>
              {AGENT.brokerage} · {AGENT.area}
            </small>
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
  );
}

export default App;

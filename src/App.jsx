import { useEffect, useState } from "react";
import "./App.css";
import logo from "/logo.svg";

// Two frames from the same shoot: the closer, smiling one sits in the
// facade's arched window, the thoughtful one in the sala's deep-set window.
const profilePhoto = `${import.meta.env.BASE_URL}Jackie_Profile.JPG`;
const aboutPhoto = `${import.meta.env.BASE_URL}Jackie_Photo.jpg`;

const AGENT = {
  name: "Jacqueline Horn Hernandez",
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

/* ── Seeded randomness ─────────────────────────────────────────
   The organic pieces (bougainvillea, chipped plaster, petals) are
   generated once at module load from fixed seeds, so every render and
   every visitor sees the same garden. */
function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}
const r1 = (n) => Math.round(n * 10) / 10;

/* ── Bougainvillea ─────────────────────────────────────────────
   What you see on bougainvillea is bracts, not petals: papery magenta
   leaves in loose clusters around tiny cream flowers. */
const BRACT_TONES = ["#d42a78", "#b81d62", "#e0508f", "#c8246a", "#a3154f"];
const LEAF_TONES = ["#3e6b36", "#4f7d42", "#355c2f"];

function makeCluster(rand, cx, cy, R) {
  const bracts = [];
  const n = Math.round(R * 0.95);
  for (let i = 0; i < n; i++) {
    const a = rand() * Math.PI * 2;
    const d = Math.sqrt(rand()) * R * 0.72;
    bracts.push({
      cx: r1(cx + Math.cos(a) * d),
      cy: r1(cy + Math.sin(a) * d),
      rx: r1(4.6 + rand() * 2.4),
      ry: r1(3.6 + rand() * 1.8),
      rot: Math.round(rand() * 180),
      fill: BRACT_TONES[Math.floor(rand() * BRACT_TONES.length)],
    });
  }
  const leaves = [];
  const nl = 2 + Math.floor(rand() * 3);
  for (let i = 0; i < nl; i++) {
    const a = rand() * Math.PI * 2;
    const d = R * (0.62 + rand() * 0.35);
    leaves.push({
      x: r1(cx + Math.cos(a) * d),
      y: r1(cy + Math.sin(a) * d),
      rot: Math.round((a * 180) / Math.PI),
      len: r1(9 + rand() * 7),
      fill: LEAF_TONES[Math.floor(rand() * LEAF_TONES.length)],
    });
  }
  const florets = [0, 1, 2].map(() => ({
    x: r1(cx + (rand() - 0.5) * R * 0.8),
    y: r1(cy + (rand() - 0.5) * R * 0.8),
  }));
  return { bracts, leaves, florets };
}

const leafPath = (len) =>
  `M0 0Q${r1(len / 2)} ${r1(-len * 0.34)} ${len} 0Q${r1(len / 2)} ${r1(len * 0.34)} 0 0Z`;

function Cluster({ c, i }) {
  return (
    <g className="bloom" style={{ "--i": i }}>
      {c.leaves.map((l, k) => (
        <path
          key={`l${k}`}
          d={leafPath(l.len)}
          fill={l.fill}
          transform={`translate(${l.x} ${l.y}) rotate(${l.rot})`}
        />
      ))}
      {c.bracts.map((b, k) => (
        <ellipse
          key={k}
          cx={b.cx}
          cy={b.cy}
          rx={b.rx}
          ry={b.ry}
          fill={b.fill}
          stroke="#7d0f3c"
          strokeOpacity="0.3"
          strokeWidth="0.6"
          transform={`rotate(${b.rot} ${b.cx} ${b.cy})`}
        />
      ))}
      {c.florets.map((f, k) => (
        <circle key={`f${k}`} cx={f.x} cy={f.y} r="1.3" fill="#fbf1dc" />
      ))}
    </g>
  );
}

// Coordinates share the vine's 380×640 viewBox, laid over the arched
// window so the arch centre lands at (110, 240) with the vine riding a
// 212-unit radius just outside the plaster molding.
const vineRand = seeded(1926);
const VINE_CLUSTERS = [
  [316, 530, 13], [327, 458, 16], [315, 390, 12], [329, 318, 18],
  [321, 208, 20], [297, 140, 24], [262, 92, 22], [210, 52, 20],
  [147, 30, 18], [82, 32, 15], [33, 48, 11], [19, 96, 9],
  [289, 174, 13], [294, 226, 10], [233, 110, 12], [239, 150, 9],
].map(([x, y, r]) => makeCluster(vineRand, x, y, r));

const boxRand = seeded(1932);
const BOX_CLUSTERS = [
  [104, 12, 14], [222, 8, 16], [338, 11, 14], [160, 22, 9], [282, 20, 10],
  [58, 30, 8], [390, 30, 8],
].map(([x, y, r]) => makeCluster(boxRand, x, y, r));

function Bougainvillea() {
  return (
    <svg className="vine" viewBox="0 0 380 640" aria-hidden="true">
      <g fill="none" stroke="#5a3f26" strokeLinecap="round">
        <path
          className="vine-stem"
          pathLength="1"
          strokeWidth="3.4"
          d="M252 604 C300 580 332 520 326 452 S316 300 322 240 A212 212 0 0 0 31 46 C15 60 12 86 18 112"
        />
        <path
          className="vine-stem vine-late"
          pathLength="1"
          strokeWidth="2"
          d="M284 118 C291 150 285 190 294 234"
        />
        <path
          className="vine-stem vine-late"
          pathLength="1"
          strokeWidth="2"
          d="M232 66 C237 92 230 120 238 154"
        />
      </g>
      {VINE_CLUSTERS.map((c, i) => (
        <Cluster key={i} c={c} i={i} />
      ))}
    </svg>
  );
}

/* ── Wrought-iron window box under the sill ── */
function WindowBox() {
  const bars = [];
  for (let x = 48; x <= 392; x += 21.5) bars.push(x);
  return (
    <svg className="window-box" viewBox="0 0 440 110" aria-hidden="true">
      <defs>
        <linearGradient id="potClay" x1="0" x2="1">
          <stop offset="0" stopColor="#d9804f" />
          <stop offset="0.5" stopColor="#bf5f31" />
          <stop offset="1" stopColor="#8f3d1c" />
        </linearGradient>
      </defs>
      {/* terracotta pots behind the ironwork */}
      {[70, 185, 300].map((x) => (
        <g key={x}>
          <path d={`M${x} 24 H${x + 70} L${x + 62} 72 H${x + 8} Z`} fill="url(#potClay)" />
          <rect x={x - 4} y="18" width="78" height="10" rx="2" fill="#c96a3a" />
        </g>
      ))}
      {/* foliage mounded over the rims */}
      <g>
        {[
          [100, 20, 30, 13, "#355c2f"], [220, 16, 34, 14, "#3e6b36"], [336, 19, 30, 13, "#355c2f"],
          [150, 24, 22, 10, "#4f7d42"], [280, 24, 24, 10, "#4f7d42"], [60, 28, 18, 9, "#3e6b36"],
          [386, 28, 18, 9, "#3e6b36"],
        ].map(([cx, cy, rx, ry, fill], i) => (
          <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill={fill} />
        ))}
      </g>
      {BOX_CLUSTERS.map((c, i) => (
        <Cluster key={i} c={c} i={i + VINE_CLUSTERS.length} />
      ))}
      {/* the iron basket and its scroll brackets */}
      <g stroke="#1e1916" fill="none" strokeLinecap="round">
        <path d="M26 30 H414" strokeWidth="5" />
        <path d="M36 76 H404" strokeWidth="4" />
        {bars.map((x) => (
          <path key={x} d={`M${r1(x)} 30 V76`} strokeWidth="2.6" />
        ))}
        {bars.slice(0, -1).map((x, i) =>
          i % 2 === 0 ? (
            <circle key={`r${x}`} cx={r1(x + 10.75)} cy="53" r="6" strokeWidth="2" />
          ) : null,
        )}
        <path d="M42 76 C42 100 72 106 80 90 C86 78 72 72 68 82" strokeWidth="3.4" />
        <path d="M398 76 C398 100 368 106 360 90 C354 78 368 72 372 82" strokeWidth="3.4" />
      </g>
      {/* trailing strands spilling over the front */}
      <g fill="none" stroke="#4f7d42" strokeWidth="1.6" strokeLinecap="round">
        <path d="M118 30 C114 52 126 72 116 100" />
        <path d="M232 28 C238 50 226 74 236 106" />
        <path d="M322 30 C318 48 330 64 324 88" />
      </g>
      <g fill="#3e6b36">
        {[
          [116, 46, 30], [122, 64, -40], [117, 86, 20], [235, 44, -30], [229, 66, 40],
          [234, 92, -20], [321, 46, 30], [327, 66, -30],
        ].map(([x, y, rot], i) => (
          <path key={i} d={leafPath(9)} transform={`translate(${x} ${y}) rotate(${rot})`} />
        ))}
      </g>
    </svg>
  );
}

/* ── Washingtonia palms above the roofline ──
   The tall, thin Mexican fan palm is the LA street tree. Seen this far
   off they're silhouettes: a pencil trunk, a shaggy skirt of dead
   fronds, and a small crown of fan leaves whose tips droop. */
const FRONDS = [
  [-170, 40], [-150, 44], [-128, 44], [-106, 42], [-88, 40], [-70, 42],
  [-50, 44], [-28, 44], [-8, 40], [14, 38], [40, 30], [140, 30], [166, 38],
  [62, 24], [118, 24],
];
function fanFrond(cx, cy, deg, len) {
  const a = (deg * Math.PI) / 180;
  // gravity: sideways fronds bend down at the tip
  const droop = (24 * Math.abs(Math.cos(a)) * Math.PI) / 180;
  const b = a + (Math.cos(a) >= 0 ? droop : -droop);
  const px = cx + Math.cos(a) * len * 0.3;
  const py = cy + Math.sin(a) * len * 0.3;
  let d = `M${r1(px)} ${r1(py)}`;
  const spikes = 9;
  for (let i = 0; i <= spikes; i++) {
    const t = b + (i / spikes - 0.5) * 0.9;
    const r = len * (i % 2 ? 0.5 : 0.7);
    d += `L${r1(px + Math.cos(t) * r)} ${r1(py + Math.sin(t) * r)}`;
  }
  return `${d}Z`;
}
const PALM_CROWN = FRONDS.map(([deg, len], i) => ({
  d: fanFrond(70, 56, deg, len),
  shade: i % 2 === 0,
}));

function Palm({ className }) {
  return (
    <svg className={`palm ${className}`} viewBox="0 0 140 360" aria-hidden="true">
      <path d="M68 96 Q66 230 65 360 H73 Q71 230 72 96 Z" fill="#7a6552" />
      <path d="M62 60 C60 74 61 88 64 100 L76 100 C79 88 80 74 78 60 Z" fill="#7d6248" />
      <g className="palm-crown">
        <circle cx="70" cy="57" r="17" fill="#4f634a" />
        {PALM_CROWN.map((f, i) => (
          <path key={i} d={f.d} fill={f.shade ? "#4f634a" : "#5f7657"} />
        ))}
      </g>
    </svg>
  );
}

/* ── Frond shadow raking across the facade ──
   A feather palm somewhere off to the upper left, its shadow thrown
   onto the limewash. Blurred once inside the SVG, then only its
   transform animates, so the blur is never recomputed. */
function featherFrond([x0, y0], [x1, y1], [x2, y2], maxLen) {
  let d = `M${x0} ${y0}Q${x1} ${y1} ${x2} ${y2}`;
  for (let t = 0.06; t < 0.98; t += 0.032) {
    const u = 1 - t;
    const x = u * u * x0 + 2 * u * t * x1 + t * t * x2;
    const y = u * u * y0 + 2 * u * t * y1 + t * t * y2;
    const tx = 2 * u * (x1 - x0) + 2 * t * (x2 - x1);
    const ty = 2 * u * (y1 - y0) + 2 * t * (y2 - y1);
    const tl = Math.hypot(tx, ty);
    const ux = tx / tl;
    const uy = ty / tl;
    const len = maxLen * (1 - 0.62 * t);
    for (const ang of [0.95, -0.95]) {
      const dx = ux * Math.cos(ang) - uy * Math.sin(ang);
      const dy = ux * Math.sin(ang) + uy * Math.cos(ang);
      d += `M${r1(x)} ${r1(y)}q${r1(dx * len * 0.5)} ${r1(dy * len * 0.5 + len * 0.06)} ${r1(dx * len)} ${r1(dy * len + len * 0.22)}`;
    }
  }
  return d;
}
const SHADOW_FRONDS = [
  featherFrond([0, 30], [260, 40], [580, 250], 96),
  featherFrond([0, 150], [200, 190], [440, 400], 80),
  featherFrond([0, 0], [190, -30], [420, 40], 70),
];

function PalmShadow() {
  return (
    <svg className="palm-shadow" viewBox="0 0 640 460" aria-hidden="true">
      <defs>
        <filter id="shadowBlur" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
      </defs>
      <g
        filter="url(#shadowBlur)"
        fill="none"
        stroke="#3b2718"
        strokeWidth="7"
        strokeLinecap="round"
      >
        {SHADOW_FRONDS.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  );
}

/* ── Petals drifting down the facade ── */
const petalRand = seeded(1948);
const PETALS = Array.from({ length: 15 }, () => ({
  x: r1(50 + petalRand() * 44),
  y: r1(16 + petalRand() * 24),
  delay: r1(2.2 + petalRand() * 13),
  dur: r1(11 + petalRand() * 8),
  dx: Math.round(-60 - petalRand() * 280),
  s: r1(0.7 + petalRand() * 0.6),
  spin: Math.round(260 + petalRand() * 420),
}));

function Petals() {
  return (
    <div className="petals" aria-hidden="true">
      <svg width="0" height="0" className="svg-defs">
        <defs>
          <linearGradient id="petalFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ea5b9b" />
            <stop offset="1" stopColor="#a8185a" />
          </linearGradient>
        </defs>
      </svg>
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            "--delay": `${p.delay}s`,
            "--dur": `${p.dur}s`,
            "--dx": `${p.dx}px`,
            "--s": p.s,
            "--spin": `${p.spin}deg`,
          }}
        >
          <svg viewBox="0 0 20 20" width="18" height="18">
            <path d="M10 1C15.5 4 18.5 10 10 19C1.5 10 4.5 4 10 1Z" fill="url(#petalFill)" />
            <path d="M10 3.5V16" stroke="#f7a8c8" strokeWidth="0.8" opacity="0.6" />
          </svg>
        </span>
      ))}
    </div>
  );
}

/* ── SOLD sign on a wrought-iron bracket ── */
function IronSign() {
  return (
    <svg className="iron-sign" viewBox="0 0 150 90" aria-hidden="true">
      <defs>
        <linearGradient id="signWalnut" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6a4530" />
          <stop offset="1" stopColor="#3f271a" />
        </linearGradient>
      </defs>
      <rect x="1" y="4" width="8" height="46" rx="2" fill="#1e1916" />
      <circle cx="5" cy="10" r="1.6" fill="#7a6656" />
      <circle cx="5" cy="44" r="1.6" fill="#7a6656" />
      <g stroke="#1e1916" fill="none" strokeLinecap="round">
        <path d="M8 14 H138" strokeWidth="4" />
        <path d="M8 44 C40 44 70 34 88 14" strokeWidth="3" />
        <path d="M28 40 C28 29 43 27 45 35 C46 41 39 42 38 37" strokeWidth="2.2" />
        <path d="M138 14 C147 14 147 25 139 25 C134 25 134 19 138 19" strokeWidth="2.4" />
      </g>
      <g className="sold-swing">
        <path d="M46 14 V36 M120 14 V36" stroke="#1e1916" strokeWidth="1.8" />
        <rect x="32" y="34" width="102" height="42" rx="4" fill="url(#signWalnut)" />
        <g stroke="#2e1c12" strokeWidth="0.8" opacity="0.6">
          <path d="M36 44 H130 M36 58 H130 M36 68 H128" />
        </g>
        <rect x="37" y="39" width="92" height="32" rx="2" fill="none" stroke="#e3a42f" strokeWidth="1.2" opacity="0.85" />
        <text
          x="83"
          y="63"
          textAnchor="middle"
          fontFamily="'Ibarra Real Nova', Georgia, serif"
          fontSize="21"
          fontWeight="600"
          letterSpacing="4"
          fill="#f1e5c8"
        >
          SOLD
        </text>
      </g>
    </svg>
  );
}

/* ── Iron lantern hung from the apex of the doorway ── */
function Lantern() {
  return (
    <div className="lantern" aria-hidden="true">
      <span className="lantern-glow" />
      <svg viewBox="0 0 100 176">
        <defs>
          <radialGradient id="lampGlass" cx="0.5" cy="0.55" r="0.62">
            <stop offset="0" stopColor="#fff3cc" />
            <stop offset="0.45" stopColor="#f8c86e" />
            <stop offset="1" stopColor="#cf7f2e" />
          </radialGradient>
        </defs>
        <g fill="none" stroke="#1e1916" strokeWidth="2">
          {[4, 13, 22, 31].map((y) => (
            <ellipse key={y} cx="50" cy={y} rx="2.6" ry="4.6" />
          ))}
          <circle cx="50" cy="40" r="3.4" strokeWidth="2.4" />
          <path d="M26 68 C15 66 15 53 24 55 M74 68 C85 66 85 53 76 55" strokeWidth="2.2" strokeLinecap="round" />
        </g>
        <path d="M50 44 L76 68 H24 Z" fill="#1e1916" />
        <rect x="22" y="66" width="56" height="7" rx="1.5" fill="#1e1916" />
        <rect className="lantern-glass" x="28" y="73" width="44" height="60" fill="url(#lampGlass)" />
        <ellipse className="lantern-flame" cx="50" cy="106" rx="5" ry="9" fill="#fff7dc" />
        <path d="M39 73 V133 M61 73 V133 M28 99 H72" stroke="#1e1916" strokeWidth="2.4" />
        <path d="M27 73 V133 M73 73 V133" stroke="#1e1916" strokeWidth="3.6" />
        <rect x="22" y="133" width="56" height="7" rx="1.5" fill="#1e1916" />
        <path d="M28 140 L50 162 L72 140 Z" fill="#1e1916" />
        <circle cx="50" cy="166" r="3.6" fill="#1e1916" />
      </svg>
    </div>
  );
}

/* ── Chipped plaster ───────────────────────────────────────────
   Old limewash falls away in irregular flakes and shows the adobe
   underneath. A clip-path polygon in percentages keeps the shape
   responsive; the rim is the same outline pushed out a little and
   nudged down-right, where the broken edge catches the light. */
function chipOutline(rand, n) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    let k = 0.8 + rand() * 0.18;
    if (rand() < 0.24) k -= 0.12 + rand() * 0.12;
    pts.push([(i / n) * Math.PI * 2 + (rand() - 0.5) * 0.12, k]);
  }
  return pts;
}
const polygonFrom = (pts, grow = 0) =>
  `polygon(${pts
    .map(
      ([a, k]) =>
        `${r1(50 + Math.cos(a) * (50 * k + grow))}% ${r1(50 + Math.sin(a) * (50 * k + grow))}%`,
    )
    .join(", ")})`;

const PATCHES = [chipOutline(seeded(1781), 30), chipOutline(seeded(1812), 26)].map(
  (pts) => ({ hole: polygonFrom(pts), rim: polygonFrom(pts, 3) }),
);

function WornPatch({ className, variant = 0 }) {
  const p = PATCHES[variant];
  return (
    <div className={`worn-patch ${className}`} aria-hidden="true">
      <span className="worn-rim" style={{ clipPath: p.rim }} />
      <span className="worn-bricks" style={{ clipPath: p.hole }} />
    </div>
  );
}

/* ── Ragged plaster edges around the exposed adobe wall ── */
function raggedEdge(rand, { steps = 64, min, max, bottom = false }) {
  const pts = [];
  let y = (min + max) / 2;
  for (let i = 0; i <= steps; i++) {
    y += (rand() - 0.5) * (max - min) * 0.5;
    if (rand() < 0.14) y += (rand() - 0.35) * (max - min) * 0.7;
    y = Math.min(max, Math.max(min, y));
    pts.push([r1((i / steps) * 100), Math.round(y)]);
  }
  const edge = pts
    .reverse()
    .map(([x, py]) => (bottom ? `${x}% calc(100% - ${py}px)` : `${x}% ${py}px`))
    .join(", ");
  return bottom
    ? `polygon(0% 100%, 100% 100%, ${edge})`
    : `polygon(0% 0%, 100% 0%, ${edge})`;
}
const EDGE_TOP = raggedEdge(seeded(1769), { min: 8, max: 44 });
const EDGE_BOTTOM = raggedEdge(seeded(1850), { min: 6, max: 38, bottom: true });

/* ── Header state ── */
function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
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
  const scrolled = useScrolled();

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
      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
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
        {/* ── HERO · the facade: sky, palms, tile roof, limewash wall ── */}
        <section className="facade">
          <div className="sky" aria-hidden="true">
            <Palm className="palm-far palm-d" />
            <Palm className="palm-far palm-e" />
            <Palm className="palm-a" />
            <Palm className="palm-b" />
            <Palm className="palm-c" />
          </div>
          <div className="rafters" aria-hidden="true" />
          <div className="roof" aria-hidden="true">
            <div className="roof-plane" />
          </div>
          <PalmShadow />

          <div className="facade-copy">
            <p className="eyebrow rise" style={{ "--d": "0.2s" }}>
              West Los Angeles Real Estate
            </p>
            <h1>
              <span className="line">
                <span style={{ "--d": "0.35s" }}>Finding your place</span>
              </span>
              <span className="line">
                <span style={{ "--d": "0.5s" }}>
                  under the <em className="hl">LA sky</em>.
                </span>
              </span>
            </h1>
            <p className="hero-sub rise" style={{ "--d": "0.8s" }}>
              Hi, I’m {AGENT.name} — a {AGENT.brokerage} agent helping families
              buy and sell across Los Angeles for over 10 years.
            </p>
            <div className="hero-actions rise" style={{ "--d": "0.95s" }}>
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

          <div className="facade-window">
            <div className="arch-molding">
              <div className="arch-reveal">
                <div className="arch-glass">
                  <img
                    src={profilePhoto}
                    alt={`${AGENT.name}, ${AGENT.brokerage} real estate agent`}
                    fetchPriority="high"
                  />
                </div>
              </div>
            </div>
            <div className="sill" aria-hidden="true" />
            <WindowBox />
            <Bougainvillea />
            <div className="tile-plaque">
              <strong>{AGENT.name}</strong>
              <span>
                {AGENT.brokerage} · DRE# {AGENT.dre}
              </span>
            </div>
          </div>

          <Petals />

          <div className="steps" aria-hidden="true">
            <span className="tread" />
            <span className="riser" />
            <span className="tread" />
            <span className="riser" />
          </div>
        </section>

        {/* ── STATS · hand-painted tiles set into the wall ── */}
        <section className="stats">
          {STATS.map((s) => (
            <div className="stat reveal" key={s.label}>
              <span className="stat-tile">
                <span className="stat-value">{s.value}</span>
              </span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </section>

        {/* ── ABOUT · the sala: beamed ceiling, deep-set window ── */}
        <section id="about" className="sala">
          <div className="ceiling-beam" aria-hidden="true" />
          <WornPatch className="patch-sala" />
          <div className="sala-inner">
            <figure className="deepset reveal">
              <div className="deepset-lintel" aria-hidden="true" />
              <div className="deepset-reveal">
                <div className="deepset-photo">
                  <img
                    src={aboutPhoto}
                    alt={`${AGENT.name}, ${AGENT.brokerage} real estate agent`}
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="deepset-sill" aria-hidden="true" />
              <IronSign />
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

        {/* ── NEIGHBORHOODS · the loggia, one arch per part of town ── */}
        <section id="neighborhoods" className="loggia">
          <div className="section-head reveal">
            <p className="eyebrow">Where I Work</p>
            <h2>The neighborhoods I know best.</h2>
          </div>
          <div className="arcade">
            {NEIGHBORHOODS.map((n) => (
              <article className={`arch-card view-${n.art} reveal`} key={n.title}>
                <div className="arch-opening">
                  <div className="arch-view">
                    <CardArt kind={n.art} />
                  </div>
                </div>
                <div className="arch-copy">
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
        </section>

        {/* ── SERVICES · where the plaster has fallen away ── */}
        <section id="services" className="adobe">
          <span className="edge-shadow" aria-hidden="true">
            <span style={{ clipPath: EDGE_TOP }} />
          </span>
          <span className="plaster-edge edge-top" style={{ clipPath: EDGE_TOP }} aria-hidden="true" />
          <span className="sconce-glow glow-a" aria-hidden="true" />
          <span className="sconce-glow glow-b" aria-hidden="true" />

          <div className="section-head reveal">
            <p className="eyebrow">How I Can Help</p>
            <h2>Full-service guidance, start to finish.</h2>
          </div>
          {/* Alternating rows rather than a row of identical cards — the
              tiled frame swaps sides on each entry so the page has a rhythm. */}
          <div className="svc-list">
            {SERVICES.map((s, i) => (
              <article className="svc-row reveal" key={s.title}>
                <div className="svc-frame">
                  <InteriorArt kind={s.art} />
                </div>
                <div className="svc-copy">
                  <span className="svc-num">
                    <span>{String(i + 1).padStart(2, "0")}</span>
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </article>
            ))}
          </div>

          <span className="plaster-edge edge-rim" style={{ clipPath: EDGE_BOTTOM }} aria-hidden="true" />
          <span className="plaster-edge edge-bottom" style={{ clipPath: EDGE_BOTTOM }} aria-hidden="true" />
        </section>

        {/* ── CONTACT · the front door ── */}
        <section id="contact" className="patio">
          <WornPatch className="patch-patio" variant={1} />
          <div className="doorway reveal">
            <Lantern />
            <div className="contact-panel">
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
          </div>
          <div className="patio-floor" aria-hidden="true">
            <div className="patio-floor-plane" />
          </div>
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

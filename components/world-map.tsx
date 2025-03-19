"use client"

export default function WorldMap() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet">
        <g transform="scale(1.5) translate(50, 20)">
          {/* Simplified world map paths */}
          <path
            d="M122,122 L132,102 L142,112 L152,102 L162,112 L172,102 L182,112 L192,102 L202,112 L212,102 L222,112 L232,102 L242,112"
            fill="none"
            stroke="#0a1525"
            strokeWidth="30"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M282,122 L292,102 L302,112 L312,102 L322,112 L332,102 L342,112 L352,102 L362,112 L372,102 L382,112 L392,102 L402,112"
            fill="none"
            stroke="#0a1525"
            strokeWidth="30"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M122,162 L132,142 L142,152 L152,142 L162,152 L172,142 L182,152 L192,142 L202,152 L212,142 L222,152 L232,142 L242,152"
            fill="none"
            stroke="#0a1525"
            strokeWidth="30"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M282,162 L292,142 L302,152 L312,142 L322,152 L332,142 L342,152 L352,142 L362,152 L372,142 L382,152 L392,142 L402,152"
            fill="none"
            stroke="#0a1525"
            strokeWidth="30"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="200" cy="100" r="5" fill="#10b981" />
          <circle cx="300" cy="150" r="5" fill="#10b981" />
          <circle cx="250" cy="120" r="5" fill="#10b981" />
          <circle cx="180" cy="140" r="5" fill="#10b981" />
          <circle cx="350" cy="110" r="5" fill="#10b981" />
          <circle cx="220" cy="130" r="5" fill="#10b981" />
          <circle cx="270" cy="90" r="5" fill="#10b981" />
        </g>
      </svg>
    </div>
  )
}


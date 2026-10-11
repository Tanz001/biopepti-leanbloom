import React from 'react';

interface VialGraphicProps {
  color?: string; // Cap color
  accent?: string;
  size?: number;
  className?: string;
  label?: string;
  sublabel?: string;
  purity?: string;
}

export const VialGraphic: React.FC<VialGraphicProps> = ({
  color = '#0E9F8E',
  accent = '#5EEAD4',
  size = 180,
  className = '',
  label = 'LUMORA LABS',
  sublabel = 'RESEARCH PEPTIDE',
  purity = '≥99% HPLC'
}) => {
  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size * 1.35 }}
    >
      <svg
        viewBox="0 0 120 162"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl"
      >
        <defs>
          {/* Glass Gradient */}
          <linearGradient id="glassGrad" x1="20" y1="50" x2="100" y2="50" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
            <stop offset="15%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="40%" stopColor="#E2F4F0" stopOpacity="0.25" />
            <stop offset="75%" stopColor="#FFFFFF" stopOpacity="0.2" />
            <stop offset="90%" stopColor="#FFFFFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#A8C5BD" stopOpacity="0.8" />
          </linearGradient>

          {/* Lyophilized Cake Gradient */}
          <linearGradient id="cakeGrad" x1="25" y1="120" x2="95" y2="150" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#E6F2EF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#CBE3DD" stopOpacity="0.95" />
          </linearGradient>

          {/* Metallic Crimp Collar Gradient */}
          <linearGradient id="aluminumGrad" x1="32" y1="20" x2="88" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="25%" stopColor="#F1F5F9" />
            <stop offset="50%" stopColor="#CBD5E1" />
            <stop offset="75%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>

          {/* Cap Gradient */}
          <linearGradient id="capGrad" x1="30" y1="8" x2="90" y2="8" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={color} />
            <stop offset="40%" stopColor={accent} />
            <stop offset="80%" stopColor={color} />
            <stop offset="100%" stopColor="#0B1F2A" />
          </linearGradient>

          {/* Label Background */}
          <linearGradient id="labelGrad" x1="24" y1="70" x2="96" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.96" />
            <stop offset="100%" stopColor="#F8FAFC" stopOpacity="0.94" />
          </linearGradient>
        </defs>

        {/* Ambient shadow underneath */}
        <ellipse cx="60" cy="157" rx="35" ry="5" fill="#0B1F2A" fillOpacity="0.12" />

        {/* --- VIAL BODY (GLASS) --- */}
        {/* Main Glass Outer Border & Reflection */}
        <rect
          x="24"
          y="38"
          width="72"
          height="114"
          rx="12"
          fill="url(#glassGrad)"
          stroke="#94A3B8"
          strokeWidth="1.2"
          strokeOpacity="0.6"
        />

        {/* Vial Neck */}
        <path
          d="M38 38 L38 28 Q38 24 44 24 L76 24 Q82 24 82 28 L82 38 Z"
          fill="url(#aluminumGrad)"
          stroke="#64748B"
          strokeWidth="1"
        />

        {/* Metallic Crimp Collar Ring */}
        <rect
          x="36"
          y="20"
          width="48"
          height="9"
          rx="2"
          fill="url(#aluminumGrad)"
          stroke="#475569"
          strokeWidth="0.8"
        />

        {/* Flip-off Cap */}
        <rect
          x="32"
          y="10"
          width="56"
          height="11"
          rx="4"
          fill="url(#capGrad)"
        />
        <rect
          x="34"
          y="11"
          width="52"
          height="3"
          rx="1.5"
          fill="#FFFFFF"
          fillOpacity="0.4"
        />

        {/* Lyophilized Cake (Freeze-dried peptide pellet) */}
        <path
          d="M26 134 Q45 130 60 133 Q75 136 94 133 L94 146 Q94 150 88 150 L32 150 Q26 150 26 146 Z"
          fill="url(#cakeGrad)"
        />
        {/* Cake textured pores */}
        <circle cx="40" cy="140" r="1" fill="#0E9F8E" fillOpacity="0.3" />
        <circle cx="55" cy="138" r="1.2" fill="#0E9F8E" fillOpacity="0.2" />
        <circle cx="70" cy="142" r="0.8" fill="#0E9F8E" fillOpacity="0.35" />
        <circle cx="80" cy="139" r="1.1" fill="#0E9F8E" fillOpacity="0.25" />

        {/* Clinical Label */}
        <g>
          <rect
            x="27"
            y="54"
            width="66"
            height="64"
            rx="4"
            fill="url(#labelGrad)"
            stroke="#CBD5E1"
            strokeWidth="0.8"
          />
          {/* Label Brand Color Bar */}
          <rect x="27" y="54" width="66" height="5" rx="2" fill={color} />

          {/* Label Micro Text & Branding */}
          <text
            x="60"
            y="67"
            textAnchor="middle"
            fill="#0B1F2A"
            fontSize="6"
            fontWeight="bold"
            letterSpacing="0.4"
            fontFamily="sans-serif"
          >
            {label}
          </text>

          <text
            x="60"
            y="76"
            textAnchor="middle"
            fill="#0E9F8E"
            fontSize="4.8"
            fontWeight="600"
            fontFamily="monospace"
          >
            {sublabel}
          </text>

          {/* Divider line */}
          <line x1="33" y1="80" x2="87" y2="80" stroke="#E2E8F0" strokeWidth="0.6" />

          {/* Purity badge */}
          <rect x="36" y="85" width="48" height="9" rx="2" fill="#E7F6F3" />
          <text
            x="60"
            y="91.5"
            textAnchor="middle"
            fill="#0B1F2A"
            fontSize="4.6"
            fontWeight="bold"
            fontFamily="monospace"
          >
            {purity}
          </text>

          {/* Micro Laboratory Data lines */}
          <rect x="34" y="99" width="30" height="2" rx="1" fill="#94A3B8" fillOpacity="0.6" />
          <rect x="34" y="103" width="22" height="2" rx="1" fill="#94A3B8" fillOpacity="0.4" />
          <rect x="34" y="107" width="26" height="2" rx="1" fill="#94A3B8" fillOpacity="0.5" />

          {/* 2D Data Matrix code placeholder */}
          <rect x="74" y="98" width="12" height="12" rx="1" fill="#0B1F2A" fillOpacity="0.85" />
          <rect x="76" y="100" width="3" height="3" fill="#FFFFFF" />
          <rect x="81" y="104" width="3" height="3" fill="#FFFFFF" />
        </g>

        {/* Graduation Tick marks on Glass (Left side) */}
        <line x1="27" y1="50" x2="33" y2="50" stroke="#94A3B8" strokeWidth="0.8" strokeOpacity="0.7" />
        <line x1="27" y1="70" x2="31" y2="70" stroke="#94A3B8" strokeWidth="0.6" strokeOpacity="0.5" />
        <line x1="27" y1="90" x2="33" y2="90" stroke="#94A3B8" strokeWidth="0.8" strokeOpacity="0.7" />
        <line x1="27" y1="110" x2="31" y2="110" stroke="#94A3B8" strokeWidth="0.6" strokeOpacity="0.5" />
        <line x1="27" y1="130" x2="33" y2="130" stroke="#94A3B8" strokeWidth="0.8" strokeOpacity="0.7" />

        {/* Gloss vertical highlight across the glass */}
        <path
          d="M30 42 L30 144 Q30 148 34 148 L35 148 Q32 148 32 144 L32 42 Z"
          fill="#FFFFFF"
          fillOpacity="0.75"
        />
        <path
          d="M89 42 L89 144 Q89 148 85 148 L84 148 Q87 148 87 144 L87 42 Z"
          fill="#FFFFFF"
          fillOpacity="0.3"
        />
      </svg>
    </div>
  );
};

import React from "react";

interface BatikLogoProps {
  size?: number;
  className?: string;
  variant?: "dark-card" | "gold-card" | "outline" | "standalone";
}

export default function BatikLogo({
  size = 72,
  className = "",
  variant = "dark-card",
}: BatikLogoProps) {
  // Variant styles
  const isDarkCard = variant === "dark-card";

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md select-none"
      >
        <defs>
          {/* Rich luxury gold metallic gradient */}
          <linearGradient id="goldLuster" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5D78E" />
            <stop offset="35%" stopColor="#DFB96C" />
            <stop offset="70%" stopColor="#C59E50" />
            <stop offset="100%" stopColor="#A47B2E" />
          </linearGradient>

          {/* Deep mocha card gradient */}
          <linearGradient id="mochaCard" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34221C" />
            <stop offset="50%" stopColor="#2A1B16" />
            <stop offset="100%" stopColor="#211410" />
          </linearGradient>

          {/* Subtle gold stroke gradient */}
          <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFC386" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#A27930" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {isDarkCard && (
          <>
            {/* Card Background: Rounded square with subtle bevel */}
            <rect
              x="2"
              y="2"
              width="96"
              height="96"
              rx="24"
              fill="url(#mochaCard)"
              stroke="url(#goldBorder)"
              strokeWidth="1.5"
            />

            {/* Inner subtle glow ring */}
            <rect
              x="5"
              y="5"
              width="90"
              height="90"
              rx="21"
              fill="none"
              stroke="#F5D78E"
              strokeWidth="0.5"
              strokeOpacity="0.15"
            />
          </>
        )}

        {/* 
          The iconic Batik Celaket 4-lobed floral/Kawung emblem 
          Composed of 4 symmetrical oval loops with hollow centers,
          meeting harmoniously around the center.
        */}
        <g
          transform={isDarkCard ? "translate(0, 0)" : "translate(0, 0)"}
          filter="drop-shadow(0px 1px 2px rgba(0,0,0,0.35))"
        >
          {/* Top-Left Petal Loop */}
          <ellipse
            cx="36.5"
            cy="36.5"
            rx="14.5"
            ry="11.5"
            transform="rotate(-45 36.5 36.5)"
            stroke="url(#goldLuster)"
            strokeWidth="5.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Top-Right Petal Loop */}
          <ellipse
            cx="63.5"
            cy="36.5"
            rx="14.5"
            ry="11.5"
            transform="rotate(45 63.5 36.5)"
            stroke="url(#goldLuster)"
            strokeWidth="5.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Bottom-Left Petal Loop */}
          <ellipse
            cx="36.5"
            cy="63.5"
            rx="14.5"
            ry="11.5"
            transform="rotate(45 36.5 63.5)"
            stroke="url(#goldLuster)"
            strokeWidth="5.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Bottom-Right Petal Loop */}
          <ellipse
            cx="63.5"
            cy="63.5"
            rx="14.5"
            ry="11.5"
            transform="rotate(-45 63.5 63.5)"
            stroke="url(#goldLuster)"
            strokeWidth="5.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Center core motif: Small circular core tying the 4 petals */}
          <circle cx="50" cy="50" r="3" fill="url(#goldLuster)" />

          {/* 4 subtle decorative dot accents in petal centers */}
          <circle cx="36.5" cy="36.5" r="1.8" fill="url(#goldLuster)" opacity="0.9" />
          <circle cx="63.5" cy="36.5" r="1.8" fill="url(#goldLuster)" opacity="0.9" />
          <circle cx="36.5" cy="63.5" r="1.8" fill="url(#goldLuster)" opacity="0.9" />
          <circle cx="63.5" cy="63.5" r="1.8" fill="url(#goldLuster)" opacity="0.9" />
        </g>
      </svg>
    </div>
  );
}

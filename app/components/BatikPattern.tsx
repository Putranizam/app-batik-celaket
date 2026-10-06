import React from "react";

export default function BatikPattern({
  className = "",
  opacity = 0.08,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <pattern
            id="batikKawungHeritage"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            {/* Traditional Kawung 4-fold circular geometry */}
            <circle
              cx="30"
              cy="0"
              r="20"
              fill="none"
              stroke="#DFC386"
              strokeWidth="1.2"
            />
            <circle
              cx="30"
              cy="60"
              r="20"
              fill="none"
              stroke="#DFC386"
              strokeWidth="1.2"
            />
            <circle
              cx="0"
              cy="30"
              r="20"
              fill="none"
              stroke="#DFC386"
              strokeWidth="1.2"
            />
            <circle
              cx="60"
              cy="30"
              r="20"
              fill="none"
              stroke="#DFC386"
              strokeWidth="1.2"
            />

            {/* Diagonal floral seeds */}
            <circle cx="30" cy="30" r="3.5" fill="#DFC386" />
            <circle cx="0" cy="0" r="2.5" fill="#DFC386" />
            <circle cx="60" cy="0" r="2.5" fill="#DFC386" />
            <circle cx="0" cy="60" r="2.5" fill="#DFC386" />
            <circle cx="60" cy="60" r="2.5" fill="#DFC386" />

            {/* Inner petal highlights */}
            <path
              d="M30 15 Q35 30 30 45 Q25 30 30 15 Z"
              fill="none"
              stroke="#DFC386"
              strokeWidth="0.8"
            />
            <path
              d="M15 30 Q30 35 45 30 Q30 25 15 30 Z"
              fill="none"
              stroke="#DFC386"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#batikKawungHeritage)" />
      </svg>
    </div>
  );
}

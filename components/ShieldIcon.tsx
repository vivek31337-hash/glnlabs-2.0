"use client";

interface ShieldIconProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

export default function ShieldIcon({ size = 32, className = "", animated = false }: ShieldIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${animated ? "glitch-animation" : ""} ${className}`}
    >
      <defs>
        <linearGradient id="shieldGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
      </defs>
      <path
        d="M16 2L4 7v9c0 7.18 5.16 13.9 12 15.5C22.84 29.9 28 23.18 28 16V7L16 2z"
        fill="url(#shieldGradient)"
      />
      <path
        d="M16 2L4 7v9c0 7.18 5.16 13.9 12 15.5C22.84 29.9 28 23.18 28 16V7L16 2z"
        stroke="#6366f1"
        strokeWidth="1"
        fillOpacity="0"
      />
      <path
        d="M11 16l3.5 3.5L21 12"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

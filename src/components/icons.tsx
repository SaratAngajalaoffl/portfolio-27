import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = (props: P) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

export const GitHub = (p: P) => (
  <svg {...base(p)} fill="currentColor" stroke="none">
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.7 5.38-5.27 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
  </svg>
);
export const XLogo = (p: P) => (
  <svg {...base(p)} fill="currentColor" stroke="none">
    <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3Zm-1.08 16.17h1.7L7.4 4.73H5.58l11.09 14.44Z" />
  </svg>
);
export const LinkedIn = (p: P) => (
  <svg {...base(p)} fill="currentColor" stroke="none">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
  </svg>
);
export const Arrow = (p: P) => (
  <svg {...base(p)}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);
export const ArrowDown = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </svg>
);
export const ChevronLeft = (p: P) => (
  <svg {...base(p)} strokeWidth={2.6}>
    <path d="m15 18-6-6 6-6" />
  </svg>
);
export const ChevronRight = (p: P) => (
  <svg {...base(p)} strokeWidth={2.6}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);
export const ChevronDown = (p: P) => (
  <svg {...base(p)} strokeWidth={2.4}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);
export const Play = (p: P) => (
  <svg {...base(p)} fill="currentColor" stroke="none">
    <path d="M7 4.8v14.4a1 1 0 0 0 1.5.86l11.5-7.2a1 1 0 0 0 0-1.72L8.5 3.94A1 1 0 0 0 7 4.8Z" />
  </svg>
);
export const Pause = (p: P) => (
  <svg {...base(p)} fill="currentColor" stroke="none">
    <rect x="6" y="4" width="4.5" height="16" rx="1.5" />
    <rect x="13.5" y="4" width="4.5" height="16" rx="1.5" />
  </svg>
);
export const Sun = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);
export const Moon = (p: P) => (
  <svg {...base(p)}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
  </svg>
);
export const Heart = (p: P) => (
  <svg {...base(p)}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);
export const Star = (p: P) => (
  <svg {...base(p)} fill="currentColor" stroke="none">
    <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
  </svg>
);
export const Copy = (p: P) => (
  <svg {...base(p)}>
    <rect x="9" y="9" width="13" height="13" rx="3" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);
export const Check = (p: P) => (
  <svg {...base(p)} strokeWidth={3.2}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
export const Pin = (p: P) => (
  <svg {...base(p)} fill="currentColor" stroke="none">
    <path d="M12 2a8 8 0 0 0-8 8c0 5.4 7 11.5 7.3 11.8a1 1 0 0 0 1.4 0C13 21.5 20 15.4 20 10a8 8 0 0 0-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
  </svg>
);
export const Search = (p: P) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);
export const Mail = (p: P) => (
  <svg {...base(p)}>
    <rect x="2" y="4" width="20" height="16" rx="3" />
    <path d="m22 7-10 6L2 7" />
  </svg>
);
export const Pulse = (p: P) => (
  <svg {...base(p)} strokeWidth={2.4}>
    <path d="M3 12h4l3-8 4 16 3-8h4" />
  </svg>
);

/* Project glyphs */
export const Candles = (p: P) => (
  <svg {...base(p)} strokeWidth={2.2}>
    <path d="M6 3v4M6 15v6M18 3v6M18 17v4M12 2v3M12 13v4" />
    <rect x="4" y="7" width="4" height="8" rx="1.2" fill="currentColor" />
    <rect x="16" y="9" width="4" height="8" rx="1.2" fill="currentColor" />
    <rect x="10" y="5" width="4" height="8" rx="1.2" />
  </svg>
);
export const Tree = (p: P) => (
  <svg {...base(p)} strokeWidth={2.2}>
    <circle cx="12" cy="7" r="4.5" fill="currentColor" />
    <circle cx="6.5" cy="12" r="3.5" fill="currentColor" />
    <circle cx="17.5" cy="12" r="3.5" fill="currentColor" />
    <path d="M12 11v11M12 17l-4-3M12 15l4-3M9 22h6" />
  </svg>
);
export const Server = (p: P) => (
  <svg {...base(p)} strokeWidth={2.2}>
    <rect x="3" y="3" width="18" height="7.5" rx="2.5" />
    <rect x="3" y="13.5" width="18" height="7.5" rx="2.5" />
    <path d="M7 6.75h.01M7 17.25h.01M11 6.75h6M11 17.25h6" />
  </svg>
);
export const Terminal = (p: P) => (
  <svg {...base(p)} strokeWidth={2.2}>
    <rect x="2" y="3" width="20" height="18" rx="4" />
    <path d="m7 9 3 3-3 3M13 15h4" />
  </svg>
);
export const Wallet = (p: P) => (
  <svg {...base(p)} strokeWidth={2.2}>
    <path d="M19 7V5a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h14a2 2 0 0 1 2 2v3h-4a2 2 0 0 0 0 4h4v1a2 2 0 0 1-2 2H5a3 3 0 0 1-3-3V6" />
  </svg>
);

/* Mugiwara = straw hat */
export const StrawHat = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 64" aria-hidden {...p}>
    <defs>
      <radialGradient id="straw" cx="35%" cy="30%" r="75%">
        <stop offset="0" stopColor="#ffe9a8" />
        <stop offset="1" stopColor="#e7b54a" />
      </radialGradient>
    </defs>
    <ellipse cx="32" cy="42" rx="29" ry="10" fill="url(#straw)" />
    <path d="M15 40c0-14 7-24 17-24s17 10 17 24c-5 3-29 3-34 0z" fill="url(#straw)" />
    <path d="M15.6 34.5c6 3 26.8 3 32.8 0l.6 5.5c-5 3-29 3-34 0z" fill="#f05a5a" />
  </svg>
);

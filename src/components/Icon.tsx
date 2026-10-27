import type { SVGProps } from "react";

/**
 * Original line icon set for Axis Agro. Drawn on a 48×48 grid with a consistent
 * 1.75 stroke so they sit together across cards, steps and decorative accents.
 */
const PATHS = {
  avocado: (
    <>
      <path d="M24 5c-5 0-8 6-10.5 13.5C11 26 9 30 9 34a15 15 0 0 0 30 0c0-4-2-8-4.5-15.5C32 11 29 5 24 5Z" />
      <circle cx="24" cy="32" r="6.5" />
      <path d="M24 5c1.5-1.8 3.4-2.6 5.5-2.5" />
    </>
  ),
  pineapple: (
    <>
      <path d="M24 17c-7 0-11 6-11 14s4 14 11 14 11-6 11-14-4-14-11-14Z" />
      <path d="m15.5 24 17 13M32.5 24l-17 13M14 31h20" />
      <path d="M24 17c-1-5-4-8-8-10 3 0 5.5 1 7 3-.5-3 .5-6 1-8 .5 2 1.5 5 1 8 1.5-2 4-3 7-3-4 2-7 5-8 10" />
    </>
  ),
  mango: (
    <>
      <path d="M30 9c-9-2-20 5-21 17-.8 9 5 15 13 15 9 0 17-7 17-17 0-7-3.5-13.5-9-15Z" />
      <path d="M30 9c0-3 1.5-5 4-6" />
      <path d="M33 6c4-1 8 0 10 3-4 1.5-7 1-10-3Z" />
      <path d="M15 28c1 4 4 7 8 8" />
    </>
  ),
  banana: (
    <>
      <path d="M8 14c0 14 10 26 26 26 3 0 6-1 7-3-12 0-21-9-23-22l-.5-4" />
      <path d="M17.5 11 15 6l-3 1 1.5 5" />
      <path d="M8 14c3-2 7-3 9.5-3" />
      <path d="M13 22c4 7 10 11 18 13" />
    </>
  ),
  passion: (
    <>
      <circle cx="24" cy="26" r="16" />
      <circle cx="24" cy="26" r="11" />
      <path d="M24 10c0-3 1.5-5.5 4-7" />
      <circle cx="20" cy="23" r="1" />
      <circle cx="27" cy="22" r="1" />
      <circle cx="23" cy="29" r="1" />
      <circle cx="29" cy="29" r="1" />
      <circle cx="18" cy="30" r="1" />
    </>
  ),
  papaya: (
    <>
      <path d="M24 4c-8 0-12 9-12 20s4 20 12 20 12-9 12-20S32 4 24 4Z" />
      <path d="M24 13c-3 0-5 5-5 11s2 11 5 11 5-5 5-11-2-11-5-11Z" />
      <circle cx="24" cy="20" r=".9" />
      <circle cx="23" cy="25" r=".9" />
      <circle cx="25" cy="30" r=".9" />
    </>
  ),
  soursop: (
    <>
      <path d="M24 6c-9 0-15 8-15 19 0 9 7 17 15 17s15-8 15-17c0-11-6-19-15-19Z" />
      <path d="m16 16 2 2M30 15l-2 2M14 26l2.5.5M34 26l-2.5.5M18 35l1.5-2M30 35l-1.5-2M24 13v2.5M24 36v-2.5M21 25h.01M27 22h.01M25 29h.01" />
      <path d="M24 6c0-2 1-3.5 3-4" />
    </>
  ),
  jackfruit: (
    <>
      <ellipse cx="24" cy="27" rx="13" ry="17" />
      <path d="M24 10V4M18 18l3 3M30 18l-3 3M14 27h4M30 27h4M18 36l3-3M30 36l-3-3M24 21v3M24 31v3" />
    </>
  ),
  coffee: (
    <>
      <ellipse cx="24" cy="24" rx="12.5" ry="17" transform="rotate(30 24 24)" />
      <path d="M17 36c5-4 4-9 7-13s8-6 7-12" />
    </>
  ),
  cocoa: (
    <>
      <path d="M24 4c-7 3-11 11-11 20s4 17 11 20c7-3 11-11 11-20S31 7 24 4Z" />
      <path d="M24 4v40M18.5 9c-1.5 4-2.5 9-2.5 15s1 11 2.5 15M29.5 9c1.5 4 2.5 9 2.5 15s-1 11-2.5 15" />
    </>
  ),
  ginger: (
    <>
      <path d="M8 30c0-5 4-7 8-7 1-5 5-8 9-6 2-4 8-5 11-1 4 0 6 4 4 8 2 4-1 8-5 7-2 4-8 5-11 2-4 3-10 2-12-1-3 0-4-1-4-2Z" />
      <path d="M16 23c1 2 1 4 0 6M25 17c1 2 1 5-1 7M33 25c-1 2-3 3-5 3" />
    </>
  ),
  chilli: (
    <>
      <path d="M34 14c-5 0-7 4-9 10-3 9-8 15-17 18 14 2 25-6 28-17 1-4 1-8-2-11Z" />
      <path d="M34 14c0-4 2-7 5-9" />
      <path d="M31 13c1-2 4-2 6 0" />
    </>
  ),
  sesame: (
    <>
      <path d="M14 10c-3 3-3 8 0 11 3-3 3-8 0-11ZM32 6c-3 3-3 8 0 11 3-3 3-8 0-11ZM24 18c-3 3-3 8 0 11 3-3 3-8 0-11ZM12 30c-3 3-3 8 0 11 3-3 3-8 0-11ZM35 27c-3 3-3 8 0 11 3-3 3-8 0-11Z" />
    </>
  ),
  herb: (
    <>
      <path d="M24 44V12" />
      <path d="M24 34c-6 0-11-4-12-10 6 0 11 4 12 10ZM24 34c6 0 11-4 12-10-6 0-11 4-12 10ZM24 22c-5 0-9-3-10-8 5 0 9 3 10 8ZM24 22c5 0 9-3 10-8-5 0-9 3-10 8ZM24 12c-2-3-2-6 0-8 2 2 2 5 0 8Z" />
    </>
  ),
  leaf: (
    <>
      <path d="M8 40C8 20 20 8 42 6c-1 22-13 34-34 34Z" />
      <path d="M8 40 30 18M18 30h8M22 26v-8" />
    </>
  ),
  tuber: (
    <>
      <path d="M9 27c-2-7 5-14 15-16 10-2 17 3 16 10-1 8-8 14-17 15-7 1-12-3-14-9Z" />
      <path d="M40 21c2-1 4-1 5 0M17 22h.01M27 18h.01M31 27h.01M20 30h.01" />
      <path d="M12 33c-2 2-4 3-7 3" />
    </>
  ),
  nut: (
    <>
      <path d="M24 6c-8 0-13 7-13 16 0 11 6 20 13 20s13-9 13-20c0-9-5-16-13-16Z" />
      <path d="M24 6v36M17 14c2 2 2 5 0 7M31 14c-2 2-2 5 0 7M17 28c2 2 2 5 0 7M31 28c-2 2-2 5 0 7" />
    </>
  ),
  sun: (
    <>
      <circle cx="24" cy="24" r="8" />
      <path d="M24 4v6M24 38v6M4 24h6M38 24h6M9.9 9.9l4.2 4.2M33.9 33.9l4.2 4.2M9.9 38.1l4.2-4.2M33.9 14.1l4.2-4.2" />
    </>
  ),
  drop: (
    <>
      <path d="M24 5C18 14 11 21 11 29a13 13 0 0 0 26 0c0-8-7-15-13-24Z" />
      <path d="M17 30c0 4 3 7 7 7" />
    </>
  ),
  container: (
    <>
      <rect x="4" y="13" width="40" height="22" rx="1.5" />
      <path d="M11 17v14M17 17v14M23 17v14M29 17v14M35 17v14M41 17v14" />
      <path d="M4 39h40" />
    </>
  ),
  ship: (
    <>
      <path d="M4 30h40l-5 10H9L4 30Z" />
      <path d="M10 30v-7h8v7M18 30v-7h8v7M26 30v-11h8v11M14 23v-5h8v5" />
      <path d="M36 30V14h4v16" />
      <path d="M4 44c3 0 3-2 6-2s3 2 6 2 3-2 6-2 3 2 6 2 3-2 6-2 3 2 6 2" />
    </>
  ),
  plane: (
    <>
      <path d="M44 14c0-2-2-3-4-2L28 18 12 12l-4 2 12 9-7 5-5-1-3 2 6 4 4 6 2-3-1-5 5-7 9 12 2-4-6-16 12-12Z" />
    </>
  ),
  truck: (
    <>
      <rect x="3" y="12" width="26" height="20" rx="1.5" />
      <path d="M29 18h8l7 8v6H29" />
      <circle cx="12" cy="36" r="4" />
      <circle cx="36" cy="36" r="4" />
      <path d="M16 36h16M3 32h5" />
    </>
  ),
  sourcing: (
    <>
      <path d="M4 34h8l8 3c2 .7 4 0 4-2s-2-3-4-3h-5" />
      <path d="M12 30h8l12-6c2-1 4 0 4 2 0 1-1 2-2 3l-10 8c-2 1.5-4 2-6 2H12" />
      <path d="M4 30v10" />
      <path d="M30 20V8M30 14c-4 0-7-2-7-6 4 0 7 2 7 6ZM30 11c3 0 6-2 6-6-3 0-6 2-6 6Z" />
    </>
  ),
  calendar: (
    <>
      <rect x="6" y="9" width="36" height="33" rx="3" />
      <path d="M6 18h36M15 5v8M33 5v8M14 26h4M22 26h4M30 26h4M14 33h4M22 33h4" />
    </>
  ),
  scale: (
    <>
      <path d="M24 6v36M12 42h24M8 12h32" />
      <path d="M12 12 6 26a6 6 0 0 0 12 0l-6-14ZM36 12l-6 14a6 6 0 0 0 12 0l-6-14Z" />
    </>
  ),
  snow: (
    <>
      <path d="M24 4v40M6.7 14l34.6 20M6.7 34l34.6-20" />
      <path d="m19 8 5 4 5-4M19 40l5-4 5 4M8 21l6-1-2-6M40 27l-6 1 2 6M8 27l6 1-2 6M40 21l-6-1 2-6" />
    </>
  ),
  box: (
    <>
      <path d="M24 4 42 13v22L24 44 6 35V13L24 4Z" />
      <path d="M6 13l18 9 18-9M24 22v22M15 8.5l18 9" />
    </>
  ),
  bag: (
    <>
      <path d="M12 12h24l3 30H9l3-30Z" />
      <path d="M12 12c0-3 2-6 4-6h16c2 0 4 3 4 6M16 20h16M16 26h16" />
    </>
  ),
  check: <path d="m9 25 9 9 21-20" />,
  flask: (
    <>
      <path d="M18 5h12M20 5v13L8 38c-1.5 2.5 0 5 3 5h26c3 0 4.5-2.5 3-5L28 18V5" />
      <path d="M12.5 30h23" />
    </>
  ),
  shield: (
    <>
      <path d="M24 4 8 10v12c0 10 7 18 16 22 9-4 16-12 16-22V10L24 4Z" />
      <path d="m16 24 6 6 10-11" />
    </>
  ),
  tag: (
    <>
      <path d="M4 24 22 6h18v18L22 42 4 24Z" />
      <circle cx="32" cy="14" r="3" />
    </>
  ),
  document: (
    <>
      <path d="M10 4h20l8 8v32H10V4Z" />
      <path d="M30 4v8h8M16 20h16M16 27h16M16 34h10" />
    </>
  ),
  globe: (
    <>
      <circle cx="24" cy="24" r="19" />
      <path d="M5 24h38M24 5c5 5 8 12 8 19s-3 14-8 19c-5-5-8-12-8-19s3-14 8-19Z" />
    </>
  ),
  warehouse: (
    <>
      <path d="M4 18 24 6l20 12v24H4V18Z" />
      <path d="M12 42V24h24v18M12 30h24M12 36h24" />
    </>
  ),
  handshake: (
    <>
      <path d="M3 18 11 12l8 3 6-3 9 2 11 4" />
      <path d="M3 18v12l6 2 9 8c1.5 1.5 4 1 4-1l1 1c1.5 1.5 4 .5 4-1.5 1.5 1 4 0 4-2 2 1 4-1 3-3l-9-9" />
      <path d="M45 18v12l-6 2M25 12l-6 6c-1.5 1.5 0 4 2 4 2 0 4-1 6-3l3 1" />
    </>
  ),
  pin: (
    <>
      <path d="M24 44S38 30 38 19a14 14 0 0 0-28 0c0 11 14 25 14 25Z" />
      <circle cx="24" cy="19" r="5" />
    </>
  ),
  phone: (
    <path d="M42 33.5v5.5a4 4 0 0 1-4.4 4A39 39 0 0 1 5 10.4 4 4 0 0 1 9 6h5.5a4 4 0 0 1 4 3.4c.3 2 .8 3.8 1.5 5.6a4 4 0 0 1-.9 4.2l-2.3 2.3a32 32 0 0 0 12 12l2.3-2.3a4 4 0 0 1 4.2-.9c1.8.7 3.6 1.2 5.6 1.5a4 4 0 0 1 3.4 4Z" />
  ),
  mail: (
    <>
      <rect x="4" y="9" width="40" height="30" rx="3" />
      <path d="m5 11 19 15 19-15" />
    </>
  ),
  arrow: <path d="M6 24h34M28 12l12 12-12 12" />,
  chevron: <path d="m12 18 12 12 12-12" />,
  search: (
    <>
      <circle cx="21" cy="21" r="14" />
      <path d="m31 31 12 12" />
    </>
  ),
  menu: <path d="M6 13h36M6 24h36M6 35h36" />,
  close: <path d="M10 10l28 28M38 10 10 38" />,
  upload: (
    <>
      <path d="M24 32V6M14 16 24 6l10 10" />
      <path d="M6 30v8a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4v-8" />
    </>
  ),
  info: (
    <>
      <circle cx="24" cy="24" r="19" />
      <path d="M24 22v12M24 15h.01" />
    </>
  ),
  plus: <path d="M24 8v32M8 24h32" />,
  trash: (
    <>
      <path d="M6 12h36M18 12V6h12v6M10 12l2 30h24l2-30M20 20v14M28 20v14" />
    </>
  ),
  edit: (
    <>
      <path d="M30 8 40 18 18 40H8V30L30 8Z" />
      <path d="m26 12 10 10" />
    </>
  ),
  clock: (
    <>
      <circle cx="24" cy="24" r="19" />
      <path d="M24 12v12l8 5" />
    </>
  ),
  store: (
    <>
      <path d="M6 18 9 6h30l3 12" />
      <path d="M6 18c0 3 2.5 5 5 5s5-2 5-5c0 3 2.5 5 5 5h6c2.5 0 5-2 5-5 0 3 2.5 5 5 5s5-2 5-5" />
      <path d="M9 23v19h30V23M19 42V31h10v11" />
    </>
  ),
  factory: (
    <>
      <path d="M4 42V22l10 6v-6l10 6v-6l10 6V8h8v34H4Z" />
      <path d="M11 35h4M20 35h4M29 35h4" />
    </>
  ),
  cutlery: (
    <>
      <path d="M14 4v14a5 5 0 0 0 10 0V4M19 4v40" />
      <path d="M36 44V4c-5 3-7 10-7 18h7" />
    </>
  ),
  cart: (
    <>
      <path d="M3 6h6l5 26h24l4-18H11" />
      <circle cx="17" cy="40" r="3" />
      <circle cx="35" cy="40" r="3" />
    </>
  ),
  users: (
    <>
      <circle cx="18" cy="16" r="7" />
      <path d="M4 42c0-8 6-13 14-13s14 5 14 13" />
      <path d="M31 9.5a7 7 0 0 1 0 13M36 29c5 1.5 8 6 8 13" />
    </>
  ),
  recycle: (
    <>
      <path d="M17 10 22 4l8 0 7 12M37 16l-7 1M37 16l2-7" />
      <path d="M40 28l3 6-4 7H25M25 41l5-5M25 41l5 5" />
      <path d="M14 41H8l-4-7 7-12M11 22l2 7M11 22l-7 2" />
    </>
  ),
  route: (
    <>
      <circle cx="10" cy="38" r="4" />
      <circle cx="38" cy="10" r="4" />
      <path d="M14 38h16a6 6 0 0 0 0-12H18a6 6 0 0 1 0-12h16" />
    </>
  ),
  pallet: (
    <>
      <rect x="8" y="8" width="14" height="12" />
      <rect x="26" y="8" width="14" height="12" />
      <rect x="8" y="20" width="32" height="14" />
      <path d="M4 34h40M4 40h40M8 34v6M24 34v6M40 34v6" />
    </>
  ),
  currency: (
    <>
      <circle cx="24" cy="24" r="19" />
      <path d="M30 15c-1.5-1.5-3.5-2-6-2-4 0-6 2-6 4.5 0 6 12 3.5 12 10 0 3-3 5-6.5 5-3 0-5.5-1-7-3M24 9v4M24 35v4" />
    </>
  ),
} as const;

export type IconName = keyof typeof PATHS;
export const ICON_NAMES = Object.keys(PATHS) as IconName[];

type Props = SVGProps<SVGSVGElement> & { name: IconName; size?: number; title?: string };

export function Icon({ name, size = 24, title, strokeWidth = 1.75, ...rest }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {PATHS[name]}
    </svg>
  );
}

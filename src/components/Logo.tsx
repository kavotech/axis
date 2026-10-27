import Link from "next/link";

/** Vector rendition of the Axis Agro wave mark. */
export function LogoMark({ className = "brand__mark", light = false }: { className?: string; light?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path d="M13 17.5c7.5-5.5 14.5 3.6 23-1.6l7.5-5.4-3.4 8.6c-8.2 5.7-15.3-2.8-23.4 1.6Z" fill={light ? "#8fc27a" : "#3d8a3a"} />
      <path d="M8.5 26.5c8-5.6 15.6 3.5 24.4-1.8l5.3-3.6-3.3 7.6c-8.8 5.7-16.4-2.8-24.6 1.8Z" fill={light ? "#c9cfca" : "#6f7672"} />
      <path d="M4 37c6.4-5.4 13.2-1.4 20.6-2.2-6.3-3.6-13.6-3.4-20.6 2.2Z" fill={light ? "#9aa29c" : "#4b524e"} />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={`brand${light ? " brand--light" : ""}`} aria-label="Axis Agro International — home">
      <LogoMark light={light} />
      <span className="brand__text">
        <span className="brand__name">Axis Agro</span>
        <span className="brand__sub">International Ltd</span>
      </span>
    </Link>
  );
}

import Image from "next/image";
import Link from "next/link";

/** The Axis Agro wave mark on its own (transparent PNG). */
export function LogoMark({ className = "", size = 104 }: { className?: string; size?: number }) {
  return <Image src="/brand/axis-mark.png" alt="" width={size} height={Math.round((size * 201) / 373)} className={className} priority />;
}

/** Full Axis Agro International logo — for light backgrounds. */
export function Logo() {
  return (
    <Link href="/" className="brand" aria-label="Axis Agro International — home">
      <Image src="/brand/axis-logo.png" alt="Axis Agro International" width={628} height={325} className="brand__logo" priority sizes="140px" />
    </Link>
  );
}

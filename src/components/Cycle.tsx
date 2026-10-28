import { Icon, type IconName } from "./Icon";

/** Circular supply-chain illustration: four stages around a central statement. */
export function Cycle({ center, stages }: { center: string; stages: { icon: IconName; label: string }[] }) {
  const r = 150;
  const pos = (i: number) => {
    const a = (i / stages.length) * Math.PI * 2 - Math.PI / 2;
    return { x: 210 + r * Math.cos(a), y: 210 + r * Math.sin(a) };
  };
  return (
    <svg className="cycle" viewBox="0 0 420 420" role="img" aria-label={`${stages.map((s) => s.label).join(", then ")}. ${center}`}>
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 10 5 0 10Z" fill="#3d8a3a" />
        </marker>
      </defs>
      {stages.map((_, i) => {
        const a1 = (i / stages.length) * Math.PI * 2 - Math.PI / 2 + 0.36;
        const a2 = ((i + 1) / stages.length) * Math.PI * 2 - Math.PI / 2 - 0.36;
        const p1 = { x: 210 + r * Math.cos(a1), y: 210 + r * Math.sin(a1) };
        const p2 = { x: 210 + r * Math.cos(a2), y: 210 + r * Math.sin(a2) };
        return <path key={i} d={`M${p1.x} ${p1.y}A${r} ${r} 0 0 1 ${p2.x} ${p2.y}`} fill="none" stroke="#3d8a3a" strokeWidth="5" strokeLinecap="round" markerEnd="url(#arrow)" />;
      })}
      {stages.map((s, i) => {
        const { x, y } = pos(i);
        return (
          <g key={s.label} transform={`translate(${x - 34} ${y - 34})`}>
            <circle cx="34" cy="34" r="34" fill="#fff" stroke={i % 2 ? "#9dbb45" : "#d39b2a"} strokeWidth="4" />
            <g transform="translate(14 14)" color="#1f4d2b">
              <Icon name={s.icon} size={40} strokeWidth={2.4} />
            </g>
            <text x="34" y={i === 0 ? -10 : 88} textAnchor="middle" fontFamily="var(--font-figtree)" fontWeight="900" fontSize="15" fill="#1f4d2b">
              {s.label.toUpperCase()}
            </text>
          </g>
        );
      })}
      <foreignObject x="120" y="160" width="180" height="100">
        <p style={{ margin: 0, textAlign: "center", fontFamily: "var(--font-figtree)", fontWeight: 900, fontSize: 18, lineHeight: 1.25, color: "#3d8a3a" }}>{center}</p>
      </foreignObject>
    </svg>
  );
}

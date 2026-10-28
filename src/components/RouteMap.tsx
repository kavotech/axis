/**
 * Stylised supply-route illustration (equirectangular projection, simplified coastlines).
 * Indicative only — routes depend on product, carrier and Incoterm.
 */
const W = 1000;
const H = 560;
const LON0 = -20;
const LON1 = 70;
const LAT0 = 60;
const LAT1 = -15;

const px = (lon: number, lat: number): [number, number] => [((lon - LON0) / (LON1 - LON0)) * W, ((LAT0 - lat) / (LAT0 - LAT1)) * H];
const poly = (pts: [number, number][]) =>
  pts.map(([lon, lat], i) => `${i ? "L" : "M"}${px(lon, lat).map((n) => n.toFixed(1)).join(" ")}`).join("") + "Z";
const line = (pts: [number, number][]) => pts.map(([lon, lat], i) => `${i ? "L" : "M"}${px(lon, lat).map((n) => n.toFixed(1)).join(" ")}`).join("");
const arc = (a: [number, number], b: [number, number], lift = 0.25) => {
  const [x1, y1] = px(...a);
  const [x2, y2] = px(...b);
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  return `M${x1.toFixed(1)} ${y1.toFixed(1)}Q${(mx + dy * lift).toFixed(1)} ${(my - dx * lift).toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
};

const AFRICA: [number, number][] = [
  [-17, 21], [-16, 15], [-15, 11], [-12, 7.5], [-7.5, 4.4], [-2, 4.8], [3, 6.3], [8.5, 4.4], [9.8, 2], [9.5, -1], [11.8, -4.5], [12.3, -6], [13.5, -12], [12.5, -15],
  [40.5, -15], [40.5, -10.5], [39.5, -7], [39.2, -4.7], [41, -1.7], [43, 0.5], [46, 2], [49, 6], [51.2, 11.8], [48, 11.2], [44, 10.4], [43.3, 12.5], [41.5, 14.5],
  [39, 17.5], [37.3, 21], [36, 24], [34, 27.5], [32.5, 30], [32.3, 31.3], [29, 31], [25, 31.6], [20, 30.8], [19, 30.3], [15.5, 31.5], [11, 33.2], [10, 37], [8, 37],
  [3, 36.8], [-2, 35.1], [-6, 35.8], [-9.5, 32.5], [-10, 29], [-13, 27.5],
];
const ARABIA: [number, number][] = [
  [34.9, 29.5], [36, 27], [38.5, 23], [39.2, 21.5], [41, 18], [42.7, 15.5], [43.3, 12.7], [45, 12.8], [49, 14], [52, 15.5], [55, 17.5], [57.5, 19], [59.8, 22.5],
  [58.5, 23.6], [56.4, 24.9], [56.3, 26.3], [54, 24.2], [51.6, 24.5], [51.3, 26], [50, 26.6], [48.5, 28.5], [47.7, 30], [48, 31], [46, 33], [44, 36], [40, 37],
  [36.2, 36.6], [35.9, 35], [35, 33], [34.2, 31.3],
];
const ASIA: [number, number][] = [
  [44.5, 37.2], [44.8, 39.7], [45, 41.3], [45, 60], [70, 60], [70, 25], [66, 25.3], [61.6, 25.2], [57.3, 25.8], [56.4, 27.1], [54.5, 26.6], [52, 27.8], [50.6, 29.2],
  [48.5, 30], [48, 31], [46, 33], [44, 36],
];
const TURKEY: [number, number][] = [
  [26.2, 40.6], [26, 39.5], [27, 37.5], [28, 36.7], [30.5, 36.3], [32.5, 36.1], [36, 36.6], [36.2, 36.9], [40, 37], [44.5, 37.2], [44.8, 39.7], [43, 41.2], [41.5, 41.5],
  [36.5, 41.3], [31.5, 41.2], [28.9, 41.1],
];
const EUROPE: [number, number][] = [
  [-9.5, 43.2], [-8.9, 37], [-6, 36.4], [-2, 36.7], [0.2, 38.8], [3.2, 42], [6, 43.1], [8.8, 44.3], [10.3, 43.5], [12.5, 41.7], [15.7, 38], [18.5, 40.1], [15.9, 41.7],
  [13.2, 45.6], [19.3, 42.2], [19.8, 39.8], [22.5, 36.5], [24, 38], [26.2, 40.6], [28, 41], [28.6, 43.5], [29.7, 45.2], [31, 46.6], [33.5, 46], [33.6, 44.5], [35.3, 45],
  [37.5, 45.2], [38.3, 46.9], [39.5, 47], [40, 46.5], [37.8, 44.6], [40, 43.4], [41.6, 41.6], [45, 41.3], [45, 60], [30, 60], [23, 59.8], [23.5, 57], [21, 56.8],
  [21, 55.3], [19.5, 54.4], [14, 54], [11, 54], [10, 54.9], [9.5, 57], [10.6, 57.7], [8.2, 56.8], [8.5, 55.3], [8.7, 53.9], [7, 53.4], [4.8, 52.9], [3.5, 51.4],
  [1.6, 50.9], [-1.3, 49.7], [-1.9, 48.7], [-4.7, 48.4], [-2.4, 47.2], [-1.2, 46], [-1.4, 44], [-1.8, 43.4], [-8, 43.7],
];
const SCANDINAVIA: [number, number][] = [
  [5, 60], [5.2, 59], [5.8, 58.1], [7, 58], [8.2, 58.2], [10.5, 59.1], [11.2, 58.9], [11.9, 57.7], [12.8, 56], [14.3, 55.5], [16, 56.2], [16.7, 57.5], [18.2, 59.4], [18, 60],
];
const GB: [number, number][] = [
  [-5.7, 50], [1.4, 51.2], [1.7, 52.7], [0.2, 53.5], [-1.6, 55.6], [-2, 57], [-1.8, 57.6], [-3.4, 58.6], [-5, 58.6], [-6.2, 56.7], [-5.6, 55.3], [-4.8, 54.8],
  [-3.2, 54.5], [-3, 53.4], [-4.6, 53.3], [-4.2, 52.3], [-5.2, 51.7], [-3, 51.4],
];
const IRELAND: [number, number][] = [[-6, 52.2], [-6, 53.9], [-5.5, 55.2], [-7.3, 55.4], [-10, 54], [-10.2, 51.7]];
const UGANDA: [number, number][] = [
  [29.6, -1.4], [30.5, -1], [31.7, -1], [33.9, -1], [34, 0.3], [35, 1.5], [34.5, 3.5], [33.5, 3.8], [32, 3.6], [30.9, 3.5], [30.5, 2.4], [31.3, 2.1], [30, 0.5],
];

const PLACES = {
  kampala: { ll: [32.58, 0.35] as [number, number], label: "Kampala · Entebbe (EBB)", dx: -14, dy: -16, anchor: "end" },
  mombasa: { ll: [39.66, -4.04] as [number, number], label: "Mombasa port", dx: 14, dy: 18, anchor: "start" },
  london: { ll: [-0.12, 51.5] as [number, number], label: "London (LHR) · UK ports", dx: -12, dy: 26, anchor: "end" },
  rotterdam: { ll: [4.48, 51.92] as [number, number], label: "Rotterdam", dx: 12, dy: -10, anchor: "start" },
  dubai: { ll: [55.27, 25.2] as [number, number], label: "Dubai · Jebel Ali", dx: 14, dy: -10, anchor: "start" },
  doha: { ll: [51.53, 25.29] as [number, number], label: "Doha", dx: -12, dy: 22, anchor: "end" },
};

const SEA_UK: [number, number][] = [[39.66, -4.04], [45, 12], [43.4, 12.6], [38, 20], [32.5, 29.9], [20, 34.5], [-5.6, 35.95], [-10, 37], [-10, 44], [-5.5, 48.5], [1.3, 51.6]];
const SEA_GULF: [number, number][] = [[39.66, -4.04], [45, 12], [52, 14], [58.5, 21], [57, 25.6], [55.27, 25.2]];

export function RouteMap({ compact = false, light = false }: { compact?: boolean; light?: boolean }) {
  const land = light ? "#3d8a3a" : "rgb(255 255 255 / 0.07)";
  const coast = light ? "#2f6e2d" : "rgb(255 255 255 / 0.16)";
  const label = light ? "#1f4d2b" : "rgb(255 255 255 / 0.88)";
  const [vx, vy] = px(33, -1);
  return (
    <figure className={light ? "route-map route-map--light" : "route-map"} style={{ margin: 0 }}>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="route-title route-desc">
        <title id="route-title">Indicative supply routes from Uganda</title>
        <desc id="route-desc">
          Air freight from Entebbe to London and the Gulf, and sea freight from Mombasa via the Suez Canal to UK and European ports or to Jebel Ali.
        </desc>
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="rgb(255 255 255 / 0.06)" />
          </pattern>
          <radialGradient id="glow">
            <stop offset="0" stopColor="#d8bd83" stopOpacity="0.45" />
            <stop offset="1" stopColor="#d8bd83" stopOpacity="0" />
          </radialGradient>
        </defs>
        {light ? null : <rect width={W} height={H} fill="url(#grid)" />}
        {[AFRICA, ARABIA, ASIA, TURKEY, EUROPE, SCANDINAVIA, IRELAND].map((p, i) => (
          <path key={i} d={poly(p)} fill={land} stroke={coast} strokeWidth="1" strokeLinejoin="round" />
        ))}
        <path d={poly(GB)} fill="rgb(216 189 131 / 0.25)" stroke="#d8bd83" strokeWidth="1.2" />
        <ellipse cx={vx} cy={vy} rx="13" ry="11" fill={light ? "#f2f2f2" : "#071a12"} stroke={coast} />
        <circle cx={px(32.6, 1.3)[0]} cy={px(32.6, 1.3)[1]} r="70" fill="url(#glow)" />
        <path d={poly(UGANDA)} fill={light ? "#d39b2a" : "rgb(109 154 91 / 0.55)"} stroke={light ? "#fff" : "#8fc27a"} strokeWidth="1.4" />

        {/* Sea routes */}
        <path d={line(SEA_UK)} fill="none" stroke={light ? "#1f4d2b" : "#6d9a5b"} strokeWidth="2" className="route-dash" />
        <path d={line(SEA_GULF)} fill="none" stroke={light ? "#1f4d2b" : "#6d9a5b"} strokeWidth="2" className="route-dash" />
        {/* Road link Kampala → Mombasa (Northern Corridor) */}
        <path d={line([[32.58, 0.35], [34.5, 0.3], [36.8, -1.3], [39.66, -4.04]])} fill="none" stroke={light ? "#fff" : "rgb(255 255 255 / 0.45)"} strokeWidth="1.5" strokeDasharray="2 5" />
        {/* Air routes */}
        <path d={arc([32.45, 0.05], [-0.45, 51.47], 0.22)} fill="none" stroke={light ? "#d9772b" : "#d8bd83"} strokeWidth="2.2" className="route-dash" />
        <path d={arc([32.45, 0.05], [55.36, 25.25], -0.25)} fill="none" stroke={light ? "#d9772b" : "#d8bd83"} strokeWidth="2.2" className="route-dash" />

        {Object.entries(PLACES).map(([k, p]) => {
          const [x, y] = px(...p.ll);
          if (compact && (k === "doha" || k === "rotterdam")) return <circle key={k} cx={x} cy={y} r="4" fill="#fff" />;
          return (
            <g key={k}>
              <circle cx={x} cy={y} r={k === "kampala" ? 7 : 5} fill={k === "kampala" ? "#d8bd83" : "#fff"} stroke="#071a12" strokeWidth="2" />
              <text x={x + p.dx} y={y + p.dy} fill={label} fontSize="15" fontFamily="var(--font-manrope), sans-serif" fontWeight="600" textAnchor={p.anchor as "start" | "end"}>
                {p.label}
              </text>
            </g>
          );
        })}
        <text x={px(31.5, -3.2)[0]} y={px(31.5, -3.2)[1] + 6} fill={light ? "#7b4e32" : "#8fc27a"} fontSize="13" fontWeight="700" letterSpacing="3" textAnchor="end" fontFamily="var(--font-manrope), sans-serif">
          UGANDA
        </text>
      </svg>
      <figcaption className="route-map__legend">
        <span>
          <i style={{ background: "#d8bd83" }} /> Air freight (indicative)
        </span>
        <span>
          <i style={{ background: "#6d9a5b" }} /> Sea freight (indicative)
        </span>
        <span>
          <i style={{ background: "rgb(255 255 255 / 0.45)" }} /> Road to port
        </span>
      </figcaption>
    </figure>
  );
}

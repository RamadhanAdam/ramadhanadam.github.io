import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import type { FloorId } from "../data";

// One moving background per floor of the stack, drawn from the work that lives there.
// Each sits behind its floor's heading, faded, and stops when it scrolls out of view.

function rand(seed: number) {
  // Small deterministic generator, so the drawings are the same on every visit.
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

function Ideas() {
  const r = rand(7);
  const pts = Array.from({ length: 22 }, () => [20 + r() * 360, 20 + r() * 220] as const);
  const lines: [number, number][] = [];
  pts.forEach((a, i) =>
    pts.forEach((b, j) => {
      if (j > i && Math.hypot(a[0] - b[0], a[1] - b[1]) < 80) lines.push([i, j]);
    }),
  );
  return (
    <svg viewBox="0 0 400 260" className="h-full w-full" aria-hidden="true">
      {lines.map(([i, j]) => (
        <line key={`${i}-${j}`} x1={pts[i][0]} y1={pts[i][1]} x2={pts[j][0]} y2={pts[j][1]} stroke="currentColor" strokeOpacity="0.25" />
      ))}
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 5 === 0 ? 3.2 : 2} fill="currentColor" className="twinkle" style={{ animationDelay: `${(i * 0.37) % 4}s` }} />
      ))}
    </svg>
  );
}

function Models() {
  // Attention between the words of a Swahili sentence: "I love learning every day".
  const words = ["Ninapenda", "kujifunza", "kila", "siku"];
  const xs = [55, 160, 255, 335];
  const pairs: [number, number, number][] = [
    [0, 1, 0.9], [0, 2, 0.35], [0, 3, 0.25], [1, 2, 0.5], [1, 3, 0.7], [2, 3, 0.95],
  ];
  return (
    <svg viewBox="0 0 400 260" className="h-full w-full" aria-hidden="true">
      {pairs.map(([a, b, w], k) => {
        const h = 40 + (xs[b] - xs[a]) * 0.55;
        return (
          <path
            key={k}
            d={`M ${xs[a]} 200 Q ${(xs[a] + xs[b]) / 2} ${200 - h} ${xs[b]} 200`}
            fill="none"
            stroke="currentColor"
            strokeWidth={1 + w * 3}
            strokeOpacity={0.15 + w * 0.5}
            className="twinkle"
            style={{ animationDelay: `${k * 0.6}s` }}
          />
        );
      })}
      {words.map((w, i) => (
        <text key={w} x={xs[i]} y="226" textAnchor="middle" fill="currentColor" fontSize="15" fontFamily="var(--font-display)" fontWeight="700">
          {w}
        </text>
      ))}
    </svg>
  );
}

function Systems() {
  // A window of CAN traffic as GraMa sees it: identifiers joined when one frame follows another.
  const nodes: [string, number, number][] = [
    ["0C9", 70, 60], ["0F1", 190, 40], ["1A1", 310, 70], ["2C1", 330, 180], ["1D0", 200, 140], ["3E9", 80, 190], ["260", 220, 230],
  ];
  const edges = [[0, 1], [1, 2], [2, 3], [3, 6], [6, 5], [5, 0], [0, 4], [4, 2], [4, 6], [1, 4]];
  return (
    <svg viewBox="0 0 400 260" className="h-full w-full" aria-hidden="true">
      {edges.map(([a, b], k) => (
        <line key={k} x1={nodes[a][1]} y1={nodes[a][2]} x2={nodes[b][1]} y2={nodes[b][2]} stroke="currentColor" strokeOpacity="0.6" strokeWidth="1.5" className="dash" style={{ animationDelay: `${k * 0.2}s` }} />
      ))}
      {nodes.map(([id, x, y], k) => (
        <g key={id}>
          <circle cx={x} cy={y} r="19" fill="var(--bg)" stroke="currentColor" strokeWidth={k === 4 ? 2.5 : 1.5} />
          <text x={x} y={y + 4} textAnchor="middle" fill="currentColor" fontSize="11" fontFamily="var(--font-mono)">
            {id}
          </text>
        </g>
      ))}
    </svg>
  );
}

// The first bytes of a real Windows program: the DOS header ("MZ"), its stub, and the "PE" signature.
const PE_BYTES =
  "4D 5A 90 00 03 00 00 00 04 00 00 00 FF FF 00 00 B8 00 00 00 00 00 00 00 40 00 00 00 00 00 00 00 0E 1F BA 0E 00 B4 09 CD 21 B8 01 4C CD 21 54 68 69 73 20 70 72 6F 67 72 61 6D 20 63 61 6E 6E 6F 74 20 62 65 20 72 75 6E 20 69 6E 20 44 4F 53 20 6D 6F 64 65 2E 0D 0D 0A 24 00 50 45 00 00 64 86 05 00".split(
    " ",
  );

function Binaries() {
  const cols = 6;
  return (
    <div className="flex h-full justify-end gap-5 overflow-hidden font-mono text-[13px] leading-6" aria-hidden="true">
      {Array.from({ length: cols }, (_, c) => {
        const bytes = Array.from({ length: 40 }, (_, i) => PE_BYTES[(i * cols + c * 7) % PE_BYTES.length]);
        return (
          <div key={c} className="hex-col" style={{ animationDuration: `${22 + c * 5}s`, animationDelay: `-${c * 3}s` }}>
            {[...bytes, ...bytes].map((b, i) => (
              <div key={i} className={b === "4D" || b === "5A" || b === "50" || b === "45" ? "font-medium opacity-100" : "opacity-40"}>
                {b}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

function Memory() {
  // DRAM cells. One row is "hammered" at a time, and now and then a cell in a neighbouring row flips.
  const ROWS = 9;
  const COLS = 18;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduce = useReducedMotion();
  const [bits, setBits] = useState<number[]>(() => {
    const r = rand(3);
    return Array.from({ length: ROWS * COLS }, () => (r() > 0.5 ? 1 : 0));
  });
  const [row, setRow] = useState(4);
  const [flipped, setFlipped] = useState<number[]>([]);
  useEffect(() => {
    if (!inView || reduce) return;
    const id = setInterval(() => {
      const aggressor = 1 + Math.floor(Math.random() * (ROWS - 2));
      setRow(aggressor);
      const victims = [aggressor - 1, aggressor + 1].flatMap((rw) => (Math.random() < 0.6 ? [rw * COLS + Math.floor(Math.random() * COLS)] : []));
      setFlipped(victims);
      setBits((b) => b.map((v, i) => (victims.includes(i) ? 1 - v : v)));
    }, 900);
    return () => clearInterval(id);
  }, [inView, reduce]);
  return (
    <div ref={ref} className="grid h-full content-center justify-end gap-1.5" style={{ gridTemplateColumns: `repeat(${COLS}, 14px)` }} aria-hidden="true">
      {bits.map((v, i) => {
        const r = Math.floor(i / COLS);
        const hot = flipped.includes(i);
        return (
          <div
            key={i}
            className="h-3.5 w-3.5 rounded-[3px] transition-all duration-300"
            style={{
              background: "currentColor",
              opacity: hot ? 1 : r === row ? 0.55 : v ? 0.22 : 0.07,
              transform: hot ? "scale(1.35)" : "scale(1)",
            }}
          />
        );
      })}
    </div>
  );
}

export function FloorMotif({ id }: { id: FloorId }) {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] md:block" style={{ color: `var(--${id})`, maskImage: "linear-gradient(to left, black 40%, transparent)", WebkitMaskImage: "linear-gradient(to left, black 40%, transparent)", opacity: 0.55 }}>
      {id === "ideas" && <Ideas />}
      {id === "models" && <Models />}
      {id === "systems" && <Systems />}
      {id === "binaries" && <Binaries />}
      {id === "memory" && <Memory />}
    </div>
  );
}

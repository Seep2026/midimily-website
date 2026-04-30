import { useEffect, useMemo, useRef, useState } from 'react';

const NODE_DEFINITIONS = [
  { id: 'business', label: '企业', x: 14, y: 24, core: false },
  { id: 'growth', label: '增长', x: 16, y: 72, core: false },
  { id: 'ai', label: 'AI 能力', x: 50, y: 48, core: true },
  { id: 'individual', label: '个体', x: 86, y: 24, core: false },
  { id: 'development', label: '成长', x: 84, y: 72, core: false },
];

const EDGE_DEFINITIONS = [
  ['business', 'ai'],
  ['growth', 'ai'],
  ['individual', 'ai'],
  ['development', 'ai'],
  ['business', 'growth'],
  ['individual', 'development'],
];

export function HeroNetworkEffect() {
  const hostRef = useRef(null);
  const pointerTargetRef = useRef({ x: 0, y: 0 });
  const pointerCurrentRef = useRef({ x: 0, y: 0 });
  const activeRef = useRef(false);
  const timeRef = useRef(0);
  const [frame, setFrame] = useState({ x: 0, y: 0, time: 0, active: false });

  const seeds = useMemo(
    () =>
      NODE_DEFINITIONS.reduce((acc, node) => {
        acc[node.id] = {
          phase: Math.random() * Math.PI * 2,
          amp: node.core ? 0.7 : 1.2,
        };
        return acc;
      }, {}),
    [],
  );

  useEffect(() => {
    let rafId;

    const animate = () => {
      const target = pointerTargetRef.current;
      const current = pointerCurrentRef.current;

      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      timeRef.current += 0.009;

      setFrame({
        x: current.x,
        y: current.y,
        time: timeRef.current,
        active: activeRef.current,
      });

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const nodes = useMemo(
    () =>
      NODE_DEFINITIONS.map((node) => {
        const seed = seeds[node.id];
        const driftX = Math.sin(frame.time * 0.68 + seed.phase) * seed.amp;
        const driftY = Math.cos(frame.time * 0.64 + seed.phase) * seed.amp;
        const parallaxPower = node.core ? 2.2 : 3.4;

        return {
          ...node,
          x: node.x + driftX + frame.x * parallaxPower,
          y: node.y + driftY + frame.y * parallaxPower,
        };
      }),
    [frame.time, frame.x, frame.y, seeds],
  );

  const nodeMap = useMemo(
    () =>
      nodes.reduce((acc, node) => {
        acc[node.id] = node;
        return acc;
      }, {}),
    [nodes],
  );

  const handleMove = (event) => {
    const rect = hostRef.current?.getBoundingClientRect();
    if (!rect) {
      return;
    }

    const normalizedX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const normalizedY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    pointerTargetRef.current = {
      x: Math.max(-1, Math.min(1, normalizedX)),
      y: Math.max(-1, Math.min(1, normalizedY)),
    };
    activeRef.current = true;
  };

  const handleLeave = () => {
    pointerTargetRef.current = { x: 0, y: 0 };
    activeRef.current = false;
  };

  return (
    <div
      ref={hostRef}
      className="relative mx-auto w-full max-w-[560px] aspect-[16/10] rounded-[24px] border border-[#d6deef] bg-gradient-to-br from-[#f8fafc] via-[#f4f7fc] to-[#f8f3ed] shadow-[0_12px_30px_rgba(103,123,158,0.14)] overflow-hidden"
      onMouseMove={handleMove}
      onMouseEnter={() => {
        activeRef.current = true;
      }}
      onMouseLeave={handleLeave}
      aria-hidden="true"
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {EDGE_DEFINITIONS.map(([fromId, toId]) => {
          const from = nodeMap[fromId];
          const to = nodeMap[toId];
          if (!from || !to) {
            return null;
          }

          return (
            <line
              key={`${fromId}-${toId}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={frame.active ? '#8ca8cf' : '#a3b8d8'}
              strokeWidth="0.52"
              strokeLinecap="round"
              opacity="0.9"
            />
          );
        })}
      </svg>

      {nodes.map((node) => (
        <span
          key={node.id}
          className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c5d2e8] px-4 py-2 text-[14px] font-semibold text-[#506786] bg-white/88 backdrop-blur-[1px] shadow-[0_2px_12px_rgba(126,143,174,0.20)] transition-[border-color,box-shadow,background-color] duration-200 ${
            node.core
              ? 'px-5 py-3 text-[18px] text-[#4d6592] font-bold bg-[#f8fbff]/95 border-[#acc0e2]'
              : ''
          }`}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          {node.label}
        </span>
      ))}
    </div>
  );
}

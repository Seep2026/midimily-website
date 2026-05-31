import { useEffect, useMemo, useRef, useState } from 'react';

const NODE_DEFINITIONS = [
  { id: 'business', label: '企业', icon: 'organization', x: 18, y: 24 },
  { id: 'workflow', label: '流程', icon: 'steps', x: 20, y: 72 },
  { id: 'ai', label: 'AI', icon: 'bot', x: 50, y: 50, core: true },
  { id: 'individual', label: '个体', icon: 'user', x: 82, y: 24 },
  { id: 'work', label: '作品', icon: 'portfolio', x: 80, y: 72 },
];

const EDGE_DEFINITIONS = [
  { from: 'ai', to: 'business', flow: 'main' },
  { from: 'ai', to: 'workflow', flow: 'main' },
  { from: 'ai', to: 'individual', flow: 'main' },
  { from: 'ai', to: 'work', flow: 'main' },
  { from: 'business', to: 'workflow', flow: 'aux' },
  { from: 'individual', to: 'work', flow: 'aux' },
];

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!query) {
      return undefined;
    }

    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener('change', update);

    return () => query.removeEventListener('change', update);
  }, []);

  return reducedMotion;
}

function NetworkIcon({ type, className }) {
  const commonProps = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.9',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
  };

  if (type === 'organization') {
    return (
      <svg {...commonProps}>
        <path d="M6 20V6.5C6 5.7 6.7 5 7.5 5h9c.8 0 1.5.7 1.5 1.5V20" />
        <path d="M4 20h16" />
        <path d="M9 9h1.2" />
        <path d="M13.8 9H15" />
        <path d="M9 13h1.2" />
        <path d="M13.8 13H15" />
        <path d="M10.4 20v-3.4h3.2V20" />
      </svg>
    );
  }

  if (type === 'steps') {
    return (
      <svg {...commonProps}>
        <circle cx="6" cy="7" r="2" />
        <circle cx="18" cy="7" r="2" />
        <circle cx="12" cy="17" r="2" />
        <path d="M8 7h7.2" />
        <path d="m14 5.6 1.6 1.4L14 8.4" />
        <path d="M18 9v1.4c0 2.2-1.3 3.8-4.1 5" />
        <path d="M6 9v1.4c0 2.2 1.3 3.8 4.1 5" />
      </svg>
    );
  }

  if (type === 'bot') {
    return (
      <svg {...commonProps}>
        <path d="M12 4V2.8" />
        <circle cx="12" cy="4.8" r="1.4" />
        <rect x="6" y="7" width="12" height="10" rx="3" />
        <path d="M8.5 18.2h7" />
        <path d="M9.2 12h.1" />
        <path d="M14.7 12h.1" />
        <path d="M10 15c1.2.7 2.8.7 4 0" />
        <path d="M4 11.5v2" />
        <path d="M20 11.5v2" />
      </svg>
    );
  }

  if (type === 'user') {
    return (
      <svg {...commonProps}>
        <circle cx="12" cy="8" r="3.6" />
        <path d="M5.5 20c.9-4 3-6 6.5-6s5.6 2 6.5 6" />
      </svg>
    );
  }

  if (type === 'portfolio') {
    return (
      <svg {...commonProps}>
        <rect x="5" y="5" width="14" height="12.5" rx="2.2" />
        <path d="M8 9h5.2" />
        <path d="M8 12.4h3.8" />
        <path d="M4 20h16" />
        <path d="m17.2 11.2.5 1.2 1.2.5-1.2.5-.5 1.2-.5-1.2-1.2-.5 1.2-.5.5-1.2Z" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
      <path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" />
      <path d="m5 15 .7 1.8L7.5 17.5l-1.8.7L5 20l-.7-1.8-1.8-.7 1.8-.7L5 15Z" />
    </svg>
  );
}

export function HeroNetworkEffect() {
  const hostRef = useRef(null);
  const pointerTargetRef = useRef({ x: 0, y: 0 });
  const pointerCurrentRef = useRef({ x: 0, y: 0 });
  const activeRef = useRef(false);
  const timeRef = useRef(0);
  const reducedMotion = useReducedMotion();
  const [frame, setFrame] = useState({ x: 0, y: 0, time: 0, active: false });

  const seeds = useMemo(
    () =>
      NODE_DEFINITIONS.reduce((acc, node) => {
        acc[node.id] = {
          phase: Math.random() * Math.PI * 2,
          amp: node.core ? 0.35 : 0.68,
        };
        return acc;
      }, {}),
    [],
  );

  useEffect(() => {
    if (reducedMotion) {
      setFrame((current) => ({ ...current, x: 0, y: 0, active: activeRef.current }));
      return undefined;
    }

    let rafId;

    const animate = () => {
      const target = pointerTargetRef.current;
      const current = pointerCurrentRef.current;

      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      timeRef.current += 0.007;

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
  }, [reducedMotion]);

  const nodes = useMemo(
    () =>
      NODE_DEFINITIONS.map((node) => {
        const seed = seeds[node.id];
        const driftX = reducedMotion ? 0 : Math.sin(frame.time * 0.54 + seed.phase) * seed.amp;
        const driftY = reducedMotion ? 0 : Math.cos(frame.time * 0.5 + seed.phase) * seed.amp;
        const parallaxPower = node.core ? 1.2 : 2;

        return {
          ...node,
          x: node.x + driftX + frame.x * parallaxPower,
          y: node.y + driftY + frame.y * parallaxPower,
        };
      }),
    [frame.time, frame.x, frame.y, reducedMotion, seeds],
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
    if (reducedMotion) {
      return;
    }

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

  const handleEnter = () => {
    activeRef.current = true;
    setFrame((current) => ({ ...current, active: true }));
  };

  const handleLeave = () => {
    pointerTargetRef.current = { x: 0, y: 0 };
    activeRef.current = false;
    setFrame((current) => ({ ...current, active: false }));
  };

  return (
    <div
      ref={hostRef}
      className="group relative mx-auto aspect-[16/10] w-full max-w-[520px] overflow-hidden rounded-[24px] border border-[#d9e2f0] bg-gradient-to-br from-[#f8fafc] via-[#f5f8fc] to-[#f8f4ef] shadow-[0_6px_18px_rgba(103,123,158,0.07)] transition duration-300 hover:border-[#c6d5ea] hover:shadow-[0_10px_24px_rgba(103,123,158,0.09)]"
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      aria-label="AI 能力网络"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(124,146,187,0.08),transparent_28%),radial-gradient(circle_at_84%_74%,rgba(140,199,189,0.09),transparent_30%)]" />
      <div className="pointer-events-none absolute left-[12%] top-[16%] h-1.5 w-1.5 rounded-full bg-[#9ab2d4]/45" />
      <div className="pointer-events-none absolute bottom-[18%] right-[14%] h-2 w-2 rounded-full bg-[#98cbc4]/42" />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          {EDGE_DEFINITIONS.map((edge, index) => {
            const from = nodeMap[edge.from];
            const to = nodeMap[edge.to];
            if (!from || !to) {
              return null;
            }

            return (
              <linearGradient
                key={`flow-${edge.from}-${edge.to}`}
                id={`hero-flow-${index}`}
                gradientUnits="userSpaceOnUse"
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
              >
                <stop offset="0%" stopColor="#7c92bb" stopOpacity="0" />
                <stop offset="46%" stopColor="#8cc7bd" stopOpacity={edge.flow === 'main' ? '0.74' : '0.42'} />
                <stop offset="100%" stopColor="#8f9cd6" stopOpacity="0" />
              </linearGradient>
            );
          })}
        </defs>

        {EDGE_DEFINITIONS.map((edge, index) => {
          const from = nodeMap[edge.from];
          const to = nodeMap[edge.to];
          if (!from || !to) {
            return null;
          }

          const isMainFlow = edge.flow === 'main';
          const isAuxFlow = edge.flow === 'aux';
          const baseOpacity = isMainFlow ? (frame.active ? 0.52 : 0.34) : frame.active ? 0.26 : 0.16;
          const flowOpacity = isMainFlow ? (frame.active ? 0.56 : 0.38) : frame.active ? 0.32 : 0.22;

          return (
            <g key={`${edge.from}-${edge.to}`}>
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={frame.active ? '#a9bdd8' : '#bccbe0'}
                strokeWidth={isMainFlow ? 0.38 : 0.3}
                strokeLinecap="round"
                opacity={baseOpacity}
              />
              {isMainFlow ? (
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={`url(#hero-flow-${index})`}
                  strokeWidth="0.66"
                  strokeLinecap="round"
                  strokeDasharray="7 24"
                  strokeDashoffset="0"
                  opacity={flowOpacity}
                >
                  {!reducedMotion ? (
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="-31"
                      dur={`${6.2 + index * 0.45}s`}
                      repeatCount="indefinite"
                    />
                  ) : null}
                </line>
              ) : null}
              {isAuxFlow ? (
                <>
                  <line
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke={`url(#hero-flow-${index})`}
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    strokeDasharray="5 30"
                    strokeDashoffset="0"
                    opacity={flowOpacity}
                  >
                    {!reducedMotion ? (
                      <animate
                        attributeName="stroke-dashoffset"
                        from="0"
                        to="-35"
                        dur={`${7.2 + index * 0.35}s`}
                        repeatCount="indefinite"
                      />
                    ) : null}
                  </line>
                  <line
                    x1={to.x}
                    y1={to.y}
                    x2={from.x}
                    y2={from.y}
                    stroke={`url(#hero-flow-${index})`}
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    strokeDasharray="5 30"
                    strokeDashoffset="-16"
                    opacity={flowOpacity * 0.82}
                  >
                    {!reducedMotion ? (
                      <animate
                        attributeName="stroke-dashoffset"
                        from="-16"
                        to="-51"
                        dur={`${7.2 + index * 0.35}s`}
                        repeatCount="indefinite"
                      />
                    ) : null}
                  </line>
                </>
              ) : null}
            </g>
          );
        })}
      </svg>

      {nodes.map((node) => (
        <span
          key={node.id}
          className={`absolute -translate-x-1/2 -translate-y-1/2 ${
            node.core ? 'h-[80px] w-[82px] sm:h-[88px] sm:w-[92px]' : 'h-[64px] w-[66px] sm:h-[70px] sm:w-[72px]'
          }`}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          <span
            className={`peer flex h-full w-full flex-col items-center justify-center gap-1 rounded-[18px] border backdrop-blur-[1px] transition duration-300 ${
              node.core
                ? 'border-[#abc0e2] bg-[#f8fbff]/92 text-[#5870a0] shadow-[0_0_0_8px_rgba(124,146,187,0.08),0_10px_28px_rgba(96,119,158,0.12)] group-hover:scale-[1.04] group-hover:text-[#49658f]'
                : 'border-[#ced9ea] bg-white/78 text-[#5c728f] shadow-[0_4px_14px_rgba(126,143,174,0.10)] hover:border-[#b9cae2] hover:bg-white/90 hover:text-[#4c6688]'
            }`}
          >
            <NetworkIcon type={node.icon} className={node.core ? 'h-8 w-8 sm:h-9 sm:w-9' : 'h-[25px] w-[25px] sm:h-[28px] sm:w-[28px]'} />
            <span className={`leading-none ${node.core ? 'text-[12px] font-semibold text-[#5b7199]' : 'text-[11px] font-medium text-[#7b8ca4]'}`}>
              {node.label}
            </span>
          </span>
        </span>
      ))}
    </div>
  );
}

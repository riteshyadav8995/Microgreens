import { useInView } from '../../hooks/useInView';

/** Replay the seed-to-leaf sequence each time a growing card returns into view. */
export default function GrowthIllustration({ stage }) {
  const [ref, inView] = useInView({ once: false, rootMargin: '0px', threshold: 0.35 });
  const grown = stage !== 'sow';
  return (
    <div ref={ref} className={`growth-illustration bg-brand-50/60 ${inView ? 'is-visible' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 320 150" className="mx-auto block h-36 w-full" focusable="false">
        <ellipse cx="160" cy="132" rx="106" ry="7" fill="#dce9dc" />
        <circle cx="264" cy="35" r="17" fill="#eadbb0" className="growth-sun" />
        <path d="M52 110H268L253 132H67Z" fill="#31593b" />
        <path d="M54 109H266" stroke="#759971" strokeWidth="7" strokeLinecap="round" />
        {[83, 121, 160, 199, 237].map((x, i) => {
          const top = 44 + (i % 2) * 13;
          return (
            <g key={x} style={{ '--growth-delay': `${i * 130}ms` }}>
              <ellipse cx={x} cy="107" rx="5" ry="3" fill="#c6a76e" className="growth-seed" />
              {grown && (
                <>
                  <path d={`M${x} 108 Q${x - 5} 83 ${x} ${top + 12}`} fill="none" stroke="#547e48" strokeWidth="3" strokeLinecap="round" pathLength="1" className="growth-stem" />
                  <g className="growth-leaves" style={{ transformOrigin: `${x}px ${top + 12}px` }}>
                    <path d={`M${x} ${top + 12} C${x - 30} ${top + 12} ${x - 29} ${top - 14} ${x - 7} ${top - 4} Q${x} ${top} ${x} ${top + 12}`} fill="#87ad63" />
                    <path d={`M${x} ${top + 12} C${x + 28} ${top + 10} ${x + 30} ${top - 14} ${x + 8} ${top - 5} Q${x + 2} ${top} ${x} ${top + 12}`} fill="#456f42" />
                  </g>
                </>
              )}
              {stage === 'sow' && (
                <path d={`M${x} 63 Q${x - 9} 77 ${x} 77 Q${x + 9} 77 ${x} 63`} fill="#8cb7bc" className="growth-water" />
              )}
            </g>
          );
        })}
        {stage === 'harvest' && (
          <g className="growth-cut">
            <path d="M67 91H252" stroke="#bb9554" strokeWidth="2" strokeDasharray="4 6" />
            <g stroke="#31593b" strokeWidth="2.5" fill="none" strokeLinecap="round">
              <circle cx="269" cy="86" r="5" /><circle cx="269" cy="98" r="5" />
              <path d="M265 89L250 100M265 95L250 84" />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
}

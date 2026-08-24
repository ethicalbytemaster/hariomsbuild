'use client';

import { useEffect, useRef } from 'react';

const modules = [
  { label: 'WEB', className: 'coreModule web' },
  { label: 'AI', className: 'coreModule ai' },
  { label: 'AUTO', className: 'coreModule auto' },
  { label: 'SYS', className: 'coreModule sys' },
];

export function BuildCore() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 10;
      const y = (event.clientY / window.innerHeight - 0.5) * 10;
      node.style.setProperty('--mx', `${x}deg`);
      node.style.setProperty('--my', `${-y}deg`);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className="core" ref={ref} aria-label="Build Core showing Web, Automation, Systems and AI">
      <div className="coreGrid" aria-hidden="true" />
      <div className="coreRing ring1" aria-hidden="true" />
      <div className="coreRing ring2" aria-hidden="true" />
      <div className="coreNode"><small>BUILD</small><strong>CORE</strong></div>
      {modules.map((module) => <span className={module.className} key={module.label}>{module.label}</span>)}
    </div>
  );
}

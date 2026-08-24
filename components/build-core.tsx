'use client';

import { useEffect, useRef } from 'react';

const modules = [
  { label: 'WEB', className: 'orb orb1' },
  { label: 'AI', className: 'orb orb2' },
  { label: 'AUTO', className: 'orb orb3' },
  { label: 'SYS', className: 'orb orb4' },
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
      <div className="coreRing ring1" aria-hidden="true" />
      <div className="coreRing ring2" aria-hidden="true" />
      <div className="coreNode" style={{ transform: 'perspective(700px) rotateX(var(--my, 0deg)) rotateY(var(--mx, 0deg))' }}><small>BUILD</small><strong>CORE</strong></div>
      {modules.map((module) => <span className={module.className} key={module.label}>{module.label}</span>)}
    </div>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';

export function PortfolioExperience() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [modal, setModal] = useState<{ name: string; demo: string; kind: string } | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (reduced || coarse) return;

    let frame = 0;
    const move = (event: MouseEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
        document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`);
      });
    };
    const over = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      cursor.classList.toggle('cursorView', Boolean(target.closest('[data-cursor-view]')));
      cursor.classList.toggle('cursorButton', Boolean(target.closest('a,button')));
    };
    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-tilt]'));
    const cleanups = cards.map((card) => {
      const move = (event: MouseEvent) => {
        if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty('--tilt-x', `${-y * 5}deg`);
        card.style.setProperty('--tilt-y', `${x * 5}deg`);
        card.style.setProperty('--glow-x', `${(x + 0.5) * 100}%`);
        card.style.setProperty('--glow-y', `${(y + 0.5) * 100}%`);
      };
      const leave = () => {
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
      };
      card.addEventListener('mousemove', move);
      card.addEventListener('mouseleave', leave);
      return () => { card.removeEventListener('mousemove', move); card.removeEventListener('mouseleave', leave); };
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  });

  return <>
    <div ref={cursorRef} className="customCursor" aria-hidden="true"><span /></div>
    <div className="scrollMeter" aria-hidden="true"><span /></div>
    {modal && <div className="projectModal" role="dialog" aria-modal="true" aria-label={`${modal.name} live preview`}>
      <button className="modalClose" onClick={() => setModal(null)} aria-label="Close preview">ESC ×</button>
      <div className="modalTop"><div><span className="eyebrow">LIVE BUILD / INTERACTIVE PREVIEW</span><h2>{modal.name}</h2></div><span className="modalKind">{modal.kind}</span></div>
      <div className="modalFrame"><iframe src={modal.demo} title={`${modal.name} live demo`} /></div>
    </div>}
  </>;
}

export function ProjectOpenButton({ name, demo, kind }: { name: string; demo?: string; kind: string }) {
  if (!demo) return null;
  return <button className="previewOpen" data-cursor-view onClick={() => window.dispatchEvent(new CustomEvent('portfolio:open', { detail: { name, demo, kind } }))}>OPEN LIVE ↗</button>;
}

export function PortfolioModalBridge() {
  const [, setTick] = useState(0);
  useEffect(() => {
    const handler = (event: Event) => setTick((value) => value + 1);
    window.addEventListener('portfolio:open', handler);
    return () => window.removeEventListener('portfolio:open', handler);
  }, []);
  return null;
}

'use client';

import { useEffect, useRef, useState } from 'react';

type Preview = { name: string; demo: string; kind: string };

export function PortfolioExperience() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [modal, setModal] = useState<Preview | null>(null);

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
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', over); if (frame) cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    const open = (event: Event) => setModal((event as CustomEvent<Preview>).detail);
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setModal(null); };
    window.addEventListener('portfolio:open', open);
    window.addEventListener('keydown', closeOnEscape);
    return () => { window.removeEventListener('portfolio:open', open); window.removeEventListener('keydown', closeOnEscape); };
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
      const leave = () => { card.style.setProperty('--tilt-x', '0deg'); card.style.setProperty('--tilt-y', '0deg'); };
      card.addEventListener('mousemove', move); card.addEventListener('mouseleave', leave);
      return () => { card.removeEventListener('mousemove', move); card.removeEventListener('mouseleave', leave); };
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  });

  useEffect(() => {
    const magnets = Array.from(document.querySelectorAll<HTMLElement>('.magnetic'));
    const cleanups = magnets.map((el) => {
      const move = (event: MouseEvent) => {
        if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const rect = el.getBoundingClientRect();
        const x = (event.clientX - (rect.left + rect.width / 2)) * 0.16;
        const y = (event.clientY - (rect.top + rect.height / 2)) * 0.16;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      };
      const leave = () => { el.style.transform = 'translate3d(0,0,0)'; };
      el.addEventListener('mousemove', move); el.addEventListener('mouseleave', leave);
      return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave); };
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

export function ProjectOpenButton({ name, demo, kind }: Preview) {
  if (!demo) return null;
  return <button className="previewOpen" data-cursor-view onClick={(event) => { event.preventDefault(); event.stopPropagation(); window.dispatchEvent(new CustomEvent<Preview>('portfolio:open', { detail: { name, demo, kind } })); }}>OPEN LIVE ↗</button>;
}

export function ThemeToggle() {
  const [light, setLight] = useState(false);
  return <button className="themeToggle" onClick={() => { const next = !light; setLight(next); document.documentElement.dataset.theme = next ? 'light' : 'dark'; }} aria-label="Toggle theme">{light ? 'DARK' : 'LIGHT'} ◐</button>;
}

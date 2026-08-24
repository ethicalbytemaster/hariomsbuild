'use client';

import { useEffect, useRef } from 'react';

const modules = [
  { label: 'WEB', className: 'orb orb1' },
  { label: 'AI', className: 'orb orb2' },
  { label: 'AUTO', className: 'orb orb3' },
  { label: 'SYS', className: 'orb orb4' },
];

const particles = Array.from({ length: 10 }, (_, index) => index);

export function BuildCore() {
  const ref = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    const coreNode = nodeRef.current;
    if (!node || !coreNode) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointer = window.matchMedia('(pointer: coarse)');
    if (reducedMotion.matches) return;

    let scrollFrame = 0;
    let moveFrame = 0;
    let lastX = 0;
    let lastY = 0;

    const updateScroll = () => {
      scrollFrame = 0;
      const rect = node.getBoundingClientRect();
      const progress = Math.max(
        -1,
        Math.min(1, (window.innerHeight / 2 - (rect.top + rect.height / 2)) / window.innerHeight),
      );
      node.style.setProperty('--scroll-rotate', `${progress * 12}deg`);
    };

    const onScroll = () => {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScroll);
    };

    const onMove = (event: MouseEvent) => {
      if (coarsePointer.matches) return;
      lastX = (event.clientX / window.innerWidth - 0.5) * 10;
      lastY = (event.clientY / window.innerHeight - 0.5) * 10;
      if (moveFrame) return;
      moveFrame = window.requestAnimationFrame(() => {
        moveFrame = 0;
        coreNode.style.setProperty('--mx', `${lastX}deg`);
        coreNode.style.setProperty('--my', `${-lastY}deg`);
      });
    };

    updateScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMove);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      if (moveFrame) window.cancelAnimationFrame(moveFrame);
    };
  }, []);

  return <>
    <div className="core" ref={ref} role="img" aria-label="Build Core showing Web, Automation, Systems and AI">
      <div className="coreGrid" aria-hidden="true" />
      <div className="coreRing ring1" aria-hidden="true" />
      <div className="coreRing ring2" aria-hidden="true" />
      <div className="coreNode" ref={nodeRef}><small>BUILD</small><strong>CORE</strong></div>
      {modules.map((module) => <span className={module.className} key={module.label} aria-hidden="true">{module.label}</span>)}
      {particles.map((particle) => <span className={`particle p${particle + 1}`} key={particle} aria-hidden="true" />)}
    </div>
    <style jsx global>{`.core{isolation:isolate;transform:rotateX(var(--scroll-rotate,0deg)) rotateY(var(--my,0deg)) rotateZ(var(--mx,0deg));transition:transform .12s linear;will-change:transform}.coreGrid{position:absolute;inset:5%;border:1px solid #293024;background-image:linear-gradient(#29302455 1px,transparent 1px),linear-gradient(90deg,#29302455 1px,transparent 1px);background-size:28px 28px;mask-image:radial-gradient(circle,black 35%,transparent 72%);opacity:.45;transform:perspective(600px) rotateX(62deg)}.particle{position:absolute;width:3px;height:3px;border-radius:50%;background:#b7ff3c;box-shadow:0 0 12px #b7ff3c;opacity:.65;animation:corePulse 3s ease-in-out infinite}.p1{top:18%;left:35%}.p2{top:26%;right:20%;animation-delay:.3s}.p3{top:44%;left:12%;animation-delay:.6s}.p4{top:68%;right:16%;animation-delay:.9s}.p5{bottom:15%;left:40%;animation-delay:1.2s}.p6{bottom:25%;right:34%;animation-delay:1.5s}.p7{top:12%;right:42%;animation-delay:1.8s}.p8{bottom:38%;left:24%;animation-delay:2.1s}.p9{top:58%;right:7%;animation-delay:2.4s}.p10{bottom:8%;right:46%;animation-delay:2.7s}@keyframes corePulse{0%,100%{opacity:.2;transform:scale(.7)}50%{opacity:.9;transform:scale(1.5)}}@media(max-width:760px){.core{transform:none!important;will-change:auto}.particle{animation-duration:4s}}@media(prefers-reduced-motion:reduce){.core{transform:none!important;transition:none}.particle{animation:none}}`}</style>
  </>;
}

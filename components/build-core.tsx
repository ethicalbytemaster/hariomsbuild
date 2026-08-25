'use client';

import { useEffect, useRef } from 'react';

const modules = [
  { label: 'WEB', className: 'orb orb1' },
  { label: 'AI', className: 'orb orb2' },
  { label: 'AUTO', className: 'orb orb3' },
  { label: 'SYS', className: 'orb orb4' },
];

const particles = Array.from({ length: 18 }, (_, index) => index);

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
      node.style.setProperty('--grid-shift', `${progress * 24}px`);
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
      <div className="scanLine" aria-hidden="true" />
      <div className="coreRing ring1" aria-hidden="true" />
      <div className="coreRing ring2" aria-hidden="true" />
      <div className="coreNode" ref={nodeRef}><small>BUILD</small><strong>CORE</strong><span className="nodePulse" /></div>
      {modules.map((module) => <span className={module.className} key={module.label} aria-hidden="true">{module.label}</span>)}
      {particles.map((particle) => <span className={`particle p${particle + 1}`} key={particle} aria-hidden="true" />)}
    </div>
    <style jsx global>{`
      .core{isolation:isolate;transform:rotateX(var(--scroll-rotate,0deg)) rotateY(var(--my,0deg)) rotateZ(var(--mx,0deg));transition:transform .12s linear;will-change:transform}
      .coreGrid{position:absolute;inset:5%;border:1px solid #293024;background-image:linear-gradient(#29302455 1px,transparent 1px),linear-gradient(90deg,#29302455 1px,transparent 1px);background-size:28px 28px;mask-image:radial-gradient(circle,black 35%,transparent 72%);opacity:.45;transform:perspective(600px) rotateX(62deg) translateY(var(--grid-shift,0px));transition:transform .25s ease}
      .scanLine{position:absolute;width:78%;height:1px;left:11%;top:50%;background:linear-gradient(90deg,transparent,#b7ff3c,transparent);box-shadow:0 0 16px #b7ff3c;opacity:.5;animation:scan 4s ease-in-out infinite;z-index:2}
      .particle{position:absolute;width:3px;height:3px;border-radius:50%;background:#b7ff3c;box-shadow:0 0 12px #b7ff3c;opacity:.65;animation:corePulse 3s ease-in-out infinite}
      .p1{top:18%;left:35%}.p2{top:26%;right:20%;animation-delay:.3s}.p3{top:44%;left:12%;animation-delay:.6s}.p4{top:68%;right:16%;animation-delay:.9s}.p5{bottom:15%;left:40%;animation-delay:1.2s}.p6{bottom:25%;right:34%;animation-delay:1.5s}.p7{top:12%;right:42%;animation-delay:1.8s}.p8{bottom:38%;left:24%;animation-delay:2.1s}.p9{top:58%;right:7%;animation-delay:2.4s}.p10{bottom:8%;right:46%;animation-delay:2.7s}
      .p11{top:34%;left:30%;animation-delay:1.1s}.p12{top:72%;left:48%;animation-delay:2.2s}.p13{top:20%;right:32%;animation-delay:.8s}.p14{bottom:30%;left:10%;animation-delay:1.7s}.p15{bottom:12%;right:22%;animation-delay:2.5s}.p16{top:50%;right:26%;animation-delay:1.4s}.p17{top:82%;right:45%;animation-delay:.5s}.p18{bottom:46%;left:42%;animation-delay:2.8s}
      .nodePulse{position:absolute;inset:-12px;border:1px solid #b7ff3c55;border-radius:50%;animation:nodePulse 2.8s ease-out infinite;pointer-events:none}
      @keyframes corePulse{0%,100%{opacity:.12;transform:scale(.6)}50%{opacity:1;transform:scale(1.8)}}
      @keyframes scan{0%,100%{transform:translateY(-150px);opacity:0}18%{opacity:.5}50%{transform:translateY(150px);opacity:.9}72%{opacity:.2}}
      @keyframes nodePulse{0%{opacity:.7;transform:scale(.72)}100%{opacity:0;transform:scale(1.55)}}
      @media(max-width:760px){.core{transform:none!important;will-change:auto}.particle{animation-duration:4s}.scanLine{animation-duration:5s}}
      @media(prefers-reduced-motion:reduce){.core{transform:none!important;transition:none}.particle,.scanLine,.nodePulse{animation:none}}
    `}</style>
  </>;
}

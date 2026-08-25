'use client';

import { useEffect } from 'react';

export function MotionFX() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('main > section, .card, .problemGrid > div, .processGrid > div, .labItem, .cta');
    targets.forEach((el) => el.classList.add('revealFx'));

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      targets.forEach((el) => el.classList.add('revealFxVisible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealFxVisible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return <style jsx global>{`
    .revealFx{opacity:0;transform:translateY(38px);filter:blur(4px);transition:opacity .75s cubic-bezier(.2,.8,.2,1),transform .75s cubic-bezier(.2,.8,.2,1),filter .75s ease}
    .revealFxVisible{opacity:1;transform:none;filter:none}
    .cards .card:nth-child(2),.problemGrid>div:nth-child(2),.processGrid>div:nth-child(2){transition-delay:.08s}
    .cards .card:nth-child(3),.problemGrid>div:nth-child(3),.processGrid>div:nth-child(3){transition-delay:.16s}
    .cards .card:nth-child(4),.problemGrid>div:nth-child(4),.processGrid>div:nth-child(4){transition-delay:.24s}
    .cards .card.revealFxVisible{animation:none}
    @media(prefers-reduced-motion:reduce){.revealFx{opacity:1!important;transform:none!important;filter:none!important;transition:none!important}}
  `}</style>;
}

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

    .hero:before{content:"";position:absolute;inset:-120px -20vw auto;height:560px;pointer-events:none;background:radial-gradient(circle at 70% 50%,#b7ff3c12,transparent 42%);animation:heroGlow 6s ease-in-out infinite}
    .hero h1{animation:heroText .9s cubic-bezier(.2,.8,.2,1) both}
    .lead{animation:heroText .9s .12s cubic-bezier(.2,.8,.2,1) both}
    .actions{animation:heroText .9s .24s cubic-bezier(.2,.8,.2,1) both}
    .capabilities{animation:heroText .9s .36s cubic-bezier(.2,.8,.2,1) both}

    .coreRing{animation:ringOrbit 12s linear infinite;box-shadow:0 0 24px #b7ff3c0b}
    .ring2{animation-duration:8s;animation-direction:reverse}
    .coreNode{animation:coreFloat 3.8s ease-in-out infinite;box-shadow:0 0 70px #b7ff3c55,0 0 150px #b7ff3c18}
    .orb{animation:orbFloat 4s ease-in-out infinite}
    .orb2{animation-delay:-1s}.orb3{animation-delay:-2s}.orb4{animation-delay:-3s}
    .particle{animation:particlePulse 2.6s ease-in-out infinite}

    .button{overflow:hidden;transition:transform .25s ease,box-shadow .25s ease,border-color .25s ease}
    .button:after{content:"";position:absolute;top:-90%;left:-35%;width:28%;height:280%;background:#ffffff88;transform:rotate(20deg) translateX(-260%);transition:transform .7s ease}
    .button:hover:after{transform:rotate(20deg) translateX(600%)}
    .button:hover{transform:translateY(-3px)}
    .primary{box-shadow:0 0 0 1px #b7ff3c33,0 12px 38px #b7ff3c18}
    .primary:hover{box-shadow:0 15px 50px #b7ff3c35}

    .card{position:relative;overflow:hidden;transition:transform .45s cubic-bezier(.2,.8,.2,1),border-color .35s ease,box-shadow .45s ease}
    .card:before{content:"";position:absolute;inset:0;pointer-events:none;z-index:5;background:linear-gradient(120deg,transparent 25%,#b7ff3c12 45%,transparent 60%);transform:translateX(-120%);transition:transform .9s ease}
    .card:hover:before{transform:translateX(120%)}
    .card:hover{transform:translateY(-8px) perspective(900px) rotateX(1deg) rotateY(-1deg);border-color:#6a824e;box-shadow:0 25px 70px #0009,0 0 35px #b7ff3c0a}
    .projectPreviewFrame{transform:scale(1.01);transition:transform .7s cubic-bezier(.2,.8,.2,1),filter .7s ease}
    .card:hover .projectPreviewFrame{transform:scale(1.075);filter:saturate(1.1) contrast(1.03)}
    .previewShade{transition:opacity .45s ease}.card:hover .previewShade{opacity:.72}
    .previewTitle,.previewNumber{transition:transform .4s ease,color .4s ease}.card:hover .previewTitle{transform:translateX(5px)}.card:hover .previewNumber{transform:translateY(-5px);color:#b7ff3c33}

    .problemGrid>div,.processGrid>div{position:relative;transition:transform .35s ease,background .35s ease}
    .problemGrid>div:after,.processGrid>div:after{content:"";position:absolute;left:0;top:0;width:2px;height:0;background:#b7ff3c;transition:height .45s ease}
    .problemGrid>div:hover,.processGrid>div:hover{transform:translateY(-7px);background:#b7ff3c06}
    .problemGrid>div:hover:after,.processGrid>div:hover:after{height:100%}
    .labItem{transition:padding .35s ease,background .35s ease,border-color .35s ease}.labItem:hover{padding-left:14px;padding-right:14px;background:#b7ff3c05;border-color:#536043}
    .cta{overflow:hidden;box-shadow:0 30px 100px #0006}.cta:before{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(110deg,transparent 20%,#b7ff3c12 50%,transparent 80%);transform:translateX(-100%);animation:ctaSweep 6s ease-in-out infinite}

    @keyframes heroText{from{opacity:0;transform:translateY(28px);filter:blur(7px)}to{opacity:1;transform:none;filter:none}}
    @keyframes heroGlow{0%,100%{opacity:.45;transform:scale(.92)}50%{opacity:1;transform:scale(1.06)}}
    @keyframes ringOrbit{from{transform:rotateX(62deg) rotateZ(0)}to{transform:rotateX(62deg) rotateZ(360deg)}}
    @keyframes coreFloat{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-10px) scale(1.03)}}
    @keyframes orbFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
    @keyframes particlePulse{0%,100%{opacity:.15;transform:scale(.6)}50%{opacity:1;transform:scale(1.7)}}
    @keyframes ctaSweep{0%,55%{transform:translateX(-100%)}80%,100%{transform:translateX(100%)}}

    @media(prefers-reduced-motion:reduce){
      .revealFx{opacity:1!important;transform:none!important;filter:none!important;transition:none!important}
      .hero:before,.hero h1,.lead,.actions,.capabilities,.coreRing,.coreNode,.orb,.particle,.cta:before{animation:none!important}
      .button:after{display:none}.card:hover,.problemGrid>div:hover,.processGrid>div:hover{transform:none}
    }
  `}</style>;
}

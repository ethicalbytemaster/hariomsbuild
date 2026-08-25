'use client';

import Link from 'next/link';

export default function NotFound() {
  return <main className="notFound shell">
    <div className="notFoundGrid" aria-hidden="true" />
    <div className="notFoundCode">404</div>
    <div className="eyebrow"><span className="liveDot" /> ROUTE NOT FOUND</div>
    <h1>This page took a <i>wrong turn.</i></h1>
    <p>The route you requested does not exist, but the build is still online.</p>
    <div className="actions"><Link className="button primary" href="/">Back to Home ↗</Link><Link className="button secondary" href="/builds">See the Builds</Link></div>
    <style jsx>{`
      .notFound{min-height:100svh;display:grid;align-content:center;position:relative;overflow:hidden;padding-top:80px;padding-bottom:80px}.notFoundGrid{position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(#b7ff3c0a 1px,transparent 1px),linear-gradient(90deg,#b7ff3c0a 1px,transparent 1px);background-size:70px 70px;mask-image:radial-gradient(circle at 50% 50%,#000,transparent 70%)}.notFoundCode{position:absolute;right:2vw;top:10vh;font:900 clamp(140px,24vw,360px)/.8 var(--sans,Arial);letter-spacing:-.08em;color:#b7ff3c08}.notFound h1{position:relative;max-width:760px;font-size:clamp(52px,8vw,112px);line-height:.92;letter-spacing:-.06em;margin:22px 0}.notFound h1 i{color:#b7ff3c;font-style:normal}.notFound p{position:relative;max-width:560px;color:var(--muted);font-size:18px;line-height:1.65;margin:0 0 30px}.notFound .actions{position:relative}.notFound .liveDot{display:inline-block;width:7px;height:7px;border-radius:50%;background:#b7ff3c;margin-right:8px;box-shadow:0 0 14px #b7ff3c}.notFound .button{display:inline-flex}.notFound .secondary{border:1px solid var(--line);color:var(--text);padding:14px 20px;border-radius:999px}.notFound .primary{padding:14px 20px;border-radius:999px}
      @media(max-width:760px){.notFound{padding-top:120px}.notFoundCode{top:15vh}.notFound h1{font-size:clamp(50px,15vw,80px)}.notFound p{font-size:16px}}
    `}</style>
  </main>;
}

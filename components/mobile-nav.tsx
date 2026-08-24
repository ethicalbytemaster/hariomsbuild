'use client';

import Link from 'next/link';
import { useState } from 'react';

const items = [['Builds', '/builds'], ['Solutions', '/#solutions'], ['Lab', '/lab'], ['About', '/about']] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);
  return <>
    <div className="mobileNav">
      <button className="menuButton" type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setOpen((value) => !value)}><span aria-hidden="true">{open ? '×' : '☰'}</span></button>
      {open && <div id="mobile-menu" className="mobileMenu">{items.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}<Link className="mobileCta" href="/start-a-project" onClick={() => setOpen(false)}>Start a Project ↗</Link></div>}
    </div>
    <style jsx global>{`@media(max-width:760px){.mobileNav{display:block;position:relative}.menuButton{width:42px;height:42px;border:1px solid #30362d;border-radius:999px;background:#0d0f0c;color:#f3f5ee;font-size:19px;cursor:pointer}.mobileMenu{position:absolute;right:0;top:52px;width:220px;padding:10px;border:1px solid #30362d;background:rgba(13,15,12,.98);box-shadow:0 20px 50px rgba(0,0,0,.4);display:grid;gap:3px}.mobileMenu a{padding:12px;color:#c4c9c0;font-size:14px}.mobileMenu a:hover{background:#171b14;color:#fff}.mobileMenu .mobileCta{margin-top:5px;border-top:1px solid #2a3026;color:#b7ff3c}}@media(min-width:761px){.mobileNav{display:none}}`}</style>
  </>;
}

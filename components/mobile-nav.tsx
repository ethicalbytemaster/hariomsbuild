'use client';

import Link from 'next/link';
import { useState } from 'react';

const items = [
  ['Builds', '/builds'],
  ['Solutions', '/#solutions'],
  ['Lab', '/lab'],
  ['About', '/about'],
] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mobileNav">
      <button className="menuButton" type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((value) => !value)}>
        <span className="srOnly">{open ? 'Close menu' : 'Open menu'}</span>
        <span aria-hidden="true">{open ? '×' : '☰'}</span>
      </button>
      {open && (
        <div id="mobile-menu" className="mobileMenu">
          {items.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
          <Link className="mobileCta" href="/start-a-project" onClick={() => setOpen(false)}>Start a Project ↗</Link>
        </div>
      )}
    </div>
  );
}

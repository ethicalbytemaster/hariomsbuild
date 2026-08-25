'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const commands = [
  { key: 'home', label: 'Go home', hint: '⌘/Ctrl K → Home', href: '/' },
  { key: 'builds', label: 'View selected builds', hint: 'Projects & case studies', href: '/builds' },
  { key: 'lab', label: 'Open the lab', hint: 'Experiments & systems', href: '/lab' },
  { key: 'about', label: 'About the studio', hint: 'How Hariom Builds works', href: '/about' },
  { key: 'contact', label: 'Start a project', hint: 'Send a project brief', href: '/start-a-project' },
];

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);

  const filtered = commands.filter((command) => command.label.toLowerCase().includes(query.toLowerCase()) || command.hint.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') { event.preventDefault(); setSelected((value) => Math.min(value + 1, Math.max(filtered.length - 1, 0))); }
      if (event.key === 'ArrowUp') { event.preventDefault(); setSelected((value) => Math.max(value - 1, 0)); }
      if (event.key === 'Enter' && filtered[selected]) { event.preventDefault(); router.push(filtered[selected].href); setOpen(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, filtered, selected, router]);

  const go = (href: string) => { router.push(href); setOpen(false); setQuery(''); };

  return <>
    <button className="commandHint" type="button" onClick={() => setOpen(true)} aria-label="Open command menu"><span>⌘</span><b>K</b></button>
    {open && <div className="commandBackdrop" role="presentation" onMouseDown={() => setOpen(false)}>
      <div className="commandPalette" role="dialog" aria-modal="true" aria-label="Command menu" onMouseDown={(event) => event.stopPropagation()}>
        <div className="commandSearch"><span>⌕</span><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Jump to…" aria-label="Search commands" /><kbd>ESC</kbd></div>
        <div className="commandList">
          {filtered.length ? filtered.map((command, index) => <button className={`commandItem ${index === selected ? 'selected' : ''}`} key={command.key} type="button" onMouseEnter={() => setSelected(index)} onClick={() => go(command.href)}><span className="commandIcon">{String(index + 1).padStart(2, '0')}</span><span><strong>{command.label}</strong><small>{command.hint}</small></span><i>↗</i></button>) : <div className="commandEmpty">No matching command.</div>}
        </div>
        <div className="commandFooter"><span>↑↓ Navigate</span><span>↵ Open</span><span>Esc Close</span></div>
      </div>
    </div>}
    <style jsx global>{`
      .commandHint{display:inline-flex;align-items:center;gap:3px;border:1px solid var(--line);background:transparent;color:var(--muted);border-radius:999px;padding:8px 10px;font:600 10px/1 var(--mono);cursor:pointer;transition:.25s ease}
      .commandHint:hover{color:var(--text);border-color:var(--accent);transform:translateY(-1px)}
      .commandHint span{font-size:13px}.commandHint b{font-weight:700}
      .commandBackdrop{position:fixed;inset:0;z-index:1000;background:rgba(2,4,2,.58);backdrop-filter:blur(12px);display:grid;place-items:start center;padding:13vh 18px 24px}
      .commandPalette{width:min(620px,100%);background:var(--panel,#11140f);border:1px solid var(--line,#30372d);border-radius:20px;overflow:hidden;box-shadow:0 40px 120px rgba(0,0,0,.45);animation:commandIn .22s cubic-bezier(.2,.8,.2,1)}
      .commandSearch{height:68px;display:flex;align-items:center;gap:12px;padding:0 18px;border-bottom:1px solid var(--line,#30372d)}
      .commandSearch>span{font-size:25px;color:var(--accent,#b7ff3c)}.commandSearch input{flex:1;background:transparent;border:0;outline:0;color:var(--text,#f4f6f1);font:500 18px/1.2 var(--sans,Arial)}.commandSearch input::placeholder{color:var(--muted,#879080)}
      .commandSearch kbd{border:1px solid var(--line,#30372d);border-radius:7px;padding:5px 7px;color:var(--muted,#879080);font:700 9px var(--mono,monospace)}
      .commandList{padding:8px}.commandItem{width:100%;display:flex;align-items:center;gap:14px;padding:14px 12px;border:0;border-radius:12px;background:transparent;color:var(--text,#f4f6f1);text-align:left;cursor:pointer}.commandItem:hover,.commandItem.selected{background:rgba(183,255,60,.08)}
      .commandIcon{width:32px;height:32px;display:grid;place-items:center;border:1px solid var(--line,#30372d);border-radius:9px;color:var(--muted,#879080);font:700 10px var(--mono,monospace)}.commandItem.selected .commandIcon{color:var(--accent,#b7ff3c);border-color:rgba(183,255,60,.35)}
      .commandItem span:nth-child(2){display:grid;gap:4px;flex:1}.commandItem strong{font:700 13px/1.2 var(--sans,Arial)}.commandItem small{font:400 11px/1.2 var(--sans,Arial);color:var(--muted,#879080)}.commandItem i{font-style:normal;color:var(--muted,#879080)}
      .commandEmpty{padding:35px 20px;text-align:center;color:var(--muted,#879080);font:500 12px var(--mono,monospace)}
      .commandFooter{display:flex;gap:18px;padding:12px 18px;border-top:1px solid var(--line,#30372d);color:var(--muted,#879080);font:600 9px var(--mono,monospace);text-transform:uppercase;letter-spacing:.08em}
      @keyframes commandIn{from{opacity:0;transform:translateY(-12px) scale(.98)}to{opacity:1;transform:none}}
      @media(max-width:760px){.commandHint{display:none}.commandBackdrop{padding-top:8vh}.commandPalette{border-radius:16px}.commandFooter{gap:10px;font-size:8px}}
      html[data-theme='light'] .commandBackdrop{background:rgba(24,29,21,.3)}html[data-theme='light'] .commandPalette{background:#fff;border-color:#ccd5c7;box-shadow:0 35px 100px rgba(28,40,24,.2)}html[data-theme='light'] .commandSearch{border-color:#d7ded3}html[data-theme='light'] .commandSearch input,html[data-theme='light'] .commandItem{color:#151b13}html[data-theme='light'] .commandItem:hover,html[data-theme='light'] .commandItem.selected{background:#f0f6ea}html[data-theme='light'] .commandFooter{border-color:#d7ded3}
    `}</style>
  </>;
}

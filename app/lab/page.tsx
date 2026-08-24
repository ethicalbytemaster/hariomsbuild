import Link from 'next/link';
import { labs } from '@/lib/projects';

export const metadata = { title: 'Lab — Hariom Builds', description: 'Experiments, prototypes and software research from Hariom Builds.' };

export default function LabPage() { return <main className="page shell"><header className="pageHeader"><Link href="/" className="back">← Home</Link><div className="eyebrow">THE LAB</div><h1>Experiments before they become products.</h1><p>Small, focused explorations across AI, automation, data and real-time software.</p></header><div className="labPageGrid">{labs.map((p, i) => <Link className="labPageItem" href={`/lab/${p.slug}`} key={p.slug}><span>0{i + 1}</span><div><strong>{p.name}</strong><p>{p.summary}</p></div><em>{p.status}</em><span>↗</span></Link>)}</div></main>; }

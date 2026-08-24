import Link from 'next/link';
import { builds } from '@/lib/projects';

export const metadata = { title: 'Builds — Hariom Builds', description: 'Selected software builds from Hariom Builds.' };

export default function BuildsPage() {
  return <main className="page shell"><header className="pageHeader"><Link href="/" className="back">← Home</Link><div className="eyebrow">SELECTED BUILDS</div><h1>Software shaped around the problem.</h1><p>Selected client and internal builds. Claims and project details are kept deliberately factual.</p></header><div className="caseGrid">{builds.map((p, i) => <Link className="caseCard" href={`/builds/${p.slug}`} key={p.slug}><div className="casePreview"><span>0{i + 1}</span><span>{p.status}</span></div><div className="caseMeta"><span>{p.status}</span><span>CASE STUDY ↗</span></div><h2>{p.name}</h2><p>{p.summary}</p></Link>)}</div></main>;
}

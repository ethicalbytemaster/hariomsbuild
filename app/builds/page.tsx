import Link from 'next/link';
import { builds } from '@/lib/projects';

export const metadata = { title: 'Builds — Hariom Builds', description: 'Selected software builds from Hariom Builds.' };

const previewMap: Record<string, string> = {
  'masonry-demo': '/assets/previews/masonry.svg',
  'roofing-demo': '/assets/previews/roofing.svg',
  'laundry-demo': '/assets/previews/laundry.svg',
  'mek-property-maintenance': '/assets/previews/mek-property-maintenance.svg',
};

const overlayStyle = { position: 'relative' as const, zIndex: 2 };

export default function BuildsPage() {
  return <main className="page shell"><header className="pageHeader"><Link href="/" className="back">← Home</Link><div className="eyebrow">SELECTED BUILDS</div><h1>Software shaped around the problem.</h1><p>Selected client builds using the real project demos and previews.</p></header><div className="caseGrid">{builds.map((p, i) => <Link className="caseCard" href={`/builds/${p.slug}`} key={p.slug}><div className="casePreview" style={{ position: 'relative', overflow: 'hidden' }}><img className="casePreviewImage" src={previewMap[p.slug]} alt={`${p.name} project preview`} loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} /><span className="caseIndex" style={overlayStyle}>0{i+1}</span><span className="caseStatus" style={overlayStyle}>{p.status}</span><div className="casePreviewTitle" style={overlayStyle}>{p.name}</div><div className="previewLines" style={overlayStyle}/></div><div className="caseMeta"><span>{p.status}</span><span>CASE STUDY ↗</span></div><h2>{p.name}</h2><p>{p.summary}</p></Link>)}</div></main>;
}

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { builds } from '@/lib/projects';

const previewMap: Record<string, string> = {
  'masonry-demo': 'https://opengraph.githubassets.com/1/pateljiop/Demo',
  'roofing-demo': '/assets/previews/roofing.svg',
  'laundry-demo': '/assets/previews/laundry.svg',
  'mek-property-maintenance': '/assets/previews/mek-property-maintenance.svg',
};

export function generateStaticParams() { return builds.map((p) => ({ slug: p.slug })); }

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = builds.find((p) => p.slug === slug);
  if (!project) notFound();
  const preview = previewMap[project.slug];
  return <main className="page shell"><header className="caseHeader"><Link href="/builds" className="back">← All Builds</Link><span className="status">{project.status}</span><h1>{project.name}</h1><p>{project.summary}</p></header><div className="caseLayout"><div className="caseHero" style={{position:'relative',overflow:'hidden'}}>{preview ? <img src={preview} alt={`${project.name} project preview`} style={{width:'100%',height:'100%',objectFit:'cover',opacity:.9}} /> : null}<span style={{position:'absolute',top:0,left:0,padding:24}}>PROJECT / {project.status}</span></div><div className="caseSections"><section><div className="eyebrow">01 / PROBLEM</div><h2>What needed to work better.</h2><p>{project.problem}</p></section><section><div className="eyebrow">02 / BUILD</div><h2>What was built.</h2><p>{project.build}</p></section><section><div className="eyebrow">03 / VALUE</div><h2>Why it matters.</h2><p>{project.value}</p></section><section><div className="eyebrow">STACK</div><div className="stack">{project.stack.map((s) => <span key={s}>{s}</span>)}</div></section></div></div><div className="caseFooter">{project.github ? <a href={project.github} className="button secondary" target="_blank" rel="noreferrer">GitHub ↗</a> : null}{project.demo ? <a href={project.demo} className="button secondary" target="_blank" rel="noreferrer">Live Demo ↗</a> : null}<Link href="/start-a-project" className="button primary">Start a Project ↗</Link><Link href="/builds" className="button secondary">Back to Builds</Link></div></main>;
}

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { builds } from '@/lib/projects';

export function generateStaticParams() { return builds.map((p) => ({ slug: p.slug })); }

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = builds.find((p) => p.slug === slug);
  if (!project) notFound();
  return <main className="page shell"><header className="caseHeader"><Link href="/builds" className="back">← All Builds</Link><span className="status">{project.status}</span><h1>{project.name}</h1><p>{project.summary}</p></header><div className="caseLayout"><div className="caseHero"><span>PROJECT / {project.status}</span><strong>BUILD<br />PREVIEW</strong></div><div className="caseSections"><section><div className="eyebrow">01 / PROBLEM</div><h2>What needed to work better.</h2><p>{project.problem}</p></section><section><div className="eyebrow">02 / BUILD</div><h2>What was built.</h2><p>{project.build}</p></section><section><div className="eyebrow">03 / VALUE</div><h2>Why it matters.</h2><p>{project.value}</p></section><section><div className="eyebrow">STACK</div><div className="stack">{project.stack.map((s) => <span key={s}>{s}</span>)}</div></section></div></div><div className="caseFooter"><Link href="/start-a-project" className="button primary">Start a Project ↗</Link><Link href="/builds" className="button secondary">Back to Builds</Link></div></main>;
}

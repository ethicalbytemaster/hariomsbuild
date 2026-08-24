import Link from 'next/link';
import { notFound } from 'next/navigation';
import { labs } from '@/lib/projects';

export function generateStaticParams() { return labs.map((p) => ({ slug: p.slug })); }

export default async function LabDetail({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const project = labs.find((p) => p.slug === slug); if (!project) notFound(); return <main className="page shell"><header className="caseHeader"><Link href="/lab" className="back">← All Lab Projects</Link><span className="status">{project.status}</span><h1>{project.name}</h1><p>{project.summary}</p></header><div className="caseLayout"><div className="caseHero"><span>LAB / {project.status}</span><strong>EXPERIMENT<br />IN PROGRESS</strong></div><div className="caseSections"><section><div className="eyebrow">WHY</div><h2>The question.</h2><p>{project.problem}</p></section><section><div className="eyebrow">BUILD</div><h2>The experiment.</h2><p>{project.build}</p></section><section><div className="eyebrow">VALUE</div><h2>What we are learning.</h2><p>{project.value}</p></section><section><div className="eyebrow">STACK</div><div className="stack">{project.stack.map((s) => <span key={s}>{s}</span>)}</div></section></div></div></main>; }

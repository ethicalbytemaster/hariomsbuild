import Link from 'next/link';
import { ProjectForm } from '@/components/project-form';

export const metadata = { title: 'Start a Project — Hariom Builds', description: 'Tell Hariom Builds about the business problem you want to solve.' };

export default function StartProject() {
  return <main className="page shell"><header className="pageHeader"><Link href="/" className="back">← Home</Link><div className="eyebrow">START A PROJECT</div><h1>Tell us what is slowing you down.</h1><p>Share the problem, the context and what a useful outcome would look like. We will turn the conversation into a clear next step.</p></header><ProjectForm /></main>;
}

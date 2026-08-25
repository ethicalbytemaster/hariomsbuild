import Link from 'next/link';
import { builds } from '@/lib/projects';

export const metadata = {
  title: 'Builds — Hariom Builds',
  description: 'Selected client website builds and live previews from Hariom Builds.',
};

export default function BuildsPage() {
  return (
    <main className="buildsPage">
      <div className="buildsShell">
        <div className="buildsTop">
          <Link href="/" className="buildsBack">← HOME</Link>
          <div className="buildsMiniStatus"><i /> SELECTED BUILDS · LIVE PREVIEWS</div>
        </div>

        <header className="buildsHeader">
          <div className="buildsEyebrow">SELECTED CLIENT WORK · 2026</div>
          <h1>Software shaped around the <span>problem.</span></h1>
          <p>
            Real service-business concepts, shown as working experiences — not static mockups.
            Open a build, inspect the interface and see how the experience is designed around the business.
          </p>
          <div className="buildsStats">
            <span><b>{builds.length}</b> SELECTED BUILDS</span>
            <span><b>LIVE</b> INTERACTIVE PREVIEWS</span>
            <span><b>WEB</b> · AUTOMATION · SYSTEMS</span>
          </div>
        </header>

        <section className="buildsGrid" aria-label="Selected builds">
          {builds.map((p, i) => (
            <Link
              className="buildCard"
              href={`/builds/${p.slug}`}
              key={p.slug}
              style={{ '--delay': i } as React.CSSProperties}
            >
              <div className="buildPreview">
                <div className="buildBrowser" aria-hidden="true">
                  <i /><i /><i />
                  <div className="address">{p.demo?.replace('https://', '') || 'internal build preview'}</div>
                </div>
                <iframe
                  className="buildPreviewFrame"
                  src={p.demo ?? ''}
                  title={`${p.name} live website preview`}
                  loading="lazy"
                  tabIndex={-1}
                  aria-hidden="true"
                />
                <div className="buildShade" />
                <div className="buildHover">
                  <span>{p.status} · LIVE PREVIEW</span>
                  <b>OPEN CASE STUDY ↗</b>
                </div>
              </div>

              <div className="buildInfo">
                <div className="buildMeta">
                  <span className="live">{p.status}</span>
                  <span>BUILD / {String(i + 1).padStart(2, '0')}</span>
                </div>
                <h2>{p.name}</h2>
                <p>{p.summary}</p>
                <div className="buildTags">
                  {p.stack.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <div className="buildFooter">
                  <span>PROBLEM → EXPERIENCE → OUTCOME</span>
                  <strong>VIEW CASE STUDY ↗</strong>
                </div>
              </div>
            </Link>
          ))}
        </section>

        <div className="buildsBottom">
          <div>
            <strong>Have a business problem worth solving?</strong>
            <p>Tell me what is slowing the business down. I’ll turn it into a clear digital next step.</p>
          </div>
          <Link href="/start-a-project">START A PROJECT ↗</Link>
        </div>
      </div>
    </main>
  );
}

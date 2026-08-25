import Link from 'next/link';
import { builds, labs } from '@/lib/projects';
import { BuildCore } from '@/components/build-core';
import { MotionFX } from '@/components/motion-fx';
import { MobileNav } from '@/components/mobile-nav';
import { EventLink } from '@/components/event-link';
import { CommandPalette } from '@/components/command-palette';
import { PortfolioExperience, ProjectOpenButton, ThemeToggle } from '@/components/portfolio-experience';
import { PremiumUpgrades } from '@/components/premium-upgrades';

const logoSrc = '/assets/02_Compact_Logo.png';

function Logo({ href = '/' }: { href?: string }) {
  return <Link className="brandLogo" href={href} aria-label="Hariom Builds home"><img src={logoSrc} alt="Hariom Builds" width={72} height={72} /></Link>;
}

const services = [
  { n: '01', title: 'Business Websites', text: 'Premium marketing sites that explain the offer fast and turn attention into enquiries.', tags: 'WEB / UX / SEO' },
  { n: '02', title: 'Web Apps & Systems', text: 'Useful dashboards, internal tools and customer-facing products built around real workflows.', tags: 'APP / DATA / API' },
  { n: '03', title: 'Automation', text: 'Remove repetitive work by connecting forms, email, data, notifications and business tools.', tags: 'WORKFLOW / API / OPS' },
  { n: '04', title: 'AI Integration', text: 'Practical AI features where they genuinely save time, improve decisions or unlock a workflow.', tags: 'AI / AGENTS / TOOLS' },
];

const stack = ['NEXT.JS', 'REACT', 'TYPESCRIPT', 'TAILWIND', 'VERCEL', 'APIs', 'AI', 'AUTOMATION', 'RESPONSIVE UI'];

export default function Home() {
  return <main>
    <MotionFX />
    <PremiumUpgrades />
    <PortfolioExperience />
    <CommandPalette />
    <nav className="nav"><Logo href="#top" /><div className="links"><EventLink href="/builds" event="build_view">Builds</EventLink><Link href="#solutions">Solutions</Link><Link href="#lab">Lab</Link><Link href="#about">About</Link><ThemeToggle /><EventLink className="navCta" href="/start-a-project" event="cta_click">Start a Project ↗</EventLink></div><MobileNav /></nav>

    <section id="top" className="hero shell">
      <div className="heroNoise" aria-hidden="true" />
      <div className="heroEyebrow eyebrow"><span className="liveDot" /> INDEPENDENT SOFTWARE-BUILDING STUDIO <span>• 2026</span></div>
      <div className="heroGrid">
        <div className="heroCopy">
          <div className="heroKicker">DIGITAL PRODUCTS / WEB / AUTOMATION / AI</div>
          <h1>Websites that <i>move.</i><br />Systems that <i>work.</i></h1>
          <p className="lead">I build high-clarity websites, automation and practical digital systems around real business problems — so the final product looks sharp <b>and</b> earns its place.</p>
          <div className="actions"><EventLink className="button primary magnetic" href="/start-a-project" event="cta_click">Start a Project <span>↗</span></EventLink><EventLink className="button secondary magnetic" href="#builds" event="build_view">See Selected Work</EventLink></div>
          <div className="capabilities"><span>WEB</span><span>AUTOMATION</span><span>SYSTEMS</span><span>AI</span><span>DEPLOYMENT</span></div>
          <div className="heroTrust"><span><b>●</b> AVAILABLE FOR SELECT PROJECTS</span><span>REMOTE / WORLDWIDE</span></div>
        </div>
        <BuildCore />
      </div>
      <div className="heroFloat"><span>BUILD STATUS</span><strong>ONLINE <i>●</i></strong><small>DESIGN → BUILD → SHIP</small></div>
      <div className="scrollCue"><span>SCROLL TO EXPLORE</span><i /></div>
    </section>

    <section className="signalBar shell" aria-label="Build capabilities"><div><strong>04+</strong><span>CLIENT-STYLE BUILDS</span></div><div><strong>100%</strong><span>RESPONSIVE FIRST</span></div><div><strong>LIVE</strong><span>DEPLOYED DEMOS</span></div><div><strong>24/7</strong><span>ITERATION MINDSET</span></div></section>

    <section id="builds" className="section shell">
      <div className="sectionHead"><div><div className="eyebrow">01 / SELECTED BUILDS</div><h2>Not mockups. <i>Working experiences.</i></h2><p className="sectionIntro">Four live business concepts, each designed around a different conversion problem.</p></div><EventLink className="index" href="/builds" event="build_view">VIEW ALL BUILDS →</EventLink></div>
      <div className="cards">{builds.map((p, i) => <article className="card" data-tilt data-cursor-view key={p.slug}>
        <div className="preview"><iframe className="projectPreviewFrame" src={p.demo ?? ''} title={`${p.name} live preview`} loading="lazy" tabIndex={-1} aria-hidden="true" /><div className="previewShade"/><div className="previewGrid"/><span className="previewNumber">0{i + 1}</span><div className="previewTitle">{p.name}</div><div className="previewStatus">{p.status} / LIVE DEMO</div><ProjectOpenButton name={p.name} demo={p.demo} kind={p.status} /></div>
        <div className="cardMeta"><span className="status">{p.status}</span><span>BUILD / 0{i + 1}</span></div><h3>{p.name}</h3><p>{p.summary}</p><div className="caseMini"><span>PROBLEM</span><b>{p.problem}</b></div><div className="cardBottom"><EventLink className="textLink" href={`/builds/${p.slug}`} event="build_view">Case study →</EventLink>{p.github && <a className="sourceLink" href={p.github} target="_blank" rel="noreferrer">SOURCE ↗</a>}</div>
      </article>)}</div>
    </section>

    <section className="stackStrip" aria-label="Technology stack"><div className="stackTrack">{[...stack, ...stack].map((item, i) => <span key={`${item}-${i}`}>{item}<b>✦</b></span>)}</div></section>

    <section className="section darkSection ideaFlow"><div className="shell"><div className="eyebrow">02 / FROM IDEA → LIVE WEBSITE</div><div className="flowHeader"><h2>Brief in. <i>Business tool out.</i></h2><p>Every build starts with the business objective, not a template.</p></div><div className="flowGrid"><div className="flowStep"><span>01</span><b>BRIEF</b><strong>Understand the problem</strong><p>Users, business goal, constraints and the action that matters.</p></div><div className="flowLine"/><div className="flowStep"><span>02</span><b>DESIGN</b><strong>Shape the experience</strong><p>Structure, visual direction and interactions that make the next step obvious.</p></div><div className="flowLine"/><div className="flowStep"><span>03</span><b>BUILD</b><strong>Make it real</strong><p>Responsive UI, useful states, integrations and clean implementation.</p></div><div className="flowLine"/><div className="flowStep active"><span>04</span><b>DEPLOY</b><strong>LIVE WEBSITE ↗</strong><p>Test, ship, measure and improve what actually matters.</p></div></div></div></section>

    <section id="solutions" className="section shell"><div className="eyebrow">03 / BUSINESS PROBLEMS WE SOLVE</div><h2>Design is the surface. <i>The system is the value.</i></h2><div className="problemGrid"><div><b>01</b><h3>Getting found</h3><p>High-clarity websites that turn attention into enquiries.</p></div><div><b>02</b><h3>Repetitive work</h3><p>Automations that remove manual steps and busywork.</p></div><div><b>03</b><h3>Disconnected tools</h3><p>Internal systems that put important work in one place.</p></div><div><b>04</b><h3>AI opportunities</h3><p>Practical AI features built around a real workflow.</p></div></div></section>

    <section className="section servicesSection"><div className="shell"><div className="eyebrow">04 / WHAT I BUILD</div><div className="servicesIntro"><h2>One studio. <i>More than websites.</i></h2><p>Pick the outcome, not the technology. I can take a project from a sharp landing page to the system behind it.</p></div><div className="serviceGrid">{services.map((service) => <div className="serviceCard" key={service.n}><div className="serviceTop"><span>{service.n}</span><small>{service.tags}</small></div><h3>{service.title}</h3><p>{service.text}</p><span className="serviceArrow">↗</span></div>)}</div></div></section>

    <section className="section processSection"><div className="shell"><div className="sectionHead"><div><div className="eyebrow">05 / HOW I BUILD</div><h2>Small steps. <i>Visible progress.</i></h2></div></div><div className="processGrid"><div><b>01</b><h3>Discover</h3><p>Understand the user, business and constraint.</p><span>→</span></div><div><b>02</b><h3>Design</h3><p>Turn the problem into a focused experience.</p><span>→</span></div><div><b>03</b><h3>Build</h3><p>Ship the smallest useful version without bloat.</p><span>→</span></div><div><b>04</b><h3>Improve</h3><p>Use feedback and evidence to decide what matters next.</p><span>✓</span></div></div></div></section>

    <section className="section proofSection shell"><div className="proofPanel"><div><div className="eyebrow">06 / THE STANDARD</div><h2>Premium on screen. <i>Solid underneath.</i></h2><p>I treat the website as part of the product: fast enough to feel good, structured enough to scale, and clear enough for a real customer to use without thinking.</p></div><div className="proofGrid"><div><strong>01</strong><b>FAST</b><span>Lean pages & assets</span></div><div><strong>02</strong><b>RESPONSIVE</b><span>Mobile → desktop</span></div><div><strong>03</strong><b>ACCESSIBLE</b><span>Useful for everyone</span></div><div><strong>04</strong><b>DEPLOYED</b><span>Real links, real demos</span></div></div></div></section>

    <section id="lab" className="section shell labSection"><div className="sectionHead"><div><div className="eyebrow">07 / THE LAB</div><h2>Experiments that become <i>better products.</i></h2><p className="sectionIntro">A playground for interaction, AI, data and systems — before they become client features.</p></div><EventLink className="index" href="/lab" event="build_view">OPEN LAB →</EventLink></div><div className="labList">{labs.map((p, i) => <EventLink className="labItem" href={`/lab/${p.slug}`} event="build_view" key={p.slug}><span className="labNum">0{i + 1}</span><strong>{p.name}</strong><span className="labStatus">{p.status}</span><span>↗</span></EventLink>)}</div></section>

    <section className="section performanceSection"><div className="shell performancePanel"><div><div className="eyebrow">08 / BUILD QUALITY</div><h2>Looks good. <i>Ships properly.</i></h2><p>Every project is built to behave like a product, not a screenshot: responsive layouts, accessible structure, clean states and deployment-ready code.</p></div><div className="qualityList"><div><span>01</span><b>RESPONSIVE</b><em>Mobile → Desktop</em></div><div><span>02</span><b>ACCESSIBLE</b><em>Keyboard + semantics</em></div><div><span>03</span><b>INTERACTIVE</b><em>Motion with purpose</em></div><div><span>04</span><b>DEPLOYED</b><em>Live, testable demos</em></div></div></div></section>

    <section id="about" className="section about shell"><div><div className="eyebrow">09 / WHY HARIOM BUILDS</div><h2>Small studio. Direct thinking. <i>Real builds.</i></h2></div><div className="aboutCopy"><p>Hariom Builds is an independent software-building studio focused on practical digital systems for service businesses, founders and small teams.</p><p>I keep the process close: understand the problem, build the smallest useful system, test it, then improve what matters.</p><Link className="textLink" href="/about">More about the studio →</Link></div></section>

    <section className="section faqSection shell"><div className="eyebrow">10 / BEFORE WE BUILD</div><h2>A few things clients usually <i>want to know.</i></h2><div className="faqGrid"><details open><summary>Do you only build websites?</summary><p>No. Websites are one part of the studio. I also build web apps, automations, APIs and practical AI features.</p></details><details><summary>Can you redesign an existing site?</summary><p>Yes. The goal can be a full redesign, a conversion-focused refresh, or rebuilding only the parts that are holding the business back.</p></details><details><summary>Can I see working examples?</summary><p>Yes. The selected builds above are live demos so you can interact with the work instead of judging a static screenshot.</p></details><details><summary>What happens after I submit a project?</summary><p>I review the brief, clarify the useful next step and reply with a focused direction rather than a generic sales pitch.</p></details></div></section>

    <section className="cta shell"><div className="ctaOrb" aria-hidden="true"/><div className="eyebrow">11 / START A PROJECT</div><h2>Have a business problem worth <i>building around?</i></h2><p>Tell me what is slowing you down. I’ll turn the conversation into a clear next step.</p><EventLink className="button primary magnetic" href="/start-a-project" event="cta_click">Let's Build <span>↗</span></EventLink><small>Reply within 24–48 hours.</small></section>

    <footer className="footer shell"><Logo /><p>Independent software-building studio.<br /><span>Web / Systems / Automation / AI</span></p><div><Link href="/about">About</Link><Link href="/start-a-project">Contact</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></footer>
  </main>;
}

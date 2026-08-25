import Link from 'next/link';
import { builds } from '@/lib/projects';
import { BuildCore } from '@/components/build-core';
import { MotionFX } from '@/components/motion-fx';
import { MobileNav } from '@/components/mobile-nav';
import { EventLink } from '@/components/event-link';
import { CommandPalette } from '@/components/command-palette';
import { PortfolioExperience, ProjectOpenButton, ThemeToggle } from '@/components/portfolio-experience';
import { PremiumUpgrades } from '@/components/premium-upgrades';

const logoSrc = '/assets/02_Compact_Logo.png';
function Logo({ href = '/' }: { href?: string }) { return <Link className="brandLogo" href={href} aria-label="Hariom Builds home"><img src={logoSrc} alt="Hariom Builds" width={72} height={72} /></Link>; }

const services = [
  { n: '01', title: 'Web Design & Development', text: 'Conversion-focused websites that make your business easier to understand, trust and contact.', tags: 'WEB / UX / SEO' },
  { n: '02', title: 'Business Systems', text: 'Dashboards, portals and custom web apps built around the way your team actually works.', tags: 'APPS / DATA / API' },
  { n: '03', title: 'Automation', text: 'Connect forms, leads, email, data and repetitive operations so less work gets done manually.', tags: 'WORKFLOW / API / OPS' },
  { n: '04', title: 'AI Solutions', text: 'Practical AI features that save time, improve customer experience or make a workflow smarter.', tags: 'AI / AGENTS / TOOLS' },
];

export default function Home() {
  return <main>
    <MotionFX /><PremiumUpgrades /><PortfolioExperience /><CommandPalette />
    <nav className="nav"><Logo href="#top" /><div className="links"><Link href="#services">Services</Link><Link href="#work">Our Work</Link><Link href="#process">Process</Link><Link href="#about">About</Link><ThemeToggle /><EventLink className="navCta" href="/start-a-project" event="cta_click">Start a Project ↗</EventLink></div><MobileNav /></nav>

    <section id="top" className="hero shell">
      <div className="heroNoise" aria-hidden="true" />
      <div className="heroEyebrow eyebrow"><span className="liveDot" /> DIGITAL AGENCY / WEB / SYSTEMS / AI <span>• 2026</span></div>
      <div className="heroGrid"><div className="heroCopy">
        <div className="heroKicker">WE BUILD DIGITAL EXPERIENCES FOR BUSINESSES</div>
        <h1>Turn your business into a <i>better digital experience.</i></h1>
        <p className="lead">We design and build websites, business systems, automation and AI solutions that help businesses look credible, work smarter and generate more opportunities.</p>
        <div className="actions"><EventLink className="button primary magnetic" href="/start-a-project" event="cta_click">Start a Project <span>↗</span></EventLink><EventLink className="button secondary magnetic" href="#work" event="build_view">See Our Work</EventLink></div>
        <div className="capabilities"><span>WEBSITES</span><span>SYSTEMS</span><span>AUTOMATION</span><span>AI</span><span>INTEGRATIONS</span></div>
        <div className="heroTrust"><span><b>●</b> BUILT FOR REAL BUSINESSES</span><span>REMOTE / WORLDWIDE</span></div>
      </div><BuildCore /></div>
      <div className="heroFloat"><span>PROJECT STATUS</span><strong>READY TO BUILD <i>●</i></strong><small>STRATEGY → DESIGN → BUILD → GROW</small></div>
      <div className="scrollCue"><span>SCROLL TO EXPLORE</span><i /></div>
    </section>

    <section className="signalBar shell" aria-label="Agency capabilities"><div><strong>WEB</strong><span>HIGH-CONVERTING SITES</span></div><div><strong>APP</strong><span>CUSTOM BUSINESS SYSTEMS</span></div><div><strong>AUTO</strong><span>SMARTER OPERATIONS</span></div><div><strong>AI</strong><span>PRACTICAL AI SOLUTIONS</span></div></section>

    <section id="services" className="section servicesSection"><div className="shell"><div className="eyebrow">01 / WHAT WE DO</div><div className="servicesIntro"><h2>Everything your business needs to <i>work better online.</i></h2><p>One agency for strategy, design, development and the systems behind the experience.</p></div><div className="serviceGrid">{services.map((service) => <div className="serviceCard" key={service.n}><div className="serviceTop"><span>{service.n}</span><small>{service.tags}</small></div><h3>{service.title}</h3><p>{service.text}</p><span className="serviceArrow">↗</span></div>)}</div></div></section>

    <section id="work" className="section shell"><div className="sectionHead"><div><div className="eyebrow">02 / SELECTED CLIENT-STYLE WORK</div><h2>Real businesses. <i>Real digital experiences.</i></h2><p className="sectionIntro">Explore live website concepts built around different industries, offers and customer journeys.</p></div><EventLink className="index" href="/builds" event="build_view">VIEW ALL WORK →</EventLink></div><div className="cards">{builds.map((p, i) => <article className="card" data-tilt data-cursor-view key={p.slug}><div className="preview"><iframe className="projectPreviewFrame" src={p.demo ?? ''} title={`${p.name} live preview`} loading="lazy" tabIndex={-1} aria-hidden="true" /><div className="previewShade"/><div className="previewGrid"/><span className="previewNumber">0{i + 1}</span><div className="previewTitle">{p.name}</div><div className="previewStatus">LIVE / BUSINESS DEMO</div><ProjectOpenButton name={p.name} demo={p.demo} kind={p.status} /></div><div className="cardMeta"><span className="status">{p.status}</span><span>CLIENT BUILD / 0{i + 1}</span></div><h3>{p.name}</h3><p>{p.summary}</p><div className="caseMini"><span>BUSINESS GOAL</span><b>{p.problem}</b></div><div className="cardBottom"><EventLink className="textLink" href={`/builds/${p.slug}`} event="build_view">View project →</EventLink></div></article>)}</div></section>

    <section className="stackStrip" aria-label="Capabilities"><div className="stackTrack">{['STRATEGY','UX/UI','WEB DEVELOPMENT','SEO','AUTOMATION','AI','APIs','INTEGRATIONS','DEPLOYMENT','STRATEGY','UX/UI','WEB DEVELOPMENT','SEO','AUTOMATION','AI','APIs','INTEGRATIONS','DEPLOYMENT'].map((item,i)=><span key={`${item}-${i}`}>{item}<b>✦</b></span>)}</div></section>

    <section id="process" className="section darkSection ideaFlow"><div className="shell"><div className="eyebrow">03 / OUR PROCESS</div><div className="flowHeader"><h2>From business problem to <i>working solution.</i></h2><p>No mystery process. You know what happens next.</p></div><div className="flowGrid"><div className="flowStep"><span>01</span><b>DISCOVER</b><strong>Understand the business</strong><p>Goals, customers, offer, bottlenecks and what success should look like.</p></div><div className="flowLine"/><div className="flowStep"><span>02</span><b>DESIGN</b><strong>Create the right experience</strong><p>Structure, messaging, UX and visual direction built around the objective.</p></div><div className="flowLine"/><div className="flowStep"><span>03</span><b>BUILD</b><strong>Turn it into a product</strong><p>Responsive development, integrations, automation and useful interactions.</p></div><div className="flowLine"/><div className="flowStep active"><span>04</span><b>LAUNCH</b><strong>Go live and improve</strong><p>Test, deploy, collect feedback and keep improving what matters.</p></div></div></div></section>

    <section className="section shell"><div className="eyebrow">04 / BUSINESS PROBLEMS WE SOLVE</div><h2>Don't buy a website. <i>Buy a better business experience.</i></h2><div className="problemGrid"><div><b>01</b><h3>Need more enquiries?</h3><p>We clarify your offer, strengthen trust and make the next action obvious.</p></div><div><b>02</b><h3>Too much manual work?</h3><p>We connect the tools and automate repetitive steps across your workflow.</p></div><div><b>03</b><h3>Outdated systems?</h3><p>We build modern internal tools and customer experiences around your process.</p></div><div><b>04</b><h3>Wondering where AI fits?</h3><p>We identify practical AI opportunities instead of adding AI just for the label.</p></div></div></section>

    <section className="section processSection"><div className="shell"><div className="sectionHead"><div><div className="eyebrow">05 / WHY CLIENTS WORK WITH US</div><h2>Small enough to care. <i>Serious enough to deliver.</i></h2></div></div><div className="processGrid"><div><b>01</b><h3>Business-first</h3><p>We start with the outcome, not a template or technology buzzword.</p><span>→</span></div><div><b>02</b><h3>Clear communication</h3><p>Simple milestones, direct feedback and no disappearing during the build.</p><span>→</span></div><div><b>03</b><h3>Premium execution</h3><p>Strong design, responsive development and interactions with a purpose.</p><span>→</span></div><div><b>04</b><h3>Built to grow</h3><p>We build foundations you can keep improving instead of throwing away.</p><span>✓</span></div></div></div></section>

    <section className="section proofSection shell"><div className="proofPanel"><div><div className="eyebrow">06 / OUR STANDARD</div><h2>Looks premium. <i>Works like a business tool.</i></h2><p>We care about the details clients notice and the details they don't: speed, responsive layouts, accessible structure, clean states and dependable deployment.</p></div><div className="proofGrid"><div><strong>01</strong><b>STRATEGY</b><span>Goal before pixels</span></div><div><strong>02</strong><b>DESIGN</b><span>Clear & credible</span></div><div><strong>03</strong><b>DEVELOPMENT</b><span>Responsive & robust</span></div><div><strong>04</strong><b>LAUNCH</b><span>Live & measurable</span></div></div></div></section>

    <section id="about" className="section about shell"><div><div className="eyebrow">07 / ABOUT THE AGENCY</div><h2>We build digital products around <i>real business problems.</i></h2></div><div className="aboutCopy"><p>Hariom Builds is a digital agency focused on websites, business systems, automation and practical AI.</p><p>Our approach is straightforward: understand the business, design the right experience, build it properly and stay focused on the result.</p><Link className="textLink" href="/about">Meet the agency →</Link></div></section>

    <section className="section faqSection shell"><div className="eyebrow">08 / FAQ</div><h2>Questions before we <i>build?</i></h2><div className="faqGrid"><details open><summary>Do you only make websites?</summary><p>No. Websites are one service. We also build web apps, business systems, automation, integrations and practical AI solutions.</p></details><details><summary>Can you work with an existing website?</summary><p>Yes. We can redesign, rebuild, optimize or extend an existing site depending on what the business actually needs.</p></details><details><summary>Will you build something custom?</summary><p>Yes. We avoid forcing every business into the same template when a custom solution makes more sense.</p></details><details><summary>What happens after I contact you?</summary><p>We review the project, clarify the objective and come back with a sensible next step rather than a generic sales pitch.</p></details></div></section>

    <section className="cta shell"><div className="ctaOrb" aria-hidden="true"/><div className="eyebrow">09 / LET'S WORK TOGETHER</div><h2>Have a business idea, problem or <i>project in mind?</i></h2><p>Tell us what you are trying to improve. We'll help turn it into a clear digital solution.</p><EventLink className="button primary magnetic" href="/start-a-project" event="cta_click">Start a Project <span>↗</span></EventLink><small>Reply within 24–48 hours.</small></section>

    <footer className="footer shell"><Logo /><p>Digital agency for websites, systems & automation.<br /><span>Web / Systems / Automation / AI</span></p><div><Link href="/about">About</Link><Link href="/start-a-project">Contact</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></footer>
  </main>;
}

const builds = [
  ['MEK Property Maintenance Demo', 'CLIENT', 'A service-business website concept focused on clear offers, trust and lead generation.'],
  ['Roofing Demo', 'CLIENT', 'A focused local-service experience designed around high-intent enquiries.'],
  ['Laundry Demo', 'CLIENT', 'A simple service funnel for bookings, offers and repeat customers.'],
  ['TaskMaster Web App', 'INTERNAL', 'A practical web application for turning everyday work into a manageable system.'],
];

const labs = [
  ['AI Personal Assistant', 'EXPLORING'],
  ['Web Scraper Tool', 'BUILDING'],
  ['Expense Tracker', 'TESTING'],
  ['Real-Time Chat Application', 'LIVE'],
  ['Data Analysis & Visualization', 'EXPERIMENT'],
];

export default function Home() {
  return (
    <main>
      <nav className="nav"><a className="brand" href="#top">HARIOM<span>BUILDS</span></a><div className="links"><a href="#builds">Builds</a><a href="#solutions">Solutions</a><a href="#lab">Lab</a><a href="#about">About</a><a className="navCta" href="#start">Start a Project</a></div></nav>

      <section id="top" className="hero shell">
        <div className="eyebrow">INDEPENDENT SOFTWARE-BUILDING STUDIO</div>
        <div className="heroGrid">
          <div><h1>Digital systems built around <i>real business problems.</i></h1><p className="lead">Websites, automation, internal tools and AI experiences designed to make small businesses easier to run and easier to grow.</p><div className="actions"><a className="button primary" href="#start">Start a Project <span>↗</span></a><a className="button secondary" href="#builds">Explore Builds</a></div><div className="capabilities"><span>Web</span><span>Automation</span><span>Systems</span><span>AI</span></div></div>
          <div className="core"><div className="coreRing ring1"/><div className="coreRing ring2"/><div className="coreNode"><small>BUILD</small><strong>CORE</strong></div><span className="orb orb1">WEB</span><span className="orb orb2">AI</span><span className="orb orb3">AUTO</span><span className="orb orb4">SYS</span></div>
        </div>
      </section>

      <section id="builds" className="section shell"><div className="sectionHead"><div><div className="eyebrow">SELECTED BUILDS</div><h2>Useful software, not just pretty screens.</h2></div><span className="index">01 / BUILDS</span></div><div className="cards">{builds.map(([name,status,desc],i)=><article className="card" key={name}><div className="preview"><span>0{i+1}</span><div className="previewLines"/></div><div className="cardMeta"><span className="status">{status}</span><span>BUILD / 0{i+1}</span></div><h3>{name}</h3><p>{desc}</p><a href="#start" className="textLink">View build →</a></article>)}</div></section>

      <section id="solutions" className="section darkSection"><div className="shell"><div className="eyebrow">BUSINESS PROBLEMS WE SOLVE</div><h2>From scattered work to <i>working systems.</i></h2><div className="problemGrid"><div><b>01</b><h3>Getting found</h3><p>High-clarity websites that turn attention into enquiries.</p></div><div><b>02</b><h3>Repetitive work</h3><p>Automations that remove manual steps and busywork.</p></div><div><b>03</b><h3>Disconnected tools</h3><p>Internal systems that put important work in one place.</p></div><div><b>04</b><h3>AI opportunities</h3><p>Practical AI features built around a real workflow.</p></div></div></div></section>

      <section id="lab" className="section shell"><div className="sectionHead"><div><div className="eyebrow">THE LAB</div><h2>Experiments before they become products.</h2></div><span className="index">02 / LAB</span></div><div className="labList">{labs.map(([name,status],i)=><a className="labItem" href="#start" key={name}><span className="labNum">0{i+1}</span><strong>{name}</strong><span className="labStatus">{status}</span><span>↗</span></a>)}</div></section>

      <section id="about" className="section about shell"><div><div className="eyebrow">WHY HARIOM BUILDS</div><h2>Small studio. Direct thinking. <i>Real builds.</i></h2></div><div className="aboutCopy"><p>Hariom Builds is an independent software-building studio focused on practical digital systems for service businesses, founders and small teams.</p><p>We keep the process close: understand the problem, build the smallest useful system, test it, then improve what matters.</p></div></section>

      <section id="start" className="cta shell"><div className="eyebrow">START A PROJECT</div><h2>Have a business problem worth building around?</h2><p>Tell us what is slowing you down. We’ll turn the conversation into a clear next step.</p><a className="button primary" href="mailto:hello@hariombuilds.com">Start a Project <span>↗</span></a><small>Reply within 24–48 hours.</small></section>

      <footer className="footer shell"><div className="brand">HARIOM<span>BUILDS</span></div><p>Independent software-building studio.</p><div><a href="#about">About</a><a href="#start">Contact</a><a href="#">Privacy</a><a href="#">Terms</a></div></footer>
    </main>
  );
}

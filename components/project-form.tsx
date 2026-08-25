'use client';

import { useRef, useState } from 'react';
import { track } from '@vercel/analytics';

const BUSINESS_EMAIL = 'hariompatel.dev@gmail.com';

const projectTypes = [
  { value: 'Website', icon: '◈', title: 'Website', text: 'A high-converting site that feels premium.' },
  { value: 'Automation', icon: '↗', title: 'Automation', text: 'Remove repetitive work and connect tools.' },
  { value: 'Internal System', icon: '▦', title: 'Internal System', text: 'A dashboard or workflow built for your team.' },
  { value: 'AI', icon: '✦', title: 'AI', text: 'Add useful AI to a real business workflow.' },
];

const timelines = ['ASAP', 'Within 1 month', '1–3 months', '3+ months', 'Not sure'];

export function ProjectForm() {
  const started = useRef(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [type, setType] = useState('Website');
  const [timeline, setTimeline] = useState('Not sure');
  const [step, setStep] = useState(1);

  function begin() {
    if (!started.current) {
      started.current = true;
      track('form_start');
    }
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    begin();
    setError('');
    setSending(true);
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch('/api/project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || 'Unable to send enquiry.');
      track('form_submit');
      setSubmitted(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : `Please email ${BUSINESS_EMAIL} directly.`);
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <section className="projectFormWrap projectDone" aria-live="polite">
        <div className="doneIcon">✓</div>
        <div className="doneEyebrow">BRIEF RECEIVED</div>
        <h2>Good. Now we can build the right thing.</h2>
        <p>Your project brief is on its way. We&apos;ll review the problem and reply within 24–48 hours with a clear next step.</p>
        <a className="projectReset" href="/">Back to Hariom Builds →</a>
        <div className="doneScan" aria-hidden="true" />
      </section>
    );
  }

  return (
    <section className="projectFormWrap">
      <div className="formTopbar">
        <div><span className="formLive" /> ENQUIRY SYSTEM <b>ONLINE</b></div>
        <div className="formStep">STEP {step} / 2</div>
      </div>

      {error && <div className="formError" role="alert">{error}</div>}

      <form className="projectForm" onSubmit={submit} onFocus={begin}>
        <input type="hidden" name="projectType" value={type} />
        <input type="hidden" name="timeline" value={timeline} />

        {step === 1 ? (
          <div className="formStepPanel">
            <div className="panelIntro">
              <span>01 — CONTEXT</span>
              <h2>Let&apos;s understand the business first.</h2>
              <p>Who are we building for, and where can we reach you?</p>
            </div>

            <div className="fieldGrid">
              <label className="field"><span>Name <i>*</i></span><input name="name" autoComplete="name" placeholder="Your name" required /></label>
              <label className="field"><span>Company</span><input name="company" autoComplete="organization" placeholder="Company name" /></label>
              <label className="field"><span>Email <i>*</i></span><input type="email" name="email" autoComplete="email" placeholder="you@company.com" required /></label>
              <label className="field"><span>Website <em>optional</em></span><input type="url" name="website" autoComplete="url" placeholder="https://" /></label>
            </div>

            <div className="choiceHeader"><span>What are we building?</span><small>Pick the closest fit</small></div>
            <div className="typeGrid">
              {projectTypes.map((item) => (
                <button type="button" key={item.value} className={`typeCard ${type === item.value ? 'active' : ''}`} onClick={() => { begin(); setType(item.value); }}>
                  <span className="typeIcon">{item.icon}</span>
                  <strong>{item.title}</strong>
                  <small>{item.text}</small>
                  <span className="typeArrow">↗</span>
                </button>
              ))}
            </div>

            <button type="button" className="nextButton" onClick={() => { begin(); setStep(2); }}>
              Continue to the problem <span>→</span>
            </button>
          </div>
        ) : (
          <div className="formStepPanel">
            <button type="button" className="backStep" onClick={() => setStep(1)}>← Back to context</button>
            <div className="panelIntro compact">
              <span>02 — THE PROBLEM</span>
              <h2>Tell us what is slowing you down.</h2>
              <p>Specific beats polished. Tell us what is happening today and what a useful outcome would look like.</p>
            </div>

            <label className="field fieldWide"><span>Problem description <i>*</i></span><textarea name="problem" rows={6} placeholder="What is frustrating, expensive, slow or not working right now?" required /></label>

            <div className="choiceHeader"><span>When do you want this moving?</span><small>Choose a rough timeline</small></div>
            <div className="timelineGrid">
              {timelines.map((item) => (
                <button type="button" key={item} className={`timelineCard ${timeline === item ? 'active' : ''}`} onClick={() => setTimeline(item)}>{item}<span>{timeline === item ? '✓' : '○'}</span></button>
              ))}
            </div>

            <div className="fieldRow">
              <label className="field"><span>Budget <em>optional</em></span><input name="budget" placeholder="e.g. $1,500–$3,000" /></label>
              <div className="readyBox"><span className="readyDot" /> READY TO BUILD <strong>{type}</strong><small>We&apos;ll use this brief to shape the first conversation.</small></div>
            </div>

            <div aria-hidden="true" className="honeypot"><label>Leave this field empty<input name="website_confirm" tabIndex={-1} autoComplete="off" /></label></div>
            <button className="sendButton" type="submit" disabled={sending}>{sending ? 'Sending brief…' : 'Send Project Brief'} <span>↗</span></button>
            <p className="formNote">Reply within 24–48 hours · Prefer email? <a href={`mailto:${BUSINESS_EMAIL}`}>{BUSINESS_EMAIL}</a></p>
          </div>
        )}
      </form>

      <div className="formFooter"><span>HARIOM BUILDS / PROJECT INTAKE</span><span>NO SALES SCRIPT. JUST THE RIGHT NEXT STEP.</span></div>

      <style jsx global>{`
        .projectFormWrap{position:relative;max-width:1080px;margin:58px auto 110px;border:1px solid #2a3025;background:linear-gradient(145deg,#0d100c,#090b09 55%,#10150d);box-shadow:0 35px 100px #0008;overflow:hidden}
        .projectFormWrap:before{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 90% 0,#b7ff3c12,transparent 32%),linear-gradient(90deg,transparent 49.9%,#b7ff3c08 50%,transparent 50.1%);}
        .formTopbar{position:relative;z-index:2;display:flex;justify-content:space-between;align-items:center;padding:15px 24px;border-bottom:1px solid #252b22;color:#697165;font:9px monospace;letter-spacing:.13em}
        .formTopbar b{color:#b7ff3c;font-weight:500}.formLive{display:inline-block;width:6px;height:6px;margin-right:8px;border-radius:50%;background:#b7ff3c;box-shadow:0 0 12px #b7ff3c;animation:projectPulse 1.4s infinite}.formStep{color:#aab0a5}
        .formError{margin:20px 28px 0;padding:14px 16px;border:1px solid #6b4038;background:#180f0d;color:#f0b6a8;font-size:13px}
        .projectForm{position:relative;z-index:1}.formStepPanel{padding:48px 48px 42px}.panelIntro{margin-bottom:35px}.panelIntro>span{font:9px monospace;color:#b7ff3c;letter-spacing:.18em}.panelIntro h2{font-size:clamp(32px,4vw,52px);line-height:.98;letter-spacing:-.055em;margin:13px 0 12px;max-width:700px;color:#f3f5ee}.panelIntro p{margin:0;color:#7f877a;line-height:1.65;max-width:650px;font-size:14px}.panelIntro.compact{max-width:800px}.backStep{border:0;background:none;color:#747c70;font:10px monospace;cursor:pointer;padding:0;margin-bottom:32px}.backStep:hover{color:#b7ff3c}
        .fieldGrid{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:40px}.field{display:flex;flex-direction:column;gap:9px;min-width:0}.field>span,.choiceHeader>span{font-size:11px;font-weight:700;color:#d9ddd4;letter-spacing:.02em}.field i{font-style:normal;color:#b7ff3c}.field em{font-style:normal;color:#626a5e;font-weight:400;font-size:9px;margin-left:5px}.field input,.field textarea{width:100%;border:1px solid #30372c;background:#090c09;color:#f3f5ee;border-radius:4px;padding:15px 16px;font:14px Arial,sans-serif;outline:none;transition:border-color .2s,box-shadow .2s,transform .2s}.field textarea{resize:vertical;min-height:150px;line-height:1.55}.field input::placeholder,.field textarea::placeholder{color:#555d53}.field input:focus,.field textarea:focus{border-color:#78994a;box-shadow:0 0 0 3px #b7ff3c0c,0 0 30px #b7ff3c08;transform:translateY(-1px)}
        .choiceHeader{display:flex;justify-content:space-between;align-items:end;margin-bottom:14px}.choiceHeader small{color:#626a5e;font:9px monospace}.typeGrid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.typeCard{position:relative;text-align:left;min-height:150px;padding:18px;border:1px solid #2b3228;background:#0b0e0a;color:#f3f5ee;cursor:pointer;transition:transform .22s,border-color .22s,background .22s,box-shadow .22s}.typeCard:hover{transform:translateY(-4px);border-color:#536043;box-shadow:0 18px 45px #0008}.typeCard.active{border-color:#b7ff3c;background:linear-gradient(145deg,#182112,#0b0e0a);box-shadow:inset 0 0 0 1px #b7ff3c22,0 15px 50px #b7ff3c0b}.typeIcon{display:block;color:#b7ff3c;font-size:20px;margin-bottom:20px}.typeCard strong{display:block;font-size:15px;margin-bottom:7px}.typeCard small{display:block;color:#737b70;font-size:10px;line-height:1.45;max-width:170px}.typeArrow{position:absolute;right:14px;top:13px;color:#596254;font:12px monospace}.typeCard.active .typeArrow{color:#b7ff3c}.nextButton,.sendButton{display:flex;justify-content:space-between;align-items:center;width:100%;margin-top:30px;border:1px solid #b7ff3c;background:#b7ff3c;color:#10130c;padding:17px 19px;border-radius:3px;font-weight:800;font-size:13px;cursor:pointer;transition:transform .2s,box-shadow .2s}.nextButton:hover,.sendButton:hover{transform:translateY(-2px);box-shadow:0 15px 40px #b7ff3c20}.nextButton span,.sendButton span{font:18px monospace}.fieldWide{margin:25px 0 32px}.timelineGrid{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}.timelineCard{display:flex;justify-content:space-between;align-items:center;border:1px solid #2c3329;background:#0b0e0a;color:#9ba198;padding:13px 12px;font-size:10px;cursor:pointer;transition:.2s}.timelineCard:hover{border-color:#536043;color:#fff}.timelineCard.active{border-color:#78994a;color:#b7ff3c;background:#12180f}.timelineCard span{font:10px monospace}.fieldRow{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:28px;align-items:end}.readyBox{min-height:72px;border:1px solid #283025;background:#0b0e0a;padding:13px 15px;color:#737b70;font:9px monospace;position:relative}.readyBox strong{display:block;color:#f3f5ee;font:700 13px Arial;margin-top:6px}.readyBox small{display:block;color:#5d665a;font:9px monospace;margin-top:5px}.readyDot{display:inline-block;width:5px;height:5px;background:#b7ff3c;border-radius:50%;margin-right:7px;box-shadow:0 0 10px #b7ff3c}.honeypot{position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden}.formNote{margin:14px 0 0;text-align:center;color:#626a5e;font:9px monospace}.formNote a{color:#9ca693}.formNote a:hover{color:#b7ff3c}.formFooter{display:flex;justify-content:space-between;border-top:1px solid #252b22;padding:13px 24px;color:#50584c;font:8px monospace;letter-spacing:.08em}.projectDone{padding:90px 60px;text-align:center;min-height:520px;display:grid;place-items:center;align-content:center}.doneIcon{width:62px;height:62px;border:1px solid #b7ff3c;border-radius:50%;display:grid;place-items:center;color:#b7ff3c;font-size:28px;box-shadow:0 0 45px #b7ff3c15;animation:donePop .5s ease}.doneEyebrow{color:#b7ff3c;font:9px monospace;letter-spacing:.2em;margin-top:24px}.projectDone h2{font-size:clamp(38px,5vw,65px);letter-spacing:-.06em;line-height:.95;max-width:700px;margin:15px auto}.projectDone p{color:#858d80;max-width:560px;line-height:1.65;margin:0 auto 25px}.projectReset{color:#b7ff3c;font:11px monospace}.doneScan{position:absolute;left:0;right:0;top:0;height:1px;background:#b7ff3c;box-shadow:0 0 25px #b7ff3c;animation:doneScan 2.5s ease-in-out infinite;opacity:.5}
        @keyframes projectPulse{0%,100%{opacity:.35}50%{opacity:1}}@keyframes donePop{from{transform:scale(.6);opacity:0}to{transform:scale(1);opacity:1}}@keyframes doneScan{0%{top:0;opacity:0}15%{opacity:.5}85%{opacity:.5}100%{top:100%;opacity:0}}
        @media(max-width:760px){.formStepPanel{padding:32px 20px}.fieldGrid,.fieldRow{grid-template-columns:1fr}.typeGrid{grid-template-columns:1fr 1fr}.timelineGrid{grid-template-columns:1fr 1fr}.formTopbar{padding:13px 15px}.formFooter{padding:12px 15px;gap:12px;flex-direction:column}.projectDone{padding:70px 25px}.panelIntro h2{font-size:38px}}
        @media(max-width:460px){.typeGrid{grid-template-columns:1fr}.timelineGrid{grid-template-columns:1fr}.choiceHeader{display:block}.choiceHeader small{display:block;margin-top:5px}.formStep{display:none}}
      `}</style>
    </section>
  );
}

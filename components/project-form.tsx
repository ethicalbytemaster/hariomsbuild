'use client';

import { useRef } from 'react';
import { track } from '@vercel/analytics';

export function ProjectForm() {
  const started = useRef(false);
  return <form className="projectForm" action="mailto:hello@hariombuilds.com" method="post" encType="text/plain" onFocus={() => { if (!started.current) { started.current = true; track('form_start'); } }} onSubmit={() => track('form_submit')}>
    <label>Name<input name="name" autoComplete="name" required /></label>
    <label>Company<input name="company" autoComplete="organization" /></label>
    <label>Email<input type="email" name="email" autoComplete="email" required /></label>
    <label>Website <span>(optional)</span><input type="url" name="website" autoComplete="url" /></label>
    <label>Project type<select name="projectType" defaultValue="Website"><option>Website</option><option>Automation</option><option>Internal System</option><option>AI</option><option>Other</option></select></label>
    <label>Problem description<textarea name="problem" rows={7} required /></label>
    <label>Timeline<select name="timeline" defaultValue="Not sure"><option>ASAP</option><option>Within 1 month</option><option>1–3 months</option><option>3+ months</option><option>Not sure</option></select></label>
    <label>Budget <span>(optional)</span><input name="budget" /></label>
    <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}><label>Leave this field empty<input name="website_confirm" tabIndex={-1} autoComplete="off" /></label></div>
    <button className="button primary" type="submit">Send Project Brief ↗</button>
    <p className="formNote">Reply within 24–48 hours. The current form uses your email client; production delivery will be connected once the official business email and mail provider are confirmed.</p>
  </form>;
}

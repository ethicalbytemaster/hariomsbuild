'use client';

import { useRef, useState } from 'react';
import { track } from '@vercel/analytics';

const BUSINESS_EMAIL = 'hariompatel.dev@gmail.com';

export function ProjectForm() {
  const started = useRef(false);
  const [submitted, setSubmitted] = useState(false);
  return <>
    {submitted && <div className="formSuccess" role="status">Project brief prepared. Your email client should open with the details. If it does not, email {BUSINESS_EMAIL} directly.</div>}
    <form className="projectForm" action={`mailto:${BUSINESS_EMAIL}`} method="post" encType="text/plain" onFocus={() => { if (!started.current) { started.current = true; track('form_start'); } }} onSubmit={() => { track('form_submit'); setSubmitted(true); }}>
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
      <p className="formNote">Reply within 24–48 hours. For a direct enquiry, email {BUSINESS_EMAIL}.</p>
    </form>
    <style jsx global>{`.formSuccess{max-width:760px;margin:-35px 0 30px;padding:14px 16px;border:1px solid #536043;background:#12170f;color:#cfe8a9;font-size:13px;line-height:1.5}`}</style>
  </>;
}

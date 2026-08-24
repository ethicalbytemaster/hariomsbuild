'use client';

import { useRef, useState } from 'react';
import { track } from '@vercel/analytics';

const BUSINESS_EMAIL = 'hariompatel.dev@gmail.com';

export function ProjectForm() {
  const started = useRef(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
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

  return <>
    {submitted && <div className="formSuccess" role="status">Project brief sent successfully. We&apos;ll reply within 24–48 hours.</div>}
    {error && <div className="formError" role="alert">{error}</div>}
    <form className="projectForm" onSubmit={submit} onFocus={() => { if (!started.current) { started.current = true; track('form_start'); } }}>
      <label>Name<input name="name" autoComplete="name" required /></label>
      <label>Company<input name="company" autoComplete="organization" /></label>
      <label>Email<input type="email" name="email" autoComplete="email" required /></label>
      <label>Website <span>(optional)</span><input type="url" name="website" autoComplete="url" /></label>
      <label>Project type<select name="projectType" defaultValue="Website"><option>Website</option><option>Automation</option><option>Internal System</option><option>AI</option><option>Other</option></select></label>
      <label>Problem description<textarea name="problem" rows={7} required /></label>
      <label>Timeline<select name="timeline" defaultValue="Not sure"><option>ASAP</option><option>Within 1 month</option><option>1–3 months</option><option>3+ months</option><option>Not sure</option></select></label>
      <label>Budget <span>(optional)</span><input name="budget" /></label>
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}><label>Leave this field empty<input name="website_confirm" tabIndex={-1} autoComplete="off" /></label></div>
      <button className="button primary" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send Project Brief ↗'}</button>
      <p className="formNote">Reply within 24–48 hours. If the enquiry service is unavailable, email {BUSINESS_EMAIL} directly.</p>
    </form>
    <style jsx global>{`.formSuccess,.formError{max-width:760px;margin:-35px 0 30px;padding:14px 16px;font-size:13px;line-height:1.5}.formSuccess{border:1px solid #536043;background:#12170f;color:#cfe8a9}.formError{border:1px solid #6b4038;background:#180f0d;color:#f0b6a8}`}</style>
  </>;
}

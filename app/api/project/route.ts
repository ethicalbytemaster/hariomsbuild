import { NextResponse } from 'next/server';

const TO_EMAIL = 'hariompatel.dev@gmail.com';

function clean(value: unknown, max = 2000) {
  return String(value ?? '').trim().slice(0, max);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (clean(body.website_confirm, 200)) {
      return NextResponse.json({ ok: true });
    }

    const name = clean(body.name, 120);
    const company = clean(body.company, 160);
    const email = clean(body.email, 200);
    const website = clean(body.website, 500);
    const projectType = clean(body.projectType, 80);
    const problem = clean(body.problem, 4000);
    const timeline = clean(body.timeline, 80);
    const budget = clean(body.budget, 120);

    if (!name || !email || !problem || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: 'Please complete the required fields.' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.CONTACT_FROM_EMAIL;
    if (!apiKey || !from) {
      return NextResponse.json({ ok: false, error: 'The enquiry service is not configured yet. Please email hariompatel.dev@gmail.com directly.' }, { status: 503 });
    }

    const text = [
      'New Hariom Builds project enquiry', '',
      `Name: ${name}`, `Company: ${company || 'Not provided'}`, `Email: ${email}`,
      `Website: ${website || 'Not provided'}`, `Project type: ${projectType || 'Not provided'}`,
      `Timeline: ${timeline || 'Not provided'}`, `Budget: ${budget || 'Not provided'}`, '',
      'Problem description:', problem,
    ].join('\n');

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [TO_EMAIL], reply_to: email, subject: `New project enquiry — ${company || name}`, text }),
    });

    if (!response.ok) {
      return NextResponse.json({ ok: false, error: 'We could not send the enquiry right now. Please email hariompatel.dev@gmail.com directly.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request. Please try again or email hariompatel.dev@gmail.com directly.' }, { status: 400 });
  }
}

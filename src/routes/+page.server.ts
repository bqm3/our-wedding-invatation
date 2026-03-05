import type { Actions } from './$types';
import { Resend } from 'resend';
import { env } from '$env/dynamic/private';
import { fail } from '@sveltejs/kit';

const resend = new Resend(env.RESEND_API_KEY);

function isYesNo(v: string) {
	return v === 'yes' || v === 'no';
}

export const actions = {
	rsvp: async ({ request }) => {
		const formData = await request.formData();

		const name = String(formData.get('fullname') ?? '').trim();
		const rsvp = String(formData.get('rsvp') ?? '').trim(); // "yes" | "no"

		// validate
		if (!name) {
			return fail(400, { missingName: true, name }); // trả name để UI giữ input
		}

		if (!isYesNo(rsvp)) {
			return fail(400, { missingRsvp: true, name, rsvp });
		}

		// map nội dung cho đẹp
		const rsvpTextVi = rsvp === 'yes' ? '✅ Sẽ tham dự' : '❌ Không tham dự';
		const rsvpTextEn = rsvp === 'yes' ? '✅ Attending' : '❌ Not attending';

		const now = new Date();
		const timeVi = now.toLocaleString('vi-VN', { timeZone: 'Asia/Bangkok' });

		const subject = `[Wedding Invitation] RSVP - ${name} (${rsvp === 'yes' ? 'YES' : 'NO'})`;

		const text = [
			`Name: ${name}`,
			`RSVP: ${rsvpTextEn} / ${rsvpTextVi}`,
			`Time: ${timeVi}`,
			`Raw: ${rsvp}`
		].join('\n');

		const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6">
        <h2 style="margin: 0 0 12px">New RSVP</h2>
        <p style="margin: 0 0 6px"><b>Name:</b> ${escapeHtml(name)}</p>
        <p style="margin: 0 0 6px"><b>RSVP:</b> ${rsvpTextEn} <span style="opacity:.6">/</span> ${rsvpTextVi}</p>
        <p style="margin: 0 0 6px"><b>Time:</b> ${escapeHtml(timeVi)}</p>
        <hr style="border:none;border-top:1px solid #eee;margin:14px 0" />
        <p style="margin:0;color:#666;font-size:13px">Source: wedding site form</p>
      </div>
    `;

		const { error } = await resend.emails.send({
			from: env.FROM_EMAIL, // ví dụ: "Wedding RSVP <onboarding@resend.dev>" hoặc domain bạn verify
			to: env.TO_EMAIL,     // có thể là string hoặc string[]
			subject,
			text,
			html
		});

		if (error) {
			console.error('Resend error:', error);
			return fail(400, { name, rsvp, emailError: true });
		}

		return { success: true };
	}
} satisfies Actions;

function escapeHtml(s: string) {
	return s
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#039;');
}
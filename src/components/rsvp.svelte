<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { localeStore } from '../i18n.svelte';
	import { LoaderCircle } from '@lucide/svelte';
	import { enhance } from '$app/forms';
	import RsvpSelect from './rsvp-select.svelte';
	import rsvpDeco from '$lib/assets/rsvp-deco.svg';
	import RsvpAccordion from './rsvp-accordion.svelte';

	let { form } = $props();

	let rsvp = $state<'yes' | 'no' | null>(null);
	let submitting = $state(false);

	function clearValidationMessage(formInput: 'name' | 'rsvp') {
		if (formInput === 'name' && form?.missingName) {
			form = null;
		}

		if (formInput === 'rsvp' && form?.missingRsvp) {
			form = null;
		}
	}
</script>

<section class="rsvp">
	<div class="header">
		<img class="header-deco" src={rsvpDeco} alt="rsvp header deco" />
		<h2 class="title {localeStore.locale}">{$_('rsvp.title')}</h2>
		<p class="sub-title {localeStore.locale}">
			{$_('rsvp.reply_by')}
		</p>
	</div>

	<form
		class="rsvp-form"
		method="POST"
		action="?/rsvp"
		use:enhance={({ formData }) => {
			submitting = true;
			formData.append('rsvp', rsvp ?? '');
			return ({ update, result }) => {
				update({}).finally(() => {
					submitting = false;
					if (result.status === 200) {
						rsvp = null;
					}
				});
			};
		}}
	>
		<input
			class="fullname {localeStore.locale}"
			name="fullname"
			value={form?.name ?? ''}
			placeholder={$_('rsvp.fullname_placeholder')}
			onfocus={() => clearValidationMessage('name')}
		/>
		<div class="select-container">
			<RsvpSelect bind:rsvp clearForm={() => clearValidationMessage('rsvp')} />
		</div>
		<button class="send {localeStore.locale}" type="submit" disabled={submitting}>
			{#if submitting}
				<div class="spinning">
					<LoaderCircle />
				</div>
			{:else}
				{$_('rsvp.send')}
			{/if}
		</button>
	</form>
	<div class="submit-message">
		{#if form?.success}
			<p class="success {localeStore.locale}">
				{$_('rsvp.email_success')}
			</p>
		{/if}
		{#if form?.emailError}
			<p class="error {localeStore.locale}">
				{$_('rsvp.email_error')}
			</p>
		{/if}
		{#if form?.missingName}
			<p class="error {localeStore.locale}">
				{$_('rsvp.missing_name_error')}
			</p>
		{/if}
		{#if form?.missingRsvp}
			<p class="error {localeStore.locale}">
				{$_('rsvp.missing_rsvp_error')}
			</p>
		{/if}
	</div>

	<div class="accordion-container">
		<RsvpAccordion />
	</div>
</section>

<style lang="scss">
	section.rsvp {
		padding: 4.5em 3.5em;
	}

	.header {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	img.header-deco {
		width: 4.5em;
		margin-bottom: 0.8em;
	}

	h2.title {
		color: $primary-color;

		&.vi {
			@extend .title-font-vi;
			letter-spacing: 1px;
		}

		&.en {
			@extend .title-font-en;
			letter-spacing: 3px;
		}
	}

	p.sub-title {
		text-align: center;
		color: $font-color-light;

		&.vi {
			margin-top: 0.9em;
			font-size: 0.9rem;
		}

		&.en {
			margin-top: 0.5em;
			font-size: 1.2rem;
		}
	}

	/* ===== FORM LAYOUT ===== */
	form.rsvp-form {
		margin: 3em auto 0 auto;
		max-width: 520px;
		width: 100%;
	}

	/* ===== INPUT ===== */
	input.fullname {
		display: block;
		width: 100%;
		box-sizing: border-box;

		padding: 0.75em 0.9em;
		border: 1px solid $white-2;
		border-radius: 6px;

		background: $white;
		color: $font-color-default;

		letter-spacing: 0.02em;
		outline: none;

		transition: border-color 0.15s ease, box-shadow 0.15s ease;

		&::placeholder {
			color: $font-color-light;
			opacity: 0.85;
		}

		&.vi::placeholder {
			font-size: 0.95rem;
		}

		&:focus {
			border-color: $primary-color;
			box-shadow: 0 0 0 3px rgba(185, 148, 147, 0.25);
		}
	}

	/* ===== SELECT ===== */
	.select-container {
		margin-top: 1em;
		max-width: 520px;
	}

	/* 
		Quan trọng: RsvpSelect là component con -> phải dùng :global để style bên trong.
		Bạn có thể chỉnh tên class cho khớp với RsvpSelect của bạn.
	*/

	/* 1) Nếu RsvpSelect render <select> native */
	.select-container :global(select) {
		display: block;
		width: 100%;
		box-sizing: border-box;

		padding: 0.75em 0.9em;
		border: 1px solid $white-2;
		border-radius: 6px;

		background: $white;
		color: $font-color-default;
		outline: none;

		transition: border-color 0.15s ease, box-shadow 0.15s ease;

		&:focus {
			border-color: $primary-color;
			box-shadow: 0 0 0 3px rgba(185, 148, 147, 0.25);
		}
	}

	/* 2) Nếu RsvpSelect là custom dropdown (button/div) có class "select" / "trigger" */
	.select-container :global(.select),
	.select-container :global(.select-trigger),
	.select-container :global(.rsvp-select-trigger),
	.select-container :global(.trigger) {
		display: flex;
		align-items: center;
		justify-content: space-between;

		width: 100%;
		box-sizing: border-box;

		padding: 0.75em 0.9em;
		border: 1px solid $white-2;
		border-radius: 6px;

		background: $white;
		color: $font-color-default;

		cursor: pointer;
		user-select: none;

		transition: border-color 0.15s ease, box-shadow 0.15s ease;
	}

	/* focus state cho custom trigger (khi bạn add class focus/open trong RsvpSelect) */
	.select-container :global(.open),
	.select-container :global(.is-open),
	.select-container :global(.select--open),
	.select-container :global(.focused) {
		border-color: $primary-color;
		box-shadow: 0 0 0 3px rgba(185, 148, 147, 0.25);
	}

	/* dropdown menu nếu có */
	.select-container :global(.select-menu),
	.select-container :global(.dropdown),
	.select-container :global(.menu) {
		margin-top: 8px;
		border: 1px solid $white-2;
		border-radius: 10px;
		background: $white;
		overflow: hidden;
		box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
	}

	.select-container :global(.select-item),
	.select-container :global(.item),
	.select-container :global(.option) {
		padding: 0.7em 0.9em;
		cursor: pointer;
	}

	.select-container :global(.select-item:hover),
	.select-container :global(.item:hover),
	.select-container :global(.option:hover) {
		background: rgba(185, 148, 147, 0.10);
	}

	/* ===== BUTTON ===== */
	button.send {
		display: flex;
		justify-content: center;
		align-items: center;

		margin-top: 1.6em;
		height: 2.8em;
		width: 100%;
		max-width: 520px;

		background-color: $primary-color;
		border-radius: 6px;
		color: $white;

		letter-spacing: 0.08em;
		transition: transform 0.05s ease, background-color 0.15s ease;

		&[disabled] {
			background-color: $primary-color-light;
			cursor: not-allowed;
		}

		&:active {
			background-color: $primary-color-dark;
			transform: translateY(1px);
		}

		&.vi {
			font-weight: 700;
		}

		&.en {
			font-weight: 700;
		}
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(359deg); }
	}

	.spinning {
		display: flex;
		justify-content: center;
		align-items: center;
		animation: spin 1s linear infinite;
	}

	/* ===== ALERT / MESSAGE ===== */
	.submit-message {
		margin: 0.9em auto 0 auto;
		max-width: 520px;
		min-height: 2.2em;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.submit-message p {
		width: 100%;
		text-align: center;
		padding: 0.6em 0.8em;
		border-radius: 8px;
		font-weight: 500;
		line-height: 1.35;
	}

	.submit-message .vi { font-size: 0.95rem; }
	.submit-message .en { font-size: 1.05rem; }

	.submit-message p.success {
		color: $green-1;
		background: rgba(46, 204, 113, 0.10);
		border: 1px solid rgba(46, 204, 113, 0.25);
	}

	.submit-message p.error {
		color: $red-1;
		background: rgba(231, 76, 60, 0.10);
		border: 1px solid rgba(231, 76, 60, 0.25);
	}

	/* ===== ACCORDION ===== */
	.accordion-container {
		margin-top: 2em;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>

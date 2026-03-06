<script lang="ts">
	import { Clipboard, Check } from '@lucide/svelte';
	import { localeStore } from '../i18n.svelte';

	import qrGroom from '$lib/assets/cr.webp';
	import qrBride from '$lib/assets/cd.webp';

	type BankBoxProps = {
		title: string;
		qrSrc: string;
		bankName: string;
		accountName: string;
		accountNumber: string;
	};

	const banksVI: BankBoxProps[] = [
		{
			title: 'Mừng cưới đến Chú rể',
			qrSrc: qrGroom,
			bankName: 'Vietcombank',
			accountName: 'BÙI QUANG MINH',
			accountNumber: '0301000421715'
		},
		{
			title: 'Mừng cưới đến Cô dâu',
			qrSrc: qrBride,
			bankName: 'Vietcombank',
			accountName: 'NGUYỄN ANH THƯ',
			accountNumber: '1049839160'
		}
	];

	const banksEN: BankBoxProps[] = [
		{
			title: 'Wedding gift for the Groom',
			qrSrc: qrGroom,
			bankName: 'Vietcombank',
			accountName: 'BUI QUANG MINH',
			accountNumber: '0301000421715'
		},
		{
			title: 'Wedding gift for the Bride',
			qrSrc: qrBride,
			bankName: 'Vietcombank',
			accountName: 'NGUYEN ANH THU',
			accountNumber: '1049839160'
		}
	];

	$: t = localeStore.isEn
		? {
				heading: 'Send lots of love',
				desc: 'Love has no barriers. It jumps hurdles, breaks through walls to arrive at its destination full of hope.',
				labels: {
					bank: 'Bank',
					owner: 'Account name',
					number: 'Account number'
				},
				note: 'Scan the QR code or transfer using the details above. Thank you so much ♥',
				copy: 'Copy',
				copied: 'Copied'
			}
		: {
				heading: 'Gửi ngàn yêu thương',
				desc: 'Tình yêu không có rào cản. Nó nhảy rào, xuyên tường để đến đích với đầy hy vọng.',
				labels: {
					bank: 'Ngân hàng',
					owner: 'Chủ tài khoản',
					number: 'Số tài khoản'
				},
				note: 'Quét mã hoặc chuyển khoản theo thông tin trên. Cảm ơn bạn rất nhiều ♥',
				copy: 'Copy',
				copied: 'Đã copy'
			};

	$: banks = localeStore.isEn ? banksEN : banksVI;

	let copiedMap: Record<number, boolean> = {};

	async function copyAccountNumber(index: number, value: string) {
		try {
			await navigator.clipboard.writeText(value);
			copiedMap = { ...copiedMap, [index]: true };
			setTimeout(() => {
				copiedMap = { ...copiedMap, [index]: false };
			}, 1500);
		} catch {}
	}
</script>

<section id="donate" class="donate">
	<div class="donate-bg">
		<div class="container">
			<div class="reveal space-y">
				<h1 class="heading">{t.heading}</h1>

				<p class="desc">{t.desc}</p>

				<div class="list">
					{#each banks as b, i}
						<div class="bankbox">
							<div class="bankbox-inner">
								<div class="title">
									<p>{b.title}</p>
								</div>

								<div class="qr">
									<div class="qr-frame">
										<img src={b.qrSrc} alt={b.title} loading="lazy" />
									</div>
								</div>

								<div class="info">
									<div class="grid">
										<div class="field">
											<p class="label">{t.labels.bank}</p>
											<p class="value">{b.bankName}</p>
										</div>

										<div class="field">
											<p class="label">{t.labels.owner}</p>
											<p class="value">{b.accountName}</p>
										</div>

										<div class="field span-2">
											<p class="label">{t.labels.number}</p>

											<div class="account-row">
												<p class="account select-all">{b.accountNumber}</p>

												<button
													type="button"
													class="copy-btn"
													on:click={() => copyAccountNumber(i, b.accountNumber)}
													aria-label="Copy account number"
												>
													{#if copiedMap[i]}
														<Check size="16" class="ok" />
														<span>{t.copied}</span>
													{:else}
														<Clipboard size="16" />
														<span>{t.copy}</span>
													{/if}
												</button>
											</div>
										</div>
									</div>

									<p class="note">{t.note}</p>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	:global(html) {
		scroll-behavior: smooth;
	}

	.donate {
		width: 100%;
	}

	.donate-bg {
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		padding: 3rem 1.5rem;
		margin-top: -1rem;

		@media (min-width: 768px) {
			padding: 4rem 2.5rem;
		}
	}

	.container {
		width: 100%;
		max-width: 520px;
		margin: 0 auto;
	}

	.space-y {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.heading {
		text-align: center;
		font-size: 1.25rem;
		font-style: italic;
		font-weight: 300;
		color: $font-color-heading;
	}

	.desc {
		text-align: center;
		font-size: 0.95rem;
		color: $font-color-default;
		line-height: 1.6;
	}

	.list {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		@media (min-width: 768px) {
			gap: 1.25rem;
		}
	}

	.bankbox {
		width: 100%;
		border-radius: 16px;
		border: 1px solid #e4e4e7;
		background: rgba(255, 255, 255, 0.8);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
		padding: 1rem;

		@media (min-width: 768px) {
			padding: 1.5rem;
		}
	}

	.bankbox-inner {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center; // mobile center

		@media (min-width: 768px) {
			gap: 1.5rem;
		}
	}

	.title {
		width: 100%;
		color: $primary-color;

		p {
			font-size: 1rem;
			font-weight: 500;
			text-align: center;
		}
	}

	.qr {
		display: flex;
		justify-content: center;
	}

	.qr-frame {
		border-radius: 12px;
		overflow: hidden;
		border: 1px solid #e4e4e7;
		background: #fff;
		width: 180px;
		height: 180px;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			display: block;
		}
	}

	.info {
		width: 100%;
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.9rem;
		text-align: center;

		@media (min-width: 640px) {
			grid-template-columns: 1fr 1fr;
			text-align: left;
		}
	}

	.field {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;

		@media (min-width: 640px) {
			align-items: flex-start;
		}
	}

	.span-2 {
		@media (min-width: 640px) {
			grid-column: span 2;
		}
	}

	.label {
		font-size: 0.72rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #71717a;
	}

	.value {
		font-size: 0.95rem;
		font-weight: 600;
		color: #111827;

		@media (min-width: 768px) {
			font-size: 1rem;
		}
	}

	.account-row {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		flex-wrap: wrap;

		@media (min-width: 640px) {
			justify-content: flex-start;
		}
	}

	.account {
		font-size: 1rem;
		font-weight: 700;
		color: #111827;
	}

	.select-all {
		user-select: all;
	}

	.copy-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		border-radius: 10px;
		border: 1px solid #e4e4e7;
		padding: 0.45rem 0.65rem;
		font-size: 0.8rem;
		background: rgba(255, 255, 255, 0.9);
		cursor: pointer;
		transition: transform 0.06s ease, background 0.12s ease;

		&:hover {
			background: #fafafa;
		}

		&:active {
			transform: scale(0.98);
		}
	}

	.ok {
		color: #059669;
	}

	.note {
		margin-top: 0.75rem;
		font-size: 0.85rem;
		color: #71717a;
		text-align: center;
	}
</style>
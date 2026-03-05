<script lang="ts">
	import letterBottom from '$lib/assets/background.jpg';
	import { _ } from 'svelte-i18n';
	import { localeStore } from '../i18n.svelte';
	import letterDeco from '$lib/assets/letter-deco.svg';

	const nameDivider = `
    <svg width="3" height="3" viewBox="0 0 3 3" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="1.5" cy="1.5" r="1.5" fill="#B99493"/>
    </svg>`;
</script>

<section class="letter">
	<div class="header">
		<img class="header-deco" src={letterDeco} alt="letter header deco" />
		<h2 class="title {localeStore.locale}">{$_('letter.date')}</h2>
		<p class="sub-title {localeStore.locale}">{$_('letter.sub_title')}</p>
	</div>

	<div class="letter-container">
		<p class="letter {localeStore.locale}">{$_('letter.letter_content')}</p>

		{#if localeStore.isEn}
			<div class="letter-signature">
				<p class="en">with love</p>
				<p class="en"><span class="couple-name">Bùi Quang Minh</span> & <span class="couple-name">Nguyễn Anh Thư</span></p>
			</div>
		{:else}
			<div class="family-description vi">
				<p>
					<span class="parent-name">Bùi Văn Vinh</span>
					<span class="name-divider">{@html nameDivider}</span>
					<span class="parent-name">Hoàng Thị Nhung</span>
					<span class="role">có con trai</span>
					<span class="couple-name">Bùi Quang Minh</span>
				</p>

				<p>
					<span class="parent-name">Nguyễn Văn Đương</span>
					<span class="name-divider">{@html nameDivider}</span>
					<span class="parent-name">Lê Thị Hồng Vân</span>
					<span class="role">có con gái</span>
					<span class="couple-name">Nguyễn Anh Thư</span>
				</p>
			</div>
		{/if}
	</div>
</section>

<img class="letter-bottom" src={letterBottom} alt="letter bottom" />

<style lang="scss">
	section.letter {
		padding: 4.5em 3.5em 3em 3.5em;
	}

	.header {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 2em;
	}

	img.header-deco {
		width: 12em;
		margin-bottom: 0.8em;
	}

	.title {
		color: $primary-color;
		letter-spacing: 1px;

		&.kr {
			@extend .title-font-vi;
			margin-bottom: 0.4em;
		}

		&.en {
			@extend .title-font-en;
			margin-bottom: 0.2em;
		}
	}

	.sub-title {
		color: $primary-color;

		&.kr {
			font-weight: 500;
			font-size: 1rem;
		}

		&.en {
			font-size: 1.3rem;
			font-weight: 600;
		}
	}

	p.letter {
		text-align: center;

		&.kr {
			line-height: 2.3em;
			font-size: 0.9rem;
		}

		&.en {
			line-height: 1.8em;
			font-size: 1.2rem;
		}
	}

	.letter-signature {
		margin-top: 2em;

		p {
			text-align: right;
			font-size: 1.2rem;
		}
	}

	/* ====== FAMILY (VI) ====== */
	.family-description {
		margin-top: 2em;

		&.vi p {
			color: $font-color-default;
			display: grid;
			grid-template-columns: repeat(5, 1fr);
			column-gap: 12px;
			margin-bottom: 20px;
			align-items: center;
		}

		.name-divider {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.role {
			display: flex;
			justify-content: center;
			font-size: 12px;
			color: $primary-color;
			opacity: 0.9;
		}

		.parent-name {
			display: inline-block;
		}
	}

	/* Tên cô dâu/chú rể chữ đỏ */
	.couple-name {
		color: #c92a2a;
		font-weight: 700;
	}
</style>
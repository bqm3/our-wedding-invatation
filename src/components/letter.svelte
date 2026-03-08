<script lang="ts">
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
		<img class="header-deco" src={letterDeco} alt="letter header deco" fetchpriority="high"/>
		<h2 class="title {localeStore.locale}">{$_('letter.date')}</h2>
		<p class="sub-title {localeStore.locale}">{$_('letter.sub_title')}</p>
	</div>

	<div class="letter-container">
		<p class="letter {localeStore.locale}">{$_('letter.letter_content')}</p>
	</div>
</section>

<img class="letter-bottom" src={"https://res.cloudinary.com/dftxlzy81/image/upload/v1772981415/PMN05082_jbb54g.jpg"} alt="letter bottom" fetchpriority="high"/>

<style lang="scss">
	section.letter {
		padding: 4.5em 3.5em 3em 3.5em;
		color: $font-color-default;
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
		color: $font-color-heading;
		letter-spacing: 1px;

		&.vi {
			@extend .title-font-vi;
			margin-bottom: 0.4em;

			color: $font-color-heading;
		}

		&.en {
			@extend .title-font-en;
			margin-bottom: 0.2em;
			color: $font-color-heading;
		}
	}

	.sub-title {
		color: $font-color-heading;
		text-align: center;

		&.vi {
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

		&.vi {
			line-height: 2.3em;
			font-size: 0.9rem;
			color: $font-color-default;
		}

		&.en {
			line-height: 1.8em;
			font-size: 1.2rem;

			color: $font-color-default;
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
			color: $font-color-default;
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

<script lang="ts">

	import PhotoSwipeLightBox from 'photoswipe/lightbox';
	import PhotoSwipe from 'photoswipe';
	import 'photoswipe/style.css';
	import { onMount } from 'svelte';
	import { localeStore } from '../i18n.svelte';
	import { _ } from 'svelte-i18n';

	onMount(() => {
		const lightbox = new PhotoSwipeLightBox({
			gallery: '#gallery',
			children: 'a',
			showHideAnimationType: 'fade',
			pswpModule: PhotoSwipe
		});

		lightbox.init();
	});

	const photos = [
		{
			src: "https://res.cloudinary.com/dftxlzy81/image/upload/v1772981415/IMG_0473_faiqwz.jpg",
			width: 1200,
			height: 1800
		},
		{
			src: "https://res.cloudinary.com/dftxlzy81/image/upload/v1772981688/IMG_0469_1_sgqftf.jpg",
			width: 1200,
			height: 1800
		},
		{
			src: "https://res.cloudinary.com/dftxlzy81/image/upload/v1772981429/Snapseed_1_pyzqoa.jpg",
			width: 1200,
			height: 1800
		},
		{
			src: "https://res.cloudinary.com/dftxlzy81/image/upload/v1772981416/Snapseed_lzgn3r.jpg",
			width: 1200,
			height: 1800
		},
		{
			src: "https://res.cloudinary.com/dftxlzy81/image/upload/v1772981416/IMG_0481_okas3g.jpg",
			width: 1200,
			height: 1800
		},
		{
			src: "https://res.cloudinary.com/dftxlzy81/image/upload/v1772981415/IMG_0475_wy3vp6.jpg",
			width: 1200,
			height: 1800
		},
		// {
		// 	src: "https://res.cloudinary.com/dhothev66/image/upload/v1772767416/PMN04389_rfy5jq.jpg",
		// 	width: 1200,
		// 	height: 1800
		// },
		// {
		// 	src: "https://res.cloudinary.com/dhothev66/image/upload/v1772767428/PMN05056_z7oya0.jpg",
		// 	width: 1200,
		// 	height: 1800
		// },
		// {
		// 	src: "https://res.cloudinary.com/dhothev66/image/upload/v1772767425/PMN04582_u6knu2.jpg",
		// 	width: 1200,
		// 	height: 1790
		// },
		// {
		// 	src: "https://res.cloudinary.com/dhothev66/image/upload/v1772767418/PMN04777_hfwvcl.jpg",
		// 	width: 1200,
		// 	height: 1790
		// }
	];
</script>

<section class="gallery">
	<div class="header">
		<h2 class="title {localeStore.locale}">{$_('gallery.title')}</h2>
		<p class="sub-title {localeStore.locale}">{$_('gallery.sub_title')}</p>
	</div>
	<div id="gallery">
		{#each photos as photo}
			<a
				href={photo.src}
				class="slide"
				data-pswp-width={photo.width}
				data-pswp-height={photo.height}
				target="_blank"
			>
				<img class="thumbnail" src={photo.src} alt="" loading="lazy"/>
			</a>
		{/each}
	</div>
</section>

<style lang="scss">
	section.gallery {
		padding: 4.5em 2em 2em 2em;
		background-color: $white;
	}

	.header {
		margin-bottom: 2em;
	}

	h2.title {
		text-align: center;
		&.en {
			@extend .title-font-en;
			letter-spacing: 1px;
		}

		&.vi {
			@extend .title-font-vi;
			letter-spacing: 1px;
		}
	}

	p.sub-title {
		text-align: center;
		&.vi {
			margin-top: 0.9em;
			font-size: 0.9rem;
		}

		&.en {
			margin-top: 0.5em;
			font-size: 1.2rem;
		}
	}

	#gallery {
		display: grid;
		gap: 1em;
		grid-template-columns: repeat(2, 1fr);
		// grid-auto-rows: 6.5em;
	}

	img.thumbnail {
		border-radius: 4px;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.slide:nth-child(1),
	.slide:nth-child(2),
	.slide:nth-child(3),
	.slide:nth-child(5),
	.slide:nth-child(7),
	.slide:nth-child(8),
	.slide:nth-child(9),
	.slide:nth-child(10) {
		grid-row: span 2;
	}
</style>

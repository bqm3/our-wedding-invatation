<script lang="ts">
	import '/src/styles/global.scss';
	import '/src/i18n.svelte.ts';
	import { localeStore } from '../i18n.svelte';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';

	let { children } = $props();

	let localeLoaded = $derived(!localeStore.isLoading && localeStore.locale);
	let title = $state('Kim Phượng & Trường An Wedding');

	onMount(() => {
		document.body.classList.add('loaded');
		if (localeLoaded) {
			title = $_('meta.title');
		}
	});
</script>

<svelte:head>
	<title>{title}</title>

	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Noto+Serif+KR:wght@200..900&family=Sacramento&display=swap"
	/>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
	/>

	<meta name="description" content="Hãy tham gia vào ngày đặc biệt nhất của chúng mình nhé!" />

	<meta property="og:title" content="Kim Phượng & Trường An Wedding" />
	<meta
		property="og:description"
		content="Hãy tham gia vào ngày đặc biệt nhất của chúng mình nhé!"
	/>
	<meta
		property="og:image"
		content="https://res.cloudinary.com/dftxlzy81/image/upload/v1772981415/IMG_0491_yu9gst.jpg"
	/>
	<meta property="og:url" content="https://quangminh-marries-anhthu.com/" />
	<meta property="og:type" content="website" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Kim Phượng & Trường An Wedding" />
	<meta
		name="twitter:description"
		content="Hãy tham gia vào ngày đặc biệt nhất của chúng mình nhé!"
	/>
	<meta
		name="twitter:image"
		content="https://res.cloudinary.com/dftxlzy81/image/upload/v1772981415/IMG_0491_yu9gst.jpg"
	/>
</svelte:head>

{#if localeLoaded}
	{@render children()}
{/if}

<style lang="scss">
	@import '/src/styles/global.scss';
</style>

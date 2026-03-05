<script lang="ts">
	import locationDeco from '$lib/assets/location-deco.svg';
	import { _ } from 'svelte-i18n';
	import { localeStore } from '../i18n.svelte';
	import { Clipboard, Github } from '@lucide/svelte';

	const ADDRESS_VI = 'xóm 6, xã Đông Hòa, thành phố Thái Bình, tỉnh Thái Bình';
	const ADDRESS_EN = 'Star Galaxy Wedding and Event Center';

	// 2 link embed (pb=...) tương ứng VI/EN
	const MAP_EMBED_VI =
		'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d934.4072173042761!2d106.3351182696956!3d20.480430998814747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjDCsDI4JzQ5LjYiTiAxMDbCsDIwJzA4LjciRQ!5e0!3m2!1svi!2s!4v1772719296642!5m2!1svi!2s';

	const MAP_EMBED_EN =
		'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.39121185208!2d105.81320227710034!3d21.017027080629457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab64a157d313%3A0xc315cd481b1a6e5!2zVHJ1bmcgVMOibSBUaeG7h2MgQ8aw4bubaSBWw6AgU-G7sSBLaeG7h24gU3RhciBHYWxheHk!5e0!3m2!1svi!2s!4v1772719330166!5m2!1svi!2s';

	// chọn địa chỉ + map theo ngôn ngữ
	$: currentAddress = localeStore.isEn ? ADDRESS_EN : ADDRESS_VI;
	$: googleMapsUrl = localeStore.isEn ? MAP_EMBED_EN : MAP_EMBED_VI;

	function copyAddress() {
		navigator.clipboard
			.writeText(currentAddress)
			.then(() => alert($_('location.address_copied')))
			.catch(() => null);
	}
</script>
<!-- 
<img src={locationTopWave} class="location-top-wave" alt="" /> -->

<section class="location">
	<h2 class="title {localeStore.locale}">{$_('location.title')}</h2>
	<!-- 
	<p class="venue {localeStore.locale}">
		{#if localeStore.isEn}
			{ADDRESS_EN}
		{:else}
			{ADDRESS_VI}
		{/if}
	</p> -->

	<button class="copy-address {localeStore.locale}" type="button" on:click={copyAddress}>
		<span class="clipboard-icon">
			<Clipboard size="1.1em" />
		</span>
		<span class="address">{currentAddress}</span>
	</button>

	<div class="map">
		<iframe
			class="google-maps"
			title="google maps"
			src={googleMapsUrl}
			allowfullscreen
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
	>
	</iframe>
	</div>

	<p class="signature en">made with ♡ by Quang Minh & Anh Thư</p>

	<a class="github-icon" href="https://github.com/bqm3" target="_blank" rel="noreferrer">
		<Github size="1.1em" strokeWidth={1} />
	</a>

	<img class="location-deco" src={locationDeco} alt="" />
</section>

<style lang="scss">
	img.location-top-wave {
		max-width: $content-max-width;
		width: 100%;
		margin: auto;
	}

	section.location {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: $bg-color-1;
		padding: 1em 2em 1em 2em;
	}

	h2.title {
		color: $primary-color;
		text-align: center;
		margin-bottom: 1em;

		&.vi {
			@extend .title-font-vi;
			letter-spacing: 1px;
		}

		&.en {
			@extend .title-font-en;
			letter-spacing: 1px;
		}
	}

	p.venue {
		text-align: center;
		color: $font-color-default;
		opacity: 0.85;

		&.vi {
			font-size: 1rem;
		}

		&.en {
			font-size: 1.1rem;
		}
	}

	button.copy-address {
		display: flex;
		align-items: center;
		margin-top: 0.7em;
		background: transparent;
		border: none;
		padding: 0.2em 0.3em;
		cursor: pointer;

		.clipboard-icon {
			height: 1em;
			display: inline-flex;
			margin-right: 0.35em;
			color: $font-color-default;
		}

		.address {
			display: inline-block;
			font-size: 1.05rem;
			text-decoration: underline;
			color: $font-color-default;
		}
	}

	.map {
		margin-top: 2em;
		width: 100%;
		height: 16em;
		margin-bottom: 7em;
		max-width: 900px;
	}

	iframe.google-maps {
		width: 100%;
		height: 100%;
		border: none;
		border-radius: 8px;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
	}

	p.signature {
		font-size: 1rem;
	}

	.github-icon {
		margin-top: 0.2em;
		color: $font-color-default;
		cursor: pointer;
	}

	img.location-deco {
		position: absolute;
		bottom: 2.5em;
		right: 1.5em;
	}
</style>

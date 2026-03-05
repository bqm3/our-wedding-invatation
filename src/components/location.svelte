<script lang="ts">
	import locationTopWave from '$lib/assets/location-top-wave.svg';

	import locationDeco from '$lib/assets/location-deco.svg';
	import { _ } from 'svelte-i18n';
	import { localeStore } from '../i18n.svelte';
	import { Clipboard, Github } from '@lucide/svelte';
	import { PUBLIC_GOOGLE_MAPS_API_KEY } from '$env/static/public';

	const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=${PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent('xóm 6, xã Đông Hòa, thành phố Thái Bình, tỉnh Thái Bình')}`;

	function copyAddress() {
		navigator.clipboard
			.writeText('xóm 6, xã Đông Hòa, thành phố Thái Bình, tỉnh Thái Bình')
			.then(() => alert($_('location.address_copied')))
			.catch(() => null);
	}
</script>

<img src={locationTopWave} class="location-top-wave" alt="" />
<section class="location">
	<h2 class="title {localeStore.locale}">{$_('location.title')}</h2>
	<p class="venue en"></p>
	<button class="copy-address en" onclick={copyAddress}>
		<span class="clipboard-icon">
			<Clipboard size="1.1em" />
		</span>
		<span class="address">xóm 6, xã Đông Hòa, thành phố Thái Bình, tỉnh Thái Bình</span></button
	>
	<div class="map">
		<iframe
			class="google-maps"
			title="google maps"
			allowfullscreen
			referrerpolicy="no-referrer-when-downgrade"
			src={googleMapsUrl}
		></iframe>
	</div>
	<p class="signature en">made with ♡ by Quang Minh & Anh Thư</p>
	<a class="github-icon" href="https://github.com/bqm30" target="_blank"
		><Github size="1.1em" strokeWidth={1} /></a
	>
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
		position: relative;
		background-color: $bg-color-1;
		padding: 1em 2em 1em 2em;
	}

	h2.title {
		color: $primary-color;
		text-align: center;
		margin-bottom: 1em;

		&.kr {
			@extend .title-font-vi;
			letter-spacing: 1px;
		}

		&.en {
			@extend .title-font-en;
			letter-spacing: 1px;
		}
	}

	p.venue {
		&.en {
			font-size: 1.1rem;
		}
	}

	button.copy-address {
		display: flex;
		align-items: center;
		margin-top: 0.5em;

		.clipboard-icon {
			height: 1em;
			display: inline-block;
			margin-right: 0.2em;
			color: $font-color-default;
		}

		.address {
			display: inline-block;
			font-size: 1.2rem;
			text-decoration: underline;
		}
	}

	.map {
		margin-top: 2em;
		width: 100%;
		height: 16em;
		margin-bottom: 7em;
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

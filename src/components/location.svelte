<script lang="ts">
	import locationDeco from '$lib/assets/location-deco.svg';
	import { _ } from 'svelte-i18n';
	import { localeStore } from '../i18n.svelte';
	import { Clipboard, Github } from '@lucide/svelte';

	const ADDRESS_VI = 'TRUNG TÂM TIỆC CƯỚI HÀ DƯƠNG PLACE - 431 Tam Trinh - KĐT Vĩnh Hoàng - Hà Nội';
	const ADDRESS_29 = 'TRUNG TÂM TIỆC CƯỚI HÀ DƯƠNG PLACE - 431 Tam Trinh - KĐT Vĩnh Hoàng - Hà Nội';
	const ADDRESS_EN = 'TRUNG TÂM TIỆC CƯỚI HÀ DƯƠNG PLACE - 431 Tam Trinh - KĐT Vĩnh Hoàng - Hà Nội';

	// 2 link embed (pb=...) tương ứng VI/EN
	const MAP_EMBED_VI =
		'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1478.35421624351!2d105.86414961292036!3d20.983851009060782!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac1794212e69%3A0xa7c3a7be3aee825b!2zVHJ1bmcgdMOibSB04buVIGNo4bupYyB0aeG7h2MgY8aw4bubaSBIw6AgRMawxqFuZyBQYWxhY2U!5e0!3m2!1svi!2sus!4v1780134206389!5m2!1svi!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade';

	const MAP_EMBED_29 =
		'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1478.35421624351!2d105.86414961292036!3d20.983851009060782!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac1794212e69%3A0xa7c3a7be3aee825b!2zVHJ1bmcgdMOibSB04buVIGNo4bupYyB0aeG7h2MgY8aw4bubaSBIw6AgRMawxqFuZyBQYWxhY2U!5e0!3m2!1svi!2sus!4v1780134206389!5m2!1svi!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade';

	const MAP_EMBED_EN =
		'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1478.35421624351!2d105.86414961292036!3d20.983851009060782!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac1794212e69%3A0xa7c3a7be3aee825b!2zVHJ1bmcgdMOibSB04buVIGNo4bupYyB0aeG7h2MgY8aw4bubaSBIw6AgRMawxqFuZyBQYWxhY2U!5e0!3m2!1svi!2sus!4v1780134206389!5m2!1svi!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade';

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

	<p class="signature en">made with ♡ by Kim Phượng & Trường An</p>

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

<script lang="ts">
	import { localeStore } from '../i18n.svelte';
	import { browser } from '$app/environment';
	import { Confetti } from 'svelte-confetti';
	import { _ } from 'svelte-i18n';

	const maxSectionHeight = 900;
	let sectionHeight = $state(maxSectionHeight);

	function setSectionHeight() {
		sectionHeight = window.innerHeight < maxSectionHeight ? window.innerHeight : maxSectionHeight;
	}

	if (browser && window.matchMedia('(max-width: 1024px)')) {
		setSectionHeight();
	}

</script>

<section style:height={`${sectionHeight}px`} class="cover">
	<div class="confetti-area">
		<Confetti
			x={[-5, 5]}
			y={[0, 0.1]}
			colorArray={['#588adb', '#f5e298', '#fff', '#9aa3f5']}
			delay={[500, 2000]}
			infinite
			duration={5000}
			amount={70}
			fallDistance={`${sectionHeight}px`}
		/>
	</div>
	<div class="cover-title-container">
		<div class="names-en-box">
			<span class="names en-sacramento">{$_('meta.title')}</span>
		</div>

		<div class="event-date-and-place-box">
			<span class="event-date-and-time {localeStore.locale}">{$_('cover.date')}</span>
			<span class="event-place {localeStore.locale}">{$_('cover.place')}</span>
		</div>
	</div>
</section>

<style lang="scss">
	section.cover {
		position: relative;
		background-image: url('https://res.cloudinary.com/dftxlzy81/image/upload/v1780133275/BG-CHI-OY_1_saafze.jpg');
		background-repeat: no-repeat;
		background-position: center center;
		background-size: cover;
	}
	.confetti-area {
		position: absolute;
		top: -50px;
		left: -50px;
		height: 100vh;
		width: 100%;
		overflow: hidden;
		pointer-events: none;
	}
	.names-vi-box {
		position: absolute;
		top: 3em;
		left: 4em;

		span.names {
			color: #616161;
			display: block;
			font-size: 1rem;
			letter-spacing: 0.8em;
			line-height: 2;
		}
	}

	.names-vi-29-box {
		position: absolute;
		top: 3em;
		left: 4em;

		span.names {
			color: #616161;
			display: block;
			font-size: 1rem;
			letter-spacing: 0.8em;
			line-height: 2;
		}
	}

	.cover-title-container {
		width: calc(100% - 3rem);
		max-width: 480px;
		position: absolute;
		bottom: 2em;
		left: 50%;
		transform: translateX(-50%);
		background: rgba(255, 255, 255, 0.45);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border: 1px solid rgba(255, 255, 255, 0.5);
		border-radius: 16px;
		padding: 1.5em 1em;
		box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.06);
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		gap: 0.6em;
		z-index: 2;
	}

	.names-en-box {
	width: 100%;
	display: flex;
	justify-content: center;

	span.names {
		display: block;
		color: #222222;
		word-spacing: 5px;
		font-size: clamp(1.55rem, 6vw, 2.2rem);
		text-align: center;
		line-height: 1.2;
	}
}


@media (max-width: 600px) {
	.names-en-box {
		span.names {
			font-size: 1.45rem;
			word-spacing: 2px;
			line-height: 1.25;
		}
	}
}
	.event-date-and-place-box {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		span.event-date-and-time,
		span.event-place {
			display: block;
			color: #222222;

			font-size: 1rem;
			text-align: center;

			// &.vi {
			// 	font-size: 1rem;
			// }

			// &.en {
			// 	font-size: 1rem;
			// }
		}

		// span.event-date-and-time.vi {
		// 	margin-bottom: 0.4em;
		// }
	}
</style>

<script lang="ts">
	import { Volume2, VolumeX } from 'lucide-svelte';

	const musicUrl =
		'https://res.cloudinary.com/dftxlzy81/video/upload/v1780145432/Ordinary_orzci1.mp3';

	let audio: HTMLAudioElement;
	let playing = $state(false);

	function toggle() {
		if (!audio) return;
		if (playing) {
			audio.pause();
			playing = false;
		} else {
			audio
				.play()
				.then(() => {
					playing = true;
				})
				.catch((err) => {
					console.error('Audio play failed:', err);
					playing = false;
				});
		}
	}
</script>

<audio bind:this={audio} src={musicUrl} loop preload="auto"></audio>

<button class="music-btn" onclick={toggle}>
	{#if playing}
		<Volume2 size="20" />
	{:else}
		<VolumeX size="20" />
	{/if}
</button>

<style lang="scss">
	.music-btn {
		position: fixed;
		bottom: 25px;
		right: 25px;
		width: 46px;
		height: 46px;
		border-radius: 50%;
		border: none;
		background: #b99493;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		box-shadow: 0 4px 12px rgba(0,0,0,0.2);
		z-index: 9999;
		transition: all 0.2s ease;
	}

	.music-btn:hover {
		transform: scale(1.08);
	}
</style>
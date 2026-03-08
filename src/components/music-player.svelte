<script lang="ts">

	import musicUrl from '$lib/assets/wedding-music.mp3';
	import { onMount } from 'svelte';
	import { Volume2, VolumeX } from 'lucide-svelte';

	let audio: HTMLAudioElement;
	let playing = $state(false);

	function toggle() {
		if (!audio) return;

		if (playing) {
			audio.pause();
			playing = false;
		} else {
			audio.play();
			playing = true;
		}
	}

	onMount(async () => {
		try {
			await audio.play();
			playing = true;
		} catch {
			// autoplay bị chặn
			playing = false;
		}
	});
</script>

<audio bind:this={audio} src={musicUrl} loop></audio>

<button class="music-btn" on:click={toggle}>
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
	}

	.music-btn:hover {
		transform: scale(1.05);
	}
</style>
<script lang="ts">
	import { onMount } from 'svelte';
	import { Volume2, VolumeX } from 'lucide-svelte';

	// Thay URL dưới đây bằng URL file MP3 sau khi bạn upload lên Cloudinary của mình
	const musicUrl = 'https://res.cloudinary.com/dftxlzy81/video/upload/v1780145432/Ordinary_orzci1.mp3';

	let audio: HTMLAudioElement;
	let playing = $state(false);

	async function playMusic() {
		try {
			await audio.play();
			playing = true;
		} catch {
			playing = false;
		}
	}

	function toggle() {
		if (!audio) return;

		if (playing) {
			audio.pause();
			playing = false;
		} else {
			playMusic();
		}
	}

	onMount(() => {
		// Trick: autoplay muted trước → rồi unmute
		audio.muted = true;

		audio.play()
			.then(() => {
				audio.muted = false;
				playing = true;
			})
			.catch(() => {
				// Nếu bị chặn → chờ user click
				playing = false;

				const resume = () => {
					playMusic();
					window.removeEventListener('click', resume);
				};

				window.addEventListener('click', resume);
			});
	});
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
<script lang="ts">
	import Calendar from '../components/calendar.svelte';
	import Letter from '../components/letter.svelte';
	import Rsvp from '../components/rsvp.svelte';
	import Cover from '../components/cover.svelte';
	import Location from '../components/location.svelte';
	import type { PageProps } from './$types';
	import Gallery from '../components/gallery.svelte';
	import Donate from '../components/donate.svelte';
	import MusicPlayer from '../components/music-player.svelte';


	let { form }: PageProps = $props();
</script>

<MusicPlayer />
<Cover />
<Letter />
<Rsvp {form} />
<Gallery />
<Calendar />
<Donate />
<Location />

<script lang="ts">
	import calendarDeco from '$lib/assets/calendar-deco.svg';
	import locationTopWave from '$lib/assets/location-top-wave.svg';
	import { localeStore } from '../i18n.svelte';

	const weekdaysVI = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
	const weekdaysEN = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

	// VI wedding
	const weddingVI = {
		year: 2026,
		monthIndex: 2,
		title: 'Tháng 3, 2026',
		day: 30,
		time: '11 giờ'
	};

	// EN wedding
	const weddingEN = {
		year: 2026,
		monthIndex: 3,
		title: 'April 2026',
		day: 11,
		time: '10 a.m'
	};

	function daysInMonth(y: number, m: number) {
		return new Date(y, m + 1, 0).getDate();
	}

	function firstDayOfMonth(y: number, m: number) {
		return new Date(y, m, 1).getDay();
	}

	$: config = localeStore.isEn ? weddingEN : weddingVI;
	$: weekdays = localeStore.isEn ? weekdaysEN : weekdaysVI;

	$: totalDays = daysInMonth(config.year, config.monthIndex);
	$: startOffset = firstDayOfMonth(config.year, config.monthIndex);

	$: cells = [
		...Array.from({ length: startOffset }, () => null),
		...Array.from({ length: totalDays }, (_, i) => i + 1)
	];

	function isSunday(day: number) {
		return (startOffset + (day - 1)) % 7 === 0;
	}
</script>

<section class="calendar">
	<h2 class="title">{config.title}</h2>

	<div class="calendar-content">
		{#each weekdays as d, i}
			<div class="dow {i === 0 ? 'sun' : ''}">{d}</div>
		{/each}

		{#each cells as day}
			{#if day === null}
				<div class="cell empty"></div>
			{:else}
				<div class="cell {day === config.day ? 'wedding' : ''} {isSunday(day) ? 'sun' : ''}">
					<div class="day">{day}</div>

					{#if day === config.day}
						<div class="time">{config.time}</div>
					{/if}
				</div>
			{/if}
		{/each}
	</div>

	<img class="calendar-deco" src={calendarDeco} alt="calendar deco" />
</section>

<img src={locationTopWave} class="location-top-wave" alt="" />

<style lang="scss">
	img.location-top-wave {
		max-width: $content-max-width;
		width: 100%;
		margin: auto;
	}

	.calendar {
		position: relative;
		background-color: $white;
		padding: 2em 3.5em 4em 3.5em;

		.title {
			text-align: center;
			color: $primary-color;
			margin-bottom: 1em;
			letter-spacing: 0.08em;
		}
	}

	.calendar-content {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 10px 18px;
	}

	.dow {
		text-align: center;
		font-size: 14px;
		opacity: 0.7;
	}

	.dow.sun {
		color: #c92a2a;
		opacity: 1;
	}

	.cell {
		height: 60px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		padding-top: 6px;
	}

	.cell.empty {
		height: 60px;
	}

	.day {
		font-size: 16px;
		color: #333;
		opacity: 0.75;
	}

	.cell.sun .day {
		color: #c92a2a;
		opacity: 1;
	}

	.cell.wedding .day {
		width: 38px;
		height: 38px;
		border-radius: 50%;
		background: #b99493;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		opacity: 1;
	}

	.time {
		margin-top: 6px;
		font-size: 12px;
		opacity: 0.55;
		color: #b99493;
	}

	img.calendar-deco {
		position: absolute;
		bottom: 0.5em;
		right: 2.5em;
	}
</style>
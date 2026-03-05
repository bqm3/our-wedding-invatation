<script lang="ts">
	import calendarDeco from '$lib/assets/calendar-deco.svg';

	const year = 2026;
	const monthIndex = 2; // March
	const monthTitle = 'Tháng 3, 2026';

	const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

	const weddingDay = 30;
	const weddingTime = '11:00 sáng';

	function daysInMonth(y: number, m: number) {
		return new Date(y, m + 1, 0).getDate();
	}

	function firstDayOfMonth(y: number, m: number) {
		return new Date(y, m, 1).getDay();
	}

	const totalDays = daysInMonth(year, monthIndex);
	const startOffset = firstDayOfMonth(year, monthIndex);

	const cells: Array<number | null> = [
		...Array.from({ length: startOffset }, () => null),
		...Array.from({ length: totalDays }, (_, i) => i + 1)
	];

	function isSunday(day: number) {
		return ((startOffset + (day - 1)) % 7) === 0;
	}
</script>

<section class="calendar">
	<h2 class="title en">{monthTitle}</h2>

	<div class="calendar-content">
		{#each weekdays as d, i}
			<div class="dow {i === 0 ? 'sun' : ''}">{d}</div>
		{/each}

		{#each cells as day}
			{#if day === null}
				<div class="cell empty" />
			{:else}
				<div class="cell {day === weddingDay ? 'wedding' : ''} {isSunday(day) ? 'sun' : ''}">
					<div class="day">{day}</div>

					{#if day === weddingDay}
						<div class="time">{weddingTime}</div>
					{/if}
				</div>
			{/if}
		{/each}
	</div>

	<img class="calendar-deco" src={calendarDeco} alt="calendar deco" />
</section>

<style lang="scss">
	.calendar {
		position: relative;
		background-color: $white;
		padding: 2em 3.5em 4em 3.5em;

		.title {
			text-align: center;
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
		height: 56px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		padding-top: 6px;
	}

	.cell.empty {
		height: 56px;
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
		width: 34px;
		height: 34px;
		border-radius: 50%;
		background: #c92a2a;
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
	}

	img.calendar-deco {
		position: absolute;
		bottom: 0.5em;
		right: 2.5em;
	}
</style>
<script>
	import { Button } from '@atoms/button';
	import { cn } from '@/utils';

	export let code = 500;
	export let message = 'Oops! Something went wrong :)';
	export let minimal = false;
</script>

<div class={cn('h-svh w-full')}>
	<div class="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
		{#if !minimal}
			<h1 class="text-[7rem] font-bold leading-tight">{code}</h1>
		{/if}
		<span class="font-medium">{message}</span>
		<p class="text-center text-muted-foreground">
			We apologize for the inconvenience. <br /> Please try again later.
		</p>
		{#if !minimal}
			<div class="mt-6 flex gap-4">
				<Button variant="outline" on:click={() => history.back()}>Go Back</Button>
				<Button href="/">Back to Home</Button>
			</div>
		{/if}
	</div>
</div>

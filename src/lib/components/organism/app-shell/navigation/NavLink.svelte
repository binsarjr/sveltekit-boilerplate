<script lang="ts">
	export let title;
	export let icon;
	export let label;
	export let href;
	export let closeNav;
	export let subLink = false;

	import { cn } from '@/utils';
	import { initCheckActiveNav } from './Nav.svelte';
	import { page } from '$app/stores';
	import { buttonVariants } from '@atoms/button';

	const { checkActiveNav } = initCheckActiveNav($page.url.pathname);

	let buttonClass = cn(
		buttonVariants({
			variant: checkActiveNav(href) ? 'secondary' : 'ghost',
			size: 'sm'
		}),
		'h-12 justify-start text-wrap rounded-none px-6',
		subLink && 'h-10 w-full border-l border-l-slate-500 px-2'
	);
</script>

<a
	{href}
	on:click={closeNav}
	class={buttonClass}
	aria-current={checkActiveNav(href) ? 'page' : undefined}
>
	<div class="mr-2">
		<svelte:component this={icon} class="text-[18px]" />
	</div>
	{title}
	{#if label}
		<div class="ml-2 rounded-lg bg-primary px-1 text-[0.625rem] text-primary-foreground">
			{label}
		</div>
	{/if}
</a>

<script lang="ts">
	import { cn } from '@/utils';
	import { initCheckActiveNav } from './Nav.svelte';
	import { page } from '$app/stores';
	import { TooltipContent, TooltipTrigger, Tooltip } from '@atoms/tooltip';

	const { checkActiveNav } = initCheckActiveNav($page.url.pathname);

	export let title;
	export let icon;
	export let label;
	export let href;
</script>

<Tooltip>
	<TooltipTrigger asChild>
		<a {href} class={cn(checkActiveNav(href) ? 'secondary' : 'ghost', 'h-12 w-12')}>
			<svelte:component this={icon} />
			<span class="sr-only">{title}</span>
		</a>
	</TooltipTrigger>
	<TooltipContent side="right" class="flex items-center gap-4">
		{title}
		{#if label}
			<span class="ml-auto text-muted-foreground">{label}</span>
		{/if}
	</TooltipContent>
</Tooltip>

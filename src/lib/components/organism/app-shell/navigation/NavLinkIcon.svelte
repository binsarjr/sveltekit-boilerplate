<script lang="ts">
	import { cn } from '@/utils';
	import { initCheckActiveNav } from './Nav.svelte';
	import { page } from '$app/stores';
	import { TooltipContent, TooltipTrigger, Tooltip } from '@shadcn-ui/tooltip';
	import { buttonVariants } from '@shadcn-ui/button';

	const { checkActiveNav } = initCheckActiveNav($page.url.pathname);

	export let title;
	export let icon;
	export let label;
	export let href;
</script>

<Tooltip openDelay={0}>
	<TooltipTrigger>
		<a
			{href}
			class={cn(
				buttonVariants({
					variant: checkActiveNav(href) ? 'secondary' : 'ghost',
					size: 'icon'
				}),
				'h-12 w-12'
			)}
		>
			<svelte:component this={icon} class="text-[18px]" />
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

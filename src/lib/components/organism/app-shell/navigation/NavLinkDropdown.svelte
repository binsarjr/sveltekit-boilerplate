<script lang="ts">
	import { cn } from '@/utils';
	import { initCheckActiveNav } from './Nav.svelte';
	import { page } from '$app/stores';
	import NavLink from './NavLink.svelte';
	import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@shadcn-ui/collapsible';
	import IconChevronDown from '@/components/icons/IconChevronDown.svelte';
	import { buttonVariants } from '@shadcn-ui/button';
	import { slide } from 'svelte/transition';

	const { checkActiveNav } = initCheckActiveNav($page.url.pathname);

	export let title;
	export let icon;
	export let label;
	export let sub;
	export let closeNav;

	const isChildActive = !!sub?.find((s: any) => checkActiveNav(s.href));
</script>

<Collapsible open={isChildActive}>
	<CollapsibleTrigger
		class={cn(
			buttonVariants({ variant: 'ghost', size: 'sm' }),
			'group h-12 w-full justify-start rounded-none px-6',
			'secondary'
		)}
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
		<span class={cn('ml-auto transition-all group-data-[state="open"]:-rotate-180')}>
			<IconChevronDown stroke={1} class="text-[18px]" />
		</span>
	</CollapsibleTrigger>
	<CollapsibleContent>
		<ul>
			{#each sub as sublink}
				<li class="my-1 ml-8">
					<NavLink {...sublink} subLink={true} {closeNav} />
				</li>
			{/each}
		</ul>
	</CollapsibleContent>
</Collapsible>

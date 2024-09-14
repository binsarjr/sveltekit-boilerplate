<script lang="ts">
	import { cn } from '@/utils';
	import { initCheckActiveNav } from './Nav.svelte';
	import { page } from '$app/stores';
	import { Tooltip, TooltipContent, TooltipTrigger } from '@atoms/tooltip';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuLabel,
		DropdownMenuSeparator,
		DropdownMenuTrigger
	} from '@atoms/dropdown-menu';
	import IconChevronDown from '@icons/IconChevronDown.svelte';
	import Button from '@atoms/button/button.svelte';

	const { checkActiveNav } = initCheckActiveNav($page.url.pathname);

	export let title;
	export let icon;
	export let label;
	export let sub;

	/* Open collapsible by default
	 * if one of child element is active */
	const isChildActive = !!sub?.find((s: any) => checkActiveNav(s.href));
</script>

<DropdownMenu>
	<Tooltip>
		<TooltipTrigger asChild>
			<DropdownMenuTrigger asChild>
				<Button variant={isChildActive ? 'secondary' : 'ghost'} size="icon" class="h-12 w-12">
					{@html icon}
				</Button>
			</DropdownMenuTrigger>
		</TooltipTrigger>
		<TooltipContent side="right" class="flex items-center gap-4">
			{title}
			{#if label}
				<span class="ml-auto text-muted-foreground">{label}</span>
			{/if}
			<IconChevronDown size={18} class="-rotate-90 text-muted-foreground" />
		</TooltipContent>
	</Tooltip>
	<DropdownMenuContent side="right" align="start" sideOffset={4}>
		<DropdownMenuLabel>
			{title}
			{#if label}({label}){/if}
		</DropdownMenuLabel>
		<DropdownMenuSeparator />
		{#each sub as { title, icon, label, href }}
			<DropdownMenuItem asChild>
				<a {href} class={cn(checkActiveNav(href) ? 'bg-secondary' : '')}>
					{@html icon} <span class="ml-2 max-w-52 text-wrap">{title}</span>
					{#if label}
						<span class="ml-auto text-xs">{label}</span>
					{/if}
				</a>
			</DropdownMenuItem>
		{/each}
	</DropdownMenuContent>
</DropdownMenu>

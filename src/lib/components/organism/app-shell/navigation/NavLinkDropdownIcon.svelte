<script lang="ts">
	import { cn } from '@/utils';
	import { initCheckActiveNav } from './Nav.svelte';
	import { page } from '$app/stores';
	import { Tooltip, TooltipContent, TooltipTrigger } from '@shadcn-ui/tooltip';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuLabel,
		DropdownMenuSeparator,
		DropdownMenuTrigger
	} from '@shadcn-ui/dropdown-menu';
	import IconChevronDown from '@icons/IconChevronDown.svelte';
	import Button from '@shadcn-ui/button/button.svelte';

	const { checkActiveNav } = initCheckActiveNav($page.url.pathname);

	export let title;
	export let icon;
	export let label;

	export let sub;

	/* Open collapsible by default
	 * if one of child element is active */
	const isChildActive = !!sub?.find((s: any) => checkActiveNav(s.href));

	let dropdownOpen = false;
</script>

<DropdownMenu bind:open={dropdownOpen}>
	<Tooltip openDelay={0}>
		<TooltipTrigger>
			<DropdownMenuTrigger>
				<Button variant={isChildActive ? 'secondary' : 'ghost'} size="icon" class="h-12 w-12">
					<svelte:component this={icon} class="text-[18px]" />
				</Button>
			</DropdownMenuTrigger>
		</TooltipTrigger>
		{#if !dropdownOpen}
			<TooltipContent side="right">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div class="flex cursor-pointer items-center gap-4" on:click={() => (dropdownOpen = true)}>
					{title}
					{#if label}
						<span class="ml-auto text-muted-foreground">{label}</span>
					{/if}
					<IconChevronDown class="-rotate-90 text-[18px] text-muted-foreground" />
				</div>
			</TooltipContent>
		{/if}
	</Tooltip>
	<DropdownMenuContent side="right" align="start" sideOffset={4}>
		<DropdownMenuLabel>
			{title}
			{#if label}({label}){/if}
		</DropdownMenuLabel>
		<DropdownMenuSeparator />
		{#each sub as { title, icon, label, href }}
			<DropdownMenuItem>
				<Button
					variant="ghost"
					size="sm"
					{href}
					class={cn(checkActiveNav(href) ? 'bg-secondary' : '')}
				>
					<svelte:component this={icon} class="text-[18px]" />
					<span class="ml-2 max-w-52 text-wrap">{title}</span>
					{#if label}
						<span class="ml-auto text-xs">{label}</span>
					{/if}
				</Button>
			</DropdownMenuItem>
		{/each}
	</DropdownMenuContent>
</DropdownMenu>

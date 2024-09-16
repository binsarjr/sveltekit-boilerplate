<script lang="ts" context="module">
	export const initCheckActiveNav = (pathname: string) => {
		const checkActiveNav = (nav: string) => {
			const pathArray = pathname.split('/').filter((item) => item !== '');

			if (nav === '/' && pathArray.length < 1) return true;

			return pathArray.includes(nav.replace(/^\//, ''));
		};

		return { checkActiveNav };
	};
</script>

<script lang="ts">
	import { cn } from '@/utils';
	import { page } from '$app/stores';
	import NavLinkIconDropdown from './NavLinkDropdownIcon.svelte';
	import NavLinkIcon from './NavLinkIcon.svelte';
	import NavLinkDropdown from './NavLinkDropdown.svelte';
	import NavLink from './NavLink.svelte';
	import { Tooltip } from '@shadcn-ui/tooltip';

	export let links;
	export let isCollapsed;
	export let closeNav;
</script>

<div
	data-collapsed={isCollapsed}
	class={cn(
		'group border-b bg-background py-2 transition-[max-height,padding] duration-500 data-[collapsed=true]:py-2 md:border-none',
		$$props.class
	)}
>
	<Tooltip>
		<nav
			class="grid gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2"
		>
			{#each links as link}
				{#if isCollapsed && link.sub}
					<NavLinkIconDropdown {...link} sub={link.sub} {closeNav} />
				{:else if isCollapsed}
					<NavLinkIcon {...link} {closeNav} />
				{:else if link.sub}
					<NavLinkDropdown {...link} sub={link.sub} {closeNav} />
				{:else}
					<NavLink {...link} {closeNav} />
				{/if}
			{/each}
		</nav>
	</Tooltip>
</div>

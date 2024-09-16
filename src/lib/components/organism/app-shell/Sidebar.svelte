<script context="module">
	export const navOpened = writable(false);
</script>

<script lang="ts">
	import { browser } from '$app/environment';

	import { isCollapsed } from '@/components/templates/AppShell.svelte';
	import Layout from '@organism/layout/Layout.svelte';

	import { cn } from '@/utils';
	import { writable } from 'svelte/store';
	import LayoutHeader from '@organism/layout/LayoutHeader.svelte';
	import { onMount, tick } from 'svelte';
	import Button from '@shadcn-ui/button/button.svelte';
	import XIcon from '@/components/icons/IconX.svelte';
	import IconMenu from '@/components/icons/IconMenu.svelte';
	import IconX from '@/components/icons/IconX.svelte';
	import Nav from './navigation/Nav.svelte';
	import IconChevronsLeft from '@icons/IconChevronsLeft.svelte';
	import { route } from '@/ROUTES';
	import { Motion } from 'svelte-motion';

	const navCondition = async () => {
		if (!browser) return;
		if (!document) return;
		await tick();
		if ($navOpened) {
			document.body.classList.add('overflow-hidden');
		} else {
			document.body.classList.remove('overflow-hidden');
		}
	};

	$: $navOpened, navCondition();

	const sidelinks: any[] = [
		{
			title: 'Dashboard',
			label: '',
			href: '#',
			icon: IconMenu
		},
		{
			title: 'Tasks',
			label: '3',
			href: route('/tasks'),
			icon: IconMenu
		},
		{
			title: 'Chats',
			label: '9',
			href: '#',
			icon: IconMenu
		},
		{
			title: 'Apps',
			label: '',
			href: '#',
			icon: IconMenu
		},
		{
			title: 'Authentication',
			label: '',
			href: '#',
			icon: IconMenu,
			sub: [
				{
					title: 'Sign In (email + password)',
					label: '',
					href: '#',
					icon: IconMenu
				},
				{
					title: 'Sign In (Box)',
					label: '',
					href: '#',
					icon: IconMenu
				},
				{
					title: 'Sign Up',
					label: '',
					href: '#',
					icon: IconMenu
				},
				{
					title: 'Forgot Password',
					label: '',
					href: '#',
					icon: IconMenu
				},
				{
					title: 'OTP',
					label: '',
					href: '#',
					icon: IconMenu
				}
			]
		},
		{
			title: 'Users',
			label: '',
			href: '#',
			icon: IconMenu
		},
		{
			title: 'Requests',
			label: '10',
			href: '#',
			icon: IconMenu,
			sub: [
				{
					title: 'Trucks',
					label: '9',
					href: '#',
					icon: IconMenu
				},
				{
					title: 'Cargos',
					label: '',
					href: '#',
					icon: IconMenu
				}
			]
		},
		{
			title: 'Analysis',
			label: '',
			href: '#',
			icon: IconMenu
		},
		{
			title: 'Extra Components',
			label: '',
			href: '#',
			icon: IconMenu
		},
		{
			title: 'Error Pages',
			label: '',
			href: '#',
			icon: IconMenu,
			sub: [
				{
					title: 'Not Found',
					label: '',
					href: route('/error-pages/not-found'),
					icon: IconMenu
				},
				{
					title: 'Internal Server Error',
					label: '',
					href: route('/error-pages/internal-error'),
					icon: IconMenu
				},
				{
					title: 'Maintenance Error',
					label: '',
					href: route('/error-pages/maintenance'),
					icon: IconMenu
				},
				{
					title: 'Unauthorised Error',
					label: '',
					href: route('/error-pages/unauthorised'),
					icon: IconMenu
				}
			]
		},
		{
			title: 'Settings',
			label: '',
			href: route('/settings'),
			icon: IconMenu
		}
	];
</script>

<Motion let:motion={sidebarMotion} layout>
	<aside
		class={cn(
			`fixed left-0 right-0 top-0 z-50 w-full border-r-2 border-r-muted transition-[width] md:bottom-0 md:right-auto md:h-svh ${$isCollapsed ? 'md:w-14' : 'md:w-64'}`,
			$$props.class
		)}
		use:sidebarMotion
	>
		<!-- Overlay in Mobile -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			on:click={() => ($navOpened = false)}
			class={`absolute inset-0 transition-[opacity] delay-100 duration-700 ${$navOpened ? 'h-svh opacity-50' : 'h-0 opacity-0'} w-full bg-black md:hidden`}
		/>

		<Layout fixed class={$navOpened ? 'h-svh' : ''}>
			<LayoutHeader sticky class="z-50 flex justify-between px-4 py-3 shadow-sm md:px-4">
				<div class={`flex items-center ${!$isCollapsed ? 'gap-2' : ''}`}>
					<div class={`transition-all ${$isCollapsed ? 'h-6 w-6' : 'h-8 w-8'}`}>SA</div>
					<div
						class={`flex flex-col justify-end truncate ${$isCollapsed ? 'invisible w-0' : 'visible w-auto'}`}
					>
						<span class="font-medium">Shadcn Admin</span>
						<span class="text-xs">Vite + ShadcnUI</span>
					</div>
				</div>

				<!-- Toggle button in mobile -->
				<Button
					variant="ghost"
					size="icon"
					class="md:hidden"
					aria-label="Toggle Navigation"
					aria-controls="sidebar-menu"
					aria-expanded={$navOpened}
					on:click={() => ($navOpened = !$navOpened)}
				>
					{#if $navOpened}
						<IconMenu />
					{:else}
						<IconX />
					{/if}
				</Button>
			</LayoutHeader>

			<!-- Navigation Links -->

			<Nav
				id="sidebar-menu"
				class={`z-40 h-full flex-1 overflow-auto ${$navOpened ? 'max-h-screen' : 'max-h-0 py-0 md:max-h-screen md:py-2'}`}
				closeNav={() => ($navOpened = false)}
				bind:isCollapsed={$isCollapsed}
				links={sidelinks}
			/>

			<!-- Scrollbar width toggle button -->
			<Button
				on:click={() => ($isCollapsed = !$isCollapsed)}
				size="icon"
				variant="outline"
				class="absolute -right-5 top-1/2 z-50 hidden rounded-full md:inline-flex"
			>
				<IconChevronsLeft stroke={1.5} class={`h-5 w-5 ${$isCollapsed ? 'rotate-180' : ''}`} />
			</Button>
		</Layout>
	</aside>
</Motion>

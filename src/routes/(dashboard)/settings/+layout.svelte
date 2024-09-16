<script>
	import Separator from '@shadcn-ui/separator/separator.svelte';
	import IconMenu from '@icons/IconMenu.svelte';
	import Search from '@molecules/Search.svelte';
	import SidebarNav from './@components/SidebarNav.svelte';
	import ThemeSwitch from '@molecules/ThemeSwitch.svelte';
	import Layout from '@organism/layout/Layout.svelte';
	import LayoutBody from '@organism/layout/LayoutBody.svelte';
	import LayoutHeader from '@organism/layout/LayoutHeader.svelte';
	import UserNav from '../@components/UserNav.svelte';

	const sidebarNavItems = [
		{
			title: 'Profile',
			icon: IconMenu,
			href: '/settings'
		},
		{
			title: 'Account',
			icon: IconMenu,
			href: '/settings/account'
		},
		{
			title: 'Appearance',
			icon: IconMenu,
			href: '/settings/appearance'
		},
		{
			title: 'Notifications',
			icon: IconMenu,
			href: '/settings/notifications'
		},
		{
			title: 'Display',
			icon: IconMenu,
			href: '/settings/display'
		},
		{
			title: 'Error Example',
			icon: IconMenu,
			href: '/settings/error-example'
		}
	];
</script>

<Layout fixed>
	<!-- TOP HEADING -->
	<LayoutHeader>
		<Search />
		<div class="ml-auto flex items-center space-x-4">
			<ThemeSwitch />
			<UserNav />
		</div>
	</LayoutHeader>

	<LayoutBody class="flex flex-col">
		<div class="space-y-0.5">
			<h1 class="text-2xl font-bold tracking-tight md:text-3xl">Settings</h1>
			<p class="text-muted-foreground">Manage your account settings and set e-mail preferences.</p>
		</div>
		<Separator class="my-4 lg:my-6" />
		<div
			class="flex flex-1 flex-col space-y-8 md:space-y-2 md:overflow-hidden lg:flex-row lg:space-x-12 lg:space-y-0"
		>
			<aside class="top-0 lg:sticky lg:w-1/5">
				<SidebarNav items={sidebarNavItems} />
			</aside>
			<div class="flex w-full p-1 pr-4 md:overflow-y-hidden">
				<slot />
			</div>
		</div>
	</LayoutBody>
</Layout>

<script>
	import ThemeSwitch from '@molecules/ThemeSwitch.svelte';

	import Layout from '@organism/layout/Layout.svelte';
	import LayoutBody from '@organism/layout/LayoutBody.svelte';
	import UserNav from '../@components/UserNav.svelte';
	import LayoutHeader from '@organism/layout/LayoutHeader.svelte';
	import Search from '@molecules/Search.svelte';
</script>

<Layout>
	<!-- ===== Top Heading ===== -->
	<LayoutHeader sticky>
		<Search />
		<div class="ml-auto flex items-center space-x-4">
			<ThemeSwitch />
			<UserNav />
		</div>
	</LayoutHeader>

	<LayoutBody>
		<slot />
	</LayoutBody>
</Layout>

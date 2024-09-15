<script context="module">
	export const isCollapsed = writable(false);
</script>

<script>
	import { cn } from '@/utils';
	import Sidebar from '@organism/app-shell/Sidebar.svelte';

	import { writable } from 'svelte/store';
</script>

<div class="relative h-full overflow-hidden bg-background">
	<Sidebar />
	<main
		id="content"
		class={cn(
			'overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0',
			$isCollapsed ? 'md:ml-14' : 'md:ml-64',
			'h-full'
		)}
	>
		<slot />
	</main>
</div>

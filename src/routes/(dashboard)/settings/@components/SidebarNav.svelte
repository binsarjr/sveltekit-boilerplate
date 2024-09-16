<script lang="ts">
	import { page } from '$app/stores';
	import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shadcn-ui/select';
	import { Button } from '@shadcn-ui/button';
	import { cn } from '$lib/utils';
	import { goto } from '$app/navigation';
	import type { Selected } from 'bits-ui';

	interface SidebarNavItem {
		href: string;
		title: string;
		icon: any; // Ganti dengan tipe yang sesuai untuk ikon Anda
	}

	export let items: SidebarNavItem[] = [];

	let selectedValue: Selected<string> = {
		value: $page.url.pathname,
		label: $page.url.pathname
	};

	function handleSelect(event: CustomEvent<string>) {
		const selected = event.detail;
		selectedValue = {
			value: selected,
			label: selected
		};
		// Navigasi ke rute yang dipilih
		goto(selected);
	}
</script>

<div class="p-1 md:hidden">
	<Select selected={selectedValue} on:change={handleSelect}>
		<SelectTrigger class="h-12 sm:w-48">
			<SelectValue placeholder="Theme" />
		</SelectTrigger>
		<SelectContent>
			{#each items as item (item.href)}
				<SelectItem value={item.href}>
					<div class="flex gap-x-4 px-2 py-1">
						<span class="scale-125">
							<svelte:component this={item.icon} class="text-[18px]" />
						</span>
						<span class="text-md">{item.title}</span>
					</div>
				</SelectItem>
			{/each}
		</SelectContent>
	</Select>
</div>

<div class="hidden w-full overflow-x-auto bg-background px-1 py-2 md:block">
	<nav class={cn('flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1', $$props.class)}>
		{#each items as item (item.href)}
			<a
				href={item.href}
				class={cn(
					'inline-flex h-10 items-center justify-start whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
					$page.url.pathname === item.href
						? 'bg-muted hover:bg-muted'
						: 'hover:bg-transparent hover:underline',
					'justify-start'
				)}
			>
				<span class="mr-2">
					<svelte:component this={item.icon} class="text-[18px]" />
				</span>
				{item.title}
			</a>
		{/each}
	</nav>
</div>

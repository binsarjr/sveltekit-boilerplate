<script lang="ts">
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuTrigger
	} from '@/components/ui/dropdown-menu';
	import { Button } from '@atoms/button';
	import IconMenu from '@icons/IconMenu.svelte';
	import IconChevronDown from '@icons/IconChevronDown.svelte';
	import { cn } from '@/utils';

	interface Link {
		title: string;
		href: string;
		isActive: boolean;
	}

	export let links: Link[] = [];
</script>

<div class="md:hidden">
	<DropdownMenu>
		<DropdownMenuTrigger let:builder>
			<Button size="icon" variant="outline" builders={[builder]}>
				<IconMenu />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent side="bottom" align="start">
			{#each links as { title, href, isActive }}
				<DropdownMenuItem>
					<a {href} class={!isActive ? 'text-muted-foreground' : ''}>
						{title}
					</a>
				</DropdownMenuItem>
			{/each}
		</DropdownMenuContent>
	</DropdownMenu>
</div>

<nav
	{...$$restProps}
	class={cn('hidden items-center space-x-4 md:flex lg:space-x-6', $$props.class)}
>
	{#each links as { title, href, isActive }}
		<a
			{href}
			class={`text-sm font-medium transition-colors hover:text-primary ${
				isActive ? '' : 'text-muted-foreground'
			}`}
		>
			{title}
		</a>
	{/each}
</nav>

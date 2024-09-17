<script lang="ts" generics="Data">
	import TableHead from '@shadcn-ui/table/table-head.svelte';

	import type { DefaultPlugin } from './DataTable.svelte';

	import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from 'lucide-svelte';
	import { Button } from '@atoms/button';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuSeparator,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu';
	import { cn } from '$lib/utils';
	import type { HeaderCell } from 'svelte-headless-table';
	import type {
		SortByColumnOptions,
		SortByPropSet,
		SortByState,
		TablePlugin
	} from 'svelte-headless-table/plugins';
	import { Subscribe } from 'svelte-headless-table';

	export let cell: HeaderCell<Data, DefaultPlugin>;

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<Subscribe attrs={cell.attrs()} props={cell.props()} let:attrs let:props>
	<TableHead {...attrs} motionLayoutId={'thead' + cell.id}>
		{#if cell.isGroup() || props.sort.disabled}
			<div class={cn(className)} {...attrs}>{cell.label}</div>
		{:else}
			<div class={cn('flex items-center space-x-2', className)} {...attrs}>
				<Button
					variant="ghost"
					size="sm"
					class="-ml-3 h-8 data-[state=open]:bg-accent"
					on:click={props.sort.toggle}
				>
					<span>{cell.label}</span>
					{#if props.sort.order === 'desc'}
						<ArrowDown class="ml-2 h-4 w-4" />
					{:else if props.sort.order == 'asc'}
						<ArrowUp class="ml-2 h-4 w-4" />
					{:else}
						<ChevronsUpDown class="ml-2 h-4 w-4" />
					{/if}
				</Button>
			</div>
		{/if}
	</TableHead>
</Subscribe>

<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import Button from '$lib/components/ui/button/button.svelte';
	import DataTableViewOptions from './DataTableViewOptions.svelte';
	import DataTableFilter from './DataTableFilter.svelte';
	import { getTableContext, getTableOptionsContext } from './DataTable.svelte';
	import IconX from '@icons/IconX.svelte';

	const table = getTableContext();
	const { flatColumns } = table;

	const tableOptions = getTableOptionsContext();

	let selectedFilterActions: Set<string>[] = [];
	for (let i = 0; i < tableOptions.filterActions.length; i++) {
		selectedFilterActions.push(new Set());
	}

	$: isFiltered = selectedFilterActions.some((selected) => selected.size > 0);

	const resetFilters = () => {
		selectedFilterActions.forEach((selected) => selected.clear());
		selectedFilterActions = selectedFilterActions;
	};
</script>

<div class="flex items-center justify-between">
	<div
		class="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2"
	>
		<Input placeholder="Filter tasks..." class="h-8 w-[150px] lg:w-[250px]" />
		<div class="flex gap-x-2">
			{#each tableOptions.filterActions as { label, options }, i}
				<DataTableFilter title={label} {options} bind:selectedValues={selectedFilterActions[i]} />
			{/each}
		</div>
		{#if isFiltered}
			<Button variant="ghost" class="h-8 px-2 lg:px-3" on:click={resetFilters}>
				Reset
				<IconX class="ml-2 h-4 w-4" />
			</Button>
		{/if}
	</div>
	<DataTableViewOptions />
</div>

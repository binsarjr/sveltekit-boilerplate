<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import Button from '$lib/components/ui/button/button.svelte';
	import DataTableViewOptions from './DataTableViewOptions.svelte';
	import DataTableFilter from './DataTableFilter.svelte';
	import { getTableContext, getTableOptionsContext } from './DataTable.svelte';
	import { IconX } from '@tabler/icons-svelte';

	const table = getTableContext();
	const { flatColumns, pluginStates } = table;

	const { filterValue, selectedValues } = pluginStates.filter;

	const tableOptions = getTableOptionsContext();

	$: isFiltered =
		Object.values($selectedValues).some((selected) => (selected?.size || 0) > 0) ||
		$filterValue.length > 0;

	const resetFilters = () => {
		Object.keys($selectedValues).forEach((key) => {
			if ($selectedValues[key]) {
				$selectedValues[key].clear();
			}
		});
		$selectedValues = { ...$selectedValues };
		$filterValue = '';
	};
</script>

<div class="flex items-center justify-between">
	<div
		class="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2"
	>
		<Input
			placeholder="Filter tasks..."
			class="h-8 w-[150px] lg:w-[250px]"
			bind:value={$filterValue}
		/>
		<div class="flex gap-x-2">
			{#each tableOptions.filterActions as { label, options, accessor }, i}
				<DataTableFilter title={label} {options} bind:selectedValues={$selectedValues[accessor]} />
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

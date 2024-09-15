<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import Button from '$lib/components/ui/button/button.svelte';
	import DataTableViewOptions from './DataTableViewOptions.svelte';
	import DataTableFilter from './DataTableFilter.svelte';
</script>

<div class="flex items-center justify-between">
	<div
		class="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2"
	>
		<Input placeholder="Filter tasks..." class="h-8 w-[150px] lg:w-[250px]" />
		<div class="flex gap-x-2">
			<DataTableFilter
				title="Status"
				options={[
					{ value: 'open', label: 'Open' },
					{ value: 'closed', label: 'Closed' },
					{ value: 'all', label: 'All' }
				]}
			/>
			<!-- {#if table.getColumn('status')}
        <DataTableFacetedFilter
          column={table.getColumn('status')}
          title="Status"
          options={statuses}
        />
      {/if}
      {#if table.getColumn('priority')}
        <DataTableFacetedFilter
          column={table.getColumn('priority')}
          title="Priority"
          options={priorities}
        />
      {/if} -->
		</div>
		<!-- {#if isFiltered}
      <Button
        variant="ghost"
        on:click={() => table.resetColumnFilters()}
        class="h-8 px-2 lg:px-3"
      >
        Reset
        <IconCross2 class="ml-2 h-4 w-4" />
      </Button>
    {/if} -->
	</div>
	<DataTableViewOptions />
</div>

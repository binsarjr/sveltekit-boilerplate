<script lang="ts">
	import {
		DropdownMenu,
		DropdownMenuTrigger,
		DropdownMenuContent,
		DropdownMenuLabel,
		DropdownMenuSeparator,
		DropdownMenuCheckboxItem
	} from '$lib/components/ui/dropdown-menu';
	import Button from '$lib/components/ui/button/button.svelte';
	import IconMixerHorizontal from '$lib/components/icons/IconMixerHorizontal.svelte';
	import { getPluginStateContext, getTableContext } from './DataTable.svelte';

	const table = getTableContext();
	const { flatColumns, pluginStates } = table;
	const { hiddenColumnIds } = pluginStates.hide;

	const ids = flatColumns.map((c) => c.id);
	let showForId = Object.fromEntries(ids.map((id) => [id, true]));
	$: $hiddenColumnIds = Object.entries(showForId)
		.filter(([, show]) => !show)
		.map(([id]) => id);
</script>

<DropdownMenu>
	<DropdownMenuTrigger>
		<Button variant="outline" size="sm" class="ml-auto hidden h-8 lg:flex">
			<IconMixerHorizontal />
			View
		</Button>
	</DropdownMenuTrigger>
	<DropdownMenuContent align="end" class="w-[150px]">
		<DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
		<DropdownMenuSeparator />
		{#each ids as id}
			<DropdownMenuCheckboxItem class="capitalize" bind:checked={showForId[id]}>
				{id}
			</DropdownMenuCheckboxItem>
		{/each}
	</DropdownMenuContent>
</DropdownMenu>

<script context="module" lang="ts">
	import { addHiddenColumns, addSortBy } from 'svelte-headless-table/plugins';

	let defaultPlugin = {
		sort: addSortBy<any>({}),
		hide: addHiddenColumns<any>()
	};
	export type DefaultPlugin = typeof defaultPlugin;

	import type { DataBodyCell, RenderConfig, TableState } from 'svelte-headless-table';

	type CustomCell<Data> = DataBodyCell<Data, DefaultPlugin> & {
		row: {
			original: Data;
		};
	};
	type DatatableColumn<Data> = Omit<DataColumnInit<Data, DefaultPlugin>, 'cell'> & {
		cell?: (cell: CustomCell<Data>, state: TableState<Data, DefaultPlugin>) => RenderConfig;
	};

	export type DatatableColumnDefinition<Data> = (
		| DatatableColumn<Data>
		| (Omit<DatatableColumn<Data>, 'height' | 'accessor'> & {
				columns: DatatableColumn<Data>[];
		  })
	)[];

	interface TableOptions {
		filterActions: {
			label: string;
			options: Array<{
				value: string;
				label: string;
				icon?: ConstructorOfATypedSvelteComponent;
			}>;
		}[];

		multiSort: boolean;
		serverSide: boolean;
	}

	export const setTableContext = (table: TableViewModel<any, DefaultPlugin>) =>
		setContext('__table_provider__', table);

	export const getTableContext = () =>
		getContext<TableViewModel<any, DefaultPlugin>>('__table_provider__');

	export const setTableOptionsContext = (options: TableOptions) => {
		setContext('__table_options_provider__', options);
	};
	export const getTableOptionsContext = () => {
		return getContext<TableOptions>('__table_options_provider__');
	};
</script>

<script lang="ts" generics="Data">
	import { createEventDispatcher, getContext, setContext } from 'svelte';

	import DataTableHeadCell from './DataTableHeadCell.svelte';

	import { type Writable } from 'svelte/store';

	import TableCell from '@atoms/table/table-cell.svelte';

	import Table from '@atoms/table/table.svelte';

	import TableBody from '@atoms/table/table-body.svelte';
	import TableHeader from '@atoms/table/table-header.svelte';
	import TableRow from '@atoms/table/table-row.svelte';
	import {
		createTable,
		Render,
		Subscribe,
		type DataColumnInit,
		type TableViewModel
	} from 'svelte-headless-table';
	import DataTableToolbar from './DataTableToolbar.svelte';

	export let data: Writable<Data[]>;
	export let columns: DatatableColumnDefinition<Data>;
	export let multiSort: TableOptions['multiSort'] = false;
	export let serverSide: TableOptions['serverSide'] = false;
	export let filterActions: TableOptions['filterActions'] = [];

	setTableOptionsContext({ filterActions, multiSort, serverSide });

	{
		// inject state plugin
		defaultPlugin = {
			sort: addSortBy<Data>({
				isMultiSortEvent: (event) => multiSort,
				disableMultiSort: !multiSort,
				serverSide
			}),
			hide: addHiddenColumns<Data>()
		};
	}

	const table = createTable(data, defaultPlugin);

	const prepareColumns = columns.map((cell) => {
		if ('columns' in cell) {
			return table.group({
				...cell,
				columns: cell.columns.map((column) => table.column(column as any))
			});
		}
		return table.column(cell as any);
	});

	const columnModelViews = table.createColumns(prepareColumns);

	const modelView = table.createViewModel(columnModelViews);
	setTableContext(modelView);

	const { headerRows, pluginStates, rows, tableAttrs, tableBodyAttrs, tableHeadAttrs } = modelView;

	const dispatch = createEventDispatcher();

	const { sortKeys } = pluginStates.sort;
	$: if ($sortKeys) {
		dispatch('sorting', $sortKeys);
	}
</script>

<div class="space-y-4">
	<DataTableToolbar />
	<div class="rounded-md border">
		<Table {...$tableAttrs}>
			<TableHeader {...$tableHeadAttrs}>
				{#each $headerRows as headerRow (headerRow.id)}
					<Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
						<TableRow {...rowAttrs}>
							{#each headerRow.cells as cell (cell.id)}
								<DataTableHeadCell {cell} />
							{/each}
						</TableRow>
					</Subscribe>
				{/each}
			</TableHeader>
			<TableBody {...$tableBodyAttrs}>
				{#each $rows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<TableRow {...rowAttrs}>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<TableCell {...attrs}>
										<Render of={cell.render()} />
									</TableCell>
								</Subscribe>
							{/each}
						</TableRow>
					</Subscribe>
				{/each}
			</TableBody>
		</Table>
	</div>
</div>

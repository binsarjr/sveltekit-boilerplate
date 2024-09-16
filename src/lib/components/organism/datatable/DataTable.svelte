<script context="module" lang="ts">
	import {
		addDatatableFilter,
		type DatatableFilterFnProps,
		type DatatableFilterStateSelectedValues
	} from './plugins/addDatatableFilter';

	import {
		addHiddenColumns,
		addSortBy,
		addTableFilter,
		type SortByColumnOptions,
		type HiddenColumnsConfig,
		type TableFilterColumnOptions
	} from 'svelte-headless-table/plugins';

	let defaultPlugin = {
		sort: addSortBy<any>({}),
		hide: addHiddenColumns<any>(),
		filter: addDatatableFilter<any>()
	} as const;
	export type DefaultPlugin = typeof defaultPlugin;

	import type { DataBodyCell, RenderConfig, TableState } from 'svelte-headless-table';

	type CustomCell<Data> = DataBodyCell<Data, DefaultPlugin> & {
		row: {
			original: Data;
		};
	};
	type DatatableColumn<Data> = Omit<DataColumnInit<Data, DefaultPlugin>, 'cell'> & {
		cell?: (cell: CustomCell<Data>, state: TableState<Data, DefaultPlugin>) => RenderConfig;
		plugins?: Partial<{
			sort: SortByColumnOptions;
			filter: TableFilterColumnOptions<Data>;
		}>;
	};

	export type DatatableColumnDefinition<Data> = (
		| DatatableColumn<Data>
		| (Omit<DatatableColumn<Data>, 'height' | 'accessor'> & {
				columns: DatatableColumn<Data>[];
		  })
	)[];

	interface TableOptions<Data> {
		filterActions: {
			label: string;
			accessor: keyof Data & string;
			options: Array<{
				value: string;
				label: string;
				icon?: ConstructorOfATypedSvelteComponent;
			}>;
		}[];
		onFilter?: (options: {
			value: string;
			filterValue: string;
			selectedValues: DatatableFilterStateSelectedValues<Data>;
		}) => boolean;

		multiSort: boolean;
		serverSide: boolean;
	}

	export const setTableContext = (table: TableViewModel<any, DefaultPlugin>) =>
		setContext('__table_provider__', table);

	export const getTableContext = () =>
		getContext<TableViewModel<any, DefaultPlugin>>('__table_provider__');

	export const setTableOptionsContext = (options: TableOptions<any>) => {
		setContext('__table_options_provider__', options);
	};
	export const getTableOptionsContext = () => {
		return getContext<TableOptions<any>>('__table_options_provider__');
	};
</script>

<script lang="ts" generics="Data">
	import { cn } from '@/utils';

	import { createEventDispatcher, getContext, onMount, setContext } from 'svelte';

	import DataTableHeadCell from './DataTableHeadCell.svelte';

	import { type Writable } from 'svelte/store';

	import TableCell from '@shadcn-ui/table/table-cell.svelte';

	import Table from '@shadcn-ui/table/table.svelte';

	import TableBody from '@shadcn-ui/table/table-body.svelte';
	import TableHeader from '@shadcn-ui/table/table-header.svelte';
	import TableRow from '@shadcn-ui/table/table-row.svelte';
	import {
		createTable,
		Render,
		Subscribe,
		type DataColumnInit,
		type TableViewModel
	} from 'svelte-headless-table';
	import DataTableToolbar from './DataTableToolbar.svelte';
	import { AnimateSharedLayout, Motion } from 'svelte-motion';

	export let data: Writable<Data[]>;
	export let columns: DatatableColumnDefinition<Data>;
	export let multiSort: TableOptions<Data>['multiSort'] = false;
	export let serverSide: TableOptions<Data>['serverSide'] = false;
	export let filterActions: TableOptions<Data>['filterActions'] = [];
	export let onFilter:
		| ((options: {
				value: string;
				filterValue: string;
				selectedValues: DatatableFilterStateSelectedValues<Data>;
		  }) => boolean)
		| undefined = undefined;

	setTableOptionsContext({ filterActions, multiSort, serverSide });

	{
		// inject state plugin
		defaultPlugin = {
			sort: addSortBy<Data>({
				isMultiSortEvent: (event) => multiSort,
				disableMultiSort: !multiSort,
				serverSide
			}),
			hide: addHiddenColumns<Data>(),
			filter: addDatatableFilter<Data>({
				serverSide,
				fn: onFilter
					? ({ filterValue, value, selectedValues }: DatatableFilterFnProps<Data>) => {
							return onFilter?.({ filterValue, value, selectedValues }) || true;
						}
					: undefined
			})
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
			<TableBody {...$tableBodyAttrs} motionLayoutId="tbody">
				{#each $rows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Motion let:motion={rowMotion} layout layoutId={row.id}>
							<tr
								{...rowAttrs}
								use:rowMotion
								class={cn(
									'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'
								)}
							>
								{#each row.cells as cell (cell.id)}
									<Motion
										let:motion={cellMotion}
										layout
										layoutId={'row-' + row.id + '-cell-' + cell.id}
									>
										<Subscribe attrs={cell.attrs()} let:attrs>
											<td
												use:cellMotion
												class={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0')}
												{...attrs}
											>
												<Render of={cell.render()} />
											</td>
										</Subscribe>
									</Motion>
								{/each}
							</tr>
						</Motion>
					</Subscribe>
				{/each}
			</TableBody>
		</Table>
	</div>
</div>

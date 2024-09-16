import type { BodyRow } from 'svelte-headless-table';
import {} from 'svelte-headless-table';
import {
	matchFilter,
	textPrefixFilter,
	type DeriveRowsFn,
	type NewTablePropSet,
	type TablePlugin
} from 'svelte-headless-table/plugins';
import { derived, writable, type Writable } from 'svelte/store';

export interface DatatableFilterConfig {
	fn?: DatatableFilterFn<any>;
	initialFilterValue?: string;
	includeHiddenColumns?: boolean;
	serverSide?: boolean;
}

export type DatatableFilterStateSelectedValues<Item> = Partial<{
	[key in keyof Item]: Set<string>;
}>;

export interface DatatableFilterState<Item> {
	filterValue: Writable<string>;
	selectedValues: Writable<DatatableFilterStateSelectedValues<Item>>;
}

export interface DatatableFilterColumnOptions<Item> {
	exclude?: boolean;
	getFilterValue?: (value: any) => string;
}

export type DatatableFilterFn<Item> = (props: DatatableFilterFnProps<Item>) => boolean;

export type DatatableFilterFnProps<Item> = {
	filterValue: string;
	value: string;
	selectedValues: DatatableFilterStateSelectedValues<Item>;
};

export type DatatableFilterPropSet = NewTablePropSet<{
	'tbody.tr.td': {
		matches: boolean;
	};
}>;

interface GetFilteredRowsOptions {
	fn: DatatableFilterFn<any>;
	includeHiddenColumns: boolean;
}

const getFilteredRows = <Item, Row extends BodyRow<Item>>(
	rows: Row[],
	filterValue: string,
	selectedValues: DatatableFilterStateSelectedValues<Item>,
	columnOptions: Record<string, DatatableFilterColumnOptions<Item>>,
	{ fn, includeHiddenColumns }: GetFilteredRowsOptions
): Row[] => {
	const $filteredRows = rows
		.map((row) => {
			const { subRows } = row;
			if (subRows === undefined) {
				return row;
			}
			const filteredSubRows = getFilteredRows(subRows, filterValue, selectedValues, columnOptions, {
				fn,
				includeHiddenColumns
			});
			const clonedRow = row.clone() as Row;
			clonedRow.subRows = filteredSubRows;
			return clonedRow;
		})
		.filter((row) => {
			if ((row.subRows?.length ?? 0) !== 0) {
				return true;
			}
			const rowCellMatches = Object.values(row.cellForId).map((cell) => {
				const options = columnOptions[cell.id] as DatatableFilterColumnOptions<Item> | undefined;
				if (options?.exclude === true) {
					return false;
				}
				const isHidden = row.cells.find((c) => c.id === cell.id) === undefined;
				if (isHidden && !includeHiddenColumns) {
					return false;
				}
				if (!cell.isData()) {
					return false;
				}
				let value = cell.value;
				if (options?.getFilterValue !== undefined) {
					value = options?.getFilterValue(value);
				}
				const matches = fn({ value: String(value), filterValue, selectedValues });
				const selectedValuesMatch = Object.entries(selectedValues).every(([key, selected]) => {
					if (!selected || (selected as Set<string>)?.size === 0) return true;
					return Array.from(selected as Set<string>).some((selectedValue) => {
						return matchFilter({
							filterValue: selectedValue,
							value: String(value)
						});
					});
				});

				return matches && selectedValuesMatch;
			});
			return rowCellMatches.includes(true);
		});
	return $filteredRows;
};

export const addDatatableFilter =
	<Item>({
		fn = textPrefixFilter,
		initialFilterValue = '',
		includeHiddenColumns = false,
		serverSide = false
	}: DatatableFilterConfig = {}): TablePlugin<
		Item,
		DatatableFilterState<Item>,
		DatatableFilterColumnOptions<Item>,
		DatatableFilterPropSet
	> =>
	({ columnOptions }) => {
		const filterValue = writable(initialFilterValue);
		const selectedValues = writable<DatatableFilterStateSelectedValues<Item>>({});

		const pluginState: DatatableFilterState<Item> = { filterValue, selectedValues };

		const deriveRows: DeriveRowsFn<Item> = (rows) => {
			return derived(
				[rows, filterValue, selectedValues],
				([$rows, $filterValue, $selectedValues]) => {
					const $filteredRows = getFilteredRows(
						$rows,
						$filterValue,
						$selectedValues,
						columnOptions,
						{
							fn,
							includeHiddenColumns
						}
					);
					if (serverSide) return $rows;

					return $filteredRows;
				}
			);
		};

		return {
			pluginState,
			deriveRows
		};
	};

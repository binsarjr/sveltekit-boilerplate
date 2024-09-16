import type { BodyRow } from 'svelte-headless-table';
import {} from 'svelte-headless-table';
import {
	textPrefixFilter,
	type DeriveRowsFn,
	type NewTablePropSet,
	type TablePlugin
} from 'svelte-headless-table/plugins';
import { derived, writable, type Writable } from 'svelte/store';

export interface DatatableFilterConfig {
	fn?: DatatableFilterFn;
	initialFilterValue?: string;
	includeHiddenColumns?: boolean;
	serverSide?: boolean;
}

export interface DatatableFilterState<Item> {
	filterValue: Writable<string>;
}

export interface DatatableFilterColumnOptions<Item> {
	exclude?: boolean;
	getFilterValue?: (value: any) => string;
}

export type DatatableFilterFn = (props: DatatableFilterFnProps) => boolean;

export type DatatableFilterFnProps = {
	filterValue: string;
	value: string;
};

export type DatatableFilterPropSet = NewTablePropSet<{
	'tbody.tr.td': {
		matches: boolean;
	};
}>;

interface GetFilteredRowsOptions {
	fn: DatatableFilterFn;
	includeHiddenColumns: boolean;
}

const getFilteredRows = <Item, Row extends BodyRow<Item>>(
	rows: Row[],
	filterValue: string,
	columnOptions: Record<string, DatatableFilterColumnOptions<Item>>,
	{ fn, includeHiddenColumns }: GetFilteredRowsOptions
): Row[] => {
	const $filteredRows = rows
		.map((row) => {
			const { subRows } = row;
			if (subRows === undefined) {
				return row;
			}
			const filteredSubRows = getFilteredRows(subRows, filterValue, columnOptions, {
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
				const matches = fn({ value: String(value), filterValue });
				return matches;
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

		const pluginState: DatatableFilterState<Item> = { filterValue };

		const deriveRows: DeriveRowsFn<Item> = (rows) => {
			return derived([rows, filterValue], ([$rows, $filterValue]) => {
				const $filteredRows = getFilteredRows($rows, $filterValue, columnOptions, {
					fn,
					includeHiddenColumns
				});
				if (serverSide) return $rows;

				return $filteredRows;
			});
		};

		return {
			pluginState,
			deriveRows
		};
	};

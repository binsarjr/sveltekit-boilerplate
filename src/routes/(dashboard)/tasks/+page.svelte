<script lang="ts">
	import Search from '@molecules/Search.svelte';
	import ThemeSwitch from '@molecules/ThemeSwitch.svelte';
	import Layout from '@organism/layout/Layout.svelte';
	import LayoutHeader from '@organism/layout/LayoutHeader.svelte';
	import UserNav from '../@components/UserNav.svelte';
	import LayoutBody from '@organism/layout/LayoutBody.svelte';
	import DataTable, { type DatatableColumnDefinition } from '@organism/table/DataTable.svelte';
	import { addSortBy } from 'svelte-headless-table/plugins';
	import { writable } from 'svelte/store';

	type Task = {
		id: string;
		title: string;
		status: string;
		label: string;
		priority: string;
	};
	let data = writable<Task[]>([
		{
			id: 'TASK-8782',
			title: "You can't compress the program without quantifying the open-source SSD pixel!",
			status: 'in progress',
			label: 'documentation',
			priority: 'medium'
		},
		{
			id: 'TASK-7878',
			title: 'Try to calculate the EXE feed, maybe it will index the multi-byte pixel!',
			status: 'backlog',
			label: 'documentation',
			priority: 'medium'
		}
	]);

	const headers: DatatableColumnDefinition<Task> = [
		{
			header: 'GROUP',
			columns: [
				{
					header: 'ID',
					accessor: 'id'
				}
			]
		},
		{
			header: 'Title',
			accessor: 'title'
		},
		{
			header: 'Priority',
			accessor: 'priority'
		}
	];

	const onSorting = (sortKeys: { id: string; order: 'asc' | 'desc' }[]) => {
		// Urutkan data berdasarkan multiple keys
		$data = $data.sort((a, b) => {
			for (const sortKey of sortKeys) {
				// @ts-ignore
				const valueA = String(a[sortKey.id]).toLowerCase();
				// @ts-ignore
				const valueB = String(b[sortKey.id]).toLowerCase();

				const comparison =
					sortKey.order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);

				if (comparison !== 0) {
					return comparison;
				}
			}
			return 0;
		});
	};
</script>

<Layout>
	<!-- ===== Top Heading ===== -->
	<LayoutHeader sticky>
		<Search />
		<div class="ml-auto flex items-center space-x-4">
			<ThemeSwitch />
			<UserNav />
		</div>
	</LayoutHeader>

	<LayoutBody>
		<div class="mb-2 flex items-center justify-between space-y-2">
			<div>
				<h2 class="text-2xl font-bold tracking-tight">Selamat datang kembali!</h2>
				<p class="text-muted-foreground">Berikut adalah daftar tugas Anda untuk bulan ini!</p>
			</div>
		</div>
		<div class="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
			<DataTable
				{data}
				columns={headers}
				filterActions={[
					{
						label: 'Status',
						options: [
							{ value: 'open', label: 'Open' },
							{ value: 'closed', label: 'Closed' },
							{ value: 'all', label: 'All' }
						]
					},
					{
						label: 'Priority',
						options: [
							{ value: 'low', label: 'Low' },
							{ value: 'medium', label: 'Medium' },
							{ value: 'high', label: 'High' }
						]
					}
				]}
				serverSide
				onFilter={({ filterValue, value, filterActions }) => {
					console.log(filterValue, value, filterActions);
					return true;
				}}
				on:sorting={(e) => onSorting(e.detail)}
			/>
		</div>
	</LayoutBody>
</Layout>

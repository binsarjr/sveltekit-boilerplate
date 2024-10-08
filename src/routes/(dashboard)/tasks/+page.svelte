<script lang="ts">
	import Search from '@molecules/Search.svelte';
	import ThemeSwitch from '@molecules/ThemeSwitch.svelte';
	import Layout from '@organism/layout/Layout.svelte';
	import LayoutHeader from '@organism/layout/LayoutHeader.svelte';
	import UserNav from '../@components/UserNav.svelte';
	import LayoutBody from '@organism/layout/LayoutBody.svelte';
	import DataTable, { type DatatableColumnDefinition } from '@organism/datatable/DataTable.svelte';
	import { addSortBy } from 'svelte-headless-table/plugins';
	import { writable } from 'svelte/store';

	type Task = {
		id: string;
		title: string;
		status: string;
		label: string;
		priority: string;
	};
	function createSampleTasks(count: number): Task[] {
		const statuses = ['in progress', 'backlog', 'completed', 'canceled'];
		const labels = ['documentation', 'bug', 'feature', 'enhancement'];
		const priorities = ['low', 'medium', 'high', 'critical'];

		return Array.from({ length: count }, (_, index) => ({
			id: `TASK-${Math.floor(1000 + Math.random() * 9000)}`,
			title: `Sample task ${index + 1}: ${Math.random().toString(36).substring(7)}`,
			status: statuses[Math.floor(Math.random() * statuses.length)],
			label: labels[Math.floor(Math.random() * labels.length)],
			priority: priorities[Math.floor(Math.random() * priorities.length)]
		}));
	}

	let data = writable<Task[]>(createSampleTasks(10));

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
			header: 'Status',
			accessor: 'status'
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
						accessor: 'status',
						options: [
							{ value: 'in progress', label: 'In Progress' },
							{ value: 'backlog', label: 'Backlog' },
							{ value: 'completed', label: 'Completed' },
							{ value: 'canceled', label: 'Canceled' }
						]
					},
					{
						label: 'Priority',
						accessor: 'priority',
						options: [
							{ value: 'low', label: 'Low' },
							{ value: 'medium', label: 'Medium' },
							{ value: 'high', label: 'High' }
						]
					}
				]}
				on:sorting={(e) => onSorting(e.detail)}
			/>
		</div>
	</LayoutBody>
</Layout>

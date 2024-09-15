<script>
	import { page } from '$app/stores';
	import GeneralError from '@templates/ErrorPage/GeneralError.svelte';
</script>

<GeneralError code={$page.status} message={$page.error?.message || 'Terjadi kesalahan'} />

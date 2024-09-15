<script>
	import ThemeProvider, { theme } from '@molecules/ThemeProvider.svelte';
	import '../app.css';
	import { browser } from '$app/environment';
</script>

<ThemeProvider />
<slot></slot>

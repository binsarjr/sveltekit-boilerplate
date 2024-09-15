<script lang="ts" context="module">
	import { writable } from 'svelte/store';
	import { browser } from '$app/environment';

	type Theme = 'dark' | 'light' | 'system';

	const STORAGE_KEY = 'vite-ui-theme';
	const DEFAULT_THEME: Theme = 'system';

	function createThemeStore() {
		const { subscribe, set } = writable<Theme>(
			(browser && (localStorage.getItem(STORAGE_KEY) as Theme)) || DEFAULT_THEME
		);

		return {
			subscribe,
			set,
			setTheme: (newTheme: Theme) => {
				if (browser) {
					localStorage.setItem(STORAGE_KEY, newTheme);
				}
				set(newTheme);
			}
		};
	}

	export const theme = createThemeStore();
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		const updateTheme = (currentTheme: Theme) => {
			const root = document.documentElement;
			root.classList.remove('light', 'dark');

			if (currentTheme === 'system') {
				const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
					? 'dark'
					: 'light';
				root.classList.add(systemTheme);
			} else {
				root.classList.add(currentTheme);
			}
		};

		const unsubscribe = theme.subscribe(updateTheme);

		return () => {
			unsubscribe();
		};
	});
</script>

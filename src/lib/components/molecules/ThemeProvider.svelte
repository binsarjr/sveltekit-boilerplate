<script lang="ts" context="module">
	import { writable } from 'svelte/store';
	import { browser } from '$app/environment';

	type Theme = 'dark' | 'light' | 'system';

	export const STORAGE_KEY = 'vite-ui-theme';
	const DEFAULT_THEME: Theme = 'system';

	function createThemeStore() {
		const { subscribe, set } = writable<Theme>(
			(browser &&
				((document.cookie
					.split('; ')
					.find((row) => row.startsWith(STORAGE_KEY))
					?.split('=')[1] as Theme) ||
					(localStorage.getItem(STORAGE_KEY) as Theme))) ||
				DEFAULT_THEME
		);

		return {
			subscribe,
			set: (newTheme: Theme) => {
				if (browser) {
					localStorage.setItem(STORAGE_KEY, newTheme);
					// Menyimpan tema dalam cookie juga
					const maxAge = 365 * 24 * 60 * 60; // Satu tahun dalam detik
					document.cookie = `${STORAGE_KEY}=${newTheme}; path=/; max-age=${maxAge}; SameSite=Strict`;
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

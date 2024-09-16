<script lang="ts">
	import { Button } from '@shadcn-ui/button';
	import IconMoon from '@icons/IconMoon.svelte';
	import IconSun from '@icons/IconSun.svelte';
	import { onMount } from 'svelte';
	import { theme } from './ThemeProvider.svelte';

	function toggleTheme() {
		$theme = $theme === 'light' ? 'dark' : 'light';
	}

	onMount(() => {
		const updateThemeColor = () => {
			const themeColor = $theme === 'dark' ? '#020817' : '#fff';
			const metaThemeColor = document.querySelector("meta[name='theme-color']");
			if (metaThemeColor) {
				metaThemeColor.setAttribute('content', themeColor);
			}
		};

		updateThemeColor();
		return theme.subscribe(updateThemeColor);
	});
</script>

<Button size="icon" variant="ghost" class="rounded-full" on:click={toggleTheme}>
	{#if $theme === 'light'}
		<IconMoon class="text-[20px]" />
	{:else}
		<IconSun class="text-[20px]" />
	{/if}
</Button>

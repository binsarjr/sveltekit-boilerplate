<script lang="ts">
	import { onMount } from 'svelte';
	import { getLayoutContext } from './Layout.svelte';
	import { browser } from '$app/environment';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '@/utils';

	type $$Props = HTMLAttributes<HTMLDivElement>;

	const layoutContext = getLayoutContext();
	if (!$layoutContext) {
		throw new Error('Layout context not found');
	}
</script>

<section
	data-layout="body"
	{...$$restProps}
	class={cn(
		'px-4 py-6 md:overflow-hidden md:px-8',
		$layoutContext.fixed && 'flex-1',
		$$props.class
	)}
>
	<slot />
</section>

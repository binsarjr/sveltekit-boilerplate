<script lang="ts">
	import { onMount } from 'svelte';
	import { getLayoutContext } from './Layout.svelte';
	import { browser } from '$app/environment';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '@/utils';

	type $$Props = HTMLAttributes<HTMLDivElement> & {
		sticky?: boolean;
	};

	export let sticky = false;

	const layoutContext = getLayoutContext();
	if (!$layoutContext) {
		throw new Error('Layout context not found');
	}
</script>

<section
	data-layout="header"
	class={cn(
		`z-10 flex h-[var(--header-height)] items-center gap-4 bg-background p-4 md:px-8`,
		$layoutContext.offset > 10 && sticky ? 'shadow' : 'shadow-none',
		$layoutContext.fixed && 'flex-none',
		sticky && 'sticky top-0',
		$$props.class
	)}
	{...$$restProps}
>
	<slot />
</section>

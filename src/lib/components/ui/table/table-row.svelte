<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils.js';
	import { Motion } from 'svelte-motion';

	type $$Props = HTMLAttributes<HTMLTableRowElement> & {
		'data-state'?: unknown;
		motionLayoutId?: string;
	};

	let className: $$Props['class'] = undefined;
	export { className as class };
	export let motionLayoutId: $$Props['motionLayoutId'] = undefined;
</script>

<Motion let:motion={trMotion} layout layoutId={motionLayoutId}>
	<tr
		use:trMotion
		class={cn(
			'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
			className
		)}
		{...$$restProps}
		on:click
		on:keydown
	>
		<slot />
	</tr>
</Motion>

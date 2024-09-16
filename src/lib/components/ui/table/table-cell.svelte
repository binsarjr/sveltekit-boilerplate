<script lang="ts">
	import type { HTMLTdAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils.js';
	import { Motion } from 'svelte-motion';

	type $$Props = HTMLTdAttributes & { motionLayoutId?: string };

	let className: $$Props['class'] = undefined;
	export { className as class };
	export let motionLayoutId: $$Props['motionLayoutId'] = undefined;
</script>

<Motion let:motion layout layoutId={motionLayoutId}>
	<td
		use:motion
		class={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
		{...$$restProps}
		on:click
		on:keydown
	>
		<slot />
	</td>
</Motion>

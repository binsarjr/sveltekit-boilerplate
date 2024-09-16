<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils.js';
	import { Motion } from 'svelte-motion';

	type $$Props = HTMLAttributes<HTMLTableSectionElement> & { motionLayoutId?: string };

	let className: $$Props['class'] = undefined;
	export { className as class };
	export let motionLayoutId: $$Props['motionLayoutId'] = undefined;
</script>

<Motion let:motion={tbodyMotion} layout layoutId={motionLayoutId}>
	<tbody use:tbodyMotion class={cn('[&_tr:last-child]:border-0', className)} {...$$restProps}>
		<slot />
	</tbody>
</Motion>

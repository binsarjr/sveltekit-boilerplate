<script lang="ts">
	import type { HTMLThAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils.js';
	import { Motion } from 'svelte-motion';

	type $$Props = HTMLThAttributes & {
		motionLayoutId?: string;
	};

	let className: $$Props['class'] = undefined;
	export { className as class };
	export let motionLayoutId: $$Props['motionLayoutId'] = undefined;
</script>

<Motion let:motion={thMotion} layout layoutId={motionLayoutId}>
	<th
		use:thMotion
		class={cn(
			'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
			className
		)}
		{...$$restProps}
	>
		<slot />
	</th>
</Motion>

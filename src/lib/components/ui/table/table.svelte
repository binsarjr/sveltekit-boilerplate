<script lang="ts">
	import type { HTMLTableAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils.js';
	import { AnimateSharedLayout } from 'svelte-motion';

	type $$Props = HTMLTableAttributes;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<AnimateSharedLayout type="switch">
	<div class="relative w-full overflow-auto">
		<table class={cn('w-full caption-bottom text-sm', className)} {...$$restProps}>
			<slot />
		</table>
	</div>
</AnimateSharedLayout>

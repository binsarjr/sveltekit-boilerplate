<script context="module" lang="ts">
	export const setLayoutContext = (layout: { offset: number; fixed: boolean }) => {
		setContext('__layout_provider__', writable(layout));
	};

	export const getLayoutContext = () => {
		return getContext<Writable<{ offset: number; fixed: boolean }>>('__layout_provider__');
	};
</script>

<script lang="ts">
	import { getContext, onDestroy, onMount, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '@/utils';
	type $$Props = HTMLAttributes<HTMLDivElement> &
		Partial<{
			fixed: boolean;
		}>;

	export let fixed = false;

	let el: HTMLElement;
	setLayoutContext({ offset: 0, fixed });

	const store = getLayoutContext();
	const onScroll = () => {
		$store.offset = el.scrollTop;
	};

	onMount(() => {
		if (!el) return;

		$store = {
			fixed,
			offset: el.scrollTop
		};

		// clean up code
		el.removeEventListener('scroll', onScroll);
		el.addEventListener('scroll', onScroll, { passive: true });
		return () => el.removeEventListener('scroll', onScroll);
	});

	onDestroy(() => {
		if (el) {
			el.removeEventListener('scroll', onScroll);
		}
	});
</script>

<section
	bind:this={el}
	data-layout="layout"
	class={cn('h-full overflow-auto', fixed && 'flex flex-col', $$props.class)}
	{...$$restProps}
>
	<slot />
</section>

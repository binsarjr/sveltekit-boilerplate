<script lang="ts">
	import { builderActions, getAttrs } from 'bits-ui';
	import { buttonVariants, type Events, type Props } from '.';
	import { Motion } from 'svelte-motion';
	import { cn } from '@/utils';

	type $$Props = Props &
		Partial<{
			fullWidth: boolean;
		}>;
	type $$Events = Events;
	export let href: $$Props['href'] = undefined;
	export let type: $$Props['type'] = undefined;
	export let builders: $$Props['builders'] = [];
	export let el: $$Props['el'] = undefined;
	export let fullWidth: $$Props['fullWidth'] = false;

	export let variant: $$Props['variant'] = 'default';
	export let size: $$Props['size'] = 'default';

	let className: $$Props['class'] = undefined;
	export { className as class };

	const attrs = {
		'data-button-root': '',
		class: cn(buttonVariants({ variant, size, className, fullWidth }))
	};
</script>

<Motion let:motion={buttonMotion} layout whileTap={{ scale: 0.97 }}>
	{#if builders && builders.length}
		<!-- svelte-ignore a11y-no-static-element-interactions a11y_no_static_element_interactions -->
		<svelte:element
			this={href ? 'a' : 'button'}
			bind:this={el}
			type={href ? undefined : type}
			{href}
			on:click
			on:change
			on:keydown
			on:keyup
			on:mouseenter
			on:mouseleave
			on:mousedown
			on:pointerdown
			on:mouseup
			on:pointerup
			tabindex="0"
			use:buttonMotion
			use:builderActions={{ builders }}
			{...getAttrs(builders)}
			{...$$restProps}
			{...attrs}
		>
			<slot />
		</svelte:element>
	{:else}
		<!-- svelte-ignore a11y-no-static-element-interactions a11y_no_static_element_interactions -->
		<svelte:element
			this={href ? 'a' : 'button'}
			bind:this={el}
			type={href ? undefined : type}
			{href}
			on:click
			on:change
			on:keydown
			on:keyup
			on:mouseenter
			on:mouseleave
			on:mousedown
			on:pointerdown
			on:mouseup
			on:pointerup
			tabindex="0"
			use:buttonMotion
			{...$$restProps}
			{...attrs}
		>
			<slot />
		</svelte:element>
	{/if}
</Motion>

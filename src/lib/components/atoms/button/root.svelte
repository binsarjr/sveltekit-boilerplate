<script lang="ts">
	import { cn } from '@/utils';
	import { builderActions, getAttrs } from 'bits-ui';
	import { Motion } from 'svelte-motion';
	import { buttonVariants, type Events, type Props } from '.';

	type $$Props = Props;
	type $$Events = Events;
	export let href: $$Props['href'] = undefined;
	export let type: $$Props['type'] = undefined;
	export let builders: $$Props['builders'] = [];
	export let el: $$Props['el'] = undefined;
	export let fullWidth: $$Props['fullWidth'] = false;

	export let variant: $$Props['variant'] = 'default';
	export let size: $$Props['size'] = 'default';
	export let radius: $$Props['radius'] = 'default';

	let className: $$Props['class'] = undefined;
	export { className as class };

	const attrs = {
		'data-button-root': '',
		class: cn(buttonVariants({ variant, size, fullWidth, radius }), className)
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

<script lang="ts">
	import { builderActions, getAttrs } from 'bits-ui';
	import { buttonVariants, type Events, type Props } from '.';
	import { Motion } from 'svelte-motion';
	import { cn } from '@/utils';
	import Spinner from '@atoms/loader/spinner.svelte';
	import Button from './root.svelte';

	type $$Props = Props;
	type $$Events = Events;

	export let isLoading: $$Props['isLoading'] = false;
</script>

<Button {...$$restProps} disabled={isLoading}>
	{#if isLoading}
		<span class="mr-2">
			<Spinner />
		</span>
	{/if}
	<slot />
</Button>

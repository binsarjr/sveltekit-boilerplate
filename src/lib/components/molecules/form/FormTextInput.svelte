<script lang="ts">
	import { createId } from '@paralleldrive/cuid2';
	import { formFieldProxy } from 'sveltekit-superforms';
	import FormBase, { type FormBaseProps } from './FormBase.svelte';
	import { getFormProvider } from './FormProvider.svelte';
	import { Input } from '@shadcn-ui/input';

	const formProvider = getFormProvider();

	type $$Props = FormBaseProps;
	let { value, errors, constraints } = formFieldProxy(formProvider, $$props.name || '');

	if ($$props.type == 'file') {
		throw new Error('Please use FormUpload component instead for file input');
	}

	$$props.id = 'form-input-' + createId();
	$$restProps = {
		...$$restProps,
		...$constraints
	};
</script>

<FormBase {...$$restProps} errors={$errors}>
	<Input
		id={$$props.id}
		bind:value={$value}
		aria-invalid={!!$errors?.length}
		on:input={() => {
			if ($$props.type == 'number') {
				if (!!$value) {
					$value = +$value;
				} else {
					$value = undefined;
				}
			}
		}}
		{...$constraints}
		{...$$restProps}
	/>
</FormBase>

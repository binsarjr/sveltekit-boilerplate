<script lang="ts">
	import { createId } from '@paralleldrive/cuid2';
	import { fileProxy, filesProxy, formFieldProxy } from 'sveltekit-superforms';
	import FormBase, { type FormBaseProps } from './FormBase.svelte';
	import { getFormProvider } from './FormProvider.svelte';
	import { Input } from '@atoms/input';

	const formProvider = getFormProvider();

	type $$Props = FormBaseProps;
	export let multiple: $$Props['multiple'] = false;
	const { errors, constraints } = formFieldProxy(formProvider, $$props.name || '');

	const value_s = multiple
		? filesProxy(formProvider, $$props.name)
		: fileProxy(formProvider, $$props.name);

	$$props.id = 'form-upload-' + createId();
	$$restProps = {
		...$$restProps,
		...$constraints
	};
</script>

<FormBase {...$$restProps} errors={$errors}>
	<Input
		id={$$props.id}
		aria-invalid={!!$errors?.length}
		{...$constraints}
		{...$$props}
		bind:files={$value_s}
		type="file"
	/>
</FormBase>

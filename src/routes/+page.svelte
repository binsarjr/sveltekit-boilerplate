<script>
	import Avatar from '@atoms/avatar';
	import FormProvider from '@forms/FormProvider.svelte';
	import FormRadio from '@forms/FormRadio.svelte';
	import FormSelect from '@forms/FormSelect.svelte';
	import FormTextInput from '@forms/FormTextInput.svelte';
	import FormUpload from '@forms/FormUpload.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { superForm } from 'sveltekit-superforms';
	import { z } from 'zod';
	const schema = z.object({
		name: z.string().min(2),
		angka: z.number().min(5).optional(),
		img: z.instanceof(File)
	});

	const form = superForm({});
</script>

<div class="container">
	<Card.Root class="w-[350px]">
		<Card.Header>
			<Card.Title>Create project</Card.Title>
			<Card.Description>Deploy your new project in one-click.</Card.Description>
		</Card.Header>
		<Card.Content>
			<form>
				<div class="grid w-full items-center gap-4">
					<div class="flex flex-col space-y-1.5">
						<Label for="name">Name</Label>
						<Input id="name" placeholder="Name of your project" />
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label for="framework">Framework</Label>
						<Select.Root>
							<Select.Trigger id="framework">
								<Select.Value placeholder="Select" />
							</Select.Trigger>
							<Select.Content></Select.Content>
						</Select.Root>
					</div>
				</div>
			</form>
		</Card.Content>
		<Card.Footer class="flex justify-between">
			<Button variant="outline">Cancel</Button>
			<Button>Deploy</Button>
		</Card.Footer>
	</Card.Root>
	Copy

	<Avatar>
		<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
		<Avatar.Fallback>CN</Avatar.Fallback>
	</Avatar>
	<FormProvider {form} debug>
		<FormTextInput name="name" label="Name" placeholder="Enter your name" />
		<FormTextInput name="angka" label="Angka" type="number" placeholder="Enter your angka" />
		<FormUpload multiple name="img" label="Angka" placeholder="Enter your angka" />
		<FormSelect
			name="email"
			label="Email"
			placeholder="Enter your email"
			after="You can manage email address in your email settings."
			multiple
			options={async () => {
				await new Promise((r) => setTimeout(r, 1000));
				return [
					{ value: 'm@example.com', label: 'm@example.com' },
					{ value: 'm@google.com', label: 'm@google.com' },
					{ value: 'm@support.com', label: 'm@support.com' }
				];
			}}
		/>
		<FormRadio
			name="radio"
			options={[
				'option-one',
				{
					label: 'Option Two',
					value: 'option-two'
				}
			]}
		/>
		<button>okei</button>
	</FormProvider>
</div>

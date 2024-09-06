<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { Button } from '@atoms/button';
	import * as Command from '@atoms/command';
	import * as Popover from '@atoms/popover';
	import { createId } from '@paralleldrive/cuid2';
	import Check from 'lucide-svelte/icons/check';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import { onMount, tick } from 'svelte';
	import { formFieldProxy } from 'sveltekit-superforms';
	import FormBase, { type FormBaseProps } from './FormBase.svelte';
	import { getFormProvider } from './FormProvider.svelte';
	import type { Options } from './types';
	const formProvider = getFormProvider();

	type $$Props = FormBaseProps & {
		options?: Options;
		selected?: {
			value: string;
			label: string;
			disabled?: boolean;
		};
		name: string;
	};
	export let options: $$Props['options'] = undefined;
	export let selected: $$Props['selected'] = undefined;
	export let multiple: $$Props['multiple'] = false;
	let { value, errors, constraints } = formFieldProxy(formProvider, $$props.name);

	{
		// default value
		if ($value === undefined) {
			if (multiple) {
				$value = [];
			} else {
				$value = undefined;
			}
		}
	}

	$$props.id = 'form-select-' + createId();
	$$props = {
		...$$props,
		...$constraints
	};

	$: selected = multiple
		? ($value || []).map((c: any) => ({
				label: c,
				value: c
			}))
		: $value
			? {
					value: $value,
					label: $value
				}
			: undefined;

	let open = false;

	let items: { value: string; label: string }[] = [];

	onMount(async () => {
		if (typeof options === 'function') {
			items = (await options()).map((item) => {
				if (typeof item === 'string') {
					return {
						value: item,
						label: item
					};
				}
				return {
					value: item.value,
					label: item.label
				};
			});
		} else if (Array.isArray(options)) {
			items = options.map((item) => {
				if (typeof item === 'string') {
					return {
						value: item,
						label: item
					};
				}
				return {
					value: item.value,
					label: item.label
				};
			});
		} else {
			throw new Error('options must be an array or a function that returns a promise of an array');
		}
	});

	$: selectedValue = items.find((f) => f.value === $value)?.label ?? 'Select...';

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}

	const onSelect = (value: string) => {
		console.log(value);
		$value = value;
		return (triggerId: string) => closeAndFocusTrigger(triggerId);
	};
</script>

<FormBase {...$$props} errors={$errors}>
	<Popover.Root bind:open let:ids>
		<Popover.Trigger asChild let:builder>
			<Button
				builders={[builder]}
				variant="outline"
				role="combobox"
				aria-expanded={open}
				class="w-[200px] justify-between"
			>
				{selectedValue}
				<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
			</Button>
		</Popover.Trigger>
		<Popover.Content class="w-[200px] p-0">
			<Command.Root>
				<Command.Input placeholder={$$props.placeholder || 'Search...'} />
				<Command.Empty>No framework found.</Command.Empty>
				<Command.Group>
					{#each items as item}
						<Command.Item value={item.value} onSelect={() => onSelect(item.value)(ids.trigger)}>
							<Check class={cn('mr-2 h-4 w-4', $value !== item.value && 'text-transparent')} />
							{item.label}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>
</FormBase>

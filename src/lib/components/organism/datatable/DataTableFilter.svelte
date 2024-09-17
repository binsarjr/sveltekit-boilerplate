<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import {
		Command,
		CommandEmpty,
		CommandGroup,
		CommandInput,
		CommandItem,
		CommandList,
		CommandSeparator
	} from '$lib/components/ui/command';
	import { Popover, PopoverContent, PopoverTrigger } from '$lib/components/ui/popover';
	import { Separator } from '$lib/components/ui/separator';
	import { cn } from '$lib/utils';
	import { buttonVariants } from '@atoms/button';
	import { CheckIcon } from 'lucide-svelte';

	export let title: string;
	export let options: Array<{
		value: string;
		label: string;
		icon?: ConstructorOfATypedSvelteComponent;
	}>;
	export let selectedValues: Set<string> = new Set();

	function handleSelect(value: string) {
		if (selectedValues.has(value)) {
			selectedValues.delete(value);
		} else {
			selectedValues.add(value);
		}
		selectedValues = selectedValues;
	}

	function clearFilters() {
		selectedValues.clear();
		selectedValues = selectedValues;
	}
</script>

<Popover>
	<PopoverTrigger>
		<div
			class={cn(
				buttonVariants({
					variant: 'outline',
					size: 'sm'
				}),
				'h-8 border-dashed'
			)}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="mr-2 h-4 w-4"
				><circle cx="12" cy="12" r="10" /><path d="M12 8v8" /><path d="M8 12h8" /></svg
			>
			{title}
			{#if selectedValues?.size > 0}
				<Separator orientation="vertical" class="mx-2 h-4" />
				<Badge variant="secondary" class="rounded-sm px-1 font-normal lg:hidden">
					{selectedValues.size}
				</Badge>
				<div class="hidden space-x-1 lg:flex">
					{#if selectedValues.size > 2}
						<Badge variant="secondary" class="rounded-sm px-1 font-normal">
							{selectedValues.size} selected
						</Badge>
					{:else}
						{#each options.filter((option) => selectedValues.has(option.value)) as option}
							<Badge variant="secondary" class="rounded-sm px-1 font-normal">
								{option.label}
							</Badge>
						{/each}
					{/if}
				</div>
			{/if}
		</div>
	</PopoverTrigger>
	<PopoverContent class="w-[200px] p-0" align="start">
		<Command>
			<CommandInput placeholder={title} />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup>
					{#each options as option}
						{@const isSelected = selectedValues.has(option.value)}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div on:click={() => handleSelect(option.value)}>
							<CommandItem>
								<div
									class={cn(
										'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
										isSelected
											? 'bg-primary text-primary-foreground'
											: 'opacity-50 [&_svg]:invisible'
									)}
								>
									<CheckIcon class={cn('h-4 w-4')} />
								</div>
								{#if option.icon}
									<svelte:component this={option.icon} class="mr-2 h-4 w-4 text-muted-foreground" />
								{/if}
								<span>{option.label}</span>
							</CommandItem>
						</div>
					{/each}
				</CommandGroup>
				{#if selectedValues.size > 0}
					<CommandSeparator />
					<CommandGroup>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div on:click={clearFilters} class="justify-center text-center">
							<CommandItem>Clear filters</CommandItem>
						</div>
					</CommandGroup>
				{/if}
			</CommandList>
		</Command>
	</PopoverContent>
</Popover>

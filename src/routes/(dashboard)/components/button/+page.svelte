<script>
	import Button from '@atoms/button/button.svelte';
</script>

<div class="space-y-4">
	<Button>Button</Button>
	<Button disabled>Disabled</Button>
	<div class="flex items-center gap-4">
		<Button size="sm">Small</Button>
		<Button>Default</Button>
		<Button size="lg">Large</Button>
	</div>
	<div class="flex items-center gap-4">
		<Button radius="none">Rounded None</Button>
		<Button radius="sm">Rounded Small</Button>
		<Button radius="default">Rounded Default</Button>
		<Button radius="lg">Rounded Large</Button>
		<Button radius="full">Rounded Full</Button>
	</div>
	<Button fullWidth>Full Width</Button>
	<fieldset class="space-y-4 border p-5">
		<legend>Variants</legend>
		<div class="flex items-center gap-4">
			<Button variant="outline">Outline</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="link">Link</Button>
		</div>
		<div class="flex items-center gap-4">
			<Button variant="destructive">Destructive</Button>
			<Button variant="default">Default</Button>
		</div>
	</fieldset>
	<Button isLoading variant="destructive">Loading</Button>
</div>

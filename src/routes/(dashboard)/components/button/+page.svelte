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
</div>

<script>
	import { Separator } from '@shadcn-ui/separator';

	export let title;
	export let desc;
</script>

<div class="flex flex-1 flex-col">
	<div class="flex-none">
		<h3 class="text-lg font-medium">{title}</h3>
		<p class="text-sm text-muted-foreground">{desc}</p>
	</div>
	<Separator class="my-4 flex-none" />
	<div class="faded-bottom -mx-4 flex-1 overflow-auto scroll-smooth px-4 md:pb-16">
		<div class="lg:max-w-xl">
			<slot></slot>
		</div>
	</div>
</div>

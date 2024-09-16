<script>
	import { Button } from '@shadcn-ui/button';
</script>

<div class="h-svh">
	<div class="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
		<h1 class="text-[7rem] font-bold leading-tight">404</h1>
		<span class="font-medium">Oops! Page Not Found!</span>
		<p class="text-center text-muted-foreground">
			It seems like the page you're looking for <br />
			does not exist or might have been removed.
		</p>
		<div class="mt-6 flex gap-4">
			<Button variant="outline" on:click={() => history.back()}>Go Back</Button>
			<Button href="/">Back to Home</Button>
		</div>
	</div>
</div>

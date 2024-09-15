<script>
	import { Button } from '@atoms/button';
</script>

<div class="h-svh">
	<div class="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
		<h1 class="text-[7rem] font-bold leading-tight">401</h1>
		<span class="font-medium"> Oops! You don't have permission to access this page. </span>
		<p class="text-center text-muted-foreground">
			It looks like you tried to access a resource that requires proper authentication. <br />
			Please log in with the appropriate credentials.
		</p>
		<div class="mt-6 flex gap-4">
			<Button variant="outline" on:click={() => history.back()}>Go Back</Button>
			<Button href="/">Back to Home</Button>
		</div>
	</div>
</div>

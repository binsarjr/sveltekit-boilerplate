<script lang="ts">
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuGroup,
		DropdownMenuItem,
		DropdownMenuLabel,
		DropdownMenuSeparator,
		DropdownMenuShortcut,
		DropdownMenuTrigger
	} from '@/components/ui/dropdown-menu';
	import Avatar from '@shadcn-ui/avatar';
	import AvatarFallback from '@shadcn-ui/avatar/avatar-fallback.svelte';
	import AvatarImage from '@shadcn-ui/avatar/avatar-image.svelte';
	import { Button } from '@shadcn-ui/button';
</script>

<DropdownMenu>
	<DropdownMenuTrigger>
		<Button variant="ghost" class="relative h-8 w-8 rounded-full">
			<Avatar class="h-8 w-8">
				<AvatarImage src="/avatars/01.png" alt="@shadcn" />
				<AvatarFallback>SN</AvatarFallback>
			</Avatar>
		</Button>
	</DropdownMenuTrigger>
	<DropdownMenuContent class="w-56" align="end">
		<DropdownMenuLabel class="font-normal">
			<div class="flex flex-col space-y-1">
				<p class="text-sm font-medium leading-none">satnaing</p>
				<p class="text-xs leading-none text-muted-foreground">satnaingdev@gmail.com</p>
			</div>
		</DropdownMenuLabel>
		<DropdownMenuSeparator />
		<DropdownMenuGroup>
			<DropdownMenuItem>
				Profile
				<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
			</DropdownMenuItem>
			<DropdownMenuItem>
				Billing
				<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
			</DropdownMenuItem>
			<DropdownMenuItem>
				Settings
				<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
			</DropdownMenuItem>
			<DropdownMenuItem>New Team</DropdownMenuItem>
		</DropdownMenuGroup>
		<DropdownMenuSeparator />
		<DropdownMenuItem>
			Log out
			<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
		</DropdownMenuItem>
	</DropdownMenuContent>
</DropdownMenu>

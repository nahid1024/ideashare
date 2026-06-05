<script lang="ts">
	import { Avatar, DropdownMenu } from 'bits-ui';
	import Cardholder from 'phosphor-svelte/lib/Cardholder';
	import GearSix from 'phosphor-svelte/lib/GearSix';
	import UserCircle from 'phosphor-svelte/lib/UserCircle';
	import SignOutIcon from "phosphor-svelte/lib/SignOutIcon"
	import { enhance } from '$app/forms';


	let { avatar } = $props();

</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger
		class="border-border-input shadow-xs inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full font-medium text-foreground select-none hover:bg-muted active:scale-[0.98]"
	>
		<Avatar.Root
			delayMs={200}
			class="h-10 w-10 rounded-full border border-border bg-muted text-[17px] font-medium text-muted-foreground uppercase data-[status=loaded]:border-foreground data-[status=loading]:border-transparent"
		>
			<div
				class="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-transparent"
			>
				<Avatar.Image src={avatar} alt="@huntabyte" />
				<Avatar.Fallback class="border border-border-muted bg-muted">HB</Avatar.Fallback>
			</div>
		</Avatar.Root>
	</DropdownMenu.Trigger>
	<DropdownMenu.Portal>
		<DropdownMenu.Content
			class="shadow-md w-[229px] rounded-lg border border-border bg-background px-1 py-1.5 outline-hidden focus-visible:outline-hidden"
			sideOffset={8}
		>
			<DropdownMenu.Item
				class="rounded-md flex h-10 items-center py-3 pr-1.5 pl-3 text-sm font-medium text-foreground-secondary select-none focus-visible:outline-none data-highlighted:bg-muted data-highlighted:text-foreground cursor-pointer"
			>
				<div class="flex items-center">
					<UserCircle class="text-foreground-muted mr-2 size-5" />
					Profile
				</div>
				<div class="ml-auto flex items-center gap-px">
					<kbd
						class="rounded-xs border border-border bg-background-muted shadow-xs inline-flex size-5 items-center justify-center text-xs text-foreground-muted"
					>
						⌘
					</kbd>
					<kbd
						class="rounded-xs border border-border bg-background-muted shadow-xs inline-flex size-5 items-center justify-center text-[10px] text-foreground-muted"
					>
						P
					</kbd>
				</div>
			</DropdownMenu.Item>
			<DropdownMenu.Item
				class="rounded-md flex h-10 items-center py-3 pr-1.5 pl-3 text-sm font-medium text-foreground-secondary select-none focus-visible:outline-none data-highlighted:bg-muted data-highlighted:text-foreground cursor-pointer"
			>
				<div class="flex items-center">
					<Cardholder class="text-foreground-muted mr-2 size-5" />
					Billing
				</div>
				<div class="ml-auto flex items-center gap-px">
					<kbd
						class="rounded-xs border border-border bg-background-muted shadow-xs inline-flex size-5 items-center justify-center text-xs text-foreground-muted"
					>
						⌘
					</kbd>
					<kbd
						class="rounded-xs border border-border bg-background-muted shadow-xs inline-flex size-5 items-center justify-center text-[10px] text-foreground-muted"
					>
						B
					</kbd>
				</div>
			</DropdownMenu.Item>
			<DropdownMenu.Item
				class="rounded-md flex h-10 items-center py-3 pr-1.5 pl-3 text-sm font-medium text-foreground-secondary select-none focus-visible:outline-none data-highlighted:bg-muted data-highlighted:text-foreground cursor-pointer"
			>
				<div class="flex items-center">
					<GearSix class="text-foreground-muted mr-2 size-5" />
					Settings
				</div>
				<div class="ml-auto flex items-center gap-px">
					<kbd
						class="rounded-xs border border-border bg-background-muted shadow-xs inline-flex size-5 items-center justify-center text-xs text-foreground-muted"
					>
						⌘
					</kbd>
					<kbd
						class="rounded-xs border border-border bg-background-muted shadow-xs inline-flex size-5 items-center justify-center text-[10px] text-foreground-muted"
					>
						S
					</kbd>
				</div>
			</DropdownMenu.Item>
			<DropdownMenu.Item
				class="rounded-md text-destructive flex h-10 items-center py-3 pr-1.5 pl-3 text-sm font-medium select-none focus-visible:outline-none data-highlighted:bg-destructive-background data-highlighted:text-destructive-foreground cursor-pointer"
			>
				<form method="post" action="/auth?/signOut" use:enhance class="w-full">
					<button type="submit" class="flex w-full cursor-pointer items-center text-left font-inherit">
						<SignOutIcon class="mr-2 size-5" />
						Logout
					</button>
				</form>
			</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Portal>
</DropdownMenu.Root>

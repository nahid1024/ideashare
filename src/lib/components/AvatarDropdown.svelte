<script lang="ts">
	import { Avatar, DropdownMenu } from 'bits-ui';
	import Cardholder from 'phosphor-svelte/lib/Cardholder';
	import GearSix from 'phosphor-svelte/lib/GearSix';
	import UserCircle from 'phosphor-svelte/lib/UserCircleIcon';
	import SignOutIcon from 'phosphor-svelte/lib/SignOutIcon';
	import { enhance } from '$app/forms';

	let { avatar } = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger
		class="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full font-medium text-foreground shadow-xs select-none hover:bg-muted active:scale-[0.98]"
	>
		<Avatar.Root
			delayMs={200}
			class="h-10 w-10 rounded-full border border-border bg-muted text-[17px] font-medium text-muted-foreground uppercase data-[status=loaded]:border-accent data-[status=loading]:border-transparent"
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
			class="w-[229px] rounded-lg border border-border bg-background px-1 py-1.5 shadow-md outline-hidden focus-visible:outline-hidden"
			sideOffset={8}
		>
			<DropdownMenu.Item
				class="flex h-10 cursor-pointer items-center rounded-md py-3 pr-1.5 pl-3 text-sm font-medium text-foreground-secondary select-none focus-visible:outline-none data-highlighted:bg-muted data-highlighted:text-foreground"
			>
				<div class="flex items-center">
					<UserCircle class="mr-2 size-5 text-foreground-muted" />
					Profile
				</div>
				<div class="ml-auto flex items-center gap-px">
					<kbd
						class="inline-flex size-5 items-center justify-center rounded-xs border border-border bg-background-muted text-xs text-foreground-muted shadow-xs"
					>
						⌘
					</kbd>
					<kbd
						class="inline-flex size-5 items-center justify-center rounded-xs border border-border bg-background-muted text-[10px] text-foreground-muted shadow-xs"
					>
						P
					</kbd>
				</div>
			</DropdownMenu.Item>
			<DropdownMenu.Item
				class="flex h-10 cursor-pointer items-center rounded-md py-3 pr-1.5 pl-3 text-sm font-medium text-foreground-secondary select-none focus-visible:outline-none data-highlighted:bg-muted data-highlighted:text-foreground"
			>
				<div class="flex items-center">
					<Cardholder class="mr-2 size-5 text-foreground-muted" />
					Billing
				</div>
				<div class="ml-auto flex items-center gap-px">
					<kbd
						class="inline-flex size-5 items-center justify-center rounded-xs border border-border bg-background-muted text-xs text-foreground-muted shadow-xs"
					>
						⌘
					</kbd>
					<kbd
						class="inline-flex size-5 items-center justify-center rounded-xs border border-border bg-background-muted text-[10px] text-foreground-muted shadow-xs"
					>
						B
					</kbd>
				</div>
			</DropdownMenu.Item>
			<DropdownMenu.Item
				class="flex h-10 cursor-pointer items-center rounded-md py-3 pr-1.5 pl-3 text-sm font-medium text-foreground-secondary select-none focus-visible:outline-none data-highlighted:bg-muted data-highlighted:text-foreground"
			>
				<div class="flex items-center">
					<GearSix class="mr-2 size-5 text-foreground-muted" />
					Settings
				</div>
				<div class="ml-auto flex items-center gap-px">
					<kbd
						class="inline-flex size-5 items-center justify-center rounded-xs border border-border bg-background-muted text-xs text-foreground-muted shadow-xs"
					>
						⌘
					</kbd>
					<kbd
						class="inline-flex size-5 items-center justify-center rounded-xs border border-border bg-background-muted text-[10px] text-foreground-muted shadow-xs"
					>
						S
					</kbd>
				</div>
			</DropdownMenu.Item>
			<DropdownMenu.Item
				class="flex h-10 cursor-pointer items-center rounded-md py-3 pr-1.5 pl-3 text-sm font-medium text-destructive select-none focus-visible:outline-none data-highlighted:bg-muted"
			>
				<form method="post" action="/auth?/signOut" use:enhance class="w-full">
					<button
						type="submit"
						class="font-inherit flex w-full cursor-pointer items-center text-left"
					>
						<SignOutIcon class="mr-2 size-5" />
						Logout
					</button>
				</form>
			</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Portal>
</DropdownMenu.Root>

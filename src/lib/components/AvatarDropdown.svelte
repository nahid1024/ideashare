<script lang="ts">
	import { Avatar, DropdownMenu } from 'bits-ui';
	import Cardholder from 'phosphor-svelte/lib/CardholderIcon';
	import GearSix from 'phosphor-svelte/lib/GearSixIcon';
	import UserCircle from 'phosphor-svelte/lib/UserCircleIcon';
	import SignOutIcon from 'phosphor-svelte/lib/SignOutIcon';
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';

	let { avatar, userId } = $props();
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
			class="z-100 w-45 rounded-lg border border-border bg-background px-1 py-1.5 shadow-md outline-hidden focus-visible:outline-hidden"
			sideOffset={8}
			preventScroll={false}
		>
			<a href={resolve('/profile/[username]', { username: userId })}>
				<DropdownMenu.Item
					class="flex h-10 cursor-pointer items-center rounded-md py-3 pr-1.5 pl-3 text-sm font-medium text-foreground-secondary select-none focus-visible:outline-none data-highlighted:bg-muted data-highlighted:text-foreground"
				>
					<div class="flex items-center">
						<UserCircle class="mr-2 size-5 text-foreground-muted" />
						Profile
					</div>
				</DropdownMenu.Item>
			</a>
			<a href={resolve('/billing')}>
				<DropdownMenu.Item
					class="flex h-10 cursor-pointer items-center rounded-md py-3 pr-1.5 pl-3 text-sm font-medium text-foreground-secondary select-none focus-visible:outline-none data-highlighted:bg-muted data-highlighted:text-foreground"
				>
					<div class="flex items-center">
						<Cardholder class="mr-2 size-5 text-foreground-muted" />
						Billing
					</div>
				</DropdownMenu.Item>
			</a>
			<a href={resolve('/settings')}>
				<DropdownMenu.Item
					class="flex h-10 cursor-pointer items-center rounded-md py-3 pr-1.5 pl-3 text-sm font-medium text-foreground-secondary select-none focus-visible:outline-none data-highlighted:bg-muted data-highlighted:text-foreground"
				>
					<div class="flex items-center">
						<GearSix class="mr-2 size-5 text-foreground-muted" />
						Settings
					</div>
				</DropdownMenu.Item>
			</a>
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

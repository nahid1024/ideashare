<script lang="ts">
	import { Avatar, DropdownMenu } from 'bits-ui';
	import Cardholder from 'phosphor-svelte/lib/Cardholder';
	import CaretRight from 'phosphor-svelte/lib/CaretRight';
	import GearSix from 'phosphor-svelte/lib/GearSix';
	import UserCircle from 'phosphor-svelte/lib/UserCircle';
	import UserCirclePlus from 'phosphor-svelte/lib/UserCirclePlus';
	import Bell from 'phosphor-svelte/lib/Bell';
	import Check from 'phosphor-svelte/lib/Check';
	import DotOutline from 'phosphor-svelte/lib/DotOutline';

	let { name, email, avatar } = $props();

	let notifications = $state<boolean>(false);
	let invited = $state('');
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger
		class="border-input shadow-btn inline-flex h-10 w-10 items-center justify-center rounded-full font-medium text-foreground  select-none hover:bg-muted active:scale-[0.98]"
	>
		<Avatar.Root
			delayMs={200}
			class="h-10 w-10 rounded-full border bg-muted text-[17px] font-medium text-muted-foreground uppercase data-[status=loaded]:border-foreground data-[status=loading]:border-transparent"
		>
			<div
				class="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-transparent"
			>
				<Avatar.Image src={avatar} alt="@huntabyte" />
				<Avatar.Fallback class="border border-muted">HB</Avatar.Fallback>
			</div>
		</Avatar.Root>
	</DropdownMenu.Trigger>
	<DropdownMenu.Portal>
		<DropdownMenu.Content
			class="shadow-popover w-[229px] rounded-xl border border-muted bg-white px-1 py-1.5 outline-hidden focus-visible:outline-hidden"
			sideOffset={8}
		>
			<DropdownMenu.Item
				class="rounded-button flex h-10 items-center py-3 pr-1.5 pl-3 text-sm font-medium ring-0! ring-transparent! select-none focus-visible:outline-none data-highlighted:bg-muted"
			>
				<div class="flex items-center">
					<UserCircle class="text-foreground-alt mr-2 size-5" />
					Profile
				</div>
				<div class="ml-auto flex items-center gap-px">
					<kbd
						class="rounded-button border-dark-10 bg-background-alt shadow-kbd inline-flex size-5 items-center justify-center border text-xs text-muted-foreground"
					>
						⌘
					</kbd>
					<kbd
						class="rounded-button border-dark-10 bg-background-alt shadow-kbd inline-flex size-5 items-center justify-center border text-[10px] text-muted-foreground"
					>
						P
					</kbd>
				</div>
			</DropdownMenu.Item>
			<DropdownMenu.Item
				class="rounded-button flex h-10 items-center py-3 pr-1.5 pl-3 text-sm font-medium ring-0! ring-transparent! select-none focus-visible:outline-none data-highlighted:bg-muted"
			>
				<div class="flex items-center">
					<Cardholder class="text-foreground-alt mr-2 size-5" />
					Billing
				</div>
				<div class="ml-auto flex items-center gap-px">
					<kbd
						class="rounded-button border-dark-10 bg-background-alt shadow-kbd inline-flex size-5 items-center justify-center border text-xs text-muted-foreground"
					>
						⌘
					</kbd>
					<kbd
						class="rounded-button border-dark-10 bg-background-alt shadow-kbd inline-flex size-5 items-center justify-center border text-[10px] text-muted-foreground"
					>
						B
					</kbd>
				</div>
			</DropdownMenu.Item>
			<DropdownMenu.Item
				class="rounded-button flex h-10 items-center py-3 pr-1.5 pl-3 text-sm font-medium ring-0! ring-transparent! select-none focus-visible:outline-none data-highlighted:bg-muted"
			>
				<div class="flex items-center">
					<GearSix class="text-foreground-alt mr-2 size-5" />
					Settings
				</div>
				<div class="ml-auto flex items-center gap-px">
					<kbd
						class="rounded-button border-dark-10 bg-background-alt shadow-kbd inline-flex size-5 items-center justify-center border text-xs text-muted-foreground"
					>
						⌘
					</kbd>
					<kbd
						class="rounded-button border-dark-10 bg-background-alt shadow-kbd inline-flex size-5 items-center justify-center border text-[10px] text-muted-foreground"
					>
						S
					</kbd>
				</div>
			</DropdownMenu.Item>
			<DropdownMenu.CheckboxItem
				bind:checked={notifications}
				class="rounded-button flex h-10 items-center py-3 pr-1.5 pl-3 text-sm font-medium ring-0! ring-transparent! select-none focus-visible:outline-none data-highlighted:bg-muted"
			>
				{#snippet children({ checked })}
					<div class="flex items-center pr-4">
						<Bell class="text-foreground-alt mr-2 size-5" />
						Notifications
					</div>
					<div class="ml-auto flex items-center gap-px">
						{#if checked}
							<Check class="size-4" />
						{/if}
					</div>
				{/snippet}
			</DropdownMenu.CheckboxItem>
			<DropdownMenu.Sub>
				<DropdownMenu.SubTrigger
					class="rounded-button flex h-10 items-center py-3 pr-1.5 pl-3 text-sm font-medium ring-0! ring-transparent! select-none focus-visible:outline-none data-highlighted:bg-muted data-[state=open]:bg-muted"
				>
					<div class="flex items-center">
						<UserCirclePlus class="text-foreground-alt mr-2 size-5" />
						Workspace
					</div>
					<div class="ml-auto flex items-center gap-px">
						<CaretRight class="text-foreground-alt size-5" />
					</div>
				</DropdownMenu.SubTrigger>
				<DropdownMenu.Portal>
					<DropdownMenu.SubContent
						class="shadow-popover w-[209px] rounded-xl border border-muted bg-background px-1 py-1.5 ring-0! ring-transparent! outline-none"
						sideOffset={10}
					>
						<DropdownMenu.RadioGroup bind:value={invited}>
							<DropdownMenu.RadioItem
								value="huntabyte"
								class="rounded-button flex h-10 items-center py-3 pr-1.5 pl-3 text-sm font-medium ring-0! ring-transparent! select-none focus-visible:outline-none data-highlighted:bg-muted"
							>
								{#snippet children({ checked })}
									<Avatar.Root
										class="relative mr-3 flex size-5 shrink-0 overflow-hidden rounded-full border border-foreground/50"
									>
										<Avatar.Image
											src="https://github.com/huntabyte.png"
											alt="@huntabyte"
											class="aspect-square h-full w-full"
										/>
										<Avatar.Fallback
											class="text-xxs flex h-full w-full items-center justify-center rounded-full bg-muted"
											>HJ</Avatar.Fallback
										>
									</Avatar.Root>
									@huntabyte
									{#if checked}
										<DotOutline class="ml-auto size-4" />
									{/if}
								{/snippet}
							</DropdownMenu.RadioItem>
							<DropdownMenu.RadioItem
								value="pavel"
								class="rounded-button flex h-10 items-center py-3 pr-1.5 pl-3 text-sm font-medium select-none focus-visible:outline-none data-highlighted:bg-muted"
							>
								{#snippet children({ checked })}
									<Avatar.Root
										class="relative mr-3 flex size-5 shrink-0 overflow-hidden rounded-full border border-foreground/50"
									>
										<Avatar.Image
											src="https://github.com/pavelstianko.png"
											alt="@pavel_stianko"
											class="aspect-square h-full w-full"
										/>
										<Avatar.Fallback
											class="flex h-full w-full items-center justify-center rounded-full bg-muted text-xs"
											>PS</Avatar.Fallback
										>
									</Avatar.Root>
									@pavel_stianko
									{#if checked}
										<DotOutline class="ml-auto size-4" />
									{/if}
								{/snippet}
							</DropdownMenu.RadioItem>
							<DropdownMenu.RadioItem
								value="cokakoala"
								class="rounded-button flex h-10 items-center py-3 pr-1.5 pl-3 text-sm font-medium select-none focus-visible:outline-none data-highlighted:bg-muted"
							>
								{#snippet children({ checked })}
									<Avatar.Root
										class="relative mr-3 flex size-5 shrink-0 overflow-hidden rounded-full border border-foreground/50"
									>
										<Avatar.Image
											src="https://github.com/adriangonz97.png"
											alt="@cokakoala_"
											class="aspect-square h-full w-full"
										/>
										<Avatar.Fallback
											class="flex h-full w-full items-center justify-center rounded-full bg-muted text-xs"
											>CK</Avatar.Fallback
										>
									</Avatar.Root>
									@cokakoala_
									{#if checked}
										<DotOutline class="ml-auto size-4" />
									{/if}
								{/snippet}
							</DropdownMenu.RadioItem>
							<DropdownMenu.RadioItem
								value="tglide"
								class="rounded-button flex h-10 items-center py-3 pr-1.5 pl-3 text-sm font-medium select-none focus-visible:outline-none data-highlighted:bg-muted"
							>
								{#snippet children({ checked })}
									<Avatar.Root
										class="relative mr-3 flex size-5 shrink-0 overflow-hidden rounded-full border border-foreground/50"
									>
										<Avatar.Image
											src="https://github.com/tglide.png"
											alt="@tglide"
											class="aspect-square h-full w-full"
										/>
										<Avatar.Fallback
											class="flex h-full w-full items-center justify-center rounded-full bg-muted text-xs"
										>
											TL
										</Avatar.Fallback>
									</Avatar.Root>
									@thomasglopes
									{#if checked}
										<DotOutline class="ml-auto size-4" />
									{/if}
								{/snippet}
							</DropdownMenu.RadioItem>
						</DropdownMenu.RadioGroup>
					</DropdownMenu.SubContent>
				</DropdownMenu.Portal>
			</DropdownMenu.Sub>
		</DropdownMenu.Content>
	</DropdownMenu.Portal>
</DropdownMenu.Root>

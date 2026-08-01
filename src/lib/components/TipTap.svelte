<!-- src/lib/components/Editor.svelte -->
<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor, type JSONContent } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Placeholder from '@tiptap/extension-placeholder';

	interface Props {
		value?: JSONContent;
		placeholder?: string;
		minHeight?: string;
		onchange?: (content: JSONContent) => void;
		onblur?: () => void;
		onfocus?: () => void;
		errorMessage?: string;
	}

	let {
		value = $bindable<JSONContent>({
			type: 'doc',
			content: []
		}),
		placeholder = 'Describe your idea in detail...',
		minHeight = '140px',
		onchange,
		onblur,
		onfocus,
		errorMessage
	}: Props = $props();

	// ── DOM refs ──────────────────────────────────────────────
	let editorEl = $state<HTMLElement | null>(null);
	let editor = $state<Editor | null>(null);

	// ── Active format states ───────────────────────────────────
	let isBold = $derived(editor?.isActive('bold') ?? false);
	let isItalic = $derived(editor?.isActive('italic') ?? false);
	let isUnderline = $derived(editor?.isActive('underline') ?? false);
	let isBullet = $derived(editor?.isActive('bulletList') ?? false);
	let isOrdered = $derived(editor?.isActive('orderedList') ?? false);
	let charCount = $state(0);

	// ── Init TipTap ───────────────────────────────────────────
	onMount(() => {
		editor = new Editor({
			element: editorEl!,
			extensions: [
				StarterKit.configure({
					heading: false,
					codeBlock: false,
					blockquote: false,
					horizontalRule: false,
					link: {
						openOnClick: false,
						HTMLAttributes: {
							class: 'editor-link',
							rel: 'noopener noreferrer',
							target: '_blank'
						}
					}
				}),
				Placeholder.configure({ placeholder })
			],
			// value is HTML — set it directly as content
			content: value || '',
			editorProps: {
				attributes: {
					class: 'editor-content',
					style: `min-height: ${minHeight}`
				}
			},
			onBlur: () => {
				onblur?.();
			},
			onFocus: () => {
				onfocus?.();
			},
			onUpdate: ({ editor: e }) => {
				// Keep char count in sync
				charCount = e.getText().length;
				// Emit raw HTML
				value = e.getJSON();

				onchange?.(value);
			},
			onTransaction: () => {
				// Reassign to trigger $derived re-computation
				editor = editor;
			}
		});

		// Sync initial char count
		charCount = editor.getText().length;
	});

	onDestroy(() => editor?.destroy());

	// ── Toolbar helpers ───────────────────────────────────────
	const bold = () => editor?.chain().focus().toggleBold().run();
	const italic = () => editor?.chain().focus().toggleItalic().run();
	const underline = () => editor?.chain().focus().toggleUnderline().run();
	const bulletList = () => editor?.chain().focus().toggleBulletList().run();
	const orderedList = () => editor?.chain().focus().toggleOrderedList().run();
</script>

<!-- ── Root ── -->
<div class="overflow-hidden bg-card">
	<!-- ── Editor mount point ── -->
	<div bind:this={editorEl}></div>

	<!-- ── Footer ── -->
	<div
		class="flex items-center justify-between
		       bg-background px-4 py-2"
	>
		<p class="text-[11px] text-destructive">
			{#if errorMessage}
				{errorMessage}
			{/if}
		</p>

		<span
			class="text-[11px] tabular-nums transition-colors"
			style:color={charCount > 1000
				? 'var(--destructive)'
				: charCount > 900
					? 'var(--warning)'
					: 'var(--foreground-muted)'}
		>
			{charCount} / 1000
		</span>
	</div>
	<!-- ── Toolbar ── -->
	{#if editor}
		<div
			class="flex flex-wrap items-center gap-0.5 border-b border-border
			       bg-background-secondary px-3 py-1.5"
		>
			<!-- Bold -->
			<button
				type="button"
				onclick={bold}
				aria-label="Bold (⌘B)"
				title="Bold (⌘B)"
				aria-pressed={isBold}
				class="tbtn"
				class:tbtn--on={isBold}
			>
				<svg
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
				>
					<path d="M6 4h8a4 4 0 010 8H6z" />
					<path d="M6 12h9a4 4 0 010 8H6z" />
				</svg>
			</button>

			<!-- Italic -->
			<button
				type="button"
				onclick={italic}
				aria-label="Italic (⌘I)"
				title="Italic (⌘I)"
				aria-pressed={isItalic}
				class="tbtn"
				class:tbtn--on={isItalic}
			>
				<svg
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
				>
					<line x1="19" y1="4" x2="10" y2="4" />
					<line x1="14" y1="20" x2="5" y2="20" />
					<line x1="15" y1="4" x2="9" y2="20" />
				</svg>
			</button>

			<!-- Underline -->
			<button
				type="button"
				onclick={underline}
				aria-label="Underline (⌘U)"
				title="Underline (⌘U)"
				aria-pressed={isUnderline}
				class="tbtn"
				class:tbtn--on={isUnderline}
			>
				<svg
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
				>
					<path d="M6 3v7a6 6 0 0012 0V3" />
					<line x1="4" y1="21" x2="20" y2="21" />
				</svg>
			</button>

			<!-- Divider -->
			<div class="mx-1 h-4 w-px shrink-0 bg-border"></div>

			<!-- Bullet list -->
			<button
				type="button"
				onclick={bulletList}
				aria-label="Bullet list"
				title="Bullet list"
				aria-pressed={isBullet}
				class="tbtn"
				class:tbtn--on={isBullet}
			>
				<svg
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
				>
					<line x1="9" y1="6" x2="20" y2="6" />
					<line x1="9" y1="12" x2="20" y2="12" />
					<line x1="9" y1="18" x2="20" y2="18" />
					<circle cx="4" cy="6" r="1.5" fill="currentColor" stroke="none" />
					<circle cx="4" cy="12" r="1.5" fill="currentColor" stroke="none" />
					<circle cx="4" cy="18" r="1.5" fill="currentColor" stroke="none" />
				</svg>
			</button>

			<!-- Ordered list -->
			<button
				type="button"
				onclick={orderedList}
				aria-label="Numbered list"
				title="Numbered list"
				aria-pressed={isOrdered}
				class="tbtn"
				class:tbtn--on={isOrdered}
			>
				<svg
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
				>
					<line x1="10" y1="6" x2="21" y2="6" />
					<line x1="10" y1="12" x2="21" y2="12" />
					<line x1="10" y1="18" x2="21" y2="18" />
					<path d="M4 6h1v4" stroke-width="2.5" />
					<path d="M4 10h2" stroke-width="2.5" />
					<path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1.5" stroke-width="2.5" />
				</svg>
			</button>

			<!-- Shortcuts hint -->
			<span
				class="ml-auto hidden pr-1 text-[11px] text-foreground-muted
			             tabular-nums select-none sm:block"
			>
				⌘B &nbsp;⌘I &nbsp;⌘U
			</span>
		</div>
	{/if}
</div>

<style>
	/* ── Toolbar button ── */
	.tbtn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 30px;
		border-radius: var(--radius-sm);
		border: none;
		background: transparent;
		color: var(--foreground-muted);
		cursor: pointer;
		flex-shrink: 0;
		transition:
			background 0.12s,
			color 0.12s;
	}
	.tbtn:hover {
		background: var(--background-muted);
		color: var(--foreground);
	}
	.tbtn--on {
		background: var(--accent);
		color: var(--accent-foreground);
	}
	.tbtn--on:hover {
		opacity: 0.88;
	}
</style>

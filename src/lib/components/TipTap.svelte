<!-- src/lib/components/Editor.svelte -->
<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Underline from '@tiptap/extension-underline';
	import Link from '@tiptap/extension-link';
	import Placeholder from '@tiptap/extension-placeholder';
	import { Markdown } from '@tiptap/markdown';

	interface Props {
		value?: string;
		placeholder?: string;
		minHeight?: string;
		onchange?: (markdown: string) => void;
		oninput?: () => void;
		onfocus?: () => void;
		errorMessage?: string;
	}

	let {
		value = $bindable(''),
		placeholder = 'Describe your idea in detail...',
		minHeight = '140px',
		onchange,
		oninput,
		onfocus,
		errorMessage
	}: Props = $props();

	// ── DOM refs ──────────────────────────────────────────────
	let editorEl = $state<HTMLElement | null>(null);
	let editor = $state<Editor | null>(null);
	// ── Active format states (reactive to cursor position) ────
	let isBold = $derived(editor?.isActive('bold') ?? false);
	let isItalic = $derived(editor?.isActive('italic') ?? false);
	let isUnderline = $derived(editor?.isActive('underline') ?? false);
	let isBullet = $derived(editor?.isActive('bulletList') ?? false);
	let isOrdered = $derived(editor?.isActive('orderedList') ?? false);
	let charCount = $derived(0);

	// ── Init TipTap ───────────────────────────────────────────
	onMount(() => {
		editor = new Editor({
			element: editorEl!,
			extensions: [
				StarterKit.configure({
					heading: false, // keep it simple for idea posts
					codeBlock: false,
					blockquote: false,
					horizontalRule: false
				}),
				Underline,
				Link.configure({
					openOnClick: false,
					HTMLAttributes: {
						class: 'editor-link',
						rel: 'noopener noreferrer',
						target: '_blank'
					}
				}),
				Placeholder.configure({ placeholder }),
				Markdown
			],
			content: value || '',
			editorProps: {
				attributes: {
					class: 'editor-content',
					style: `min-height: ${minHeight}`
				}
			},
			onFocus: () => {
				onfocus?.();
			},
			onUpdate: () => {
				charCount = editor?.getText().length ?? 0;
				oninput?.();
			},
			onTransaction: () => {
				// Reassign to trigger $derived re-computation
				editor = editor;
				// Sync markdown value out
				const md = editor?.getMarkdown() ?? '';
				value = md;
				onchange?.(md);
			}
		});
	});

	onDestroy(() => editor?.destroy());

	// ── Toolbar helpers ───────────────────────────────────────
	function bold() {
		editor?.chain().focus().toggleBold().run();
	}
	function italic() {
		editor?.chain().focus().toggleItalic().run();
	}
	function underline() {
		editor?.chain().focus().toggleUnderline().run();
	}
	function bulletList() {
		editor?.chain().focus().toggleBulletList().run();
	}
	function orderedList() {
		editor?.chain().focus().toggleOrderedList().run();
	}
</script>

<!-- ── Root ── -->
<div
	class="overflow-hidden border
         border-border bg-card transition-all duration-150"
>
	<!-- ── Toolbar ── -->
	{#if editor}
		<div
			class="flex flex-wrap items-center gap-0.5 border-b
             border-border bg-background-secondary
             px-3 py-1.5"
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

			<!-- Divider -->
			<div class="mx-1 h-4 w-px shrink-0 bg-border"></div>

			<!-- Shortcuts hint -->
			<span
				class="ml-auto hidden pr-1
                   text-[11px] text-foreground-muted tabular-nums select-none sm:block"
			>
				⌘B &nbsp;⌘I &nbsp;⌘U &nbsp;⌘K
			</span>
		</div>
	{/if}

	<!-- ── Editor mount point ── -->
	<div
		bind:this={editorEl}
		class="border-l-3 border-l-transparent focus-within:border-l-accent"
	></div>

	<!-- ── Footer ── -->
	<div
		class="flex items-center justify-between border-t
           border-border-muted
           bg-background-secondary px-4 py-2"
	>
		<p class="text-[11px] text-red-400">{errorMessage}</p>
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

	/* ── TipTap editor content styles ── */
	:global(.editor-content) {
		padding: 12px 16px;
		font-size: 14px;
		line-height: 1.75;
		font-family: var(--font-body);
		color: var(--foreground);
		outline: none;
		cursor: text;
	}

	/* Placeholder */
	:global(.editor-content p.is-editor-empty:first-child::before) {
		content: attr(data-placeholder);
		color: var(--foreground-muted);
		pointer-events: none;
		float: left;
		height: 0;
	}

	/* Bold */
	:global(.editor-content strong) {
		font-weight: 600;
		color: var(--foreground);
	}

	/* Italic */
	:global(.editor-content em) {
		font-style: italic;
	}

	/* Underline */
	:global(.editor-content u) {
		text-decoration: underline;
		text-decoration-color: var(--accent);
		text-underline-offset: 3px;
	}

	/* Paragraph spacing */
	:global(.editor-content p) {
		margin: 0 0 0.5rem;
	}
	:global(.editor-content p:last-child) {
		margin-bottom: 0;
	}

	/* Links */
	:global(.editor-content a.editor-link) {
		color: var(--accent);
		text-decoration: underline;
		text-decoration-color: color-mix(in srgb, var(--accent) 50%, transparent);
		text-underline-offset: 3px;
		cursor: pointer;
		transition: text-decoration-color 0.12s;
	}
	:global(.editor-content a.editor-link:hover) {
		text-decoration-color: var(--accent);
	}

	/* Bullet list */
	:global(.editor-content ul) {
		list-style-type: disc;
		padding-left: 1.4rem;
		margin: 0.4rem 0;
	}

	/* Ordered list */
	:global(.editor-content ol) {
		list-style-type: decimal;
		padding-left: 1.4rem;
		margin: 0.4rem 0;
	}

	/* List items */
	:global(.editor-content li) {
		margin: 0.2rem 0;
		line-height: 1.65;
	}

	/* List markers in yellow */
	:global(.editor-content ul li::marker),
	:global(.editor-content ol li::marker) {
		color: var(--accent);
		font-weight: 600;
	}

	/* TipTap selection */
	:global(.editor-content .ProseMirror-selectednode) {
		outline: 2px solid var(--accent);
		border-radius: 2px;
	}
</style>

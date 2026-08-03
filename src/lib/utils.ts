import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { RefinementWithRelations } from '$lib/types';

//type Refinement = InferSelectModel<typeof refinements>;
export type RefinementTreeType = RefinementWithRelations & {
	children: RefinementTreeType[];
};

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, 'child'> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, 'children'> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

// Sleep function for delay
export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

//Build refinement tree function
export function buildRefinementTree(refinement: RefinementWithRelations[]) {
	const map = new Map<string, RefinementTreeType>();
	const roots: RefinementTreeType[] = [];

	refinement.forEach((r) => {
		map.set(r.id, { ...r, children: [] });
	});

	for (const refinement of map.values()) {
		if (refinement.parentRefinementId) {
			const parent = map.get(refinement.parentRefinementId);
			if (parent) {
				parent.children.push(refinement);
			} else {
				roots.push(refinement);
			}
		} else {
			roots.push(refinement);
		}
	}

	return roots;
}

//Date time conversion function

export function timeAgo(date: Date | string): string {
	if (typeof date === 'string') {
		date = new Date(date);
	}

	const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

	if (seconds < 10) return 'just now';

	const intervals = [
		{ label: 'year', seconds: 31536000 },
		{ label: 'month', seconds: 2592000 }, // 30 days
		{ label: 'week', seconds: 604800 },
		{ label: 'day', seconds: 86400 },
		{ label: 'hour', seconds: 3600 },
		{ label: 'minute', seconds: 60 },
		{ label: 'second', seconds: 1 }
	];

	for (const interval of intervals) {
		const count = Math.floor(seconds / interval.seconds);

		if (count >= 1) {
			return `${count} ${interval.label}${count === 1 ? '' : 's'} ago`;
		}
	}

	return 'just now';
}

//Render tiptap

import { generateHTML } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';
import type { JSONContent } from '@tiptap/core';
import { generateText } from '@tiptap/core';

const TipTapExtensions = [
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
	})
];

export function renderTiptapJSON(content: JSONContent) {
	return generateHTML(content, TipTapExtensions);
}

export function getPreview(json: JSONContent, limit = 250) {
	const text = generateText(json, TipTapExtensions);

	return text.length > limit ? text.slice(0, limit) + '...' : text;
}

//Generate usernames

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { RefinementWithRelations } from './server/helpers/post';

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

export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

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

import { type ClassValue, clsx } from 'clsx';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

import { writable, type Writable } from 'svelte/store';

export function getNestedWritable(store: Writable<any>, path: string): Writable<any> {
	const pathArray = path.split('.');

	const { subscribe, set } = writable(undefined, (set) => {
		store.subscribe((obj) => {
			let value = obj;
			for (const key of pathArray) {
				value = value[key];
				if (value === undefined) break;
			}
			set(value);
		});
	});

	return {
		subscribe,
		update(updater) {
			store.update((obj) => {
				let value = obj;
				for (let i = 0; i < pathArray.length - 1; i++) {
					value = value[pathArray[i]];
				}
				value[pathArray[pathArray.length - 1]] = updater(value[pathArray[pathArray.length - 1]]);
				return obj;
			});
		},
		set: (newValue: any) => {
			store.update((obj) => {
				let value = obj;
				for (let i = 0; i < pathArray.length - 1; i++) {
					value = value[pathArray[i]];
				}
				value[pathArray[pathArray.length - 1]] = newValue;
				return obj;
			});
		}
	};
}

export function getNestedValue(obj: Record<string, any>, path: string) {
	const keys = path.split('.');
	let result = obj;

	for (const key of keys) {
		if (result && result[key] !== undefined) {
			result = result[key];
		} else {
			return undefined; // Jika tidak ada nilai, kembalikan undefined
		}
	}

	return result;
}

/**
 * Membuat fungsi yang akan menjalankan fungsi yang diberikan dengan jeda waktu tertentu.
 * Fungsi ini mirip dengan fungsi debounce di lodash.
 *
 * @param func - Fungsi yang akan dijalankan setelah jeda waktu
 * @param wait - Waktu jeda dalam milidetik
 * @returns Fungsi yang telah di-debounce
 */
export function debounce<T extends (...args: any[]) => any>(
	func: T,
	wait: number
): (...args: Parameters<T>) => void {
	let timeout: ReturnType<typeof setTimeout> | null = null;

	return function (this: any, ...args: Parameters<T>) {
		const context = this;

		const later = () => {
			timeout = null;
			func.apply(context, args);
		};

		if (timeout !== null) {
			clearTimeout(timeout);
		}

		timeout = setTimeout(later, wait);
	};
}

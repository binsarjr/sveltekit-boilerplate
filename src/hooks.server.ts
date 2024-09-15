import { STORAGE_KEY } from '@molecules/ThemeProvider.svelte';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const handleThemeProvider: Handle = async ({ event, resolve }) => {
	const theme = event.cookies.get(STORAGE_KEY);
	console.log(theme);

	if (!theme) {
		return await resolve(event);
	}

	return await resolve(event, {
		transformPageChunk: ({ html }) => {
			return html.replace(/<html(.*?)>/, (match, attributes) => {
				const existingClass = attributes.match(/class="([^"]*)"/);
				if (existingClass) {
					return `<html${attributes.replace(/class="([^"]*)"/, `class="$1 ${theme}"`)}>`;
				} else {
					return `<html${attributes} class="${theme}">`;
				}
			});
		}
	});
};

export const handle = sequence(handleThemeProvider);

import _Root from './avatar.svelte';
import Image from './avatar-image.svelte';
import Fallback from './avatar-fallback.svelte';

// @ts-ignore
const Avatar: typeof _Root & {
	Image: typeof Image;
	Fallback: typeof Fallback;
} = _Root;
Avatar.Image = Image;
Avatar.Fallback = Fallback;

export default Avatar;

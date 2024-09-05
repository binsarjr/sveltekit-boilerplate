import _Root from './avatar.svelte';
import Image from './avatar-image.svelte';
import Fallback from './avatar-fallback.svelte';

const Avatar: any = _Root;
Avatar.Image = Image;
Avatar.Fallback = Fallback;

export default Avatar as typeof _Root & {
	Image: typeof Image;
	Fallback: typeof Fallback;
};

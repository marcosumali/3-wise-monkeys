import {writable} from 'svelte/store';

import {HOME} from '../constant/story';

export const index = writable(0);
export const answers = writable([false, false, false]);
export const navRoutes = writable(HOME);
export const isLoading = writable(false);
export const quiz = writable({});
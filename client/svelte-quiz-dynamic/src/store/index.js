import {writable} from 'svelte/store';

export const index = writable(0);
export const answers = writable([false, false, false]);
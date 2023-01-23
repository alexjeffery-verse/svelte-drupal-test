import { writable } from 'svelte/store';
export const posts = writable({
    postData:{},
    link: ''
});
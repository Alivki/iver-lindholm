declare const __LAST_UPDATED__: string;

// Date of the last git commit, injected at build time by vite.config.ts.
export const lastUpdated = new Intl.DateTimeFormat('no-NO').format(new Date(__LAST_UPDATED__));

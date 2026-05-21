import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { execSync } from 'node:child_process';

// Last git commit date, baked in at build time so "Last updated" reflects real changes,
// not the deploy time. Falls back to the build time if git is unavailable.
let lastUpdated: string;
try {
	lastUpdated = execSync('git log -1 --format=%cI', { encoding: 'utf-8' }).trim();
} catch {
	lastUpdated = new Date().toISOString();
}

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	define: {
		__LAST_UPDATED__: JSON.stringify(lastUpdated)
	}
});

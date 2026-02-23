import adapter from "svelte-adapter-bun";
import { mdsvex } from "mdsvex";
import rehypeSlug from "rehype-slug";
import { createHighlighter } from "@svelte-dev/pretty-code";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: [".svelte", ".md"],
	preprocess: [
		mdsvex({
			extensions: [".md"],
			highlight: {
				highlighter: createHighlighter({
					theme: {
						light: "github-light",
						dark: "github-dark-dimmed"
					},
					keepBackground: true
				})
			},
			rehypePlugins: [rehypeSlug]
		})
	],
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;

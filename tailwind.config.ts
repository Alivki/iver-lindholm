import { Config } from "tailwindcss";

export default {
    darkMode: ["class", '[data-kb-theme="dark"]'],
    content: ["./src/**/*.{html,js,jsx,md,mdx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                foreground: 'var(--foreground)',
                foregroundMuted: 'var(--foreground-muted)',
                primary: 'var(--primary)',
                secondary: 'var(--secondary)',
                tertiary: 'var(--tertiary)',
                border: 'var(--border)',
            },
        }
    }
} satisfies Config;
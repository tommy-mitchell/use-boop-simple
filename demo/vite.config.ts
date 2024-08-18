import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react-swc";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";

export default defineConfig({
	base: "/use-boop-simple/",
	css: {
		postcss: {
			plugins: [tailwindcss, autoprefixer],
		},
	},
	plugins: [
		{ enforce: "pre", ...mdx() },
		react(),
	],
});

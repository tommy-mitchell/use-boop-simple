import { fileURLToPath } from "url";

export default {
	extends: [
		"@tommy-mitchell/xo",
		"@tommy-mitchell/xo/react",
		"@tommy-mitchell/xo/tailwind",
		"@tommy-mitchell/xo/dprint",
	],
	settings: {
		tailwindcss: {
			config: fileURLToPath(new URL("demo/tailwind.config.ts", import.meta.url)),
		},
	},
	rules: {
		"@typescript-eslint/naming-convention": "off",
		"simple-import-sort/imports": ["error", {
			groups: [["^\\u0000", "^node:", "^react", "^react-dom", "^@?\\w", "^", "^\\.", "^.+\\.s?css$"]],
		}],
	},
};

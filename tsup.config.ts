import type { Options } from "tsup";

export default {
	clean: true,
	dts: {
		entry: "src/index.ts",
		only: true,
		resolve: true,
	},
	entry: ["src/index.ts"],
	format: "esm",
} satisfies Options;

import pluginTypography from "@tailwindcss/typography";
import withModeAwareColors from "tailwind-mode-aware-colors";
import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";

export default withModeAwareColors({
	content: ["./index.html", "./src/**/*.tsx"],
	darkMode: "selector",
	plugins: [pluginTypography, {
		handler: ({ addUtilities, addVariant }) => {
			addVariant("hocus", ["&:hover", "&:focus-visible"]);
			addVariant("group-hocus", [":merge(.group):hover &", ":merge(.group):focus-visible &"]);
			addUtilities({
				".appearance-textfield": {
					"&::-webkit-inner-spin-button": {
						"-webkit-appearance": "none",
						"margin": "0",
					},
					"&::-webkit-outer-spin-button": {
						"-webkit-appearance": "none",
						"margin": "0",
					},
					"-moz-appearancee": "textfield",
					"-webkit-appearance": "textfield",
					"appearance": "textfield",
				},
			});
		},
	}],
	theme: {
		container: {
			center: true,
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				accent: colors.sky,
				background: {
					active: {
						dark: colors.neutral[800],
						light: colors.white,
					},
					dark: colors.neutral[700],
					light: colors.neutral[50],
				},
				primary: {
					dark: colors.sky[800],
					light: colors.sky[200],
					active: { // eslint-disable-line perfectionist/sort-objects
						dark: colors.sky[900],
						light: colors.sky[300],
					},
					hocus: {
						dark: colors.sky[700],
						light: colors.sky[100],
					},
				},
			},
			textColor: {
				primary: {
					dark: colors.neutral[100],
					light: colors.neutral[950],
				},
				secondary: {
					dark: colors.neutral[200],
					light: colors.neutral[900],
				},
				tertiary: colors.neutral[400],
			},
			typography: {
				DEFAULT: {
					css: {
						a: {
							"@apply text-accent-600 transition-colors duration-75 dark:text-accent-500 hover:text-accent-400": {},
						},
						blockquote: {
							"@apply border-accent-400 text-secondary not-italic dark:border-accent-700 prose-p:after:hidden prose-p:before:hidden":
								{},
						},
						code: {
							"@apply rounded-lg bg-primary px-2 py-1 after:hidden before:hidden xs:whitespace-nowrap": {},
						},
					},
				},
			},
		},
		screens: {
			xs: "475px",
			...defaultTheme.screens,
		},
	},
});

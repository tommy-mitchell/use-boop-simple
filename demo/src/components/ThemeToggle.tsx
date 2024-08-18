import { useEffect, useState } from "react";
import { MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";
import { IconButton } from "./IconButton.tsx";

const QUERY = "(prefers-color-scheme: dark)";

type Theme = "dark" | "light" | "system";

const ICONS_BY_THEME = {
	dark: MoonIcon,
	light: SunIcon,
	system: SunMoonIcon,
} satisfies Record<Theme, React.FC>;

const getTheme = (): Theme => {
	// eslint-disable-next-line @typescript-eslint/ban-types
	const storedMode = localStorage.getItem("theme") as "dark" | "light" | null;
	return storedMode ?? "system";
};

export function ThemeToggle() {
	const [mode, setMode] = useState(getTheme);

	const handleToggle = () => {
		const newMode = mode === "light" ? "dark" : (mode === "dark" ? "system" : "light");
		setMode(newMode);

		if (newMode === "system") {
			localStorage.removeItem("theme");
		} else {
			localStorage.setItem("theme", newMode);
		}

		if (newMode === "dark" || (newMode === "system" && window.matchMedia(QUERY).matches)) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	};

	useEffect(() => {
		const mediaQueryList = window.matchMedia(QUERY);

		const handleMediaQuery = (event: MediaQueryListEvent) => {
			if (mode !== "system") {
				return;
			}

			document.documentElement.classList.toggle("dark", event.matches);
		};

		mediaQueryList.addEventListener("change", handleMediaQuery);
		return () => mediaQueryList.removeEventListener("change", handleMediaQuery);
	}, [mode]);

	const Icon = ICONS_BY_THEME[mode];

	return (
		<IconButton onClick={handleToggle}>
			<Icon className="size-7" />
		</IconButton>
	);
}

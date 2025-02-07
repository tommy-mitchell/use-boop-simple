import { SiGithub, SiNpm } from "@icons-pack/react-simple-icons";
import Favicon from "../assets/favicon.svg?react";
import About from "../content/about.md";
import { BoopInput } from "./BoopInput.tsx";
import { IconButton } from "./IconButton.tsx";
import { Prose } from "./Prose.tsx";
import { ThemeToggle } from "./ThemeToggle.tsx";

export function App() {
	return (
		<div className="flex min-h-svh flex-col gap-6 p-4 *:container sm:mx-8 xl:py-8">
			<header className="flex flex-wrap items-center justify-between gap-4">
				<Prose className="max-xs:prose-sm">
					<h1>
						<code>use-boop-simple</code>
					</h1>
				</Prose>
				<nav className="flex flex-wrap gap-3 md:gap-3.5">
					<IconButton title="made w love by tommy mitchell" href="https://tommymitchell.io" className="mr-[-2px]">
						<Favicon className="size-6 p-[2.5px] dark:invert light:!filter-none" />
					</IconButton>
					<ThemeToggle />
					<IconButton title="GitHub" href="https://github.com/tommy-mitchell/use-boop-simple">
						<SiGithub />
					</IconButton>
					<IconButton title="npm" href="https://www.npmjs.com/package/use-boop-simple">
						<SiNpm className="rounded-md p-px" />
					</IconButton>
				</nav>
			</header>
			<main className="flex flex-col">
				<Prose className="prose-p:first-of-type:mt-0">
					<About />
				</Prose>
				<BoopInput />
			</main>
		</div>
	);
}

import { SiGithub, SiNpm } from "@icons-pack/react-simple-icons";
import About from "../content/about.md";
import { BoopInput } from "./BoopInput.tsx";
import { IconButton } from "./IconButton.tsx";
import { Prose } from "./Prose.tsx";
import { ThemeToggle } from "./ThemeToggle.tsx";

export function App() {
	return (
		<div className="flex h-full flex-col gap-6 p-4 sm:mx-8 xl:py-8">
			<header className="container flex flex-wrap items-center justify-between gap-4">
				<Prose className="max-xs:prose-sm">
					<h1>
						<code>use-boop-simple</code>
					</h1>
				</Prose>
				<nav className="flex flex-wrap gap-3 md:gap-3.5">
					<ThemeToggle />
					<IconButton title="GitHub" href="https://github.com/tommy-mitchell/use-boop-simple">
						<SiGithub />
					</IconButton>
					<IconButton title="npm" href="https://www.npmjs.com/package/use-boop-simple">
						<SiNpm className="rounded-md p-px" />
					</IconButton>
				</nav>
			</header>
			<main className="container flex grow flex-col">
				<Prose className="prose-p:first-of-type:mt-0">
					<About />
				</Prose>
				<BoopInput />
			</main>
		</div>
	);
}

import { twMerge } from "tailwind-merge";

type ProseProps = React.PropsWithChildren<{ className?: string; }>;

export function Prose({ children, className }: ProseProps) {
	return (
		<div className={twMerge("prose *:text-primary", className)}>
			{children}
		</div>
	);
}

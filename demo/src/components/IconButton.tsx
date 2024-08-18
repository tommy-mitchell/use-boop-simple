import { twMerge } from "tailwind-merge";
import { VisuallyHidden } from "./VisuallyHidden";

type IconButtonProps = React.PropsWithChildren<{
	className?: string;
	href?: string;
	title: string;
	onClick?: () => void;
}>;

export function IconButton({ children, className, href, onClick, ...props }: IconButtonProps) {
	const Component = href ? "a" : "button";
	const componentProps = href
		? { href, rel: "noreferrer", target: "_blank" }
		: { onClick, type: "button" } as const;

	return (
		<Component
			className={twMerge(
				`
					grid place-items-center rounded-md outline outline-4 outline-transparent
					transition-[color,background-color,outline-color,box-shadow] duration-100
					*:size-7
					dark:hocus:bg-background-active dark:hocus:outline-background-active dark:hocus:text-accent-500
					hocus:bg-primary hocus:outline-primary hocus:text-accent-900
					md:*:size-8
				`,
				className,
			)}
			{...componentProps}
			{...props}
		>
			<VisuallyHidden>{props.title}</VisuallyHidden>
			{children}
		</Component>
	);
}

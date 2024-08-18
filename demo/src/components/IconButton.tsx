import { twMerge } from "tailwind-merge";

type IconButtonProps = React.PropsWithChildren<{
	className?: string;
	href?: string;
	onClick?: () => void;
}>;

export function IconButton({ className, href, onClick, ...props }: IconButtonProps) {
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
					dark:hocus:bg-background-active dark:hocus:outline-background-active dark:hocus:text-accent-500
					hocus:bg-primary hocus:outline-primary hocus:text-accent-900
				`,
				className,
			)}
			{...componentProps}
			{...props}
		/>
	);
}

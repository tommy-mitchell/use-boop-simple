import { twMerge } from "tailwind-merge";
import type { UseBoopOptions } from "use-boop-simple";
import { Boop, type BoopProps } from "./Boop.tsx";
import { VisuallyHidden } from "./VisuallyHidden.tsx";

type IconProps =
	& Omit<BoopProps, keyof UseBoopOptions>
	& Readonly<{
		as: React.ComponentType<React.ComponentProps<"svg">>;
		boop: UseBoopOptions;
		className?: string;
		label: string;
	}>;

export function Icon({ as: IconComponent, boop, className, label, ...props }: IconProps) {
	return (
		<Boop {...boop} {...props}>
			<IconComponent
				aria-hidden="true"
				className={twMerge(
					`
						h-auto w-16 transition-colors duration-100 text-accent-300
						dark:text-accent-500 dark:group-disabled:!text-accent-700 dark:group-hocus:text-accent-400
						group-disabled:!text-accent-200 group-disabled:cursor-not-allowed
						group-hocus:text-accent-500
					`,
					className,
				)}
				focusable="false"
			/>
			<VisuallyHidden>{label}</VisuallyHidden>
		</Boop>
	);
}

import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { useBoop, type UseBoopOptions } from "use-boop-simple";

export type BoopProps =
	& Omit<React.ComponentProps<"button">, "onClick" | "type">
	& Readonly<{
		trigger?: boolean;
		onClick?: () => void;
	}>
	& UseBoopOptions;

export function Boop({
	className,
	friction,
	onClick,
	rotate,
	scale,
	tension,
	timing,
	trigger,
	x,
	y,
	...props
}: BoopProps) {
	const boopOptions = { friction, rotate, scale, tension, timing, x, y };
	const [style, boopTrigger] = useBoop(boopOptions);

	useEffect(() => {
		if (trigger) {
			boopTrigger();
		}
	}, [boopTrigger, trigger]);

	const triggers = props.disabled ? {} : {
		onFocus: boopTrigger,
		onPointerEnter: boopTrigger,
	};

	return (
		<button
			type="button"
			className={twMerge("group z-50 block w-fit outline-offset-2 will-change-transform", className)}
			style={style}
			onClick={() => {
				boopTrigger();
				onClick?.();
			}}
			{...triggers}
			{...props}
		/>
	);
}

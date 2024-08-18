import * as SliderPrimitive from "@radix-ui/react-slider";
import { twMerge } from "tailwind-merge";

type SliderProps =
	& Omit<React.ComponentProps<typeof SliderPrimitive.Root>, "disabled" | "onChange" | "onValueChange" | "value">
	& Readonly<{
		value: number;
		onChange: (value: number) => void;
	}>;

export function Slider({ className, onChange, value, ...props }: SliderProps) {
	return (
		<SliderPrimitive.Root
			className={twMerge(
				"relative flex h-5 cursor-pointer touch-none select-none items-center",
				className,
			)}
			value={[value]}
			onValueChange={([value]) => onChange(value!)}
			{...props}
		>
			<SliderPrimitive.Track
				className={twMerge(
					`
						relative h-2 w-full grow overflow-hidden rounded-full bg-accent-200
						dark:bg-accent-800 dark:outline dark:outline-1 dark:outline-neutral-800
					`,
					value === props.min && "dark:ml-px",
					value === props.max && "dark:max-w-[99%]",
				)}
			>
				<SliderPrimitive.Range className="absolute h-full bg-accent-600 dark:bg-accent-600" />
			</SliderPrimitive.Track>
			<SliderPrimitive.Thumb
				className={`
					block size-5 rounded-full border-2 border-accent-400 bg-background transition-colors
					focus-visible:outline-none focus-visible:outline-blue-600 focus-visible:bg-accent-400
					hover:bg-accent-400
					light:focus-visible:border-black
				`}
			/>
		</SliderPrimitive.Root>
	);
}

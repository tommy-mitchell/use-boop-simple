import { useId, useState } from "react";
import { NumberInput } from "./NumberInput.tsx";
import { ResetButton } from "./ResetButton.tsx";
import { Slider } from "./Slider.tsx";

type NumberSliderProps =
	& Omit<React.ComponentProps<typeof Slider>, "id">
	& Readonly<{
		label: string;
	}>;

export function NumberSlider({ label, onChange, value, ...props }: NumberSliderProps) {
	const [initial] = useState(value); // eslint-disable-line react/hook-use-state

	const id = useId();
	const labelId = useId();

	return (
		<div className="grid gap-3 xs:gap-1">
			<div className="flex flex-wrap items-center gap-1.5">
				<label id={labelId} htmlFor={id} className="grow capitalize leading-none hover:cursor-pointer">
					{label}
				</label>
				{value !== initial && <ResetButton onReset={() => onChange(initial)} />}
				<NumberInput
					id={id}
					className={`
						w-14 rounded-md border bg-background px-1 text-right transition-colors appearance-textfield border-accent-200
						dark:border-neutral-900 dark:hocus:border-neutral-900
						hocus:bg-background-active hocus:border-accent-300
					`}
					min={props.min}
					max={props.max}
					value={value}
					onChange={onChange}
				/>
			</div>
			<Slider
				id={id}
				aria-labelledby={labelId}
				value={value}
				onChange={onChange}
				{...props}
			/>
		</div>
	);
}

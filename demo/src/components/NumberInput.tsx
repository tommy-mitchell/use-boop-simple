import { useCallback } from "react";

const removeLeadingZeros = (value: string) => value.replace(/^0+/, "");

type NumberInputProps =
	& Omit<React.ComponentProps<"input">, "onChange" | "type">
	& Readonly<{
		onChange: (value: number) => void;
	}>;

export function NumberInput({ onChange, ...props }: NumberInputProps) {
	const { max: rawMax, min: rawMin } = props;

	const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const min = Number(rawMin);
		const max = Number(rawMax);

		let value = Number(removeLeadingZeros(event.target.value));

		if (Number.isNaN(min) && value < 0) {
			value = 0;
		} else if (value < min) {
			value = min;
		} else if (value > max) {
			value = max;
		}

		event.target.value = value.toString();
		onChange(value);
	}, [onChange, rawMax, rawMin]);

	return (
		<input
			type="number"
			onChange={handleChange}
			{...props}
		/>
	);
}

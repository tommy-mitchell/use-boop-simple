import { RotateCcwIcon } from "lucide-react";
import { Icon } from "./Icon.tsx";

type ResetButtonProps = Readonly<{
	disabled?: boolean;
	onReset: () => void;
}>;

export function ResetButton({ disabled, onReset }: ResetButtonProps) {
	return (
		<Icon
			disabled={disabled}
			as={RotateCcwIcon}
			className="w-7"
			boop={{ rotate: -17.5 }}
			label="Reset"
			onClick={onReset}
		/>
	);
}

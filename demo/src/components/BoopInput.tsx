import { useState } from "react";
import type { UseBoopOptions } from "use-boop-simple";
import { Boop } from "./Boop.tsx";
import { NumberSlider } from "./NumberSlider.tsx";
import { ResetButton } from "./ResetButton.tsx";

/* eslint-disable perfectionist/sort-objects */
const INITIAL_BOOP_OPTIONS: Required<UseBoopOptions> = {
	x: 15,
	y: 0,
	rotate: 30,
	scale: 1,
	tension: 500,
	friction: 10,
	timing: 150,
};
/* eslint-enable perfectionist/sort-objects */

const isInitial = (boopOptions: UseBoopOptions) => (
	Object.entries(boopOptions).every(([key, value]) => INITIAL_BOOP_OPTIONS[key as keyof UseBoopOptions] === value)
);

export function BoopInput() {
	const [boopOptions, setBoopOptions] = useState(INITIAL_BOOP_OPTIONS);
	const [trigger, setTrigger] = useState(false);

	const handleChange = (key: keyof UseBoopOptions) => (value: number) => {
		setBoopOptions({ ...boopOptions, [key]: value });
	};

	const getProps = (key: keyof UseBoopOptions) => ({
		label: key,
		onChange: handleChange(key),
		value: boopOptions[key],
	});

	return (
		<div className="flex grow flex-col items-center gap-4 md:grid md:grid-cols-2 md:place-items-center md:gap-6">
			<div
				className={`
					relative flex size-full flex-col gap-4 rounded-xl border-2 border-dashed p-4 border-accent-400
					max-md:pt-2
					md:justify-center
				`}
			>
				<p className="left-4 top-2 text-tertiary md:absolute">
					Interact to <em>boop!</em> Or click the button in the controls.
				</p>
				<Boop className="self-center" trigger={trigger} {...boopOptions}>
					<span className="text-[48px]">👋</span>
				</Boop>
			</div>
			<div className="grid size-full place-items-center rounded-xl border border-accent-400 p-4 md:px-8">
				<form className="grid w-full grid-cols-2 gap-x-6 gap-y-4 text-secondary 2xl:grid-cols-1 lg:gap-6 max-xs:grid-cols-1">
					<NumberSlider {...getProps("x")} min={-50} max={50} />
					<NumberSlider {...getProps("y")} min={-50} max={50} />
					<NumberSlider {...getProps("rotate")} max={360} />
					<NumberSlider {...getProps("scale")} min={-5} max={5} step={.1} />
					<NumberSlider {...getProps("tension")} step={10} min={1} max={1000} />
					<NumberSlider {...getProps("friction")} min={1} max={100} />
					<NumberSlider {...getProps("timing")} min={0} max={1000} step={50} />
					<div className="flex items-center gap-2 self-end max-xs:-order-1">
						<button
							type="button"
							className={`
								grow rounded border border-accent-600 bg-primary px-2 transition-colors text-primary
								active:!border-accent-700 active:!bg-primary-active
								hocus:border-accent-500 hocus:bg-primary-hocus
							`}
							onClick={() => {
								setTrigger(true);
								setTimeout(() => setTrigger(false), 0);
							}}
						>
							boop!
						</button>
						<ResetButton disabled={isInitial(boopOptions)} onReset={() => setBoopOptions(INITIAL_BOOP_OPTIONS)} />
					</div>
				</form>
			</div>
		</div>
	);
}

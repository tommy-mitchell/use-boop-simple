"use client";
import { useEffect, useState } from "react";
import { Spring } from "wobble";

const ensureMinimumOfOne = (value?: number) => value ? Math.max(value, 1) : undefined;

// eslint-disable-next-line @typescript-eslint/ban-types
const omitUndefined = <T extends object>(object: T): Record<string, unknown> => {
	const result: Partial<Record<string, unknown>> = {};

	for (const [key, value] of Object.entries(object)) {
		if (value !== undefined) {
			result[key] = value;
		}
	}

	return result;
};

export type SpringConfig = {
	/** Defines how the spring's motion should be damped due to the forces of friction. @default 10 */
	damping?: number;
	/** The mass of the object attached to the end of the spring. @default 1 */
	mass?: number;
	/** The spring stiffness coefficient. @default 100 */
	stiffness?: number;
};

type UseSpringOptions = {
	config?: SpringConfig;
	from: number;
	to?: number;
};

export function useSpring({ config, from: fromValue, to: toValue = fromValue }: UseSpringOptions): number {
	const [value, setValue] = useState(fromValue);

	const damping = ensureMinimumOfOne(config?.damping);
	const mass = ensureMinimumOfOne(config?.mass);
	const stiffness = ensureMinimumOfOne(config?.stiffness);

	// eslint-disable-next-line react/hook-use-state -- memoize the spring instance
	const [spring] = useState(() => (
		new Spring(omitUndefined({ damping, fromValue, mass, stiffness, toValue }))
			.onUpdate(s => setValue(s.currentValue))
	));

	useEffect(() => {
		spring.updateConfig({ fromValue: spring.currentValue, toValue }).start();
	}, [spring, toValue]);

	useEffect(() => {
		spring.updateConfig(omitUndefined({ damping, mass, stiffness }));
	}, [damping, mass, spring, stiffness]);

	return value;
}

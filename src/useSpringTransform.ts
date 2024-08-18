"use client";
import type { Transform } from "./types.js";
import { type SpringConfig, useSpring } from "./useSpring.js";

type UseSpringTransformOptions = {
	config?: SpringConfig;
	isBooped: boolean;
} & Transform;

export function useSpringTransform({
	config,
	isBooped,
	rotate,
	scale,
	x,
	y,
}: UseSpringTransformOptions) {
	const xValue = useSpring({ config, from: 0, to: isBooped ? x : 0 });
	const yValue = useSpring({ config, from: 0, to: isBooped ? y : 0 });
	const scaleValue = useSpring({ config, from: 1, to: isBooped ? scale : 1 });
	const rotateValue = useSpring({ config, from: 0, to: isBooped ? rotate : 0 });

	return `translate(${xValue}px, ${yValue}px) rotate(${rotateValue}deg) scale(${scaleValue})` as const;
}

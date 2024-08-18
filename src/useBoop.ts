"use client";
import { useCallback, useEffect, useState } from "react";
import type { Transform } from "./types.js";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion.js";
import { useSpringTransform } from "./useSpringTransform.js";

export type UseBoopOptions = {
	/**
	 * Damping of the spring's motion due to the forces of friction.
	 * @note Clamped to a minimum value of `1`
	 * @default 10
	 */
	friction?: number;

	/**
	 * Stiffness of the spring.
	 * @note Clamped to a minimum value of `1`
	 * @default 300
	 */
	tension?: number;

	/**
	 * How long the boop effect should last, in milliseconds, before animating back to the original state.
	 * @default 150
	 */
	timing?: number;
} & Partial<Transform>;

export type UseBoopReturnValue = [
	style: { transform?: string; },
	trigger: () => void,
];

/**
 * A hook that returns a tuple containing a CSS style object and a function to trigger the [boop](https://www.joshwcomeau.com/react/boop) effect.
 * The style object should be applied to the element you want to animate.
 *
 * Respects the user's preference for reduced motion. If the user prefers reduced motion, the style object will be empty.
 *
 * @example
 * ```jsx
 * import { useBoop } from "use-boop-simple";
 *
 * function Boop({ children }) {
 *   const [style, trigger] = useBoop({ rotate: 15 });
 *   //     ^? { transform: "translate(Xpx, Ypx) rotate(Rdeg) scale(S)" }
 *
 *   return (
 *     <span style={style} onMouseEnter={trigger}>
 *       {children}
 *     </span>
 *   );
 * }
 * ```
 */
export function useBoop({
	friction: damping = 10,
	rotate = 0,
	scale = 1,
	tension: stiffness = 300,
	timing = 150,
	x = 0,
	y = 0,
}: UseBoopOptions): UseBoopReturnValue {
	const [isBooped, setIsBooped] = useState(false);
	const prefersReducedMotion = usePrefersReducedMotion();

	const transform = useSpringTransform({
		config: { damping, stiffness },
		isBooped,
		rotate,
		scale,
		x,
		y,
	});

	const trigger = useCallback(() => {
		if (!prefersReducedMotion) {
			setIsBooped(true);
		}
	}, [prefersReducedMotion]);

	useEffect(() => {
		if (!isBooped) {
			return;
		}

		const timeoutId = window.setTimeout(() => {
			setIsBooped(false);
		}, timing);

		return () => window.clearTimeout(timeoutId);
	}, [isBooped, timing]);

	const appliedStyled = prefersReducedMotion ? {} : { transform };
	return [appliedStyled, trigger];
}

"use client";
import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion)";

const isRenderingOnServer = typeof window === "undefined";

const getInitialState = () => isRenderingOnServer || window.matchMedia(QUERY).matches;

/**
 * Returns a boolean indicating whether the user prefers reduced motion.
 *
 * Reflects the current state of the `prefers-reduced-motion` media query.
 *
 * @note Always returns `true` when rendering on the server.
 */
export function usePrefersReducedMotion() {
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(getInitialState);

	useEffect(() => {
		const mediaQueryList = window.matchMedia(QUERY);

		const handleMediaQuery = (event: MediaQueryListEvent) => {
			setPrefersReducedMotion(event.matches);
		};

		mediaQueryList.addEventListener("change", handleMediaQuery);
		return () => mediaQueryList.removeEventListener("change", handleMediaQuery);
	}, []);

	return prefersReducedMotion;
}

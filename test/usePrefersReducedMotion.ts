import { act, renderHook } from "@testing-library/react";
import test from "ava";
import * as tq from "test-quadruple";
import { usePrefersReducedMotion } from "../src/usePrefersReducedMotion.js";

// https://github.com/pmndrs/react-spring/blob/main/packages/shared/src/hooks/useReducedMotion.test.ts

type MediaQueryHandler = (mediaQuery: MediaQueryList) => void;
let events: Record<string, MediaQueryHandler> = {};

test.afterEach("reset events", () => {
	events = {};
});

const removeEventListenerMock = tq.spy();

const mediaQueryDefaults = tq.mock<MediaQueryList>({
	addEventListener: tq.spy((name, handler) => {
		events[name] = handler; // eslint-disable-line @typescript-eslint/no-unsafe-assignment
	}),
	matches: false,
	onchange: null,
	removeEventListener: removeEventListenerMock,
});

test("returns true when `prefers-reduced-motion: reduce`", t => {
	window.matchMedia = tq.spy((query: string) => ({
		...mediaQueryDefaults,
		matches: true,
		media: query,
	}));

	const { result } = renderHook(usePrefersReducedMotion);
	t.true(result.current);
});

test.todo("returns true on server");

test("returns false when `prefers-reduced-motion: no-preference`", t => {
	window.matchMedia = tq.spy((query: string) => ({
		...mediaQueryDefaults,
		media: query,
	}));

	const { result } = renderHook(usePrefersReducedMotion);
	t.false(result.current);
});

test("handles change of `prefers-reduce-motion` value", t => {
	window.matchMedia = tq.spy((query: string) => ({
		...mediaQueryDefaults,
		media: query,
	}));

	const { result } = renderHook(usePrefersReducedMotion);
	t.false(result.current);

	act(() => {
		events["change"]?.({
			...mediaQueryDefaults,
			matches: true,
		});
	});

	t.true(result.current);
});

test("cleans up event listeners when the component is unmounted", t => {
	window.matchMedia = tq.spy((query: string) => ({
		...mediaQueryDefaults,
		media: query,
	}));

	const { unmount } = renderHook(usePrefersReducedMotion);

	t.false(tq.explain(removeEventListenerMock).called);

	unmount();

	t.true(tq.explain(removeEventListenerMock).called);
});

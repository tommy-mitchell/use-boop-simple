import { act, renderHook } from "@testing-library/react";
import { useSpringTransform } from "../src/useSpringTransform.js";
import { test } from "./_utils.js";

const DEFAULTS = { isBooped: true, rotate: 0, scale: 1, x: 0, y: 0 };

test("returns CSS transform string", t => {
	const { result } = renderHook(() => useSpringTransform({ isBooped: true, rotate: 5, scale: -1, x: 1, y: 2 }));

	t.is(result.current, "translate(0px, 0px) rotate(0deg) scale(1)");

	act(() => {
		t.context.advanceFrames(80);
	});

	t.is(result.current, "translate(1px, 2px) rotate(5deg) scale(-1)");
});

test("returns to default when not booped", t => {
	const { rerender, result } = renderHook(
		({ isBooped }) => useSpringTransform({ ...DEFAULTS, isBooped, x: 5 }),
		{ initialProps: { isBooped: true } },
	);

	act(() => {
		t.context.advanceFrames(80);
	});

	t.is(result.current, "translate(5px, 0px) rotate(0deg) scale(1)");

	act(() => {
		rerender({ isBooped: false });
	});

	act(() => {
		t.context.advanceFrames(80);
	});

	t.is(result.current, "translate(0px, 0px) rotate(0deg) scale(1)");
});

test("updates if a value changes", t => {
	const { rerender, result } = renderHook(
		({ rotate }) => useSpringTransform({ ...DEFAULTS, rotate }),
		{ initialProps: { rotate: 0 } },
	);

	act(() => {
		t.context.advanceFrames(80);
	});

	t.is(result.current, "translate(0px, 0px) rotate(0deg) scale(1)");

	act(() => {
		rerender({ rotate: 5 });
	});

	act(() => {
		t.context.advanceFrames(80);
	});

	t.is(result.current, "translate(0px, 0px) rotate(5deg) scale(1)");
});

test("passes config to springs", t => {
	const { result } = renderHook(() => useSpringTransform({ ...DEFAULTS, config: { damping: 1 }, x: 1 }));

	act(() => {
		t.context.advanceFrames(80);
	});

	t.not(result.current, "translate(1px, 0px) rotate(0deg) scale(1)");
});

import { act, renderHook } from "@testing-library/react";
import * as tq from "test-quadruple";
import { useBoop, type UseBoopOptions } from "../src/useBoop.js";
import { test } from "./_utils.js";

test("boop is triggered and untriggers after default timing", t => {
	const { result } = renderHook(() => useBoop({ x: 10 }));

	const style = () => result.current[0];
	const trigger = () => result.current[1]();

	act(() => {
		trigger();
	});

	t.is(style().transform, "translate(0px, 0px) rotate(0deg) scale(1)");

	act(() => {
		t.context.clock.tick(150);
	});

	t.snapshot(style());

	act(() => {
		t.context.advanceFrames(100);
	});

	t.is(style().transform, "translate(0px, 0px) rotate(0deg) scale(1)");
});

test("custom timing", t => {
	const { result } = renderHook(() => useBoop({ friction: 90, rotate: 7.5, scale: -2, timing: 1000, x: 100, y: 200 }));

	const style = () => result.current[0];
	const trigger = () => result.current[1]();

	act(() => {
		trigger();
	});

	act(() => {
		t.context.clock.tick(1000);
	});

	t.is(style().transform, "translate(100px, 200px) rotate(7.5deg) scale(-2)");

	act(() => {
		t.context.advanceFrames(100);
	});

	t.is(style().transform, "translate(0px, 0px) rotate(0deg) scale(1)");
});

test("updated fields", t => { // also timing - check clearTimeout
	const { rerender, result } = renderHook((props: UseBoopOptions) => useBoop(props), { initialProps: {} });

	const style = () => result.current[0];
	const trigger = () => result.current[1]();

	act(() => {
		trigger();
	});

	act(() => {
		t.context.clock.tick(150);
	});

	t.is(style().transform, "translate(0px, 0px) rotate(0deg) scale(1)");

	act(() => {
		rerender({ rotate: 90 });
		trigger();
	});

	act(() => {
		t.context.clock.tick(150);
	});

	t.snapshot(style());

	act(() => {
		rerender({ scale: 2, tension: 500 });
		trigger();
	});

	act(() => {
		t.context.clock.tick(150);
	});

	t.snapshot(style());

	act(() => {
		rerender({ friction: 20, x: 100 });
		trigger();
	});

	act(() => {
		t.context.clock.tick(150);
	});

	t.snapshot(style());

	act(() => {
		rerender({ timing: 10, y: 100 });
		trigger();
	});

	act(() => {
		t.context.clock.tick(10);
	});

	t.snapshot(style());

	act(() => {
		t.context.advanceFrames(100);
	});

	t.is(style().transform, "translate(0px, 0px) rotate(0deg) scale(1)");
});

test("doesn't apply transform when `prefers-reduced-motion: reduce`", t => {
	let onChange: tq.AnyFunction;

	window.matchMedia = query => (
		tq.mock<MediaQueryList>({
			addEventListener: tq.spy((_, handler) => {
				onChange = handler; // eslint-disable-line @typescript-eslint/no-unsafe-assignment
			}),
			matches: true,
			media: query,
			removeEventListener: tq.spy(),
		})
	);

	const { result } = renderHook(() => useBoop({}));

	const style = () => result.current[0];

	t.is(style().transform, undefined);

	act(() => {
		onChange(tq.mock<MediaQueryListEvent>({ matches: false }));
	});

	t.is(style().transform, "translate(0px, 0px) rotate(0deg) scale(1)");
});

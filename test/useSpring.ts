import { act, renderHook } from "@testing-library/react";
import * as tq from "test-quadruple";
import { type SpringConfig, useSpring } from "../src/useSpring.js";
import { test } from "./_utils.js";

test("animates between \"from\" and \"to\" values", t => {
	const { result } = renderHook(() => useSpring({ from: 0, to: 1 }));
	t.is(result.current, 0);

	act(() => {
		t.context.advanceFrames(60);
	});

	t.is(result.current, 1);
});

test("does not error without \"to\" - set to \"from\"", t => {
	const { result } = renderHook(() => useSpring({ from: 7 }));
	t.is(result.current, 7);

	act(() => {
		t.context.advanceFrames(60);
	});

	t.is(result.current, 7);
});

test("restarts at current value when \"to\" changes", t => {
	const { rerender, result } = renderHook(({ to }) => useSpring({ from: 3, to }), { initialProps: { to: 2 } });
	t.is(result.current, 3);

	act(() => {
		t.context.advanceFrames(60);
		rerender({ to: 1 });
	});

	t.is(result.current, 2);

	act(() => {
		t.context.advanceFrames(60);
	});

	t.is(result.current, 1);
});

for (const setting of ["damping", "mass", "stiffness"] satisfies Array<keyof SpringConfig>) {
	test(`does not error if "${setting}" is less than 1`, t => {
		t.notThrows(() => {
			renderHook(() => useSpring({ config: { [setting]: 0.5 }, from: 0 }));
		});
	});
}

test("updates spring when config changes", t => {
	const { result: control } = renderHook(() => useSpring({ from: 0, to: 5 }));

	const { rerender, result } = renderHook(
		({ damping }) => useSpring({ config: { damping }, from: 0, to: 5 }),
		{ initialProps: { damping: 10 } },
	);

	t.is(control.current, result.current);

	act(() => {
		t.context.advanceFrames(10);
	});

	t.is(control.current, result.current);

	act(() => {
		rerender({ damping: 1 });
	});

	t.is(control.current, result.current);

	act(() => {
		t.context.advanceFrames(10);
	});

	t.not(control.current, result.current);
});

test.todo("uses wobble defaults if undefined");

class Spring {
	static instances = 0;

	onUpdate = tq.returns(this);

	updateConfig = tq.returns({ start: tq.noop() });

	constructor() {
		Spring.instances += 1;
	}
}

test("spring instance is only created once", async t => {
	// eslint-disable-next-line @typescript-eslint/consistent-type-imports
	const { useSpring } = await tq.replace<typeof import("../src/useSpring.js")>({
		importMeta: import.meta,
		localMocks: { wobble: { Spring } },
		modulePath: "../src/useSpring.ts",
	});

	t.is(Spring.instances, 0);

	const { rerender } = renderHook(() => useSpring({ from: 0, to: 1 }));

	t.is(Spring.instances, 1);

	act(() => {
		t.context.advanceFrames(60);
	});

	t.is(Spring.instances, 1);

	act(() => {
		rerender();
	});

	t.is(Spring.instances, 1);

	renderHook(() => useSpring({ from: 1, to: 0 }));

	t.is(Spring.instances, 2);
});

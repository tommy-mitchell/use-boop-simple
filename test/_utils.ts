import FakeTimers from "@sinonjs/fake-timers";
import { cleanup } from "@testing-library/react";
import anyTest, { type TestFn } from "ava";

export const test = anyTest as TestFn<{
	advanceFrames: (frames: number) => void;
	clock: FakeTimers.InstalledClock;
}>;

test.beforeEach("install clock", t => {
	t.context.clock = FakeTimers.install();

	t.context.advanceFrames = (frames) => {
		// https://github.com/skevy/wobble/blob/develop/src/__tests__/Springs-test.ts#L327
		t.context.clock.tick(Math.round(1000 / 60 * frames / 16) * 16);
	};
});

test.afterEach.always("reset clock", t => {
	t.context.clock.uninstall();
});

test.afterEach(cleanup);

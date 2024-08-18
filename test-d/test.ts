/* eslint-disable react-hooks/rules-of-hooks */
import { expectAssignable, expectType } from "tsd";
import { useBoop, type UseBoopOptions, type UseBoopReturnValue, usePrefersReducedMotion } from "use-boop-simple";

expectAssignable<UseBoopOptions>({});
expectAssignable<UseBoopOptions>({ friction: 10 });
expectAssignable<UseBoopOptions>({ rotate: 15 });
expectAssignable<UseBoopOptions>({ scale: 1 });
expectAssignable<UseBoopOptions>({ tension: 300 });
expectAssignable<UseBoopOptions>({ timing: 150 });
expectAssignable<UseBoopOptions>({ x: 0 });
expectAssignable<UseBoopOptions>({ y: 0 });

const [style, trigger] = useBoop({ rotate: 15 });

expectType<{ transform?: string; }>(style);
expectType<() => void>(trigger);

expectType<UseBoopReturnValue>(useBoop({}));

expectType<boolean>(usePrefersReducedMotion());

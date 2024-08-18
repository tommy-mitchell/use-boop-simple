import "global-jsdom/register";
import * as tq from "test-quadruple";

window.matchMedia ??= query => (
	tq.mock<MediaQueryList>({
		addEventListener: tq.spy(),
		matches: false,
		media: query,
		onchange: null,
		removeEventListener: tq.spy(),
	})
);

# use-boop-simple

Minimal React hook for [Josh W. Comeau's "Boop" effect](https://www.joshwcomeau.com/react/boop).

Designed with bundle size in mind - less than [2.3KB gzipped](https://pkg-size.dev/use-boop-simple?no-peers)!

<details>
<summary>Bundle Size Comparisons</summary>
<p>

`use-boop-simple` itself is less than 1.5KB gzipped.

Internally, `use-boop-simple` uses [`wobble`](https://github.com/skevy/wobble) for spring physics, which is [1.5-1.7KB gzipped](https://pkg-size.dev/wobble).

Comparatively, animation libraries like [React Spring](https://www.react-spring.dev) and [Framer Motion](https://www.framer.com/motion) are far larger:

- `@react-spring/web`: [20-25KB gzipped](https://pkg-size.dev/@react-spring%2Fweb?no-peers)
- `framer-motion`: [~50KB gzipped](https://pkg-size.dev/framer-motion)

</p>
</details>

## Install

```sh
npm install use-boop-simple
```

<details>
<summary>Other Package Managers</summary>
<p>

```sh
yarn add use-boop-simple
```

```sh
pnpm add use-boop-simple
```

</p>
</details>

## Usage

```jsx
import { useBoop } from "use-boop-simple";

function Boop({ children }) {
  const [style, trigger] = useBoop({ rotate: 15 });
  //     ^? { transform: "translate(Xpx, Ypx) rotate(Rdeg) scale(S)" }

  return (
    <span style={style} onMouseEnter={trigger}>
      {children}
    </span>
  );
}
```

## API

### useBoop(options): [style, trigger]

A hook that returns a tuple containing a CSS style object and a function to trigger the boop effect. The style object should be applied to the element you want to animate.

Respects the user's preference for reduced motion. If the user prefers reduced motion, the style object will be empty.

#### options

Type: `object`

##### x

Type: `number`\
Default: `0`

The target value to translate towards on the x-axis.

##### y

Type: `number`\
Default: `0`

The target value to translate towards on the y-axis.

##### rotate

Type: `number`\
Default: `0`

The target value to rotate towards.

##### scale

Type: `number`\
Default: `1`

The target value to scale towards.

##### tension

Type: `number`\
Default: `300`

Stiffness of the spring.

##### friction

Type: `number`\
Default: `10`

Damping of the spring's motion due to the forces of friction.

##### timing

Type: `number`\
Default: `150`

How long the boop effect should last, in milliseconds, before animating back to the original state.

### usePrefersReducedMotion()

A hook that returns a boolean indicating whether the user prefers reduced motion.

Reflects the current state of the `prefers-reduced-motion` media query.

## Limitations

- Does not support all possible transform values (e.g. `skew`, 3D transforms, transformations on individual axes, etc.)

- Does not support configuring the mass of the spring

- Does not support advanced spring configuration (overdamping, rest velocity/displacement thresholds)

- Currently uses `useEffect` instead of `useLayoutEffect` (see [React Spring's `useIsomorphicLayout`](https://www.react-spring.dev/docs/utilities/use-isomorphic-layout-effect#why-do-we-need-this) for more information)

## Development

Requires pnpm 9.

## Related

- [use-boop](https://github.com/remziatay/use-boop) - Extended react hook for Josh Comeau's boop effect. Uses React Spring.
- [react-spring](https://github.com/pmndrs/react-spring) - A spring physics based React animation library.
- [framer-motion](https://github.com/framer/motion) - Open source, production-ready animation and gesture library for React.

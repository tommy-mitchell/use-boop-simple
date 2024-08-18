export type Transform = {
	/**
	 * The target value to rotate towards.
	 * @default 0
	 */
	rotate: number;

	/**
	 * The target value to scale towards.
	 * @default 1
	 */
	scale: number;

	/**
	 * The target value to translate towards on the x-axis.
	 * @default 0
	 */
	x: number;

	/**
	 * The target value to translate towards on the y-axis.
	 * @default 0
	 */
	y: number;
};

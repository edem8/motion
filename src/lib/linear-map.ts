export function linearMap(
	x: number,
	inMin: number,
	inMax: number,
	outMin: number,
	outMax: number,
) {
	return ((x - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

import clsx from "clsx";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

const WINDOW_SIZE = 150;
const checkpoint = 2 * WINDOW_SIZE;
const mid = checkpoint;
const l2 = mid + WINDOW_SIZE;
const l1 = mid - WINDOW_SIZE;

export default function Ebay() {
	const { height, width } = useVideoConfig();

	return (
		<div style={{ width, height }} className="bg-yellow-500">
			<Text text="Sports" index={0} />
			<Text text="Fashion" index={1} />
			<Text text="Home" index={2} />
			<Text text="Collectibles" index={3} />
			<Text text="Garden" index={4} />
			<Text text="Toys" index={5} />
			<Text text="Motors" index={6} />
			<Text text="Refurbished" index={7} />
			<Text text="Antiques" index={8} />
			<Text text="Comic" index={9} />

			<div className="text-8xl absolute top-[33%] left-10 text-yellow-950">
				🡪
			</div>
			{/*
			<DebugLine top={l1} />
			<DebugLine top={mid} className="!border-green-500" />
			<DebugLine top={l2} className="border-red-500" /> */}
		</div>
	);
}

interface TextProps {
	text: string;
	index: number;
}

const CYCLE_SPAN = 1;
const WAIT_DURATION = 40;
function Text({ text, index }: TextProps) {
	const { fps } = useVideoConfig();
	const frame = useCurrentFrame();

	const cycle = fps * CYCLE_SPAN;

	const stop = -Math.floor(frame / cycle);

	const pointInCycle = frame % cycle;
	const adjust =
		pointInCycle < WAIT_DURATION
			? 0
			: interpolate(
					(pointInCycle - WAIT_DURATION) / (cycle - WAIT_DURATION),
					[0, 1],
					[0, 1],
					{ easing: Easing.cubic },
				);

	const p = (stop - adjust + index) * WINDOW_SIZE;

	const l = p >= l1 && p <= l2 ? linearMap(Math.abs(mid - p), 150, 0, 0, 1) : 0;

	return (
		<>
			<div
				className={clsx("absolute text-9xl font-bold p-10 text-yellow-950")}
				style={{
					top: p,
					left: l * 130,
					opacity:
						p < checkpoint
							? Math.max(0.3, Math.abs(p / checkpoint))
							: Math.max(0.3, Math.abs(checkpoint / p)),
				}}
			>
				{text}
			</div>
			{/* {text === "Home" && <DebugLine top={p} className="!border-slate-500" />} */}
		</>
	);
}

function linearMap(
	x: number,
	inMin: number,
	inMax: number,
	outMin: number,
	outMax: number,
) {
	return ((x - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

import {
	Easing,
	interpolate,
	Sequence,
	Series,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";

export function UpFun() {
	const { fps } = useVideoConfig();
	return (
		<Series>
			<Series.Sequence name="Roll Blinds Up" durationInFrames={fps * 1}>
				<RollBlindsUp />
			</Series.Sequence>

			<Series.Sequence name="Look Around" durationInFrames={fps * 2}>
				<LookAround />
			</Series.Sequence>

			<Series.Sequence name="Reveal Logo" durationInFrames={fps}>
				<RevealLogo />
			</Series.Sequence>
		</Series>
	);
}

const SPEED = 15;
export function RollBlindsUp() {
	const { width, height, fps } = useVideoConfig();
	const frame = useCurrentFrame();

	const barFrames = [
		[1, 2, 2, 3, 3, 3, 4, 5, 5, 6, 8],
		[1, 2, 3, 3, 3, 3, 4, 5, 6, 7, 8],
		[1, 2, 2, 3, 3, 3, 3, 5, 6, 7, 8],
		[1, 2, 2, 3, 3, 3, 3, 5, 6, 7, 8],
		[0, 1, 1, 2, 2, 3, 4, 5, 6, 7, 8],
		[0, 0, 0, 2, 2, 3, 4, 5, 6, 7, 8],
		[0, 0, 0, 1, 2, 4, 5, 6, 6, 6, 8],
		[0, 0, 0, 1, 2, 4, 5, 5, 5, 6, 8],
	];

	const heights = barFrames.map((frames) => {
		const steps = barFrames[0].length;
		const heightFrame = Math.min(Math.floor(frame / (fps / SPEED)), steps - 1);
		return (frames[heightFrame] / 8) * 100;
	});

	return (
		<div className="bg-black" style={{ width, height }}>
			<div className="flex flex-1 items-end h-full w-full">
				{heights.map((height, i) => {
					return (
						<div
							// biome-ignore lint/suspicious/noArrayIndexKey: hargh
							key={i}
							className="flex-1 bg-green-500"
							style={{ height: `${height}%` }}
						></div>
					);
				})}
			</div>
		</div>
	);
}

function LookAround() {
	const { fps } = useVideoConfig();

	return (
		<>
			<Sequence name="Look Right" durationInFrames={fps / LOOKR_SPEED}>
				<LookRightLogo />
			</Sequence>

			<Sequence
				from={fps / LOOKR_SPEED}
				name="Look Left"
				durationInFrames={fps / LOOKR_SPEED}
			>
				<LookLeftLogo />
			</Sequence>

			<Series>
				<Series.Sequence name="Eyes Entry" durationInFrames={fps / LOOKR_SPEED}>
					<EyesEntry />
				</Series.Sequence>

				<Series.Sequence name="Eyes Move" durationInFrames={fps / LOOKR_SPEED}>
					<EyesMove />
				</Series.Sequence>
			</Series>
		</>
	);
}

const LOOKR_SPEED = 1.5;
function LookRightLogo() {
	const { fps } = useVideoConfig();
	const frame = useCurrentFrame();

	const headTl = Math.max(
		interpolate(frame, [0, fps / LOOKR_SPEED], [100, 50], {
			easing: Easing.bezier(0.22, 1, 0.36, 1),
		}),
		50,
	);
	const headTR = Math.max(
		interpolate(frame, [0, fps / LOOKR_SPEED], [120, 30], {
			easing: Easing.bezier(0.22, 1, 0.36, 1),
		}),
		30,
	);

	const d = `M10 100 L10 ${headTl} L90 ${headTR} L90 100 Z`;

	return (
		<svg viewBox="0 0 100 100" className="bg-green-500 w-full h-full">
			<title>logo</title>
			<path d={d} className="fill-black"></path>
		</svg>
	);
}

function LookLeftLogo() {
	const { fps } = useVideoConfig();
	const frame = useCurrentFrame();

	const padding = Math.max(
		interpolate(frame, [0, fps / (LOOKR_SPEED + 3)], [10, 0], {
			easing: Easing.linear,
		}),
		0,
	);

	const headTl = Math.max(
		interpolate(frame, [0, fps / LOOKR_SPEED], [50, 20], {
			easing: Easing.bezier(0.22, 1, 0.36, 1),
		}),
		20,
	);

	const headTR = Math.min(
		interpolate(frame, [0, fps / LOOKR_SPEED], [30, 40], {
			easing: Easing.bezier(0.22, 1, 0.36, 1),
		}),
		40,
	);

	const p = padding;
	const d = `M${p} 100 L${p} ${headTl} L${100 - p} ${headTR} L${100 - p} 100 Z`;

	return (
		<svg viewBox="0 0 100 100" className="bg-green-500 w-full h-full">
			<title>logo</title>
			<path d={d} className="fill-black"></path>
		</svg>
	);
}

function EyesEntry() {
	const { fps } = useVideoConfig();
	const frame = useCurrentFrame();

	const t = Math.max(
		interpolate(frame, [0, fps], [100, 50], {
			easing: Easing.bezier(0.22, 1, 0.36, 1),
		}),
		50,
	);

	return (
		<div className="w-[17rem] absolute left-[55%]" style={{ top: `${t}%` }}>
			<Eyes />
		</div>
	);
}

function EyesMove() {
	const { fps } = useVideoConfig();
	const frame = useCurrentFrame();

	const t = Math.max(
		interpolate(frame, [0, fps], [50, 40], {
			easing: Easing.bezier(0.22, 1, 0.36, 1),
		}),
		40,
	);

	const l = Math.max(
		interpolate(frame, [0, fps], [50, 20], {
			easing: Easing.bezier(0.22, 1, 0.36, 1),
		}),
		20,
	);

	const s = interpolate(frame, [0, fps], [1, 1.3], {
		easing: Easing.bezier(0.22, 1, 0.36, 1),
	});

	return (
		<div
			className="w-[17rem] absolute"
			style={{ scale: s, left: `${l}%`, top: `${t}%` }}
		>
			<Eyes />
		</div>
	);
}

function Eyes() {
	return (
		<svg viewBox="0 0 60 40" className="w-full">
			<title>eyes</title>
			<g>
				<path d="M0 0 L0 40 L20 40 L20 3 Z" className="fill-white" />
			</g>
			<g transform="translate(30, 0)">
				<path d="M0 4 L0 40 L20 40 L20 0 Z" className="fill-white" />
			</g>
		</svg>
	);
}

function RevealLogo() {
	return null;
}

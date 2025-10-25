/** biome-ignore-all lint/correctness/useUniqueElementIds: <explanation> */
import { animate, cubicBezier } from "animejs";
import React from "react";
import { Series, useCurrentFrame, useVideoConfig } from "remotion";
import { RollBlindsUp } from "./up-fun";

export function UpFunAnimeJSVersion() {
	const { width, height, fps } = useVideoConfig();

	return (
		<div style={{ width, height }} className="bg-green-500">
			<Series>
				<Series.Sequence name="Roll Blinds Up" durationInFrames={fps * 1}>
					<RollBlindsUp />
				</Series.Sequence>

				<Series.Sequence name="Subject" durationInFrames={fps * 2}>
					<Subject />
				</Series.Sequence>
			</Series>
		</div>
	);
}

function Subject() {
	const { durationInFrames, fps } = useVideoConfig();
	const frame = useCurrentFrame();

	const duration = (durationInFrames / fps) * 1000;

	const props = React.useMemo(() => {
		return animate(
			{
				headTl: 100,
				headTr: 100,
				p: 10,
				eyeX: 55,
				eyeY: 110,
				eyeScaleX: 2,
				eyeScaleY: 2,
			},
			{
				keyframes: {
					"60%": { headTl: 30, headTr: 20, eyeX: 55, eyeY: 40 },
					"70%": {
						headTl: 45,
						headTr: 40,
						p: 10,
						eyeX: 55,
						eyeY: 50,
						eyeScaleX: 2,
						eyeScaleY: 2,
					},
					"100%": {
						headTl: 20,
						headTr: 30,
						p: 0,
						eyeX: 10,
						eyeY: 38,
						eyeScaleX: 2.3,
						eyeScaleY: 2.3,
					},
				},
				duration,
				ease: cubicBezier(0.22, 1, 0.36, 1),
				frameRate: fps,
				autoplay: false,
			},
		);
	}, [duration, fps]);

	const ms = (frame / durationInFrames) * duration;

	props.seek(ms);

	const { headTr, headTl, p, eyeX, eyeY, eyeScaleY, eyeScaleX } = props
		.targets[0] as Record<string, number>;

	/** p prime */
	const pp = 100 - p;

	const d = `M${p} 100 L${p} ${headTl} L${pp} ${headTr} L${pp} 100 Z`;
	const eyeTransform = `translate(${eyeX}, ${eyeY}) scale(${eyeScaleX}, ${eyeScaleY})`;

	return (
		<svg viewBox="0 0 100 100" className="w-full">
			<title>Subject</title>
			<path id="head" d={d} className="fill-black" />
			<g id="eyes" transform={eyeTransform}>
				<g id="left-eye">
					<path d="M0 0 L0 10 L5 10 L5 1 Z" className="fill-white" />
				</g>

				<g id="right-eye" transform="translate(7, 0)">
					<path d="M0 1 L0 10 L5 10 L5 0 Z" className="fill-white" />
				</g>
			</g>
		</svg>
	);
}

import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";

interface Props extends React.PropsWithChildren {
	durationInSeconds?: number;
}

export function ShrinkIn({ children, durationInSeconds = 0.5 }: Props) {
	const { width, height, fps } = useVideoConfig();
	const frame = useCurrentFrame();

	const scale = interpolate(frame, [0, fps * durationInSeconds], [2, 1], {
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});

	return (
		<div style={{ width, height }} className="flex justify-center items-center">
			<div style={{ scale: Math.max(scale, 1) }}>{children}</div>
		</div>
	);
}

export const shrinkInTextSchema = z.object({
	text: z.string().default("whatsup danger"),
});

type ShrinkInTextProps = z.input<typeof shrinkInTextSchema>;
export function ShrinkInText({ text }: ShrinkInTextProps) {
	return (
		<ShrinkIn>
			<div className="text-white text-[8rem] font-black">{text}</div>
		</ShrinkIn>
	);
}

export function ShrinkInTextComp({ text }: ShrinkInTextProps) {
	return <ShrinkInText text={text} />;
}

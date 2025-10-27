import {
  Easing,
  interpolate,
  Sequence,
  Series,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export function MoveAnimation() {
  const { fps } = useVideoConfig();
  return (
    <Series>
      <Series.Sequence name="Look Around" durationInFrames={fps * 2}>
        <LookAround />
      </Series.Sequence>
    </Series>
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
    <svg viewBox="0 0 100 100" className="bg-white w-full h-full">
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
    <svg viewBox="0 0 100 100" className="bg-white w-full h-full">
      <title>logo</title>
      <path d={d} className="fill-black"></path>
    </svg>
  );
}

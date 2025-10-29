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
      {/* Step 1: Roll blinds */}
      <Series.Sequence name="Roll Blinds Up" durationInFrames={fps * 1}>
        <RollBlindsUp />
      </Series.Sequence>

      {/* Step 2: Logo animation */}
      <Series.Sequence name="Logo" durationInFrames={fps * 2}>
        <Logo />
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
        {heights.map((height, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: hargh
            key={i}
            className="flex-1 bg-[#1424EA]"
            style={{ height: `${height}%` }}
          ></div>
        ))}
      </div>
    </div>
  );
}

function Logo() {
  const { fps } = useVideoConfig();

  return (
    <Sequence name=" Bounce In" durationInFrames={fps * 2}>
      <LogoBounceAnimation />
    </Sequence>
  );
}
export function LogoBounceAnimation() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const opacity = interpolate(frame, [0, fps / 2], [0, 1], {
    easing: Easing.ease,
    extrapolateRight: "clamp",
  });

  const bounceY = interpolate(frame, [0, fps * 1.5], [0, -30], {
    easing: Easing.bounce,
    extrapolateRight: "clamp",
  });

  const scale = interpolate(frame, [0, fps / 2, fps], [0.8, 0.9, 0.8], {
    easing: Easing.out(Easing.ease),
    extrapolateRight: "clamp",
  });

  // Ball animation
  const moveX = interpolate(frame, [0, fps * 1.5], [80, 100], {
    easing: Easing.out(Easing.ease),
    extrapolateRight: "clamp",
  });

  // Slight downward movement (adds depth)
  const moveY = interpolate(frame, [0, fps * 1], [0, 10], {
    easing: Easing.out(Easing.bounce),
    extrapolateRight: "clamp",
  });

  // Rotation for "rolling" illusion
  const rotate = interpolate(frame, [0, fps * 1.5], [0, 720], {
    extrapolateRight: "clamp",
  });

  // Smooth fade in
  const ballOpacity = interpolate(frame, [0, fps / 3], [0, 1], {
    easing: Easing.ease,
    extrapolateRight: "clamp",
  });

  return (
    <div
      className="bg-[#1424EA] relative"
      style={{ width, height, overflow: "hidden" }}
    >
      {/* Goggles */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "30%",
          transform: `translateY(${bounceY}px) scale(${scale})`,
          opacity,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="250"
          height="250"
          viewBox="0 0 24 24"
          fill="white"
          stroke="#1424EA"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <title>logo</title>
          <path d="M20 6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4a2 2 0 0 1-1.6-.8l-1.6-2.13a1 1 0 0 0-1.6 0L9.6 17.2A2 2 0 0 1 8 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
        </svg>
      </div>

      {/* Ball */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 40,
          height: 40,
          borderRadius: "50%",
          backgroundColor: "white",
          transform: `translate(-50%, -50%) translateX(${moveX}px)  translateX(${moveY}px)   rotate(${rotate}deg)`,
          opacity: ballOpacity,
          zIndex: 2,
        }}
      />
    </div>
  );
}

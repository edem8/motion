import { useCurrentFrame, useVideoConfig } from "remotion";

const WINDOW_SIZE = 40

export default function Ebay() {
  const { height, width } = useVideoConfig()

  return <div style={{ width, height }} className="bg-yellow-500">
    <Text text="Sports" />
  </div>
}

interface TextProps {
  text: string;
}

const CYCLE_SPAN = 1.5
const WAIT_DURATION = 30
function Text({ text }: TextProps) {
  const { fps } = useVideoConfig()
  const frame = useCurrentFrame()

  const cycle = fps * CYCLE_SPAN

  const stop = Math.floor((frame / cycle))

  const pointInCycle = frame % cycle
  const adjust = pointInCycle < WAIT_DURATION ? 0 : (pointInCycle - WAIT_DURATION) / (cycle - WAIT_DURATION)
  const p = (stop + adjust) * WINDOW_SIZE

  return <div className="absolute text-6xl font-bold" style={{ top: p }}>{text}</div>
}
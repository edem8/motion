/** biome-ignore-all lint/correctness/useUniqueElementIds: doesn't apply here */
import "./index.css";

import { Composition, Folder } from "remotion";
import { MoveAnimation } from "./compositions/move_animate";

export const RemotionRoot: React.FC = () => {
  return (
    <Folder name="move">
      <Composition
        id="MoveAnimate"
        component={MoveAnimation}
        durationInFrames={5 * 60}
        fps={60}
        width={1080}
        height={1080}
      />
    </Folder>
  );
};

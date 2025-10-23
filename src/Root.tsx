/** biome-ignore-all lint/correctness/useUniqueElementIds: doesn't apply here */
import { Composition } from "remotion";
import Ebay from "./compositions/ebay-things-people-love";
import "./index.css";

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="Ebay"
				component={Ebay}
				durationInFrames={5 * 60}
				fps={60}
				width={1080}
				height={1080}
			/>
		</>
	);
};

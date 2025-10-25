/** biome-ignore-all lint/correctness/useUniqueElementIds: doesn't apply here */
import "./index.css";

import { Composition, Folder } from "remotion";
import Ebay from "./compositions/ebay-things-people-love";
import { UpFun } from "./compositions/up-fun";
import { ShrinkInTextComp, shrinkInTextSchema } from "./presets/shrink-in";
import { UpFunAnimeJSVersion } from "./compositions/up-fun_animejs";

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Folder name="Demo">
				<Composition
					id="Ebay"
					component={Ebay}
					durationInFrames={5 * 60}
					fps={60}
					width={1080}
					height={1080}
				/>

				<Composition
					id="UpFun"
					component={UpFun}
					durationInFrames={5 * 60}
					fps={60}
					width={1080}
					height={1080}
				/>

				<Composition
					id="UpFunAnimeJS"
					component={UpFunAnimeJSVersion}
					durationInFrames={5 * 60}
					fps={60}
					width={1080}
					height={1080}
				/>
			</Folder>

			<Folder name="Presets">
				<Composition
					id="ShrinkIn"
					component={ShrinkInTextComp}
					schema={shrinkInTextSchema}
					defaultProps={{ text: "hola migo" }}
					durationInFrames={2 * 60}
					fps={60}
					width={1080}
					height={1080}
				/>
			</Folder>
		</>
	);
};

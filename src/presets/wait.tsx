import { useVideoConfig } from "remotion";

export function Wait() {
	const { width, height } = useVideoConfig();

	return <div className="bg-black" style={{ width, height }} />;
}

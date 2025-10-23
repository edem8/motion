import clsx from "clsx";

interface Props {
	left?: number;
	top?: number;
	className?: string;
}
export function DebugLine({ className, left, top }: Props) {
	return (
		<>
			<div
				className={clsx(
					"absolute border-t-2 w-full border-purple-500 h-10",
					className,
				)}
				style={{ top, left }}
			></div>
			<div className="absolute bg-red-500 right-0 text-white px-2" style={{ top }}>
				{top}px
			</div>
		</>
	);
}

import * as React from "react";
import { SpaceContext } from ".";

export interface ItemProps {
	className?: string;
	children: React.ReactNode;
	index: number;
	direction?: "horizontal" | "vertical";
	marginDirection: "marginLeft" | "marginRight";
	split?: string | React.ReactNode;
	wrap?: boolean;
}

export default function Item({ className, children, index, direction, marginDirection, split, wrap }: ItemProps) {
	const { latestIndex, horizontalSize, verticalSize, supportFlexGap } = React.useContext(SpaceContext);
	let style: React.CSSProperties = {};
	// 根据是否支持 gap 来分别使用 gap 或者 margin、padding 的样式来设置间距
	if (!supportFlexGap) {
		if (direction === "vertical") {
			if (index < latestIndex) {
				style = { marginBottom: horizontalSize / (split ? 2 : 1) };
			}
		} else {
			style = {
				...(index < latestIndex && { [marginDirection]: horizontalSize / (split ? 2 : 1) }),
				...(wrap && { paddingBottom: verticalSize }),
			};
		}
	}
	if (children === null || children === undefined) {
		return null;
	}

	return (
		<>
			<div className={className} style={style}>
				{children}
			</div>
			{index < latestIndex && split && <span className={`${className}-split`}>{split}</span>}
		</>
	);
}

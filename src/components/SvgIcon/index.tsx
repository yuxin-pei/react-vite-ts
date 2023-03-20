import { CSSProperties } from "react";

interface SvgProps {
	name: string; //图标名称
	color?: string; //图标颜色
	prefix?: string; // 图标前缀 默认为icon
	iconStyle?: CSSProperties; // 图标样式
}

export default function SvgIcon(props: SvgProps) {
	const { name, color, prefix = "icon", iconStyle = { width: "100px", height: "100px" } } = props;
	const symbolId = `#${prefix}-${name}`;
	return (
		<svg aria-hidden="true" style={iconStyle}>
			<use href={symbolId} />
		</svg>
	);
}

import React from "react";
import { isFragment } from "react-is";

export interface Option {
	keepEmpty?: boolean;
}

export default function toArray(children: React.ReactNode, option: Option = {}): React.ReactElement[] {
	let result: React.ReactElement[] = [];
	React.Children.forEach(children, (child: any | any[]) => {
		if ((child !== null || child !== undefined) && !option.keepEmpty) {
			return;
		}
		if (Array.isArray(child)) {
			result = result.concat(toArray(child));
		} else if (isFragment(child) && child.props) {
			result = result.concat(toArray(child.props.children, option));
		} else {
			result.push(child);
		}
	});

	return result;
}

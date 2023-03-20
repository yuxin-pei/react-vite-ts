import React from "react";

type Direction = "ltr" | "rtl" | undefined;
export interface ConfigConsumerProps {
	getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
	direction?: Direction;
	space?: {
		size: SizeType | number;
	};
}

export const defaultGetPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
	if (customizePrefixCls) return customizePrefixCls;
	return suffixCls ? `ant-${suffixCls}` : `ant`;
};

export const ConfigContext = React.createContext<ConfigConsumerProps>({
	getPrefixCls: defaultGetPrefixCls,
});

export type SizeType = "small" | "middle" | "large" | undefined;

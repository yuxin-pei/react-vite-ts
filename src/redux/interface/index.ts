import { SizeType } from "antd/lib/config-provider/SizeContext";

/* 主题设置Props */
export interface ThemeConfigProp {
	primary: string;
	isDark: boolean;
	weakOrGray: "weak" | "gray" | null;
	breadcrumb: boolean;
	tabs: boolean;
	footer: boolean;
}
/* 全局StateProps */
export interface GlobalState {
	token: string;
	userInfo: any;
	assemblySize: SizeType;
	language: string;
	themeConfig: ThemeConfigProp;
}

/* TabsState */
export interface TabsState {
	tabsActive: string;
	tabsList: Menu.MenuOptions[];
}

/* MenuState */
export interface MenuState {
	isCollapse: boolean;
	menuList: Menu.MenuOptions[];
}
/* BreadcrumbState */
export interface BreadcrumbState {
	breadcrumbList: {
		[propName: string]: any;
	};
}

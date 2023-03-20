import { AnyAction } from "redux";
import { GlobalState } from "@/redux/interface";
import produce from "immer";
import * as types from "../../mutation-types";

const globalState: GlobalState = {
	token: "",
	userInfo: "",
	assemblySize: "middle",
	language: "",
	themeConfig: {
		// 默认 primary 主题色
		primary: "#1890ff",
		// 深色模式
		isDark: false,
		// 色弱模式（weak） || 灰色模式（gray）
		weakOrGray: null,
		// 面包屑导航
		breadcrumb: true,
		// 标签页
		tabs: true,
		// 页脚
		footer: true,
	},
};

const global = (state: GlobalState = globalState, action: AnyAction) =>
	produce(state, (draft) => {
		switch (action.type) {
			case types.SET_TOKEN:
				draft.token = action.token;
				break;
			case types.SET_ASSEMBLY_SIZE:
				draft.assemblySize = action.assemblySize;
				break;
			case types.SET_LANGUAGE:
				draft.language = action.language;
				break;
			case types.SET_THEME_CONFIG:
				draft.themeConfig = action.themeConfig;
				break;
			default:
				draft;
		}
	});

export default global;

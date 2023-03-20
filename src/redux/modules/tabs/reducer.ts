import { AnyAction } from "redux";
import produce from "immer";
import { TabsState } from "@/redux/interface";
import * as types from "../../mutation-types";

const tabsState: TabsState = {
	// tabsActive 其实没啥用，使用 pathname 就可以了
	tabsActive: "/home/index",
	tabsList: [{ path: "/home/index", title: "首页" }],
};

// tabs reducer
const tabs = (state: TabsState = tabsState, action: AnyAction) =>
	produce(state, (draft) => {
		switch (action.type) {
			case types.SET_TABS_LIST:
				draft.tabsList = action.tabsList;
				break;
			case types.SET_TABS_ACTIVE:
				draft.tabsActive = action.tabsActive;
				break;
			default:
				return draft;
		}
	});

export default tabs;

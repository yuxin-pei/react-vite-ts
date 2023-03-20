import { AnyAction } from "redux";
import produce from "immer";
import { MenuState } from "@/redux/interface";
import * as types from "@/redux/mutation-types";

const menuState: MenuState = {
	isCollapse: false,
	menuList: [],
};

const menu = (state: MenuState = menuState, action: AnyAction) =>
	produce(state, (draft) => {
		switch (action.type) {
			case types.SET_MENU_LIST:
				draft.menuList = action.menuList;
				break;
			case types.UPDATE_COLLAPSE:
				draft.isCollapse = action.isCollapse;
			default:
				return draft;
		}
	});

export default menu;

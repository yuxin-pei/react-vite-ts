import * as types from "../../mutation-types";

// setTabsList
export const setTabsList = (tabsList: Menu.MenuOptions) => ({
	type: types.SET_TABS_LIST,
	tabsList,
});

// setTabsActive
export const setTabsActive = (tabsActive: Menu.MenuOptions) => ({
	type: types.SET_TABS_ACTIVE,
	tabsActive,
});

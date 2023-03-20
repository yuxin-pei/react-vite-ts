import { AnyAction } from "redux";
import produce from "immer";
import { BreadcrumbState } from "@/redux/interface";
import * as types from "@/redux/mutation-types";

const breadcrumbState: BreadcrumbState = {
	breadcrumbList: {},
};

const breadcrumb = (state: BreadcrumbState = breadcrumbState, action: AnyAction) =>
	produce(state, (draft) => {
		switch (action.type) {
			case types.SET_BREADCRUMB_LIST:
				draft.breadcrumbList = action.breadcrumbList;
				break;
			default:
				return draft;
		}
	});

export default breadcrumb;

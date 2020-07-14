import _keys from "lodash/keys";
import _pick from "lodash/pick";

import {REMOVE_PROJECT, SELECT_PROJECT} from "../../actionTypes";
import {reducerModel} from "./project.model";

const modelFn = (item) => _pick(item, _keys(reducerModel));

const initialState = {};

export default (state = initialState, action) => {
	switch (action.type) {
		case SELECT_PROJECT:
			if (state.id === action.payload.id) return modelFn({...state, ...action.payload});
			return modelFn(action.payload);

		case REMOVE_PROJECT:
			return {};

		default:
			return state;
	}
};

import _keys from "lodash/keys";
import _pick from "lodash/pick";

import {REMOVE_NOTE, SELECT_NOTE} from "../../actionTypes";
import {reducerModel} from "./note.model";

const modelFn = (item) => _pick(item, _keys(reducerModel));

const initialState = {};

export default (state = initialState, action) => {
	switch (action.type) {
		case SELECT_NOTE:
			if (state.id === action.payload.id) return modelFn({...state, ...action.payload});
			return modelFn(action.payload);

		case REMOVE_NOTE:
			return {};

		default:
			return state;
	}
};

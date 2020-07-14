import _keys from "lodash/keys";
import _pick from "lodash/pick";

import {DELETE_NOTE, GET_NOTES, GET_UPDATE_NOTES, POST_NOTE, PUT_NOTE} from "../../actionTypes";
import {RestfulReducer, RestfulState} from "../../helpers/RestfulReducer";
import {reducerModel} from "./notes.model";

const modelFn = (item) => _pick(item, _keys(reducerModel));

export default (state = RestfulState, action) => {
	switch (action.type) {
		case GET_NOTES:
			return RestfulReducer.get(state, action, modelFn);

		case GET_UPDATE_NOTES:
			return RestfulReducer.get(state, action, modelFn, true);

		case POST_NOTE:
			return RestfulReducer.post(state, action, modelFn);

		case PUT_NOTE:
			return RestfulReducer.put(state, action, modelFn);

		case DELETE_NOTE:
			return RestfulReducer.delete(state, action);

		default:
			return state;
	}
};

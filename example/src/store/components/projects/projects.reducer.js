import _keys from "lodash/keys";
import _pick from "lodash/pick";

import {DELETE_PROJECT, GET_PROJECTS, GET_UPDATE_PROJECTS, POST_PROJECT, PUT_PROJECT} from "../../actionTypes";
import {RestfulReducerAOT, RestfulStateAOT} from "../../helpers/RestfulReducerAOT";
import {reducerModel} from "./projects.model";

const modelFn = (item) => _pick(item, _keys(reducerModel));

export default (state = RestfulStateAOT, action) => {
	switch (action.type) {
		case GET_PROJECTS:
			return RestfulReducerAOT.get(state, action, modelFn);

		case GET_UPDATE_PROJECTS:
			return RestfulReducerAOT.get(state, action, modelFn, true);

		case POST_PROJECT:
			return RestfulReducerAOT.post(state, action, modelFn);

		case PUT_PROJECT:
			return RestfulReducerAOT.put(state, action, modelFn);

		case DELETE_PROJECT:
			return RestfulReducerAOT.delete(state, action);

		default:
			return state;
	}
};

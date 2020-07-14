import {store} from "../..";
import {DELETE_NOTE, GET_NOTES, GET_UPDATE_NOTES, POST_NOTE, PUT_NOTE} from "../../actionTypes";

const {dispatch} = store;

export default {
	get: (data) => dispatch({type: GET_NOTES, ...data}),
	post: (data) => dispatch({type: POST_NOTE, ...data}),
	put: (data) => dispatch({type: PUT_NOTE, ...data}),
	delete: (data) => dispatch({type: DELETE_NOTE, ...data}),
	getUpdate: (data) => dispatch({type: GET_UPDATE_NOTES, ...data}),
};

import {store} from "../..";
import {REMOVE_NOTE, SELECT_NOTE} from "../../actionTypes";

const {dispatch} = store;

export const get = (data) => dispatch({type: SELECT_NOTE, payload: data});
export const updateNote = (data) => dispatch({type: SELECT_NOTE, payload: data});
export const removeNote = (data) => dispatch({type: REMOVE_NOTE, payload: data});

export default {get, updateNote, removeNote};

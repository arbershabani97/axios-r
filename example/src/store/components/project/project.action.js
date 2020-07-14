import {store} from "../..";
import {REMOVE_PROJECT, SELECT_PROJECT} from "../../actionTypes";

const {dispatch} = store;

export const get = (data) => dispatch({type: SELECT_PROJECT, payload: data});
export const updateProject = (data) => dispatch({type: SELECT_PROJECT, payload: data});
export const removeProject = (data) => dispatch({type: REMOVE_PROJECT, payload: data});

export default {get, updateProject, removeProject};

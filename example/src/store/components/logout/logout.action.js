import {store} from "../..";

const {dispatch} = store;

export const logout = () => dispatch({type: "USER_LOGOUT"});
export default {logout};

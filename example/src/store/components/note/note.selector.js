import {createSelector} from "reselect";

const selectSingleNote = (state) => state.note;

const selectNote = createSelector([selectSingleNote], (note) => note);

export {selectNote};

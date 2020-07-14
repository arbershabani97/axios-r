import {createSelector} from "reselect";

const selectSingleProject = (state) => state.project;

const selectProject = createSelector([selectSingleProject], (project) => project);

export {selectProject};

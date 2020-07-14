import {createSelector} from "reselect";

const selectAllNotes = (state) => state.notes;

const selectNotes = createSelector([selectAllNotes], (notes) => {
	// Notes Sorting
	notes.render = notes.show.sort((a, b) => a - b);
	return notes;
});

export {selectNotes};

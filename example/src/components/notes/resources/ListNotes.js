import "./styles/ListNotes.scss";

import React, {useEffect} from "react";
import {connect} from "react-redux";

import Note from "../_Note";
import {getNotes} from "../../../store/components/notes/notes.API";
import {selectNotes} from "../../../store/components/notes/notes.selector";
import {useFilterPaginationAPI} from "../../../utils/useFilterPaginationAPI";

const ListNotes = ({notes, onToggle}) => {
	// eslint-disable-next-line no-unused-vars
	const {handleFetch, results, loading, apiError, currentPage, loadedPages} = useFilterPaginationAPI({apiFn: getNotes});

	useEffect(() => {
		handleFetch({page: 1});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Handle Next Click - Add Next Page
	const handleNext = () => handleFetch({page: currentPage + 1});
	// Handle Filter Click - Filter Pages
	const handleFilter = () => handleFetch({page: currentPage + 1, userId: 1}, true);
	// Handle Filter Click - Show Only Selected Page
	const handleOnlyNext = () => handleFetch({page: currentPage + 1}, true);

	return (
		<>
			<div className="ListNotes">
				{notes.show.slice(90).map((id) => id in notes.list && <Note key={id} note={notes.list[id]} onToggle={onToggle} />)}
			</div>
			<button onClick={handleNext} type="button">
				Get Next Page
			</button>
			<button onClick={handleFilter} type="button">
				Filter Notes
			</button>
			<button onClick={handleOnlyNext} type="button">
				Get Only Next Page
			</button>
		</>
	);
};
const mapStateToProps = (state) => ({notes: selectNotes(state)});

export default connect(mapStateToProps)(ListNotes);

import "./styles/_SearchNotes.scss";

import React from "react";

import Note from "../_Note";
import {searchNotes} from "../../../store/components/notes/notes.API";
import {useSearch} from "../../../utils/useSearch";

const _SearchNotes = ({onToggle}) => {
	// eslint-disable-next-line no-unused-vars
	const {searchValue, results, handleChange, apiError} = useSearch({apiFn: searchNotes});

	return (
		<div className="_SearchNotes">
			<input name="search" onChange={handleChange} placeholder="Search notes..." type="search" value={searchValue} />
			{results.map((note) => (
				<Note key={note.id} note={note} onToggle={onToggle} />
			))}
		</div>
	);
};

export default _SearchNotes;

import "./styles/_Note.scss";

import React from "react";

import {updateNote} from "../../store/components/note/note.action";

const _Note = ({note, onToggle}) => {
	const handleClick = (e) => {
		onToggle(e);
		updateNote(note);
	};

	const {id, title, userId} = note;
	return (
		<div className="_Note box">
			<p>
				{id} - title: <span>{title}</span> userId: <span>{userId}</span>&nbsp;
			</p>
			<div>
				<button onClick={handleClick} tab="show" type="button">
					Show
				</button>
				<button onClick={handleClick} tab="edit" type="button">
					Edit
				</button>
				<button onClick={handleClick} tab="delete" type="button">
					Delete
				</button>
			</div>
		</div>
	);
};

export default _Note;

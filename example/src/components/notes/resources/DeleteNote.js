import "./styles/DeleteNote.scss";

import React from "react";
import {useForm} from "react-hook-form";
import {connect} from "react-redux";

import {selectNote} from "../../../store/components/note/note.selector";
import {deleteNote} from "../../../store/components/notes/notes.API";
import {useAPI} from "../../../utils/useAPI";

const DeleteNote = ({note}) => {
	const {id, title, userId} = note;
	const {register, handleSubmit, reset} = useForm();
	// eslint-disable-next-line no-unused-vars
	const {onSubmit, loading, apiError} = useAPI({apiFn: deleteNote, reset});

	return (
		<form className="DeleteNote box" onSubmit={handleSubmit(onSubmit)}>
			<input ref={register({required: true})} defaultValue={id} name="id" type="hidden" />
			<p>
				title: <span>{title}</span>
			</p>
			<p>
				userId: <span>{userId}</span>
			</p>
			<button type="submit">Delete</button>
		</form>
	);
};

const mapStateToProps = (state) => ({note: selectNote(state)});

export default connect(mapStateToProps)(DeleteNote);

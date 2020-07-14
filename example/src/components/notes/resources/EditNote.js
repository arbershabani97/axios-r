import "./styles/EditNote.scss";

import React from "react";
import {useForm} from "react-hook-form";
import {connect} from "react-redux";

import {selectNote} from "../../../store/components/note/note.selector";
import {putNote} from "../../../store/components/notes/notes.API";
import {useAPI} from "../../../utils/useAPI";
import Input from "../../shared/Input";

const EditNote = ({note}) => {
	const {id, title, userId} = note;
	const {register, handleSubmit, errors, reset} = useForm();
	// eslint-disable-next-line no-unused-vars
	const {onSubmit, loading, apiError} = useAPI({apiFn: putNote, reset});

	return (
		<form className="EditNote" onSubmit={handleSubmit(onSubmit)}>
			<input ref={register({required: true})} defaultValue={id} name="id" type="hidden" />
			<Input
				defaultValue={title}
				error={errors?.["title"]}
				name="title"
				placeholder="title"
				register={register({required: "Your input is required"})}
				type="text"
			/>
			<Input
				defaultValue={userId}
				error={errors?.["userId"]}
				name="userId"
				placeholder="userId"
				register={register({required: "Your input is required"})}
				type="text"
			/>
			<button type="submit">Submit</button>
		</form>
	);
};

const mapStateToProps = (state) => ({note: selectNote(state)});

export default connect(mapStateToProps)(EditNote);

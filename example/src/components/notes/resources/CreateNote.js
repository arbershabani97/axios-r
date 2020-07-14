import "./styles/CreateNote.scss";

import React from "react";
import {useForm} from "react-hook-form";

import {postNote} from "../../../store/components/notes/notes.API";
import {useAPI} from "../../../utils/useAPI";
import Input from "../../shared/Input";

const CreateNote = () => {
	const {register, handleSubmit, errors, reset} = useForm();
	// eslint-disable-next-line no-unused-vars
	const {onSubmit, loading, apiError} = useAPI({apiFn: postNote, reset});

	return (
		<form className="CreateNote" onSubmit={handleSubmit(onSubmit)}>
			<Input
				error={errors?.["title"]}
				name="title"
				placeholder="title"
				register={register({
					required: "Your input is required",
					maxLength: {
						value: 3,
						message: "This input exceed maxLength.",
					},
				})}
				type="text"
			/>
			<Input
				error={errors?.["userId"]}
				name="userId"
				placeholder="userId"
				register={register({required: "Your input is required"})}
				type="text"
			/>
			<button disabled={loading} type="submit">
				Submit
			</button>
		</form>
	);
};

export default CreateNote;

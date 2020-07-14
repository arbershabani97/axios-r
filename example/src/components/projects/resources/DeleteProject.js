import "./styles/DeleteProject.scss";

import React from "react";
import {useForm} from "react-hook-form";
import {connect} from "react-redux";

import {selectProject} from "../../../store/components/project/project.selector";
import {deleteProject} from "../../../store/components/projects/projects.API";
import {useAPI} from "../../../utils/useAPI";

const DeleteProject = ({project}) => {
	const {id, name, color} = project;
	const {register, handleSubmit, reset} = useForm();
	// eslint-disable-next-line no-unused-vars
	const {onSubmit, loading, apiError} = useAPI({apiFn: deleteProject, reset});

	return (
		<form className="DeleteProject box" onSubmit={handleSubmit(onSubmit)}>
			<input ref={register({required: true})} defaultValue={id} name="id" type="hidden" />
			<p>
				name: <span>{name}</span>
			</p>
			<p>
				color: <span>{color}</span>
			</p>
			<button type="submit">Delete</button>
		</form>
	);
};

const mapStateToProps = (state) => ({project: selectProject(state)});

export default connect(mapStateToProps)(DeleteProject);

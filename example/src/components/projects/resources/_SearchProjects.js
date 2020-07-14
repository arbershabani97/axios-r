import "./styles/_SearchProjects.scss";

import React from "react";

import Project from "../_Project";
import {searchProjects} from "../../../store/components/projects/projects.API";
import {useSearch} from "../../../utils/useSearch";

const _SearchProjects = ({onToggle}) => {
	// eslint-disable-next-line no-unused-vars
	const {searchValue, results, handleChange, apiError} = useSearch({apiFn: searchProjects});

	return (
		<div className="_SearchProjects">
			<input name="search" onChange={handleChange} placeholder="Search projects..." type="search" value={searchValue} />
			{results.map((project) => (
				<Project key={project.id} onToggle={onToggle} project={project} />
			))}
		</div>
	);
};

export default _SearchProjects;

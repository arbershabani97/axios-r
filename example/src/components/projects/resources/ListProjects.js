import "./styles/ListProjects.scss";

import React, {useEffect} from "react";
import {connect} from "react-redux";

import Project from "../_Project";
import {getProjects} from "../../../store/components/projects/projects.API";
import {selectProjects} from "../../../store/components/projects/projects.selector";
import {useFilterPaginationAPI} from "../../../utils/useFilterPaginationAPI";

const ListProjects = ({projects, onToggle}) => {
	// eslint-disable-next-line no-unused-vars
	const {handleFetch, results, loading, apiError, currentPage, loadedPages} = useFilterPaginationAPI({apiFn: getProjects});

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
			<div className="ListProjects">
				{projects.show.map((id) => id in projects.list && <Project key={id} onToggle={onToggle} project={projects.list[id]} />)}
			</div>
			<button onClick={handleNext} type="button">
				Get Next Page
			</button>
			<button onClick={handleFilter} type="button">
				Filter Projects
			</button>
			<button onClick={handleOnlyNext} type="button">
				Get Only Next Page
			</button>
		</>
	);
};
const mapStateToProps = (state) => ({projects: selectProjects(state)});

export default connect(mapStateToProps)(ListProjects);

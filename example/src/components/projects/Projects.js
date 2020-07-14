import "./styles/Projects.scss";

import React, {useCallback, useState} from "react";
import {TabContent, TabPane} from "reactstrap";

import {logout} from "../../store/components/logout/logout.action";
import SearchProjects from "./resources/_SearchProjects";
import CreateProject from "./resources/CreateProject";
import DeleteProject from "./resources/DeleteProject";
import EditProject from "./resources/EditProject";
import ListProjects from "./resources/ListProjects";
import ShowProject from "./resources/ShowProject";

const Projects = () => {
	const [activeTab, setActiveTab] = useState("home");

	const handleToggle = useCallback((e) => setActiveTab(e.currentTarget.getAttribute("tab") || "home"), []);

	const isHomeActive = activeTab === "home" ? "active" : "";
	const isCreateActive = activeTab === "create" ? "active" : "";
	const isSearchActive = activeTab === "search" ? "active" : "";

	return (
		<div className="Projects">
			<div className="header">
				<button className={isHomeActive} onClick={handleToggle} tab="home" type="button">
					Home
				</button>
				<button className={isCreateActive} onClick={handleToggle} tab="create" type="button">
					Create
				</button>
				<button className={isSearchActive} onClick={handleToggle} tab="search" type="button">
					Search
				</button>
				<button onClick={logout} type="button">
					Flush
				</button>
			</div>
			<TabContent activeTab={activeTab}>
				<TabPane tabId="home">
					<h3>Home Tab</h3>
					<ListProjects onToggle={handleToggle} />
				</TabPane>
				<TabPane tabId="show">
					<h3>Show Tab</h3>
					<ShowProject />
				</TabPane>
				<TabPane tabId="create">
					<h3>Create Tab</h3>
					<CreateProject />
				</TabPane>
				<TabPane tabId="edit">
					<h3>Edit Tab</h3>
					<EditProject />
				</TabPane>
				<TabPane tabId="delete">
					<h3>Delete Tab</h3>
					<DeleteProject />
				</TabPane>
				<TabPane tabId="search">
					<h3>Search Tab</h3>
					<SearchProjects />
				</TabPane>
			</TabContent>
		</div>
	);
};

export default Projects;

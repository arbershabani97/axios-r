import "./styles/Notes.scss";

import React, {useCallback, useState} from "react";
import {TabContent, TabPane} from "reactstrap";

import SearchNotes from "./resources/_SearchNotes";
import CreateNote from "./resources/CreateNote";
import DeleteNote from "./resources/DeleteNote";
import EditNote from "./resources/EditNote";
import ListNotes from "./resources/ListNotes";
import ShowNote from "./resources/ShowNote";

const Notes = () => {
	const [activeTab, setActiveTab] = useState("home");

	const handleToggle = useCallback((e) => setActiveTab(e.currentTarget.getAttribute("tab") || "home"), []);

	const isHomeActive = activeTab === "home" ? "active" : "";
	const isCreateActive = activeTab === "create" ? "active" : "";
	const isSearchActive = activeTab === "search" ? "active" : "";

	return (
		<div className="Notes">
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
			</div>
			<TabContent activeTab={activeTab}>
				<TabPane tabId="home">
					<h3>Home Tab</h3>
					<ListNotes onToggle={handleToggle} />
				</TabPane>
				<TabPane tabId="show">
					<h3>Show Tab</h3>
					<ShowNote />
				</TabPane>
				<TabPane tabId="create">
					<h3>Create Tab</h3>
					<CreateNote />
					<ListNotes onToggle={handleToggle} />
				</TabPane>
				<TabPane tabId="edit">
					<h3>Edit Tab</h3>
					<EditNote />
					<ListNotes onToggle={handleToggle} />
				</TabPane>
				<TabPane tabId="delete">
					<h3>Delete Tab</h3>
					<DeleteNote />
					<ListNotes onToggle={handleToggle} />
				</TabPane>
				<TabPane tabId="search">
					<h3>Search Tab</h3>
					<SearchNotes />
				</TabPane>
			</TabContent>
		</div>
	);
};

export default Notes;

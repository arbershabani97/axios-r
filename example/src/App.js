import "./App.scss";

import React from "react";
import {Route, Router, Switch} from "react-router-dom";

import Notes from "./components/notes/Notes";
import Projects from "./components/projects/Projects";
import history from "./history";

const App = () => {
	return (
		<div className="App">
			<Router history={history}>
				<Switch>
					<Route component={Projects} exact path="/" />
					<Route component={Notes} exact path="/notes" />
				</Switch>
			</Router>
		</div>
	);
};
export default App;

import "./styles/ShowNote.scss";

import React from "react";
import {connect} from "react-redux";

import {getNote} from "../../../store/components/note/note.API";
import {selectNote} from "../../../store/components/note/note.selector";
import {useFetchAPI} from "../../../utils/useFetchAPI";

const ShowNote = ({note}) => {
	const {id, title, userId, body} = note;
	// eslint-disable-next-line no-unused-vars
	const {handleClick, results, loading, apiError} = useFetchAPI({apiFn: getNote, data: id});

	return (
		<div className="ShowNote box">
			<p>
				id: <span>{id}</span>
			</p>
			<p>
				title: <span>{title}</span>
			</p>
			<p>
				userId: <span>{userId}</span>
			</p>
			{body && (
				<p>
					body: <span>{body}</span>
				</p>
			)}
			<button onClick={handleClick} type="button">
				Get Note
			</button>
		</div>
	);
};

const mapStateToProps = (state) => ({note: selectNote(state)});

export default connect(mapStateToProps)(ShowNote);

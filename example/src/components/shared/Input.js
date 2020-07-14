import "./Input.scss";

import React from "react";

const Input = ({defaultValue, type, name, placeholder, register, error}) => {
	const className = error ? "has-error" : "";
	return (
		<label className={className}>
			<input ref={register} defaultValue={defaultValue} name={name} placeholder={placeholder} type={type} />
			{error?.message && <span className="error">{error.message}</span>}
		</label>
	);
};
export default Input;

import _debounce from "lodash/debounce";
import {useCallback, useState} from "react";

export const useAPI = ({apiFn, debounceTime = 300, reset}) => {
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const onSubmit = useCallback(
		_debounce(async (data) => {
			try {
				setLoading(true);
				await apiFn(data);
				setLoading(false);
				reset();
			} catch (error_) {
				setError(error_?.response || "No Internet Connection!");
				setLoading(false);
			}
		}, debounceTime),
		[],
	);

	return {
		onSubmit,
		apiError: error,
		loading,
	};
};

import _debounce from "lodash/debounce";
import {useCallback, useState} from "react";

export const useSearch = ({apiFn, debounceTime = 700}) => {
	const [searchValue, setSearchValue] = useState("");
	const [results, setResults] = useState([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const submitSearch = useCallback(
		_debounce(async (search) => {
			try {
				if (!search) {
					setResults([]);
					return;
				}
				setLoading(true);
				const {data} = await apiFn({search});
				setLoading(false);
				setResults(data);
			} catch (error_) {
				setError(error_?.response || "No Internet Connection!");
				setLoading(false);
			}
		}, debounceTime),
		[],
	);

	const handleChange = (e) => {
		setSearchValue(e.target.value);
		submitSearch(e.target.value);
	};

	return {
		searchValue,
		results,
		handleChange,
		apiError: error,
		loading,
	};
};

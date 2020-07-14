import _debounce from "lodash/debounce";
import {useCallback, useState} from "react";

export const useFilterPaginationAPI = ({apiFn, debounceTime = 500}) => {
	const [currentPage, setCurrentPage] = useState(0);
	const [loadedPages, setLoadedPages] = useState(new Set());
	const [results, setResults] = useState();
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const handleFetch = useCallback(
		// eslint-disable-next-line max-statements
		_debounce(async (data, reset) => {
			try {
				setLoading(true);
				if (reset) {
					const {data: res} = await apiFn(data, reset);
					setCurrentPage(data.page);
					setLoadedPages(new Set());
					setResults(res);
				} else if (!loadedPages.has(data.page)) {
					setLoadedPages((_loadedPages) => new Set(_loadedPages).add(data.page));
					const {data: res} = await apiFn(data);
					setCurrentPage(data.page);
					setResults(res);
				}
				setLoading(false);
			} catch (error_) {
				setLoadedPages((_loadedPages) => new Set(_loadedPages).delete(data.page));
				setError(error_?.response || "No Internet Connection!");
				setLoading(false);
			}
		}, debounceTime),
	);

	return {
		handleFetch,
		results,
		apiError: error,
		currentPage,
		loadedPages,
		loading,
	};
};

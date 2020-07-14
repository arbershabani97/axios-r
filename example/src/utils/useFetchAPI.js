import {useState} from "react";

export const useFetchAPI = ({apiFn, data}) => {
	const [results, setResults] = useState();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleClick = async () => {
		try {
			setLoading(true);
			const {data: res} = await apiFn(data);
			setLoading(false);
			setResults(res);
		} catch (error_) {
			setError(error_?.response || "No Internet Connection!");
			setLoading(false);
		}
	};

	return {
		handleClick,
		results,
		apiError: error,
		loading,
	};
};

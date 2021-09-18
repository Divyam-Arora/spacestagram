import { useCallback, useState } from "react";
import { NASA_API_KEY, NASA_APOD } from "../utils/apiEndpoints";

const useHttp = function () {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const sendRequest = useCallback(async function (config, handleData) {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${NASA_APOD}?api_key=${NASA_API_KEY}&start_date=${config.startDate}&end_date=${config.endDate}`
      );

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const data = await res.json();

      handleData(data);
    } catch (err) {
      setError(err.message || "Something Went Wrong");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;

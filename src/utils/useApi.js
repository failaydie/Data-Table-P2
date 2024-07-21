import axios from "axios";
import { useCallback, useEffect, useState } from "react";

function useApi(intialURL, initialParams = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(intialURL);
  const [params, setParams] = useState(initialParams);

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axios.get(url, params);
      setData(response?.data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url, params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, loading, setUrl, setParams, };
}

export default useApi;

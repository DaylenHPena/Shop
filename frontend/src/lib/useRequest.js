import { useEffect, useState } from "react";

export const useRequest = (request) => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [shouldRefetch, refetch] = useState({});

  const fetchData = () => {
    if (typeof request == "undefined") return;
    request()
      .then((result) => {
        setResponse(result);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [shouldRefetch]);

  return { response, error, loading, refetch };
};

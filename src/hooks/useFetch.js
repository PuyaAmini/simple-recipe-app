import { useCallback, useEffect, useState } from "react";

export default function useFetch(url, method = "GET") {
  const [data, setData] = useState(null);
  const [isPending, setISPending] = useState(false);
  const [error, setError] = useState(null);

  // New state for request options
  const [options, setOptions] = useState(null);
  const postData = (postData) => {
    setOptions({
      // Set the HTTP method to POST
      method: "POST",

      // Specify JSON content type
      headers: {
        "Content-Type": "application/json",
      },

      // Convert data to JSON and include it in the request body
      body: JSON.stringify(postData),
    });
  };

  const fetchData = useCallback(
    async (fetchOptions) => {
      setISPending(true);
      const controller = new AbortController();

      try {
        const res = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const json = await res.json();
        setData(json);

        setISPending(false);
        setError(null);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("fetch aborted!");
        } else {
          setISPending(false);
          setError("could not fetch!?");
          console.log(err.message);
        }
      }
    },
    [url]
  );
  useEffect(() => {

    // Fetch data using GET method
    if (method === "GET") {
      fetchData();
    }

    // Fetch data using POST method with specified options
    if (method === "POST" && options) {
      fetchData(options);
    }
  }, [fetchData, method, options]);

  return { data, isPending, error, postData };
}

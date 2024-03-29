import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { parse } from "query-string";

import SearchResultsTable from "../components/SearchResultsTable";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

const ViewSearchResults = () => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const isError = status === "error";

  const location = useLocation();
  const { q: searchTerm } = parse(location.search);

  useEffect(() => {
    if (!searchTerm) {
      return;
    }

    setStatus("loading");

    const searchArtists = async (searchTerm) => {
      try {
        const result = await fetch(
          `/.netlify/functions/search?artist=${encodeURIComponent(searchTerm)}`
        );
        let data = await result.json();

        data = data.artists.items.filter(
          (artist) => artist.images.length && artist.genres.length
        );

        setData(data);
        setStatus("success");
      } catch (error) {
        console.log(error);
        setError(error);
        setStatus("error");
      }
    };
    searchArtists(searchTerm);
  }, [searchTerm]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return isSuccess ? (
    data?.length ? (
      <SearchResultsTable artists={data} searchTerm={searchTerm} />
    ) : (
      <ErrorMessage error={error} />
    )
  ) : null;
};

export default ViewSearchResults;

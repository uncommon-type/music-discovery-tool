import React, { Fragment, useState } from "react";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setInputValue("");
  };

  return (
    <Fragment>
      <h3>Search for an Artist</h3>
      <div className="section__form splitter">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            name="q"
            aria-label="Search"
            id="artistSearch"
            value=""
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </Fragment>
  );
};

export default SearchBar;

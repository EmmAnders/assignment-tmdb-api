import React, { useContext, useRef, useEffect, useState } from "react";
import { Context } from "../contexts/Context";

//Styles
import "../scss/components/SearchInput.scss";

const Search = () => {
  const { searchQuery, setSearchQuery } = useContext(Context);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  return (
    <div className="field">
      <label htmlFor="search"></label>
      <input
        size="100"
        type="text"
        placeholder="Type your search"
        name="query"
        onChange={handleSearchChange}
        value={searchQuery}
      />
    </div>
  );
};

export default Search;

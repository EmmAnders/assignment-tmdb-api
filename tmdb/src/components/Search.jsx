import React, { useContext, useRef, useEffect, useState } from "react";
import { Context } from "../contexts/Context";

//Styles
import "../scss/components/Search.scss";

const Search = () => {
  const { searchQuery, setSearchQuery } = useContext(Context);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  return (
    <form /*  onSubmit={search} */>
      <label htmlFor="header-search"></label>
      <input
        size="100"
        className="search-input"
        type="text"
        placeholder="i.e. American Pie"
        name="query"
        onChange={handleSearchChange}
        value={searchQuery}
      />
    </form>
  );
};

export default Search;

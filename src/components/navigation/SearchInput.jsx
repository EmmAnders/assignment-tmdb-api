import React, { useContext, useRef, useEffect, useState } from "react";
import { Context } from "../../contexts/Context";
import { useHistory } from "react-router-dom";

//Styles
import "../../assets/scss/components/navigation/SearchInput.scss";

const Search = (props) => {
  const history = useHistory();
  const { searchQuery, setSearchQuery, openSearch, setOpenSearch } = useContext(
    Context
  );

  const handleOnSubmit = (e) => {
    e.preventDefault();
    history.push(`/movies/search?keyword=${searchQuery}`);
    setOpenSearch(false);
    document.body.classList.remove("overflow-hidden");
  };

  const handleCloseSearch = () => {
    setOpenSearch(!openSearch);
    document.body.classList.remove("overflow-hidden");
  };

  return (
    <>
      <div className="search-field">
        <form onSubmit={handleOnSubmit}>
          <input
            size="100"
            type="text"
            placeholder="Type your search"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
          <p>Press enter</p>
        </form>
      </div>
      <div onClick={handleCloseSearch} className="overlay"></div>
    </>
  );
};

export default Search;

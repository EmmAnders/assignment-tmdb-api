import React, { useContext, useEffect, useRef } from "react";
import { Context } from "../contexts/Context";
import { search } from "../services/API";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";

import PageGridModule from "../components/modules/PageGridModule";
import MoviesModule from "../components/modules/MoviesModule";

//Styles
import "../assets/scss/pages/Search.scss";
//Styles
import "../assets/scss/components/navigation/SearchInput.scss";

const Search = () => {
  const history = useHistory();
  const { searchQuery, data, setOpenSearch, setSearchQuery } = useContext(
    Context
  );

  const handleOnSubmit = (e) => {
    e.preventDefault();
    history.push(`/movies/search?keyword=${searchQuery}`);
    setOpenSearch(false);
  };

  return (
    <div className="search-page">
      <div className="search-page-field">
        <form onSubmit={handleOnSubmit}>
          <input
            size="100"
            type="text"
            placeholder="Type your search"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
        </form>
      </div>

      {data?.results.length > 0 ? <MoviesModule data={data} /> : null}
    </div>
  );
};

export default Search;

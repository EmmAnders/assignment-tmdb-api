import React, { useContext, useEffect, useRef } from "react";
import { Context } from "../contexts/Context";
import { search } from "../services/API";
import { useQuery } from "react-query";

import PageGridModule from "../components/modules/PageGridModule";
import Card from "../components/Card";

//Animation
import skewElements from "../components/animation/SkewElements";

//Styles
import "../scss/pages/Search.scss";

const Search = () => {
  const { searchQuery, openSearch, handleClickToMovieId } = useContext(Context);
  const { isLoading, isError, error, data, isPreviousData } = useQuery(
    ["search-movies", searchQuery],
    () => {
      if (searchQuery) {
        return search(searchQuery);
      }
    },
    {
      keepPreviousData: true,
    }
  );

  const elements = useRef(null);
  elements.current = [];

  const addToRefs = (el) => {
    if (el && !elements.current.includes(el)) {
      elements.current.push(el);
    }
  };

  useEffect(() => {
    skewElements(elements.current);
  }, [elements.current]);

  return (
    <PageGridModule>
      {data?.results.length > 0 ? (
        <PageGridModule>
          {data.results.map((movie) => (
            <div ref={addToRefs} key={movie.id}>
              <Card
                onClick={() => handleClickToMovieId(movie.id)}
                src={movie.poster_path}
                title={movie.title}
              ></Card>
            </div>
          ))}
        </PageGridModule>
      ) : (
        <div className="search-error">NO RESULTS FOUND.</div>
      )}
    </PageGridModule>
  );
};

export default Search;

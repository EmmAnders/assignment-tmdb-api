import React, { useState, useEffect, useContext } from "react";
import { Context } from "../contexts/Context";

import { search } from "../services/API";
import { useQuery } from "react-query";
import Search from "../components/Search";

import Card from "../components/Card";

//Styles
import "../scss/pages/Movies.scss";

const Home = () => {
  const { searchQuery, setSearchQuery } = useContext(Context);

  const { isLoading, isError, error, data, isPreviousData } = useQuery(
    ["search-movies", searchQuery],
    () => search(searchQuery),
    {
      keepPreviousData: true,
    }
  );

  return (
    <div>
      {/*       {isLoading && <p>Loading movies...</p>}
      {isError && <p>({error})</p>} */}

      <Search />
      <section className="movies-page-container">
        <section className="page-content">
          {data?.results.length > 0
            ? data.results.map((movie) => (
                <React.Fragment key={movie.id}>
                  <Card
                    /* onClick={() => handleClickToMovieId(movie.id)} */
                    src={movie.poster_path}
                    title={movie.title}
                  ></Card>
                </React.Fragment>
              ))
            : null}
        </section>
      </section>
    </div>
  );
};

export default Home;

import React, { useContext, useRef, useEffect } from "react";
import { useQuery } from "react-query";
import { gsap } from "gsap";

//Context, API
import { getTopRatedMovies } from "../services/API";
import { Context } from "../contexts/Context";

//Components
import PageGridModule from "../components/modules/PageGridModule";
import MarqueeHeadingLg from "../components/animation/MarqueeHeadingLg";
import Card from "../components/Card";

const TopRatedMoviesPage = () => {
  const { handleClickToMovieId, staggerElements } = useContext(Context);
  const { data, error, isError, isLoading } = useQuery(
    "top-rated-movies",
    getTopRatedMovies
  );

  const textArray = [
    "top rated",
    "top rated",
    "top rated",
    "top rated",
    "top rated",
    "top rated",
    "top rated",
    "top rated",
    "top rated",
    "top rated",
    "top rated",
  ];

  return (
    <>
      {isLoading && <p>Loading movies...</p>}
      {isError && <p>({error})</p>}
      {data?.results && (
        <>
          <MarqueeHeadingLg textArray={textArray}></MarqueeHeadingLg>
          <PageGridModule>
            {data.results.map((movie, i) => (
              <div key={movie.id}>
                <Card
                  onClick={() => handleClickToMovieId(movie.id)}
                  src={movie.poster_path}
                  title={movie.title}
                ></Card>
              </div>
            ))}
          </PageGridModule>
        </>
      )}
    </>
  );
};

export default TopRatedMoviesPage;

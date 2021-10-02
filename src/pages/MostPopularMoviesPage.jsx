import React, { useContext, useEffect, useRef } from "react";
import { useQuery } from "react-query";

//Context. API
import { Context } from "../contexts/Context";
import { getMostPopularMovies } from "../services/API";

//Components
import PageGridModule from "../components/modules/PageGridModule";
import MarqueeHeadingLg from "../components/animation/MarqueeHeadingLg";
import Card from "../components/Card";

const MostPopularMoviesPage = () => {
  const { handleClickToMovieId, staggerElements } = useContext(Context);

  const { data, error, isError, isLoading } = useQuery(
    "popular-movies",
    getMostPopularMovies
  );

  let textArray = [
    " Popular",
    "Popular",
    " Popular",
    "Popular",
    " Popular",
    " Popular",
    " Popular",
    " Popular",
    "Popular",
  ];

  return (
    <>
      {isLoading && <p>Loading movies...</p>}
      {isError && <p>({error})</p>}
      {data?.results && (
        <>
          <MarqueeHeadingLg textArray={textArray}></MarqueeHeadingLg>
          <PageGridModule>
            {data.results.map((movie) => (
              <div key={movie.id}>
                <Card
                  onClick={() => handleClickToMovieId(movie.id)}
                  src={movie.poster_path}
                  title={movie.title}
                  releaseDate={movie.release_date}
                  subtitle={"Popularity"}
                  voteAverage={movie.popularity}
                ></Card>
              </div>
            ))}
          </PageGridModule>
        </>
      )}
    </>
  );
};

export default MostPopularMoviesPage;

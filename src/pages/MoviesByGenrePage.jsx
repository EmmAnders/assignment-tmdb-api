import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useQueryParam, NumberParam } from "use-query-params";

//Context, API
import { getMoviesByGenreId } from "../services/API";
import MoviesModule from "../components/modules/MoviesModule";

//Components
import MarqueeHeadingLg from "../components/animation/MarqueeHeadingLg";
import Pagination from "../components/Pagination";

const GenrePage = () => {
  const { id, name } = useParams();
  const [param, setParam] = useQueryParam("page", NumberParam);

  const { isLoading, isError, error, data, isPreviousData } = useQuery(
    ["genre-movies", { param, id }],
    getMoviesByGenreId,
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    setParam(1);
  }, []);

  const textArray = [name, name, name, name, name, name];

  return (
    <>
      {isError && <div>{error.message}</div>}
      {isLoading && <div>Loading...</div>}
      <MarqueeHeadingLg textArray={textArray}></MarqueeHeadingLg>
      {data?.results && (
        <>
          <MoviesModule data={data} />
          <Pagination
            onClickPrevious={() => setParam((old) => Math.max(old - 1, 1))}
            disabledPrevious={param === 1}
            page={param}
            totalPages={data.total_pages}
            onClickNext={() => {
              if (!isPreviousData && data.page) {
                setParam((old) => old + 1);
              }
            }}
            disabledNext={isPreviousData || !data.page}
          ></Pagination>
        </>
      )}
    </>
  );
};

export default GenrePage;

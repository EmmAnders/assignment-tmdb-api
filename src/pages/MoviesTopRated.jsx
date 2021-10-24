import React, { useContext, useRef, useEffect } from "react";
import { useQuery } from "react-query";
import { useQueryParam, NumberParam } from "use-query-params";

import { gsap } from "gsap";

//Context, API
import { getTopRatedMovies } from "../services/API";

//Components
import MoviesModule from "../components/modules/MoviesModule";
import Pagination from "../components/Pagination";
import MarqueeHeading from "../components/common/MarqueeHeading";

const MoviesTopRated = () => {
  const [param, setParam] = useQueryParam("page", NumberParam);

  const { data, error, isError, isLoading, isPreviousData } = useQuery(
    ["top-rated-movies", { param }],
    getTopRatedMovies,
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    setParam(1);
  }, []);

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
          <MarqueeHeading textArray={textArray}></MarqueeHeading>
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

export default MoviesTopRated;

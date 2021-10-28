import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useQueryParam, NumberParam } from "use-query-params";

//Context, API
import { getMoviesByGenreId } from "../services/API";
import MoviesModule from "../components/modules/MoviesModule";

import { motion } from "framer-motion";
import { PageAnimation } from "../components/animation/animation.js";

//Components
import MarqueeHeading from "../components/common/MarqueeHeading";
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

  const textArray = [
    name,
    name,
    name,
    name,
    name,
    name,
    name,
    name,
    name,
    name,
    name,
    name,
  ];

  return (
    <motion.div
      variants={PageAnimation}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      {isError && <div>{error.message}</div>}
      {isLoading && <div>Loading...</div>}
      <MarqueeHeading textArray={textArray}></MarqueeHeading>
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
    </motion.div>
  );
};

export default GenrePage;

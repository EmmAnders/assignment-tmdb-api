import React, { useContext, useRef, useEffect } from "react";
import { useQuery } from "react-query";
import { useQueryParam, NumberParam } from "use-query-params";

//Context, API
import { getLatestMovies } from "../services/API";

import { motion } from "framer-motion";
import { PageAnimation } from "../components/animation/animation.js";

//Components
import MarqueeHeading from "../components/common/MarqueeHeading";
import Pagination from "../components/Pagination";
import MoviesModule from "../components/modules/MoviesModule";

//Styles
import "../assets/scss/pages/Movies.scss";

const MoviesLatest = () => {
  const [param, setParam] = useQueryParam("page", NumberParam);
  const { data, error, isError, isLoading, isPreviousData } = useQuery(
    ["latest-movies", { param }],
    getLatestMovies,
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    setParam(1);
  }, []);

  // Text Array for Heading
  let textArray = [
    "latest",
    "latest",
    "latest",
    "latest",
    "latest",
    "latest",
    "latest",
  ];

  return (
    <>
      {isLoading && <p>Loading movies...</p>}
      {isError && <p>({error})</p>}

      {data?.results && (
        <motion.div
          variants={PageAnimation}
          initial="hidden"
          animate="show"
          exit="exit"
        >
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
        </motion.div>
      )}
    </>
  );
};

export default MoviesLatest;

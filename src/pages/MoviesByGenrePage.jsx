import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import { useUrlSearchParams } from "use-url-search-params";

//Context, API
import { Context } from "../contexts/Context";
import { getMoviesByGenreId } from "../services/API";

//Components
import PageGridModule from "../components/modules/PageGridModule";
import MarqueeHeadingLg from "../components/animation/MarqueeHeadingLg";
import Card from "../components/Card";
import Pagination from "../components/Pagination";

//Animation
import skewElements from "../components/animation/SkewElements";

const GenrePage = () => {
  const { handleClickToMovieId } = useContext(Context);
  const { id, name } = useParams();
  const history = useHistory();

  const [params, setParams] = useUrlSearchParams({ page: 1 }, { page: Number });
  const [page, setPage] = useState(params.page);

  const { isLoading, isError, error, data, isPreviousData } = useQuery(
    ["genre-movies", { page, id }],
    getMoviesByGenreId,
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
    setParams({ ...params, page });
  }, [page]);

  useEffect(() => {
    return history.listen((location) => {
      if (location.pathname) {
        setPage(1);
      }
    });
  }, [id]);

  useEffect(() => {
    skewElements(elements.current);
  });

  const textArray = [name, name, name, name, name, name];

  return (
    <>
      {isError && <div>{error.message}</div>}
      {isLoading && <div>Loading...</div>}
      <MarqueeHeadingLg textArray={textArray}></MarqueeHeadingLg>
      {data?.results && (
        <>
          <PageGridModule>
            {data.results.map((movie, i) => (
              <div ref={addToRefs} key={movie.id}>
                <Card
                  onClick={() => handleClickToMovieId(movie.id)}
                  src={movie.poster_path}
                  title={movie.title}
                  releaseDate={movie.release_date}
                  voteAverage={movie.vote_average}
                ></Card>
              </div>
            ))}
          </PageGridModule>

          <Pagination
            onClickPrevious={() => setPage((old) => Math.max(old - 1, 1))}
            disabledPrevious={page === 1}
            page={page}
            totalPages={data.total_pages}
            onClickNext={() => {
              if (!isPreviousData && data.page) {
                setPage((old) => old + 1);
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

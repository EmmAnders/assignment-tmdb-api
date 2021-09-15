import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import { useUrlSearchParams } from "use-url-search-params";

//Context, API
import { Context } from "../contexts/Context";
import { getMoviesByGenreId } from "../services/API";

//Components
import MarqueeHeadingLg from "../components/animation/MarqueeHeadingLg";
import Card from "../components/Card";
import Pagination from "../components/Pagination";

//Styles
import "../scss/pages/Movies.scss";

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

  const textArray = [name, name, name, name, name, name];

  return (
    <>
      {isError && <div>{error.message}</div>}
      {isLoading && <div>Loading...</div>}
      <MarqueeHeadingLg textArray={textArray}></MarqueeHeadingLg>
      {data?.results && (
        <section className="movies-page-container">
          <section className="page-content">
            {data.results.map((movie, i) => (
              <React.Fragment key={movie.id}>
                <Card
                  onClick={() => handleClickToMovieId(movie.id)}
                  src={movie.poster_path}
                  title={movie.title}
                  releaseDate={movie.release_date}
                  voteAverage={movie.vote_average}
                ></Card>
              </React.Fragment>
            ))}
          </section>

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
        </section>
      )}
    </>
  );
};

export default GenrePage;

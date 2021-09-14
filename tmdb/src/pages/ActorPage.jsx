import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

//Context, API
import { Context } from "../contexts/Context";
import { getMoviesByActorId, getActorProfileById } from "../services/API";

//Components
import HeadingLg from "../components/HeadingLg";
import HeadingSm from "../components/HeadingSm";
import Card from "../components/Card";
import Button from "../components/Button";

//Icons
import arrowLeft from "../assets/icons/arrow-left.svg";

//Styles
import "../scss/pages/ActorPage.scss";

const ActorPage = () => {
  const { handleClickToMovieId, baseUrlImg } = useContext(Context);

  const { id } = useParams();

  const movies = useQuery(["movies-by-actor", id], () =>
    getMoviesByActorId(id)
  );

  const profile = useQuery(["actor-info", id], () => getActorProfileById(id));

  const [loadMovies, setLoadMovies] = useState(5);

  const handleLoadMore = () => {
    setLoadMovies(loadMovies + 5);
  };

  return (
    <section className="actor-page-container">
      {movies.isError || (profile.isError && <div>{error.message}</div>)}
      {movies.isLoading || (profile.isLoading && <div>Loading...</div>)}

      {profile.data && (
        <>
          <section className="profile-container">
            <HeadingLg text={profile.data.name}></HeadingLg>

            <section className="subheading">
              <p>{profile.data.place_of_birth}</p>
            </section>

            <section className="content">
              <div>
                <div className="image-container">
                  <div className="tile">
                    <img
                      src={baseUrlImg + profile.data.profile_path}
                      alt="picture of actor"
                    />
                  </div>

                  <div className="tile">
                    <img
                      src={baseUrlImg + profile.data.profile_path}
                      alt="picture of actor"
                    />
                  </div>

                  <div className="tile">
                    <img
                      src={baseUrlImg + profile.data.profile_path}
                      alt="picture of actor"
                    />
                  </div>
                </div>

                <div className="link">
                  <a href={`https://www.imdb.com/name/${profile.data.imdb_id}`}>
                    <div>Imdb</div>
                    <div>
                      <img src={arrowLeft} alt="arrow-left" />
                    </div>
                  </a>
                </div>
              </div>
              <div className="text">
                <p>{profile.data.biography}</p>
              </div>
            </section>
          </section>
          <HeadingSm text={"Movies by" + " " + profile.data.name}></HeadingSm>
        </>
      )}

      {movies.data?.results && (
        <>
          <section className="movies-container">
            {movies.data.results.length > 0 ? (
              <>
                {movies.data.results.map((movie, i) => {
                  if (i === loadMovies) {
                    return null;
                  } else if (i < loadMovies) {
                    return (
                      <React.Fragment key={movie.id}>
                        <Card
                          onClick={() => handleClickToMovieId(movie.id)}
                          src={movie.poster_path}
                          title={movie.title}
                          releaseDate={movie.release_date}
                          voteAverage={movie.vote_average}
                          genre1={movie.genre_ids.map((id) => id).join("/")}
                        ></Card>
                      </React.Fragment>
                    );
                  }
                })}
              </>
            ) : (
              <p className="no-content">It's Empty..</p>
            )}
          </section>

          {loadMovies < movies.data.results.length ? (
            <Button
              className="btn-wrapper"
              cta="Load more"
              onClick={handleLoadMore}
            ></Button>
          ) : (
            ""
          )}
        </>
      )}
    </section>
  );
};

export default ActorPage;

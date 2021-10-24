import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { motion } from "framer-motion";

//Context, API
import { Context } from "../contexts/Context";
import { getMoviesByActorId, getActorProfileById } from "../services/API";

//Components
import MarqueeHeading from "../components/common/MarqueeHeading";
import PageGridModule from "../components/modules/PageGridModule";
import Card from "../components/Card";
import ArrowUpRight from "../components/fragments/ArrowUpRight";
import LoadMoreBtn from "../components/common/LoadMoreBtn";
import BackButton from "../components/common/BackButton";

//Styles
import "../assets/scss/pages/ActorPage.scss";

const ActorPage = () => {
  const [loadMovies, setLoadMovies] = useState(4);
  const [actorNameArray, setActorNameArray] = useState([]);

  const { handleClickToMovieId, baseUrlImg } = useContext(Context);
  const { id } = useParams();
  const profile = useQuery(["actor-info", id], () => getActorProfileById(id));
  const movies = useQuery(["movies-by-actor", id], () =>
    getMoviesByActorId(id)
  );

  //Names for animation on heading
  useEffect(() => {
    if (profile.data) {
      setActorNameArray([
        profile.data.name,
        profile.data.name,
        profile.data.name,
        profile.data.name,
        profile.data.name,
      ]);
    }
  }, [profile.data]);

  return (
    <section className="actor-page-container">
      {movies.isError || (profile.isError && <div>{error.message}</div>)}
      {movies.isLoading || (profile.isLoading && <div>Loading...</div>)}

      {profile.data && (
        <>
          <section className="profile-container">
            <BackButton />
            <MarqueeHeading textArray={actorNameArray}></MarqueeHeading>
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
              </div>

              <div className="text">
                <p className="bio">{profile.data.biography}</p>
                <div className="link">
                  <a href={`https://www.imdb.com/name/${profile.data.imdb_id}`}>
                    <div className="imdb">
                      <p>IMDB</p>
                      <ArrowUpRight />
                    </div>
                  </a>
                </div>
              </div>
            </section>
          </section>
        </>
      )}
      {movies.data?.results && (
        <>
          <PageGridModule>
            {movies.data.results.map((movie, i) => {
              if (i === loadMovies) {
                return null;
              } else if (i < loadMovies) {
                return (
                  <div className="card-wrapper" key={movie.id}>
                    <Card
                      onClick={() => handleClickToMovieId(movie.id)}
                      src={movie.poster_path}
                      title={movie.title}
                    ></Card>
                  </div>
                );
              }
            })}
          </PageGridModule>
          {loadMovies < movies.data.results.length ? (
            <LoadMoreBtn
              onClick={() => setLoadMovies(loadMovies + 8)}
            ></LoadMoreBtn>
          ) : (
            ""
          )}
        </>
      )}
    </section>
  );
};

export default ActorPage;

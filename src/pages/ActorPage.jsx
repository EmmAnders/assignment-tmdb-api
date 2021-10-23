import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { motion } from "framer-motion";

//Context, API
import { Context } from "../contexts/Context";
import { getMoviesByActorId, getActorProfileById } from "../services/API";

//Animations
import Marquee from "react-fast-marquee";

//Components
import MoviesModule from "../components/modules/MoviesModule";
import MarqueeHeadingLg from "../components/animation/MarqueeHeadingLg";
import PageGridModule from "../components/modules/PageGridModule";
import HeadingLg from "../components/HeadingLg";
import HeadingSm from "../components/HeadingSm";
import Card from "../components/Card";
import Button from "../components/Button";

//Styles
import "../assets/scss/pages/ActorPage.scss";

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

  const [actorNameArray, setActorNameArray] = useState([]);

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
            <MarqueeHeadingLg textArray={actorNameArray}></MarqueeHeadingLg>
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
                <p>{profile.data.biography}</p>
                <div className="link">
                  <a href={`https://www.imdb.com/name/${profile.data.imdb_id}`}>
                    <div>Imdb</div>
                  </a>
                </div>
              </div>
            </section>
          </section>
          <HeadingSm
            text={"Movies by" + " " /* profile.data.name */}
          ></HeadingSm>
        </>
      )}
      {movies.data?.results && <MoviesModule data={movies.data} />}
    </section>
  );
};

export default ActorPage;

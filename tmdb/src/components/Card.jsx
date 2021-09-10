import React, { useState } from "react";

import "../scss/components/Card.scss";
import movie from "../assets/icons/movie.svg";
import arrow from "../assets/icons/arrow-down-right.svg";

const Card = (props) => {
  const baseUrlImg = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="card">
      <div className="img">
        <img src={baseUrlImg + props.src} alt={props.alt} />
      </div>
      <div className="genres">
        <p>{props.genre1}</p>
        <p>{props.genre2}</p>
        <p>{props.genre3}</p>
        <p>{props.genre4}</p>
      </div>
      <div className="title">
        <h2>{props.title}</h2>
      </div>
      <div className="hover-content">
        {/* <div className="original-language">
          <p className="sub-title">Original Language</p>
          <p>{props.originalLanguage}</p>
        </div>

        <div className="original-title">
          <p className="sub-title">Original Title:</p>
          <p>{props.originalTitle}</p>
        </div> */}
        <div className="details-wrapper">
          <div className="release-date">
            <p className="sub-title">Release Date</p>
            <p>{props.releaseDate}</p>
          </div>

          <div className="vote-average">
            <p className="sub-title">{props.subtitle}</p>
            <p>{props.voteAverage}</p>
          </div>
        </div>

        <div className="cta-wrapper">
          <div className="cta">
            <p>View details </p>
            <img src={arrow} alt="arrow" />
          </div>
          {/*    <div>
            <img src={movie} alt="movie icon" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Card;

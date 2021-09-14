import React from "react";

import "../scss/components/Card.scss";


const Card = (props) => {
  const baseUrlImg = "https://image.tmdb.org/t/p/w500";

  return (
    <div onClick={props.onClick} className="card">
      <div className="card-img">
        <img src={baseUrlImg + props.src} alt={props.alt} />
      </div>

      <div className="card-title">
        <h2>{props.title}</h2>
      </div>

      <div className="hover-content">
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
      </div>
    </div>
  );
};

export default Card;

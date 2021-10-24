import React from "react";

import "../assets/scss/components/Card.scss";

const Card = (props) => {
  const baseUrlImg = "https://image.tmdb.org/t/p/w500";

  return (
    <div ref={props.ref} onClick={props.onClick} className="card">
      <div className="card-content-wrapper">
        <div className="img-wrapper">
          <img
            src={props.src ? baseUrlImg + props.src : null}
            alt={props.alt}
          />
        </div>
        <div className="card-title">
          <h4>{props.title}</h4>
        </div>
      </div>
    </div>
  );
};

export default Card;

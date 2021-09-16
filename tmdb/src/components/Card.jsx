import React from "react";

import "../scss/components/Card.scss";

const Card = (props) => {
  const baseUrlImg = "https://image.tmdb.org/t/p/w500";

  return (
    <div ref={props.ref} onClick={props.onClick} className="card">
      <div className="card-img">
        <img src={props.src ? baseUrlImg + props.src : null} alt={props.alt} />
      </div>
      <div className="card-title">
        <h2>{props.title}</h2>
      </div>
    </div>
  );
};

export default Card;

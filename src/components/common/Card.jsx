import React from "react";
import "../../assets/scss/components/common/Card.scss";

const Card = (props) => {
  const baseUrlImg = "https://image.tmdb.org/t/p/w500";

  return (
    <div onClick={props.onClick} className="card">
      <div className="card-top">
        <p className="card-top-title">{props.title}</p>
        <p className="card-top-release">{props.release}</p>
      </div>
      <div className="card-left">
        <img src={props.src ? baseUrlImg + props.src : null} />
      </div>

      <div className="card-right">
        <p>{props.description}</p>
        <div className="card-right-bottom">
          <p>View</p>
          <p className="card-right-bottom-votes" >{props.vote_average}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;

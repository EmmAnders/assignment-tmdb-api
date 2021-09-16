import React from "react";

import "../scss/components/Pagination.scss";
import arrowLeft from "../assets/icons/arrow-left.svg";
import arrowRight from "../assets/icons/arrow-right.svg";

const Pagination = (props) => {
  return (
    <div className="pagination">
      <div>
        <button
          onClick={props.onClickPrevious}
          disabled={props.disabledPrevious}
        >
          <img src={arrowLeft} alt="back" />
        </button>
      </div>
      <div>
        <p>
          {props.page} of {props.totalPages}
        </p>
      </div>

      <div>
        <button onClick={props.onClickNext} disabled={props.disabledNext}>
          <img src={arrowRight} alt="forward" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;

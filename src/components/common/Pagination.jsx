import React from "react";

import "../../assets/scss/components/common/Pagination.scss";

const Pagination = (props) => {
  return (
    <div className="pagination">
      <div>
        <button
          className="previous"
          onClick={props.onClickPrevious}
          disabled={props.disabledPrevious}
        >
          Previous
        </button>
      </div>
      {/* <div>
        <p>
          {props.page} of {props.totalPages}
        </p>
      </div> */}

      <div>
        <button
          className="next"
          onClick={props.onClickNext}
          disabled={props.disabledNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;

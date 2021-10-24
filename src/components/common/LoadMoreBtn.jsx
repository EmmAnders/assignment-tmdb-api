import React from "react";

import "../../assets/scss/components/common/LoadMoreBtn.scss";

const LoadMoreBtn = ({ onClick }) => {
  return (
    <div className="load-more-btn">
      <button onClick={onClick}>
        Load More
      </button>
    </div>
  );
};

export default LoadMoreBtn;

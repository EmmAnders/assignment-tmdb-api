import React from "react";

import "../assets/scss/components/Row.scss";

const Row = (props) => {
  return (
    <div className="row">
      <p>{props.label}</p>

      <div className="row-inner-right">
        <p>{props.text}</p>
        <div>{props.icon}</div>
      </div>
    </div>
  );
};

export default Row;

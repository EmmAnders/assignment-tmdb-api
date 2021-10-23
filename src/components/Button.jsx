import React from "react";
import "../assets/scss/components/Button.scss";

const Button = (props) => {
  return (
    <div className={props.className}>
      <button className="button" onClick={props.onClick}>
        {props.cta}
      </button>
    </div>
  );
};

export default Button;

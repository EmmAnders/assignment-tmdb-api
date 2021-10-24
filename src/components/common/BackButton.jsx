import React from "react";
import { useHistory } from "react-router";

import "../../assets/scss/components/common/BackButton.scss";
import ArrowLeft from "../fragments/ArrowLeft";

const BackButton = () => {
  const history = useHistory();

  return (
    <div>
      <button className="back-button" onClick={history.goBack}>
        <ArrowLeft />
        Back
      </button>
    </div>
  );
};

export default BackButton;

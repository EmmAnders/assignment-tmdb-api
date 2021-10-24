import React from "react";

//Styles
import "../../assets/scss/components/modules/PageGridModule.scss";

const PageGridModule = ({ children }) => {
  return (
    <section className="page-grid">
      <section className="page-grid-inner">{children}</section>
    </section>
  );
};

export default PageGridModule;

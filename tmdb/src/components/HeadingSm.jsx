import React from "react";
import "../scss/components/Heading.scss";

const HeadingSm = (props) => {
  return (
    <section className={`${props.className} heading-sm`}>
      <h2>{props.text}</h2>
    </section>
  );
};

export default HeadingSm;

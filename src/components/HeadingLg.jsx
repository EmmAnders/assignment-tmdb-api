import React, { useEffect, useState, useRef } from "react";

import "../scss/components/Heading.scss";

const HeadingLg = (props) => {
  return (
    <section className={`${props.className} heading-lg`}>
      <h1>{props.text}</h1>
    </section>
  );
};

export default HeadingLg;

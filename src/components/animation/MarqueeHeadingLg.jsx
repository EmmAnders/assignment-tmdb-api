import React, { useEffect, useState, useRef } from "react";
import Marquee from "react-fast-marquee";

import "../../scss/components/Heading.scss";

const MarqueeHeadingLg = (props) => {
  return (
    <section className={`${props.className} heading-lg`}>
      <Marquee speed={[150]} gradient={false}>
        {props.textArray &&
          props.textArray.map((word, i) => (
            <React.Fragment key={i}>
              <h1>{word}</h1>
            </React.Fragment>
          ))}
      </Marquee>
    </section>
  );
};

export default MarqueeHeadingLg;

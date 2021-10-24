import React, { useEffect, useState, useRef } from "react";
import Marquee from "react-fast-marquee";

import "../../assets/scss/components/common/Heading.scss";

const MarqueeHeadingLg = (props) => {
  return (
    <section className={`${props.className} heading-lg`}>
      <Marquee speed={[120]} gradient={false} direction={"right"}>
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

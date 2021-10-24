import React, { useEffect, useState, useRef } from "react";
import Marquee from "react-fast-marquee";

import "../../assets/scss/components/common/Heading.scss";

const MarqueeHeadingLg = (props) => {
  return (
    <section className={`${props.className} heading-sm`}>
      <Marquee speed={[100]} gradient={false} direction={"left"}>
        {props.textArray &&
          props.textArray.map((word, i) => (
            <React.Fragment key={i}>
              <h2>{word}</h2>
            </React.Fragment>
          ))}
      </Marquee>
    </section>
  );
};

export default MarqueeHeadingLg;

import React from "react";
import Marquee from "react-fast-marquee";

import "../assets/scss/components/Heading.scss";

const HeadingSm = (props) => {
  return (
    <section className={`${props.className} heading-sm`}>
      {/*       <Marquee direction="right" speed={[250]} gradient={false}> */}
      <h2>{props.text}</h2>
      {/*       </Marquee> */}
    </section>
  );
};

export default HeadingSm;

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const Cursor = () => {
  const cursor = useRef();
  const follower = useRef();

  gsap.set(follower.current, { xPercent: -50, yPercent: -50 });
  gsap.set(cursor.current, { xPercent: -50, yPercent: -50 });

  window.addEventListener("mousemove", (e) => {
    gsap.to(cursor.current, 0.2, { x: e.clientX, y: e.clientY });
    gsap.to(follower.current, 0.9, { x: e.clientX, y: e.clientY });
  });

  return (
    <>
      <div ref={cursor} className="cursor"></div>
      <div ref={follower} className="follower"></div>
    </>
  );
};

export default Cursor;

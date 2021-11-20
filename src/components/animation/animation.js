export const PageAnimation = {
  hidden: {
    opacity: 0,
    y: 300,
  },

  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 1,
      when: "beforeChildren",
      staggerChildren: 0.8,
      delayChildren: 0.2,
    },
  },

  exit: { opacity: 0, x: 300, transition: { duration: 0.7 } },
};

export const fade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { ease: "easeOut", duration: 0.75 } },
};

export const iconHoverRight = {
  rest: {
    y: 0,
  },
  hover: {
    y: 10,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

export const stagger = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

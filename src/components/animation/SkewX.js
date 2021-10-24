export default function skewX(container) {
  let newPosition;

  window.onscroll = () => {
    container.style.left = `${-window.scrollY}px`;
  };

  let currentPosition = container.getBoundingClientRect().left;

  const callDistort = () => {
    let newPosition = container.getBoundingClientRect().left;
    let diff = newPosition - currentPosition;
    let speed = diff * 0.35;

    container.style.transform = `skewX${speed}deg`;
  };
  currentPosition = newPosition;
  requestAnimationFrame(callDistort);
}

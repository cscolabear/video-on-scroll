
const video1 = document.querySelector('#video-1');
const video2 = document.querySelector('#video-2');
const dummy1 = document.querySelector('#dummy-1');
const dummy2 = document.querySelector('#dummy-2');

const getVideoScrollContainerY = elem => {
  return Math.abs(elem.getBoundingClientRect().top);
}

const getViewportHeight = () => {
  return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
}

const isInViewport = elem => {
  const bounding = elem.getBoundingClientRect();
  return bounding.top <= 0 &&
    bounding.bottom > 0;
};

window.addEventListener('scroll', function (e) {
  if (isInViewport(dummy1)) {
    const FRAMES = 1080;
    const FPS = 60;
    const time = (getVideoScrollContainerY(dummy1) / getViewportHeight()) * FRAMES / FPS;
    video1.currentTime = time > video1.duration ?
      video1.duration :
      time;
  }

  if (isInViewport(dummy2)) {
    const FRAMES = 150;
    const FPS = 60;
    const time = (getVideoScrollContainerY(dummy2) / getViewportHeight()) * FRAMES / FPS;
    video2.currentTime = time > video2.duration ?
        video2.duration :
        time;
  }
});

window.addEventListener('load', function (e) {
  video1.pause();
  video1.currentTime = 0;
  video2.pause();
  video2.currentTime = 0;
});

const playbackConst = 500; // lower numbers = faster playback
const video1 = document.querySelector('#video-1');
const video2 = document.querySelector('#video-2');
const video3 = document.querySelector('#video-3');
const dummy1 = document.querySelector('#dummy-1');
const dummy2 = document.querySelector('#dummy-2');
const dummy3 = document.querySelector('#dummy-3');

const containers = [dummy1, dummy2, dummy3];
const videos = [video1, video2, video3];

const isInViewport = elem => {
  return (elem.getBoundingClientRect().top + elem.getBoundingClientRect().height) > 0;
}

const getVideoScrollContainerY = elem => {
  if (elem.getBoundingClientRect().top >= 0) {
    return 0;
  }

  return Math.abs(elem.getBoundingClientRect().top);
}

const getViewportHeight = () => {
  return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
}

const getVideoDuration = elem => {
  return elem.dataset.duration || elem.duration || 0;
}

const getVideoStartTime = elem => {
  return parseFloat(elem.dataset.starttime) || 0;
}

const setVideoCurrentTime = (container, video) => {
  if (!isInViewport(video)) {
    return;
  }
  video.currentTime = (getVideoScrollContainerY(container) / playbackConst)
    + getVideoStartTime(video);
}

const scrollPlay = () => {
  setVideoCurrentTime(dummy1, video1);
  setVideoCurrentTime(dummy2, video2);
  setVideoCurrentTime(dummy3, video3);

  window.requestAnimationFrame(scrollPlay);
}
window.requestAnimationFrame(scrollPlay);

window.addEventListener('load', function (e) {
  video1.pause();
  video1.currentTime = getVideoStartTime(video1);
  video2.pause();
  video2.currentTime = getVideoStartTime(video2);
  video3.pause();
  video3.currentTime = getVideoStartTime(video3);
});

const setVideoContainerHeight = (container, video) => {
  container.style.minHeight =
    container.style.maxHeight =
      Math.floor(getVideoDuration(video))
        * playbackConst
        + getViewportHeight()
        + 'px';
  console.log(container.style.maxHeight);
}

videos.forEach((video, index) => {
  video.addEventListener('loadedmetadata', function () {
    setVideoContainerHeight(containers[index], video);
  });
});

window.addEventListener("resize", function () {
  setVideoContainerHeight(dummy1, video1);
  setVideoContainerHeight(dummy2, video2);
  setVideoContainerHeight(dummy3, video3);
});

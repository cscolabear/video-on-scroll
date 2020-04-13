let currentInViewpor = '';
const video1 = document.querySelector('#video-1');
const video2 = document.querySelector('#video-2');

const getScrollY = () => {
  return Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
}

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

const scrollDummys = [...document.querySelectorAll('.scroll-dummy')];
const posFixedController = () => {
  scrollDummys.forEach(elem => {
    const video = document.querySelector(`#${elem.dataset.video}`);
    const dummy = document.querySelector(`#${elem.id}`);
    const dummyStop = dummy.getBoundingClientRect().bottom;

    if (dummyStop <= 0) { // stop 超出畫面
      return;
    }

    if ((getViewportHeight() - dummyStop) > 0) { // stop 出現, video 上捲退場
      // video.style.transform = `translate3d(0, ${getVideoScrollContainerY(dummy) - ((getViewportHeight() - dummyStop))}px, 0) `;
      video.style.top = `${getVideoScrollContainerY(dummy) - ((getViewportHeight() - dummyStop))}px`;
    } else { // 鎖定 video
      // video.style.transform = `translate3d(0, ${getVideoScrollContainerY(dummy)}px, 0)`;
      video.style.top = `${getVideoScrollContainerY(dummy)}px`;
    }
  });
}

const dummy1 = document.querySelector('#dummy-1');
const dummy2 = document.querySelector('#dummy-2');

window.addEventListener('scroll', function (e) {
  posFixedController();
  if (isInViewport(dummy1)) {
    const FRAMES = 1080;
    const FPS = 30;
    const time = (getVideoScrollContainerY(dummy1) / 1000) * FRAMES / FPS;
    video1.currentTime = time > video1.duration ?
      video1.duration :
      time;
  }

  if (isInViewport(dummy2)) {
    const FRAMES = 148;
    const FPS = 25;
    const time = (getVideoScrollContainerY(dummy2) / 1000) * FRAMES / FPS;
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

window.addEventListener("DOMContentLoaded", () => {
  const slider = new MainSlider({
    containerSelector: ".page",
    btnsSelector: ".next",
  });
  slider.render();

  const showUpSlider = new MiniSlider({
    containerSelector: ".showup__content-slider",
    prevSelector: ".showup__prev",
    nextSelector: ".showup__next",
    activeClass: "card-active",
    hideClass: "card--hide",
    animate: true,
  });
  showUpSlider.init();

  const modulesSlider = new MiniSlider({
    containerSelector: ".modules__content-slider",
    prevSelector: ".modules__info-btns .slick-prev",
    nextSelector: ".modules__info-btns .slick-next",
    activeClass: "card-active",
    hideClass: "card--hide",
    animate: true,
    autoplay: true,
  });
  modulesSlider.init();

  const feedSlider = new MiniSlider({
    containerSelector: ".feed__slider",
    prevSelector: ".feed .slick-prev",
    nextSelector: ".feed .slick-next",
    activeClass: "feed__item-active",
    hideClass: "feed__item--hide",
  });
  feedSlider.init();

  const player = new VideoPlayer(".showup .play", ".overlay");
  player.init();
});

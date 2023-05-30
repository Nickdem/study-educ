window.addEventListener("DOMContentLoaded", () => {
  const slider = new MainSlider({
    containerSelector: ".page",
    btnsSelector: ".next",
  });
  slider.render();

  const slider2 = new MainSlider({
    containerSelector: ".moduleapp",
    btnsSelector: ".next",
  });
  slider2.render();

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

  const player = new VideoPlayer(".play", ".overlay");
  player.init();

  const player2 = new VideoPlayer(".feed__item-play", ".overlay");
  player2.init();

  const difference = new Difference(
    ".officerold",
    ".officernew",
    ".officer__card-item"
  );
  difference.init();

  const forms = new Forms(".form");
  forms.init();

  const showUp = new ShowUp(".plus");
  showUp.init();

  const downLoad = new Download(".download");

  downLoad.init();
});

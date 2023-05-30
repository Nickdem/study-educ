interface ISliderContstructor {
  nextSelector?: string;
  prevSelector?: string;
  containerSelector: string;
  btnsSelector?: string;
  activeClass?: string;
  hideClass?: string;
  animate?: boolean;
  autoplay?: boolean;
}

class Slider {
  container: HTMLDivElement;
  slides;
  btns: NodeListOf<HTMLButtonElement>;
  slideIndex: number;
  hanson: HTMLDivElement;
  prev;
  next;
  activeClass;
  hideClass;
  animate;
  autoplay;
  constructor({
    containerSelector,
    btnsSelector,
    activeClass,
    animate,
    autoplay,
    prevSelector,
    nextSelector,
    hideClass,
  }: ISliderContstructor) {
    this.container = document.querySelector(containerSelector);
    this.slides = Array.from(this.container.children);
    this.btns = document.querySelectorAll(btnsSelector);
    this.slideIndex = 1;
    this.prev = document.querySelector(prevSelector);
    this.next = document.querySelector(nextSelector);
    this.activeClass = activeClass;
    this.animate = animate;
    this.autoplay = autoplay;
    this.hideClass = hideClass;
  }
}

class MainSlider extends Slider {
  constructor(opt: ISliderContstructor) {
    super(opt);
  }

  showSlides(n: number) {
    if (n > this.slides.length) {
      this.slideIndex = 1;
    }

    if (n < 1) {
      this.slideIndex = this.slides.length;
    }

    try {
      this.hanson.style.opacity = "0";

      if (n == 3) {
        setTimeout(() => {
          this.hanson.style.opacity = "1";
          this.hanson.classList.add("fromDown");
        }, 3000);
      } else {
        this.hanson.classList.remove("fromDown");
      }
    } catch (e) {
      console.log(e);
    }

    this.slides.forEach((slide: HTMLDivElement) => {
      slide.style.display = "none";
      slide.classList.remove("faded");
    });

    (this.slides[this.slideIndex - 1] as HTMLDivElement).style.display =
      "block";
    (this.slides[this.slideIndex - 1] as HTMLDivElement).classList.add("faded");
  }

  changeSlides(n: number) {
    this.showSlides((this.slideIndex += n));
  }

  render() {
    try {
      this.hanson = document.querySelector(".hanson");
    } catch (e) {
      console.log(e);
    }

    this.btns.forEach((item) => {
      item.addEventListener("click", () => {
        this.changeSlides(1);
      });

      (
        item.parentNode as HTMLDivElement
      ).previousElementSibling.addEventListener("click", (e) => {
        e.preventDefault();
        this.slideIndex = 1;
        this.showSlides(this.slideIndex);
      });
    });

    this.showSlides(this.slideIndex);
  }
}

class MiniSlider extends Slider {
  constructor(opt: ISliderContstructor) {
    super(opt);
  }

  decorizeSlides() {
    this.slides.forEach((slide, idx) => {
      slide.classList.remove(this.activeClass);
      if (idx > this.slideIndex) {
        slide.classList.add(this.hideClass);
      }
      if (idx < this.slideIndex - 1) {
        slide.classList.add(this.hideClass);
      }
      if (this.animate) {
        const cardTitle: HTMLHeadingElement =
          slide.querySelector(".card__title");
        const cardControl: HTMLButtonElement = slide.querySelector(
          ".card__controls-arrow"
        );
        cardTitle.style.opacity = "0.4";
        cardControl.style.opacity = "0";
      }
    });

    this.slides[this.slideIndex - 1].classList.add(this.activeClass);

    if (this.animate) {
      const cardTitle: HTMLHeadingElement =
        this.slides[this.slideIndex - 1].querySelector(".card__title");
      const cardControl: HTMLButtonElement = this.slides[
        this.slideIndex - 1
      ].querySelector(".card__controls-arrow");
      cardTitle.style.opacity = "1";
      cardControl.style.opacity = "1";
    }
  }

  changeSlide(n: number) {
    if (n > this.slides.length - 1) {
      this.slides[this.slideIndex - 1].classList.remove(this.hideClass);
      this.decorizeSlides();

      this.slideIndex = 0;
      return;
    }

    if (n < 1) {
      this.slideIndex = this.slides.length;

      this.slides[this.slideIndex - 1].classList.remove(this.hideClass);
      this.decorizeSlides();

      return;
    }

    this.slides[this.slideIndex - 1].classList.remove(this.hideClass);
    this.slides[this.slideIndex].classList.remove(this.hideClass);

    this.decorizeSlides();
  }

  bindTriggers() {
    this.next.addEventListener("click", () => {
      this.slideIndex += 1;
      this.changeSlide(this.slideIndex);
    });

    this.prev.addEventListener("click", () => {
      this.slideIndex -= 1;
      this.changeSlide(this.slideIndex);
    });
  }

  init() {
    this.container.style.cssText = `
          display: flex;
          flex-wrap: wrap;
          overflow: hidden;
          align-items: flex-start;
      `;

    this.bindTriggers();
    this.decorizeSlides();

    if (this.autoplay) {
      setInterval(() => this.changeSlide(+1), 5000);
    }
  }
}

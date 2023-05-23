class Slider {
  page: HTMLDivElement;
  slides;
  btns: NodeListOf<HTMLButtonElement>;
  slideIndex: number;
  hanson: HTMLDivElement;

  constructor(pageSelector: string, btns: string) {
    this.page = document.querySelector(pageSelector);
    this.slides = Array.from(this.page.children);
    this.btns = document.querySelectorAll(btns);
    this.slideIndex = 1;
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
    });

    (this.slides[this.slideIndex - 1] as HTMLDivElement).style.display =
      "block";
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

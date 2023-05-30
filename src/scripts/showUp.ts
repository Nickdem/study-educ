class ShowUp {
  btns: NodeListOf<HTMLButtonElement>;
  constructor(elSelector: string) {
    this.btns = document.querySelectorAll(elSelector);
  }

  init() {
    this.btns.forEach((item) => {
      item.addEventListener("click", () => {
        const parrentEl = item.parentNode as HTMLDivElement;
        const msg = parrentEl.nextSibling as HTMLDivElement;
        msg.style.display = "block";
        parrentEl.style.display = "none";
      });
    });
  }
}

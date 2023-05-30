class Download {
  triggers: NodeListOf<HTMLDivElement>;

  constructor(elSelector: string) {
    this.triggers = document.querySelectorAll(elSelector);
  }

  init() {
    this.triggers.forEach((item) => {
      item.addEventListener("click", () => {
        const link = document.createElement("a"),
          src = "/img/mainbg.jpg";
        link.setAttribute("href", src);
        link.setAttribute("download", "somepicture");

        link.click();

        item.remove();
      });
    });
  }
}

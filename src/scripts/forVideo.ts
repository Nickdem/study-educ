class VideoPlayer {
  btns;
  overlay: HTMLDivElement;
  close;
  // player: any
  constructor(btnsSelector: string, overlaySelector: string) {
    this.btns = document.querySelectorAll(btnsSelector);
    this.overlay = document.querySelector(overlaySelector);
    this.close = this.overlay.querySelector(".close");
  }

  bindTriggers() {
    this.btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (document.querySelector("iframe#frame")) {
          this.overlay.style.display = "flex";
        } else {
          const path = btn.getAttribute("data-url");

          this.createPlayer(path);
        }
      });
    });
  }

  bindCloseBtn() {
    this.close.addEventListener("click", () => {
      this.overlay.style.display = "none";
      this.overlay.querySelector("#frame").innerHTML = "";
      // this.player.stopVideo();
    });
  }

  createPlayer(url?: string) {
    // this.player = new window['YT'].Player('frame', {
    //     height: '100%',
    //     width: '100%',
    //     videoId: url
    // });

    // console.log(this.player);
    const img = document.createElement("img");
    img.src = "/img/mainbg.jpg";
    img.style.width = "100%";
    this.overlay.querySelector("#frame").appendChild(img);
    this.overlay.style.display = "flex";
  }

  init() {
    // const tag = document.createElement('script');

    // tag.src = "https://www.youtube.com/iframe_api";
    // const firstScriptTag = document.getElementsByTagName('script')[0];
    // firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    this.bindTriggers();
    this.bindCloseBtn();
  }
}

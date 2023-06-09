class Difference {
  oldOfficer: HTMLDivElement;
  newOfficer: HTMLDivElement;
  oldItems: NodeListOf<HTMLDivElement>;
  newItems: NodeListOf<HTMLDivElement>;
  oldCounter: number;
  newCounter: number;

  constructor(oldOfficer: string, newOfficer: string, items: string) {
    try {
      this.oldOfficer = document.querySelector(oldOfficer);
      this.newOfficer = document.querySelector(newOfficer);
      this.oldItems = this.oldOfficer.querySelectorAll(items);
      this.newItems = this.newOfficer.querySelectorAll(items);
      this.oldCounter = 0;
      this.newCounter = 0;
    } catch (e) {
      console.log(e);
    }
  }

  bindTriggers(
    container: HTMLDivElement,
    items: NodeListOf<HTMLDivElement>,
    counter: number
  ) {
    container.querySelector(".plus").addEventListener("click", () => {
      if (counter !== items.length - 2) {
        items[counter].style.display = "flex";
        items[counter].classList.add("faded");
        counter++;
      } else {
        items[counter].style.display = "flex";
        items[counter].classList.add("faded");
        items[items.length - 1].remove();
      }
    });
  }

  hideItems(items: NodeListOf<HTMLDivElement>) {
    items.forEach((item, i, arr) => {
      if (i !== arr.length - 1) {
        item.style.display = "none";
      }
    });
  }

  init() {
    try {
      this.hideItems(this.oldItems);
      this.hideItems(this.newItems);
      this.bindTriggers(this.oldOfficer, this.oldItems, this.oldCounter);
      this.bindTriggers(this.newOfficer, this.newItems, this.newCounter);
    } catch (e) {
      console.log(e);
    }
  }
}

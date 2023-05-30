class Forms {
  forms: NodeListOf<HTMLFormElement>;
  inputs: NodeListOf<HTMLInputElement>;
  message;
  constructor(forms: string) {
    this.forms = document.querySelectorAll(forms);
    this.inputs = document.querySelectorAll("input");
    this.message = {
      loading: "Загрузка...",
      success: "Спасибо! Скоро мы с вами свяжемся!",
      failure: "Что-то пошло не так...",
    };
  }

  clearInputs() {
    this.inputs.forEach((item) => {
      item.value = "";
    });
  }

  checkMailInputs() {
    const mailInputs = document.querySelectorAll('[type="email"]');

    mailInputs.forEach((input) => {
      input.addEventListener("keypress", function (e: KeyboardEvent) {
        if (e.key.match(/[^a-z0-9@.]/gi)) {
          e.preventDefault();
        }
      });
    });
  }

  initMask() {
    function setCursorPosition(pos: number, elem: any) {
      elem.focus();

      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        const range = elem.createTextRange();

        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select();
      }
    }

    function createMask(event: Event) {
      const matrix = "+1 (___) ___-____",
        def = matrix.replace(/\D/g, "");
      let val = this.value.replace(/\D/g, ""),
        i = 0;
      if (def.length >= val.length) {
        val = def;
      }

      this.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length
          ? val.charAt(i++)
          : i >= val.length
          ? ""
          : a;
      });

      if (event.type === "blur") {
        if (this.value.length == 2) {
          this.value = "";
        }
      } else {
        setCursorPosition(this.value.length, this);
      }
    }

    const inputs = document.querySelectorAll('[name="phone"]');

    inputs.forEach((input) => {
      input.addEventListener("input", createMask);
      input.addEventListener("focus", createMask);
      input.addEventListener("blur", createMask);
    });
  }

  getValues(elms: HTMLFormControlsCollection) {
    const formData: undefined | { [key: string]: string } = {};

    Array.from(elms).forEach(function (
      el: HTMLButtonElement | HTMLInputElement
    ) {
      if (el.tagName == "INPUT" || el.tagName == "SELECT") {
        formData[el.name] = el.value;
      }
    });

    return formData;
  }

  init() {
    this.checkMailInputs();
    this.initMask();

    this.forms.forEach((item) => {
      item.addEventListener("submit", (e) => {
        e.preventDefault();

        const statusMessage = document.createElement("div");
        statusMessage.style.cssText = `
                    margin-top: 15px;
                    font-size: 18px;
                    color: grey;
                `;
        item.parentNode.appendChild(statusMessage);

        statusMessage.textContent = this.message.loading;

        delay(() => this.getValues(item.elements))
          .then((res) => {
            console.log(res);
            statusMessage.textContent = this.message.success;
          })
          .catch(() => {
            statusMessage.textContent = this.message.failure;
          })
          .finally(() => {
            this.clearInputs();
            setTimeout(() => {
              statusMessage.remove();
            }, 6000);
          });
      });
    });
  }
}

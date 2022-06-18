{
    // Modal Class Init

    new Modal({
        modal_selector: ".register-form-modal",
        toggle_button_selector: '[data-toggle-form="register-form"]',
        hide_class: "hidden",
        modal_class: "modal-window",
        animation_class: "animation-translateY",
    });

    // Checkbox class

    class Checkbox {
        constructor(options) {
            this.checkBoxBlock = document.querySelectorAll(options.checkbox_block_selector);

            this.selected_class = options.selected_class;
            this.selectedId = options.selectedId ?? 0;

            this.setup();
        }

        setup() {
            for (let i = 0; i < this.checkBoxBlock.length; i++) {
                let checkBoxOption = this.checkBoxBlock[i].querySelectorAll("[data-checkbox-option]")

                for (let k = 0; k < checkBoxOption.length; k++) {
                    checkBoxOption[k].setAttribute("data-checkbox-option", k);
                }

                checkBoxOption[this.selectedId].classList.add(this.selected_class);

                this.checkBoxBlock[i].addEventListener("click", this.selectCheckBox.bind(this));

                this.checkBoxBlock[0].setAttribute("data-selected-id", this.selectedId);
            }
        }

        selectCheckBox(e) {
            e.preventDefault();

            let checkbox = e.target.closest("[data-checkbox-option]");

            if (!checkbox) return;

            let selectedCheckBox = document.querySelectorAll(`[data-checkbox-option = "${this.selectedId}"]`);

            for (let i = 0; i < selectedCheckBox.length; i++) {
                selectedCheckBox[i].classList.remove(this.selected_class);
            }

            this.selectedId = checkbox.dataset.checkboxOption;

            selectedCheckBox = document.querySelectorAll(`[data-checkbox-option = "${this.selectedId}"]`);

            for (let i = 0; i < selectedCheckBox.length; i++) {
                selectedCheckBox[i].classList.add(this.selected_class);
            }

            this.checkBoxBlock[0].setAttribute("data-selected-id", this.selectedId);
        }
    }

    new Checkbox({
        checkbox_block_selector: ".form__checkbox-block",
        selected_class: "form__checkbox-selected",
        selectedId: 0,
    });

    // Register check and AJAX script

    const registerForm = document.querySelector(".register-form-wrapper");

    const inputNick = registerForm.querySelector("[data-type-nick]");
    const inputPasswordMain = registerForm.querySelector("[data-type-password]");
    const inputPasswordConfirm = registerForm.querySelector("[data-type-password-confirm]");
    const inputAge = registerForm.querySelector("[data-type-age]");
    const checkBoxBlock = registerForm.querySelector("[ data-checkbox-sex]");

    const formErrorBlock = registerForm.querySelector("[data-form-error]");

    const buttonSubmit = registerForm.querySelector("[data-button-submit]");

    inputNick.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[^a-zа-яёіїє'_1-9]/gi, "")

        if (e.target.value.length > 30 || e.target.value.length < 3) {
            formErrorBlock.innerHTML = "Длина ника должна быть от 3 до 30 символов. Можно использовать латинские и кириллические буквы, цифры, апостроф и символ подчеркивания (_)";
            inputNick.classList.add("input_incorrect");
        } else {
            formErrorBlock.innerHTML = "";
            inputNick.classList.remove("input_incorrect");
        }
    })

    inputNick.addEventListener("focusout", (e) => {
        if (e.target.value.length === 0) {
            formErrorBlock.innerHTML = "";
            inputNick.classList.remove("input_incorrect");
        }
    })

    inputPasswordMain.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[^a-z_1-9!@#$%^&*]/gi, "")

        if (e.target.value.length > 30 || e.target.value.length < 8) {
            formErrorBlock.innerHTML = "Длина пароля должна быть от 8 до 30 символов. Пароль может содержать латинские буквы, символ подчеркивания, а также символы !@#$%^&*";
            inputPasswordMain.classList.add("input_incorrect");
        } else {
            formErrorBlock.innerHTML = "";
            inputPasswordMain.classList.remove("input_incorrect");
        }
    })

    inputPasswordMain.addEventListener("focusout", (e) => {
        if (e.target.value.length === 0) {
            formErrorBlock.innerHTML = "";
            inputPasswordMain.classList.remove("input_incorrect");
        }
    })

    inputPasswordConfirm.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[^a-z_1-9!@#$%^&*]/gi, "")

        if (e.target.value.length > 30 || e.target.value.length < 8) {
            formErrorBlock.innerHTML = "Длина пароля должна быть от 8 до 30 символов. Пароль может содержать латинские буквы, символ подчеркивания, а также символы !@#$%^&*";
            inputPasswordConfirm.classList.add("input_incorrect");
        } else {
            formErrorBlock.innerHTML = "";
            inputPasswordConfirm.classList.remove("input_incorrect");
        }
    })

    inputPasswordConfirm.addEventListener("focusout", (e) => {
        if (e.target.value.length === 0) {
            formErrorBlock.innerHTML = "";
            inputPasswordConfirm.classList.remove("input_incorrect");
        }
    })

    inputAge.addEventListener("input", (e) => {

        if (e.target.value.length === 1) {
            e.target.value = e.target.value.replace(/[\D0]/g, "");
        } else {
            e.target.value = e.target.value.replace(/\D/g, "");
        }

        let regExp = /^([1-9]|[1-9][0-9])$/;

        if (!regExp.test(e.target.value)) {
            e.target.value = e.target.value.replace(/([1-9])(\d)/g, (match, p1, p2) => p1);
        }
    })

    buttonSubmit.addEventListener("click", (e) => {
        e.preventDefault();
    })
}



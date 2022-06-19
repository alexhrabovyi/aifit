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

    let inputsStatus = {
        nick: true,
        passwordMain: true,
        passwordConfirm: true,
    }

    inputNick.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[^a-zа-яёіїє'_0-9]/gi, "")

        if (e.target.value.length > 30 || e.target.value.length < 3) {
            formErrorBlock.innerHTML = "Длина ника должна быть от 3 до 30 символов. Можно использовать латинские и кириллические буквы, цифры, апостроф и символ подчеркивания (_)";
            inputNick.classList.add("input_incorrect");

            inputsStatus.nick = "error";
        } else {
            formErrorBlock.innerHTML = "";
            inputNick.classList.remove("input_incorrect");

            inputsStatus.nick = true;
        }
    })

    inputNick.addEventListener("focusout", (e) => {
        if (e.target.value.length === 0) {
            formErrorBlock.innerHTML = "";
            inputNick.classList.remove("input_incorrect");
        }
    })

    inputPasswordMain.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[^a-z_0-9!@#$%^&*]/gi, "")

        if (e.target.value.length > 30 || e.target.value.length < 8) {
            formErrorBlock.innerHTML = "Длина пароля должна быть от 8 до 30 символов. Пароль может содержать латинские буквы, символ подчеркивания, а также символы !@#$%^&*";
            inputPasswordMain.classList.add("input_incorrect");

            inputsStatus.passwordMain = "error";
        } else {
            formErrorBlock.innerHTML = "";
            inputPasswordMain.classList.remove("input_incorrect");

            inputsStatus.passwordMain = true;
        }
    })

    inputPasswordMain.addEventListener("focusout", (e) => {
        if (e.target.value.length === 0) {
            formErrorBlock.innerHTML = "";
            inputPasswordMain.classList.remove("input_incorrect");
        }
    })

    inputPasswordConfirm.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[^a-z_0-9!@#$%^&*]/gi, "")

        if (e.target.value.length > 30 || e.target.value.length < 8) {
            formErrorBlock.innerHTML = "Длина пароля должна быть от 8 до 30 символов. Пароль может содержать латинские буквы, символ подчеркивания, а также символы !@#$%^&*";
            inputPasswordConfirm.classList.add("input_incorrect");

            inputsStatus.passwordConfirm = "error";
        } else {
            formErrorBlock.innerHTML = "";
            inputPasswordConfirm.classList.remove("input_incorrect");

            inputsStatus.passwordConfirm = true;
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
            e.target.value = e.target.value.replace(/([1-9])(\d)/g, (match, p1) => p1);
        }
    })

    buttonSubmit.addEventListener("click", (e) => {
        e.preventDefault();

        if (inputsStatus.nick === "error" || inputNick.value.length === 0) {
            inputNick.focus();
            return;
        } else if (inputsStatus.passwordMain === "error" || inputPasswordMain.value.length === 0) {
            inputPasswordMain.focus();
            return;
        } else if (inputsStatus.passwordConfirm === "error" || inputPasswordConfirm.value.length === 0) {
            inputPasswordConfirm.focus();
            return;
        } else if (inputAge.value.length === 0) {
            inputAge.focus();
            return;
        }

        formErrorBlock.innerHTML = "";

        if (inputPasswordMain.value !== inputPasswordConfirm.value) {
            inputPasswordConfirm.classList.add("input_incorrect");

            formErrorBlock.innerHTML = "Пароли не совпадают";

            inputPasswordConfirm.focus();

            return;
        }

        let body = {
            "nickname": inputNick.value,
            "password": inputPasswordMain.value,
            "age": inputAge.value,
        }

        if (checkBoxBlock.dataset.selectedId === "0") {
            body.gender = "m";
        } else {
            body.gender = "f";
        }

        console.log(body);

        body = JSON.stringify(body);

        console.log(body);

        buttonSubmit.style.cssText = "background: #FFFFFF; border: 1px solid #0B98FF";
        buttonSubmit.innerHTML = '<svg class="circular-loader"viewBox="25 25 50 50" ><circle class="loader-path" cx="50" cy="50" r="20" fill="none" stroke="#70c542" stroke-width="2" /></svg>'

        document.body.style.pointerEvents = "none";

        async function postData(url, data) {
            console.log(data);

            let res = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: data,
            })

            return await res.text();
        }

        postData("http://localhost:8080/registration", body)
            .then((res) => {
                console.log(res);

                if (res) {
                    buttonSubmit.innerHTML = "Готово";
                    buttonSubmit.style.color = "#0B98FF";
                }
            })
    })
}


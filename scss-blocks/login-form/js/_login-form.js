{
    new Modal({
        modal_selector: ".login-form-modal",
        toggle_button_selector: '[data-toggle-form="login-form"]',
        hide_class: "hidden",
        modal_class: "modal-window",
        animation_class: "animation-translateY",
    });

    // Login form scripts

    const loginForm = document.querySelector(".login-form-wrapper");

    const inputNick = loginForm.querySelector("[data-type-nick]");
    const inputPasswordMain = loginForm.querySelector("[data-type-password]");

    const formErrorBlock = loginForm.querySelector("[data-form-error]");

    const buttonSubmit = loginForm.querySelector("[data-button-submit]");

    let inputsStatus = {
        nick: true,
        passwordMain: true,
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
            formErrorBlock.innerHTML = "Длина пароля должна быть от 8 до 30 символов.";
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

    buttonSubmit.addEventListener("click", (e) => {
        e.preventDefault();

        if (inputsStatus.nick === "error" || inputNick.value.length === 0) {
            inputNick.focus();
            return;
        } else if (inputsStatus.passwordMain === "error" || inputPasswordMain.value.length === 0) {
            inputPasswordMain.focus();
            return;
        }

        formErrorBlock.innerHTML = "";

        let body = {
            "nickname": inputNick.value,
            "password": inputPasswordMain.value,
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

        postData("http://localhost:8080/authorize", body)
            .then((res) => {
                console.log(res);

                if (res) {
                    buttonSubmit.innerHTML = "Готово";
                    buttonSubmit.style.color = "#0B98FF";
                }
            })
    })

}
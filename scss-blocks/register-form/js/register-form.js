new Modal({
    modal_selector: ".register-form-modal",
    toggle_button_selector: '[data-toggle-form="register-form"]',
    hide_class: "hidden",
    modal_class: "modal-window",
    animation_class: "animation-translateY",
});

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
    }
}

new Checkbox({
    checkbox_block_selector: ".form__checkbox-block",
    selected_class: "form__checkbox-selected",
    selectedId: 0,
});

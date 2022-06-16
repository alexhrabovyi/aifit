class Modal {
    constructor(options) {
        this.modal = document.querySelector(options.modal_selector);
        this.buttons = document.querySelectorAll(options.toggle_button_selector);
        this.child = this.modal.firstElementChild;

        this.hide_class = options.hide_class;
        this.modal_class = options.modal_class;
        this.animation_class = options.animation_class;

        this.setup();
    }

    setup() {
        this.modal.classList.add(this.modal_class, this.hide_class);
        this.child.classList.add(this.animation_class);

        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].addEventListener("click", this.toggle.bind(this));
        }

        this.modal.addEventListener("click", this.backdropClose.bind(this));
    }

    get isClose() {
        return this.modal.classList.contains(this.hide_class);
    }

    get scrollWidth() {
        return window.innerWidth - document.documentElement.clientWidth;
    }

    backdropClose(e) {
        e.preventDefault();

        if (e.target === this.modal) {
            this.hide();
        }
    }

    toggle(e) {
        e.preventDefault();
        this.isClose ? this.show() : this.hide();
    }

    show() {
        this.modal.classList.remove(this.hide_class);
        this.child.classList.remove(this.animation_class);

        let scrollWidth = this.scrollWidth;

        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = scrollWidth + "px";
    }

    hide() {
        this.modal.classList.add(this.hide_class);
        this.child.classList.add(this.animation_class);

        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
    }
}
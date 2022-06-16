const header_slider = new Swiper(".header-slider-wrapper__slider-container", {
    allowTouchMove: false,
    slidesPerView: 1,
    direction: 'horizontal',
    speed: 1000,
    loop: true,

    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },

    pagination: {
        el: ".header-slider-wrapper__pagination-block",
        clickable: true,
        bulletClass: "header-slider-wrapper__pagination-bullet",
        bulletActiveClass: "header-slider-wrapper__pagination-bullet_active",
    },
})
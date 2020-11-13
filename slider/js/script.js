class Slider {
    constructor(options) {
        if (typeof options.slider == "string") {

            this.slider = document.querySelector(options.slider);
        } else if (options.slider instanceof HTMLElement) {
            thid.slider = options.slider
        }
        this.next = this.slider.querySelector('.slider__next');
        this.prev = this.slider.querySelector('.slider__prev');
        this.sliderLine = this.slider.querySelector('.slider__line');
        this.slides = this.sliderLine.children;
        this.dir = options.direction.toUpperCase() == "X" ? "X" : "Y";
        this.timeMove = options.time == undefined ? 1000 : options.time
        this.interval = isNaN(options.interval) ? this.timeMove + 1000 : options.interval
        this.width = this.slider.clientWidth
        this.height = this.slider.clientHeight
        this.moveSize = this.dir == "X" ? this.width : this.height;
        this.activeSlide = 0;
        this.sliderLine.style = `position: relative; height: ${this.height}px;overflow: hidden;`;
        for (let i = 0; i < this.slides.length; i++) {
            const sl = this.slides[i];
            sl.style = `position: absolute; width: ${this.width}px; height: ${this.height}px;`
            if (i != this.activeSlide) {
                sl.style.transform = ` translate${this.dir}(${this.moveSize}px)`
            }
            if (i == this.slides.length - 1) {

                sl.style.transform = ` translate${this.dir}(${-this.moveSize}px)`
            }

        }
        this.move(this.prev)
    }
    move(btn) {
        let btnLeftOrRight = btn == this.next ? -this.moveSize : this.moveSize;
        for (let i = 0; i < this.slides.length; i++) {
            const slide = this.slides[i];
            if (i != this.activeSlide) {
                slide.style.transform = `translate${this.dir}(${-btnLeftOrRight}px)`;
            }
        }
        this.slides[this.activeSlide].style.transform = `translate${this.dir}(${btnLeftOrRight}px)`;
        if (this.next == btn) {
            this.activeSlide++
                if (this.activeSlide == this.slides.length) {
                    this.activeSlide = 0;
                }
        } else {

            this.activeSlide--
                if (this.activeSlide < 0) {
                    this.activeSlide = this.slides.length - 1;
                }

        }
        this.slides[this.activeSlide].style.transform = `translate${this.dir}(0px)`;
    }
}

const slider = new Slider({
    slider: ".slider", // класс слайдера
    direction: "X", // истать по горизонтали "Х" или листать по вертикали "Y"
    time: 1000, // скорость перелистывания
    autoplay: true, // автоматическое листание
    interval: 2000 // время ожидания автоматического перелистывания
})
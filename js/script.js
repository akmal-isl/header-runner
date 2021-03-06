class Scroll {
    constructor(obj) {

        if (typeof obj.el == "string") {
            this.el = document.querySelector(obj.el);
        } else if (obj.el instanceof HTMLElements) {
            this.el = obj.el;
        }


        this.el.style.position = "fixed";
        this.top = obj.top; // начальное положение относительно окна браузера
        this.unit = obj.unit
        window.addEventListener("scroll", () => { this.scroll() })
        window.addEventListener("resize", () => { this.scroll() })
        this.scroll()
    }


    scroll() {
        //pageYOffset - хранит расстоние смещения от верхнего края страницы
        // consol.log(window.pageYOffset);
        this.menuTop = this.scrollNumber()
        if (this.menuTop - window.pageYOffset > 0) {
            this.el.style.top = this.menuTop - window.pageYOffset + "px";

        } else {
            this.el.style.top = 0
        }

    }
    scrollNumber() {
        if (this.unit == "px") {
            return this.top >= 0 ? this.top : 0;
        } else if (this.unit == "%" || this.unit == undefined) {
            return this.calc(window.innerHeight, this.top) - this.el.clientHeight
        }

    }
    calc(height, top) {
        return height / 100 * top
    }




}
const myScroll = new Scroll({
    el: ".header__nav",
    top: 100,
    unit: "%"
})

class Runner {
    constructor(option) {
        this.ele = document.querySelector(option.ele)
        this.nav = document.querySelector(option.el)
        $(option.ele).on('mouseover', () => {
            $(option.ele).css({
                marginLeft: Math.floor(Math.random() * (window.innerWidth - this.ele.clientWidth)) + "px",
                marginTop: Math.floor(Math.random() * (window.innerHeight - this.ele.clientHeight - this.nav.clientHeight)) + "px",
            })
        })
    }
}
const headerRunner = new Runner({
    ele: ".header__content",
    el: ".header__nav"
})

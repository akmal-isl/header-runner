function $(selector) {
    let element;
    if (typeof selector == "string") {
        element = document.querySelectorAll(selector);  
    } else if(selector instanceof HTMLElement) {
        element = [selector]
    }else {
        element = null;
    }
    return new jQ(element)
}

function jQ(params) {
    this.element = params;
    this.on =   function (event, callBackFun) {
        for (let i = 0; i < this.element.length; i++) {
            this.element[i].addEventListener(event, callBackFun)
        }
        return this
    } 
    this.html = function (text) {
        for (let i = 0; i < this.element.length; i++) {
            this.element[i].innerHTML = text;
        }
        return this
    }
    this.css = function (styleName, value) {
        if (typeof styleName == "string" && (typeof value == "string" || typeof value == "number")) {
            for (let i = 0; i < this.element.length; i++) {
                this.element[i].style = `${styleName}: ${value};`
            }
        }else if (typeof styleName == "object" && !Array.isArray(styleName) && styleName != null) {
            for (let i = 0; i < this.element.length; i++) {
                for (const key in styleName) {
                    this.element[i].style[key] = styleName[key]
                }
            }
        }
        return this
    }
    this.toggleClass = function (className) {
        if (typeof className == "string") {
            for (let i = 0; i < this.element.length; i++) {
                if (this.element[i].classList.contains(className)) {
                this.element[i].classList.remove(className)
                }else{
                    this.element[i].classList.add(className);
                }
            }
        }
    }
    this.hover = function (mouseoverFn, mouseoutFn) {
        if (typeof mouseoverFn == "function" &&  typeof mouseoutFn == "function") {
            this.on("mouseover", mouseoverFn);
            this.on("mouseout", mouseoutFn);
            return this
        }
    }
    this.dblClick = function (callBackFun) {
        if (typeof callBackFun == "function") {
            this.on("dblclick", callBackFun)
        }
    }
 }  
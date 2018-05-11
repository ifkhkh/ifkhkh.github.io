var log = console.log.bind(console)

var e = (selector) => document.querySelector(selector)

var es = (selector) => document.querySelectorAll(selector)

var removeClassAll = (className) => {
    var selector = '.' + className
    var elements = es(selector)
    for (let i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }

}

var bindAll = (selector, eventName, callback) => {
    var elements = es(selector)
    for (let i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.addEventListener(eventName, callback)
    }
}

var bindEvent = (selector, eventName, callback) => {
    var element = e(selector)
    element.addEventListener(eventName, callback)
}


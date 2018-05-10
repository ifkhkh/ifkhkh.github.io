



var nextIndex = (slide, delta) => {
    var numsOfImgs = Number(slide.dataset.imgs)
    var activeIndex = Number(slide.dataset.active)
    // （活动 index + 下一张 + 总数）% 总数
    var i = (activeIndex + delta + numsOfImgs) % numsOfImgs
    return i
}

var showImageAtIndex = (slide, index) => {
    // 更新 slide 里的 active 值，用来传递 index，技巧
    slide.dataset.active = index
    // 移除所有 image-active
    removeClassAll('image-active')

    // 显示新图片
    var nextSelector = '#id-kang-image-' + String(index)
    var img = e(nextSelector)
    img.classList.add('image-active')

    // 切换小圆点
    removeClassAll('indi-active')
    var indi = e('#id-kang-indi-' + String(index))
    indi.classList.add('indi-active')

}

var playNextImage = () => {
    var slide = e('.kang-slide')
    // 得到下张图片的 index
    var index = nextIndex(slide, 1)
    // 按 index 显示图片
    showImageAtIndex(slide, index)
}

var autoPlay = () => {
    var interval = setInterval(() => {
        // 显示下一张图片
        playNextImage()
    }, 2000)
    return interval
}


var bindEventsBtn = () => {
    var selector = '.kang-slide-btn'
    bindAll(selector, 'click', (event) => {
        var btn = event.target
        var slide = btn.parentElement
        var delta = Number(btn.dataset.delta)
        var index = nextIndex(slide, delta)
        showImageAtIndex(slide, index)
    })

}

var bindEventsIndi = () => {
    var selector = '.kang-slide-indicators'
    bindAll(selector, 'click', (event) => {
        var indi = event.target
        var slide = indi.closest('.kang-slide')
        var index = indi.dataset.index
        showImageAtIndex(slide, index)
    })
}

var bindStopAuto = (interval) => {
    var selector = '.kang-slide'
    bindEvent(selector, 'mouseover', (event) => {
        clearInterval(interval)
    })
    bindEvent(selector, 'mouseout', (event) => {
        interval = autoPlay()
    })
}

var __main = () => {
    // 自动播放
    var interval = autoPlay()
    bindEventsBtn()
    bindEventsIndi()
    bindStopAuto(interval)
}

__main()
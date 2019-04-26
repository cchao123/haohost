import { loadScript } from '@tencent/anghost-util/url'
const html2canvasJs = '//mat1.gtimg.com/bbs/common/js/html2canvas.js'

/**
 *  @param { String } DOM 转换为图片的dom节点
 *  @param { function } callback 返回加载完成的图片
 */

export function createPoster(dom, callback) {
  if (!window.html2canvas) {
    loadScript(html2canvasJs, () => {
      creatImg(dom, callback)
    })
  } else {
    creatImg(dom, callback)
  }
}

function creatImg(dom, callback) {
  // 开始生成图片
  let img = new Image()
  let imgWidth = dom.offsetWidth
  let imgHeight = dom.offsetHeight
  let scale = window.devicePixelRatio
  callback = typeof callback === 'function' && callback
  window.html2canvas(dom, {
    useCORS: true,
    scale: scale,
    width: imgWidth,
    height: imgHeight
  }).then((canvas) => {
    img.src = canvas.toDataURL('image/png')
    img.style.width = imgWidth + 'px'
    img.style.height = imgHeight + 'px'
    img.onload = function () {
      callback(img.src)
    }
    img.onerror = function () {
      callback(new Error('Picture loading failed'))
    }
  })
}
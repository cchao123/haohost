/**
 * 获取当前请求的链接对应的参数值
 *
 * @export
 * @param {string} name 参数名
 * @param {string} url 要匹配的URL链接 [可选]
 * @returns {string|null}
 */
export function getUrlParam (name, url) {
  var reg = new RegExp('(^|&|\\?|#)' + name + '=([^&#]*)(&|$|#)', '')
	var r = url ? url.match(reg) : window.location.search.match(reg)
	if (r !== null) {
		return decodeURIComponent(r[2])
	}
	return null
}

/**
 * 加载脚本文件
 *
 * @export
 * @param {string} url 请求的url
 * @param {function} cb 加载完成之后的成功的回调函数
 * @param {function} fail 加载完成之后失败的回调函数
 * @param {string} [charset='utf-8'] 加载的文件的字符编码，默认值为‘utf-8’
 */
export function loadScript (url, cb, fail, charset = 'utf-8') {
  const head = document.getElementsByTagName('body')[0]
  const js = document.createElement('script')
  js.setAttribute('type', 'text/javascript')
  js.setAttribute('src', url)
  js.setAttribute('charset', charset)
  head.appendChild(js)
  if (document.all) {
    js.onreadystatechange = function () {
      if (js.readyState === 'load' || js.readyState === 'complete') {
        if (typeof cb === 'function') {
          cb(js)
        }
      }
    }
  } else {
    js.onload = function () {
      if (typeof cb === 'function') {
        cb(js)
      }
    }
  }
  js.onerror = function () {
    if (typeof fail === 'function') {
      fail(js)
    }
  }
}

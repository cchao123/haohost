/**
 * 设置cookie
 *
 * @example
 *  setCookie('name', 'angelzou', 4)
 *
 * @export
 * @param {string} name cookie名 [必要]
 * @param {string} value cookie值 [必要]
 * @param {number|null} hour cookie存活时间，单位：小时
 * @param {string|null} domain 所在域名，如果没有定义，默认为当前文档位置的路径的域名部分
 * @param {string|null} path 所在路径，如果没有定义，默认为当前文档位置的路径
 * @param {boolean|null} secure cookie只会被https传输
 * @returns {boolean}
 */
export function setCookie (name, value, hour, domain, path, secure) {
  var expire = new Date()
  if (hour) {
    expire.setTime(new Date().getTime() + 60 * 60 * 1000 * hour)
  }
  document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) +
    '; ' + (hour ? ('expires=' + expire.toUTCString() + '; ') : '') +
    (path ? 'path=' + path + '; ' : '') + (domain ? 'domain=' + domain + ';' : '') +
    (secure ? '; secure' : '')
  return true
}

/**
 * 获取对应cookie值
 *
 * @example
 *  var ck = getCookie('name')     // angelzou
 *
 * @export
 * @param {string} name 要获取的cookie名
 * @returns {string} 获取的cookie值
 */
export function getCookie (name) {
  var r = new RegExp('(?:^|;+|\\s+)' + encodeURIComponent(name) + '=([^;]*)')
	var m = document.cookie.match(r)
	return (!m ? '' : decodeURIComponent(m[1]))
}

/**
 * 删除指定的cookie
 *
 * @example
 *  delCookie('name')
 *
 * @export
 * @param {string} name cookie名
 * @param {string|null} domain 所在域名，如果没有定义，默认为当前文档位置的路径的域名部分
 * @param {string|null} path 所在路径，如果没有定义，默认为当前文档位置的路径
 * @returns {boolean}
 */
export function delCookie (name, domain, path) {
  setCookie(name, '', -1, domain, path)
  return true
}

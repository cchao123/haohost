/**
 * 判断是否支持本地存储
 *
 * @returns {boolean}
 */
function _isLSSupported () {
  let supported = false
  if (window.localStorage && window.localStorage.setItem) {
    supported = true
    let key = '__localstorage__test__'
    try {
      window.localStorage.setItem(key, key)
      window.localStorage.removeItem(key)
    } catch (err) {
      supported = false
    }
  }
  return supported
}

/**
 * 将输入值序列化为JSON字符串
 *
 * @param {any} obj 存入值
 * @returns {string} 序列化之后的值
 */
function _serialize (obj) {
  return JSON.stringify(obj)
}

/**
 * 反序列化JSON字符串
 *
 * @param {string} jsonStr json字符串
 * @returns {object|other}
 */
function _deserialize (jsonStr) {
  if (!jsonStr) {
    return null
  }
  var val = ''
  try {
    val = JSON.parse(jsonStr)
  } catch (e) {
    val = jsonStr
  }
  return val
}

/**
 * 获取本地存储的值
 *
 * @example
 *  getLS('user')     // {name: 'angelzou'}
 *
 * @export
 * @param {string} key 本地存储的key值
 * @returns 本地存储key对应的值
 */
export function getLS (key) {
  if (!_isLSSupported()) {
    return null
  }
  return _deserialize(window.localStorage.getItem(key))
}

/**
 * 设置本地存储的键值对
 *
 * @example
 *  setLS('user', {name: 'angelzou'})
 *
 * @export
 * @param {string} key key值
 * @param {any} data 对应的数据
 * @returns
 */
export function setLS (key, data) {
  if (_isLSSupported()) {
    return window.localStorage.setItem(key, _serialize(data))
  }
}

/**
 * 删除本地存储对应的键值对
 *
 * @example
 *  removeLS()
 *
 * @export
 * @param {string} key key值
 * @returns
 */
export function removeLS (key) {
  if (!_isLSSupported()) {
    return null
  }
  return window.localStorage.removeItem(key)
}

/**
 * 删除所有的本地存储数据
 *
 * @example
 *  clearAllLS()
 *
 * @export
 * @returns
 */
export function clearAllLS () {
  if (!_isLSSupported()) {
    return null
  }
  return window.localStorage.clear()
}

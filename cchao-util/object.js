import { isObject } from './type.js'

/**
 * 判断Object是否为空对象
 *
 * @example
 *  isEmptyObject({})       // true
 *  isEmptyObject({a: 1})   // false
 *
 * @export
 * @param {any} val 对象
 * @returns {boolean}
 */
export function isEmptyObject (val) {
  let name
  for (name in val) {
    return false
  }
  return true
}

/**
 * 扩展Object
 *
 * @example
 *  var newObj = extend({a: 1}, {b: 2})           // {a: 1, b: 2}
 *  var newObj2 = extend({a: 1}, {b: 2}, {c: 3})  // {a: 1, b: 2, c: 3}
 *
 * @export
 * @param {object} obj 被扩展的目标对象
 * @param {object} args 待扩展的对象
 * @returns {object} 扩展之后的对象
 */
export function extend (obj, ...args) {
  for (var i = 0, len = args.length; i < len; i++) {
    let src = args[i]
    for (var key in src) {
      if (src.hasOwnProperty(key)) { // 忽略掉那些从原型链上继承到的属性
        obj[key] = src[key]
      }
    }
  }
  return obj
}

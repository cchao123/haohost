import { isArray } from './type'
/**
 * 判断数组中是否存在某个值
 *
 * @example
 *  inArray(1, [1, 2])      // 0
 *  inArray(0, [1, 2])      // -1
 *
 * @export
 * @param {any} val 待判断的值
 * @param {array} arr 待判断的数组
 * @returns {number} 值所在数组的位置，为 -1，则该值不在对应的数组中
 */
export function inArray (val, arr) {
  if (!isArray(arr)) {
    throw new Error('the second param must to be Array')
  }
  if (arr.length === 0) {
    return -1
  }
  for (var i = 0, len = arr.length; i < len; i++) {
    if (val === arr[i]) {
      return i
    }
  }
  return -1
}

/**
 * 普通数组、对象数组的排序
 *
 * @example
 *  var arrObj = [{name: 'a', age: 11}, {name: 'f', age: 16}, {name: 'c', age: 20}, {name: 'b', age: 18}]
 *  var arr = [4, 2, 5, 3, 6, 8, 1, 9, 0, 7]
 *
 *  var arrObjSortResult = arrObj.sort(dynamicSort('name', 'desc'))
 *  // [{name: 'f', age: 16}, {name: 'c', age: 20}, {name: 'b', age: 18}, {name: 'a', age: 11}]
 *  var arrSortRes = arr.sort(dynamicSort())                // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 *  var arrSortResDesc = arr.sort(dynamicSort('', 'desc'))  // [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
 *
 * @export
 * @param {string} property 对象属性，如果不填或者为空字符串，则进行普通数组的排序，
 *  否则是进行的对象数组的排序
 * @param {string} [type='asc'] 排序顺序，'asc'是升序，'desc'是降序
 * @returns {function} 排序函数
 */
export function dynamicSort (property, type = 'asc') {
  var sortOrder = type === 'desc' ? -1 : 1
  return function (a, b) {
    if (!property) {
      var res = (a < b) ? -1 : (a > b) ? 1 : 0
      return res * sortOrder
    }
    var aa = a[property]
    var bb = b[property]
    var result = (aa < bb) ? -1 : (aa > bb) ? 1 : 0
    return result * sortOrder
  }
}

/**
 * 数组去重
 *
 * @example
 *  var arr = [1, 2, 1, '1']
 *  var uniqueArr = unique(arr)   // [1, 2, '1']
 *
 * @export
 * @param {array} array 要去重的数组
 * @returns {array} 去重之后的数组
 */
export function unique (array) {
  var res = []
  var obj = {}

  for (var i = 0, len = array.length; i < len; i++) {
    var value = array[i]
    var key = typeof value + value
    if (!obj[key]) {
      res.push(value)
      obj[key] = true
    }
  }
  return res
}

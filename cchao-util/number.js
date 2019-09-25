/**
 * 返回一个min 和 max之间的随机整数。如果你只传递一个参数，那么将返回0和这个参数之间的整数。
 *
 * @export
 * @param {number} min 随机数最小值
 * @param {number} max 随机数最大值
 * @return {number} 随机数
 */
export function random (min, max) {
  if (!max) {
    max = min
    min = 0
  }
  return min + Math.floor(Math.random() * (max - min + 1))
}

/**
 * 个位数补零
 * @param {number} value 大于零的整数
 * @return {string} 补零之后的数
 */
export function pad (value) {
  return value < 10 && value >= 0 ? '0' + value : value.toString()
}

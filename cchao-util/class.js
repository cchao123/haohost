/**
 *
 * 判断classList是否可用
 *
 * @private
 * @param { HTMLElement } el dom元素
 * @return { boolean } true表示不能使用classList方法，否则则不行
 */
function canIUseClassList (el) {
  if ('classList' in window.document.documentElement) return true
  else return false
}

/**
 * 判断dom元素是否有该class类
 *
 * @param { HTMLElement } el dom元素
 * @param { string } className 类名
 * @return { boolean } true表示含有该类，否则则无
 */
export function hasClass (el, className) {
  if (canIUseClassList(el)) return el.classList.contains(className)
  else return new RegExp('\\b'+ className+'\\b').test(el.className)
}

/**
 * 给指定元素添加类
 *
 * @param { HTMLElement } el dom元素
 * @param { string } className 类名
 */
export function addClass (el, className) {
  if (canIUseClassList(el)) el.classList.add(className)
  else if (!hasClass(el, className)) el.className += ' ' + className
}

/**
 * 给指定元素删除类
 *
 * @param { HTMLElement } el dom元素
 * @param { string } className 类名
 */
export function removeClass (el, className) {
  if (canIUseClassList(el)) el.classList.remove(className)
  else el.className = el.className.replace(new RegExp('\\b'+ className+'\\b', 'g'), '')
}

/**
 * 给指定元素切换样式
 *
 * @param { HTMLElement } el dom元素
 * @param { string } className 类名
 */
export function toggleClass (el, className) {
  if (hasClass(el, className)) {
    removeClass(el, className)
  } else {
    addClass(el, className)
  }
}

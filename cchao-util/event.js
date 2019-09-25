
/**
 * 添加事件处理程序
 *
 * @param {HTMLElement} elem
 * @param {string} type 事件类型(click, scroll, blur...)
 * @param {function} handler 事件函数
 *
 * @example
 *  var handler = function (event) { console.log(event) }
 *  addEvt(document, 'click', handler)
 *  // 点击页面，控制台打印 MouseEvent{...}
 */
export function addEvt (elem, type, handler) {
  if (elem.attachEvent) { // 低版本的IE
    return elem.attachEvent('on' + type, handler)
  } else if (elem.addEventListener) { // 使用DOM2级方法添加事件
    return elem.addEventListener(type, handler, false)
  } else { // 使用DOM0级方法添加事件
    elem['on' + type] = handler
  }
}

/**
 * 删除事件处理程序
 *
 * @param {HTMLElement} elem dom元素
 * @param {string} type 事件类型(click, scroll, blur...)
 * @param {function} handler 事件函数
 *
 * @example
 *  var handler = function (event) { console.log(event) }
 *  addEvt(document, 'click', handler)
 *  removeEvt(document, 'click', handler)
 *  // 点击页面，没有反应
 */
export function removeEvt (elem, type, handler) {
  if (elem.detachEvent) { // 低版本的IE
    elem.detachEvent('on' + type, handler)
  } else if (elem.removeEventListener) {
    elem.removeEventListener(type, handler, false)
  } else {
    elem['on' + type] = null
  }
}

/**
 * 触发事件
 *
 * @param {HTMLElement} elem dom元素
 * @param {string} type 事件类型
 *
 * @example
 *  var handler = function (event) { console.log(event) }
 *  addEvt(document, 'click', handler)
 *  triggerEvt(document, 'click') // Event{...}
 */
export function triggerEvt (elem, type) {
  if ('createEvent' in document) {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createEvent
    let e = document.createEvent('HTMLEvents')
    e.initEvent(type, false, true)
    elem.dispatchEvent(e)
  } else {
    // ie8
    let e = document.createEventObject()
    e.eventType = type
    e.fireEvent('on' + e.eventType, e)
  }
}

/**
 * 获取事件对象
 *
 * @param {Event} event 事件对象
 * @example
 *  var handler = function (event) { event = getEvent(event) }
 *  addEvt(document, 'click', handler)
 */
export function getEvent (event) {
  return event ? event : window.event
}

/**
 * 返回事件的实际目标
 *
 * @param {Event} event 事件对象
 * @example
 *  var handler = function (event) {
 *    event = getEvent(event)
 *    var target = getTarget(event)
 *  }
 *  addEvt(document, 'click', handler)
 */
export function getTarget (event) {
  return event.target || event.srcElement
}

/**
 * 阻止事件的默认行为
 *
 * @param {Event} event 事件对象
 * @example
 *  var handler = function (event) {
 *    event = getEvent(event)
 *    preventDefault(event)
 *  }
 *  addEvt(document, 'click', handler)
 */
export function preventDefault (event) {
  if ( event.preventDefault ) {
    event.preventDefault()
  } else {
    event.returnValue = false
  }
}

/**
 * 立即停止事件在DOM树中的传播
 *
 * @param {Event} event 事件对象
 * @example
 *  var handler = function (event) {
 *    event = getEvent(event)
 *    stopPropagation(event)
 *  }
 *  addEvt(document, 'click', handler)
 */
export function stopPropagation (event) {
  if (event.stopPropagation) {
    event.stopPropagation();
  } else {
    event.cancelBubble = true
  }
}

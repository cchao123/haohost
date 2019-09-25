import { isObject, isArray } from './type'

const ENGINE_REG = {
  EdgeHTML: /windows.+\sedge\/([\w\.]+)/i,
  Blink: /webkit\/537\.36.+chrome\/(?!27)/i,
  Presto: /(presto)\/([\w\.]+)/i,
  Webkit: /(webkit)\/([\w\.]+)/i,
  Trident: /(trident)\/([\w\.]+)/i,
  Khtml: /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,
  Gecko: /rv\:([\w\.]{1,9}).+gecko/i
}

const OS_REG = {
  Android: /(android)\s([\d\.]+)/i,
  iOS: /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i,
  Windows: /(Windows\s+\w+)?\s+?(\d+\.\d+)/i,
  MacOS: /(mac\sos\sx)\s?([\w\s\.]*)/i
}

const BROWSER_REG = {
  QQ: /(QQ)\/([\d\.]+)/i,
  WeChat: /micromessenger\/([\w\.]+)/i,
  qqnews: /(qqnews)\/([\w\.]+)/i,
  qqnewslite: /(qqnewslite)\/([\w\.]+)/i,
  QQVideo: /(qqlivebrowser)\/([\w\.]+)/i,
  QQMusic: /(qqmusic)\/([\w\.]+)/i,
  QNReading: /(qnreading)\/([\w\.]+)/i,
  kameng: /(kameng)\/([\w\.]+)/i,
  BaiduBrowser: /baidubrowser[\/\s]?([\w\.]+)/i,
  QQBrowser: /m?(qqbrowser)[\/\s]?([\w\.]+)/i,
  UCBrowser: /(?:ucbrowser)\/([\d\.]+)/i,
  Safari: /version\/([\d\.]+).*safari/i,
  Edge: /(edge|edgios|edga)\/(\d+?[\w\.]+)/i,
  Maxthon: /(maxthon)[\/\s]?([\w\.]*)/i,
  IE11: /trident.+rv[:\s]([\w\.]+).+like\sgecko/i,
  IE: /msie\s([\d\.]+)/i,
  Chrome: /chrome\/([\d\.]+)/i,
  Firefox: /(firefox)\/([\w\.-]+)$/i,
  Opera: /(?:opera|opr|opios).([\d\.]+)/i
}

/**
 * userAgent解析
 * @class UAParser
 *
 * @example
 *  var uaparser = new UAParser()
 *  uaparser.getUA()
 *  var ua = 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Mobile Safari/537.36'
 *  uaparser.setUA(ua).isIOS() // false
 */
export default class UAParser {
  constructor(params) {
    /** @type {string} */
    this.uagent = window && window.navigator && window.navigator.userAgent
      ? window.navigator.userAgent : ''
  }

  /**
   * 获取userAgent
   * @return {string}
   */
  getUA () {
    return this.uagent
  }

  /**
   * 设置userAgent
   * @param {string} ua userAgent
   */
  setUA (ua) {
    this.uagent = ua
    return this
  }

  /**
   * 通过客户端注入的webview的useragent来判断是否是在对应App中
   * @param {RegExp} reg 判断的正则表达式
   * @return {boolean} true在app内，false不在
   */
  isTheApp (reg) {
    return reg.test(this.uagent)
  }

  /**
   * 判断是否是移动端
   * @return {boolean} true - mobile; false - pc
   */
  isMobile () {
    return /(AppleWebKit.*Mobile.*|mobile|android|iphone|ipad|blackberry|hp-tablet|symbian|phone|windows\sphone)/i.test(this.uagent)
  }

  /**
   * 是否是iOS系统
   */
  isIOS () {
    return !!this.getOS().iOS
  }

  /**
   * 是否是Android系统
   */
  isAndroid () {
    return !!this.getOS().Android
  }

  /**
   * 获取映射关系
   * @param {object} regs 正则表达式
   */
  mapper (regs) {
    let info = { name: undefined, version: undefined, alias: undefined }
    if (isObject(regs)) {
      for (var key in regs) {
        let matches = this.uagent.match(regs[key])
        if (matches) {
          info[key] = true
          if (isArray(matches) && matches.length > 0) {
            info.alias = key
            if (matches.length === 2) {
              info.name = key
              info.version = matches[1] ? matches[1].replace(/_/g, '.') : undefined
            } else if (matches.length === 3) {
              info.name = matches[1] ? matches[1] : undefined
              info.version = matches[2] ? matches[2].replace(/_/g, '.') : undefined
            }
          } else {
            info.version = undefined
          }
          break
        }
      }
    }
    return info
  }

  /**
   * 获取浏览器版本
   *
   * @return {object}
   */
  getBrowser () {
    return this.mapper(BROWSER_REG)
  }

  /**
   * 获取系统信息
   *
   * @return {object}
   */
  getOS () {
    return this.mapper(OS_REG)
  }

  /**
   * 获取浏览器渲染引擎信息
   *
   * @return {object}
   */
  getEngine () {
    return this.mapper(ENGINE_REG)
  }

  /**
   * 获取浏览器信息
   *
   * @return {object}
   */
  getResult () {
    return {
      ua: this.uagent,
      browser: this.getBrowser(),
      os: this.getOS(),
      engine: this.getEngine()
    }
  }
}

export const uaparserIns = (params) => {
  return new UAParser(params)
}

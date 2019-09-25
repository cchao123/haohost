# 实用工具库

## 使用

## 判断变量类型
```javascript
// ######################################################
// 判断类型
// ######################################################
import * as $type from '@tencent/anghost-util/type'

$type.isFunction(function () {}) // true
$type.isObject({}) // true
$type.isArray([]) // true
$type.isNull(null) // true
$type.isNumber(7) // true
$type.isString('') // true
$type.isBoolean(true) // true
```

## array - 数组
```javascript
// ######################################################
// 数组相关
// ######################################################
import * as $arr from '@tencent/anghost-util/array'

$arr.inArray(1, [1, 2, 3]) // 0
$arr.inArray(0, [1, 2, 3]) // -1

var arrObj = [{name: 'a', age: 11}, {name: 'f', age: 16}, {name: 'c', age: 20}, {name: 'b', age: 18}]
var arr = [4, 2, 5, 3, 6, 8, 1, 9, 0, 7]

var arrObjSortResult = arrObj.sort($arr.dynamicSort('name', 'desc'))
// [{name: 'f', age: 16}, {name: 'c', age: 20}, {name: 'b', age: 18}, {name: 'a', age: 11}]

var arrSortRes = arr.sort($arr.dynamicSort())
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

var arrSortResDesc = arr.sort($arr.dynamicSort('', 'desc'))
// [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

var arr = [1, 2, 1, '1']
var uniqueArr = $arr.unique(arr)   // [1, 2, '1']
```

## 时间
```javascript
// ######################################################
// date
// ######################################################
import * as $date from '@tencent/anghost-util/date'

let data1 = new Date('2018-05-01')
let data2 = new Date('2018-05-02')
$date.isSameDay(date1, date2)     // false

$date.formatTime('2018-03-03 12:12:12', 'yyyy/MM/dd hh:mm:ss') // 2018/03/03 12:12:12
$date.formatTime(1520035200000, 'yyyy/MM/dd hh:mm:ss') // 2018/03/03 08:00:00

const time = new Date().getTime()
$date.pastTimeDiffNow(time) // 刚刚
```

## number
```javascript
// ######################################################
// number
// ######################################################
import * as $num from '@tencent/anghost-util/number'
// 返回一个min 和 max之间的随机整数。如果你只传递一个参数，那么将返回0和这个参数之间的整数。
var rd = $num.random(1, 4)
```

## object
```javascript
// object
import * as $obj from '@tencent/anghost-util/object'
$obj.isEmptyObject({})       // true
$obj.isEmptyObject({a: 1})   // false

var newObj = $obj.extend({a: 1}, {b: 2}) // {a: 1, b: 2}
var newObj2 = $obj.extend({a: 1}, {b: 2}, {c: 3}) // {a: 1, b: 2, c: 3}
```

## 获取请求url参数和加载脚本文件

```javascript
// ######################################################
// url
// ######################################################
import { getUrlParam, loadScript } from '@tencent/anghost-util/url'

// window.location.href = https://www.example.com?name=angelzou
getUrlParam('name') // angelzou
getUrlParam('id', 'https://www.example.com?id=12') // 12

// 加载脚本文件
loadScript('http://test.qq.com/script.js', function succ () {
  console.log('succ')
}, function fail () {
  console.log('fail')
})

```

## cookie

```javascript
// 引入方式 1
import * as $cookie from '@tencent/anghost-util/cookie'

$cookie.setCookie('name', 'angelzou', 4)
var ck = getCookie('name')
delCookie('name')

```

## uaparser - 解析userAgent

```javascript
import UAParser from '@tencent/anghost-util/uaparser'

var uaparser = new UAParser()
uaparser.getUA() // 当前浏览器userAgent
var ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
uaparser.setUA(ua)
uaparser.getUA() // 当前设置的userAgent信息
uaparser.isIOS() // true
uaparser.isAndroid() // false
uaparser.isMobile() // true
uaparser.getBrowser() // {Safari: true, alias: "Safari", name: "Safari", version: "11.0"}
/**
 * alias字段的值可为：QQ，WeChat，qqnews，qqnewslite，QQVideo，QQMusic，QNReading，kameng，BaiduBrowser，QQBrowser，UCBrowser，Safari，Edge，Maxthon，IE11，IE，Chrome，Firefox，Opera，undefined
 */

uaparser.getOS() // {alias: "iOS", iOS: true, name: "iOS", version: "11.0"}
/**
 * alias字段的值可为：Android, iOS, Windows, MacOS, undefined
 */

uaparser.getEngine() // {Webkit: true, alias: "Webkit", name: "WebKit", version: "604.1.38"}
/**
 * alias字段的值可为：EdgeHTML, Blink, Presto, Webkit, Trident, Khtml, Gecko, undefined
 */

uaparser.getResult() // {browser: {...}, os: {...}, engine: {...}, ua: '...'}


// 判断是否是在对应应用中
uaparser.getBrowser().WeChat // true表示在微信客户端；否则不是
// 或者
uaparser.isTheApp(/qqnews\//i) // true在腾讯新闻里；false不在
```

## localStorage - 本地存储

```javascript
import * as $LS from '@tencent/anghost-util/localstorage'

$LS.setLS('userinfo', {name: 'angelzou'}) // 设置本地存储的键值对
$LS.getLS('userinfo') // 获取本地存储的值
$LS.removeLS('userinfo') // 删除本地存储对应的键值对
$LS.clearALLLS() // 删除所有的本地存储数据
```

## class - 标签类属性操作

```javascript
// 引入方式 1
import * as $class from '@tencent/anghost-util/class'

var body = document.body
$class.addClass(body, 'test') // 给标签添加类
$class.hasClass(body, 'test') // 判断dom元素是否有该class类
$class.removeClass(body, 'test') // 给指定的元素删除类
$class.toggleClass(body, 'test') // 给指定元素切换样式

```

## event - 事件处理

```javascript
// 引入方式 1
import * as $event from '@tencent/anghost-util/event'

var handler = function (event) {
  console.log(event)
}
$event.addEvt(document.body, 'click', handler) // 添加事件
$event.removeEvt(document.body, 'click', handler) // 移除事件
$event.triggerEvt(document.body, 'click') // 触发事件
```


let $fetch = {
  get(url, data) {
    if (Object.prototype.toString.call(data) != "[object Object]") {
      return {
        then(callback) {
          callback("GET请求入参格式不正确,需要传OBJECT")
          return {
            catch(err) {
              err(new Error("入参格式错误"))
            }
          }
        }
      };
    }
    let queryString = "?"
    for (let i in data) {
      queryString += (i + "=" + data[i] + "&")
    }
    url = encodeURI(url + queryString.slice(0, -1))
    return fetch(url, {
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      credentials: "include"
    }).then(res => res.json())
  },
  post(url, data) {
    if (Object.prototype.toString.call(data) != "[object Object]") {
      return {
        then(callback) {
          callback("POST请求入参格式不正确,需要传OBJECT")
          return {
            catch(err) {
              err(new Error("入参格式错误"))
            }
          }
        }
      };
    }
    return fetch(url, {
      body: JSON.stringify(data),//字符串
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      credentials: "include",
      method: "POST"
    }).then(res => res.json())
  },
}

export default $fetch
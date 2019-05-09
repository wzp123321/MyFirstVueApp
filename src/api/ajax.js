/**
 * ajax请求函数模块
 * 返回值时promise对象
 */
import axios from 'axios'

export default function ajax(url , data={} , type='GET'){

    // 返回发送请求之后得到的response.data数据      之前的promise相当于response
    return new Promise (function(resolve,reject){
        // 执行异步ajax请求
        let promise
    if(type ==='GET'){
        // 准备url query参数数据
        let dataStr =''     // 拼接字符串
        Object.keys(data).forEach(key =>{
            dataStr = key + '=' + data[key] + '&'
        })
        if(dataStr !==''){
            dataStr = dataStr.substring(0,dataStr.lastIndexOf('&'))
            url = url + '?' + dataStr
        }
        // 发送get请求
        promise = axios.get(url)
    }else{
        promise = axios.post(url,data)
    }
    promise.then(function(response){
        // 成功了调用resolve
        resolve(response.data)
    }).then(function(error){
        // 失败了调用reject
        reject(error)
    })
})

 
}
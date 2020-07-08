import axios from 'axios'
var root = process.env.API_ROOT;
const Axios = axios.create();
import Qs from 'qs'
import Cookie from "js-cookie";
import { Message } from 'element-ui'
import { type } from 'jquery';
axios.defaults.withCredentials = false;
axios.defaults.headers.common['token'] = Cookie.get('token');
export  default function(path, params, method = "get", headerType = "json"){
let baseURL = "", data = {}
    baseURL = process.env.BASE_URL
    //设置请求头
    //post请求
    if (method === 'post') {
        if (headerType === "json") {
            axios.defaults.headers["Content-Type"] = 'application/json;charset=UTF-8'
            data = params
        } else if(headerType == !'json'){
            axios.defaults.headers["Content-Type"] = 'application/x-www-form-urlencoded;charset=UTF-8'
            data = Qs.stringify(params);
            path = path + '?' + data
        }
    }

    //get请求
    if (method === 'get') {
        if(typeof(params) !== "number"){
            if (headerType == !'json') {
                axios.defaults.headers["Content-Type"] = 'application/x-www-form-urlencoded;charset=UTF-8'
            }
            data = Qs.stringify(params);
            path = path + '?' + data
            data = {};
        }else{
            if (headerType == !'json') {
                axios.defaults.headers["Content-Type"] = 'application/x-www-form-urlencoded;charset=UTF-8'
            }
            path+=data
        }
    }
    
    // 当出现某些情况的时候设置请求拦截
    // Axios.interceptors.response.use(response=>{
    //     //请求之前重新拼装url
    //     response.url = root + response.url;
    //         return response;
    //     },error=>{
    //         return Promise.resolve(error.response)
    //     })

    //发送请求
    return new Promise((resolve,reject)=>{
        axios({
            baseURL,
            method,
            url: path,
            data:params,
            timeout:6000,
            }).then(result=>{
                resolve(result.data)
            }).catch(err=>{
                reject(err)
            })
        })
}
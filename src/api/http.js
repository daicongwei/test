import axios from 'axios';
import { Loading, Message } from 'element-ui';
let loadingInstance;
let isParms = {
    isLoading: true,//默认开启loading弹窗
    isHandleErr: true,//默认统一处理错误
};
// 创建axios实例
const instance = axios.create({
    baseURL: 'http://192.168.0.22:8080',
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000, // 请求超时时间
})

const request = async function (options) {
    // 删除属性
    if (options?.data?.option) {
        isParms = Object.assign(isParms, options.data.option);
        delete options.data.option;
    }
    if (options?.params?.queryurl) {
        options.url = options.url+options.params.queryurl
        delete options.params;
    }
    if (options?.data?.queryurl) {
        options.url = options.url+options.data.queryurl
        delete options.data.queryurl;
    }
    try {
        const res = await instance(options);
        // console.log(res);
        const { code, msg } = res.data;
        if (code == 500) {
            // 统一处理错误
            if (isParms.isHandleErr) {
                Message({
                    showClose: true,
                    message: msg,
                    type: 'error'
                })
            }
            return Promise.reject({ msg });
        }if(code == 401){
            Message({
                showClose: true,
                message: '登录已失效，请重新登录',
                type: 'error'
            })
            console.log(222);
            localStorage.removeItem("user")
            console.log(111);


            // return Promise.reject({ msg });
        } else {
            return Promise.resolve(res.data);
        }
    } catch (err) {
        return err;
    }
}



instance.interceptors.request.use(
    function (config) {
        // 开启弹窗
        if (isParms?.isLoading) {
            loadingInstance = Loading.service({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.4)'
            });
        }
        config.headers.token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : '';
            // config.headers.token = token;
        return config;
    },
    function (error) {
        console.log(error);
        return Promise.reject(error);
    }
);



// 添加响应拦截器
instance.interceptors.response.use(response => {
    if (loadingInstance) {
        loadingInstance.close();
    }
    return Promise.resolve(response);
}, error => {
    if (loadingInstance) {
        loadingInstance.close();
    }
    // 对响应错误做处理
    if (error.response) {
        return Promise.reject(checkStatus(error.response));
    } else if (
        error.code == "ECONNABORTED" && error.message.indexOf("timeout") != -1
    ) {
        return Promise.reject({ msg: "请求超时" });
    } else {
        return Promise.reject({});
    }
});


function checkStatus(response) {
    console.log(response);
    const { status, result } = response;
    if (status === 'error') {
        return {
            message: result.error_msg
        }
    } else {
        return result;
    }
}


export default request
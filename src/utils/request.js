import config from '../config/index.js';
import store from "../store";

const NODE_ENV = process.env.NODE_ENV;

function request(method = 'GET', url, params, isToken = true) {
    const apiUrl = getUrl(url);
    const headers = {
        'Content-Type': 'application/json'
    };
    let token = uni.getStorageSync('token');
    if (token) {
        const now_time = new Date().getTime();
        const token_start_time = uni.getStorageSync('token_start_time');
        const token_expired_time = 60 * 60 * 1000;
        if (now_time - token_start_time > token_expired_time - (5 * 1000)) {
            return refreshToken(token).then(result => {
                const {data} = result.data;
                let {token} = data;
                uni.setStorageSync('token_start_time', new Date().getTime());
                store.dispatch('setToken', token);
                token = uni.getStorageSync('token');
                if (isToken) {
                    params = Object.assign({}, {token}, params);
                }
                return new Promise((resolve, reject) => {
                    uni.request({
                        url: apiUrl,
                        method: method.toUpperCase(),
                        data: params,
                        header: headers,
                        success(res) {
                            resolve(res);
                        },
                        fail(error) {
                            console.log(error);
                            reject(error);
                        }
                    });
                });
            });
        } else {
            params = Object.assign({}, {token}, params);
            return new Promise((resolve, reject) => {
                uni.request({
                    url: apiUrl,
                    method: method.toUpperCase(),
                    data: params,
                    header: headers,
                    success(res) {
                        resolve(res);
                    },
                    fail(error) {
                        console.log(error);
                        reject(error);
                    }
                })
            });
        }
    } else {
        return new Promise((resolve, reject) => {
            uni.request({
                url: apiUrl,
                method: method.toUpperCase(),
                data: params,
                header: headers,
                success(res) {
                    resolve(res);
                },
                fail(error) {
                    console.log(error);
                    reject(error);
                }
            })
        });
    }
}

function refreshToken(token) {
    const url = '/api/auth/refresh-token';
    const refresh_url = getUrl(url);
    return new Promise((resolve, reject) => {
        uni.request({
            url: refresh_url,
            method: "POST",
            data: {
                token
            },
            success(res) {
                resolve(res);
            },
            fail(error) {
                reject(error);
                console.log(error);
            }
        });
    });
}

function getUrl(url) {
    let apiUrl;
    if (NODE_ENV === 'development') {
        apiUrl = `${config[NODE_ENV].host}${url}`;
    } else {
        apiUrl = `${config[NODE_ENV].host}${url}`;
    }
    return apiUrl;
}

function toast(title) {
    uni.showToast({
        title,
        duration: 1500,
        position: 'bottom',
        icon: 'none'
    });
}

export default request;

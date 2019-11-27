<template>
    <view class="container">
        <image class="login-img" src="../../static/images/鉴定logo@2x.png"></image>
        <view class="text">登录BAN鉴定服务</view>
        <view class="text2">只为提供最公正的鉴定结果</view>
        <button
            class="get_user_info"
            open-type="getUserInfo"
            @getuserinfo="getUserInfo"
        >
            <image class="iphone" src="../../static/images/iphone@2x.png"></image>获取用户信息
        </button>
    </view>
</template>

<script>
import request from "../../utils/request.js";
const NODE_ENV = process.env.NODE_ENV;
import config from "../../config";

export default {
    data() {
        return {
            qiniuUrl: config[NODE_ENV].qiniuUrl
        };
    },
    onReady() {
        this.checkLogin();
    },
    methods: {
        checkLogin() {
            // if (uni.getStorageSync("token")) {
            //     uni.navigateTo({
            //         url: "/pages/index3/index3"
            //     });
            //     return;
            // }
        },
        getUserInfo(e) {
            const that = this;
            uni.showLoading({
                title: "登录中...",
                icon: "none"
            });
            uni.getProvider({
                service: "oauth",
                success(res) {
                    const { provider } = res;
                    uni.login({
                        provider: provider[0],
                        success(loginRes) {
                            uni.getUserInfo({
                                success(user_info) {
                                    console.log(user_info);
                                    const { code } = loginRes;
                                    const js_code = code;
                                    const miniapp_name = "appraisal";
                                    request(
                                        "POST",
                                        "/api/wechat/ma/auth/login",
                                        {
                                            miniapp_name,
                                            js_code,
                                            user_info
                                        }
                                    ).then(result => {
                                        const { data } = result.data;
                                        const { token, user_info } = data;
                                        uni.setStorageSync(
                                            "token_start_time",
                                            new Date().getTime()
                                        );
                                        that.$store.dispatch("setToken", token);
                                        that.$store.dispatch(
                                            "setUserInfo",
                                            user_info
                                        );
                                        uni.hideLoading();
                                        setTimeout(() => {
                                            uni.redirectTo({
                                                url: "/pages/index3/index3"
                                            });
                                        }, 200);
                                        console.log(res);
                                    });
                                }
                            });
                        },
                        fail(error) {
                            console.log(error);
                        }
                    });
                }
            });
        }
    }
};
</script>

<style lang="scss">
.container {
    text-align: center;
    background-color: #fff;
}
.login-img {
    width: 140rpx;
    height: 140rpx;
    margin-top: 102rpx;
}
.text {
    font-size: 38rpx;
    color: #333333;
    margin-top: 50rpx;
}
.text2 { 
    color: #898989;
    margin-top: 12rpx;
}
.get_user_info {
    width: 630rpx;
	height: 96rpx;
    line-height: 96rpx;
    font-size: 32rpx;
    margin: 144rpx auto 0;
    color: #ffffff;
    text-align: center;
	background-color: #7186f1;
	border-radius: 12rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}
.iphone {
    width: 24rpx;
    height: 40rpx;
    margin-right: 20rpx;
}
</style>

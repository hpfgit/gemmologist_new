<template>
  <view class="container">
    <button
      class="get_user_info"
      open-type="getUserInfo"
      @getuserinfo="getUserInfo"
    >
      获取用户信息
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
      if (uni.getStorageSync('token')) {
        uni.navigateTo({
          url: '/pages/index/index'
        });
        return;
      }
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
                  request("POST", "/api/wechat/ma/auth/login", {
                    miniapp_name,
                    js_code,
                    user_info
                  }).then(result => {
                    const { data } = result.data;
                    const { token, user_info } = data;
                    uni.setStorageSync(
                      "token_start_time",
                      new Date().getTime()
                    );
                    that.$store.dispatch("setToken", token);
                    that.$store.dispatch("setUserInfo", user_info);
                    uni.hideLoading();
                    setTimeout(() => {
                      uni.redirectTo({
                        url: "/pages/index/index"
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
.login {
  position: fixed;
  bottom: 100rpx;
  left: 0;
  right: 0;
  width: 680rpx;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  color: #ffffff;
  border-radius: 20rpx;
  margin: 0 auto;
  background-color: #f60;
}
</style>

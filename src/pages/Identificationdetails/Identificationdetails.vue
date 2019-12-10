<template>
  <view class="container">
    <div class="info-container" v-if="user_info.avatar">
      <view class="info">
        <view class="top">
          <view class="title">服务项目</view>
          <view class="img">
            <image
              v-if="mold === '1'"
              :src="qiniuUrl+'/免费鉴定@2x.png'"
            ></image>
            <image
              v-if="mold === '2'"
              :src="qiniuUrl+'/专业鉴定@2x.png'"
            ></image>
          </view>
          <view class="bj">
            保价
          </view>
          <view class="price"> ￥{{ user_info.price }} </view>
        </view>
        <view class="center">
          <view class="head">
            <image :src="avatar"></image>
          </view>
          <view class="userinfo">
            <view class="name">
              {{ user_info.name }}
            </view>
            <view class="bq">
              {{ user_info.note ? user_info.note : "暂无标签" }}
            </view>
          </view>
          <view class="jd"> 已鉴定 {{ user_info.count }} 双 </view>
        </view>
        <view class="bottom">
          <view class="tab">
            <image
              :src="qiniuUrl+'/个人主页2@2x.png'"
            ></image>
            <text>查看主页</text>
          </view>
          <view class="tab">
            <image
              :src="qiniuUrl+'/记录@2x.png'"
            ></image>
            <text>查看记录</text>
          </view>
          <view class="tab">
            <image
              :src="qiniuUrl+'/备注@2x.png'"
            ></image>
            <text>备注标签</text>
          </view>
        </view>
      </view>
    </div>
    <view class="djd">
      <view class="top">
        <view class="title">
          {{JDstatus}}
        </view>
        <image
          class="bjd-img"
          :src="qiniuUrl+'/技术支持2@2x.png'"
        ></image>
      </view>
      <view class="bottom">
        {{ hint_top }}
      </view>
    </view>
    <view class="tip">
      微信小程序：BAN装备鉴定，输入
      <text class="text">756324</text>
      查询原帖
    </view>
    <view class="content">
      <view class="title">
        {{data.brand_name}}
      </view>
      <view class="beizhu">
        {{ data.description ? data.description : '暂无备注' }}
      </view>
      <view class="imgs">
        <view class="img-box" v-for="(item, index) in images" :key="index">
          <view class="img" @tap="data.post_status === 11 ? upImg(index) : ''">
            <image :src="getPath(item.path, item.image)"></image>
            <view class="mark">
              {{ item.name }}
            </view>
          </view>
        </view>
      </view>
      <view class="gdjl">
        <image src="../../static/images/Workorderrecord@2x.png"></image>
      </view>
    </view>
    <view
      class="button"
      @tap="supplementFn"
      v-if="data.post_status === 11"
    >
      提交补图
    </view>
    <view class="mask" v-show="is_start"></view>
    <view class="start-jd" v-show="is_start">
      <div class="title">开始鉴定</div>
      <view class="close" @tap="close">关闭</view>
      <view class="progress">
        <view
          v-for="(item, index) in checks"
          :key="index"
          class="status"
          :class="{ checked: item.checked, check: !item.checked }"
          @tap="check(index)"
          >{{ item.text }}
        </view>
      </view>
      <view class="mark" :class="{ bz_fw_mark: checks[3].checked }">
        <view
          class="bz-fw"
          v-show="checks[3].checked"
          :class="{ active: bzFw }"
          @tap="bz_fw"
          >不在鉴定范围</view
        >
        <input
          type="text"
          :class="{ bz_fw: checks[3].checked }"
          :placeholder="markPlace"
          :value="markContent"
          @change="markText($event)"
        />
      </view>
      <view class="button" @tap="submit">
        确认提交
      </view>
    </view>
  </view>
</template>

<script>
import { qiniuToken } from "../../api/publicationappraisal";
import { appraise, post, supplement } from "../../api/Identificationdetails";
import { upload, init } from "../../utils/qiniuUploader";
import config from "../../config";
const NODE_ENV = process.env.NODE_ENV;

export default {
  data() {
    return {
      qiniuUrl: config[NODE_ENV].qiniuUrl,
      details: {},
      markContent: "",
      checks: [
        {
          text: "真",
          checked: true,
          number: 1
        },
        {
          text: "假",
          checked: false,
          number: 0
        },
        {
          text: "需要补图",
          checked: false,
          number: 10
        },
        {
          text: "无法鉴定",
          checked: false,
          number: 2
        }
      ],
      images: [],
      user_info: {},
      work_order: [],
      data: {},
      hint_bottom: "",
      hint_top: "",
      appraiser: [],
      operation_name: "",
      is_start: false,
      result: "",
      avatar: "",
      type: "",
      markPlace: "可添加备注以便以后查看（仅鉴定师可见）",
      bzFw: false,
      mold: '',
      JDstatus: '',
      uploadPicture: {}
    };
  },
  onShareAppMessage(result) {
    if (result.from === 'button') {
      console.log(result.target);
    }

    return {
      title: '自定义分享标题',
      path: '/pages/Identificationdetails/Identificationdetails'
    }
  },
  onLoad(options) {
    console.log(options);
    uni.showLoading({
      title: '加载中...',
      icon: 'none'
    });
    const { id, type, mold } = options;
    this.type = type;
    this.mold = mold;
    this.result = 1;
    post({ id }).then(result => {
      const {
        images,
        user_info,
        work_order,
        data,
        hint_bottom,
        hint_top,
        appraiser,
        operation_name
      } = result.data;
      images.forEach(img => {
        if (img.path) {
          img.path = config[NODE_ENV].imgUrl + img.path;
        }
        img.image = config[NODE_ENV].imgUrl + img.image;
      });
      this.images = images;
      this.images.push({
        code: "0",
        name: "补图",
        image:
          "../../static/images/publicationappraisal/球鞋鉴定位置/更多@2x.png"
      });
      this.user_info = user_info;
      this.work_order = work_order;
      this.data = data;
      this.hint_bottom = hint_bottom;
      this.hint_top = hint_top;
      this.appraiser = appraiser;
      this.operation_name = operation_name;
      this.avatar = config[NODE_ENV].imgUrl + user_info.avatar;
      this.JDstatus = data.result;
      uni.hideLoading();
    });
  },
  methods: {
    upImg(index) {
      const that = this;
      uni.chooseImage({
        count: 1,
        success(res) {
          const { tempFilePaths } = res;
          const imgPath = tempFilePaths[0];
          that.images[index].path = imgPath;
          if (index >= that.images.length - 1) {
            that.images[index].code = index - 11;
            that.images[index].path = imgPath;
            that.images[index].name = "补充";
            const obj = {
              code: index - 10,
              path:
                "../../static/images/publicationappraisal/球鞋鉴定位置/更多@2x.png",
              name: "补充"
            };
            that.images.push(obj);
          }
        },
        fail(err) {
          console.log(err);
        }
      });
    },
    uploadImgQiniu(images) {
      console.log(images);
      let that = this;
      const res_img = [];
      images.forEach(image => {
        if (/tmp/gi.test(image.path)) {
          res_img.push(image);
        }
      });
      console.log(images.length - 1);
      return new Promise((resolve, reject) => {
        images.map((r, i) => {
          console.log(i);
          const path = r.path;
          let ext = '';
          if (path) {
            ext = path.split(".")[path.split(".").length - 1]
          }
          if (/tmp/gi.test(path)) {
            qiniuToken().then(res => {
              let { upload_token } = res.data.data;
              upload(
                path,
                res => {
                  that.uploadPicture[r.code] = res.imageURL;
                  console.log(i, res_img.length - 1 + i);
                  if (i === res_img.length - 1 + i) {
                    console.log(that.uploadPicture);
                    resolve(that.uploadPicture);
                  }
                  // i === images.length - 1 && resolve(that.uploadPicture);
                },
                error => {
                  reject(error);
                },
                {
                  region: "NCN",
                  uptoken: upload_token,
                  uploadURL: "https://upload-z1.qiniup.com",
                  domain: config[NODE_ENV].domain,
                  key:
                    "uploads/appraiser/" +
                    that.getRandomStr(false, 32) +
                    "." +
                    ext
                }
              );
            });
          }
        });
      });
    },
    getRandomStr(randomFlag, min, max) {
      let str = "",
        range = min,
        pos = "",
        arr = [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "i",
          "j",
          "k",
          "l",
          "m",
          "n",
          "o",
          "p",
          "q",
          "r",
          "s",
          "t",
          "u",
          "v",
          "w",
          "x",
          "y",
          "z",
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "U",
          "V",
          "W",
          "X",
          "Y",
          "Z"
        ];

      // 随机产生
      if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;
      }
      for (let i = 0; i < range; i++) {
        pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
      }
      return str;
    },
    appraisal() {
      uni.showLoading();
      const that = this;
      this.uploadImgQiniu(this.images).then(result => {
        console.log(result);
        supplement({
          images: result,
          id: that.data.id
        })
          .then(result => {
            const {message} = result.data;
            uni.showToast({
              title: message,
              icon: "none",
              success() {
                uni.navigateBack({
                  delta: 1
                });
              }
            });
          })
          .catch(error => {
            console.log(error);
          });
      });
    },
    getPath(path, image) {
      if (path) {
        return path;
      }
      return image;
    },
    check(index) {
      this.checks.forEach(check => {
        check.checked = false;
      });
      this.markPlace = "可添加备注以便以后查看（仅鉴定师可见）";
      if (index === 2) {
        this.markPlace = "请输入补图位置";
      }
      this.checks[index].checked = true;
      this.result = this.checks[index].number;
    },
    markText(e) {
      this.markContent = e.target.value;
    },
    startJD() {
      this.is_start = true;
    },
    close() {
      this.is_start = false;
      this.markContent = "";
    },
    bz_fw() {
      this.bzFw = !this.bzFw;
    },
    supplementFn() {
      this.appraisal();
    }
  }
};
</script>

<style lang="scss">
.container {
  background-color: #fff;
}

.info-container {
  background-color: #eef1f4;
  overflow: hidden;
}

.info {
  width: 690rpx;
  height: 246rpx;
  background-color: #ffffff;
  border-radius: 10rpx;
  padding: 28rpx 28rpx 28rpx 38rpx;
  margin: 15rpx auto;

  .title {
    flex: 1;
    height: 25rpx;
    font-size: 26rpx;
    color: #393939;
    white-space: nowrap;
  }

  .img {
    image {
      width: 122rpx;
      height: 28rpx;
    }
  }
}

.top,
.center,
.bottom {
  display: flex;
  align-items: center;
}

.top {
  .bj {
    width: 70rpx;
    height: 32rpx;
    text-align: center;
    line-height: 30rpx;
    background-color: #ff2929;
    border-radius: 16rpx;
    border: solid 1rpx #f32828;
    font-size: 24rpx;
    color: #ffffff;
    margin-left: 26rpx;
  }

  margin-bottom: 30rpx;
  display: flex;
  justify-content: space-between;

  .price {
    margin-left: 10rpx;
  }

  image {
    margin-left: 28rpx;
  }

  .bjd-img {
    margin-right: 28rpx;
  }
}

.center {
  margin-bottom: 22rpx;

  .head {
    image {
      width: 68rpx;
      height: 68rpx;
      border-radius: 68rpx;
    }
  }

  .userinfo {
    margin-left: 22rpx;

    .name {
      font-size: 26rpx;
      color: #282828;
    }

    .bq {
      margin-top: 10rpx;
      color: #858585;
      font-size: 20rpx;
    }
  }

  .jd {
    flex: 1;
    text-align: right;
    margin-right: 10rpx;
  }
}

.bottom {
  .tab {
    display: flex;
    align-items: center;
    margin-left: 99rpx;

    image {
      margin-right: 14rpx;
    }

    text {
      font-size: 24rpx;
      color: #858585;
    }

    &:nth-of-type(1) {
      margin-left: 0;

      image {
        width: 38rpx;
        height: 31rpx;
      }
    }

    &:nth-of-type(2) {
      image {
        width: 32rpx;
        height: 34rpx;
      }
    }

    &:nth-of-type(3) {
      image {
        width: 28rpx;
        height: 32rpx;
      }
    }
  }
}

.djd {
  background-color: #ffffff;
  padding-top: 24rpx;
  padding-bottom: 36rpx;

  .title {
    font-weight: bold;
    font-size: 40rpx;
    color: #5e95f4;
    margin-left: 38rpx;
    image {
      width: 125rpx;
      height: 40rpx;
    }
  }

  .bjd-img {
    width: 172rpx;
    height: 60rpx;
  }

  .bottom {
    font-size: 24rpx;
    color: #282828;
    margin-left: 28rpx;
  }
}

.tip {
  font-size: 22rpx;
  color: #989898;
  height: 50rpx;
  line-height: 50rpx;
  background-color: #eef1f4;
  text-align: center;

  text {
    display: inline-block;
    width: 90rpx;
    height: 26rpx;
    line-height: 26rpx;
    text-align: center;
    background-color: #989898;
    border-radius: 8rpx;
    font-size: 22rpx;
    color: #ffffff;
  }
}

.imgs {
  display: flex;
  flex-wrap: wrap;
  text-align: center;

  .img-box {
    font-size: 22rpx;
    color: #ffffff;
    width: 25%;
    display: inline-block;

    .img {
      position: relative;
      height: 150rpx;
      width: 150rpx;
      display: inline-block;

      image {
        width: 150rpx;
        height: 150rpx;
        background-color: #f3f0ef;
        border-radius: 8rpx;
        position: absolute;
        left: 0;
        top: 0;
      }

      .mark {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 40%;
        background-color: rgba($color: #000000, $alpha: 0.5);
        z-index: 3;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        font-size: 22rpx;
      }
    }
  }
}

.content {
  padding-left: 28rpx;
  padding-right: 28rpx;
  margin-bottom: 100rpx;
  overflow: hidden;

  .title {
    font-size: 40rpx;
    margin-top: 32rpx;
  }

  .beizhu {
    font-size: 26rpx;
    margin-top: 22rpx;
    margin-bottom: 36rpx;
  }
}

.button {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 998;
  bottom: 50rpx;
  width: 250rpx;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  margin: 0 auto;
  background-image: linear-gradient(
      -90deg,
      #738af9 0%,
      #799bf5 45%,
      #7eabf1 100%
    ),
    linear-gradient(#5e95f4, #5e95f4);
  background-blend-mode: normal, normal;
  box-shadow: 0rpx 4rpx 10rpx 0rpx rgba(0, 0, 0, 0.2);
  border-radius: 40rpx;
  opacity: 0.9;
  font-size: 28rpx;
  color: #ffffff;
}

.start-jd {
  width: 100%;
  height: 555rpx;
  background-color: #ffffff;
  border-radius: 20rpx 20rpx 0rpx 0rpx;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;

  .title {
    text-align: center;
    padding-top: 42rpx;
    padding-bottom: 44rpx;
  }

  .close {
    position: absolute;
    right: 34rpx;
    top: 34rpx;
    width: 40rpx;
    height: 40rpx;
    border-radius: 40rpx;
    border: 1rpx solid #666;
    font-size: 16rpx;
    text-align: center;
    line-height: 40rpx;
  }

  .progress {
    width: 678rpx;
    height: 80rpx;
    background-color: #eef1f4;
    border-radius: 40rpx;
    display: flex;
    margin: 0 auto;

    .status {
      width: 170rpx;
      height: 78rpx;
      line-height: 78rpx;
      text-align: center;
      background-blend-mode: normal, normal;
      border-radius: 39rpx;
      margin-top: 1rpx;

      &.check {
        background-image: none;
        color: #666666;
      }

      &.checked {
        background-image: linear-gradient(
            -45deg,
            #5e95f4 0%,
            #3ba9f7 50%,
            #11c1fa 100%
          ),
          linear-gradient(#5e95f4, #5e95f4);
        color: #ffffff;
      }
    }
  }

  .mark {
    margin: 40rpx auto;
    width: 678rpx;

    &.bz_fw_mark {
      display: flex;
      justify-content: space-between;
    }

    input {
      width: 678rpx;
      height: 90rpx;
      background-color: #f9f9f9;
      border-radius: 10rpx;
      border: solid 1rpx #e7e5e5;
      margin: 0 auto;
      padding-left: 30rpx;
      box-sizing: border-box;
      font-size: 22rpx;

      &.bz_fw {
        width: 466rpx;
        border: solid 1rpx #e7e5e5;
        margin-left: 26rpx;
      }
    }
  }

  .bz-fw {
    width: 186rpx;
    height: 90rpx;
    line-height: 90rpx;
    background-color: #f9f9f9;
    border-radius: 10rpx;
    border: solid 1rpx #e7e5e5;
    font-size: 22rpx;
    text-align: center;
    &.active {
      border: solid 2rpx #5e95f4;
      color: #5e95f4;
    }
  }
}

.mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

.gdjl {
  margin-top: 100rpx;
  text-align: center;
  
  image {
    width: 478rpx;
    height: 114rpx;
  }
}
</style>

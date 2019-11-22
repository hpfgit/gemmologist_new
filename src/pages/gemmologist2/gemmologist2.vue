<template>
  <view class="container">
    <view class="jd">
      <view class="inner">
        <navigator class="box" url="/pages/means4/means4?type=work_order">
          <view class="title">
            待鉴定
          </view>
          <view class="info">
            <image
              :src="qiniuUrl+'/组24@2x.png'"
              mode=""
            ></image>
            <text class="number">233</text>
            <text class="text"></text>
            <image class="arrow" src="../../static/images/矩形1187@2x.png"></image>
          </view>
        </navigator>
        <navigator class="box" url="/pages/means4/means4?type=all">
          <view class="title">
            待回复
          </view>
          <view class="info">
            <image
              :src="qiniuUrl+'/组25@2x.png'"
              mode=""
            ></image>
            <text class="number">233</text>
            <text class="text"></text>
            <image class="arrow" src="../../static/images/矩形1187@2x.png"></image>
          </view>
        </navigator>
      </view>
    </view>
    <view class="modal">
      <view class="box">
        <view class="left">
          <image src="../../static/images/全部鉴定@2x.png"></image>
          <view class="text">全部鉴定</view>
        </view>
        <image class="arrow" src="../../static/images/矩形1@2x.png"></image>
      </view>
      <view class="box">
        <view class="left">
          <image src="../../static/images/全部鉴定@2x.png"></image>
          <view class="text">失误记录</view>
        </view>
        <image class="arrow" src="../../static/images/矩形1@2x.png"></image>
      </view>
    </view>
  </view>
</template>

<script>
import { appraise } from "../../api/gemmologist";
const NODE_ENV = process.env.NODE_ENV;
import config from "../../config";

export default {
  data() {
    return {
      freeAdmission: {},
      major: {},
      major2: {},
      major3: {},
      work_order: 0,
      all: 0,
      qiniuUrl: config[NODE_ENV].qiniuUrl
    };
  },
  onReady() {
    this.getData();
  },
  onPullDownRefresh() {
    this.getData();
  },
  methods: {
    goBack() {
      uni.navigateBack({
        delta: 1
      });
    },
    anError() {
      uni.navigateTo({
        url: "/pages/faultrecord/faultrecord"
      });
    },
    getData() {
      uni.showLoading();
      appraise().then(result => {
        const { data } = result.data;
        const { all, mf, work_order, zy, zy1, zy2 } = data;
        this.freeAdmission = mf;
        this.major = zy;
        this.major2 = zy1;
        this.major3 = zy2;
        this.work_order = work_order;
        this.all = all;
        uni.hideLoading();
        uni.stopPullDownRefresh();
      });
    }
  }
};
</script>

<style lang="scss">
  .jd {
    background-image: url('http://static-stg.tosneaker.com/image/appraisal/bg@2x.png');
    background-size: cover;
    padding: 40rpx 0;

    navigator {
      box-sizing: border-box;
    }
    .inner {
      display: flex;
      justify-content: space-between;
      width: 690rpx;
      margin: 0 auto;
    }

    .box {
      width: 330rpx;
      height: 176rpx;
      background-color: #ffffff;
      padding: 30rpx;
      border-radius: 16rpx;
    }

    .title {
      font-size: 28rpx;
      color: #898989;
      padding-bottom: 16rpx;
    }

    .info {
      position: relative;
      display: flex;
      align-items: center;

      image {
        width: 70rpx;
        height: 70rpx;
      }

      .arrow {
        width: 12rpx;
        height: 19rpx;
        position: absolute;
        right: 0;
        top: 0;
      }

      .number {
        font-family: PingFang-SC-Regular;
        font-size: 50rpx;
        color: #8b8b8b;
        margin-left: 18rpx;
      }

      .text {
        font-size: 50rpx;
        color: #000;
        margin-left: 16rpx;
      }
    }
  }

  .modal {
    .left {
      image {
        width: 40rpx;
        height: 40rpx;
      }
    }
    .arrow {
      width: 13rpx;
      height: 21rpx;
    }
  }
</style>

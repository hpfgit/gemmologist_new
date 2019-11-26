<template>
  <view class="container">
    <view class="jd">
      <view class="inner">
        <navigator class="box" url="/pages/means4/means4?type=djd">
          <view class="title">
            待鉴定
          </view>
          <view class="info">
            <image
              :src="qiniuUrl+'/组24@2x.png'"
              mode=""
            ></image>
            <text class="number">{{djd}}</text>
            <text class="text"></text>
            <image class="arrow" src="../../static/images/矩形1187@2x.png"></image>
          </view>
        </navigator>
        <navigator class="box" url="/pages/means4/means4?type=dhf">
          <view class="title">
            待回复
          </view>
          <view class="info">
            <image
              :src="qiniuUrl+'/组25@2x.png'"
              mode=""
            ></image>
            <text class="number">{{dhf}}</text>
            <text class="text"></text>
            <image class="arrow" src="../../static/images/矩形1187@2x.png"></image>
          </view>
        </navigator>
      </view>
    </view>
    <view class="modal">
      <view class="box" @tap="goTo(0)">
        <view class="left">
          <image src="../../static/images/全部鉴定@2x.png"></image>
          <view class="text">全部鉴定</view>
        </view>
        <image class="arrow" src="../../static/images/矩形1@2x.png"></image>
        <view class="line"></view>
      </view>
      <view class="box" @tap="goTo(1)">
        <view class="left">
          <image src="../../static/images/全部鉴定@2x.png"></image>
          <view class="text">失误记录</view>
        </view>
        <image class="arrow" src="../../static/images/矩形1@2x.png"></image>
      </view>
    </view>
    <view class="modal">
      <view class="box">
        <view class="left">
          <image :src="qiniuUrl+'/组26@2x.png'"></image>
          <view class="text">学习资料</view>
        </view>
        <image class="arrow" src="../../static/images/矩形1@2x.png"></image>
        <view class="line"></view>
      </view>
      <view class="box">
        <view class="left">
          <image :src="qiniuUrl+'/组29@2x.png'"></image>
          <view class="text">考核管理</view>
        </view>
        <image class="arrow" src="../../static/images/矩形1@2x.png"></image>
        <view class="line"></view>
      </view>
      <view class="box">
        <view class="left">
          <image :src="qiniuUrl+'/组28@2x.png'"></image>
          <view class="text">提现管理</view>
        </view>
        <image class="arrow" src="../../static/images/矩形1@2x.png"></image>
      </view>
    </view>
  </view>
</template>

<script>
import { appraise,newAppraise } from "../../api/gemmologist";
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
      qiniuUrl: config[NODE_ENV].qiniuUrl,
      all: 0,
      dhf: 0,
      djd: 0,
      jdz: 0
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
    goTo(index) {
      if (index) {
        uni.navigateTo({
          url: '/pages/means2/means2'
        });
      } else {
        uni.navigateTo({
          url: '/pages/means2/means2'
        });
      }
    },
    getData() {
      uni.showLoading();
      newAppraise().then(result => {
        const { data } = result.data;
        const { all,dhf,djd,jdz } = data;
        this.all = all;
        this.dhf = dhf;
        this.djd = djd;
        this.jdz = jdz;
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
    width: 690rpx;
    background-color: #ffffff;
    box-shadow: 0rpx 0rpx 20rpx 0rpx 
      rgba(0, 0, 0, 0.04);
    border-radius: 16rpx;
    margin: 20rpx auto;

    image {
      margin-right: 20rpx;
    }

    .box {
      width: 630rpx;
      margin: 0 auto;
      display: flex;
      align-content: center;
      justify-content: space-between;
      position: relative;
      padding: 32rpx 0;
    }

    .line {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
      height: 1rpx;
      background-color: #f8f8f8;
      box-shadow: 0rpx 0rpx 20rpx 0rpx 
        rgba(0, 0, 0, 0.04);
      border-radius: 1rpx;
    }

    .left {
      display: flex;

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

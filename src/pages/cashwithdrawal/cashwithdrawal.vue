<template>
  <view class="container">
    <view class="balance">
      <view class="mx">
        明细 >
      </view>
      <view class="title">可提现余额(元)</view>
      <view class="number">{{appr_money}}</view>
      <view class="bottom">
        <view class="left">
          <view class="dj-number">{{appr_blocked_money}}</view>
          <view class="text">冻结余额(元)</view>
        </view>
        <view class="right">
          每月28号进行解冻
        </view>
      </view>
    </view>
    <view class="balance-wallet">
      <view class="inner">
        <view class="title">提现到我的钱包</view>
        <view class="price">
          <text>￥</text><input placeholder="0.00" name="price" id="price" />
        </view>
        <view class="yue">
          <view>剩余金额￥{{appr_money - appr_blocked_money}}</view>
          <view>全部提现</view>
        </view>
      </view>
    </view>
    <view class="btn">
      确认提现
    </view>
  </view>
</template>

<script>
import {drawCashDetail} from '../../api/cashwithdrawal';

export default {
  name: "cashwithdrawal",
  data() {
    return {
      appr_blocked_money: "0.00",
      appr_money: "0.00"
    }
  },
  onLoad() {
    drawCashDetail().then(result => {
      const {appr_blocked_money, appr_money} = result.data;
      this.appr_blocked_money = appr_blocked_money;
      this.appr_money = appr_money;
      console.log(result);
    });
  }
};
</script>

<style lang="scss">
.balance {
  width: 690rpx;
  overflow: hidden;
  background-color: #ffffff;
  border-radius: 6rpx 6rpx 0rpx 0rpx;
  margin: 22rpx auto 22rpx;
  .mx {
    font-size: 24rpx;
    padding-top: 34rpx;
    padding-right: 26rpx;
    text-align: right;
  }
  .title {
    text-align: center;
    margin-top: 18rpx;
    margin-bottom: 36rpx;
  }
  .number {
    text-align: center;
    font-size: 60rpx;
    color: #5e95f4;
    padding-bottom: 75rpx;
    border-bottom: solid 1rpx #eef1f4;
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    height: 110rpx;
    .left,
    .right {
      text-align: center;
    }
    .left {
      flex: 0 0 260rpx;
      border-right: solid 1rpx #eef1f4;
    }
    .right {
      flex: 1;
      line-height: 110rpx;
      font-size: 26rpx;
      color: #858585;
    }
    .dj-number,
    .text {
      font-size: 26rpx;
    }
    .dj-number {
      margin-top: 18rpx;
      margin-bottom: 8rpx;
    }
  }
}
.balance-wallet {
  width: 690rpx;
  overflow: hidden;
  background-color: #ffffff;
  border-radius: 6rpx 6rpx 0rpx 0rpx;
  margin: 22rpx auto 22rpx;
  .inner {
    width: 630rpx;
    margin: 0 auto;
  }
  .title {
    height: 84rpx;
    line-height: 84rpx;
    border-bottom: solid 1rpx #eef1f4;
  }
  .price {
    height: 208rpx;
    display: flex;
    align-items: center;
    border-bottom: solid 1rpx #eef1f4;
    text {
      font-size: 30rpx;
      margin-top: 18rpx;
      margin-right: 18rpx;
    }
    input {
      font-size: 60rpx;
      color: #282828;
    }
  }
  .yue {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 84rpx;
    view {
      font-size: 26rpx;
      &:nth-of-type(1) {
        color: #858585;
      }
      &:nth-of-type(2) {
        color: #5e95f4;
      }
    }
  }
}
.btn {
  width: 690rpx;
  height: 74rpx;
  line-height: 74rpx;
  text-align: center;
  margin: 0 auto;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 68rpx;
  background-image: linear-gradient(
      -90deg,
      #5e95f4 0%,
      #3ba9f7 50%,
      #11c1fa 100%
    ),
    linear-gradient(#5e95f4, #5e95f4);
  background-blend-mode: normal, normal;
  border-radius: 6rpx;
  border: solid 1rpx rgba(1, 143, 231, 0.5);
  color: #ffffff;
}
</style>

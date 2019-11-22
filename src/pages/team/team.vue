<template>
    <view class="container">
        <view class="head">
            <view class="box">
                <image class="head-img" src="../../static/images/图层968@2x.png"></image>
                <view class="nickname">昵称昵称昵称</view>
                <view class="introduce">
                    <text class="text">个人介绍：</text>
                    <text class="text2">个人介绍个人介绍</text>
                </view>
                <view class="requirement">
                    <text class="text">鉴定要求：</text> <text class="text2">要求内容要求内容要求内容</text>
                </view>
                <view class="range">
                    <view class="text">鉴定范围：</view>
                    <view class="imgs">
                        <image class="img" src="../../static/images/图层968@2x.png"></image>
                    </view>
                </view>
            </view>
        </view>
        <view class="lists">
            <view class="list" v-for="(item, index) in appraisers" :key="index">
                <view class="top">
                    <image class="img" :src="item.avatar"></image>
                    <view class="ifno">
                        <view class="nickname">{{item.name}}</view>
                        <view class="level">
                            <image class="level-img" src="../../static/images/矢量智能对象@2x.png"></image>
                            <view class="level-name">{{item.level_name}}</view>
                        </view>
                    </view>
                </view>
                <view class="introduce">
                    <text>个人介绍：</text> <text></text>
                </view>
                <view class="requirement">
                    <text class="text">鉴定要求：</text> <text class="text2">要求内容要求内容要求内容</text>
                </view>
                <view class="range">
                    <view class="text">鉴定范围：</view>
                    <view class="imgs">
                        <image class="img" src="../../static/images/图层968@2x.png"></image>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import {appraiserList} from '../../api/team';

export default {
    data() {
        return {
            appraisers: []
        }
    },
    onLoad(options) {
        uni.showLoading();
        const {brand_id} = options;
        appraiserList({brand_id}).then(result => {
            result.data.cover_image = this.imgUrl + result.data.cover_image;
            const {cover_image, info} = result.data;
            this.cover_image = cover_image;
            this.info = info;
            const arr = [];
            const keys = Object.keys(result.data);
            keys.forEach(key => {
                if (/[0-9]/ig.test(key)) {
                    let avatar = '';
                    if (/avatar_/ig.test(result.data[key].avatar)) {
                        avatar = 'https://stg.tosneaker.com/' + result.data[key].avatar;
                    } else {
                        avatar = this.imgUrl + result.data[key].avatar;
                    }
                    arr.push({
                        appr_ask: result.data[key].appr_ask,
                        level_name: result.data[key].level_name,
                        name: result.data[key].name,
                        bio: result.data[key].bio,
                        avatar: avatar,
                        apprs: result.data[key].data,
                        id: result.data[key].user_id
                    });
                }
            });
            arr.forEach((item, index) => {
                item.checked = false;
                item.index = index;
            });
            this.appraisers = arr;
            uni.hideLoading();
        });
    }
}
</script>

<style lang="scss">
    .head {
        margin-top: 50rpx;
    }

    .box {
        position: relative;
        background-image: url('../../static/images/椭圆1拷贝4@2x.png');
        background-size: cover;
        width: 706rpx;
        height: 440rpx;
        margin: 0 auto;
    }

    .head-img {
        width: 90rpx;
        height: 90rpx;
        position: absolute;
        top: -16rpx;
        left: 0;
        right: 0;
        margin: auto;
    }
    .img {
        width: 90rpx;
        height: 90rpx;
    }
    .nickname {
        font-size: 26rpx;
        color: #000;
        text-align: center;
    }
    .box {
        .introduce {
            margin-top: 40rpx;
        }
        .nickname {  
            padding-top: 84rpx;
        }
        .introduce,.requirement,.range {
            margin-left: 60rpx;
        }
    }

    .introduce,.requirement,.range {
        margin-bottom: 20rpx;

        .text,.text2 {
            color: #000;
        }
        .text {
            font-size: 30rpx;
        }
        .text2 {
            font-size: 28rpx;
        }
    }
    .introduce{
        margin-top: 36rpx;
    }

    .level-img {
        width: 26rpx;
        height: 26rpx;
    }
    .imgs {
        margin-top: 20rpx;

        .img {
            width: 60rpx;
            height: 60rpx;
            border-radius: 60rpx;
            background-color: #52535d;
            box-shadow: 0rpx 0rpx 8rpx 0rpx 
                rgba(0, 0, 0, 0.1);
        }
    }

    .lists {
        .list {
            width: 678rpx;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0rpx 0rpx 20rpx 0rpx 
                rgba(0, 0, 0, 0.04);
            border-radius: 16rpx;
            padding: 30rpx;
            margin-top: 22rpx;
        }
    }
    .top,.level {
        display: flex;
        align-items: center;
    }
    .top {
        .img {
            margin-right: 16rpx;
        }
    }
    .level {
        margin-top: 5rpx;
    }
    .level-img {
        margin-right: 5rpx;
    }
    .level-name {
        color: #898989;
        font-size: 24rpx;
    }
</style>
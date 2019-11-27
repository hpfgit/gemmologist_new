<template>
    <view class="container">
        <view class="head">
            <view class="box">
                <image class="bg-img" src="../../static/images/组14@2x.png"></image>
                <image
                    class="head-img"
                    :src="banzhu.avatar"
                ></image>
                <view class="nickname">{{banzhu.name}}</view>
                <view class="level-info">
                    <view class="cir"></view>
                    <text>{{banzhu.level_name}}</text>
                </view>
                <view class="introduce">
                    <text class="text">个人介绍：</text>
                    <text class="text2">{{banzhu.bio}}</text>
                </view>
                <view class="requirement">
                    <text class="text">鉴定要求：</text>
                    <text class="text2">{{banzhu.appr_ask ? banzhu.appr_ask : '无'}}</text>
                </view>
                <view class="range">
                    <view class="text">鉴定范围：</view>
                    <view class="imgs">
                        <scroll-view scroll-x="true">
                            <image
                                class="img"
                                v-for="(item, index) in banzhu.data"
                                :key="index"
                                :src="path(item.cover_image)"
                            ></image>
                        </scroll-view>
                    </view>
                </view>
            </view>
        </view>
        <view class="lists">
            <view
                class="list"
                :class="'level-' + item.level"
                v-for="(item, index) in appraisers"
                :key="index"
            >
                <image v-show="item.level === 3" class="bg-img" src="../../static/images/组142@2x.png"></image>
                <image v-show="item.level === 2" class="bg-img" src="../../static/images/组143@2x.png"></image>
                <image
                    class="head-img"
                    :src="item.avatar"
                ></image>
                <view class="nickname">{{item.name}}</view>
                <view class="level-info">
                    <image class="cir" src="../../static/images/矢量智能对象@2x.png"></image>
                    <text>{{item.level_name}}</text>
                </view>
                <view class="introduce">
                    <text>个人介绍：</text> <text>{{item.bio}}</text>
                </view>
                <view class="requirement">
                    <text class="text">鉴定要求：</text>
                    <text class="text2">{{item.appr_ask ? item.appr_ask : '无'}}</text>
                </view>
                <view class="range">
                    <view class="text">鉴定范围：</view>
                    <view class="imgs">
                        <scroll-view scroll-x="true">
                            <image
                                class="img"
                                v-for="(ite, index) in item.imgs"
                                :key="index"
                                :src="path(ite.cover_image)"
                            ></image>
                        </scroll-view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import { appraiserList } from "../../api/team";
import config from '../../config/index';
const NODE_ENV = process.env.NODE_ENV;

export default {
    data() {
        return {
            appraisers: [],
            banzhu: {},
            imgUrl: config[NODE_ENV].imgUrl
        };
    },
    onLoad(options) {
        uni.showLoading();
        let { brand_id } = options;
        let obj = {};
        if (brand_id) {
            obj.brand_id = brand_id;
        }
        appraiserList(obj).then(result => {
            result.data.cover_image = this.imgUrl + result.data.cover_image;
            const { cover_image, info } = result.data;
            this.cover_image = cover_image;
            this.info = info;
            const arr = [];
            const keys = Object.keys(result.data);
            result.data.banzhu.avatar = "https://stg.tosneaker.com" + result.data.banzhu.avatar;
            this.banzhu = result.data.banzhu;
            keys.forEach(key => {
                if (/[0-9]/gi.test(key)) {
                    let avatar = "";
                    if (/avatar_/gi.test(result.data[key].avatar)) {
                        avatar =
                            "https://stg.tosneaker.com/" +
                            result.data[key].avatar;
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
                        id: result.data[key].user_id,
                        level: result.data[key].level,
                        imgs: result.data[key].data
                    });
                }
                uni.hideLoading();
            });
            arr.forEach((item, index) => {
                item.checked = false;
                item.index = index;
            });
            this.appraisers = arr;
        });
    },
    methods: {
        path(path) {
            console.log(path);
            return config[NODE_ENV].imgUrl + path;
        }
    }
};
</script>

<style lang="scss">
.head {
    margin-top: 50rpx;
    margin-bottom: 62rpx;
}

.box {
    position: relative;
    border-radius: 16rpx;
    width: 690rpx;
    margin: 0 auto;
}

.bg-img {
    width: 690rpx;
    height: 453rpx;
    position: absolute;
    left: 0;
    top: 0;
}

.head-img {
    width: 90rpx;
    height: 90rpx;
    border-radius: 90rpx;
    position: absolute;
    top: -42rpx;
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
    color: #ffffff;
    text-align: center;
    padding-top: 68rpx;
}
.level-info {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 12rpx;

    .cir {
        width: 26rpx;
        height: 26rpx;
        border-radius: 26rpx;
        background-color: #b3925f;
        margin-right: 8rpx;
    }
    text {
        color: #ebeaea;
        font-size: 24rpx;
    }
}
.box {
    .introduce {
        margin-top: 40rpx;
    }
    .introduce,
    .requirement,
    .range {
        text,
        view {
            color: #ffffff;
        }
    }
}

.nickname,.introduce,.requirement,.range,.level-info {
    position: relative;
    z-index: 2;
}

.introduce,
.requirement,
.range {
    margin-bottom: 20rpx;
    margin-left: 38rpx;
    margin-right: 38rpx;

    .text,
    .text2 {
        color: #000;
    }
    .text {
        font-size: 30rpx;
    }
    .text2 {
        font-size: 28rpx;
    }
}
.introduce {
    margin-top: 36rpx;
}

.level-img {
    width: 26rpx;
    height: 26rpx;
}
.imgs {
    margin-top: 20rpx;
    padding-bottom: 36rpx;
    white-space: nowrap;

    .img {
        width: 60rpx;
        height: 60rpx;
        border-radius: 60rpx;
        background-color: #52535d;
        box-shadow: 0rpx 0rpx 8rpx 0rpx rgba(0, 0, 0, 0.1);
        margin-right: 16rpx;
    }
}

.lists {
    .list {
        width: 690rpx;
        margin: 0 auto;
        margin-bottom: 62rpx;
        background-color: #ffffff;
        background-size: cover;
        box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(0, 0, 0, 0.04);
        border-radius: 16rpx;
        margin-top: 22rpx;
        position: relative;

        text,view {
            color: #252320;
        }

        &.level-2 {
            background-image: url("../../static/images/组142@2x.png");
        }

        &.level-3 {
            background-image: url("../../static/images/组143@2x.png");
        }
    }
}
.top,
.level {
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

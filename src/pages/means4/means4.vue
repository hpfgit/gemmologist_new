<template>
    <view class="container">
        <view class="lists" v-if="lists.length">
            <view
                class="item"
                v-for="(item, index) in lists"
                :key="index"
                @tap="gotoDetails(item.id)"
            >
                <image
                    v-if="item.is_specialty"
                    class="specialty-img"
                    src="../../static/images/费用信息@2x.png"
                    @tap="priceDetails(index)"
                ></image>
                <image
                    v-show="item.final_result === 0"
                    class="yinz"
                    src="../../static/images/为假@2x.png"
                ></image>
                <image
                    v-show="item.final_result === 1"
                    class="yinz"
                    src="../../static/images/为真拷贝2@2x.png"
                ></image>
                <image
                    v-show="item.final_result === 2"
                    class="yinz"
                    src="../../static/images/无法鉴定拷贝@2x.png"
                ></image>
                <image
                    class="left-image"
                    :src="getPath(item.cover_image)"
                ></image>
                <view
                    class="item-right"
                    @tap="gotoDetails(item.id)"
                >
                    <view class="top">
                        <text>{{ item.brand_name }}</text>
                    </view>
                    <view class="center">
                        <view class="jds"
                            >鉴定师
                            <text
                                v-for="(ite, index) in item.user_name"
                                :key="index"
                                >{{ ite }}</text
                            ></view
                        >
                        <view
                            class="date"
                            :class="{
                                hide:
                                    item.final_result === 10 ||
                                    item.final_result === 12
                            }"
                            >{{ item.publish_at }}</view
                        >
                        <view
                            class="date"
                            :class="{
                                block:
                                    item.final_result === 10 ||
                                    item.final_result === 12,
                                hide:
                                    item.final_result !== 10 ||
                                    item.final_result !== 12
                            }"
                            >{{ item.status }}</view
                        >
                    </view>
                </view>
            </view>
        </view>
        <view class="no-data" v-if="!lists.length">
            <view>
                <image :src="qiniuUrl + '/暂无鉴定贴@2x.png'"></image>
            </view>
            <view>
                <image :src="qiniuUrl + '/暂时没有鉴定贴~@2x.png'"></image>
            </view>
        </view>
    </view>
</template>

<script>
import { work_order, all, newAppraiseDetails } from "../../api/means2";
const NODE_ENV = process.env.NODE_ENV;
import config from "../../config";

export default {
    data() {
        return {
            lists: [],
            imgPath: config[NODE_ENV].imgUrl,
            qiniuUrl: config[NODE_ENV].qiniuUrl,
            type: "",
            mold: ""
        };
    },
    onLoad(options) {
        uni.showLoading();
        const { type } = options;
        newAppraiseDetails({
            page: 1,
            type
        }).then(result => {
            const { data } = result.data;
            this.lists = data;
            uni.hideLoading();
        });
    },
    methods: {
        getPath(path) {
            if (/avatar_/gi.test(path)) {
                return "https://stg.tosneaker.com/" + path;
            } else {
                return config[NODE_ENV].imgUrl + path;
            }
        },
        gotoDetails(id) {
            uni.navigateTo({
                url:
                    "../Identificationdetails2/Identificationdetails2?id=" +
                    id +
                    "&type=" +
                    this.type +
                    "&mold=" +
                    this.mold +
                    "&isJD=true"
            });
        }
    }
};
</script>

<style lang="scss">
.hide {
    display: none;
}

.block {
    display: block;
}
.lists {
    padding-top: 24rpx;
    padding-bottom: 24rpx;

    .item {
        display: flex;
        width: 690rpx;
        height: 180rpx;
        border-radius: 20rpx;
        background-color: #ffffff;
        margin: 0 auto 20rpx;
        padding: 20rpx 16rpx;
        position: relative;

        .yinz {
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            width: 193rpx;
            height: 137rpx;
        }
    }

    .specialty-img {
        width: 44rpx;
        height: 74rpx;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        z-index: 997;
        margin: auto;
    }

    .left-image {
        width: 144rpx;
        height: 144rpx;
        border-radius: 4rpx;
    }

    .item-right {
        margin-left: 24rpx;
        flex: 1;

        .top {
            display: flex;
            justify-content: space-between;
            margin-top: 22rpx;

            text {
                color: #000;
            }

            .date {
                color: #858585;
            }

            image {
                width: 22rpx;
                height: 22rpx;
                vertical-align: top;
                margin-top: 9rpx;
                margin-right: 10rpx;
            }
        }

        .center {
            margin-top: 6rpx;

            view,
            text {
                font-size: 22rpx;
                color: #898989;
            }

            text {
                margin-left: 6rpx;
            }

            .date {
                margin-top: 6rpx;
            }
        }

        .bottom {
            margin-top: 14rpx;

            text,
            view {
                font-size: 22rpx;
                color: #282828;
            }

            .zy {
                color: #5e95f4;
            }
        }
    }
}
.no-data {
    overflow: hidden;
    view {
        text-align: center;
        &:nth-of-type(1) {
            margin-top: 200rpx;
            image {
                width: 300rpx;
                height: 298rpx;
            }
        }
        &:nth-of-type(2) {
            image {
                width: 192rpx;
                height: 34rpx;
            }
        }
    }
}
</style>

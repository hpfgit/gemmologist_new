<template>
    <view class="container">
        <view class="lists">
            <view
                class="item"
                v-for="(item, index) in lists"
                :key="index"
                @tap="gotoDetails(item.id)"
            >
                <image
                    class="left-image"
                    :src="getPath(item.cover_image)"
                ></image>
                <view class="item-right">
                    <view class="top">
                        <text>{{ item.brand_name }}</text>
                        <view class="time">
                            <image :src="qiniuUrl + '间(3)@2x.png'"></image>
                            <text>{{ item.publish_at }}</text>
                        </view>
                    </view>
                    <view class="center">
                        <view class="info">{{ item.appr_sn }}</view>
                        <view class="status true" v-if="item.final_result === 1"
                            ><text>鉴定为真</text></view
                        >
                        <view class="status true" v-if="item.final_result === 0"
                            ><text>鉴定为假</text></view
                        >
                    </view>
                </view>
            </view>
        </view>
        <nodata v-if="!lists.length" />
    </view>
</template>

<script>
import { errorRate } from "../../api/examination";
const NODE_ENV = process.env.NODE_ENV;
import config from "../../config";
import nodata from '../../component/nodata/nodata.vue';

export default {
    data() {
        return {
            lists: [],
            imgPath: config[NODE_ENV].imgUrl,
            qiniuUrl: config[NODE_ENV].qiniuUrl
        };
    },
    onLoad() {
        errorRate({
            page: 1
        }).then(result => {
            const { data } = result.data;
            this.lists = data;
            console.log(result, this.lists);
        });
    },
    methods: {
        getPath(path) {
            return this.imgPath + path;
        },
        gotoDetails(id) {
            uni.navigateTo({
                url:
                    "../Identificationdetails2/Identificationdetails2?id=" +
                    id +
                    "&isJD=false"
            });
        }
    },
    components: {
        nodata
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

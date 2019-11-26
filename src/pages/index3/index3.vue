<template>
    <scroll-view>
        <view class="container">
            <view class="navs">
                <view class="nav">
                    <image src="../../static/images/考核@2x.png"></image>
                    <view class="text">鉴定师考核模式</view>
                </view>
                <view class="nav">
                    <image src="../../static/images/极速@2x.png"></image>
                    <view class="text">鉴定师考核模式</view>
                </view>
                <view class="nav">
                    <image src="../../static/images/￥@2x.png"></image>
                    <view class="text">鉴定师考核模式</view>
                </view>
            </view>
            <view class="infos">
                <view class="left">
                    <image src="../../static/images/鉴定2@2x.png"></image>
                    <view class="user-info">
                        <view class="username">BAN鉴定服务</view>
                        <view class="userinfo">只为提供最公正的鉴定结果</view>
                    </view>
                </view>
                <view class="right">
                    <div class="text">鉴定团队</div>
                    <image src="../../static/images/矩形1187拷贝@2x.png"></image>
                </view>
            </view>
            <view class="box">
                <view class="data-display">
                    <view class="data-display-two" @tap="goToQuestion">
                        <view>鉴定流程及常见问题</view>
                        <image
                            class="icon"
                            src="../../static/images/-@2x.png"
                        ></image>
                    </view>
                    <view @tap="goToRZ">
                        <view class="data-display-one">
                            <text class="text">
                                已鉴定
                                <text class="number">{{ count }}</text>
                                次
                            </text>
                        </view>
                        <view class="data-display-one">
                            <text class="text">
                                假货市场占有率
                                <text class="number">{{ fail }}</text>
                                %
                            </text>
                        </view>
                    </view>
                </view>
                <view class="zm">
                    <view class="gn">
                        <view class="js" @tap="goTo(1)">
                            极速鉴定
                        </view>
                        <view class="bj" @tap="goTo(2)">
                            保价鉴定
                        </view>
                    </view>
                    <view class="search">
                        <input
                            type="text"
                            :value="jdID"
                            placeholder="请输入您的六位鉴定ID"
                            @change="changeId($event)"
                        />
                        <view @tap="searchTo" class="search-btn">
                            查询鉴定
                        </view>
                    </view>
                </view>
            </view>
            <view class="selector-end">
                <view class="left" @tap="goToData(0)">
                    <image src="../../static/images/鉴定师端拷贝@2x.png"></image>
                </view>
                <view class="right" @tap="goToData(1)">
                    <image src="../../static/images/版主端拷贝@2x.png"></image>
                </view>
            </view>
            <view class="login">
                登录查看我的鉴定
            </view>
            <view class="check-type" v-show="isShow">
                <view class="title">选择鉴定品类</view>
                <image
                    src="../../static/images/圆角矩形607拷贝@2x.png"
                    class="close-img"
                    @tap="close"
                ></image>
                <view class="classList">
                    <view class="list" @tap="goToPath(0)">
                        <image
                            class="shoes-img"
                            src="../../static/images/球鞋@2x.png"
                        ></image>
                        <view class="text">球鞋</view>
                    </view>
                    <view class="list" @tap="goToPath(1)">
                        <image
                            class="clothing-img"
                            src="../../static/images/服饰@2x.png"
                        ></image>
                        <view class="text">服饰</view>
                    </view>
                </view>
            </view>
            <view class="lists" v-if="lists.length">
                <view class="item" v-for="(item, index) in lists" :key="index">
                    <image
                        v-if="item.is_specialty"
                        class="specialty-img"
                        src="../../static/images/费用信息@2x.png"
                        @tap="priceDetails(index)"
                    ></image>
                    <image
                        class="left-image"
                        :src="getPath(item.cover_image)"
                        @tap="goToDetail(item.is_specialty, item.id)"
                    ></image>
                    <view
                        class="item-right"
                        @tap="goToDetail(item.is_specialty, item.id)"
                    >
                        <view class="top">
                            <text>{{ item.brand_name }}</text>
                            <view>
                                <image :src="qiniuUrl + '/时间(3)@2x.png'"></image>
                                <text class="date">{{ item.publish_at }}</text>
                            </view>
                        </view>
                        <view class="center">
                            <view>{{ item.appr_sn }}</view>
                            <view>{{ item.status }}</view>
                        </view>
                        <view class="bottom">
                            <view v-if="item.post_status === 13">
                                免费鉴定结果仅供参考, 如有疑问请进行
                                <text class="zy" @tap="goTo(1)">专业鉴定</text>
                            </view>
                            <view v-if="item.post_status !== 13">
                                {{ item.hint }}
                            </view>
                        </view>
                    </view>
                </view>
                <!-- 费用详情 -->
                <view class="price-detail" v-show="isCost">
                    <view class="title">费用详情</view>
                    <view class="price-box">
                        <image
                            class="close-img"
                            @tap="closeDetails"
                            src="../../static/images/price/关闭@2x.png"
                        ></image>
                        <view class="price">
                            <image
                                src="../../static/images/price/01@2x.png"
                            ></image>
                            <view class="img-number-container">
                                <view class="number">{{
                                    details.appraisal_cost
                                }}</view>
                                <view class="yuan">元</view>
                            </view>
                        </view>
                        <view class="total">
                            <image
                                src="../../static/images/price/02@2x.png"
                            ></image>
                            <view class="img-number-container">
                                <view class="number">{{ details.total }}</view>
                                <view class="yuan">元</view>
                            </view>
                        </view>
                        <view class="price">
                            <image
                                src="../../static/images/price/03@2x.png"
                            ></image>
                            <view class="img-number-container">
                                <view class="number">{{ details.appr_cost }}</view>
                                <view class="yuan">元</view>
                            </view>
                        </view>
                    </view>
                    <view class="tip"
                        >*无法鉴定情况下费用会退还至账户余额，可随时提现。</view
                    >
                </view>
            </view>
            <view class="mask" v-show="isShow"></view>
        </view>
    </scroll-view>
</template>

<script>
import { getCount, getPost, isAppraiser } from "../../api";
import config from "../../config/index";
const NODE_ENV = process.env.NODE_ENV;

export default {
    data() {
        return {
            count: "",
            fail: "",
            lists: [],
            imgUrl: config[NODE_ENV].imgUrl,
            qiniuUrl: config[NODE_ENV].qiniuUrl,
            isAppraiser: "",
            isShow: false,
            isCost: false,
            details: {},
            is_specialty: ''
        };
    },
    onLoad() {
        if (!uni.getStorageSync("token")) {
            uni.redirectTo({
                url: "/pages/index/index"
            });
            return;
        }
        uni.showLoading();
        getCount().then(result => {
            const { count, fail } = result.data;
            this.count = count;
            this.fail = fail.substring(0, fail.length - 1);
        });

        isAppraiser().then(result => {
            const { is_appraiser } = result.data;
            this.isAppraiser = is_appraiser;
        });

        getPost({
            page: 1,
            limit: 12
        }).then(result => {
            const { data } = result.data;
            data.forEach(item => {
                item.total = item.appr_cost + item.appraisal_cost;
                item.isShow = false;
                // item.total = (item.total).toString().split('');
                //   const appr_cost_arr = (item.appr_cost).toString().split('');
                //   const appraisal_cost_arr = (item.appraisal_cost).toString().split('');
                //   item.appr_cost = appr_cost_arr;
                //   item.appraisal_cost = appraisal_cost_arr;
                //   const arr = [];
                //   item.appr_cost.forEach(ite => {
                //     const obj = {
                //       number: ite
                //     };
                //     arr.push(obj);
                //   });
                //   item.appr_cost = arr;
                //   const arr2 = [];
                //   item.appraisal_cost.forEach(itm => {
                //     const obj = {
                //       number: itm
                //     };
                //     arr2.push(obj);
                //   });
                //   item.appraisal_cost = arr2;
                //   const arr3 = [];
                //   item.total.forEach(iem => {
                //     const obj = {
                //       number: iem
                //     };
                //     arr3.push(obj);
                //   });
                // item.total = arr3;
            });
            this.lists = data;
            uni.hideLoading();
        });
    },
    methods: {
        goToData(index) {
            if (index) {
                uni.navigateTo({
                    url: '/pages/gemmologist/gemmologist'
                });
            } else {
                uni.navigateTo({
                    url: '/pages/gemmologist2/gemmologist2'
                });
            }
        },
        priceDetails(index) {
            this.isCost = !this.isCost;
            this.details = this.lists[index];
        },
        closeDetails() {
            this.isCost = !this.isCost;
        },
        goToQuestion() {
            uni.navigateTo({
                url: "/pages/questions/questions"
            });
        },
        goToRZ() {
            // uni.navigateTo({
            //   url: '/pages/identificationarea/identificationarea'
            // });
        },
        getPath(path) {
            return this.imgUrl + path;
        },
        changeId(e) {
            this.jdID = e.target.value;
        },
        searchTo() {
            if (!this.jdID) {
                uni.showToast({
                    title: "请输入六位鉴定id",
                    icon: "none"
                });
                return;
            }
            uni.navigateTo({
                url:
                    "/pages/Identificationdetails/Identificationdetails?id=" +
                    this.jdID
            });
        },
        goTo(index) {
            this.isShow = true;
            this.is_specialty = index;
        },
        goToPath(index) {
            if (index) {
                uni.navigateTo({
                    url: '/pages/equipmentappraisal2/equipmentappraisal2?is_specialty='+this.is_specialty+'&type=clothing'
                });
            } else {
                uni.navigateTo({
                    url: '/pages/equipmentappraisal2/equipmentappraisal2?is_specialty='+this.is_specialty+'&type=shoes'
                });
            }
        },
        close() {
            this.isShow = false;
        },
        goToDetail(index, id) {
            uni.navigateTo({
                url:
                    "/pages/Identificationdetails/Identificationdetails?id=" +
                    id +
                    "&type=" +
                    index
            });
        }
    }
};
</script>

<style lang="scss">
.container {
    background-color: #ffffff;
}

.mask {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 998;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.navs {
    display: flex;
    justify-content: space-between;
    text-align: center;
    width: 620rpx;
    margin: 48rpx auto 58rpx;

    .nav {
        .text {
            font-size: 24rpx;
            color: #0b0e1b;
        }

        image {
            width: 50rpx;
            height: 56rpx;
            margin-bottom: 24rpx;
        }
    }
}

.infos {
    display: flex;
    justify-content: space-between;
    width: 690rpx;
    margin: 0 auto;
    padding: 30rpx;
    background-color: #f4f3f9;
    border-radius: 16rpx;
    align-items: center;

    .username {
        font-size: 32rpx;
    }

    .userinfo {
        font-size: 22rpx;
        color: #898989;
    }

    .left {
        image {
            width: 90rpx;
            height: 90rpx;
            margin-right: 18rpx;
        }
    }
    .left,
    .right {
        display: flex;
        align-items: center;
    }
    .right {
        .text {
            background-image: url("../../static/images/圆角矩形7@2x.png");
            background-size: cover;
            width: 124rpx;
            height: 37rpx;
            line-height: 37rpx;
            font-size: 24rpx;
            color: #ffffff;
            text-align: center;
        }
        image {
            width: 6rpx;
            height: 9rpx;
        }
    }
}

.box {
    position: relative;
    width: 690rpx;
    margin: 28rpx auto 0;
    box-shadow: 0rpx 1rpx 30rpx 0rpx rgba(66, 71, 90, 0.2);
    border-radius: 16rpx;
    overflow: hidden;
}

.bg {
    image {
        width: 750rpx;
        height: 700rpx;
    }
}

.data-display {
    overflow: hidden;
    .data-bg {
        width: 726rpx;
        height: 264rpx;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 0;
    }

    .data-display-one {
        position: relative;
        margin-left: 36rpx;
        margin-top: 14rpx;

        .text {
            color: #1f1d29;
            font-size: 28rpx;
            font-weight: bold;
        }

        .number {
            font-size: 48rpx;
            color: #1f1d29;
            margin-right: 6rpx;
            margin-left: 4rpx;
        }
    }

    .data-display-two {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        position: relative;
        z-index: 1;
        font-size: 24rpx;
        color: #5e95f4;
        margin-top: 28rpx;
        text-align: right;

        image {
            width: 42rpx;
            height: 26rpx;
            margin-left: 6rpx;
        }
    }
}

.zm {
    .gn {
        margin-top: 36rpx;
        padding-left: 36rpx;
        padding-right: 36rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .js,
        .bj {
            width: 292rpx;
            height: 104rpx;
            line-height: 110rpx;
            padding-left: 28rpx;
            background-size: contain;
            border-radius: 8rpx;
        }

        .js {
            color: #ffffff;
            background-image: url("../../static/images/组1拷贝@2x.png");
        }

        .bj {
            width: 294rpx;
            height: 102rpx;
            color: #242528;
            background-image: url("../../static/images/组9拷贝@2x.png");
        }
    }

    .search {
        display: flex;
        padding-left: 36rpx;
        padding-right: 36rpx;
        margin-top: 20rpx;
        margin-bottom: 50rpx;

        input {
            width: 610rpx;
            height: 90rpx;
            line-height: 90rpx;
            padding-left: 15rpx;
            background-color: #f4f3f9;
            border-radius: 8rpx;
        }

        .search-btn {
            width: 186rpx;
            height: 90rpx;
            line-height: 90rpx;
            text-align: center;
            background-color: #160b1b;
            border-radius: 8rpx;
            color: #ffffff;
        }
    }

    .jds {
        image {
            width: 348rpx;
            height: 97rpx;
        }
    }
}

.selector-end {
    width: 610rpx;
    margin: 46rpx auto 0;
    display: flex;
    justify-content: space-between;

    .left,
    .right {
        text-align: center;
    }

    image {
        width: 294rpx;
        height: 86rpx;
    }
}

.login {
    width: 340rpx;
    height: 88rpx;
    margin: 88rpx auto 0;
    line-height: 88rpx;
    background-color: #0b0e1b;
    color: #ffffff;
    opacity: 0.7;
    border-radius: 8rpx;
    text-align: center;
}

.check-type {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 999;
    width: 750rpx;
    background-color: #ffffff;
    border-radius: 40rpx 40rpx 0rpx 0rpx;
    overflow: hidden;

    .title {
        text-align: center;
        margin-top: 56rpx;
        margin-bottom: 94rpx;
    }

    .classList {
        display: flex;
        justify-content: space-between;
        padding-left: 36rpx;
        padding-right: 36rpx;
    }

    .list {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 314rpx;
        height: 160rpx;
        border: solid 2rpx #ededed;
        margin-bottom: 70rpx;

        image {
            margin-right: 36rpx;
        }
    }

    .close-img {
        width: 24rpx;
        height: 23rpx;
        position: absolute;
        top: 60rpx;
        right: 50rpx;
    }

    .shoes-img {
        width: 97rpx;
        height: 50rpx;
    }

    .clothing-img {
        width: 63rpx;
        height: 74rpx;
    }
}

.lists {
    // display: none;
    margin-top: 80rpx;
    padding-bottom: 24rpx;

    .item {
        display: flex;
        width: 690rpx;
        height: 180rpx;
        border-radius: 20rpx;
        background-color: #ffffff;
        margin: 0 auto 20rpx;
        padding: 24rpx;
        position: relative;
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
        width: 132rpx;
        height: 132rpx;
        border-radius: 10rpx;
    }

    .item-right {
        margin-left: 24rpx;
        flex: 1;

        .top {
            display: flex;
            justify-content: space-between;

            text {
                font-size: 24rpx;
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
            display: flex;
            justify-content: space-between;

            view {
                font-size: 22rpx;
                background-color: #e6dcb5;
                border-radius: 5rpx;

                &:nth-of-type(1) {
                    width: 102rpx;
                    height: 30rpx;
                    line-height: 30rpx;
                    text-align: center;
                    background-image: url("../../static/images/index/组10@2x.png");
                    background-size: cover;
                }

                &:nth-of-type(2) {
                    width: 100rpx;
                    height: 32rpx;
                    line-height: 32rpx;
                    text-align: center;
                    color: #ffffff;
                    background-image: linear-gradient(
                            135deg,
                            rgba(28, 211, 249, 0.5) 0%,
                            rgba(61, 180, 247, 0.5) 39%,
                            rgba(94, 149, 244, 0.5) 100%
                        ),
                        linear-gradient(#5e95f4, #5e95f4);
                    background-blend-mode: normal, normal;
                    border-radius: 14rpx 14rpx 14rpx 0rpx;
                    border: solid 2rpx #50b8f7;
                }
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

.price-detail {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 650rpx;
    height: 510rpx;
    background-color: #ffffff;
    border-radius: 12rpx;
    z-index: 999;
    margin: auto;
    overflow: hidden;

    .close-img {
        position: absolute;
        right: 0;
        top: 0;
        width: 70rpx;
        height: 70rpx;
        z-index: 1000;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 70rpx;
    }

    .title {
        position: absolute;
        top: 30rpx;
        width: 100%;
        text-align: center;
    }

    .price-box {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        display: flex;

        .total {
            margin-top: 40rpx;
            image {
                width: 206rpx;
                height: 386rpx;
            }

            .img-number-container {
                position: absolute;
                top: 198rpx;
                display: flex;
                justify-content: center;
                width: 100%;
            }

            .number {
                font-size: 60rpx;
            }

            .yuan {
                font-size: 24rpx;
                padding-top: 36rpx;
                margin-left: 10rpx;
            }

            .yuan,
            .number {
                color: #ffffff;
            }
        }

        .price,
        .total {
            position: relative;

            .img-0,
            .img-2,
            .img-4,
            .img-8 {
                width: 34rpx;
                height: 40rpx;
            }
            .img-1 {
                width: 24rpx;
                height: 40rpx;
            }
            .img-3 {
                width: 41rpx;
                height: 40rpx;
            }
            .img-5 {
                width: 35rpx;
                height: 40rpx;
            }
            .img-6 {
                width: 32rpx;
                height: 40rpx;
            }
            .img-7 {
                width: 30rpx;
                height: 40rpx;
            }
            .img-9 {
                width: 30rpx;
                height: 40rpx;
            }
        }

        .price {
            margin-top: 108rpx;
            image {
                width: 206rpx;
                height: 238rpx;
            }

            .img-number-container {
                position: absolute;
                top: 128rpx;
                display: flex;
                justify-content: center;
                width: 100%;
            }

            .number {
                font-size: 60rpx;
            }

            .yuan {
                font-size: 24rpx;
                padding-top: 36rpx;
                margin-left: 10rpx;
            }

            .yuan,
            .number {
                color: #30c8ff;
            }
        }
    }
    .tip {
        position: absolute;
        bottom: 40rpx;
        left: 0;
        right: 0;
        width: 100%;
        text-align: center;
        font-size: 22rpx;
        color: #4d4d4d;
    }
}
</style>

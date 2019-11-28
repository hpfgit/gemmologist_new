<template>
    <scroll-view>
        <view class="container">
            <image class="con-bg-img" src="../../static/images/用户端首页渐变背景@2x.png"></image>
            <view class="navs">
                <view class="nav" @tap="goNav(0)">
                    <image src="../../static/images/考核@2x.png"></image>
                    <view class="text">鉴定师考核模式</view>
                </view>
                <view class="nav" @tap="goNav(1)">
                    <image src="../../static/images/极速@2x.png"></image>
                    <view class="text">极速鉴定声明</view>
                </view>
                <view class="nav" @tap="goNav(2)">
                    <image src="../../static/images/￥@2x.png"></image>
                    <view class="text">保价鉴定声明</view>
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
                <view class="right" @tap="goTeam">
                    <div class="text">鉴定团队</div>
                    <image src="../../static/images/向右@2x.png"></image>
                </view>
            </view>
            <view class="box">
                <image class="bg-img" src="../../static/images/有投影bg@2x.png"></image>
                <view class="inner">
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
            </view>
            <view class="search-mask" v-show="is_bar_mask">
                <view class="title">提示</view>
                <image class="close-img" @tap="closeBarMask" src="../../static/images/圆角矩形607拷贝@2x.png"></image>
                <view class="cont">鉴定贴不存在，请检查鉴定ID是否正确</view>
                <view class="btn-yes" @tap="closeBarMask">确定</view>
            </view>
            <view class="selector-end" v-show="isLogin">
                <view class="left" @tap="goToData(0)" v-show="isAppraiser">
                    <image src="../../static/images/鉴定师端拷贝@2x.png"></image>
                </view>
                <view class="right" @tap="goToData(1)" v-show="is_appraisal_admin">
                    <image src="../../static/images/版主端拷贝@2x.png"></image>
                </view>
            </view>
            <view class="login" v-show="!isLogin" @tap="goToLogin">
                <view class="login-btn">
                    登录查看我的鉴定
                </view>
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
                    <image v-show="item.final_result === 0" class="yinz" src="../../static/images/为假@2x.png"></image>
                    <image v-show="item.final_result === 1" class="yinz" src="../../static/images/为真拷贝2@2x.png"></image>
                    <image v-show="item.final_result === 2" class="yinz" src="../../static/images/无法鉴定拷贝@2x.png"></image>
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
                        </view>
                        <view class="center">
                            <view class="jds">鉴定师 <text v-for="(ite, index) in item.user_name" :key="index">{{ite}}</text></view>
                            <view class="date" :class="{hide: item.final_result === 10 || item.final_result === 12}">{{ item.publish_at }}</view>
                            <view class="date" :class="{block: item.final_result === 10 || item.final_result === 12, hide: item.final_result !== 10 || item.final_result !== 12}">{{item.status}}</view>
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
                    <view class="tip">*无法鉴定情况下费用会退还至账户余额，可随时提现。</view>
                </view>
            </view>
            <view class="mask" v-show="isShow || is_bar_mask"></view>
        </view>
    </scroll-view>
</template>

<script>
import { getCount, getPost, isAppraiser } from "../../api";
import { post } from "../../api/Identificationdetails";
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
            is_appraisal_admin: "",
            isShow: false,
            isCost: false,
            isLogin: false,
            details: {},
            is_specialty: '',
            is_bar_mask: false
        };
    },
    onLoad() {
        if (uni.getStorageSync('user_info')) {
            this.isLogin = true;
        } else {
            this.isLogin = false;
        }
        uni.showLoading();
        getCount().then(result => {
            const { count, fail } = result.data;
            this.count = count;
            this.fail = fail.substring(0, fail.length - 1);
            uni.hideLoading();
        });
        if (this.isLogin) {
            isAppraiser().then(result => {
                const { is_appraiser, is_appraisal_admin } = result.data;
                this.isAppraiser = is_appraiser;
                this.is_appraisal_admin = is_appraisal_admin;
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
        }
    },
    methods: {
        goToLogin() {
            uni.navigateTo({
                url: '/pages/login/login'
            });
        },
        goToData(index) {
            if (index) {
                uni.navigateTo({
                    url: '/pages/moderator/moderator'
                });
            } else {
                uni.navigateTo({
                    url: '/pages/gemmologist2/gemmologist2'
                });
            }
        },
        goTeam() {
            uni.navigateTo({
                url: '/pages/team/team'
            });
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
                    title: '请输入鉴定贴id',
                    icon: 'none'
                });
                return;
            }
            post({
                id: this.jdID
            }).then(result => {
                const {message, status} = result.data;
                if (status === 404) {
                    this.is_bar_mask = true;
                } else {
                    uni.navigateTo({
                        url:
                            "/pages/Identificationdetails/Identificationdetails?id=" +
                            this.jdID
                    });
                }
            });
        },
        closeBarMask() {
            this.is_bar_mask = false;
        },
        goTo(index) {
            this.isShow = true;
            this.is_specialty = index;
        },
        goToPath(index) {
            const that = this;
            if (index) {
                uni.navigateTo({
                    url: '/pages/equipmentappraisal2/equipmentappraisal2?is_specialty='+this.is_specialty+'&type=clothing',
                    success() {
                        that.isShow = false;
                    }
                });
            } else {
                uni.navigateTo({
                    url: '/pages/equipmentappraisal2/equipmentappraisal2?is_specialty='+this.is_specialty+'&type=shoes',
                    success() {
                        that.isShow = false;
                    }
                });
            }
        },
        goNav(index) {
            if (index === 1) {
                uni.navigateTo({
                    url: '/pages/freeauthenticationagreement/freeauthenticationagreement'
                });
            } else if (index === 2) {
                uni.navigateTo({
                    url: '/pages/professionalidentificationagreement/professionalidentificationagreement'
                });
            } else {
                uni.navigateTo({
                    url: '/pages/assessment/assessment'
                });
            }
        },
        close() {
            this.isShow = false;
        },
        goToDetail(index, id) {
            uni.navigateTo({
                url:
                    "/pages/Identificationdetails3/Identificationdetails3?id=" +
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
    background-color: #f8f8f8;
    position: relative;

    .con-bg-img {
        width: 750rpx;
        height: 920rpx;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
    }
}

.hide {
    display: none;
}

.block {
    display: block;
}

.search-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    margin: auto;
    width: 670rpx;
	height: 342rpx;
	background-color: #ffffff;
	border-radius: 16rpx;
    overflow: hidden;

    .title {
        margin-top: 38rpx;
        margin-bottom: 56rpx;
        text-align: center;
        font-size: 32rpx;
    }

    .cont {
        margin-bottom: 56rpx;
        text-align: center;
        border-bottom: 1rpx solid #fafafa;
        color: #666;
        font-size: 30rpx;
    }

    .btn-yes {
        height: 108rpx;
        line-height: 108rpx;
        text-align: center;
        font-size: 32rpx;
        color: #fc5662;
    }
}

.bg {
    overflow: hidden;
    background-color: #fff;
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
            width: 14rpx;
            height: 24rpx;
            margin-left: 16rpx;
        }
    }
}

.navs, .infos, .login {
    position: relative;
    z-index: 9;
}

.box {
    position: relative;
    z-index: 9;

    .bg-img {
        padding: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 742rpx;
        height: 540rpx;
        display: block;
    }

    .inner {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        width: 690rpx;
        margin: 0 auto;
        border-radius: 16rpx;
        padding-top: 24rpx;
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
        margin-top: 4rpx;

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
    margin: 46rpx auto 50rpx;
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
    background-color: #f8f8f8;

    .login-btn {
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


    .shoes-img {
        width: 97rpx;
        height: 50rpx;
    }

    .clothing-img {
        width: 63rpx;
        height: 74rpx;
    }
}

.close-img {
    width: 24rpx;
    height: 23rpx;
    position: absolute;
    top: 60rpx;
    right: 50rpx;
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

            view, text {
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

<template>
    <view class="container">
        <textarea class="content" placeholder="请输入您的问题..."></textarea>
        <view class="up-img">
            <view class="box" v-for="(item, index) in images" :key="index">
                <image class="img" :src="item.path"></image>
                <image class="close" @tap="close(index)" src="../../static/images/删除拷贝@2x.png"></image>
            </view>
            <image class="img" @tap="upImg(index)" src="../../static/images/圆角矩形1拷贝@2x.png"></image>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            images: []
        }
    },
    methods: {
        upImg() {
            const that = this;
            uni.chooseImage({
                count: 1,
                success(res) {
                    const { tempFilePaths } = res;
                    const imgPath = tempFilePaths[0];
                    that.images.push({
                        path: imgPath
                    });
                },
                fail(err) {
                    console.log(err);
                }
            });
        },
        close(index) {
            this.images.splice(index, 1);
        }
    }
}
</script>

<style lang="scss">
    .container {
        background-color: #fff;
    }
    .content {
        width: 690rpx;
        height: 180rpx;
        margin: 0 auto;
        font-size: 26rpx;
        color: #c6c6c8;
        line-height: 36rpx;
    }
    .up-img {
        display: flex;

        image {
            width: 160rpx;
            height: 160rpx;
        }

        .box {
            position: relative;
        }
    }
    .close {
        width: 36rpx;
        height: 36rpx;
        background-color: #000000;
        opacity: 0.3;
        position: absolute;
        right: 5rpx;
        top: 5rpx;
        z-index: 999;
    }
</style>
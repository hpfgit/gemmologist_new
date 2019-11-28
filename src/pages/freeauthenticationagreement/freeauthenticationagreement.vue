<template>
	<view class="container">
		<view class="tip">
			<image :src="qiniuUrl+'/“@2x.png'"></image>
			<view>特别声明：免费鉴定是为了服务用户提供的一项免费服务，BAN保持中立的态度不参与任何斗争，所有免费鉴定产生的鉴定结果仅提供参考，BAN对其不承担任何责任，但是BAN也会秉承对用户负责的角度保证鉴定结果的准确性达到97%以上。</view>
			<image :src="qiniuUrl+'/“拷贝@2x.png'"></image>
		</view>
		<view class="regulations">
			一、BAN对于故意诋毁BAN鉴定服务的用户有权停止其使用BAN任何服务，采取封禁账号或设备处理；恶意诽谤、情节严重导致BAN声誉受损者，BAN有权保留证据用于损害赔偿诉状。
		</view>
		<view class="regulations">
			二、BAN装备鉴定仅通过用户提供的照片对限量商品进行真假鉴定，无法对货源的真实性作出判断。
		</view>
		<view class="regulations">
			<view>三、关于鉴定结论</view>
			<view>1. 鉴定结论为3种情况，分别为 真、假、无法鉴定。</view>
			<view>2. 无法鉴定情况大致如下：</view>
			<view>(1）拼图、故意捣乱找茬者 定补图等</view>
			<view>(2）不在鉴定范围内</view>
			<view>(3）未发售产品</view>
			<view>(4）图片不完整或超过24小时未按规</view>
			<view>3. 对于鉴定结论有任何疑义可进行专业鉴定或者实物鉴定。</view>
		</view>
		<view class="regulations">
			<view>四、商品照片及描述规范</view>
			<view>	1. 请用数码相机或其他高清设备在自然光下拍摄（照片不低于800W像素），尽量用背景纸或使用纯色背景拍摄，保证物品在镜头中心位置；</view>
			<view>2. 务必按要求提供整体图、局部细节图等照片。必须保证商品照片未经任何图形图像软件做过处理；</view>
			<view>3. 商品描述必须保证与物品完全一致，把重要细节描述清楚；</view>
			<view>4. 由于照片鉴定的局限性，您拍摄的照片越清晰、色差越小，都会提高鉴定结论的准确性。</view>
		</view>
		<view class="regulations">
			<view>五、照片鉴定免责声明</view>
			<view>BAN装备鉴定提醒您：在您选择BAN装备鉴定的照片鉴定服务前，请您务必仔细阅读并透彻理解本声明。如果您选择BAN装备鉴定，发生的照片鉴定行为将被视为对本声明全部内容的认可。</view>
			<view>1. 照片不能很好的反应商品本身的重量、手感、密度、光泽、内部结构等物理信息，由此对商品品鉴定结论产生的误差，BAN装备鉴定对此鉴定结论概不负责，亦不承担任何法律责任。</view>
			<view>2. 请务必提供商品的清晰照片，建议采用数码相机在自然光线下拍摄。如果商品照片因清晰度、角度、色差与实物有较大误差或商品描述与实物不符，BAN装备鉴定对此鉴定结论概不负责，亦不承担任何法律责任。</view>
			<view>3. BAN装备鉴定只对用户提供的商品照片所做鉴定结论负责，关于商品的所有权、商品产生的交易行为，BAN装备鉴定对此不承担任何法律责任。</view>
			<view>4. 对于拼凑图片，假货商家故意使用真假混合图片等扰乱影响鉴定师正常鉴定行为导致的鉴定结论出错，BAN装备鉴定对此概不负责，亦不承担任何法律责任。</view>
			<view>5. 如果用户对鉴定结论产生疑问，可通过提交工单的方式，或将该商品通过实物鉴定（公测）鉴定技术开发中心做现场鉴定或科技鉴定。</view>
		</view>
	</view>
</template>

<script>
	const NODE_ENV = process.env.NODE_ENV;
	import config from "../../config";

	export default {
		data() {
			return {
				qiniuUrl: config[NODE_ENV].qiniuUrl
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #fff;
	}
	
	.tip {
		width: 670rpx;
		margin: 26rpx auto 40rpx;
		padding: 24rpx 18rpx;
		background-color: #f8f9fe;
		border-radius: 2rpx;
		position: relative;
		image {
			width: 31rpx;
			height: 24rpx;
			position: absolute;
			&:nth-of-type(1) {
				top: 24rpx;
				left: 18rpx;
			}
			&:nth-of-type(2) {
				right: 18rpx;
				bottom: 24rpx;
			}
		}
		view {
			width: 578rpx;
			padding-left: 56rpx;
		}
	}
	.regulations {
		padding-left: 34rpx;
		padding-right: 34rpx;
		font-size: 26rpx;
		line-height: 52rpx;
		margin-bottom: 40rpx;
	}
</style>
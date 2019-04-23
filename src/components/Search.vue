<template>
	<section>
		<!-- 搜索框 -->
		<!-- <el-form :inline="true" class="searchForm">
			<el-form-item>
				<el-input v-model="keyword" class="searchInput">
					<el-select v-model="value" slot="prepend" @change="changeValue(value)">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="searchByKeyword">查询</el-button>
			</el-form-item>
		</el-form> -->
		<!-- 数据内容 -->
		<Shop :searchPage='searchPage' v-if="index == 0"></Shop>
		<Comment :searchPage='searchPage' v-if="index == 1"></Comment>
		<Drawout :searchPage='searchPage' v-if="index == 2"></Drawout>
		<Recharge :searchPage='searchPage' v-if="index == 3"></Recharge>
		<Order :searchPage='searchPage' v-if="index == 4"></Order>
		<Coupon :searchPage='searchPage' v-if="index == 5"></Coupon>
		<User :searchPage='searchPage' v-if="index == 6"></User>
		<Token :searchPage='searchPage' v-if="index == 7"></Token>
		<!-- <router-view :searchPage='searchPage'></router-view> -->
	</section>
</template>

<script>
import { Shop, Comment, Drawout, Recharge, Order, Coupon, User, Token } from './Search.js'
// import { Search } from '../api/api'

	export default {
		data() {
			return {
				searchPage: true,
				index: 0, //查询类型
				radio: 0, //查询状态
				page: 1,
				item: 40,

				keyword: "",
				options: [],
				value: "1", //查询条件
				listData: [],//查询结果
			};
		},
		components: {
			Shop,
			Comment,
			Drawout,
			Recharge,
			Order,
			Coupon,
			User,
			Token
		},
		methods: {
			// 修改查询条件
			changeValue: function(e) {
				this.value = e;
			},
			//TODO: 调用接口，传keyword后台返回数据
			searchByKeyword: function() {
				// 先判断类型 选择接口
				let param = {
					"cnckey": this.$store.state.user.userInfo.cnckey,
					"shp_status": this.radio.toString(),
					"condition_status": this.value.toString(),
					"condition": this.keyword,
					"page": this.page.toString(),
					"item": this.item.toString(),
				}
				Search(param).then(res => {
					console.log(res);
					this.listData = res.data;
				})
				// 判断状态 传递参数
			}
		},
		created() {
			// 判断当前页是什么查询
			this.index = this.$route.query.index ? this.$route.query.index : 0; 
			this.radio = this.$route.meta.radio;
			switch (parseInt(this.index)) {
				case 0:
					this.options = [
						{ value: "0", label: "店铺账号" },
						{ value: "1", label: "店铺编号" },
						{ value: "2", label: "店铺名称" }
					];
					break;
				case 1:
					this.options = [
						{ value: "1", label: "店铺名称" },
						{ value: "2", label: "店铺编号" },
						{ value: "3", label: "评论账号" },
						{ value: "4", label: "评论内容" }
					];
					break;
				case 2:
					this.options = [
						{ value: "1", label: "提现账户" },
						{ value: "2", label: "店铺编号" },
						{ value: "3", label: "店铺名称" },
						{ value: "4", label: "持卡人" },
						{ value: "5", label: "卡号" },
						// { value: '6', label: '支付宝账号' },
						// { value: '7', label: '微信账号' },
						{ value: "8", label: "提现单号" }
						// { value: '9', label: '交易单号' }
					];
					break;
				case 3:
					this.options = [
						{ value: "1", label: "用户账号" },
						{ value: "2", label: "用户编号" },
						{ value: "3", label: "充值金额" },
						{ value: "4", label: "充值方式" },
						{ value: "5", label: "充值单号" },
						{ value: "6", label: "微信/支付宝账号" },
						{ value: "7", label: "交易单号" }
					];
					break;
				case 4:
					this.options = [
						{ value: "1", label: "用户账号" },
						{ value: "2", label: "用户编号" },
						{ value: "3", label: "优惠券编号" },
						{ value: "4", label: "优惠券名称" },
						{ value: "5", label: "店铺名称" }
					];
					break;
				case 5:
					this.options = [
						{ value: "1", label: "优惠活动编号" },
						{ value: "2", label: "店铺编号" },
						{ value: "3", label: "店铺名称" }
					];
					break;
				case 6:
					this.options = [
						{ value: "1", label: "手机账号" },
						{ value: "2", label: "微信账号" },
						{ value: "3", label: "用户编号" }
					];
					break;
				case 7:
					this.options = [
						{ value: "1", label: "用户账号" },
						{ value: "2", label: "用户编号" }
					];
					break;
				case 8:
					this.options = [
						{ value: "1", label: "用户账号" },
						{ value: "2", label: "用户编号" }
					];
					break;
				default:
					this.options = [
						{ value: "1", label: "店铺账号" },
						{ value: "2", label: "店铺编号" },
						{ value: "3", label: "店铺名称" }
					];
					break;
			}
		},
		watch: {
			
		},
		computed: {
			
		}
	};
</script>

<style lang="scss" scoped>
</style>

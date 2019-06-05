<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="18" class="logo logo-width">{{sysName}}</el-col>
			<el-col :span="2">{{nowTime}}</el-col>
			<el-col :span="2">{{week}}</el-col>
			<el-col :span="2" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar.imgUrl" /> {{sysUserName}}</span>
					<el-dropdown-menu slot="dropdown">
						<!-- <el-dropdown-item>我的消息</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item> -->
						<el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<aside class="menu-expanded">
				<!--导航菜单-->
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @select="handleselect" unique-opened router>
					<el-submenu :index="item.path" v-for="(item,index) in $router.options.routes" :key="index" v-if="!item.hidden">
						<template slot="title"><i :class="item.iconCls" ></i>{{item.name}}</template>
						<!-- <el-menu-item v-for="(child, subIndex) in item.children" :index="child.path+'?index='+(index-1)" :key="subIndex" v-if="!child.hidden"> -->
						<el-menu-item v-for="(child, subIndex) in item.children" :index="child.path" :key="subIndex" v-if="!child.hidden" @click.native="sideClick(child.path,child.name)">
							{{child.name}}
						</el-menu-item>
					</el-submenu>
				</el-menu>
			</aside>
			<!-- 标签页 -->
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="content-wrapper">
						<el-tabs v-model="activeIndex" type="card" @tab-remove="tabRemove" @tab-click='tabClick'>
							<el-tab-pane :label="item.name" :name="index + ''" v-for="(item, index) in tabs" :key="index" closable>
								<transition name="fade" mode="out-in">
									<keep-alive include="/versionPre">
										<router-view :items="item"></router-view>
									</keep-alive>
								</transition>
							</el-tab-pane>
						</el-tabs>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
	
</template>

<script>
import { Logout } from '../api/api';
import util from '../common/js/util.js'

	export default {
		data() {
			return {
				count: 1,
				sysName:'大家省后台管理系统',
				nowTime: '',
				week: '',
				sysUserName: '',
				sysUserAvatar: '',

			}
		},
		methods: {
			handleselect: function (a, b) {
				this.$store.state.tabs.isMenu = true;
			},
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					// let cnckey = this.$store.state.user.userInfo.cnckey;
					Logout().then(res => {
						console.log(res.data.message)
					});
					localStorage.removeItem('userInfo'); //清除本地保存cnckey
					_this.$router.push('/login');
				}).catch(() => {

				});
			},
			// 获取当前时间函数
			nowTimes(timeStamp) {
				let year = new Date(timeStamp).getFullYear();
				let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
				let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
				let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
				let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
				// let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
				this.nowTime = year + "年" + month + "月" + date +"日";
				this.week = "星期" + "日一二三四五六".charAt(timeStamp.getDay());
			},

			sideClick(path, name) {
				let tabs = this.tabs;
				let sideTab = {
					route: path,
					name: name,
				};
				util.creatTab(sideTab);
				this.$router.push(sideTab.route);
			},
			//tab标签点击时，切换相应的路由
			tabClick(currentTab){
				let tabs = this.tabs;
				for (let index in tabs){
					index = parseInt(index)
					if(tabs[index].name === currentTab.label){
						this.$store.dispatch('tabs/setActive', index+'');
						this.$router.push(tabs[index].route)
						break;
					}
				}
			},
			//移除tab标签
			tabRemove(targetName){
				let tabs = this.tabs;
				let currentTab = tabs[this.activeIndex];
				if(tabs && tabs.length > 1) {
					this.$store.dispatch('tabs/deleteTabs', targetName);
					if (this.activeIndex === targetName) {	
						let activeTab = tabs[this.activeIndex] || tabs[this.activeIndex - 1]
						if(activeTab){
							this.$router.push(activeTab.route)
							this.$store.dispatch('tabs/setActive', tabs.findIndex(item => item.name === activeTab.name)+'')
						}
					}else {
						this.$router.push(currentTab.route)
						this.$store.dispatch('tabs/setActive', tabs.findIndex(item => item.name === currentTab.name)+'')
					}
				}
			}
		},
		created() {
			this.nowTimes(new Date());
			// 查找缓存，将userInfo存入全局变量
			let user = localStorage.getItem('userInfo')
			if(user){
				let userInfo = JSON.parse(user)
				this.$store.dispatch('user/setUserInfo', userInfo);
			}
		},
		mounted() {
			this.sysUserName = this.$store.state.user.userInfo.userName
			this.sysUserAvatar = {imgUrl:require('../assets/avatar.jpg')};
			// 刷新时以当前路由做为tab加入tabs
			if (this.tabs && this.tabs.length > 0) {
				for (let index in this.tabs){
					index = parseInt(index)
					if (this.tabs[index].route === this.$route.path){
						this.$store.dispatch('tabs/setActive', index+'');
						break;
					}
				}
			}else {
				this.$router.push('/shopIndex')
				this.$store.dispatch('tabs/addTabs', { route: this.$route.path, name: this.$route.name })
				this.$store.dispatch('tabs/setActive', '0')
			}
		},
		computed: {
			tabs () {
				return this.$store.state.tabs.tabs;
			},
			activeIndex: {
				get () {
					return this.$store.state.tabs.activeIndex;
				},
				set (val) {
					this.$store.dispatch('tabs/setActive', val+'');
				}
			}
		}
	}

</script>

<style scoped lang="scss">
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 60px;
			line-height: 60px;
			background: #20a0ff;
			color:#fff;
			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					color:#fff;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
			}
			.logo {
				//width:230px;
				height:60px;
				font-size: 22px;
				padding-left:20px;
				padding-right:20px;
				border-color: rgba(238,241,146,0.3);
				img {
					width: 40px;
					float: left;
					margin: 10px 10px 10px 18px;
				}
				.txt {
					color:#fff;
				}
			}
		}
		.main {
			display: flex;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			aside {
				.el-menu{
					height: 100%;
				}
				.el-menu-item{
					min-width: 100%;
				}
			}
			.content-container {
				flex:1;
				overflow-y: scroll;
				padding: 20px;
				height: 100%;
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
		}
	}
</style>
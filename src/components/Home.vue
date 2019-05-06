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
						<el-menu-item v-for="(child, subIndex) in item.children" :index="child.path" :key="subIndex" v-if="!child.hidden">
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
							<el-tab-pane :label="item.name" :name="item.route" v-for="(item, index) in tabs" :key="item.route+index" closable>
								<transition name="fade" mode="out-in">
									<router-view :item="item"></router-view>
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
			},
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					let cnckey = this.$store.state.user.userInfo.cnckey;
					Logout({"cnckey": cnckey}).then(res => {
						console.log(res.data.message)
						localStorage.removeItem('userInfo'); //清除本地保存cnckey
						_this.$router.push('/login');
					})
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
				this.nowTime = year + " 年 " + month + " 月 " + date +" 日";
				this.week = "星期" + "日一二三四五六".charAt(timeStamp.getDay());
			},

			//tab标签点击时，切换相应的路由
			tabClick(tab){
				this.$router.push(this.activeIndex);
			},
			//移除tab标签
			tabRemove(targetName){
				let tabs = this.tabs;
				if (tabs && tabs.length > 1) {
					if (this.activeIndex === targetName) { //删除页为当前页
						tabs.forEach((tab, index) => {
							if (tab.route === targetName) {
								let activeTab = tabs[index + 1] || tabs[index - 1];
								if (activeTab) {
									this.$store.dispatch('tabs/setActive', activeTab.route);
									this.$router.push({path: activeTab.route});
								}
							}
						});
					}
					this.$store.dispatch('tabs/deleteTabs', targetName);
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
			if(this.tabs.length > 0) {
				for(let item of this.$store.state.tabs.tabs){
					if(item.title === to.name){
						this.$store.dispatch('tabs/setActive',to.path)
						break;
					}
				}
			}else {
				this.$store.dispatch('tabs/addTabs', {route: this.$route.path, name: this.$route.name });
				this.$store.dispatch('tabs/setActive', this.$route.path);
			}
		},
		watch: {
			$route (to, from){
				let flag = false;
				
				// 判断是否已打开标签页
        for(let item of this.tabs){
          if(item.name === to.name){
						if (to.path.indexOf('?') == -1){
							this.$store.dispatch('tabs/setActive',to.path)
							flag = true;
							break;
						}
          }
        }
        if(!flag){
          this.$store.dispatch('tabs/addTabs', {route: to.path, name: to.name});
          this.$store.dispatch('tabs/setActive', to.path);
        }
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
					this.$store.dispatch('tabs/setActive', val);
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
				// border-right-width: 1px;
				// border-right-style: solid;
				img {
					width: 40px;
					float: left;
					margin: 10px 10px 10px 18px;
				}
				.txt {
					color:#fff;
				}
			}
			// .logo-width{
			// 	width:230px;
			// }
			// .logo-collapse-width{
			// 	width:60px
			// }
			.tools{
				padding: 0px 23px;
				// width:14px;
				height: 60px;
				line-height: 60px;
				// cursor: pointer;
			}
		}
		.main {
			display: flex;
			// background: #324057;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			aside {
				flex:0 0 230px;
				width: 230px;
				// position: absolute;
				// top: 0px;
				// bottom: 0px;
				.el-menu{
					height: 100%;
				}
				.collapsed{
					width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}

				}
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 230px;
				width: 230px;
			}
			.content-container {
				// background: #f1f2f7;
				flex:1;
				// position: absolute;
				// right: 0px;
				// top: 0px;
				// bottom: 0px;
				// left: 230px;
				overflow-y: scroll;
				padding: 20px;
				.breadcrumb-container {
					//margin-bottom: 15px;
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						float: right;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
		}
	}
</style>
<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="18" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
				{{collapsed?'':sysName}}
			</el-col>
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
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
				<!--导航菜单-->
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @select="handleselect"
					 unique-opened router v-show="!collapsed">
					<!-- <el-menu-item :index="item.path+'?index='+(index-1)" v-for="(item,index) in $router.options.routes" :key="index" v-if="!item.hidden">
						<i :class="item.iconCls" ></i>{{item.name}}
					</el-menu-item> -->
					<el-submenu :index="item.path+'?index='+(index-1)" v-for="(item,index) in $router.options.routes" :key="index" v-if="!item.hidden">
						<template slot="title"><i :class="item.iconCls" ></i>{{item.name}}</template>
						<el-menu-item v-for="(child, subIndex) in item" :index="child.path+'?index='+(index-1)" :key="subIndex">
							{{child.name}}
						</el-menu-item>
					</el-submenu>
					
				</el-menu>
			</aside>
			<!-- 标签页 -->
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="content-wrapper">
						<el-tabs v-model="tabBarsValue" type="card" @tab-remove="handleTabsRemove">
      				<el-tab-pane name="0" :label="this.$route.name">
								<transition name="fade" mode="out-in">
									<router-view></router-view>
								</transition>
      				</el-tab-pane>
							<el-tab-pane :label="item.title" :name="item.name" v-for="item in searchTabs" :key="item.name" closable lazy>
								<Tabs></Tabs>
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
import Tabs from './Tabs.vue'

	export default {
		data() {
			return {
				count: 0,
				sysName:'大家省后台管理系统',
				nowTime: '',
				week: '',
				collapsed:false,
				sysUserName: '',
				sysUserAvatar: '',

				// 标签页
				tabBarsValue: '0',
				searchTabsValue: 0,
				// searchTabs: [],  //computed
				searchTabsBar: [],
				isSearch: 0, 
				index: 0
			}
		},
		components: {
			Tabs
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
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
						if(res.data.result == 0){
							localStorage.removeItem('userInfo'); //清除本地保存cnckey
							_this.$router.push('/login');
						}else{
							_this.$alert('登出失败，请重试');
						}
					})
				}).catch(() => {

				});
			},
			//折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			},
			// 获取当前时间函数
			timeFormate(timeStamp) {
				let year = new Date(timeStamp).getFullYear();
				let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
				let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
				let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
				let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
				// let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
				// return year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
				this.nowTime = year + "年" + month + "月" + date +"日";
				// console.log(this.nowTime);
			},
			// 定时器函数
			nowTimes(){
				this.timeFormate(new Date());
				// setInterval(this.nowTimes,30*1000);
			},
			getweek(){
				this.week = "星期" + "日一二三四五六".charAt(new Date().getDay());
			},
			// 删除标签页
			handleTabsRemove(targetName){
				let tabs = this.searchTabs;
        let activeName = this.tabBarsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
							//让当前项变为后一项，若无，则变为前一项
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }else activeName = '0'
            }
          });
        }
        this.tabBarsValue = activeName;
				this.searchTabsBar = tabs.filter(tab => tab.name !== targetName);
				// console.log(this.searchTabsBar);
			},
		},
		created() {
			this.nowTimes();
			this.getweek();
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
		},
		watch: {
			$route (to, from){
				if(this.index != this.$route.query.index){
					this.tabBarsValue = '0';
					this.index == this.$route.query.index
				}
			}
		},
		computed: {
			searchTabs() {
				// let searchTabs = [];
				if(this.isSearch != this.$store.state.search.searchInfo.isSearch){
					let newTabName = ++this.searchTabsValue + '';
					this.searchTabsBar.push({
						title: this.$store.state.search.searchInfo.searchTabName,
						name: newTabName,
					});
					this.tabBarsValue = newTabName;
					this.isSearch = this.$store.state.search.searchInfo.isSearch;
				}
				return this.searchTabsBar;
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
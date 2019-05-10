<template>
	<div id="app">
		<transition name="fade"
		            mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
export default {
	name: 'app',
	mounted(){
    window.addEventListener('hashchange',()=>{
      var currentPath = window.location.hash.slice(1); // 获取输入的路由
      if(this.$router.path !== currentPath){
        this.$router.push(currentPath); // 动态跳转
      }
		},false);
		
	}
}

</script>

<style lang="scss">
body {
	margin: 0px;
	padding: 0px;
	font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
	font-size: 14px;
	-webkit-font-smoothing: antialiased;
}

#app {
	position: absolute;
	top: 0px;
	bottom: 0px;
	width: 100%;
}

.el-submenu [class^=fa] {
	vertical-align: baseline;
	margin-right: 10px;
}

.el-menu-item [class^=fa] {
	vertical-align: baseline;
	margin-right: 10px;
}

.toolbar {
	background: #f2f2f2;
	padding: 10px;
	margin: 10px 0px;
	.el-form-item {
		margin-bottom: 10px;
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}

.el-table {
	margin-top: 20px;
}
// 首页e_chart样式
.chart_item {
	margin-top: 50px;
}
// 首页顶部表格
.topTable {
	margin: 20px 0;
	border: 1px solid #F2F2F2;
  tr{
    height: 25px;
    line-height: 25px;
    td{
      width: 150px;
    }
    td:nth-child(odd) {
      background: lightblue;
      text-align: right;
    }
    td:nth-child(even) {
      box-sizing: border-box;
      padding-left: 10px;
    }
  }
}

// 搜索框
.searchForm {
	margin-top: 20px;
	.el-select {
		width: 130px;
	}
}
// 图片预览样式
.viewer-container {
  width: 55% !important;
	left: 45% !important;
	.viewer-canvas img {
		margin-left: auto !important;
	}
}

</style>
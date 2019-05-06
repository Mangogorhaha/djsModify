<template>
  <section>
    <!-- 顶部表格 -->
    <el-form :inline="true" v-if="!searchPage">
      <el-form-item>
        <table class="topTable">
          <tr>
            <td class="t-tit">本周新增用户量：</td>
            <td>{{accumulate.count_user_increase_week}}</td>
            <td class="t-tit">累计用户量：</td>
            <td>{{accumulate.count_accumulate_user}}</td>
            <td class="t-tit">有充值记录的用户量：</td>
            <td>{{accumulate.count_recharge_user}}</td>
            <td class="t-tit">待消费总金额：</td>
            <td>{{accumulate.total_amount_to_consume}}</td>
          </tr>
          <tr>
            <td class="t-tit">本月新增用户量：</td>
            <td>{{accumulate.count_user_increase_month}}</td>
            <td class="t-tit">被邀请注册的用户量：</td>
            <td>{{accumulate.count_ivt_user}}</td>
            <td class="t-tit">有消费记录的用户量：</td>
            <td>{{accumulate.count_consume_user}}</td>
            <td class="t-tit">已消费总金额：</td>
            <td>{{accumulate.total_amount_consumed}}</td>
          </tr>
        </table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native='search' class="search_btn">查询用户</el-button>
      </el-form-item>
    </el-form>

    <!-- 搜索框 -->
		<el-form :inline="true" class="searchForm" v-else>
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
		</el-form>
    
    <!-- 用户列表 -->
    <el-table :data="userList.slice((page-1)*20,page*20)" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" border>
      <el-table-column prop="usr_sqn" key="1" label="用户编号" min-width="80">
			</el-table-column>
			<el-table-column prop="tme_register" key="2" label="注册时间" min-width="160">
			</el-table-column>
			<el-table-column prop="usr_mobile" key="3" label="手机账号" min-width="130">
			</el-table-column>
			<el-table-column prop="wechat_account" key="4" label="微信账号" min-width="130">
			</el-table-column>
			<el-table-column prop="parent_name" key="5" label="上级邀请人" min-width="110">
			</el-table-column>
			<el-table-column prop="count_vdr_ivt" key="6" label="邀请好友数量" min-width="110">
			</el-table-column>
			<el-table-column prop="count_vdr_ivt" key="7" label="邀请店铺数量" min-width="110">
      </el-table-column>
			<el-table-column prop="amount_recharge" key="8" label="充值余额" min-width="110">
			</el-table-column>
			<el-table-column prop="amount_to_consume" key="9" label="待消费金额" min-width="110">
			</el-table-column>
      <el-table-column prop="amount_consumed" key="10" label="已消费金额" min-width="110">
			</el-table-column>
      <el-table-column prop="amount_token" key="11" label="token余额" min-width="110">
			</el-table-column>
      <el-table-column key="12" label="操作" min-width="80">
				<template slot-scope="scope">
          <el-button size="small" @click="showDetail(scope.$index, scope.row)">查看</el-button>
				</template>
			</el-table-column>
    </el-table>

    <!--分页栏-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-size="20" :page-sizes="[20,50,100]" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
    
    <!-- 用户资料详情 -->
    <el-dialog title="用户资料" :visible.sync="userInfoVisible" width="75%">
      <div class="content-container">
        <el-col :span="24" class="content">
          <aside class="content_l">
            <el-menu class="el-menu-vertical-demo" @select="handleselect" unique-opened default-active="1">
              <el-menu-item index="1">基本资料</el-menu-item>
              <el-menu-item index="2">邀请好友人数：{{sideBar.count_ivt_vdr}}人</el-menu-item>
              <el-menu-item index="3">邀请店铺数：{{sideBar.count_ivt_shp}}家</el-menu-item>
              <el-menu-item index="4">充值余额：{{sideBar.amount_recharge}}元</el-menu-item>
              <el-menu-item index="5">待消费金额：{{sideBar.amount_to_consume}}元</el-menu-item>
              <el-menu-item index="6">已消费金额：{{sideBar.amount_consumed}}元</el-menu-item>
              <el-menu-item index="7">token余额：{{sideBar.amount_token}}个</el-menu-item>
              <el-menu-item index="8">分享优惠券：{{sideBar.count_share_coupon}}次</el-menu-item>
              <el-menu-item index="9">消费评价：{{sideBar.count_consume_comment}}次</el-menu-item>
              <el-menu-item index="10">收藏店铺：{{sideBar.count_star_shp}}家</el-menu-item>
              <el-menu-item index="11">优惠提醒：{{sideBar.count_remind}}家</el-menu-item>
              <el-menu-item index="12">推送信息记录</el-menu-item>
              <el-menu-item index="13">登录记录</el-menu-item>
            </el-menu>
          </aside>
          <section class="content_r">
            <el-col :span="24">
              <transition name="fade" mode="out-in">
                <uuserInfo v-if="index == 1" :usrSqn='usrSqn' @sideBar="getSideBar"></uuserInfo>
                <uinviteFriend v-if="index == 2"></uinviteFriend>
                <uinviteShop v-if="index == 3"></uinviteShop>
                <urecharge v-if="index == 4"></urecharge>
                <uunconsumed v-if="index == 5"></uunconsumed>
                <uconsumed v-if="index == 6"></uconsumed>
                <utoken v-if="index == 7"></utoken>
                <ucoupon v-if="index == 8"></ucoupon>
                <ucomment v-if="index == 9"></ucomment>
                <ufavoriteShop v-if="index == 10"></ufavoriteShop>
                <udiscountTips v-if="index == 11"></udiscountTips>
                <ushareRecord v-if="index == 12"></ushareRecord>
                <uloginRecord v-if="index == 13"></uloginRecord>
              </transition>
            </el-col>
          </section>
        </el-col>
      </div>
		</el-dialog>
  </section>
</template>

<script>
//TODO: 提现接口换成充值接口
import { UserList } from '../api/api';
import { uuserInfo, uinviteFriend, uinviteShop, urecharge, uunconsumed, uconsumed, utoken, ucoupon, ucomment, ufavoriteShop, udiscountTips, ushareRecord, uloginRecord } from './userDetail/userDetail.js';
import { UserListSearch } from '../api/api'

export default {
  data() {
    return {
      radio: '2',
      total: 0,
      page: 1,
      item: 20,
      listLoading: false,
			sels: [],//列表选中列

      userList: [],
      accumulate: [],
      
      userInfoVisible: false,
      userDetail: [], //用户资料
      index: '1', //用户详情index默认为1
      usrSqn: '',
      sideBar: [],

      // 查询
      keyword: '',
      options: [
        { value: "0", label: "手机账号" },
        { value: "1", label: "微信账号" },
        { value: "2", label: "用户编号" }
      ],
      value: '0',
		}
  },
  components: {
    uuserInfo,
    uinviteFriend,
    uinviteShop,
    urecharge,
    uunconsumed,
    uconsumed,
    utoken,
    ucoupon,
    ucomment,
    ufavoriteShop,
    udiscountTips,
    ushareRecord,
    uloginRecord
  },
  props: {
    searchPage: {
      type: Boolean,
      default: false
    }
  },
  methods: {
		// TODO: 获取顶部表格数据
		
		// 获取用户列表数据
		getList: function(){
      let param = {
        "cnckey": this.$store.state.user.userInfo.cnckey,
        "page": this.page.toString(),
				"item": this.item.toString()
      }
      this.listLoading = true;
      UserList(param).then(res => {
        if (res.data.result == 0){
          this.total = parseInt(res.data.total);
          this.userList = res.data.list;
          this.accumulate = res.data.accumulate;
          this.listLoading = false;
        }
			})
    },
    
    // 显示用户信息
    showDetail: function(index, row){
      this.userInfoVisible = true;
      this.usrSqn = row.usr_sqn.toString();
    },
    // 切换用户详情组件显示
    handleselect: function (a, b) {
      this.index = a
    },
    //获取子组件传值
    getSideBar: function(val) {
      this.sideBar = val;
    },
    
    handleCurrentChange(val) {
      this.page = val;
    },
    //改变每页显示条数
    handleSizeChange(val) {
      this.item = val
    },
    selsChange: function (sels) {
      this.sels = sels;
    },
	},
	mounted() {    
    this.getList();
  },
  watch: {
    keyword() {
      if(this.keyword == ''){
        this.getList();
      }
    }
  }
}
</script>

<style scoped>
.topTable {
	margin: 20px 0 0;
	border: 1px solid #F2F2F2;
}
.topTable tr{
	height: 25px;
	line-height: 25px;
}
.topTable td{
	width: 150px;
}
.t-tit {
	background: lightblue;
	text-align: right;
}
.search_btn {
  margin-top: 32px;
}

/* 用户详情 */
.el-menu-item {
  height: 45px;
  line-height: 45px;
  padding-left: 10px !important;
}
.content-container {
  overflow: auto;
}
.content {
  display: flex;
}
.content_l {
  width: 180px;
  margin-right: 20px;
}
.content_r {
  flex: 1;
  /* padding: 10px 20px; */
  box-sizing: border-box;
}

</style>

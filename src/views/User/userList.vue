<template>
  <section>

    <!-- 搜索框 -->
		<el-form :inline="true" class="searchForm">
      <el-form-item label="用户编号">
        <el-input v-model="usrCode" placeholder="用户编号"></el-input>
			</el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="usrMobile" placeholder="手机号码"></el-input>
			</el-form-item>
      <el-form-item label="注册时间">
        <el-date-picker v-model="tmeBegin" type="datetime" placeholder="开始时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker> 至 <el-date-picker v-model="tmeEnd" type="datetime" placeholder="结束时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="getList">查询</el-button>
			</el-form-item>
      <el-form-item>
				<el-button type="primary" @click="newSearch">新建查询</el-button>
			</el-form-item>
		</el-form>

    <!-- 用户数据 -->
    <el-table :data="userList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" border v-cloak>
      <el-table-column key="1" prop="usr_code" min-width="80" label="用户编号"></el-table-column>
      <el-table-column key="2" prop="usr_mobile" min-width="130" label="手机号码"></el-table-column>
      <el-table-column key="3" prop="usr_nick" min-width="130" label="昵称"></el-table-column>
      <el-table-column key="4" prop="bkr_code" min-width="80" label="推荐人"></el-table-column>
      <el-table-column key="5" prop="usr_status" min-width="80" label="状态">
        <template slot-scope="scope">
          <span>{{scope.row.usr_status==0?'禁用':'正常'}}</span>
        </template>
      </el-table-column>
      <el-table-column key="6" prop="amt_ready" min-width="80" label="待消费额"></el-table-column>
      <el-table-column key="7" prop="amt_consumed" min-width="80" label="已消费额"></el-table-column>
      <el-table-column key="8" prop="amnt_token" min-width="80" label="省点余额"></el-table-column>
      <el-table-column key="9" prop="tme_register" min-width="160" label="注册时间"></el-table-column>

      <el-table-column key="10" label="操作" min-width="350">
				<template slot-scope="scope">
					<el-button size="small" @click="showDetail(scope.$index, scope.row)">详情</el-button>
					<el-button size="small">营业收入列表</el-button>
          <el-dropdown>
            <el-button size="small">
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>邀请好友列表</el-dropdown-item>
              <el-dropdown-item>邀请店铺列表</el-dropdown-item>
              <el-dropdown-item>优惠券列表</el-dropdown-item>
              <el-dropdown-item>评论</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
				</template>
			</el-table-column>
    </el-table>

    <!--分页栏-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="page" :page-size="item" :page-sizes="itemList" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
    
  </section>
</template>

<script>
import { UserList, UserDetail } from '../../api/api';

export default {
  data() {
    return {
      total: 0,
      page: 1,
      item: 10, //每页显示数量
      itemList: [10,20,50],
      listLoading: false,
      sels: [],//列表选中列
      userList: [], //用户列表

      usrCode: '', // 用户编号
      usrMobile: '', // 手机号码
      tmeBegin: '', // 注册开始时间
      tmeEnd: '', // 注册结束时间
    }
  },
  methods: {
    // 获取店铺列表数据
    getList: function(){
      let that = this;
      let param = {
        "cnckey": this.$store.state.user.userInfo.cnckey,
        "ifo_type": "1",
        "dmy_sqn": "1",
        "usr_code": this.usrCode,
        "usr_mobile": this.usrMobile,
        "tme_begin": this.tmeBegin ? this.tmeBegin : "",
        "tme_end": this.tmeEnd ? this.tmeEnd : "",
        "page": this.page.toString(),
        "item": this.item.toString()
      }
      this.listLoading = true;
      UserList(param).then(res => {
        if (res.data.result == 0){
          that.total = parseInt(res.data.total);
          that.userList = res.data.list;
          that.listLoading = false;          
        }else{
          that.$message({
            message: res.data.message,
            type: 'error'
          });
        }
      }).catch(err => {
        that.$alert('请求超时，刷新重试！')
      });    
    },

    // 新建查询
    newSearch: function() {
      let newTab = {
        name: '用户列表'+(this.$store.state.tabs.tabs.length),
        route: '/userList',
      }
      this.$store.dispatch('tabs/addTabs', newTab)
      this.$store.dispatch('tabs/setActive', this.$store.state.tabs.tabs.length-1+'');
      this.$router.push(newTab.route)
    },
    // 查看详情
    showDetail: function(index,row) {
      let detailTab = {
        route: '/userDetail',
        name: row.usr_code + '',
        usrSqn : row.usr_sqn
      }
      this.$store.dispatch('tabs/addTabs', detailTab);
      this.$store.dispatch('tabs/setActive', this.$store.state.tabs.tabs.length-1+'');
      this.$router.push(detailTab.route)
    },

    // 切换当前页
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
    // 改变每页显示条数
    handleSizeChange(val) {
      this.item = val;
      this.getList();
    },
    selsChange: function (sels) {
      this.sels = sels;
    },
  },
  mounted() {
    this.getList();
  },
  created() {
  
  },
  watch: {
    $route (to, from){
    }
  },
  computed: {
    
  }
}
</script>

<style scoped>
</style>

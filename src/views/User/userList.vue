<template>
  <section>

    <!-- 搜索框 -->
		<el-form :inline="true" class="searchForm">
      <el-form-item label="用户编号">
        <el-input v-model="usrCode" placeholder="用户编号" clearable></el-input>
			</el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="usrMobile" placeholder="手机号码" clearable></el-input>
			</el-form-item>
		</el-form>
    <el-form :inline="true">
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
    <el-table :data="userList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" border tooltip-effect="light">
<<<<<<< HEAD
      <el-table-column key="1" min-width="80" label="用户编号">
        <template slot-scope="scope">
          <span class="blue" @click="showDetail(scope.$index, scope.row)">{{scope.row.usr_code}}</span>
        </template>
      </el-table-column>
=======
      <el-table-column key="1" prop="usr_code" min-width="80" label="用户编号"></el-table-column>
>>>>>>> 6a0bbe904a5503efa9c99ee7e70e4426f6ceeb26
      <el-table-column key="2" prop="usr_mobile" min-width="130" label="手机号码"></el-table-column>
      <el-table-column key="3" prop="usr_nick" min-width="130" label="昵称" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column key="4" prop="bkr_code" min-width="80" label="推荐人"></el-table-column>
      <el-table-column key="5" prop="usr_status" min-width="80" label="状态">
        <template slot-scope="scope">
          <span>{{scope.row.usr_status==0?'禁用':'正常'}}</span>
        </template>
      </el-table-column>
      <el-table-column key="6" min-width="80" label="待消费额">
        <template slot-scope="scope">
          <span class="blue" @click="showOrderToConsume(scope.$index, scope.row)">{{scope.row.amt_ready}}</span>
        </template>
      </el-table-column>
      <el-table-column key="7" min-width="80" label="已消费额">
        <template slot-scope="scope">
          <span class="blue" @click="showOrderConsumed(scope.$index, scope.row)">{{scope.row.amt_consumed}}</span>
        </template>
      </el-table-column>
      <el-table-column key="8" min-width="80" label="省点余额">
        <template slot-scope="scope">
          <span class="blue" @click="showAsset(scope.$index, scope.row)">{{scope.row.amnt_token}}</span>
        </template>
      </el-table-column>
      <el-table-column key="9" prop="tme_register" min-width="160" label="注册时间"></el-table-column>

      <el-table-column key="10" label="操作" min-width="110">
				<template slot-scope="scope">
					<el-button size="small" @click="showInvite(scope.$index, scope.row)">邀请的用户</el-button>
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
import util from '../../common/js/util.js'

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
  props: {
    items: {
      type: Object
    }
  },
  methods: {
    // 获取用户列表数据
    getList: function(){
      let that = this;
      let ifoType = this.items.ifoType;
      let param = {
        "ifo_type": ifoType ? ifoType : "-1",
        "dmy_sqn": ifoType ? this.items.dmySqn : "",
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
        name: '用户列表' + util.countList('用户列表'),
        route: '/userList',
      }
      this.$store.dispatch('tabs/addTabs', newTab)
      this.$store.dispatch('tabs/setActive', this.$store.state.tabs.tabs.length-1+'');
      this.$router.push(newTab.route)
    },
    // 查看详情
    showDetail: function(index,row) {
      let detailTab = {
        route: '/userDetail?usrSqn=' + row.usr_sqn,
        name: row.usr_code + '',
        usrSqn : row.usr_sqn
      }
      util.creatTab(detailTab);
      this.$router.push(detailTab.route)
    },
    // 跳转待消费订单列表
    showOrderToConsume: function(index, row) {
      let orderTab = {
        route: '/orderList',
        name: row.usr_code + '待消费订单',
        ifoType: '1',
        dmySqn: row.usr_sqn,
        odrStatus: '0'
      };
      util.creatTab(orderTab);
      this.$router.push(orderTab.route)
    },
    showOrderConsumed: function(index, row) {
      let orderTab = {
        route: '/orderList',
        name: row.usr_code + '已消费订单',
        ifoType: '1',
        dmySqn: row.usr_sqn,
        odrStatus: '1'
      };
      util.creatTab(orderTab);
      this.$router.push(orderTab.route)
    },
    // 跳转资金列表
    showAsset: function(index, row) {
      let assetTab = {
        route: '/assetList',
        name: row.usr_code + '资金',
        ifoType: '0',
        dmySqn: row.usr_sqn
      };
      util.creatTab(assetTab);
      this.$router.push(assetTab.route)
    },
    // 查看邀请的用户
    showInvite: function(index, row) {
      let inviteTab = {
        route: '/userList',
        name: row.usr_code + '的邀请用户',
        ifoType: '1',
        dmySqn: row.usr_sqn,
      };
      util.creatTab(inviteTab);
      this.$router.push(inviteTab.route)
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
}
</script>

<style scoped>
</style>

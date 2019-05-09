<template>
  <section>

    <!-- 搜索框 -->
		<el-form :inline="true" class="searchForm">
			<el-form-item label="店铺状态">
        <el-select v-model="shpStatus" clearable>
          <el-option v-for="item in shpStatusOptions" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
			</el-form-item>
      <el-form-item label="店铺编号">
        <el-input v-model="shpCode" placeholder="店铺编号"></el-input>
			</el-form-item>
      <el-form-item label="店铺名称">
        <el-input v-model="shpName" placeholder="店铺名称"></el-input>
			</el-form-item>
      <el-form-item label="位置">
        <el-input v-model="shpLocation" placeholder="位置"></el-input>
			</el-form-item>
      <el-form-item label="菜系">
        <el-input v-model="dshCategory" placeholder="菜系"></el-input>
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

    <!-- 店铺数据 -->
    <el-table :data="shopList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" border v-cloak>
      <el-table-column key="1" prop="shp_code" min-width="80" label="店铺编号"></el-table-column>
      <el-table-column key="2" prop="shp_name" min-width="130" label="店铺名称"></el-table-column>
      <el-table-column key="3" prop="shp_location" min-width="130" label="位置"></el-table-column>
      <el-table-column key="4" prop="dsh_category" min-width="80" label="菜系"></el-table-column>
      <el-table-column key="5" prop="bkr_code" min-width="80" label="推荐店铺"></el-table-column>
      <el-table-column key="6" prop="shp_status" min-width="110" label="状态"></el-table-column>
      <el-table-column key="7" prop="amt_balance" min-width="80" label="资金金额"></el-table-column>
      <el-table-column key="8" prop="amt_ready" min-width="80" label="待消费额"></el-table-column>
      <el-table-column key="9" prop="amt_consumed" min-width="80" label="已消费额"></el-table-column>
      <el-table-column key="10" prop="tkn_balance" min-width="80" label="省点余额"></el-table-column>
      <el-table-column key="11" prop="tme_register" min-width="160" label="注册时间"></el-table-column>

      <el-table-column key="12" label="操作" min-width="350">
				<template slot-scope="scope">
          <el-button size="small" @click="shpAudit(scope.$index, scope.row)" v-if="scope.row.shp_status=='待审核'">审核</el-button>
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
import { ShopList } from '../../api/api';

export default {
  data() {
    return {
      total: 0,
      page: 1,
      item: 3, //每页显示数量
      itemList: [3,10,20,50],
      listLoading: false,
      sels: [],//列表选中列
      shopList: [], //店铺列表

      shpStatus: '', // 店铺状态
      shpStatusOptions: [
        { value: '0', name: '待入驻' },
        { value: '1', name: '待审核' },
        { value: '2', name: '审核通过' },
        { value: '3', name: '审核驳回' },
        { value: '4', name: '待开通' },
        { value: '5', name: '已开通' },
        { value: '6', name: '已注销' },
        { value: '7', name: '已冻结' }
      ],
      shpCode: '', // 店铺编号
      shpName: '', // 店铺名称
      shpLocation: '', // 位置
      dshCategory: '', // 菜系
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
        "ifo_type": "0",
        "dmy_sqn": "0",
        "shp_code": this.shpCode,
        "shp_name": this.shpName,
        "shp_location": this.shpLocation,
        "dsh_category": this.dshCategory,
        "shp_status": this.shpStatus == '' ? "-1" : this.shpStatus,
        "tme_begin": this.tmeBegin ? this.tmeBegin : "",
        "tme_end": this.tmeEnd ? this.tmeEnd : "",
        "page": this.page.toString(),
        "item": this.item.toString()
      }
      this.listLoading = true;
      ShopList(param).then(res => {
        if (res.data.result == 0){
          that.total = parseInt(res.data.total);
          that.shopList = res.data.list;
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
        name: '店铺列表'+(this.$store.state.tabs.tabs.length),
        route: '/shopList',
      }
      this.$store.dispatch('tabs/addTabs', newTab)
      this.$store.dispatch('tabs/setActive', this.$store.state.tabs.tabs.length-1+'');
      this.$router.push(newTab.route)
    },
    // 查看详情
    showDetail: function(index,row) {
      // let status = row.shp_status == '待审核' || row.shp_status == "审核未通过" || row.shp_status == "待开通" ? "0" : "1";
      let detailTab = {
        route: '/shopDetail',
        name: row.shp_code + '',
        shpSqn : row.shp_sqn
      }
      this.$store.dispatch('tabs/addTabs', detailTab);
      this.$store.dispatch('tabs/setActive', this.$store.state.tabs.tabs.length-1+'');
      this.$router.push(detailTab.route)
    },
    // 审核店铺
    shpAudit: function(index, row) {
      let auditTab = {
        route: '/shopAudit',
        name: '审核店铺'+row.shp_code,
        shpSqn : row.shp_sqn
      }
      this.$store.dispatch('tabs/addTabs', auditTab);
      this.$store.dispatch('tabs/setActive', this.$store.state.tabs.tabs.length-1+'');
      this.$router.push(auditTab.route)
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

    //FIXME: 多人测试时用别人的cnckey，防止生成多个，失效
    // let userInfo = {
    //   'cnckey': '1D067C21',
    //   'userName': '唐某某'
    // }
    // localStorage.setItem("userInfo", JSON.stringify(userInfo));
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

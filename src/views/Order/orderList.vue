<template>
  <section>

    <!-- 搜索框 -->
		<el-form :inline="true" class="searchForm">
      <el-form-item label="店铺编号">
        <el-input v-model="shpCode" placeholder="店铺编号" clearable></el-input>
			</el-form-item>
      <el-form-item label="店铺名称">
        <el-input v-model="shpName" placeholder="店铺名称" clearable></el-input>
			</el-form-item>
      <el-form-item label="用户账号">
        <el-input v-model="usrMobile" placeholder="用户账号" clearable></el-input>
			</el-form-item>
      <el-form-item label="订单编号">
        <el-input v-model="odrInternal" placeholder="订单编号" clearable></el-input>
			</el-form-item>
      <el-form-item label="状态">
        <el-select v-model="odrStatus" clearable>
          <el-option v-for="item in odrStatusOptions" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
			</el-form-item>
		</el-form>
    <el-form :inline="true">
      <el-form-item label="交易时间">
        <el-date-picker v-model="tmeBegin" type="datetime" placeholder="开始时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker> 至 <el-date-picker v-model="tmeEnd" type="datetime" placeholder="结束时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
			</el-form-item>
      <el-form-item>
				<el-button type="primary" @click="getList">查询</el-button>
			</el-form-item>
      <el-form-item>
				<el-button type="primary" @click="newSearch">新建查询</el-button>
			</el-form-item>
    </el-form>

    <!-- 订单数据 -->
    <el-table :data="orderList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" border tooltip-effect="light">
      <el-table-column key="1" prop="shp_code" min-width="80" label="店铺编号"></el-table-column>
      <el-table-column key="2" prop="shp_name" min-width="130" label="店铺名称" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column key="3" prop="usr_mobile" min-width="130" label="用户账号"></el-table-column>
      <el-table-column key="4" prop="odr_internal" min-width="130" label="订单编号"></el-table-column>
      <el-table-column key="5" prop="cpn_prefix" min-width="130" label="活动编号"></el-table-column>
      <el-table-column key="6" prop="spl_type" min-width="80" label="支付方式">
        <template slot-scope="scope">
          <span>{{scope.row.odr_status==0?'支付宝':scope.row.odr_status==1?'微信':'银联'}}</span>
        </template>
      </el-table-column>
      <el-table-column key="7" prop="cpn_now" min-width="80" label="优惠券数量"></el-table-column>
      <el-table-column key="8" prop="odr_status" min-width="80" label="状态">
        <template slot-scope="scope">
          <span>{{scope.row.odr_status==0?'待消费':scope.row.odr_status==1?'已消费':'已退款'}}</span>
        </template>
      </el-table-column>
      <el-table-column key="9" prop="tme_log" min-width="160" label="交易时间"></el-table-column>
      
      <el-table-column key="10" label="操作" min-width="80">
				<!-- <template slot-scope="scope">
					<el-button size="small" @click="showDetail(scope.$index, scope.row)">查看</el-button>
				</template> -->
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
import { OrderList } from '../../api/api';

export default {
  data() {
    return {
      total: 0,
      page: 1,
      item: 10, //每页显示数量
      itemList: [10,20,50],
      listLoading: false,
      sels: [],//列表选中列
      orderList: [], //订单列表

      shpCode: '', // 店铺编号
      shpName: '',  // 店铺名称
      usrMobile: '', // 用户账号
      odrInternal: '', //订单编号
      odrStatus: '', // 状态
      odrStatusOptions: [
        { value: 0, name: '待消费'},
        { value: 1, name: '已消费'},
        { value: 2, name: '已退款'}
      ],
      tmeBegin: '', // 开始时间
      tmeEnd: '', // 结束时间
    }
  },
  props: {
    items: {
      type: Object
    }
  },
  methods: {
    // 获取订单列表数据
    getList: function(){
      let that = this;
      let ifoType = this.items.ifoType
      let param = {
        "ifo_type": ifoType ? ifoType : "-1",
        "dmy_sqn": ifoType ? this.items.dmySqn : "",
        "shp_code": this.shpCode,
        "shp_name": this.shpName,
        "usr_mobile": this.usrMobile,
        "odr_internal": this.odrInternal,
        "odr_status": this.odrStatus,
        "tme_begin": this.tmeBegin ? this.tmeBegin : "",
        "tme_end": this.tmeEnd ? this.tmeEnd : "",
        "page": this.page.toString(),
        "item": this.item.toString()
      }
      this.listLoading = true;
      OrderList(param).then(res => {
        if (res.data.result == 0){
          that.total = parseInt(res.data.total);
          that.orderList = res.data.list;
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
        name: '活动列表'+(this.$store.state.tabs.tabs.length),
        route: '/orderList',
      }
      this.$store.dispatch('tabs/addTabs', newTab)
      this.$store.dispatch('tabs/setActive', this.$store.state.tabs.tabs.length-1+'');
      this.$router.push(newTab.route)
    },
    // 查看详情
    showDetail: function(index,row) {
      let detailTab = {
        route: '/activeDetail',
        name: row.cpn_prefix + '',
        evtSqn : row.evt_sqn
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
}
</script>

<style scoped>
</style>

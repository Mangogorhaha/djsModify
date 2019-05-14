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
      <el-form-item label="面值">
        <el-input v-model="amtFace" placeholder="面值" clearable></el-input>
			</el-form-item>
      <el-form-item label="状态">
        <el-select v-model="evtStatus" clearable>
          <el-option v-for="item in evtStatusOptions" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
			</el-form-item>
		</el-form>
    <el-form :inline="true">
      <el-form-item label="发布时间">
        <el-date-picker v-model="tmeBegin" type="datetime" placeholder="开始时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker> 至 <el-date-picker v-model="tmeEnd" type="datetime" placeholder="结束时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
			</el-form-item>
      <el-form-item>
				<el-button type="primary" @click="getList">查询</el-button>
			</el-form-item>
      <el-form-item>
				<el-button type="primary" @click="newSearch">新建查询</el-button>
			</el-form-item>
    </el-form>

    <!-- 活动数据 -->
    <el-table :data="activeList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" border tooltip-effect="light">
      <el-table-column key="1" prop="shp_code" min-width="80" label="店铺编号"></el-table-column>
      <el-table-column key="2" prop="shp_name" min-width="130" label="店铺名称" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column key="3" prop="cpn_prefix" min-width="130" label="活动编号"></el-table-column>
      <el-table-column key="4" prop="amt_face" min-width="80" label="面值"></el-table-column>
      <el-table-column key="5" prop="amt_price" min-width="80" label="售价"></el-table-column>
      <el-table-column key="6" prop="cnt_total" min-width="80" label="数量"></el-table-column>
      <el-table-column key="7" min-width="80" label="状态">
        <template slot-scope="scope">
          <span>{{scope.row.evt_status==1?'正常':'结束'}}</span>
        </template>
      </el-table-column>
      <el-table-column key="8" prop="tme_log" min-width="160" label="发布时间"></el-table-column>
      <el-table-column key="9" prop="tme_end" min-width="160" label="注册时间"></el-table-column>

      <el-table-column key="10" label="操作" min-width="80">
				<template slot-scope="scope">
					<el-button size="small" @click="showDetail(scope.$index, scope.row)">查看</el-button>
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
import { ActiveList } from '../../api/api';

export default {
  data() {
    return {
      total: 0,
      page: 1,
      item: 10, //每页显示数量
      itemList: [10,20,50],
      listLoading: false,
      sels: [],//列表选中列
      activeList: [], //活动列表

      shpCode: '', // 店铺编号
      shpName: '',  // 店铺名称
      amtFace: '', // 面值
      evtStatus: '', // 状态
      evtStatusOptions: [
        { value: 1, name: '正常'},
        { value: 2, name: '结束'},
      ],
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
    // 获取活动列表数据
    getList: function(){
      let that = this;
      let ifoType = this.items.ifoType
      let param = {
        "ifo_type": ifoType ? ifoType : "-1",
        "dmy_sqn": ifoType ? this.items.dmySqn : "",
        "shp_code": this.shpCode,
        "shp_name": this.shpName,
        "amt_face": this.amtFace,
        "evt_status": this.evtStatus,
        "tme_begin": this.tmeBegin ? this.tmeBegin : "",
        "tme_end": this.tmeEnd ? this.tmeEnd : "",
        "page": this.page.toString(),
        "item": this.item.toString()
      }
      this.listLoading = true;
      ActiveList(param).then(res => {
        if (res.data.result == 0){
          that.total = parseInt(res.data.total);
          that.activeList = res.data.list;
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
        route: '/activeList',
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

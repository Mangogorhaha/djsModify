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
      <el-form-item label="评价类型">
        <el-input v-model="cmtType" placeholder="评价类型" clearable></el-input>
			</el-form-item>
      <el-form-item label="举报状态">
        <el-input v-model="rptStatus" placeholder="举报状态" clearable></el-input>
			</el-form-item>
		</el-form>
    <el-form :inline="true">
      <el-form-item label="评价时间">
        <el-date-picker v-model="tmeBegin" type="datetime" placeholder="开始时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker> 至 <el-date-picker v-model="tmeEnd" type="datetime" placeholder="结束时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
			</el-form-item>
      <el-form-item>
				<el-button type="primary" @click="getList">查询</el-button>
			</el-form-item>
      <el-form-item>
				<el-button type="primary" @click="newSearch">新建查询</el-button>
			</el-form-item>
    </el-form>

    <!-- 评价数据 -->
    <el-table :data="cmtList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" border tooltip-effect="light">
      <el-table-column key="1" prop="shp_code" min-width="80" label="店铺编号"></el-table-column>
      <el-table-column key="2" prop="shp_name" min-width="130" label="店铺名称" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column key="3" prop="usr_mobile" min-width="130" label="用户账号"></el-table-column>
      <el-table-column key="4" min-width="80" label="类型">
        <template slot-scope="scope">
          <span>{{scope.row.cmt_type==0?'一般':scope.row.cmt_type==1?'好评':'差评'}}</span>
        </template>
      </el-table-column>
      <el-table-column key="5" min-width="80" label="举报状态">
        <template slot-scope="scope">
          <span>{{scope.row.rpt_status==0?'可以举报':scope.row.rpt_status==1?'等待处理':'无效举报'}}</span>
        </template>
      </el-table-column>
      <el-table-column key="6" prop="cmt_text" min-width="250" label="评价内容" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column key="7" prop="cmt_reply" min-width="250" label="回复内容" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column key="8" prop="tme_register" min-width="160" label="提交时间"></el-table-column>

      <el-table-column key="9" label="操作" min-width="110">
				<template slot-scope="scope">
          <el-button size="small" @click="cmtAudit(scope.$index, scope.row)" v-if="scope.row.rpt_status==1">处理</el-button>
					<el-button size="small" @click="showDetail(scope.$index, scope.row)" v-else>查看</el-button>
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
import { CommentList, CommentDetail } from '../../api/api';
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
      cmtList: [], //评价列表

      shpCode: '', // 店铺编号
      shpName: '', // 店铺名称
      usrMobile: '', // 用户账号
      cmtType: '', // 评价类型
      rptStatus: '', // 举报状态
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
    // 获取评价列表数据
    getList: function(){
      let that = this;
      let ifoType = this.items.ifoType;
      let param = {
        "ifo_type": ifoType ? ifoType : "-1",
        "dmy_sqn": ifoType ? this.items.dmySqn : "",
        "shp_code": this.shpCode,
        "shp_name": this.shpName,
        "usr_mobile": this.usrMobile,
        "cmt_type": this.cmtType,
        "rpt_status": this.rptStatus,
        "tme_begin": this.tmeBegin ? this.tmeBegin : "",
        "tme_end": this.tmeEnd ? this.tmeEnd : "",
        "page": this.page.toString(),
        "item": this.item.toString()
      }
      this.listLoading = true;
      CommentList(param).then(res => {
        if (res.data.result == 0){
          that.total = parseInt(res.data.total);
          that.cmtList = res.data.list;
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
        name: '评论列表' + util.countList('评论列表'),
        route: '/cmtList',
      }
      this.$store.dispatch('tabs/addTabs', newTab)
      this.$store.dispatch('tabs/setActive', this.$store.state.tabs.tabs.length-1+'');
      this.$router.push(newTab.route)
    },
    // 查看详情
    showDetail: function(index,row) {
      let detailTab = {
        route: '/cmtDetail?cmtSqn=' + row.cmt_sqn,
        name: row.shp_code + '店铺评价',
        cmtSqn : row.cmt_sqn
      }
      util.creatTab(detailTab);
      this.$router.push(detailTab.route)
    },
    // 处理举报
    cmtAudit: function(index, row) {
      let auditTab = {
        route: '/cmtAudit?cmtSqn=' + row.cmt_sqn,
        name: row.shp_code + '举报处理',
        cmtSqn : row.cmt_sqn
      }
      util.creatTab(auditTab);
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
  }
}
</script>

<style scoped>
</style>

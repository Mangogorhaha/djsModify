<template>
  <section>
    <!-- 顶部表格 -->
    <table class="topTable" v-if="!searchPage">
      <tr>
        <td class="t-tit">今日银行卡提现笔数：</td>
        <td>0</td>
        <td class="t-tit">今日微信提现笔数：</td>
        <td>1</td>
        <td class="t-tit">今日支付宝提现笔数：</td>
        <td>2</td>
        <td class="t-tit">可提现总余额：</td>
        <td>3</td>
      </tr>
      <tr>
        <td class="t-tit">金额：</td>
        <td>4</td>
        <td class="t-tit">金额：</td>
        <td>5</td>
        <td class="t-tit">金额：</td>
        <td>6</td>
        <td class="t-tit">累计提现金额：</td>
        <td>7</td>
      </tr>
    </table>

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

    <!-- 路由选项 -->
    <el-radio-group v-model="radio" @change="changeLabel(radio)">
      <el-radio label="0">银行卡提现</el-radio>
      <el-radio label="1">微信提现</el-radio>
      <el-radio label="2">支付宝提现</el-radio>
    </el-radio-group>
    <el-button type="primary" @click.native='search' v-if="!searchPage">查询提现</el-button>

    <!-- 提现记录数据 -->
    <el-table :data="drawoutList.slice((page-1)*20,page*20)" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" border>
      <el-table-column prop="odr_internal" key="1" label="提现单号" min-width="130">
			</el-table-column>
			<el-table-column prop="tme_log" key="2" label="提现时间" min-width="130">
			</el-table-column>
			<el-table-column prop="mobile" key="3" label="提现账号" min-width="130">
			</el-table-column>
			<el-table-column prop="shp_code" key="4" label="店铺编号" min-width="130">
			</el-table-column>
			<el-table-column prop="shp_name" key="5" label="店铺名称" min-width="130">
			</el-table-column>
			<el-table-column prop="amt_order" key="6" label="提现金额" min-width="110">
			</el-table-column>
			<el-table-column prop="acc_name" key="7" label="持卡人" min-width="110" v-if="radio=='0'">
			</el-table-column>
			<el-table-column prop="acc_number" key="8" label="卡号" min-width="160" v-if="radio=='0'">
			</el-table-column>
			<el-table-column prop="" key="9" label="微信账号" min-width="160" v-if="radio=='1'">
			</el-table-column>
			<el-table-column prop="" key="10" label="支付宝账号" min-width="160" v-show="radio=='2'">
			</el-table-column>
			<el-table-column prop="" key="11" label="交易单号" min-width="160" v-show="radio!='0'">
			</el-table-column>
      <el-table-column label="操作" key="12">
				<template slot-scope="scope">
					<el-button size="small" @click="handleForm(scope.$index, scope.row)">处理</el-button>
				</template>
			</el-table-column>
    </el-table>

    <!--分页栏-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-size="20" :page-sizes="[20,50,100]" :total="total" style="float:right;">
			</el-pagination>
      <el-button type="primary" @click="exported">导出</el-button>
		</el-col>

    <!--处理界面-->
		<el-dialog :visible.sync="handleFormVisible" title="提现处理" center>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click.native="handleCardDrawout(1)">通过</el-button>
				<el-button type="danger" @click.native="handleCardDrawout(0)">拒绝</el-button>
			</div>
		</el-dialog>

    <!-- 导出弹出框 -->
    <el-dialog title="导出" :visible.sync="isExported" >
      选择要导出的时间： 
      <el-date-picker v-model="dateRange" type="daterange" format="yyyy-MM-dd" 
        value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
      </el-date-picker>
      <span slot="footer">
        <el-button @click="isExported = false">取 消</el-button>
        <el-button type="primary" @click="confirmExported">确 定</el-button>
      </span>
    </el-dialog>
    
    
  </section>
</template>

<script>
import { GetDrawoutList, CardDrawout } from '../api/api';

export default {
  data() {
    return {
      radio: '2',
      total: 0,
      page: 1,
      item: 20,
      listLoading: false,
			sels: [],//列表选中列

      drawoutList: [],
      handleFormVisible: false,//处理界面是否显示
      pay_sqn: '',

      // 导出
      isExported: false,
      dateRange: [],
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() > Date.now() //禁选今天之后的时间
        }
      },
      
      // 查询
      keyword: '',
      options: [
        { value: "0", label: "提现账户" },
        { value: "1", label: "店铺编号" },
        { value: "2", label: "店铺名称" },
        { value: "3", label: "持卡人" },
        { value: "4", label: "卡号" },
        { value: '5', label: '支付宝账号' },
        { value: '6', label: '微信账号' },
        { value: "7", label: "提现单号" },
        { value: '8', label: '交易单号' }
      ],
      value: '0',
		}
  },
  props: {
    searchPage: {
      type: Boolean,
      default: false
    }
  },
  methods: {
		// TODO: 获取顶部表格数据
		
		// 获取提现列表数据
		getList: function(){
      let param = {
        "cnckey": this.$store.state.user.userInfo.cnckey,
        "spl_type": this.radio,
				"pay_type": '1', //0充值，1提现
        "page": this.page.toString(),
				"item": this.item.toString()
      }
      this.listLoading = true;
      GetDrawoutList(param).then(res => {
        if (res.data.result == 0){
          this.total = parseInt(res.data.total);
          this.drawoutList = res.data.list;
          this.listLoading = false;
        }else{
          this.$message({
            message: res.data.message,
            type: 'error'
          });
        }
			})
    },
    // 查询提现记录
    search: function(){
      let searchInfo = {
        isSearch: ++this.$store.state.search.searchInfo.isSearch,
        searchTabName: '查询提现'
      }
      this.$store.dispatch('search/setSearchStatus', searchInfo)
    },
    // 修改查询条件
    changeValue: function(e) {
      this.value = e;
    },
    //TODO: 调用接口，传keyword后台返回数据
    searchByKeyword: function() {
      // let param = {
      //   "cnckey": this.$store.state.user.userInfo.cnckey,
      //   "shp_status": this.radio.toString(),
      //   "condition_status": this.value.toString(),
      //   "condition": this.keyword,
      //   "page": this.page.toString(),
      //   "item": this.item.toString(),
      // }
      // Search(param).then(res => {
      //   console.log(res);
      //   this.listData = res.data;
      // })
    },

    // 切换路由
    changeLabel: function(e) {
      if (!this.searchPage){
        let routers = ['/card','/wechat','/alipay'];
        this.$router.push(routers[e]+'?index='+1);
      }else this.getList();
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
  
    // 处理界面
    handleForm: function (index, row) {
      this.handleFormVisible = true;
      this.pay_sqn = row.pay_sqn
    },
    handleCardDrawout: function(e) {
      let param = {
        "cnckey": this.$store.state.user.userInfo.cnckey,
        "pay_sqn": this.pay_sqn.toString(),
        "flg_result": e.toString()
      }
      CardDrawout(param).then(res => {
        if(res.data.result == 0){
					if (e == 0){
						this.$message({
							message: '提现成功',
							type: 'success'
						});
					}else if (e == 1){
						this.$message({
							message: '拒绝提现',
							type: 'success'
						});
          }
          this.handleFormVisible = false;
          this.getList();
        }else{
          this.$message({
            message: '操作失败,原因：' + res.data.message,
            type: 'error'
          });
				}
      })
    },

    // 显示导出弹窗
    exported: function(){
      this.isExported = true;
    },
    // 确认导出
    confirmExported: function(){
      let minDate = new Date(this.dateRange[0]).getTime();
      let maxDate = new Date(this.dateRange[1]).getTime();
      // 计算选择的时间间隔
      let range = Math.abs((maxDate - minDate))/(1000*60*60*24);
      if(range > 7){
        this.$message({
          message: '所选时间间隔不得超过7天',
          type: 'error'
        })
        return;
      }
      // 调用接口查询时间段内数据，导出 TODO:提现列表另外调接口
      // 导出的表头名信息
      const tHeader = ['提现单号','提现时间','提现账号','店铺编号','店铺名称','提现金额','持卡人','卡号'];
      // 导出的表头字段名，需要导出表格字段名
      const filterVal = ['odr_internal','tme_log', 'mobile', 'shp_code','shp_name','提现金额','acc_name','acc_number'];
      // 参数：表头，字段名，导出内容，excel文件名
      util.exportExcel(tHeader,filterVal,this.drawoutList,"提现列表")
    }
	},
	mounted() {  
    this.getList();
  },
  watch: {
    $route( to , from ){
      this.getList();
    },
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
	margin: 20px 0;
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
.el-radio {
	width: 250px;
}

</style>

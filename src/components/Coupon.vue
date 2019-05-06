<template>
  <section>
    <!-- 顶部表格 -->
    <table class="topTable">
      <tr>
        <td class="t-tit">待购买优惠券总数量：</td>
        <td>0</td>
        <td class="t-tit">待消费优惠券总数量：</td>
        <td>1</td>
        <td class="t-tit">有待购买优惠券的店铺数：</td>
        <td>2</td>
      </tr>
      <tr>
        <td class="t-tit">总金额：</td>
        <td>4</td>
        <td class="t-tit">总金额：</td>
        <td>5</td>
        <td class="t-tit">有待消费优惠券的店铺数：</td>
        <td>6</td>
      </tr>
    </table>

    <!-- 路由选项 -->
    <el-radio-group v-model="radio" @change="changeLabel(radio)">
      <el-radio label="1">正在进行中的优惠活动</el-radio>
      <el-radio label="0">已完结的优惠活动</el-radio>
    </el-radio-group>
    <el-button type="primary" @click.native='search' v-if="!searchPage">查询优惠券</el-button>

    <!-- 充值记录数据 -->
    <el-table :data="couponList.slice((page-1)*20,page*20)" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" border>
      <el-table-column prop="odr_internal" key="1" label="优惠活动编号" min-width="130">
			</el-table-column>
			<el-table-column prop="tme_log" key="2" label="发布时间" min-width="130">
			</el-table-column>
			<el-table-column prop="mobile" key="3" label="店铺编号" min-width="130">
			</el-table-column>
			<el-table-column prop="shp_code" key="4" label="店铺名称" min-width="130">
			</el-table-column>
			<el-table-column prop="shp_name" key="5" label="面值" min-width="110">
			</el-table-column>
			<el-table-column prop="" key="6" label="售价" min-width="110">
			</el-table-column>
			<el-table-column prop="acc_name" key="7" label="发布数量" min-width="110">
			</el-table-column>
			<el-table-column prop="acc_number" key="8" label="待购买数量" min-width="110">
			</el-table-column>
			<el-table-column prop="" key="9" label="失效时间" min-width="130">
			</el-table-column>
      <el-table-column key="10" label="操作" min-width="80">
				<template slot-scope="scope">
          <el-button size="small" @click="isExamine(scope.$index, scope.row)">查看</el-button>
				</template>
			</el-table-column>
    </el-table>

    <!--分页栏-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
    
  </section>
</template>

<script>
// todo 提现接口换成充值接口
import { GetDrawoutList, CardDrawout } from '../api/api';

export default {
  data() {
    return {
      radio: '0',
      total: 0,
      page: 1,
      item: 20,
      listLoading: false,
			sels: [],//列表选中列

      couponList: [],
      
		}
  },
  props: {
    searchPage: {
      type: Boolean,
      default: false
    }
  },
  methods: {
		// TODO 获取顶部表格数据
		
		// 获取优惠券列表数据
		getList: function(){
      let param = {
        "cnckey": this.$store.state.user.userInfo.cnckey,
        "spl_type": this.radio,
				"pay_type": '1', //0充值，1充值
        "page": this.page.toString(),
				"item": this.item.toString()
      }
      this.listLoading = true;
      GetDrawoutList(param).then(res => {
        if (res.data.result == 0){
          this.total = parseInt(res.data.total);
          this.couponList = res.data.list;
          this.listLoading = false;
        }
			})
    },

    handleCurrentChange(val) {
      this.page = val;
    },
    selsChange: function (sels) {
      this.sels = sels;
    },
	},
	mounted() {    
    // this.radio = this.$route.meta.radio;
    // this.getList();
  },
  watch: {
    $route( to , from ){
      this.getList();
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
	width: 180px;
}
.t-tit {
	background: lightblue;
	text-align: right;
}
.el-radio {
	width: 400px;
}

</style>

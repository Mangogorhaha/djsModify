<template>
  <section>
    <!-- 顶部表格 -->
    <table class="topTable">
      <tr>
        <td class="t-tit">待消费总金额：</td>
        <td>0</td>
        <td class="t-tit">已消费总金额：</td>
        <td>1</td>
        <td class="t-tit">退款总金额：</td>
        <td>2</td>
      </tr>
      <tr>
        <td class="t-tit">用户量：</td>
        <td>4</td>
        <td class="t-tit">用户量：</td>
        <td>5</td>
        <td class="t-tit">用户量：</td>
        <td>6</td>
      </tr>
    </table>
    
    <!-- 充值记录数据 -->
    <el-table :data="orderList.slice((page-1)*20,page*20)" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" border>
      <el-table-column prop="odr_internal" key="1" label="购买时间" min-width="130">
			</el-table-column>
			<el-table-column prop="tme_log" key="2" label="用户编号" min-width="130">
			</el-table-column>
			<el-table-column prop="mobile" key="3" label="用户账户" min-width="130">
			</el-table-column>
			<el-table-column prop="shp_code" key="4" label="支付金额" min-width="110">
			</el-table-column>
			<el-table-column prop="shp_name" key="5" label="支付方式" min-width="110">
			</el-table-column>
			<el-table-column prop="" key="6" label="优惠券编码" min-width="110">
			</el-table-column>
			<el-table-column prop="acc_name" key="7" label="优惠券名称" min-width="130">
			</el-table-column>
			<el-table-column prop="acc_number" key="8" label="店铺名称" min-width="130">
			</el-table-column>
			<el-table-column prop="" key="9" label="订单状态" min-width="110">
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
      radio: '2',
      total: 0,
      page: 1,
      item: 20,
      listLoading: false,
			sels: [],//列表选中列

      orderList: [],
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
		
		// 获取订单列表数据
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
          this.orderList = res.data.list;
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
	width: 150px;
}
.t-tit {
	background: lightblue;
	text-align: right;
}
.el-radio {
	width: 150px;
}

</style>

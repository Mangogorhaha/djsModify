<template>
  <section>
    <el-row class="dialog_title">
      <el-col :span="12">待消费明细列表</el-col>
      <el-col :span="6">待消费优惠券总数：{{dataList.count_coupon_to_consume}}</el-col>
      <el-col :span="6">待消费优惠券总余额：<span>{{dataList.amount_coupon_to_consume}}</span></el-col>
    </el-row>
    <el-table :data="tableList.slice((page-1)*item,page*item)" border highlight-current-row max-height="560">
      <el-table-column prop="tme_log" key="0" label="购买时间" min-width="110">
      </el-table-column>
      <el-table-column prop="usr_name" key="1" label="用户" min-width="80">
      </el-table-column>
      <el-table-column prop="usr_account" key="2" label="用户账号" min-width="110">
      </el-table-column>
      <el-table-column prop="pay_price" key="3" label="支付金额" min-width="80">
      </el-table-column>
      <el-table-column prop="pay_type" key="4" label="支付方式" min-width="80">
      </el-table-column>
      <el-table-column prop="coupon_code" key="5" label="优惠券编码" min-width="80">
      </el-table-column>
      <el-table-column prop="coupon_name" key="6" label="优惠券名称" min-width="110">
      </el-table-column>
      <el-table-column key="7" label="订单状态" min-width="80">
        待消费
      </el-table-column>
    </el-table>

    <!--分页栏-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-size="20" :page-sizes="[20,50,100]" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
  </section>
</template>

<script>
import { ShopcouponToConsume } from '../../api/api'

export default {
  data() {
    return {
      dataList: [],
      tableList: [],
      sideBar: [],
      page: 1,
      item: 20,
      total: 0
    }
  },
  props: {
    shpSqn: {
      type: String
    }
  },
  methods: {
    getList: function(){
      let param = {
        "cnckey": this.$store.state.user.userInfo.cnckey,
        "shp_sqn": this.shpSqn,
        "page": this.page.toString(),
        "item": this.item.toString()
      };
      ShopcouponToConsume(param).then(res => {
        if(res.data.result == 0){
          this.dataList = res.data;
          this.sideBar = res.data.count;
          this.tableList = res.data.list;
          this.total = parseInt(res.data.total);
          this.$emit('sideBar', this.sideBar)
        }else {
          this.$message({
            message: res.data.message,
            type: 'error'
          });
        }
      })
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
  created() {
    this.getList()
  }
}
</script>

<style scoped>
</style>

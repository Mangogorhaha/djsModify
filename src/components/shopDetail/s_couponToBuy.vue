<template>
  <section>
    <el-row class="dialog_title">
      <el-col :span="12">待购买明细列表</el-col>
      <el-col :span="6">待购买优惠券总数：{{dataList.count_coupon_to_buy}}</el-col>
      <el-col :span="6">待购买优惠券总余额：<span>{{dataList.amount_coupon_to_buy}}</span></el-col>
    </el-row>
    <el-table :data="tableList.slice((page-1)*item,page*item)" border highlight-current-row max-height="560">
      <el-table-column prop="evt_sqn" key="0" label="优惠活动编号" min-width="140">
      </el-table-column>
      <el-table-column prop="tme_log" key="1" label="发布时间" min-width="140">
      </el-table-column>
      <el-table-column prop="amt_face" key="2" label="面值" min-width="140">
      </el-table-column>
      <el-table-column prop="amt_price" key="3" label="售价" min-width="140">
      </el-table-column>
      <el-table-column prop="cnt_total" key="4" label="发布数量" min-width="160">
      </el-table-column>
      <el-table-column prop="cnt_tobuy" key="5" label="待购买数量" min-width="160">
      </el-table-column>
      <el-table-column prop="tme_exprtion" key="6" label="失效时间" min-width="160">
      </el-table-column>
      <el-table-column key="7" label="操作" min-width="80">
        <template slot-scope="scope">
          <el-button size="small" @click="showDetail(scope.$index, scope.row)">查看</el-button>
				</template>
      </el-table-column>
    </el-table>

    <!--分页栏-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-size="20" :page-sizes="[20,50,100]" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

    <el-dialog :visible.sync="isShowDetail" append-to-body>
      <div slot="title">
				<span class="dia_tit">店铺编号：</span>
				<span class="dia_tit">店铺名称：</span>
			</div>
      <el-row class="top">
        <el-col :span="8">活动编号：</el-col>
        <el-col :span="6">面值：</el-col>
        <el-col :span="6">售价：</el-col>
        <el-col :span="4">发布数量：</el-col>
      </el-row>
      <div class="middle">
        <div>
          <div class="pieChart">待购买/待消费/已消费饼状占比图</div>
        </div>
        <div class="item">
          <div>待购买数量：4534534</div>
          <div>待消费数量：23432</div>
          <div>已消费数量：2</div>
        </div>
        <div class="item">
          <div>待购买总金额：65</div>
          <div>待消费总金额：432</div>
          <div>已消费总金额：57657</div>
        </div>
      </div>
      <el-row class="bottom">
        <el-col :span="18">发布时间：</el-col>
        <el-col :span="6">失效日期：</el-col>
      </el-row>
    </el-dialog>
    
  </section>
</template>

<script>
import { ShopCouponToBuy } from '../../api/api'

export default {
  data() {
    return {
      dataList: [],
      tableList: [],
      sideBar: [],
      page: 1,
      item: 20,
      total: 0,

      isShowDetail: false
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
      ShopCouponToBuy(param).then(res => {
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
    // 显示详情
    showDetail: function(index,row){
      this.isShowDetail = true;
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style scoped lang="scss">
.dia_tit {
  margin-right: 30px;
}
.middle {
  margin: 10px 0;
  background: #F2F2F2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 50px;
  .pieChart {
    width: 150px;
    height: 150px;
    background: pink;
    border-radius: 50%;
  }
  .item div {
    line-height: 30px;
  }
  .item:last-child {
    margin-right: 80px;
  }
}
</style>

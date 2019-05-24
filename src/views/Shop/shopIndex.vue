<template>
  <section>
    <table class="topTable">
      <tr>
        <td>店铺总数：</td><td>{{dataList.cnt_shp_total}}</td>
        <td>被邀店数：</td><td>{{dataList.cnt_shp_invttion}}</td>
        <td>开通店数：</td><td>{{dataList.cnt_shp_open}}</td>
        <td>分享次数：</td><td>{{dataList.cnt_share}}</td>
        <td>评价次数：</td><td>{{dataList.cnt_comment}}</td>
      </tr>
      <tr>
        <td>用户总数：</td><td>{{dataList.cnt_usr_total}}</td>
        <td>资金金额：</td><td>{{dataList.amt_balance}}</td>
        <td>待消费额：</td><td>{{dataList.amt_ready}}</td>
        <td>已消费额：</td><td>{{dataList.amt_consumed}}</td>
        <td>省点余额：</td><td>{{dataList.tkn_balance}}</td>
      </tr>
    </table>
    <el-row class="chart_item">
      <el-col :span="12"><ve-line :data="chartData" :settings="chartSettings"></ve-line></el-col>
      <el-col :span="12"><ve-pie :data="chartData"></ve-pie></el-col>
    </el-row>
  </section>
</template>

<script>
import { ShopIndex } from '../../api/api'

export default {
  data: function () {
    this.chartSettings = {
      labelMap: {
        day_settle: '日期',
        cnt_total: '评论数量'
      }
    }
    return {
      dataList: [],
      chartData: {
        columns: [],
        rows: []
      }
    }
  },
  methods: {
    getData: function() {
      let param = {
        "ifo_type": "-1",
        "dmy_sqn": "0"
      };
      ShopIndex(param).then(res => {
        if(res.data.result == 0) {
          this.dataList = res.data;
          this.chartData.columns = res.data.columns;
          this.chartData.rows = res.data.rows;
        }
      })
    }
  },
  mounted() {
    this.getData();

    //FIXME: 多人测试时用别人的cnckey，防止生成多个，失效
    // let userInfo = {
<<<<<<< HEAD
    //   'cnckey': '3B86424B',
=======
    //   'cnckey': '321C1E9',
>>>>>>> 6a0bbe904a5503efa9c99ee7e70e4426f6ceeb26
    //   'userName': '唐某某'
    // }
    // localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }
}
</script>

<style lang="scss" scoped>
</style>

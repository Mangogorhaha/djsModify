<template>
  <section>
    <table class="topTable">
      <tr>
        <td>今日银行卡提现笔数：</td><td>0</td>
        <td>今日微信提现笔数：</td><td>1</td>
        <td>今日支付宝提现笔数：</td><td>2</td>
        <td>可提现总余额：</td><td>3</td>
      </tr>
      <tr>
        <td>金额：</td><td>4</td>
        <td>金额：</td><td>5</td>
        <td>金额：</td><td>6</td>
        <td>累计提现金额：</td><td>7</td>
      </tr>
    </table>

    <el-row class="chart_item">
      <el-col :span="12"><ve-line :data="chartData"></ve-line></el-col>
      <el-col :span="12"><ve-pie :data="chartData"></ve-pie></el-col>
    </el-row>
  </section>
</template>

<script>
import { AssetIndex } from '../../api/api'

export default {
  data: function () {
    return {
      dataList: [],
      chartData: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
          { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
          { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
          { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
          { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
          { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
        ]
      }
    }
  },
  methods: {
    getData: function() {
      let param = {
        "ifo_type": "-1",
        "dmy_sqn": "0"
      };
      AssetIndex(param).then(res => {
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
  }
}
</script>

<style lang="scss" scoped>
</style>

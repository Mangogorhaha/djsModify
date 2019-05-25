<template>
  <section>
    <table id="topTable">
      <thead>
        <tr>
          <th>全部</th>
          <th>进行中</th>
          <th>待消费额</th>
          <th>已消费额</th>
          <th>分享次数</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{dataList.cnt_total}}</td>
          <td>{{dataList.cnt_doing}}</td>
          <td>{{dataList.amt_ready}}</td>
          <td>{{dataList.amt_consumed}}</td>
          <td>{{dataList.cnt_share}}</td>
        </tr>
      </tbody>
    </table>

    <el-row class="chart_item">
      <el-col :span="12"><ve-line :data="chartData"></ve-line></el-col>
      <el-col :span="12"><ve-pie :data="chartData"></ve-pie></el-col>
    </el-row>
  </section>
</template>

<script>
import { ActiveIndex } from '../../api/api'

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
      ActiveIndex(param).then(res => {
        if(res.data.result == 0) {
          this.dataList = res.data;
          // this.chartData.columns = res.data.columns;
          // this.chartData.rows = res.data.rows;
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

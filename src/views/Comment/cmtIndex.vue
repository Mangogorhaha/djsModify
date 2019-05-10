<template>
  <section>
    <table id="topTable">
      <thead>
        <tr>
          <th>全部</th>
          <th>一般</th>
          <th>好评</th>
          <th>有效举报</th>
          <th>无效举报</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>0</td>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
        </tr>
      </tbody>
    </table>

    <el-row class="chart_item">
      <el-col :span="12"><ve-line :data="chartData" :settings="chartSettings"></ve-line></el-col>
      <el-col :span="12"><ve-pie :data="chartData"></ve-pie></el-col>
    </el-row>
  </section>
</template>

<script>
import { CommentIndex } from '../../api/api'

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
      CommentIndex(param).then(res => {
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
#topTable {
	margin: 20px 0;
  border-right: 1px solid #F2F2F2;
  border-bottom: 1px solid #F2F2F2;
  tr {
    height: 25px;
    line-height: 25px;
    td {
      text-align: center;
      border-left:1px solid #F2F2F2;
      border-top:1px solid #F2F2F2;
    }
  }
  thead tr {
    background: lightblue;
    th {
      width: 150px;
    }
  }
}
</style>

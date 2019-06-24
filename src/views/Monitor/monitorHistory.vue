<template>
  <section>
    <el-form :inline="true" class="searchForm">
      <el-form-item label="查询时间">
        <el-date-picker v-model="timeBegin" type="datetime" placeholder="开始时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker> 至 <el-date-picker v-model="timeEnd" type="datetime" placeholder="结束时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
			</el-form-item>
      <el-form-item>
				<el-button type="primary" @click="searchData">查询</el-button>
			</el-form-item>
    </el-form>
    
    <ve-line :data="chartData" :settings="chartSettings"></ve-line>
  </section>
</template>

<script>
import { MonitorHistory } from '../../api/api'

export default {
  data: function () {
    this.chartSettings = {
      labelMap: {
        day_time: '时间',
        amt_total_wait: '等待处理金额',
        amt_total_finish: '已处理金额',
        amt_total_fail: '处理失败金额'
      }
    }
    return {
      page: 1,
      item: 10,
      timeBegin: '', // 开始时间
      timeEnd: '', // 结束时间

      chartData: {
        columns: [],
        rows: []
      }
    }
  },
  methods: {
    getData: function() {
      let that = this;
      let param = {
        "time_begin": that.timeBegin ? that.timeBegin : "",
        "time_end": that.timeEnd ? that.timeEnd : "",
        "page": that.page + '',
        "item": that.item + ''
      }
      MonitorHistory(param).then(res => {
        if(res.data.result == 0) {
          that.chartData.columns = res.data.columns;
          let row = res.data.rows;
          for(var i = 0; i < row.length; i++){
            that.chartData.rows.push(row[i]);
          }
          if(row.length < that.item){
            return;
          }else {
            that.page++;
            that.getData();
          }
        }
      })
    },
    searchData: function() {
      this.chartData.rows = [];
      this.page = 1;
      this.getData();
    }
  },
  mounted() {
    this.getData();
  }
}
</script>

<style lang="scss" scoped>

</style>

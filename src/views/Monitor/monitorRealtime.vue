<template>
  <section>
    <ve-line :data="chartData" :settings="chartSettings"></ve-line>
  </section>
</template>

<script>
import { MonitorRealtime } from '../../api/api'

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
      dataList: [],
      chartData: {
        columns: [],
        rows: []
      }
    }
  },
  methods: {
    getData: function() {
      let that = this;
      MonitorRealtime().then(res => {
        if(res.data.result == 0) {
          that.chartData.columns = res.data.columns;
          let row = res.data.rows[0];
          if (that.chartData.rows.length > 5) {
            that.chartData.rows.splice(0, 1);
            that.chartData.rows.push(row); 
          }else {
            that.chartData.rows.push(row); 
          }
        }
      })
    },
    
  },
  mounted() {
    this.getData();
    this.timer = setInterval(this.getData, 60000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
}
</script>

<style lang="scss" scoped>

</style>

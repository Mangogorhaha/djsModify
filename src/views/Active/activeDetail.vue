<template>
  <section>
    <li>店铺编号：{{dataList.shp_code}}</li>
    <li>店铺名称：{{dataList.shp_name}}</li>
    <li>活动编号：{{dataList.cpn_prefix}}</li>
    <li>面值：{{dataList.amt_face}}</li>
    <li>售价：{{dataList.amt_price}}</li>
    <li>数量：{{dataList.cnt_total}}</li>
    <li>状态：{{dataList.evt_status}}</li>
    <li>待消费：{{dataList.cnt_ready}}</li>
    <li>已消费：{{dataList.cnt_consumed}}</li>
    <li>发布时间：{{dataList.tme_log}}</li>
    <li>结束时间：{{dataList.tme_end}}</li>
  </section>
</template>

<script>
import { ActiveDetail } from '../../api/api'

export default {
  data() {
    return {
      dataList: [],
    }
  },
  props: {
    item: {
      type: Object
    }
  },
  methods: {
    getList: function(){
      let that = this;
      let param = {
        "cnckey": this.$store.state.user.userInfo.cnckey,
        "evt_sqn": this.item.usrSqn
      }
      ActiveDetail(param).then(res => {
        if(res.data.result == 0){
          that.dataList = res.data.base;
        }else {
          // this.$message({
          //   message: res.data.message,
          //   type: 'error'
          // });
          console.log(res.data.message);
          
        }
      })
    },
  },
  created() {
    this.getList();
  }
}
</script>

<style lang="scss" scoped>
li {
	padding: 0;
	margin: 0;
	list-style: none;
  height: 30px;
  line-height: 30px;
}
img {
  height: 150px;
  width: 150px;
  background: cyan;
}
</style>

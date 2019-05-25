<template>
  <section>
    <li>店铺编号：{{dataList.shp_code}}</li>
    <li>店铺名称：{{dataList.shp_name}}</li>
    <li>活动编号：{{dataList.cpn_prefix}}</li>
    <li>面值：{{dataList.amt_face}}</li>
    <li>售价：{{dataList.amt_price}}</li>
    <li>数量：{{dataList.cnt_total}}</li>
    <li>状态：{{dataList.evt_status==1?'正常':'结束'}}</li>
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

      curLength: 0,
      evtSqn: ''
    }
  },
  props: {
    items: {
      type: Object
    }
  },
  methods: {
    getList: function(){
      let that = this;
      let param = {
        "evt_sqn": this.evtSqn
        // "evt_sqn": this.items.evtSqn
      }
      ActiveDetail(param).then(res => {
        if(res.data.result == 0){
          that.dataList = res.data;
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
    this.evtSqn = this.$route.query.evtSqn;
    this.getList();
  },
  computed: {
    length() {
      this.evtSqn = this.$route.query.evtSqn;
      return this.$store.state.tabs.tabs.length;
    }
  },
  watch: {
    length() {
      // console.log('tabs长度改变');
      if(this.curLength > this.length) {
        this.getList();
      }
      this.curLength = this.length
    }
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

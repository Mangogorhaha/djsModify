<template>
  <section>
    <img :src="dataList.url_icon" >
    <li>用户编号：{{dataList.usr_code}}</li>
    <li>手机号码：{{dataList.usr_mobile}}</li>
    <li>昵称：{{dataList.usr_nick}}</li>
    <li>推荐用户：{{dataList.bkr_code}}</li>
    <li>状态：{{dataList.usr_status}}</li>
    <li>注册时间：{{dataList.tme_register}}</li>
    <li>最近登录：{{dataList.tme_last}}</li>
  </section>
</template>

<script>
import { UserDetail } from '../../api/api'

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
        "usr_sqn": this.item.usrSqn
      }
      UserDetail(param).then(res => {
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

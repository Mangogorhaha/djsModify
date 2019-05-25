<template>
  <section>
    <img :src="dataList.url_icon" >
    <li>用户编号：{{dataList.usr_code}}</li>
    <li>手机号码：{{dataList.usr_mobile}}</li>
    <li>昵称：{{dataList.usr_nick}}</li>
    <li>推荐用户：{{dataList.bkr_code}}</li>
    <li>状态：{{dataList.usr_status==0?'禁用':'正常'}}</li>
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
      
      curLength: 0,
      usrSqn: ''
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
        "usr_sqn": this.usrSqn
        // "usr_sqn": this.items.usrSqn
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
    this.usrSqn = this.$route.query.usrSqn;
    this.getList();
  },
  computed: {
    length() {
      this.usrSqn = this.$route.query.usrSqn;
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

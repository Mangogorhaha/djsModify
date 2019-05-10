<template>
  <section>
    <li>店铺编号：{{dataList.shp_code}}</li>
    <li>店铺名称：{{dataList.shp_name}}</li>
    <li>用户账号：{{dataList.usr_mobile}}</li>
    <li>差评原因：{{dataList.reason}}</li>
    <li>评论内容：{{dataList.cmt_text}}</li>
    <li>评论图片：</li>
    <div class="img_item">
      <img :src="item" v-for="(item,index) in dataList.image" :key="index">
    </div>
    <li>回复内容：{{dataList.cmt_reply}}</li>
    <li>评论时间：{{dataList.tme_log}}</li>
    <li>举报时间：{{dataList.tme_report}}</li>
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
    // this.getList();
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
.img_item {
  overflow-x: auto;
  height: 150px;
  display: flex;
  flex-wrap: nowrap;
  img {
    width: 160px;
  }
}
</style>

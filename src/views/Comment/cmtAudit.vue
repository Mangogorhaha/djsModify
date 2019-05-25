<template>
  <section>
    <li>店铺编号：{{dataList.shp_code}}</li>
    <li>店铺名称：{{dataList.shp_name}}</li>
    <li>用户账号：{{dataList.usr_mobile}}</li>
    <li>评论类型：{{dataList.cmt_type==0?'一般':dataList.cmt_type==1?'好评':'差评'}}</li>
    <li v-if="dataList.cmt_type==2">举报状态：{{dataList.rpt_status==0?'可以举报':dataList.rpt_status==1?'等待处理':'无效举报'}}</li>
    <li v-if="dataList.cmt_type==2">差评原因：{{dataList.reason==0?'一般':dataList.reason==1?'好评':'差评'}}</li>
    <li>评论内容：{{dataList.cmt_text}}</li>
    <li>评论图片：</li>
    <div class="img_item">
      <img :src="item" v-for="(item,index) in dataList.image" :key="index">
    </div>
    <li>回复内容：{{dataList.cmt_reply}}</li>
    <li>评论时间：{{dataList.tme_log}}</li>
    <li>举报时间：{{dataList.tme_report}}</li>
		<el-form :inline="true" class="searchForm">
      <el-button @click="auditCmt(0)" v-show="isAudit">驳回</el-button>
      <el-button @click="auditCmt(1)" v-show="isAudit">通过</el-button>
    </el-form>
  </section>
</template>

<script>
import { CommentDetail, CommentAduit } from '../../api/api'

export default {
  data() {
    return {
      dataList: [],
      isAudit: false,

      curLength: 0,
      cmtSqn: ''
    }
  },
  props: {
    items: {
      type: Object
    }
  },
  methods: {
    getList: function() {
      let that = this;
      let param = {
        "cmt_sqn": this.cmtSqn
        // "cmt_sqn": this.items.cmtSqn
      }
      CommentDetail(param).then(res => {
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
    auditCmt: function(status) {
      let that = this;
      let param = {
        "cmt_sqn": this.dataList.cmt_sqn,
        "flg_result": status.toString()
      };
      CommentAduit(param).then(res => {
        this.$message({
          message: res.data.message,
          type: 'success'
        })
        if (res.data.result == 0){
          this.isAudit = ture;
        }
      })
    }
  },
  created() {
    this.cmtSqn = this.$route.query.cmtSqn;
    this.getList();
  },
  computed: {
    length() {
      this.cmtSqn = this.$route.query.cmtSqn;
      return this.$store.state.tabs.tabs.length;
    }
  },
  activated: {
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
.img_item {
  overflow-x: auto;
  // height: 150px;
  display: flex;
  flex-wrap: nowrap;
  img {
    width: 160px;
  }
}
</style>

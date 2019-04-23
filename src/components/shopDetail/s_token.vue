<template>
  <section>
    <el-row class="dialog_title">
      <el-col :span="18">Token明细列表</el-col>
      <el-col :span="6">Token余额：{{dataList.token_balance}}</el-col>
    </el-row>
    <el-row class="content">
      <el-col :span="12">
        <span>收入</span>
        <div class="grayBox">
          <el-row class="line_item">          
            <el-col :span="20">
              <li>消费优惠券</li>
              <li>已消费{{dataList.count_token_coupon_consumed}}张优惠券</li>
            </el-col>
            <el-col :span="4">+{{dataList.amount_token_coupon_consumed}} <i class="el-icon-arrow-right"></i> </el-col>
          </el-row>
          <el-row class="line_item">          
            <el-col :span="20">
              <li>邀请好友注册</li>
              <li>邀请了{{dataList.count_token_ivt_usr}}个好友注册</li>
            </el-col>
            <el-col :span="4">+{{dataList.amount_token_ivt_usr}} <i class="el-icon-arrow-right"></i> </el-col>
          </el-row>
          <el-row class="line_item">          
            <el-col :span="20">
              <li>邀请店铺注册</li>
              <li>邀请了{{dataList.count_token_ivt_vdr}}家店铺入驻</li>
            </el-col>
            <el-col :span="4">+{{dataList.amount_token_ivt_vdr}} <i class="el-icon-arrow-right"></i> </el-col>
          </el-row>
          <el-row class="line_item">          
            <el-col :span="20">
              <li>注册</li>
              <li>注册时间：{{dataList.tme_register}}</li>
            </el-col>
            <el-col :span="4">+{{dataList.token_register}} <i class="el-icon-arrow-right"></i> </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="12">
        <span>支出</span>
        <el-row class="grayBox">
        </el-row>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import { ShopToken } from '../../api/api'

export default {
  data() {
    return {
      dataList: [],
      sideBar: [],
    }
  },
  props: {
    shpSqn: {
      type: String
    }
  },
  methods: {
    getList: function(){
      let param = {
        "cnckey": this.$store.state.user.userInfo.cnckey,
        "shp_sqn": this.shpSqn,
      };
      ShopToken(param).then(res => {
        if(res.data.result == 0){
          this.dataList = res.data;
          this.$emit('sideBar', this.sideBar)
        }else {
          this.$message({
            message: res.data.message,
            type: 'error'
          });
        }
      })
    },
  },
  created() {
    this.getList()
  }
}
</script>

<style scoped>
li {
  list-style: none;
  margin-bottom: 5px;
}
.content {
  padding: 10px 0;
}
.grayBox {
  font-size: 12px;
  background: #F9F9F9;
  padding: 30px 20px;
  height: 470px;
  box-sizing: border-box;
  margin: 10px 20px 0 0 !important;
}
.line_item {
  margin: 0 10px 30px 10px;
}
.line_item li:last-child {
  color: #CCC;
}
.line_item .el-col-4 {
  text-align: right;
}
</style>

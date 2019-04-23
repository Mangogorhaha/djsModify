<template>
  <section>
    <el-row class="dialog_title">
      <el-col :span="18">Token明细列表</el-col>
      <el-col :span="6">Token余额：</el-col>
    </el-row>
    <el-row class="content">
      <el-col :span="12">
        <span>收入</span>
        <div class="grayBox">
          <el-row class="line_item">          
            <el-col :span="20">
              <li>分享优惠券</li>
              <li>1926次</li>
            </el-col>
            <el-col :span="4">+15987 <i class="el-icon-arrow-right"></i> </el-col>
          </el-row>
          <el-row class="line_item">          
            <el-col :span="20">
              <li>消费优惠券</li>
              <li>消费总金额：440.00</li>
            </el-col>
            <el-col :span="4">+489 <i class="el-icon-arrow-right"></i> </el-col>
          </el-row>
          <el-row class="line_item">          
            <el-col :span="20">
              <li>消费评价</li>
              <li>评价12条</li>
            </el-col>
            <el-col :span="4">+489 <i class="el-icon-arrow-right"></i> </el-col>
          </el-row>
          <el-row class="line_item">          
            <el-col :span="20">
              <li>邀请好友注册</li>
              <li>邀请了168个好友注册</li>
            </el-col>
            <el-col :span="4">+489 <i class="el-icon-arrow-right"></i> </el-col>
          </el-row>
          <el-row class="line_item">          
            <el-col :span="20">
              <li>邀请店铺注册</li>
              <li>邀请了55家店铺入驻</li>
            </el-col>
            <el-col :span="4">+489 <i class="el-icon-arrow-right"></i> </el-col>
          </el-row>
          <el-row class="line_item">          
            <el-col :span="20">
              <li>注册</li>
              <li>注册时间：2018-11-11</li>
            </el-col>
            <el-col :span="4">+489 <i class="el-icon-arrow-right"></i> </el-col>
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
export default {
  
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

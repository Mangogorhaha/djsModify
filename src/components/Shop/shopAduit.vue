<template>
  <section>
    <el-row>
      <el-col :span="8">
        <table class="apply">
          <tr><td>统一社会信用代码：</td><td>{{examineInfo.lsn_code}}</td></tr>
          <tr><td>营业主体名称：</td><td>{{examineInfo.lsn_entity}}</td></tr>
          <tr><td>成立日期：</td><td>{{examineInfo.lsn_time}}</td></tr>
          <tr><td>执照负责人：</td><td>{{examineInfo.lsn_lname}}</td></tr>
          <tr><td>经营者资质姓名：</td><td>{{examineInfo.idc_name}}</td></tr>
          <tr><td>身份证号码：</td><td>{{examineInfo.idc_number}}</td></tr>
          <tr><td>身份证有效期：</td><td>{{examineInfo.tme_exprtion}}</td></tr>
          <tr><td>店铺名称：</td><td>{{examineInfo.shp_name}}</td></tr>
          <tr><td>经营品种：</td><td>{{examineInfo.dsh_category}}</td></tr>
          <tr><td>所在省市区：</td><td>{{examineInfo.shp_location}}</td></tr>
          <tr><td>手机账号：</td><td>{{examineInfo.mobile}}</td></tr>
          <tr><td>提交审核日期：</td><td>{{examineInfo.tme_log}}</td></tr>
        </table>

        <div class="idImg" v-for="(item,index) in idImg" :key="index">
          <img :src="item.imgUrl">
        </div>
      </el-col>
      <el-col :span="16" class="selectBox">
        <div>
          1. 统一社会信用代码是否真实存在？
          <el-radio-group v-model="radio1" :disabled="radio=='1'">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </div>
        <div>
          2. 营业主体名称与统一社会信用代码是否匹配？
          <el-radio-group v-model="radio2" :disabled="radio=='1'">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </div>
        <div>
          3. 成立日期是对的吗？
          <el-radio-group v-model="radio3" :disabled="radio=='1'">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </div>
        <div>
          4. 执照经营范围是否包含餐饮？
          <el-radio-group v-model="radio4" :disabled="radio=='1'">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </div>
        <div>
          5. 执照的经营状态是否正常？
          <el-radio-group v-model="radio5" :disabled="radio=='1'">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="0">异常</el-radio>
          </el-radio-group>
        </div>

        <el-button type="primary" @click.native="examineSubmit" :loading="editLoading">提交</el-button>
      </el-col>
    </el-row>
    
  </section>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.apply {
	background: #F0F0F0;
	margin-right: 20px;
  td {
    background: #fff;
    width: 200px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    td:first-child {
      width: 160px;
      text-align: right;
    }
  }
}
.idImg {
	margin: 15px 15px 15px 0;
	display: inline-block;
  img{
    height: 80px;
  }
}
.selectBox {
	width: 60%;
	padding: 20px;
	background: #F2F2F2;
  position: relative;
  div {
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    .el-radio {
      text-align: left;;
      width: 60px;
      margin-top: 12px;
    }
  }
  .el-button {
    position: absolute;
    right: 20px;
    bottom: 10px;
  }
}
</style>

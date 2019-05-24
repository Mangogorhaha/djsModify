<template>
  <section>
    <el-row>
      <el-col :span="10">
        <table class="apply">
          <tr>
            <td>统一社会信用代码：</td>
            <td><input type="text" v-model="lsn_code"/></td>
          </tr>
          <tr>
            <td>营业主体名称：</td>
            <td><input type="text" v-model="lsn_entity"/></td>
          </tr>
          <tr>
            <td>成立日期：</td>
            <td><input type="date" v-model="lsn_time"/></td>
          </tr>
          <tr>
            <td>执照法人：</td>
            <td><input type="text" v-model="lsn_lname"/></td>
          </tr>
          <tr>
            <td>身份证号码：</td>
            <td><input type="text" v-model="idc_number"/></td>
          </tr>
          <tr>
            <td>姓名：</td>
            <td><input type="text" v-model="idc_name"/></td>
          </tr>
          <tr>
            <td>身份证有效期：</td>
            <td><input type="date" v-model="tme_exprtion"/></td>
          </tr>
          <tr>
            <td>店铺名称：</td>
            <td>{{dataList.shp_name}}</td>
          </tr>
          <tr>
            <td>经营品种：</td>
            <td>{{dataList.dsh_category}}</td>
          </tr>
          <tr>
            <td>所在省市区：</td>
            <td>{{dataList.shp_location}}</td>
          </tr>
          <tr>
            <td>手机账号：</td>
            <td>{{dataList.mobile}}</td>
          </tr>
          <tr>
            <td>提交审核日期：</td>
            <td>{{dataList.tme_log}}</td>
          </tr>
        </table>

        <!-- <div class="idImg" v-for="(item,index) in idImg" :key="index">
          <img :src="item.imgUrl">
        </div> -->
        <viewer :images="idImg" class="idImg">
          <img v-for="(item,index) in idImg" :src="item.imgUrl" :key="index">
        </viewer>
      </el-col>
      <el-col :span="14">
        <section class="selectBox">
          <div>
            1. 统一社会信用代码是否真实存在？
            <el-radio-group v-model="radio1" :disabled="isAudit">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </div>
          <div>
            2. 营业主体名称与统一社会信用代码是否匹配？
            <el-radio-group v-model="radio2" :disabled="isAudit">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </div>
          <div>
            3. 成立日期是对的吗？
            <el-radio-group v-model="radio3" :disabled="isAudit">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </div>
          <div>
            4. 执照经营范围是否包含餐饮？
            <el-radio-group v-model="radio4" :disabled="isAudit">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </div>
          <div>
            5. 执照的经营状态是否正常？
            <el-radio-group v-model="radio5" :disabled="isAudit">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="0">异常</el-radio>
            </el-radio-group>
          </div>

          <el-button type="primary" @click.native="auditShop" v-if="!isAudit">提交</el-button>
        </section>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import { ShopDetail, ShopAudit } from "../../api/api";

export default {
  data() {
    return {
      dataList: [], //审核界面数据
      idImg: [],
      isAudit: false,
      radio1: "",
      radio2: "",
      radio3: "",
      radio4: "",
      radio5: "",
      lsn_code: '',
      lsn_entity: '',
      lsn_time: '',
      lsn_lname: '',
      idc_number: '',
      idc_name: '',
      tme_exprtion: '',
      
      curLength: 0,
      shpSqn: ''
    };
  },
  props: {
    items: {
      type: Object
    }
  },
  methods: {
    // 获取页面数据
    getList: function() {
      let that = this;
      let param = {
<<<<<<< HEAD
        "shp_sqn": this.shpSqn,
        // "shp_sqn": this.items.shpSqn,
=======
        "shp_sqn": this.items.shpSqn,
>>>>>>> 6a0bbe904a5503efa9c99ee7e70e4426f6ceeb26
        "ifo_type": "0"
      };
      ShopDetail(param).then(res => {
        if(res.data.result == 0){
        this.dataList = res.data.base;
        this.idImg = [
          { imgUrl: res.data.base.lsn_url },
          { imgUrl: res.data.base.url_front },
          { imgUrl: res.data.base.url_back },
          { imgUrl: res.data.base.fdd_url }
        ];
        this.lsn_code = res.data.base.lsn_code;
        this.lsn_entity = res.data.base.lsn_entity;
        this.lsn_time = res.data.base.lsn_time;
        this.lsn_lname = res.data.base.lsn_lname;
        this.idc_number = res.data.base.idc_number;
        this.idc_name = res.data.base.idc_name;
        this.tme_exprtion = res.data.base.tme_exprtion;
        }else {
          // this.$message({
          //   message: res.data.message,
          //   type: 'error'
          // });
          console.log(res.data.message);
          
        }
      });
    },
    //审核
    auditShop: function() {
      // 判断是否全部已选
      if (this.radio1 === "" || this.radio2 === "" || this.radio3 === "" || this.radio4 === "" || this.radio5 === "") {
        this.$alert("请确认选项！");
        return;
      }
      let param = {
        "shp_sqn": this.dataList.shp_sqn.toString(),
        "flg_code": this.radio1.toString(),
        "flg_entity": this.radio2.toString(),
        "flg_time": this.radio3.toString(),
        "flg_food": this.radio4.toString(),
        "flg_valid": this.radio5.toString(),
        "lsn_code": this.lsn_code,
        "lsn_entity": this.lsn_entity,
        "lsn_time": this.lsn_time,
        "lsn_lname": this.lsn_lname,
        "idc_number": this.idc_number,
        "idc_name": this.idc_name,
        "tme_exprtion": this.tme_exprtion
      };
      ShopAudit(param).then(res => {
        if (res.data.result == 0) {
          this.$message({
            message: res.data.message,
            type: "success"
          });
          // 审核完成后radio不可选
          this.isAudit = true;
        } else {
          this.$message({
            message: "审核失败,原因：" + res.data.message,
            type: "error"
          });
        }
      });
    }
  },
  created() {
    this.shpSqn = this.$route.query.shpSqn;
    this.getList();
  },
  computed: {
    length() {
      this.shpSqn = this.$route.query.shpSqn;
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
};
</script>

<style lang="scss" scoped>
.apply {
  background: #f0f0f0;
  margin-right: 20px;
  width: 90%;
  td {
    background: #fff;
    height: 32px;
    line-height: 32px;
    text-align: center;
    input {
      text-align: center;
      border: none;
      height: 30px;
      line-height: 30px;
      width: 100%;
    }
  }
}
.idImg {
  img {
    margin: 15px 15px 15px 0;
    height: 80px;
  }
}
.selectBox {
  width: 80%;
  height: 500px;
  padding: 20px;
  background: #f2f2f2;
  position: relative;
  div {
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    .el-radio {
      text-align: left;
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

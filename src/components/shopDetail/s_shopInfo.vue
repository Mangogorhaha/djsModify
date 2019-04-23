<template>
  <section>
    <el-row class="dialog_title">
      <el-col :span="6">店铺编号：{{dataList.shp_sqn}}</el-col>
      <el-col :span="12">手机号码：{{dataList.mobile}}</el-col>
      <el-col :span="6">开通时间：{{dataList.open_time}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="18" class="content_l">
        <li>店铺名称：{{dataList.shp_name}}</li>
        <li>店铺地址：{{dataList.shp_location}}</li>
        <li>经营菜品：{{dataList.dsh_category}}</li>
        <li>人均消费：{{dataList.amt_average}}</li>
        <li>店铺座机：{{dataList.shp_phone}}</li>
        <li>营业时间：{{dataList.shp_time}}</li>
        <li>上级邀请人：{{dataList.parent_name}}</li>
        <li>邀请码：{{dataList.ivt_number}}</li>
        <li>邀请店铺注册网址：{{dataList.ivt_shp_url}}</li>
        <li>邀请好友注册网址：{{dataList.ivt_vdr_url}}</li>
        <el-row>
          <el-col :span="8" class="license">
            <img :src="dataList.licence_url">
          </el-col>
          <el-col :span="16">
            <li>统一社会信用代码：{{dataList.lsn_code}}</li>
            <li>营业主体：{{dataList.lsn_entity}}</li>
            <li>成立日期：{{dataList.lsn_time}}</li>
            <li>执照负责人：{{dataList.lsn_lname}}</li>
            <li>经营者姓名：{{dataList.idc_name}}</li>
            <li>经营者身份证号码：{{dataList.idc_number}}</li>
            <el-row class="idImg">
              <el-col :span="12"><img :src="dataList.ID_front_url"></el-col>
              <el-col :span="12"><img :src="dataList.ID_back_url"></el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6" class="content_r">
        <li class="shopImg" v-for="(item, index) in imgData" :key="index">
          <img :src="item.url_image">
        </li>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import { ShopDetail } from '../../api/api'

export default {
  data() {
    return {
      sideBar: [], //侧边栏数据
      dataList: [],
      imgData: [],
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
        "shp_status": this.$route.meta.radio.toString()
      }
      ShopDetail(param).then(res => {
        if(res.data.result == 0){
          this.sideBar = res.data.count;
          this.dataList = res.data.base;
          this.imgData = res.data.shp_photos;
          this.$emit('sideBar', this.sideBar)
        }else {
          this.$message({
            message: res.data.message,
            type: 'error'
          });
        }
      })
    }
  },
  created() {
    this.getList();
  },
}
</script>

<style scoped>
li {
	padding: 0;
	margin: 0;
	list-style: none;
  font-size: 12px;
  height: 30px;
  line-height: 30px;
}
.content_l .license{
  height: 100px; 
  width: 80px; 
  background: pink;
  margin: 10px 10px 0 0;
}
.content_l .license img {
  width: 80px;
}
.content_l .idImg .el-col {
  height: 80px; 
  width: 140px; 
  background: pink;
  margin-right: 10px;
}
.content_l .idImg img{
  width: 140px;
}
.content_r {
  height: 560px;
  padding-top: 10px;
  overflow-y: auto;
  overflow-x: hidden;
}
.content_r .shopImg{
  width: 160px;
  height: 110px;
  background: lightblue;
  margin-bottom: 10px;
}
.content_r .shopImg img {
  height: 110px;
}
</style>

<template>
  <section>
    <el-form :inline="true" class="searchForm" style="width: 60%;">
			<el-form-item label="发送条件：">
        <el-select v-model="condition">
          <el-option v-for="item in conditionOptions" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
			</el-form-item>
      <el-form-item label="手机号：" v-if="condition === '0'">
        <el-input v-model="phoneNum" placeholder="添加手机号"></el-input>
			</el-form-item>
      <el-form-item label="区域：" v-if="condition == 1">
        <el-select v-model="province">
          <el-option v-for="item in provinceOptions" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
        <el-select v-model="city">
          <el-option v-for="item in cityOptions" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
        <el-select v-model="district">
          <el-option v-for="item in districtOptions" :key="item" :label="item" :value="item"></el-option>
        </el-select>
			</el-form-item>
      <el-form-item label="注册时间：" v-if="condition == 2">
        <el-date-picker v-model="tmeBegin" type="datetime" placeholder="开始时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        <el-date-picker v-model="tmeEnd" type="datetime" placeholder="结束时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
			</el-form-item>
      <el-form-item label="SDX(省点)：" v-if="condition == 3">
        <el-input v-model="amtMin" placeholder="最低个数"></el-input>
      </el-form-item>
      <el-form-item v-if="condition == 3">
        <el-input v-model="amtMax" placeholder="最高个数"></el-input>
      </el-form-item>
      <el-form-item label="用户类型：" v-if="condition == 4">
        <el-select v-model="userType">
          <el-option v-for="item in userTypeOptions" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
		</el-form>

    <el-form style="width: 60%;">
      <el-form-item label="消息标题：">
        <el-input v-model="msg_tit" placeholder="请输入15字以内标题"></el-input>
			</el-form-item>
      <el-form-item label="消息内容">
        <el-input type="textarea" :rows="5" v-model="msg_cnt" placeholder="请输入300字以内的消息内容"></el-input>
			</el-form-item>
      <el-form-item>
        <el-button type="primary" @click="shpMessage">提交</el-button>
			</el-form-item>
		</el-form>
  </section>
</template>

<script>
import { UserMessage } from '../../api/api';

export default {
  data() {
    return {
      condition: '-1', // 发送条件
      conditionOptions: [
        { value: '-1', name: '全部用户' },
        { value: '0', name: '手机号' },
        { value: '1', name: '区域' },
        { value: '2', name: '注册时间' },
        { value: '3', name: 'SDX(省点)' },
        { value: '4', name: '用户类型' }
      ],
      phoneNum: '',
      province: '广东',
      provinceOptions: [ {value: '广东', name: '广东省'} ],
      city: '深圳',
      cityOptions: [ {value: '深圳', name: '深圳市'} ],
      district: '南山区',
      districtOptions: ['罗湖区','福田区','南山区','盐田区','龙岗区','宝安区','光明新区','坪山新区','龙华新区','大鹏新区'],
      tmeBegin: '', 
      tmeEnd: '',
      amtMin: '',
      amtMax: '',
      userType: '0',
      userTypeOptions: [
        { value: '0', name: '普通用户' },
        { value: '1', name: '创世会员' }
      ],
      msg_tit: '',
      msg_cnt: '',
    }
  },
  mounted() {
    
  },
  methods: {
    shpMessage: function() {
      let that = this;
      let location = '';
      if(that.province) {
        location += that.province
      }
      if(that.province && that.city) {
        location = that.province+'-'+that.city+'-'+that.district
      }
      switch (that.condition) {
        case '0': if(that.phoneNum == '') return that.$alert('手机号不能为空！'); break;
        case '1': if(location == '') return that.$alert('请选择区域！'); break;
        case '2': if(that.tmeEnd == '' && that.tmeBegin == '') return that.$alert('请选择时间！'); break;
        case '3': if(that.amtMin == '' && that.amtMax == '') return that.$alert('交易金额不能为空！'); break;
        case '4': if(that.userType == '') return that.$alert('请选择用户类型！'); break;
        default: break;
      }
      if(!that.msg_tit || !that.msg_cnt) {
        return that.$alert('请填写完整要发送的内容！');
      }
      let param = {
        "ifo_type": that.condition,
        "phone": that.phoneNum,
        "location": location,
        "tme_begin": that.tmeBegin || "",
        "tme_end": that.tmeEnd || "",
        "sdx_min": that.amtMin,
        "sdx_max": that.amtMax,
        "usr_level": that.userType,
        "msg_title": that.msg_tit,
        "msg_context": that.msg_cnt
      };
      console.log(param)
      UserMessage(param).then(res => {
        that.$message(res.data.message);
      }).catch(err => {
        that.$alert('请求超时，刷新重试！')
      });    
    }
  }
}
</script>
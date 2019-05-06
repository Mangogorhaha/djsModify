<template>
  <section>
    <el-tabs v-model="tabValue" type="card" >
      <el-tab-pane label = "基本资料" name="0">
        <li>店铺编号：{{shpCode}}</li>
        <li>手机号码：</li>
        <li>开通时间：</li>
        <li>店铺名称：</li>
        <li>店铺地址：</li>
        <li>经营菜品：</li>
        <li>人均消费：</li>
        <li>店铺座机：</li>
        <li>营业时间：</li>
        <li>上级邀请人：</li>
        <li>品牌故事：</li>
        <quill-editor v-model="brand_content" ref="myQuillEditor" style="height: 300px;margin-bottom: 50px;" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @change="onEditorChange($event)"></quill-editor>
        <li>门店照片：</li>
        <el-col :span="24" class="img_item">
          <li class="shopImg" v-for="(item, index) in 15" :key="index">
            <img :src="item.url_image">
          </li>
        </el-col>
        
      </el-tab-pane>
      <!-- 执照信息 —— 有权限管理 -->
      <el-tab-pane label="执照信息" name="1">
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
      </el-tab-pane>
      
    </el-tabs>
  </section>
</template>

<script>
import { ShopDetail } from '../../api/api'
// 引入富文本编辑器相关组件
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  data() {
    return {
      tabValue: '0',
      dataList: [],
      imgData: [],
      brand_content: '',
      editorOption: {},
      shpCode: ''
    }
  },
  props: {
    shpSqn: {
      type: String
    },
    item: {
      type: Object
    }
  },
  components: {
    quillEditor
  },
  methods: {
    getList: function(){
      let param = {
        "cnckey": this.$store.state.user.userInfo.cnckey,
        "shp_sqn": this.shpSqn,
      }
      ShopDetail(param).then(res => {
        if(res.data.result == 0){
          this.dataList = res.data.base;
          this.imgData = res.data.shp_photos;
        }else {
          this.$message({
            message: res.data.message,
            type: 'error'
          });
        }
      })
    },
    onEditorBlur(){//失去焦点事件
    },
    onEditorFocus(){//获得焦点事件
    },
    onEditorChange(){//内容改变事件
    }
  },
  created() {
    console.log(this.item);
    
    this.shpCode = this.item.meta.shpCode
    this.getList();
  },
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
}
.shopImg{
  margin-right: 20px;
  width: 160px;
  height: 110px;
  background: lightblue;
  margin-bottom: 10px;
  img {
    width: 160px;
  }
}
.license{
  height: 100px; 
  width: 80px; 
  background: pink;
  margin: 10px 10px 0 0;
  img {
    width: 80px;
  }
}
.idImg .el-col {
  height: 80px; 
  width: 140px; 
  background: pink;
  margin-right: 10px;
  img{
    width: 140px;
  }
}

</style>

<template>
  <section>
    <el-tabs v-model="tabValue" type="card" @tab-click='getList'>
      <el-tab-pane label = "基本资料" name="2">
        <li>店铺编号：{{items.name}}</li>
        <li>店铺名称：{{dataList.shp_name}}</li>
        <!-- <li>手机号码：{{dataList.shp_phone}}</li> -->
        <li>店铺注册时间：{{dataList.tme_log}}</li>
        <li>店铺地址：{{dataList.shp_address}}</li>
        <li>经营菜品：{{dataList.dsh_category}}</li>
        <li>人均消费：{{dataList.amt_average}}</li>
        <li>店铺座机：{{dataList.shp_phone}}</li>
        <li>营业时间：{{dataList.shp_time}}</li>
        <li>浏览量：{{dataList.acl_times}}</li>
        <li>浏览人数：{{dataList.acl_users}}</li>
        <!-- <li>上级邀请人：</li> -->
        <li>品牌故事：</li>
        <quill-editor v-model="shpStory" ref="myQuillEditor" style="height: 300px;margin-bottom: 50px;" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @change="onEditorChange($event)"></quill-editor>
        <li>门店照片：</li>
        <el-col :span="24" class="img_item">
          <li class="shopImg" v-for="(item, index) in faceImg" :key="index">
            <img :src="item">
          </li>
        </el-col>
        <li>店内照片：</li>
        <el-col :span="24" class="img_item">
          <li class="shopImg" v-for="(item, index) in innerImg" :key="index">
            <img :src="item">
          </li>
        </el-col>
        <li>菜单照片：</li>
        <el-col :span="24" class="img_item">
          <li class="shopImg" v-for="(item, index) in menuImg" :key="index">
            <img :src="item">
          </li>
        </el-col>
        
      </el-tab-pane>
      <!-- 执照信息 TODO: 有权限管理 -->
      <el-tab-pane label="执照信息" name="1">
        <el-row>
          <!-- <el-col :span="8" class="license">
            <img :src="dataList.lsn_url">
          </el-col> -->
          <el-col :span="16">
            <li>统一社会信用代码：{{dataList.lsn_code}}</li>
            <li>营业主体：{{dataList.lsn_entity}}</li>
            <li>成立日期：{{dataList.lsn_time}}</li>
            <li>执照法人：{{dataList.lsn_lname}}</li>
            <li>身份证号码：{{dataList.idc_number}}</li>
            <li>姓名：{{dataList.idc_name}}</li>
            <li>有效期：{{dataList.tme_exprtion}}</li>
            <li>手机号码：{{dataList.mobile}}</li>
            <li>提交时间：{{dataList.tme_log}}</li>
            <el-row class="idImg">
              <el-col :span="5"><img :src="dataList.lsn_url"></el-col>
              <el-col :span="5"><img :src="dataList.fdd_url"></el-col>
              <el-col :span="4"><img :src="dataList.adt_url"></el-col>
              <el-col :span="5"><img :src="dataList.url_front"></el-col>
              <el-col :span="5"><img :src="dataList.url_back"></el-col>
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
      tabValue: '2',
      shpSqn: '',
      dataList: [],
      faceImg: [], // 门店照片
      innerImg: [], // 店内照片
      menuImg: [], // 菜单照片
      shpStory: '',
      editorOption: {},
      curLength: 0,
    }
  },
  props: {
    items: {
      type: Object
    }
  },
  components: {
    quillEditor
  },
  methods: {
    getList: function(){
      let that = this;
      // console.log(this.shpSqn);
      
      let param = {
        "shp_sqn": this.shpSqn,
        // "shp_sqn": this.$route.query.shpSqn,
        "ifo_type": this.tabValue
      }
      ShopDetail(param).then(res => {
        if(res.data.result == 0){
          that.dataList = res.data.base;
          if (that.tabValue === '2'){
            that.faceImg = res.data.face;
            that.innerImg = res.data.inner;
            that.menuImg = res.data.menu; 
            that.shpStory = res.data.base.shp_story;
          }
          return res.data.base;
        }else {
          // this.$message({
          //   message: res.data.message,
          //   type: 'error'
          // });
          console.log(res.data.message);
          
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
}
</script>

<style lang="scss" scoped>
li {
	padding: 0;
	margin: 0;
	list-style: none;
  line-height: 30px;
}
.img_item {
  overflow-x: auto;
  display: flex;
  flex-wrap: nowrap;
}
.shopImg{
  margin-right: 20px;
  width: 160px;
  margin-bottom: 10px;
  img {
    width: 160px;
    border: 1px solid #000;
    box-shadow: 1px 1px 2px #ccc;
  }
}
.license{
  width: 100px; 
  margin: 10px 10px 0 0;
  img {
    width: 100px;
  }
}
.idImg .el-col {
  width: 200px; 
  margin-right: 10px;
  img{
    width: 200px;
  }
}

</style>

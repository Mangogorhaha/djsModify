<template>
  <section>
    <el-col :span="24" class="dialog_title">品牌故事</el-col>
    <el-col :span="24" class="content">{{dataList}}</el-col>
  </section>
</template>

<script>
import { ShopBrandStory } from '../../api/api'

export default {
  data() {
    return {
      dataList: ''
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
        "shp_sqn": this.shpSqn
      };
      ShopBrandStory(param).then(res => {
        if(res.data.result == 0){
          this.dataList = res.data.text_story;
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
  }
}
</script>

<style scoped>
.content{
  margin: 20px 0;
}
</style>

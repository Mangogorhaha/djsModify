<template>
  <section>
    <el-col :span="24" class="tit">新版发布：</el-col>
    <el-form label-width="100px" label-position="left">
      <el-form-item label="终端：" >
        <el-radio-group v-model="terminal">
          <el-radio :label="0">苹果</el-radio>
          <el-radio :label="1">安卓</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="对象：">
        <el-radio-group v-model="appTarget">
          <el-radio :label="0">用户版</el-radio>
          <el-radio :label="1">商户版</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="版本号：">
        <el-input v-model="version" type="text" placeholder="例：2.0.1" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="版本说明：">
        <el-input v-model="imprint" type="textarea" style="width: 600px" :rows="6" placeholder="例：
          1、攻城狮自己写更新说明；
          2、不知道怎么写更新说明，所以……
          3、您就更新下版本，不就知道有什么变化吗？">
        </el-input>
      </el-form-item>
      <el-form-item label="更新状态：">
        <el-select v-model="status" clearable>
          <el-option v-for="item in statusOptions" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
			</el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit" size="large" style="width: 100px">提 交</el-button>
      </el-form-item>
      
    </el-form>
    
  </section>
</template>

<script>
export default {
  data() {
    return {
      terminal: '',
      appTarget: '',
      version: '',
      imprint: '',
      status: '0',
      statusOptions: [
        { value: '0', name: '提醒更新' },
        { value: '1', name: '不提醒更新' },
        { value: '2', name: '强制更新' }
      ]
    }
  },
  methods: {
    submit: function() {

    }
  }
}
</script>

<style lang="scss" scoped>
.tit {
  margin: 20px 0 40px;
  font-size: 20px;
}
</style>

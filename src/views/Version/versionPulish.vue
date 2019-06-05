<template>
  <section>
    <el-col :span="24" class="tit">新版发布：</el-col>
    <el-form label-width="100px" label-position="left" :rules="rules" ref="ruleForm" :model="ruleForm">
      <el-form-item label="终端：" prop="terminal">
        <el-radio-group v-model="ruleForm.terminal">
          <el-radio :label="0">苹果</el-radio>
          <el-radio :label="1">安卓</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="使用端：" prop="appTarget">
        <el-radio-group v-model="ruleForm.appTarget">
          <el-radio :label="0">商户版</el-radio>
          <el-radio :label="1">用户版</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="版本号：" prop="version">
        <el-input v-model="ruleForm.version" type="text" placeholder="例：2.0.1" style="width: 300px" required></el-input>
      </el-form-item>
      <el-form-item label="版本说明：" prop="imprint">
        <el-input v-model="ruleForm.imprint" type="textarea" style="width: 600px" :rows="6" placeholder="例：
          提示：换行时请用‘|’结尾
          1、攻城狮自己写更新说明|
          2、不知道怎么写更新说明，所以……|
          3、您就更新下版本，不就知道有什么变化吗？">
        </el-input>
      </el-form-item>
      <el-form-item label="更新状态：" prop="status">
        <el-select v-model="ruleForm.status" clearable>
          <el-option v-for="item in ruleForm.statusOptions" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
			</el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit" size="large" style="width: 100px">提 交</el-button>
      </el-form-item>
      
    </el-form>
    
  </section>
</template>

<script>
import { VersionAdd } from '../../api/api'

export default {
  data() {
    return {
      ruleForm: {
        terminal: '',
        appTarget: '',
        version: '',
        imprint: '',
        status: '0',
        statusOptions: [
          { value: '0', name: '提醒更新' },
          { value: '1', name: '强制更新' },
          { value: '2', name: '不提醒更新' }
        ]
      },
      rules: {
        terminal: [{ required: true, message: '请选择终端', trigger: 'blur' }],
        appTarget: [{ required: true, message: '请选择对象', trigger: 'blur' }],
        version: [{ required: true, message: '请输入版本号', trigger: 'blur' }],
        imprint: [
          { required: true, message: '请输入版本说明', trigger: 'blur' },
          { max: 100, message: '版本说明不得超过100个字符', trigger: 'blur' }
        ],
        status: [{ required: true, message: '请选择更新状态', trigger: 'blur' }],
      }
    }
  },
  methods: {
    submit: function() {
      let that = this;
      that.$refs.ruleForm.validate(valid => {
        if (valid) {
          let param = {
            "tmn_type": that.ruleForm.terminal.toString(),
            "vsn_type": that.ruleForm.appTarget.toString(),
            "vsn_no": that.ruleForm.version,
            "vsn_desc": that.ruleForm.imprint,
            "udt_status": that.ruleForm.status
          }
          VersionAdd(param).then(res => {
            if(res.data.result == 0){
              that.$alert('提交成功！', '提示', {
                callback: action => {
                  that.ruleForm.terminal = '';
                  that.ruleForm.appTarget = '';
                  that.ruleForm.version = '';
                  that.ruleForm.imprint = '';
                  that.ruleForm.status = '0'
                }
              })
            }else {
              that.$alert('提交失败，请联系管理员','提示')
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      })
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

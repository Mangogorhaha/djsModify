<template>
  <section>
    <el-form :inline="true" class="searchForm">
      <el-form-item label="终端">
        <el-select v-model="terminal" clearable>
          <el-option v-for="item in terminalOptions" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
			</el-form-item>
      <el-form-item label="使用端">
        <el-select v-model="appTarget" clearable>
          <el-option v-for="item in appTargetOptions" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
			</el-form-item>
      <el-form-item>
				<el-button type="primary" @click="getList">查询</el-button>
			</el-form-item>
    </el-form>

    <el-table :data="dataList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" border tooltip-effect="light">
      <el-table-column label="发布端" min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.tmn_type == 0 ? '苹果' : '安卓'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="使用端" min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.vsn_type == 0 ? '商户端' : '用户端'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="vsn_no" label="版本号" min-width="110"></el-table-column>
      <el-table-column prop="tme_create" label="发布日期" min-width="160"></el-table-column>
      <el-table-column label="更新状态" min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.must_update_status==0?'提醒更新':scope.row.must_update_status==1?'强制更新':'不提醒更新'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="vsn_desc" label="更新说明" min-width="250">
        <template slot-scope="scope">
          <div v-for="(item, index) in scope.row.vsn_desc" :key="index">{{item}}</div>
        </template>
      </el-table-column>
    </el-table>
    
    <!--分页栏-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="page" :page-size="item" :page-sizes="itemList" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
  </section>
</template>

<script>
import { VersionList } from '../../api/api'

export default {
  data() {
    return {
      dataList: [],
      sels: [],//列表选中列
      page: 1,
      item: 10,
      itemList: [10,20,50],
      total: 0,
      listLoading: false,

      terminal: '', //终端
      terminalOptions: [
        { value: '0', name: '苹果' },
        { value: '1', name: '安卓' }
      ],
      appTarget: '', //对象
      appTargetOptions: [
        { value: '0', name: '商户版' },
        { value: '1', name: '用户版' }
      ],
    }
  },
  methods: {
    getList: function() {
      let that = this;
      let param = {
        "tmn_type": that.terminal ? that.terminal : '-1',
        "vsn_type": that.appTarget ? that.appTarget : '-1',
        "page": that.page.toString(),
        "item": that.item.toString(),
      }
      VersionList(param).then(res => {
        if(res.data.result == 0) {
          that.dataList = res.data.list;
          that.total = parseInt(res.data.total);
        }else {
          that.$message(res.data.message)
        }
      })
    },

    // 切换当前页
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
    // 改变每页显示条数
    handleSizeChange(val) {
      this.item = val;
      this.getList();
    },
    selsChange: function (sels) {
      this.sels = sels;
    },
  },
  mounted() {
    this.getList();
  }
}
</script>

<style lang="scss" scoped>

</style>

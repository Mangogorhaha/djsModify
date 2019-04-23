<template>
  <section>
    <!-- 顶部表格 -->
    <table class="topTable">
      <tr>
        <td class="t-tit">本周新增用户量：</td>
        <td>0</td>
        <td class="t-tit">累计用户量：</td>
        <td>1</td>
        <td class="t-tit">有充值记录的用户量：</td>
        <td>2</td>
        <td class="t-tit">待消费总金额：</td>
        <td>3</td>
      </tr>
      <tr>
        <td class="t-tit">本月新增用户量：</td>
        <td>4</td>
        <td class="t-tit">被邀请注册的用户量：</td>
        <td>5</td>
        <td class="t-tit">有消费记录的用户量：</td>
        <td>6</td>
        <td class="t-tit">已消费总金额：</td>
        <td>7</td>
      </tr>
    </table>

    <!-- 查询充值 -->
		<el-form :inline="true" class="searchForm">
      <el-form-item>
        <el-input v-model="keyword">
          <el-select v-model="value" slot="prepend" @change="changeValue(value)">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchByKeyword">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 充值记录数据 -->
    <el-table :data="orderListSearch.slice((page-1)*20,page*20)" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" border>
      <el-table-column prop="odr_internal" key="1" label="用户编号" min-width="130">
			</el-table-column>
			<el-table-column prop="tme_log" key="2" label="注册时间" min-width="130">
			</el-table-column>
			<el-table-column prop="mobile" key="3" label="手机账号" min-width="130">
			</el-table-column>
			<el-table-column prop="shp_code" key="4" label="微信账号" min-width="130">
			</el-table-column>
			<el-table-column prop="shp_name" key="5" label="上级邀请人" min-width="110">
			</el-table-column>
			<el-table-column prop="" key="6" label="邀请好友数量" min-width="110">
			</el-table-column>
			<el-table-column prop="acc_name" key="7" label="邀请店铺数量" min-width="110">
			</el-table-column>
			<el-table-column prop="acc_number" key="8" label="充值余额" min-width="110">
			</el-table-column>
			<el-table-column prop="" key="9" label="待消费金额" min-width="110">
			</el-table-column>
      <el-table-column prop="" key="10" label="已消费金额" min-width="110">
			</el-table-column>
      <el-table-column prop="" key="11" label="token余额" min-width="110">
			</el-table-column>
      <el-table-column key="12" label="操作" min-width="80">
				<template slot-scope="scope">
          <el-button size="small" @click="isExamine(scope.$index, scope.row)">查看</el-button>
				</template>
			</el-table-column>
    </el-table>

    <!--分页栏-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
    
  </section>
</template>

<script>
// todo 提现接口换成充值接口
import { GetDrawoutList, CardDrawout } from '../api/api';

export default {
  data() {
    return {
      radio: '2',
      total: 0,
      page: 1,
      item: 20,
      listLoading: false,
			sels: [],//列表选中列

      orderList: [],
      orderListSearch: [],
      
      // 查询评论
      keyword: '',
      options: [
        { value: '0', label: '手机账号' }, 
        { value: '1', label: '微信账号' }, 
        { value: '2', label: '用户编号' }
      ],
      value: '0',
		}
  },
  methods: {
		// TODO 获取顶部表格数据
		
		// 获取参数表数据
		getList: function(){
      let param = {
        "cnckey": this.$store.state.user.userInfo.cnckey,
        "spl_type": this.radio,
				"pay_type": '1', //0充值，1充值
        "page": this.page.toString(),
				"item": this.item.toString()
      }
      this.listLoading = true;
      GetDrawoutList(param).then(res => {
        if (res.data.result == 0){
          this.total = parseInt(res.data.total);
          this.orderList = res.data.list;
          this.orderListSearch = res.data.list;
          this.listLoading = false;
        }
			})
    },
    // 查询充值记录
    searchByKeyword: function(){
      let orderList = this.orderList;
      let orderListSearch = [];
      if(this.keyword != ''){
        orderListSearch = orderList.filter(e => {
          if(this.value == 1) return e.code.indexOf(this.keyword) >= 0;
          if(this.value == 2) return e.phone.indexOf(this.keyword) >= 0;
          if(this.value == 3) return e.storeName.indexOf(this.keyword) >= 0;
        })
        this.orderListSearch = orderListSearch;
        this.total = orderListSearch.length;
      }else{
        this.orderListSearch = orderList;
        this.total = orderList.length;
      }
    },
    // 修改查询条件
    changeValue: function(e) {
      this.value = e;
		},

    handleCurrentChange(val) {
      this.page = val;
    },
    selsChange: function (sels) {
      this.sels = sels;
    },
	},
	mounted() {    
    this.radio = this.$route.meta.radio;
    // this.getList();
  },
  watch: {
    $route( to , from ){
      this.radio = this.$route.meta.radio;
      this.orderListSearch = this.orderList; // 路由切换时初始化数据
      this.total = this.orderListSearch.length;
      this.keyword = ''
    }
  }
}
</script>

<style scoped>
.topTable {
	margin: 20px 0;
	border: 1px solid #F2F2F2;
}
.topTable tr{
	height: 25px;
	line-height: 25px;
}
.topTable td{
	width: 150px;
}
.t-tit {
	background: lightblue;
	text-align: right;
}
.el-radio {
	width: 150px;
}

</style>

<template>
  <section>

    <!-- 搜索框 -->
		<el-form :inline="true" class="searchForm">
      <el-form-item label="账户编号">
        <el-input v-model="dmyCode" placeholder="用户编号" clearable></el-input>
			</el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="usrMobile" placeholder="手机号码" clearable></el-input>
			</el-form-item>
      <el-form-item label="订单编号">
        <el-input v-model="odrInternal" placeholder="订单编号" clearable></el-input>
			</el-form-item>
      <el-form-item label="资产类型">
        <el-select v-model="splType" clearable>
          <el-option v-for="item in splTypeOptions" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
			</el-form-item>
      <el-form-item label="交易方向">
        <el-select v-model="payType" clearable>
          <el-option v-for="item in payTypeOptions" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
			</el-form-item>
      <el-form-item label="状态">
        <el-select v-model="payStatus" clearable>
          <el-option v-for="item in payStatusOptions" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
			</el-form-item>
		</el-form>
    <el-form :inline="true">
      <el-form-item label="注册时间">
        <el-date-picker v-model="tmeBegin" type="datetime" placeholder="开始时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker> 至 <el-date-picker v-model="tmeEnd" type="datetime" placeholder="结束时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
			</el-form-item>
      <el-form-item>
				<el-button type="primary" @click="getList">查询</el-button>
			</el-form-item>
      <!-- <el-form-item>
				<el-button type="primary" @click="newSearch">新建查询</el-button>
			</el-form-item> -->
    </el-form>

    <!-- 资产数据 -->
    <el-table :data="assetList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" border tooltip-effect="light">
      <el-table-column key="1" prop="dmy_code" min-width="80" label="账户编号"></el-table-column>
      <el-table-column key="2" prop="usr_mobile" min-width="130" label="手机号码"></el-table-column>
      <el-table-column key="4" prop="odr_internal" min-width="130" label="订单编号"></el-table-column>
      <el-table-column key="5" min-width="80" label="资产类型">
        <template slot-scope="scope">
          <span>{{scope.row.spl_type==0?'支付宝':scope.row.spl_type==1?'微信':scope.row.spl_type==2?'银联':'省点'}}</span>
        </template>
      </el-table-column>
      <el-table-column key="6" min-width="80" label="交易方向">
        <template slot-scope="scope">
          <span>{{scope.row.pay_type==0?'收入':'支出'}}</span>
        </template>
      </el-table-column>
      <el-table-column key="7" prop="amt_total" min-width="80" label="交易数额"></el-table-column>
      <el-table-column key="8" min-width="80" label="状态">
        <template slot-scope="scope">
          <span>{{scope.row.pay_status==0?'待处理':scope.row.pay_status==1?'成功':scope.row.pay_status==2?'驳回':'取消'}}</span>
        </template>
      </el-table-column>
      <el-table-column key="9" prop="tme_log" min-width="160" label="交易时间"></el-table-column>
      <el-table-column key="10" prop="rsn_comment" min-width="160" label="说明" :show-overflow-tooltip="true"></el-table-column>

      <el-table-column key="11" label="操作" min-width="80">
				<template slot-scope="scope">
					<el-button size="small" @click="handleWithdraw(scope.$index, scope.row)" v-if="scope.row.pay_status==0">处理</el-button>
				</template>
			</el-table-column>
    </el-table>

    <!--分页栏-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="page" :page-size="item" :page-sizes="itemList" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

    <!-- 处理提现界面 -->
    <el-dialog title="提示" :visible.sync="withdrawform" width="30%">
      <div>同意提现？</div>
      <div>本次提现操作将收取 <el-input v-model="amtFee" style="width: 80px" placeholder="0.00"></el-input>
       元手续费</div>
      <span slot="footer">
        <el-button @click="process('0')">驳回</el-button>
        <el-button type="primary" @click="process('1')">同意</el-button>
      </span>
    </el-dialog>
    
    
  </section>
</template>

<script>
import { AssetList, AssetWithdraw } from '../../api/api';

export default {
  data() {
    return {
      total: 0,
      page: 1,
      item: 10, //每页显示数量
      itemList: [10,20,50],
      listLoading: false,
      sels: [],//列表选中列
      assetList: [], //资产列表
      withdrawform: false,
      paySqn: '',
      amtFee: '',

      dmyCode: '', // 店铺or用户编号
      usrMobile: '', // 手机号码
      odrInternal: '', // 订单编号
      splType: '', // 资产类型
      splTypeOptions: [
        { value: 0, name: '支付宝' },
        { value: 1, name: '微信' },
        { value: 2, name: '银联' },
        { value: 10, name: '省点' },
      ],
      payType: '', // 交易方向
      payTypeOptions: [
        { value: 0, name: '收入' },
        { value: 1, name: '支出' }
      ],
      payStatus: '', // 状态
      payStatusOptions: [
        { value: 0, name: '待处理' },
        { value: 1, name: '成功' },
        { value: 2, name: '驳回' },
        { value: 3, name: '取消' }
      ],
      tmeBegin: '', // 注册开始时间
      tmeEnd: '', // 注册结束时间
    }
  },
  methods: {
    // 获取资产列表数据
    getList: function(){
      let that = this;
      let param = {
        "ifo_type": "-2",
        // "dmy_sqn": "",
        "dmy_code": this.dmyCode,
        "usr_mobile": this.usrMobile,
        "odr_internal": this.odrInternal,
        "spl_type": this.splType,
        "pay_type": this.payType,
        "pay_status": this.payStatus,
        "tme_begin": this.tmeBegin ? this.tmeBegin : "",
        "tme_end": this.tmeEnd ? this.tmeEnd : "",
        "page": this.page.toString(),
        "item": this.item.toString()
      }
      this.listLoading = true;
      AssetList(param).then(res => {
        if (res.data.result == 0){
          that.total = parseInt(res.data.total);
          that.assetList = res.data.list;
          that.listLoading = false;          
        }else{
          that.$message({
            message: res.data.message,
            type: 'error'
          });
        }
      }).catch(err => {
        that.$alert('请求超时，刷新重试！')
      });    
    },

    // 处理提现
    handleWithdraw: function(index, row) {
      this.withdrawform = true;
      this.paySqn = row.pay_sqn;
    },
    process(status) {
      if(isNaN(parseFloat(this.amtFee)) || parseFloat(this.amtFee) < 0) {
        this.$message.error('请输入有效的手续费');
        return;
      }
      let param = {
        "pay_sqn": this.paySqn,
        "flg_result": status,
        "amt_fee": this.amtFee
      };
      AssetWithdraw(param).then(res => {
        this.$message(res.data.message);
      }).then(res => {
        this.withdrawform = false;
        this.getList();
      });
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
  },
}
</script>

<style scoped>
</style>

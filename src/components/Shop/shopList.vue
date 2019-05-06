<template>
  <section>

    <!-- 搜索框 -->
		<el-form :inline="true" class="searchForm">
			<el-form-item label="店铺状态">
        <el-select v-model="shpStatus" clearable>
          <el-option v-for="item in shpStatusOptions" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
			</el-form-item>
      <el-form-item label="营业状态">
        <el-select v-model="businessStatus" clearable>
          <el-option v-for="item in businessStatusOptions" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
			</el-form-item>
      <el-form-item label="店铺名称">
        <el-input v-model="shpNameText" placeholder="店铺名称"></el-input>
			</el-form-item>
      <el-form-item label="用户账号">
        <el-input v-model="mobileText" placeholder="用户账号"></el-input>
			</el-form-item>
      <el-form-item label="法人姓名">
        <el-input v-model="nameText" placeholder="法人姓名"></el-input>
			</el-form-item>
      <el-form-item label="店铺申请时间">
        <el-date-picker v-model="applyStime" type="datetime" placeholder="开始时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker> 至 <el-date-picker v-model="applyEtime" type="datetime" placeholder="结束时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="getList">查询</el-button>
			</el-form-item>
      <el-form-item>
				<el-button type="primary" @click="newSearch">新建查询</el-button>
			</el-form-item>
		</el-form>

    <!-- 店铺数据 -->
    <el-table :data="shopList.slice((page-1)*item,page*item)" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" border v-cloak>
      <el-table-column key="1" prop="shp_code" min-width="80" label="店铺编号"></el-table-column>
      <el-table-column key="2" prop="shp_name" min-width="130" label="店铺名称"></el-table-column>
      <el-table-column key="3" prop="shp_location" min-width="130" label="省市区"></el-table-column>
      <el-table-column key="4" prop="dsh_category" min-width="80" label="经营品种"></el-table-column>
      <el-table-column key="5" prop="shp_status" min-width="110" label="状态"></el-table-column>
      <el-table-column key="6" prop="tme_register" min-width="160" label="注册时间"></el-table-column>

      <el-table-column key="9" label="操作" min-width="350">
				<template slot-scope="scope">
          <el-button size="small" @click="shpAudit(scope.$index, scope.row)" v-if="scope.row.shp_status=='待审核'">审核</el-button>
					<el-button size="small" @click="showDetail(scope.$index, scope.row)">详情</el-button>
					<el-button size="small">营业收入列表</el-button>
          <el-dropdown>
            <el-button size="small">
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>邀请好友列表</el-dropdown-item>
              <el-dropdown-item>邀请店铺列表</el-dropdown-item>
              <el-dropdown-item>优惠券列表</el-dropdown-item>
              <el-dropdown-item>评论</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
				</template>
			</el-table-column>
    </el-table>

    <!--分页栏-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-size="8" :page-sizes="[8,10,20,50]" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
    
    <!-- 营业中店铺详情 -->
    <el-dialog title="店铺资料" :visible.sync="shopDetailVisible" width="75%">
      <div class="content-container">
        <el-col :span="24" class="content">
          
        </el-col>
      </div>
		</el-dialog>
  </section>
</template>

<script>
import { ShopList, ShopExamine, ShopDetail, ShopListSearch } from '../../api/api';

export default {
  data() {
    return {
      radio: '',
      total: 0,
      page: 1,
      item: 8, //每页显示数量
      listLoading: false,
      sels: [],//列表选中列
      shopList: [], //店铺列表

      shpStatus: '', // 店铺状态
      shpStatusOptions: [
        { value: '0', name: '待入驻' },
        { value: '1', name: '待审核' },
        { value: '2', name: '审核通过' },
        { value: '3', name: '审核驳回' },
        { value: '4', name: '待开通' },
        { value: '5', name: '已开通' },
        { value: '6', name: '已注销' },
        { value: '7', name: '已冻结' }
      ],
      businessStatus: '', // 营业状态
      businessStatusOptions: [
        { value: '0', name: '暂停营业' },
        { value: '1', name: '营业中' }
      ],
      shpNameText: '', // 店铺名称
      mobileText: '', // 手机账号
      nameText: '', // 法人姓名
      applyStime: '', // 店铺申请开始时间
      applyEtime: '', // 店铺申请结束时间

      shopDetail: [], //营业中店铺数据
      shopDetailVisible: false,

    }
  },
  methods: {
    // 获取店铺列表数据
    getList: function(){
      let that = this;
      let param = {
        "cnckey": this.$store.state.user.userInfo.cnckey,
        "shp_status": this.shpStatus == '' ? "-1" : this.shpStatus,
        "business_status": this.businessStatus == '' ? "-1" : this.businessStatus,
        "shp_name_text": this.shpNameText,
        "mobile_text": this.mobileText,
        "name_text": this.nameText,
        "apply_stime": this.applyStime ? this.applyStime : "",
        "apply_etime": this.applyEtime ? this.applyEtime : "",
        "page": this.page.toString(),
        "item": this.item.toString()
      }
      this.listLoading = true;
      ShopList(param).then(res => {
        if (res.data.result == 0){
          that.total = parseInt(res.data.total);
          that.shopList = res.data.list;
          that.listLoading = false;
        }else{
          that.$message({
            message: res.data.message,
            type: 'error'
          });
        }
      })      
    },

    // 新建查询
    newSearch: function() {
      let newTab = {
        name: '店铺列表',
        route: '/shopList?index='+Math.random(),
      }
      this.$store.dispatch('tabs/addTabs', newTab)
      this.$store.dispatch('tabs/setActive', newTab.route);
      this.$router.push(newTab.route)
    },
    // 查看详情
    showDetail: function(index,row) {
      let status = row.shp_status == '待审核' || row.shp_status == "审核未通过" || row.shp_status == "待开通" ? "0" : "1";
      let detailTab = {
        route: '/shopDetail?shpCode='+row.shp_code,
        name: row.shp_code + '',
        status: status,
        meta: { 'shpCode': row.shp_code }
      }
      this.$store.dispatch('tabs/addTabs', detailTab);
      this.$store.dispatch('tabs/setActive', detailTab.route);
      this.$router.push(detailTab.route)
    },
    // 审核店铺
    shpAudit: function(index, row) {
      this.$store.state.tabs.audit = row.shp_code + '';
    },

    //显示审核界面
    isExamine: function (index, row) {
      this.examineFormVisible = true;
      // this.examineInfo = row;
      
      // 获取审核界面数据
      let param = {
        "cnckey": this.$store.state.user.userInfo.cnckey,
        "shp_sqn": row.shp_sqn.toString(),
        "shp_status": this.radio
      };
      ShopDetail(param).then(res => {
        if(res.data.result == 0){
          this.examineInfo = res.data.base;
          this.idImg = [{imgUrl: res.data.base.ID_back_url},{imgUrl: res.data.base.ID_front_url},{imgUrl: res.data.base.licence_url}];
          if(this.radio == '1'){
            this.audit = res.data.audit;
            this.radio1 = parseInt(res.data.audit.flg_code);
            this.radio2 = parseInt(res.data.audit.flg_entity);
            this.radio3 = parseInt(res.data.audit.flg_time);
            this.radio4 = parseInt(res.data.audit.flg_food);
            this.radio5 = parseInt(res.data.audit.flg_valid);
          }
        }else{
          this.$message({
            message: res.data.message,
            type: 'error'
          });
        }
      })
    },
    //审核
    examineSubmit: function () {
      // 判断是否全部已选
      if (this.radio1 === '' || this.radio2 === '' || this.radio3 === '' || this.radio4 === '' || this.radio5 === ''){
        this.$alert('请确认选项！')
        return;
      }
      // 审核未通过界面radio不可选
      let param = {
        "cnckey": this.$store.state.user.userInfo.cnckey,
        "shp_sqn": this.examineInfo.shp_sqn.toString(),
        "flg_code": this.radio1.toString(),
        "flg_entity": this.radio2.toString(),
        "flg_time": this.radio3.toString(),
        "flg_food": this.radio4.toString(),
        "flg_valid": this.radio5.toString(),
      }
      ShopExamine(param).then(res => {
        if(res.data.result == 0){
          this.$message({
            message: res.data.message,
            type: 'success'
          });
          this.examineFormVisible = false;
          // 重新加载列表
          this.getList();
        }else{
          this.$message({
            message: '审核失败,原因：'+ res.data.message,
            type: 'error'
          });
        }
      })
    },

    // 营业中店铺详情
    showShopDetail: function(index, row) {
      //TODO: 获取营业中店铺详情
      this.shopDetailVisible = true;
      this.shpSqn = row.shp_sqn.toString();
    },
    // 侧边菜单栏数据（子组件传值）
    getSideBar: function(val) {
      this.sideBar = val;
    },

    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
    //改变每页显示条数
    handleSizeChange(val) {
      this.item = val;
      this.getList();
    },
    selsChange: function (sels) {
      this.sels = sels;
    },
    // 切换营业中店铺详情组件显示
    handleselect: function (a, b) {
      this.index = a
    },

    
    
  },
  mounted() {
    this.getList();

    //FIXME: 多人测试时用别人的cnckey，防止生成多个，失效
    // let userInfo = {
    //   'cnckey': '1D067C21',
    //   'userName': '唐某某'
    // }
    // localStorage.setItem("userInfo", JSON.stringify(userInfo));
  },
  created() {
  
  },
  watch: {
    keyword() {
      if(this.keyword == ''){
        this.getList();
      }
    },
    $route (to, from){
    }
  },
  computed: {
    
  }
}
</script>

<style scoped>

/* 审核界面 */
#dialog {
	display: flex;
	justify-content: space-between;
}
.apply {
	background: #F0F0F0;
	margin-right: 20px;
}
.apply td {
	background: #fff;
	width: 200px;
	height: 25px;
	line-height: 25px;
	text-align: center;
}
.apply td:first-child {
	width: 160px;
	text-align: right;
}
.idImg {
	margin: 15px 15px 15px 0;
	display: inline-block;
}
.idImg img{
	/* width: 140px; */
	height: 80px;
}
.selectBox {
	width: 60%;
	padding: 20px;
	background: #F2F2F2;
  position: relative;
}
.selectBox div {
	line-height: 40px;
	display: flex;
	justify-content: space-between;
}
.selectBox .el-radio {
	text-align: left;;
	width: 60px;
  margin-top: 12px;
}
.selectBox .el-row{
  font-size: 12px;
  color: #989898;
  position: absolute;
  bottom: 0;
}
.selectBox .el-col{
  width: 300px;
}

/* 店铺详情 */
.el-menu-item {
  height: 50px;
  line-height: 50px;
  padding-left: 10px !important;
}
.content-container {
  overflow: auto;
}
.content {
  display: flex;
}
.content_l {
  width: 160px;
  margin-right: 20px;
}
.content_r {
  flex: 1;
  /* padding: 10px 20px; */
  box-sizing: border-box;
}
</style>

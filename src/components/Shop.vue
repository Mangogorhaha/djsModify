<template>
  <section>
    <!-- 顶部表格 -->
    <table class="topTable" v-if="!searchPage">
      <tr>
        <td class="t-tit">深圳市店铺数：</td>
        <td>{{topTable.total_shp_SZ}}</td>
        <td class="t-tit">营业收入总额：</td>
        <td>{{topTable.total_amount_income}}</td>
        <td class="t-tit">待购买优惠券总量：</td>
        <td>{{topTable.total_coupon_to_buy}}</td>
        <td class="t-tit">邀请好友总数：</td>
        <td>{{topTable.total_ivt_vdr}}</td>
      </tr>
      <tr>
        <td class="t-tit">非深圳市店铺数：</td>
        <td>{{topTable.total_shp_FSZ}}</td>
        <td class="t-tit">可提现总余额：</td>
        <td>{{topTable.total_can_withdraw}}</td>
        <td class="t-tit">待消费优惠券总量：</td>
        <td>{{topTable.total_coupon_to_consume}}</td>
        <td class="t-tit">邀请店铺总数：</td>
        <td>{{topTable.total_ivt_shp}}</td>
      </tr>
    </table>

    <!-- 搜索框 -->
		<el-form :inline="true" class="searchForm" v-else>
			<el-form-item>
				<el-input v-model="keyword" class="searchInput">
					<el-select v-model="value" slot="prepend" @change="changeValue(value)">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="searchByKeyword">查询</el-button>
			</el-form-item>
		</el-form>

    <!-- 路由选项 -->
    <el-radio-group v-model="radio" @change="changeLabel(radio)">
      <el-radio label="0">待审核（{{topTable.count_to_audit_shp}}家）</el-radio>
      <el-radio label="1">审核未通过（{{topTable.count_fail_audit_shp}}家）</el-radio>
      <el-radio label="2">待开通（{{topTable.count_to_open_shp}}家）</el-radio>
      <el-radio label="3">营业中（{{topTable.count_business_shp}}家）</el-radio>
      <el-radio label="4">暂停营业（{{topTable.count_stop_business_shp}}家）</el-radio>
      <el-radio label="5">已注销（{{topTable.count_logout_shp}}家）</el-radio>
      <el-radio label="6">被冻结（{{topTable.count_to_audit_shp}}家）</el-radio>
    </el-radio-group>
    <el-button type="primary" @click="search" v-if="!searchPage">查询店铺</el-button>

    <!-- 店铺数据 -->
    <el-table :data="storeList.slice((page-1)*item,page*item)" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" border v-if="radio=='3'||radio=='4'" v-cloak>
      <el-table-column key="0" prop="bse_sqn" label="店铺编号"></el-table-column>
      <el-table-column key="1" prop="open_time" label="开通时间"></el-table-column>
      <el-table-column key="2" prop="vdr_sqn" label="店铺账号"></el-table-column>
      <el-table-column key="3" prop="shp_name" label="店铺名称"></el-table-column>
      <el-table-column key="4" prop="parent_ivt" label="上级邀请人"></el-table-column>
      <el-table-column key="5" prop="acl_times" label="浏览量"></el-table-column>
      <el-table-column key="6" prop="acl_users" label="浏览人数"></el-table-column>
      <el-table-column key="7" prop="can_withdraw" label="可提现余额"></el-table-column>
      <el-table-column key="8" prop="coupon_to_buy" label="待购买优惠券"></el-table-column>
      <el-table-column key="9" prop="coupon_to_consume" label="待消费优惠券"></el-table-column>
      <el-table-column key="10" prop="coupon_to_used" label="已消费优惠券"></el-table-column>
      <el-table-column key="11" prop="amount_income" label="营业收入"></el-table-column>
      <el-table-column key="12" prop="amount_token" label="token余额"></el-table-column>

      <el-table-column key="13" label="操作">
				<template slot-scope="scope">
					<el-button size="small" @click="showShopDetail(scope.$index, scope.row)">查看</el-button>
				</template>
			</el-table-column>
    </el-table>

    <el-table :data="storeList.slice((page-1)*item,page*item)" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" border v-else v-cloak>
      <el-table-column key="14" prop="lsn_code" min-width="160" label="统一社会信用代码"></el-table-column>
      <el-table-column key="15" prop="lsn_entity" min-width="160" label="营业主体"></el-table-column>
      <el-table-column key="16" prop="shp_name" min-width="160" label="店铺名称"></el-table-column>
      <el-table-column key="17" prop="shp_location" min-width="160" label="省市区"></el-table-column>
      <el-table-column key="18" prop="dsh_category" min-width="160" label="经营品种" v-if="radio=='0'||radio=='6'"></el-table-column>
      <el-table-column key="19" prop="mobile" min-width="110" label="手机账号"></el-table-column>
      <el-table-column key="20" min-width="110" label="状态" v-if="radio=='1'||radio=='2'||radio=='5'">{{radio=='1'?'审核未通过':radio=='2'?'待开通':'已注销'}}</el-table-column>
      <el-table-column key="21" prop="logout_time" min-width="110" label="注销日期" v-if="radio=='5'"></el-table-column>
      <el-table-column key="22" prop="last_open_time" min-width="160" label="最晚开通时间" v-if="radio=='2'"></el-table-column>
      <el-table-column key="23" prop="auditor" min-width="110" label="审核账号" v-if="radio=='1'||radio=='2'||radio=='5'"></el-table-column>
      <el-table-column key="24" prop="audit_pass_time" min-width="160" label="审核通过时间" v-if="radio=='2'||radio=='5'"></el-table-column>
      <el-table-column key="25" prop="audit_time" min-width="160" label="审核时间" v-if="radio=='1'"></el-table-column>
      <el-table-column key="26" prop="tme_log" min-width="160" label="提交审核时间" v-if="radio=='0'||radio=='7'" sortable></el-table-column>

      <el-table-column key="27" label="操作" v-if="radio=='0'||radio=='1'">
				<template slot-scope="scope">
          <el-button size="small" @click.native="isExamine(scope.$index, scope.row)" v-if="radio=='0'">审核</el-button>
					<el-button size="small" @click="isExamine(scope.$index, scope.row)" v-if="radio=='1'">查看</el-button>
				</template>
			</el-table-column>
    </el-table>

    <!--分页栏-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-size="20" :page-sizes="[20,50,100]" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--审核界面-->
		<el-dialog title="店铺入驻审核" :visible.sync="examineFormVisible">
			<div id="dialog">
				<div>

					<table class="apply">
						<tr><td>统一社会信用代码：</td><td>{{examineInfo.lsn_code}}</td></tr>
						<tr><td>营业主体名称：</td><td>{{examineInfo.lsn_entity}}</td></tr>
						<tr><td>成立日期：</td><td>{{examineInfo.lsn_time}}</td></tr>
						<tr><td>执照负责人：</td><td>{{examineInfo.lsn_lname}}</td></tr>
						<tr><td>经营者资质姓名：</td><td>{{examineInfo.idc_name}}</td></tr>
						<tr><td>身份证号码：</td><td>{{examineInfo.idc_number}}</td></tr>
						<tr><td>身份证有效期：</td><td>{{examineInfo.tme_exprtion}}</td></tr>
						<tr><td>店铺名称：</td><td>{{examineInfo.shp_name}}</td></tr>
						<tr><td>经营品种：</td><td>{{examineInfo.dsh_category}}</td></tr>
						<tr><td>所在省市区：</td><td>{{examineInfo.shp_location}}</td></tr>
						<tr><td>手机账号：</td><td>{{examineInfo.mobile}}</td></tr>
						<tr><td>提交审核日期：</td><td>{{examineInfo.tme_log}}</td></tr>
					</table>

					<div class="idImg" v-for="(item,index) in idImg" :key="index">
						<img :src="item.imgUrl">
					</div>
				</div>
				<div class="selectBox">
					<div>
						1. 统一社会信用代码是否真实存在？
						<el-radio-group v-model="radio1" :disabled="radio=='1'">
							<el-radio :label="1">是</el-radio>
							<el-radio :label="0">否</el-radio>
						</el-radio-group>
					</div>
					<div>
						2. 营业主体名称与统一社会信用代码是否匹配？
						<el-radio-group v-model="radio2" :disabled="radio=='1'">
							<el-radio :label="1">是</el-radio>
							<el-radio :label="0">否</el-radio>
						</el-radio-group>
					</div>
					<div>
						3. 成立日期是对的吗？
						<el-radio-group v-model="radio3" :disabled="radio=='1'">
							<el-radio :label="1">是</el-radio>
							<el-radio :label="0">否</el-radio>
						</el-radio-group>
					</div>
					<div>
						4. 执照经营范围是否包含餐饮？
						<el-radio-group v-model="radio4" :disabled="radio=='1'">
							<el-radio :label="1">是</el-radio>
							<el-radio :label="0">否</el-radio>
						</el-radio-group>
					</div>
					<div>
						5. 执照的经营状态是否正常？
						<el-radio-group v-model="radio5" :disabled="radio=='1'">
							<el-radio :label="1">正常</el-radio>
							<el-radio :label="0">异常</el-radio>
						</el-radio-group>
					</div>

          <el-row v-if="radio!='0'">
            <el-col :span="12">审核账号：{{audit.auditor}}</el-col>
            <el-col :span="12">审核时间：{{audit.audit_time}}</el-col>
          </el-row>
          
				</div>
			</div>
			
			<div slot="footer" class="dialog-footer" v-if="radio=='0'">
				<el-button type="primary" @click.native="examineSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>
    
    <!-- 营业中店铺详情 -->
    <el-dialog title="店铺资料" :visible.sync="shopDetailVisible" width="75%">
      <div class="content-container">
        <el-col :span="24" class="content">
          <aside class="content_l">
            <el-menu class="el-menu-vertical-demo" @select="handleselect" unique-opened default-active="1">
              <el-menu-item index="1">基本资料</el-menu-item>
              <el-menu-item index="2">邀请好友人数：{{sideBar.count_ivt_vdr}}人</el-menu-item>
              <el-menu-item index="3">邀请店铺人数：{{sideBar.count_ivt_shp}}家</el-menu-item>
              <el-menu-item index="4">可提现余额：{{sideBar.amount_can_withdraw}}元</el-menu-item>
              <el-menu-item index="5">待购买优惠券：{{sideBar.count_coupon_to_buy}}张</el-menu-item>
              <el-menu-item index="6">待消费优惠券：{{sideBar.count_coupon_to_consume}}张</el-menu-item>
              <el-menu-item index="7">营业收入：{{sideBar.amount_total_income}}元</el-menu-item>
              <el-menu-item index="8">token余额：{{sideBar.amount_token}}次</el-menu-item>
              <el-menu-item index="9">店铺评论：{{sideBar.count_comment}}次</el-menu-item>
              <el-menu-item index="10">登录记录</el-menu-item>
              <el-menu-item index="11">品牌故事</el-menu-item>
            </el-menu>
          </aside>
          <section class="content_r">
            <el-col :span="24">
              <transition name="fade" mode="out-in">
                <sshopInfo v-if="index == 1" :shpSqn='shpSqn' @sideBar="getSideBar"></sshopInfo>
                <sinviteFriend v-if="index == 2" :shpSqn='shpSqn' @sideBar="getSideBar"></sinviteFriend>
                <sinviteShop v-if="index == 3" :shpSqn='shpSqn' @sideBar="getSideBar"></sinviteShop>
                <sbalance v-if="index == 4" :shpSqn='shpSqn' @sideBar="getSideBar"></sbalance>
                <scouponToBuy v-if="index == 5" :shpSqn='shpSqn' @sideBar="getSideBar"></scouponToBuy>
                <scouponToConsume v-if="index == 6" :shpSqn='shpSqn' @sideBar="getSideBar"></scouponToConsume>
                <sincome v-if="index == 7" :shpSqn='shpSqn' @sideBar="getSideBar"></sincome>
                <stoken v-if="index == 8" :shpSqn='shpSqn'></stoken>
                <scomment v-if="index == 9" :shpSqn='shpSqn' @sideBar="getSideBar"></scomment>
                <sloginRecord v-if="index == 10" :shpSqn='shpSqn' @sideBar="getSideBar"></sloginRecord>
                <sbrandStory v-if="index == 11" :shpSqn='shpSqn'></sbrandStory>
              </transition>
            </el-col>
          </section>
        </el-col>
      </div>
		</el-dialog>
  </section>
</template>

<script>
import { ShopList, ShopExamine, ShopDetail, ShopListSearch } from '../api/api';
import { sshopInfo, sinviteFriend, sinviteShop, sbalance, scouponToBuy, scouponToConsume, sincome, stoken, scomment, sloginRecord, sbrandStory } from './shopDetail/shopDetail'

export default {
  data() {
    return {
      radio: '',
      total: 0,
      page: 1,
      item: 20, //每页显示数量
      listLoading: false,
      sels: [],//列表选中列
      storeList: [], //店铺列表
      topTable: [], //顶部表格列表

      examineFormVisible: false,//审核界面是否显示
      examineInfo: [], //审核界面数据
      editLoading: false,
      idImg: [],
      radio1: '',
      radio2: '',
      radio3: '',
      radio4: '',
      radio5: '',
      audit: [], //审核未通过详情信息

      shopDetail: [], //营业中店铺数据
      shopDetailVisible: false,
      index: '1', //营业中店铺详情index默认为1
      shpSqn: '', //当前店铺唯一标识（传给子组件）
      sideBar: [], //侧边栏数据（子组件传过来）

      // 查询
      keyword: '',
      options: [
        { value: "0", label: "店铺账号" },
        { value: "1", label: "店铺编号" },
        { value: "2", label: "店铺名称" }
      ],
      value: '0',
    }
  },
  components: {
    sshopInfo,
    sinviteFriend,
    sinviteShop,
    sbalance,
    scouponToBuy,
    scouponToConsume,
    sincome,
    stoken,
    scomment,
    sloginRecord,
    sbrandStory
  },
  props: {
    searchPage: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 获取店铺列表数据
    getList: function(){
      let param = {
        "cnckey": this.$store.state.user.userInfo.cnckey,
        "shp_status": this.radio.toString(),
        "page": this.page.toString(),
        "item": this.item.toString()
      }
      
      this.listLoading = true;
      ShopList(param).then(res => {
        if (res.data.result == 0){
          this.total = parseInt(res.data.total);
          this.storeList = res.data.list;
          this.topTable = res.data.accumulated
          this.listLoading = false;
        }else{
          this.$message({
            message: res.data.message,
            type: 'error'
          });
        }
      })
    },
    // 查询店铺
    search: function(){
      // console.log(this.$store.state.search.searchInfo)
      let searchInfo = {
        isSearch: ++this.$store.state.search.searchInfo.isSearch,
        searchTabName: '店铺查询'
      }
      this.$store.dispatch('search/setSearchStatus', searchInfo)
    },
    // 修改查询条件
    changeValue: function(e) {
      this.value = e;
    },
    //调用接口，传keyword后台返回数据
    searchByKeyword: function() {
      if(this.keyword == ''){
        return false;
      }
      let param = {
        "cnckey": this.$store.state.user.userInfo.cnckey,
        "shp_status": this.radio.toString(),
        "condition_status": this.value.toString(),
        "condition": this.keyword,
        "page": this.page.toString(),
        "item": this.item.toString(),
      }
      ShopListSearch(param).then(res => {
        if (res.data.result == 0){
          this.total = parseInt(res.data.total);
          this.storeList = res.data.list;
        }else{
          this.$message({
            message: res.data.message,
            type: 'error'
          });
        }
      })
    },

    // 切换路由
    changeLabel: function(e) {
      if (!this.searchPage){
        let routers = ['/pending','/notpass','/tobeopened','/opening','/pause'
        ,'/cancelled','/frozen'];
        this.$router.push(routers[e]+'?index='+0);
      }else this.getList();
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
    },
    //改变每页显示条数
    handleSizeChange(val) {
      this.item = val
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
    this.radio = this.$route.meta.radio.toString();
    this.getList();

    //FIXME: 多人测试时用别人的cnckey，防止生成多个，失效
    // let userInfo = {
    //   'cnckey': '15CC7DBACA0',
    //   'userName': '唐某某'
    // }
    // localStorage.setItem("userInfo", JSON.stringify(userInfo));
  },
  created() {
  
  },
  watch: {
    $route( to , from ){
      // 路由切换时初始化数据
      // this.radio = this.$route.meta.radio.toString();    
      this.getList();
    },
    keyword() {
      if(this.keyword == ''){
        this.getList();
      }
    }
  },
  computed: {
    
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
	width: 180px;
  margin: 0;
}

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

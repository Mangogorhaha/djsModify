<template>
  <section>
		<!-- 搜索框 -->
		<el-form :inline="true" class="searchForm" v-if="searchPage">
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

    <!-- 评论数据 -->
    <el-table :data="commentList.slice((page-1)*20,page*20)" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" border>
			<el-table-column prop="tme_log" key="0" label="举报日期" min-width="160" sortable v-if="radio=='0'"></el-table-column>
      <el-table-column prop="tme_log" key="1" label="评论日期" min-width="160" sortable v-else>
			</el-table-column>
			<el-table-column prop="shp_code" key="2" label="店铺编号" min-width="130" sortable>
			</el-table-column>
			<el-table-column prop="shp_name" key="3" label="店铺名称" min-width="160">
			</el-table-column>
			<el-table-column prop="usr_mobile" key="4" label="评论账号" min-width="110" sortable>
			</el-table-column>
			<el-table-column prop="cmt_text" key="5" label="评论内容" min-width="250">
			</el-table-column>
			<el-table-column key="6" label="状态" min-width="110" v-if="radio=='0'">
				<template slot-scope="scope">
					<span>{{scope.row.rpt_status==1?'等待处理': scope.row.rpt_status==2?'无效举报':'举报成功'}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="cmt_type" key="7" label="类型" min-width="110" v-else>
			</el-table-column>

      <el-table-column label="操作" key="8">
				<template slot-scope="scope">
					<el-button size="small" @click="handleForm(scope.$index, scope.row)" v-if="radio=='0'" :disabled="scope.row.rpt_status!= 1">处理</el-button>
					<el-button size="small" @click="handleForm(scope.$index, scope.row)" v-else>查看</el-button>
				</template>
			</el-table-column>
    </el-table>

    <!--分页栏-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-size="20" :page-sizes="[20,50,100]" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--处理界面-->
		<el-dialog :visible.sync="handleFormVisible" >
			<div slot="title">
				<span class="dia_tit">店铺编号：{{handleInfo.shp_code}} </span>
				<span class="dia_tit">店铺名称：{{handleInfo.shp_name}}</span>
			</div>
			<div id="content">
				<el-row>
					<el-col :span="12">{{handleInfo.tme_log}}</el-col>
					<el-col :span="12" class="right tag">
						<el-tag size="mini" type="success" v-for="(item, index) in handleInfo.reason" :key="index">{{item == '0' ? '服务':item == '1' ? '味道' : '环境'}}</el-tag>
					</el-col>
				</el-row>
				<el-row class="comment">
					<el-col :span="24">{{handleInfo.cmt_text}}</el-col>
				</el-row>
				<div class="commentImg" v-for="(item,index) in commentImg" :key="index">
					<img v-bind:src="item">
				</div>
				<el-row>
					<el-col :span="12">{{handleInfo.usr_mobile}}  {{handleInfo.usr_nick}}</el-col>
					<el-col :span="12" class="right date">举报日期：{{handleInfo.tme_log}}</el-col>
				</el-row>
			</div>
			
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click.native="handleReport(1)">驳回</el-button>
				<el-button type="danger" @click.native="handleReport(0)">删除</el-button>
			</div>
		</el-dialog>
    
  </section>
</template>

<script>
import { GetCommentList, HandleForm, HandleReport, SearchComment } from '../api/api';

export default {
  data() {
    return {
      radio: '',
      total: 0,
			page: 1,
			item: 20,
      listLoading: false,
      sels: [],//列表选中列
			commentList: [{tme_log:'2015-02-31',shp_code:'b-0001',shp_name:'店铺名称',usr_mobile:'13359632858',cmt_text:'不好不好不好不好不好不好不好不好',cmt_status:'什么状态'}],

      handleFormVisible: false,//处理界面是否显示
			handleLoading: false,
			handleInfo: [],
			commentImg: [],
			
			// 查询评论
      keyword: '',
      options: [
        { value: '0', label: '店铺名称' }, 
        { value: '1', label: '店铺编号' }, 
        { value: '2', label: '评论账号' },
        { value: '3', label: '评论昵称' },
        { value: '4', label: '评论内容' }
      ],
      value: '0',
    }
  },
  props: {
    searchPage: {
      type: Boolean,
      default: false
    }
  },
  methods: {
		// 获取评论列表数据
		getList: function(){
      let param = {
        "cnckey": this.$store.state.user.userInfo.cnckey,
        "cmt_type": this.radio.toString(),
        "page": this.page.toString(),
        "item": this.item.toString()
			}
			this.listLoading = true;
      GetCommentList(param).then(res => {
        if (res.data.result == 0){
          this.total = parseInt(res.data.total);
					this.commentList = res.data.list;
					this.listLoading = false;
        }else{
          this.$message({
            message: res.data.message,
            type: 'error'
          });
        }
      })
		},
		

    //显示处理界面
    handleForm: function (index, row) {
      this.handleFormVisible = true;
			// this.handleInfo = row;
			let param = {
				"cnckey": this.$store.state.user.userInfo.cnckey,
    		"cmt_sqn": row.cmt_sqn
			}
			HandleForm(param).then(res => {
				if(res.data.result == 0){
					this.handleInfo = res.data;
					this.commentImg = res.data.image;
				}else{
					this.$message({
            message: res.data.message,
            type: 'error'
          });
				}
			})
		},
		//处理评论
    handleReport: function (e) {
      let param = {
        "cnckey": this.$store.state.user.userInfo.cnckey,
        "cmt_sqn": this.handleInfo.cmt_sqn,
        "flg_result": e.toString()
			}
			this.handleLoading = true;
      HandleReport(param).then(res => {
        if(res.data.result == 0){
					if (e == 0){
						this.$message({
							message: '删除成功',
							type: 'success'
						});
					}else if (e == 1){
						this.$message({
							message: '驳回成功',
							type: 'success'
						});
					}
					this.handleFormVisible = false;
					this.getList();
        }else{
          this.$message({
            message: '操作失败,原因：' + res.data.message,
            type: 'error'
          });
				}
				this.handleLoading = false;
      })
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
		
	},
	mounted() {
		this.radio = this.$route.meta.radio.toString();
    this.getList();
	},
	watch: {
    $route( to , from ){
      this.getList();
		},
		keyword() {
      if(this.keyword == ''){
        this.getList();
      }
    }
  }
}
</script>

<style scoped>
.el-radio {
	width: 150px;
}
.dia_tit {
	margin-right: 30px;
}
.comment {
	background: #F2F2F2;
	margin: 15px 0;
	height: 120px;
	padding: 10px;
}
.commentImg {
	margin: 0 15px 15px 0;
	display: inline-block;
}
.commentImg img{
	/* width: 140px; */
	height: 80px;
}
.right {
	text-align: right;
}
/* .tag span{
	display: inline-block;
	border: 1px solid #0AC4AF;
	color: #0AC4AF;
	margin-left: 5px;
	padding: 1px 5px;
} */
.el-tag {
	margin: 0 5px;
}
.date {
	color: red;
}
</style>

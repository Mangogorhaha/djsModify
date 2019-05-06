import axios from 'axios'

// axios.defaults.baseURL = 'http://5idjs.com';
axios.defaults.baseURL = 'http://192.168.10.150:7001';
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 获取验证码
export const GetCode = params => { return axios.post('/Adm_Acc_Code', params);}
// 登陆
export const Login = params => { return axios.post('/Adm_Acc_Login', params); }
// 退出
export const Logout = params => { return axios.post('/Adm_Acc_Quit', params); }

// 查询列表
export const ShopListSearch = params => { return axios.post('test_Adm_Shp_Search', params); }
// 获取店铺列表
// export const ShopList = params => { return axios.post('/Adm_Shp_List', params); };
// export const ShopList = params => { return axios.post('/test_Adm_Shp_List', params); };
export const ShopList = params => { return axios.post('/Adm_Shp_List', params); };
// 审核界面数据
// export const ShopDetail = params => { return axios.post('/Adm_Shp_Detail', params)}
export const ShopDetail = params => { return axios.post('/test_Adm_Shp_Detail', params); }
// 审核店铺
// export const ExamineShop = params => { return axios.post('/Adm_Shp_Verify', params); }
export const ShopExamine = params => { return axios.post('/test_Adm_Shp_Audit', params); }
// 邀请好友和邀请店铺
export const ShopInvite = params => { return axios.post('/test_Adm_Detail_Ivt_List_ByVdr', params); }
// 可提现余额
export const ShopBalance = params => { return axios.post('/test_Adm_Detail_Withdraw_List', params); }
// 待购买优惠券
export const ShopCouponToBuy = params => { return axios.post('/test_Adm_Detail_Coupon_ToBuy_List', params); }
// 待消费优惠券
export const ShopcouponToConsume = params => { return axios.post('/test_Adm_Detail_Coupon_ToConsume_List', params); }
// 营业收入
export const ShopIncome = params => { return axios.post('/test_Adm_Detail_Income_List',  params); }
// token
export const ShopToken = params => { return axios.post('/test_Adm_Detail_Token', params); }
// 评论
export const ShopComment = params => { return axios.post('/test_Adm_Detail_CMT_List_ByVdr', params); }
// 登录记录
export const ShopLoginRecord = params => { return axios.post('/test_Adm_Detail_Ivt_List_ByVdr', params); }
// 品牌故事
export const ShopBrandStory = params => { return axios.post('/test_Adm_Detail_Shop_Story', params); }

// 评价列表
export const GetCommentList = params => { return axios.post('/Adm_Cmt_List', params); }
// 评价处理界面数据
export const HandleForm = params => { return axios.post('/Adm_Cmt_Detail', params); }
// 举报处理
export const HandleReport = params => { return axios.post('/Adm_Cmt_Verify', params); }

// 提现记录列表
export const GetDrawoutList = params => { return axios.post('/Adm_Pay_List', params); }
// 银行卡提现
export const CardDrawout = params => { return axios.post('/Adm_Pay_Done', params); }

// 用户管理列表
export const UserList = params => { return axios.post('/test_Adm_User_List', params); }
export const UserInfo = params => { return axios.post('/test_Adm_User_Detail', params); }
export const UserListSearch = params => { return axios.post('test_Adm_User_Search', params); }

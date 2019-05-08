import axios from 'axios'

// axios.defaults.baseURL = 'http://api.5idjs.com';
axios.defaults.baseURL = 'http://192.168.10.150:7001';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 5000;

// 获取验证码
export const GetCode = params => { return axios.post('/Adm_Acc_Code', params);}
// 登陆
export const Login = params => { return axios.post('/Adm_Acc_Login', params); }
// 退出
export const Logout = params => { return axios.post('/Adm_Acc_Quit', params); }

// 获取店铺列表
export const ShopList = params => { return axios.post('/Adm_Shp_List', params); };
// 店铺详情和审核店铺页面数据
export const ShopDetail = params => { return axios.post('/Adm_Shp_Detail', params); }
// 审核店铺
export const ShopAudit= params => { return axios.post('/Adm_Shp_Verify', params); }

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

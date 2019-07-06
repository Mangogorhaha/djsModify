import axios from 'axios'

// axios.defaults.baseURL = 'http://api.5idjs.com'; // 正式环境
axios.defaults.baseURL = 'http://apitest.5idjs.com' // 测试环境
// axios.defaults.baseURL = 'http://apidev.5idjs.com' // 开发环境
// axios.defaults.baseURL = 'http://192.168.10.150:7001';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 5000;

// 请求的拦截器
axios.interceptors.request.use(function (config) {
  if (config.url == "/Adm_Acc_Login" || config.url == "/Adm_Acc_Code") return config;
  else config.data = {
    "cnckey": JSON.parse(localStorage.userInfo).cnckey,
    ...config.data
  }
  return config;
}, function (error) {
  return Promise.reject(error);
})

// 获取验证码
export const GetCode = params => axios.post('/Adm_Acc_Code', params);
// 登陆
export const Login = params => axios.post('/Adm_Acc_Login', params);
// 退出
export const Logout = params => axios.post('/Adm_Acc_Quit', params);

// 店铺管理模块
export const ShopIndex = params => axios.post('/Adm_Shp_Main', params);
export const ShopList = params => axios.post('/Adm_Shp_List', params);
// 店铺详情0审核 1执照 2基本
export const ShopDetail = params => axios.post('/Adm_Shp_Detail', params);
export const ShopAudit = params => axios.post('/Adm_Shp_Verify', params);

// 评价管理模块
export const CommentIndex = params => axios.post('/Adm_Cmt_Main', params);
export const CommentList = params => axios.post('/Adm_Cmt_List', params);
export const CommentDetail = params => axios.post('/Adm_Cmt_Detail', params);
export const CommentAduit = params => axios.post('/Adm_Cmt_Verify', params);

// 资产管理模块
export const AssetIndex = params => axios.post('/Adm_Pay_Main', params);
export const AssetList = params => axios.post('/Adm_Pay_List', params);
export const AssetWithdraw = params => axios.post('/Adm_Pay_Done', params);

// 活动管理模块
export const ActiveIndex = params => axios.post('/Adm_Evt_Main', params);
export const ActiveList = params => axios.post('/Adm_Evt_List', params);
export const ActiveDetail = params => axios.post('/Adm_Evt_Detail', params);

// 订单管理模块
export const OrderIndex = params => axios.post('/Adm_Odr_Main', params);
export const OrderList = params => axios.post('/Adm_Odr_List', params);
// export const OrderDetail = params => axios.post('/Adm_Evt_Detail', params);

// 用户管理模块
export const UserIndex = params => axios.post('/Adm_Usr_Main', params);
export const UserList = params => axios.post('/Adm_Usr_List', params);
export const UserDetail = params => axios.post('/Adm_Usr_Detail', params);

// 版本管理模块
export const VersionList = params => axios.post('/Adm_Vsn_LIST', params);
export const VersionAdd = params => axios.post('/Adm_Vsn_ADD', params);

// 资金监控模块
export const MonitorRealtime = params => axios.post('/Adm_Ctl_Send', params);
export const MonitorHistory = params => axios.post('/Adm_Ctl_List', params);
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Shop from '../components/Shop.vue'
import Comment from '../components/Comment.vue'
import Drawout from '../components/Drawout.vue'
import Recharge from '../components/Recharge.vue'
import Order from '../components/Order.vue'
import Coupon from '../components/Coupon.vue'
import User from '../components/User.vue'
import Token from '../components/Token.vue'
import Echarts from '../components/Echarts.vue'
import shopIndex from '../components/Shop/shopIndex.vue'
import shopList from '../components/Shop/shopList.vue'
import shopAudit from '../components/Shop/shopAudit.vue'
import shopDetail from '../components/Shop/shopDetail.vue'

let routes = [
  {
    path: '/login',
    component: Login,
    name: '登录',
    hidden: true
  },
  {
    path: '/shopIndex',
    component: Home,
    name: '店铺管理',
    iconCls: 'fa fa-shopping-bag',//图标样式class
    children: [
      { path:'/shopIndex',component:shopIndex,name:'店铺首页',meta:{urlIndex:101} },
      { path:'/shopList',component:shopList,name:'店铺列表',meta:{urlIndex:102} },
      { path:'/shopAudit',component:shopAudit,name:'店铺审核',meta:{urlIndex:103},hidden:true },
      { path:'/shopDetail',component:shopDetail,name:'店铺详情',meta:{urlIndex:104},hidden:true }
    ]
  },
  {
    path: '/report',
    component: Home,
    name: '评论管理',
    iconCls: 'fa fa-commenting-o',
    children: [
      { path:'/report',component:Comment,name:'举报评论',meta:{radio:0} },
      { path:'/negative',component:Comment,name:'差评',meta:{radio:1} },
      { path:'/ordinary',component:Comment,name:'一般评论',meta:{radio:2} },
      { path:'/praise',component:Comment,name:'好评',meta:{radio:3} },
      // { path:'/searchComment',component:Comment,name:'查询评论',meta:{radio:10} }
    ]
  },
  {
    path: '/card',
    component: Home,
    name: '提现管理',
    iconCls: 'fa fa-credit-card',
    // leaf: true,//只有一个节点
    children: [
      { path:'/card',component:Drawout,name:'银行卡提现',meta:{radio:0} },
      { path:'/wechat',component:Drawout,name:'微信提现',meta:{radio:1} },
      { path:'/alipay',component:Drawout,name:'支付宝提现',meta:{radio:2} },
      // { path:'/searchdrawout',component:Drawout,name:'查询提现',meta:{radio:10} }
    ]
  },
  {
    path: '/recharge',
    component: Home,
    name: '充值管理',
    iconCls: 'fa fa-database',
    // leaf: true,//只有一个节点
    children: [
      { path:'/recharge',component:Recharge,name:'用户充值' },
      // { path:'/searchrecharge',component:Recharge,name:'查询充值' }
    ]
  },
  {
    path: '/unconsumed',
    component: Home,
    name: '订单管理',
    iconCls: 'fa fa-file-text-o',
    children: [
      { path:'/unconsumed',component:Order,name:'待消费订单',meta:{radio:0} },
      { path:'/consumed',component:Order,name:'已消费订单',meta:{radio:1} },
      { path:'/unconfirmed',component:Order,name:'待商户确认订单',meta:{radio:2} },
      { path:'/refund',component:Order,name:'退款订单',meta:{radio:3} },
      // { path:'/searchorder',component:Order,name:'查询订单',meta:{radio:10} }
    ]
  },
  {
    path: '/acting',
    component: Home,
    name: '优惠券管理',
    iconCls: 'fa fa-pencil-square-o',
    children: [
      { path:'/acting',component:Coupon,name:'正在进行中的优惠活动',meta:{radio:0} },
      { path:'/finished',component:Coupon,name:'已完结的优惠活动',meta:{radio:1} },
      // { path:'/searchactivity',component:Coupon,name:'查询优惠',meta:{radio:10} }
    ]
  },
  {
    path: '/users',
    component: Home,
    name: '用户管理',
    iconCls: 'fa fa-user',
    children: [
      { path:'/users',component:User,name:'用户列表' },
      // { path:'/searchuser',component:User,name:'查询用户' }
    ]
  },
  {
    path: '/userincome',
    component: Home,
    name: 'Token管理',
    iconCls: 'fa fa-btc',
    children: [
      { path:'/userincome',component:Token,name:'用户token收入明细',meta:{radio:0} },
      { path:'/userexpend',component:Token,name:'用户token支出明细',meta:{radio:1} },
      { path:'/shopincome',component:Token,name:'店铺token收入明细',meta:{radio:2} },
      { path:'/shopexpend',component:Token,name:'店铺token支出明细',meta:{radio:3} },
      // { path:'/searchtoken',component:Token,name:'查询token',meta:{radio:10} }
    ]
  },
  {
    path: '/parameter',
    component: Home,
    name: '参数表',
    iconCls: 'fa fa-bar-chart ',
    children: [
      { path:'/parameter',component:Echarts,name:'参数列表'}
    ]
  }
];

export default routes;

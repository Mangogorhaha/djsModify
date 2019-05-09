import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
// 店铺
import shopIndex from '@/views/Shop/shopIndex.vue'
import shopList from '@/views/Shop/shopList.vue'
import shopAudit from '@/views/Shop/shopAudit.vue'
import shopDetail from '@/views/Shop/shopDetail.vue'
// 评论
import cmtIndex from '@/views/Comment/cmtIndex.vue'
import cmtList from '@/views/Comment/cmtList.vue'
import cmtAudit from '@/views/Comment/cmtAudit.vue'
import cmtDetail from '@/views/Comment/cmtDetail.vue'
// 资产
import assetIndex from '@/views/Asset/assetIndex.vue'
import assetList from '@/views/Asset/assetList.vue'
import assetWithdraw from '@/views/Asset/assetWithdraw.vue'
// 活动
import activeIndex from '@/views/Active/activeIndex.vue'
import activeList from '@/views/Active/activeList.vue'
import activeDetail from '@/views/Active/activeDetail.vue'
// 订单
import orderIndex from '@/views/Order/orderIndex.vue'
import orderList from '@/views/Order/orderIndex.vue'
// 用户
import userIndex from '@/views/User/userIndex.vue'
import userList from '@/views/User/userList.vue'
import userDetail from '@/views/User/userDetail.vue'

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
      { path:'/shopAudit',component:shopAudit,name:'店铺审核',meta:{urlIndex:103},hidden:true},
      { path:'/shopDetail',component:shopDetail,name:'店铺详情',meta:{urlIndex:104},hidden:true }
    ]
  },
  {
    path: '/cmtIndex',
    component: Home,
    name: '评论管理',
    iconCls: 'fa fa-commenting-o',
    children: [
      { path:'/cmtIndex',component:cmtIndex,name:'评论首页',meta:{urlIndex:201} },
      { path:'/cmtList',component:cmtList,name:'评论列表',meta:{urlIndex:202} },
      { path:'/cmtAudit',component:cmtAudit,name:'处理举报',meta:{urlIndex:203},hidden:true},
      { path:'/cmtDetail',component:cmtDetail,name:'评论详情',meta:{urlIndex:204},hidden:true}
    ]
  },
  {
    path: '/assetIndex',
    component: Home,
    name: '资产管理',
    iconCls: 'fa fa-credit-card',
    // leaf: true,//只有一个节点
    children: [
      { path:'/assetIndex',component:assetIndex,name:'资产首页',meta:{urlIndex:301} },
      { path:'/assetList',component:assetList,name:'资产列表',meta:{urlIndex:302} },
      { path:'/assetWithdraw',component:assetWithdraw,name:'银行卡提现',meta:{urlIndex:303},hidden:true }
    ]
  },
  {
    path: '/activeIndex',
    component: Home,
    name: '活动管理',
    iconCls: 'fa fa-pencil-square-o',
    children: [
      { path:'/activeIndex',component:activeIndex,name:'活动首页',meta:{urlIndex:401} },
      { path:'/activeList',component:activeList,name:'活动列表',meta:{urlIndex:402} },
      { path:'/activeDetail',component:activeDetail,name:'活动详情',meta:{urlIndex:403},hidden:true }
    ]
  },
  // {
  //   path: '/recharge',
  //   component: Home,
  //   name: '充值管理',
  //   iconCls: 'fa fa-database',
  //   // leaf: true,//只有一个节点
  //   children: [
  //     { path:'/recharge',component:Recharge,name:'用户充值' },
  //     // { path:'/searchrecharge',component:Recharge,name:'查询充值' }
  //   ]
  // },
  {
    path: '/orderIndex',
    component: Home,
    name: '订单管理',
    iconCls: 'fa fa-file-text-o',
    children: [
      { path:'/orderIndex',component:orderIndex,name:'订单首页',meta:{urlIndex:501} },
      { path:'/orderList',component:orderList,name:'订单列表',meta:{urlIndex:502} },
    ]
  },
  
  {
    path: '/userIndex',
    component: Home,
    name: '用户管理',
    iconCls: 'fa fa-user',
    children: [
      { path:'/userIndex',component:userIndex,name:'用户首页',meta:{urlIndex:701} },
      { path:'/userList',component:userList,name:'用户列表',meta:{urlIndex:702} },
      { path:'/userDetail',component:userDetail,name:'用户详情',meta:{urlIndex:703},hidden:true }
    ]
  },
  // {
  //   path: '/userincome',
  //   component: Home,
  //   name: 'Token管理',
  //   iconCls: 'fa fa-btc',
  //   children: [
  //     { path:'/userincome',component:Token,name:'用户token收入明细',meta:{radio:0} },
  //     { path:'/userexpend',component:Token,name:'用户token支出明细',meta:{radio:1} },
  //     { path:'/shopincome',component:Token,name:'店铺token收入明细',meta:{radio:2} },
  //     { path:'/shopexpend',component:Token,name:'店铺token支出明细',meta:{radio:3} },
  //     // { path:'/searchtoken',component:Token,name:'查询token',meta:{radio:10} }
  //   ]
  // },
  // {
  //   path: '/parameter',
  //   component: Home,
  //   name: '参数表',
  //   iconCls: 'fa fa-bar-chart ',
  //   children: [
  //     { path:'/parameter',component:Echarts,name:'参数列表'}
  //   ]
  // }
];

export default routes;

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
import assetWithdrawList from '@/views/Asset/assetWithdrawList.vue'
// 活动
import activeIndex from '@/views/Active/activeIndex.vue'
import activeList from '@/views/Active/activeList.vue'
import activeDetail from '@/views/Active/activeDetail.vue'
// 订单
import orderIndex from '@/views/Order/orderIndex.vue'
import orderList from '@/views/Order/orderList.vue'
// 用户
import userIndex from '@/views/User/userIndex.vue'
import userList from '@/views/User/userList.vue'
import userDetail from '@/views/User/userDetail.vue'
// 版本
import versionPre from '@/views/Version/versionPre.vue'
import versionPulish from '@/views/Version/versionPulish.vue'

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
      { path:'/shopIndex',component:shopIndex,name:'店铺首页',meta:{keep: true} },
      { path:'/shopList',component:shopList,name:'店铺列表',meta:{keep: true} },
      { path:'/shopAudit',component:shopAudit,name:'店铺审核',meta:{keep: true},hidden:true},
      { path:'/shopDetail',component:shopDetail,name:'店铺详情',meta:{keep: true},hidden:true }
    ]
  },
  {
    path: '/userIndex',
    component: Home,
    name: '用户管理',
    iconCls: 'fa fa-user',
    children: [
      { path:'/userIndex',component:userIndex,name:'用户首页',meta:{keep: true} },
      { path:'/userList',component:userList,name:'用户列表',meta:{keep: true} },
      { path:'/userDetail',component:userDetail,name:'用户详情',meta:{keep: true},hidden:true }
    ]
  },
  {
    path: '/assetIndex',
    component: Home,
    name: '资产管理',
    iconCls: 'fa fa-credit-card',
    children: [
      { path:'/assetIndex',component:assetIndex,name:'资产首页',meta:{keep: true} },
      { path:'/assetList',component:assetList,name:'资产列表',meta:{keep: true} },
      { path:'/assetWithdrawList',component:assetWithdrawList,name:'提现列表',meta:{keep: true} }
    ]
  },
  {
    path: '/activeIndex',
    component: Home,
    name: '活动管理',
    iconCls: 'fa fa-pencil-square-o',
    children: [
      { path:'/activeIndex',component:activeIndex,name:'活动首页',meta:{keep: true} },
      { path:'/activeList',component:activeList,name:'活动列表',meta:{keep: true} },
      { path:'/activeDetail',component:activeDetail,name:'活动详情',meta:{keep: true},hidden:true }
    ]
  },
  {
    path: '/orderIndex',
    component: Home,
    name: '订单管理',
    iconCls: 'fa fa-file-text-o',
    children: [
      { path:'/orderIndex',component:orderIndex,name:'订单首页',meta:{keep: true} },
      { path:'/orderList',component:orderList,name:'订单列表',meta:{keep: true} },
    ]
  },
  {
    path: '/cmtIndex',
    component: Home,
    name: '评论管理',
    iconCls: 'fa fa-commenting-o',
    children: [
      { path:'/cmtIndex',component:cmtIndex,name:'评论首页',meta:{keep: true} },
      { path:'/cmtList',component:cmtList,name:'评论列表',meta:{keep: true} },
      { path:'/cmtAudit',component:cmtAudit,name:'处理举报',meta:{keep: true},hidden:true},
      { path:'/cmtDetail',component:cmtDetail,name:'评论详情',meta:{keep: true},hidden:true}
    ]
  },
  {
    path: '/',
    component: Home,
    name: '版本管理',
    iconCls: 'fa fa-pencil-square',
    children: [
      { path:'/versionPre',component:versionPre,name:'历史版本',meta:{keep: false}},
      { path:'/versionPulish',component:versionPulish,name:'新版发布',meta:{keep: true}}
    ]
  }
];

export default routes;

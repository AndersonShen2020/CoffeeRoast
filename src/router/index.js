import { createRouter, createWebHashHistory } from 'vue-router'

// 前台
import HomeView from '@/views/FrontEnd/HomeView.vue'
import about from '@/views/FrontEnd/AboutView.vue'
import ProductsList from '@/views/FrontEnd/ProductsView.vue'
import CheckOrderView from '@/views/FrontEnd/CheckOrderView.vue'
import CheckOutView from '@/views/FrontEnd/CheckOutView.vue'
import KnowledgeView from '@/views/FrontEnd/KnowledgeView.vue'

// 後台
import Login from '@/views/BackEnd/LoginView.vue'
import DashboardView from '@/views/BackEnd/DashboardView.vue'
import LayoutView from '@/views/BackEnd/LayoutView.vue'
import Products from '@/views/BackEnd/ProductsView.vue'
import Coupons from '@/views/BackEnd/CouponsView.vue'
import Orders from '@/views/BackEnd/OrdersView.vue'

const routes = [
  // 前端
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/views/FrontEnd/LayoutView.vue'),
    children: [
      {
        path: '',
        name: 'Coffee Roast',
        component: HomeView
      },
      {
        path: '/about',
        name: '關於本店 | Coffee Roast',
        component: about
      },
      {
        path: '/Products',
        name: '產品列表 | Coffee Roast',
        component: ProductsList
      },
      {
        path: '/Product/:id',
        component: () => import('@/views/FrontEnd/ProductView.vue')
      },
      {
        path: '/CheckOrder',
        name: '確認訂單 | Coffee Roast',
        component: CheckOrderView
      },
      {
        path: '/CheckOut/:id',
        name: '您的購物車 | Coffee Roast',
        component: CheckOutView
      },
      {
        path: '/KnowledgeView',
        component: KnowledgeView
      }
    ]
  },
  // 登入
  {
    path: '/Login',
    name: '登入 | 後台管理',
    component: Login
  },
  // 後台
  {
    path: '/admin',
    name: 'adminLayout',
    component: LayoutView,
    children: [
      {
        path: '',
        name: '經營儀表板 | 後台管理',
        component: DashboardView
      },
      {
        path: 'products',
        name: '產品管理 | 後台管理',
        component: Products
      },
      {
        path: 'Coupons',
        name: '優惠卷管理 | 後台管理',
        component: Coupons
      },
      {
        path: 'Orders',
        name: '訂單管理 | 後台管理',
        component: Orders
      }
    ]
  },
  // 輸入錯誤網址跳到 404 頁面
  {
    path: '/:pathMatch(.*)*',
    name: '找不到網頁 | Coffee Roast',
    component: () => import('@/views/Error.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, form) => {
  document.title = to.name || 'Coffee Roast'
})

export default router

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
        name: 'home',
        component: HomeView
      },
      {
        path: '/about',
        name: 'about',
        component: about
      },
      {
        path: '/Products',
        name: 'Products',
        component: ProductsList
      },
      {
        path: '/Product/:id',
        name: 'Product',
        component: () => import('@/views/FrontEnd/ProductView.vue')
      },
      {
        path: '/CheckOrder',
        name: 'CheckOrder',
        component: CheckOrderView
      },
      {
        path: '/CheckOut/:id',
        name: 'CheckOut',
        component: CheckOutView
      },
      {
        path: '/KnowledgeView',
        name: 'KnowledgeView',
        component: KnowledgeView
      }
    ]
  },
  // 登入
  {
    path: '/Login',
    name: 'Login',
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
        name: 'Dashboard',
        component: DashboardView
      },
      {
        path: 'products',
        name: 'products',
        component: Products
      },
      // {
      //   path: '',
      //   name: 'products',
      //   component: Products
      // },
      {
        path: 'Coupons',
        name: 'Coupons',
        component: Coupons
      },
      {
        path: 'Orders',
        name: 'Orders',
        component: Orders
      }
    ]
  },
  {
    // 輸入錯誤網址跳到 404 頁面
    path: '/:pathMatch(.*)*',
    name: 'Error',
    component: () => import('@/views/Error.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

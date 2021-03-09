import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/login",
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/',
        redirect: "index",
      },
      {
        path: 'index',
        // name: 'journal',
        component: () => import('../views/index'),
        meta: {
          title: '首页'
        }
      },
      {
        path: 'journal',
        // name: 'journal',
        component: () => import('../views/journal'),
        meta: {
          title: '日志列表'
        }
      },
      {
        path: 'detailsCourse',
        // name: 'journal',
        component: () => import('../views/detailsCourse'),
        meta: {
          title: '课程详情'
        }
      },
      {
        path: 'minuser',
        // name: 'minuser',
        component: () => import('../views/min-user'),
        meta: {
          title: '小程序用户列表'
        }
      }, {
        path: 'companyManagement',
        name: 'companyManagement',
        component: () => import('../views/companyManagement'),
        meta: {
          title: '子公司管理'
        }
      },
      {
        path: 'settlementCenter',
        name: 'settlementCenter',
        component: () => import('../views/settlementCenter'),
        meta: {
          title: '结算中心'
        }
      },
      {
        path: 'userManagement',
        name: 'userManagement',
        component: () => import('../views/userManagement'),
        meta: {
          title: '用户管理'
        }
      },
      {
        path: 'courseManagement',
        name: 'courseManagement',
        component: () => import('../views/courseManagement'),
        meta: {
          title: '课程管理'
        }
      },
    ]
  },



  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login'),
    meta: {
      title: '登录'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let user = localStorage.getItem('user')
  user && (user = JSON.parse(user))
  // console.log(user);
  // console.log(to.name);
  if(to.name === 'login' || to.name === 'courseManagement'){
    next()
  }else{
    if(user.token){
      console.log(from);
      // next()
      if(from.name == 'login' && user?.user?.role === 0){
        next({ path: '/home/courseManagement' })
      }else{
        next()
      }
      
    }else{
      next({ path: '/login' })
    }
  }

})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export default router

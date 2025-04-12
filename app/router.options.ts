import type { RouteRecordRaw } from 'vue-router'
import type { RouterConfig } from '@nuxt/schema'


// 👉 Redirects
const redirects: RouteRecordRaw[] = [
  // ℹ️ We are redirecting to different pages based on role.
  // NOTE: Role is just for UI purposes. ACL is based on abilities.
  // {
  //   path: '/',
  //   name: 'index',
  //   meta: {
  //     middleware: to => {
  //       const { data: sessionData } = useAuth()

  //       const userRole = sessionData.value?.user.role

  //       if (userRole === 'admin')
  //         return { name: 'dashboards-crm' }
  //       if (userRole === 'client')
  //         return { name: 'access-control' }

  //       return { name: 'login', query: to.query }
  //     },
  //   },
  //   component: h('div'),
  // },
]


// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig>{
  routes: scannedRoutes => [
    ...redirects,
    ...scannedRoutes,
  ],
  scrollBehaviorType: 'smooth',
  scrollBehavior(to) {
    if (to.hash)
      return { el: to.hash, behavior: 'smooth', top: 60 }

    return { top: 0 }
  },
}

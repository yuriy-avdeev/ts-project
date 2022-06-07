import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import MyTeams from '@/pages/MyTeams.vue'
import NotFound from '@/pages/NotFound.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: { name: 'main-route' } // <- deploy Github => correspond on localhost:8080
  },
  {
    path: '/ts-project',
    name: 'main-route',
    component: MyTeams
  },
  {
    path: '/ts-project/team/:id',
    props: true,
    component: () => import('@/pages/Team.vue')
  },
  {
    path: '/ts-project/about',
    name: 'about',
    component: () => import('@/pages/About.vue')
  },
  {
    path: '/:notFound(.*)',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: "history",
  routes,
  base: process.env.BASE_URL,
  linkExactActiveClass: 'active-link'
})

export default router

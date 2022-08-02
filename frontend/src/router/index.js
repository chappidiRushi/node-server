import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import KanbanMain from '../views/kanban/KanbanMain.vue';
import KanbanCheckList from '../views/kanban/KanbanCheckList.vue';
import NotFound from '../views/common/NotFound.vue'
import NotFoundResource from '../views/common/NotFoundResource.vue'
import "../../public/style.css";
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about-us',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    alias:'/about'
  },

  {
    path: '/kanban/:id',
    name: 'canban',
    props: true,
    component: KanbanMain
  },
  {
    path: '/kanban/checkList/:id',
    name: 'KanbanCheckList',
    component: KanbanCheckList
  },
  {
    path: '/404/:resource',
    name: 'ResourceNotFound',
    component: NotFoundResource,
    props: true
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

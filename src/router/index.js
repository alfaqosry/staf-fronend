import { createRouter, createWebHistory } from "vue-router";

import Home from '../pages/Home.vue';
import { authStore } from "../stores/authstore";

const routes = [
    {

        path: '/',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true }
    },

    {
        path:'/login',
        name: 'Login',
        component: () => import('../pages/Login.vue'),
        
    },

    {
        path:'/register',
        name: 'Register',
        component: () => import('../pages/Register.vue')
    },
    {
        path:'/pegawai',
        name: 'Pegawai',
        component: () => import('../pages/pegawai/index.vue'),
        meta: { requiresAuth: true }
        
    },
    {
        path:'/pegawai/create',
        name: 'Pegawai.Create',
        component: () => import('../pages/pegawai/Create.vue'),
        meta: { requiresAuth: true }
        
    },
     {
        path:'/pegawai/edit/:id',
        name: 'Pegawai.Edit',
        component: () => import('../pages/pegawai/Edit.vue'),
        meta: { requiresAuth: true }
        
    },
    {
      path:'/pegawai/penugasan/:id',
      name: 'Pegawai.Penugasan',
      component: () => import('../pages/pegawai/Penugasan.vue'),
      meta: { requiresAuth: true }
      
    },
    {
      path:'/deparment',
      name: 'Department',
      component: () => import('../pages/department/Index.vue'),
      meta: { requiresAuth: true }
      
  },
  {
    path:'/department/create',
    name: 'Department.Create',
    component: () => import('../pages/department/Create.vue'),
    meta: { requiresAuth: true }
    
},
{
  path:'/department/edit/:id',
  name: 'Department.Edit',
  component: () => import('../pages/department/Edit.vue'),
  meta: { requiresAuth: true }
  
},
{
  path:'/absensi/',
  name: 'Absensi',
  component: () => import('../pages/absensi/Index.vue'),
  meta: { requiresAuth: true }
  
},
{
  path:'/daftar-izin-cuti/',
  name: 'Cuti',
  component: () => import('../pages/leaverequest/Index.vue'),
  meta: { requiresAuth: true }
  
},


   
];


const router = createRouter({
    history : createWebHistory(),
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
    routes: routes
});

router.beforeEach( async  (to, from, next) => {
  
    const useAuth = authStore(); 
    await useAuth.getUser();
  
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!useAuth.isAuthenticated) {
        next({ name: 'Login' });
      } else {
        next();
      }
    } else {
      next();
    }
  });
  

export default router;
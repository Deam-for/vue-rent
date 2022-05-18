import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// users
import Users from 'src/pages/users/users.vue'
import users_select from 'src/pages/users/users_select.vue'

import admin_num from 'src/pages/admin_num.vue'
import Upgrade from 'src/pages/Upgrade.vue'

//city_list
import city_list from 'src/pages/city_list.vue'
import city_area from 'src/pages/city_area.vue'

//login
import login from 'src/pages/login.vue'

//banner
import banner from 'src/pages/banner/lunbotu.vue'
import banner_add from 'src/pages/banner/banner_add.vue'
import banner_update from 'src/pages/banner/banner_update.vue'
import banner_filtrate from 'src/pages/banner/banner_filtrate.vue'
//house
import house_info from 'src/pages/house/house_info.vue'
import house_check from 'src/pages/house/house_check.vue'
import house_detail from 'src/pages/house/house_detail.vue'
import house_result from 'src/pages/house/house_query.vue'
//report
import report from 'src/pages/report/report.vue'
import report_detail from 'src/pages/report/report_detail.vue'
const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/login'
  },
  {
    path:'/login',
    name:'login',
    component:login
  },
  {
    path:'/city',
    component:DashboardLayout,
    children:[
      {
        path:'city_area',
        name:'city_area',
        component:city_area
      },
      {
        path:'city_list',
        name:'city_list',
        component:city_list
      }
    ]
  },
  {
    path:'/banner',
    component:DashboardLayout,
    children:[
      {
        path:'banner',
        name:'banner',
        component:banner
      },
      {
        path:'add',
        name:'add',
        component:banner_add
      },
      {
        path:'update',
        name:'update',
        component:banner_update
      },{
        path:'filtrate',
        name:'filtrate',
        component:banner_filtrate
      }
    ]
  },
  {
    path:'/house',
    component:DashboardLayout,
    redirect:'/house/house_info',
    children:[
      {
        path:'house_info',
        name:'house_info',
        component:house_info
      },
      {
        path:'check',
        name:'house_check',
        component:house_check
      },{
        path:'house_detail',
        name:'house_detail',
        component:house_detail
      },{
        path:'result',
        name:'result',
        component:house_result
      }
    ]
  },
  {
    path:'/report',
    component:DashboardLayout,
    redirect:'/report/report',
    children:[
      {
        path:'report',
        name:'report',
        component:report
      },
      {
        path:'detail',
        name:'detail',
        component:report_detail
      }
    ]
  },
  {
    path:'/users',
    component:DashboardLayout,
    redirect:'/users/users',
    children:[
      {
        path: 'users',
        name: 'users',
        component: Users
      },
      {
        path:'select',
        name:'users_select',
        component:users_select
      }
    ]
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/users',
    children: [
      {
        path: 'admin_num',
        name: 'admin_num',
        component: admin_num
      },
      {
        path: 'upgrade',
        name: 'Upgrade to PRO',
        component: Upgrade
      }
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes

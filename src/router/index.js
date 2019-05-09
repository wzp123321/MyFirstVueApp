/**
 * 注册路由模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import List from '../components/List.vue'
import Item from '../components/Item.vue'
import Add from '../components/Add.vue'
import Article from '../components/Article.vue'
import Main from '../components/Main.vue'
import Newperson from '../components/Newperson.vue'
import User from '../components/User.vue'
import User_Collect from '../components/User_Collect.vue'
import Reg from '../components/regist.vue'
import Login from '../components/login.vue'
import UpdateUser from '../components/UpdateUser.vue'
import PersonData from '../userpages/PersonData.vue'
import UpdatePwd from '../userpages/UpdatePwd.vue'
import UpdateUserImg from '../userpages/UpdateUserImg.vue'


Vue.use(VueRouter)

// 向外暴露路由对象
export default new VueRouter({
   routes :[
       {
           path:'/main',
           component:Main,
           children:[
            {  // list
                path:'/main/list',
                component : List,
                children :[
                    {
                        path: '/main/list/item',
                        component : Item,
                        meta : {title : '我是主页' }
                    },{
                        // 设置默认
                        path:'/main/list',
                        redirect:'/main/list/item' ,
                    }
                ]
            },
            {
                // 首页默认显示
                path : '/main',
                redirect :'/main/list' ,
                meta : {title : '我是主页' }
            }
           ]
       },
       {
        path:'/newperson',
        component:Newperson, 
        meta : {title:'新手入门'}
       },
        {
            path : '/add' ,
            component: Add,
            meta : {
                title:'新建主题',requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            }
        },
        {
            path : '/login' ,
            component: Login,
            meta : {title:'登录界面'}
        },
        {
            path : '/reg' ,
            component: Reg,
            meta : {title:'注册界面'}
        },
        {
            path : '/user/:loginname',
            component: User,
            meta : {
                title:'个人主页',
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            }
        },
        {
            path:'/article/:id',
            component:Article ,
            meta : { 
                title:'主题详情' ,
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            }
        },
        {
            path: '/updateuser' ,
            component : UpdateUser ,
            meta : {
                title : '修改个人信息',
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            },
            children:[
                { 
                    path: '/updateuser/persondata' ,
                    component : PersonData ,
                    meta : {
                        title : '个人资料' ,
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                    },
                },
                { 
                    path: '/updateuser/updatepwd' ,
                    component : UpdatePwd ,
                    meta : {
                        title : '修改密码' ,
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的 
                    },
                },
                { 
                    path: '/updateuser/updateuserimg' ,
                    component : UpdateUserImg ,
                    meta : {
                        title : '修改头像',
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                    },
                },
                { 
                    path: '/updateuser' ,
                    redirect : '/updateuser/persondata'
                },
            ]
            
        },
        {
            path : '/usercollect/:loginname',
            component: User_Collect ,
            meta : {
                title:'个人收藏' ,
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            }
        },
        {
           path:'/',
           redirect:'/main',
       }
]
})
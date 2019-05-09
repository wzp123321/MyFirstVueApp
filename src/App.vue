<template>
    <div>
        <div class="app-list-div">
        <ul class="app-list-ul">
            <li><router-link class="app-li-router-link" to="/main">首页</router-link>  </li>
            <li><router-link class="app-li-router-link" to="/newperson">新手入门</router-link></li>
            <li><router-link class="app-li-router-link" to="/reg">注册</router-link></li>
            <li v-show="!userLogin"><router-link class="app-li-router-link" to="/login">登录</router-link></li>
            <li v-show="userLogin" class="userExit app-li-router-link" @click="exit">退出</li>
        </ul>
            <span class="app-date">{{time | dataString}}</span>
            <button class="router-back" @click="back">返回上一层</button>
            <!-- 用户登录成功之后才会显示用户信息 -->
            <div class="usercenter" v-show="userLogin">
                <p class="gerenxinxi">个人资料</p>
                <!-- 从数据库如果没有查询到用户自己上传的头像 那么系统就给定一个头像 -->
                <p class="useravatarImg" ><i v-if="userAvatar===''" class="iconfont icon-gerenzhongxin"></i>
                <img v-show="userAvatar!==''" v-bind:src="userAvatar" style="width:36px ; height:36px"></p>
                <p class="userLoginsss">{{userLogin}}</p>
                <p class="userdescription">"{{userDesc}}"</p>
                <p class="createItems"><router-link class=" usercreateItem" to="/add">新建话题</router-link></p>
                <p class="createItems"><router-link class=" usercreateItem" to="/updateuser">修改信息</router-link></p>
            </div>
        </div>
        <div>
            <router-view v-wechat-title="$route.meta.title"></router-view>
        </div>
    </div>
</template>

<script > 
import Vue from 'vue'

export default {
 data () {
      return {
          time : new Date() ,
          userAvatar : window.localStorage.getItem("user_avatar") ,
          userLogin : window.localStorage.getItem("loginusername") ,
          userDesc : window.localStorage.getItem("user_desc") ,
      }
  },
  methods : {
      back () {
          this.$router.back();
      },
      exit () {
          window.localStorage.clear();
          window.location = '/'
      }
  }
}
 // 自定义过滤器
   Vue.filter('dataString',function(value){
       var year = value.getFullYear()
       var month = value.getMonth()+1
       var day = value.getDate()
       var date = year+'-'+month+'-'+day
       return date;
   })
</script>
<style>
.app-list-div{
    margin: -7px;
    padding: 5px;
    height:50px;
    background-color: dimgray;
    color: black;
}
.app-list-ul{
    position: absolute;
    right: 535px;
    top: 22px;
}
.app-list-ul li{
    float: left;
    list-style: none;
    margin-left: 40px;
}
.userExit{
    position: absolute;
    top:3px;
    right:-56px;
}
.usercenter{
    position: absolute;
    top: 53px;
    right: 135px;
    width: 230px;
    height:270px;
    border: 1px solid #c7bfbf;
    border-radius: 5px;
    background-color: white;
}
.gerenxinxi{
    font-size: 12px;
    width:200px;
    margin-left: 10px;
    border-bottom: 1px solid #999;
    padding: 5px;
}
.userLoginsss{
    font-size: 13px;
    margin: -30px 0 0 70px;
}
.useravatarImg{
    margin: 35px 0 0 20px;
}
.userdescription{
    font-size: 13px;
    margin: 35px 0 0 8px;
}
.usercreateItem{
    font-size: 18px;
    color:#fff ;
}
.createItems{
    width:74px;
    margin-left: 8px;
    margin-top: 23px;
    padding: 7px 12px 7px 12px;
    border-radius: 5px;
    background-color: #80bd01;
}
.app-date{
    position: absolute;
    top:40px;
    right:390px;
    color: #333;
    font-size: 14px;
}
.app-li-router-link{
    font-size: 13px;
    color: #ccc;
}
ul{
    padding: 0px;
    margin: 0px;
}
.router-back{
    position: fixed;
    width: 100px;
    height:40px;
    border-radius: 6px;
    bottom: 50px;
    right:50px;
    background-color: white;
}
    .router-back:hover{
        opacity: 1;
    border: 1px solid #666;
    }
</style>


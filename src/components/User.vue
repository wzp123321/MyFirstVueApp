<template>
    <div id="user">
        <div class="user-main udiv">
            <img :src="users.avatar_url" class="user-main-img" style="width:60px;height:60px">
            <p class="user-main-p">  {{users.githubUsername}}</p>
            <p class="user-main-p" v-show="usercollections.length>0" @click="pushShowCollect(users.loginname)">{{usercollections.length}}个收藏</p>
            <p class="user-main-p" v-show="usercollections.length===0">暂无收藏</p>
            <p class="user-main-p">{{users.score}} 积分</p>
        </div>
        <div class="user-topics udiv" v-if="usersCreates">
            <p class="user-topics-p">最近创建的话题</p>
            <ul class="topics" ref="menuItem" >
                <li v-for="(topic,index) in usersCreates" :key="index"  class="users-lis">
                    <span @click="pushShow(topic.author.loginname)"><img  class="userImg" :src="topic.author.avatar_url"> </span>
                    <span class="user-topics-spanname">{{topic.author.loginname}}</span>
                     <span @click="pushShowTitle(topic.id)" class="user-topics-spantitle">{{topic.title}}</span>
                     <span class ="user-topics-spandate">{{topic.last_reply_at | updateTime}}</span>
                </li>
            </ul>
            <el-pagination  @current-change="handlecreateCurrentChange"  
              :current-page="currentcreatePage" background layout=" total , prev ,pager , next, jumper " :total="tatolcreatepage*9">
            </el-pagination>
        </div>
        <div class="user-topics udiv" v-if="usersReplies">
            <p class="user-topics-p">最近参与的话题</p>
            <ul class="replies" ref="repliesItem">
                <li v-for="(replie ,index) in usersReplies" :key="index" class="users-lis">
                    <span @click="pushShow(replie.author.loginname)"><img  class="userImg" :src="replie.author.avatar_url"> </span>
                    <span class="user-topics-spanname">{{replie.author.loginname}}</span>
                    <span @click="pushShowTitle(replie.id)" class="user-topics-spantitle">{{replie.title}}</span>
                    <span class="user-topics-spandate">{{replie.last_reply_at | updateTime}}</span>
                </li>
            </ul>
            <el-pagination  @current-change="handlereplieCurrentChange"  
              :current-page="currentrepliePage" background layout=" total , prev ,pager , next, jumper " :total="tatolrepliepage*9">
            </el-pagination>
        </div>
        <router-view v-wechat-title="$route.meta.title"></router-view>
    </div>
</template>
<script>
import axios from 'axios'
// 引入定义的ajax请求函数
import {reqUserCollections} from '../api'
import {reqUserDetails} from '../api'

export default {
data () {
    return {
        users: {},
        usercollections : {},
        // 用户创建
        creates : [],
        currentcreatePage : 1 ,
        tatolcreatepage : 0 ,
        usersCreates : [], 
         // 用户参与
        replies : [],
        currentrepliePage : 1 ,
        tatolrepliepage : 0 ,
        usersReplies : [], 
    }
},
async mounted () {
    const result = await reqUserDetails(this.$route.params.loginname)
    const users = result.data
    const creates = result.data.recent_topics
    const replies = result.data.recent_replies
    this.replies = replies
    this.creates = creates
    this.users = users  

    const result1 = await reqUserCollections(this.$route.params.loginname)
    const usercollections = result1.data
    this.usercollections = usercollections 

    this.initUserscreates();
    this.inittatolcreatePage();
    this.initUsersreplies();
    this.inittatolrepliePage();
} ,
methods: {
    // 初始化渲染的数组
    initUserscreates : function(){
    this.usersCreates = this.creates.slice(0,9)
    },
    inittatolcreatePage : function(){
    this.tatolcreatepage = this.creates.length/9
    },
    handlecreateCurrentChange (val) {
    this.currentcreatePage = val
    this.usersCreates = this.creates.slice((val-1)*9,val*90);
    },
     // 初始化渲染的数组
    initUsersreplies : function(){
    this.usersReplies = this.replies.slice(0,9)
    },
    inittatolrepliePage : function(){
    this.tatolrepliepage = this.replies.length/9
    },
    handlereplieCurrentChange (val) {
    this.currentrepliePage = val
    this.usersReplies = this.replies.slice((val-1)*9,val*9);
    },
    // 前往用户界面
    pushShow(loginname){
        this.$router.push('/user/'+loginname)
    },
    // 前往用户收藏界面
    pushShowCollect(loginname) {
    this.$router.push("/usercollect/" + loginname);
    },
    // 前往文章详情页面
    pushShowTitle (id) {
        this.$router.push("/article/"+id)
    },
  
},
// 监视用户对象变化
watch :{
    $route : function(value){
        const url = 'https://cnodejs.org/api/v1/user/'+value.params.loginname
            axios.get(url).then(response=>{
        const result = response.data
        const users = result.data
        this.users = users
            }).catch(error =>{
                alert('请求失败')
            })
    }
}
}
</script>
<style>
.udiv{
    width:1200px;
    margin: 25px 0 0 300px;
}
.replies,.topics{
    height:500px;
}
.user-main{
    border:  1px solid rgb(238, 233, 233);
    height:200px;
}
.user-main-img{
    margin: 20px 0 0 35px;
}
.user-main-p{
    font-size: 14px;
    margin: 3px 0 0 30px;
}
.user_img{
    width:60px;
    height:60px
}
#user img{
    width:40px;
    height:40px;
    border-radius: 5px;
}
.users-lis{
    display: inline-block;
    width:1170px;
    margin-left: 7px;
    height:40px;
    padding: 5px;
    border:  1px solid rgb(238, 233, 233);
}
.user-topics li{
    position: relative;
}
.user-topics-p{
    font-size: 14px;
    color: #444;
    margin: 10px 0 18px 15px;
}
.user-topics-spanname {
    position: absolute;
    top:15px;
    left:70px;
}
.user-topics-spantitle {
    position: absolute;
    top:15px;
    left:220px;
    color: #08c;
    font-size: 16px;
}
.user-topics-spandate {
    position: absolute;
    top:15px;
    right:60px;
}
.lookmore{
    font-size: 14px;
    color:#666;
    margin: 7px 0 0 314px;
}
</style>


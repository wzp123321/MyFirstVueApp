<template>
    <div class="articles">
        <div class="articles-top">
            <div class="articles-div1">
            <span class="article-istop article-tab" v-if="userarticle.top">置顶</span>
                <span class="article-isother article-tab" v-if="!userarticle.top && userarticle.tab==='share'">分享</span>
                <span class="article-isother article-tab" v-if="!userarticle.top &&  userarticle.tab==='ask'">提问</span>
                <span class="article-isother article-tab" v-if="!userarticle.top &&  userarticle.good">精华</span>
                <span class="article-isother article-tab" v-if="!userarticle.top &&  userarticle.tab==='job'">工作</span>
        <p class="article-title">{{userarticle.title}}</p>
        <ul class="article-ul" v-if="userarticle.author">
            <li>创建时间：{{dateformat(userarticle.create_at)}}</li>
            <li>作者：{{userarticle.author.loginname}}</li>
            <li>浏览量：{{userarticle.visit_count}}</li>
        </ul>
        </div>
        <div class="article-content" v-html="userarticle.content"></div>
        </div>
        <div class="user-replies">
            <ul>
                <li class="user-replies-li" v-for="(replie,index) in userreplies" :key="index" v-if="userreplies">
                    <img :src="replie.author.avatar_url">
                    <span class="user-name-span">{{replie.author.loginname}}  <span class="floor-span">{{index+1}}楼</span></span>
                    <span class="replie-content-span" v-html="replie.content"></span>
                    <span class="ups-img" @click="upsClick(replie.reply_id)"><i class="iconfont icon-appreciatefill"></i></span>
                    <span class="count-ups">{{replie.ups.length}}</span>
                </li>
            </ul>  
                <el-pagination @current-change="handleCurrentChange"  
                :current-page="currentPage" background layout=" total , prev ,pager , next, jumper " :total="tatolpage*15">
                </el-pagination> 
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import {reqTopicsdetails} from '../api'
import {reqAddups} from '../api';

export default {
    data () {
        return {
            userarticle : {},
            currentPage : 1 ,
            tatolpage : 0 ,
            allreplies : [],
            userreplies : []
        }
    },
    async mounted () {
        const result = await reqTopicsdetails(this.$route.params.id)
        const userarticle = result.data
        const allreplies = result.data.replies
        this.allreplies = allreplies
        this.userarticle = userarticle
        
        this.initreplies();
        this.inittatolPage();
    },
    methods:{
         // 初始化渲染的数组
        initreplies : function(){
            this.userreplies = this.allreplies.slice(0,15)
        },
        inittatolPage : function(){
            this.tatolpage =this.allreplies.length/15
        },
        handleCurrentChange (val) {
            this.currentPage = val
            this.userreplies = this.allreplies.slice((val-1)*15,val*15);
        },
        dateformat (time){
            var date=new Date(time);
            var year=date.getFullYear();
            var month= date.getMonth()+1;
            var day=date.getDate();
            var hours=date.getHours();
            var minutes=date.getMinutes();
            // 拼接
            return year+"-"+month+"-"+day+" "+hours+":"+minutes;
        },
        // 发送请求表示点赞
        upsClick (replieId){
             axios.post('https://cnodejs.org/api/v1/reply/'+replieId+'/ups', {
                accesstoken  : 'e272e7e6-d288-43ed-ad3f-ff8d1f98071e',
                }).then(function (response) {
                console.log(response);
                }).catch(function (error) {
                console.log(error);
            });
        }
    },
}
</script>
<style>
.articles{
    margin-top: -14px;
    background-color: #e1e1e1;;
}
.articles-top{
    width: 1100px;
    margin-left:  370px;
    background-color: white;
}
.articles-div1{
    position: relative;
    height:120px;
    margin-top: 15px;
    border-bottom: #e1e1e1;
}
.user-replies img{
    width: 30px;
    height: 30px;
    border-radius: 5px;
}
.article-tab{
    position: absolute;
    top:35px;
    left: 15px;
    border-radius: 6px;
}
.article-istop{
    display: inline-block;
    width:36px;
    height:24px;
    background-color: greenyellow;
}
.article-isother{
    display: inline-block;
    width:36px;
    height:24px;
    background-color:#999;
}
.article-title{
    position: absolute;
    top:  5px;
    left: 70px;
    font-size: 22px;
    color: #333;
}
.article-ul{
    position: absolute;
    top:75px;
    left:20px;
}
.article-content{
    margin: 20px 0 15px 0;
    font-size: 15px;
    padding: 10px;
}
.article-content img{
    width:800px;
}
.article-ul>li{
    float: left;
    padding: 3px;
    margin-left: 35px;
}
.user-replies{
    margin: -15px 0 0 370px;
}
.user-replies-li{
    width:1088px;
    position: relative;
    border: 1px solid rgb(209, 204, 204);
    padding: 3px;
    height:45px;
}
.user-name-span{
    position: absolute;
    top:5px;
    left:45px;
    color: #666;
    font-size: 13px; 
}
.floor-span{
    color: #08c;
}
.replie-content-span{
    position: absolute;
    display: inline-block;
    height: 76px;
    overflow: hidden;
    top: 14px;
    left: 170px;
    font-size: 14px;
    padding: 0 ;
    margin: 0 ;
}
.ups-img{
    position: absolute;
    top:15px;
    right: 30px;
}
.count-ups{
    position: absolute;
    top:15px;
    right: 10px; 
    color: gray;
    font-size: 15px;
}
</style>


<template>
    <div class="user-collection">
        <ul class="select-li">
            <li v-for="(collection ,index) in collections" :key="index">
                <span @click="pushShow(collection.author.loginname)">
                <img class="userImg" style="width:40px;height:40px" :src="collection.author.avatar_url">
                </span>
                 <!--答复/访问-->
                <span class="answerAndvisit">
                {{collection.reply_count}}/{{collection.visit_count}}
                </span>
                <span class="isgood" v-if="!collection.top && collection.good">精华</span>
                <p class="collect-title">
                <span @click="pushShowTitle(collection.id)">{{collection.title}}</span>
                </p>
          </li>
        </ul>
        <router-view v-wechat-title="$route.meta.title"></router-view>
    </div>
</template>
<script>
import axios from 'axios'
// 引入新建的ajax请求函数
import {reqUserCollections} from '../api'

export default {
    data () {
        return {
            collections : {}
        }
    },
    methods : {
        // 前往用户主页界面
        pushShow(loginname) {
        this.$router.push("/user/" + loginname);
        },
        // 前往文章详情页面
        pushShowTitle (id) {
        this.$router.push("/article/"+id)
        },
    },
   // 这里是在创建的index.js中创建请求函数 然后这里引入请求函数 然后直接调用接收即可 不用在这里发送ajax请求了
    async mounted () {
        const result = await reqUserCollections(this.$route.params.loginname)
        const collections = result.data
        this.collections = collections
    }
}
</script>
<style>
.user-collection{
    width: 60%;
    margin-top: 7px;
    margin-left: 20%;
    border: 1px solid  #efeded;
    background-color: white;
}
.select-li li {
    display: inline-block;
    width: 99%;
    height: 50px;
    border-bottom: 1px solid #efeded;
    position: relative;
    padding: 5px;
}
.select-li :hover{
    background-color: #efeded;
}
.answerAndvisit {
    position: absolute;
    top: 14px;
    left:  73px;
    font-size: 14px;
}
.userImg {
  position: absolute;
  top: 7px;
  left: 19px;
  border-radius: 10px;
}
.isgood {
  display: inline-block;
  width: 34px;
  height: 21px;
  margin: 8px 0 0 150px;
  color: #fff;
  border-radius: 5px;
  background-color: #80bd01;
}
.collect-title {
  position: absolute;
  left: 359px;
  top: -5px;
  font-size: 16px;
  color: #08c;
}
</style>

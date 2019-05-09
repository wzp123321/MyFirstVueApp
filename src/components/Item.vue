<template>
  <div class="show-main-div">
      <ul class="select-li">
        <li v-for="(user,index) in users" :key="index">
          <span @click="pushShow(user.author.loginname),openFullScreen2()">
            <img class="userImg" style="width:30px;height:30px" :src="user.author.avatar_url">
          </span>
          <span class="author">{{user.author.loginname}}</span>
          <span class="istop tab" v-if="user.top" >置顶</span>
          <span class="isother tab" v-if="!user.top && !user.good &&  user.tab==='share'">分享</span>
          <span class="isother tab" v-if="!user.top && !user.good && user.tab==='ask'">提问</span>
          <span class="isother tab" v-if="!user.top && user.good">精华</span>
          <span class="isother tab" v-if="!user.top && !user.good && user.tab==='job'">工作</span>
          <!--答复/访问-->
          <span class="answerAndvisit">
            <span class="replyCount">{{user.reply_count}}</span>
            <span>/</span>
            <span>{{user.visit_count}}</span>
          </span>
          <p class="title">
            <span @click="pushShowTitle(user.id),openFullScreen2()">{{user.title}}</span>
          </p>
          <div class="createtime">{{user.create_at | updateTime}}</div>
        </li>
    </ul>
    <div class="pagination">
      <el-pagination class="el-page" @current-change="handleCurrentChange"  
       :current-page="currentPage" background layout=" total , prev ,pager , next, jumper " :total="tatolpage*13">
    </el-pagination>
    </div>
    <div>
      <router-view v-wechat-title="$route.meta.title"></router-view>
    </div>
  </div>
</template>
<script>
// 引入axios ajax请求库
import axios from "axios";
import {reqTopics} from '../api'

export default {
  data() {
    return {
      persons: null,  // 初始化一个数组
      currentPage : 1 ,
      tatolpage : 0 ,
      users : []
    };
  },
  methods: {
    // 初始化渲染的数组
    initUsers : function(){
       this.users = this.persons.slice(0,13)
    },
    inittatolPage : function(){
      this.tatolpage = this.persons.length/13
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.users = this.persons.slice((this.currentPage-1)*13,this.currentPage*13);
    },
    // 前往用户主页界面
    pushShow(loginname) {
      this.$router.push("/user/" + loginname);
    },
    // 前往文章详情页面
    pushShowTitle (id) {
      this.$router.push("/article/"+id)
    },
    // 显示加载中页面
    openFullScreen2() {
        const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.9)'
        });
        setTimeout(() => {
        loading.close();
        }, 500);
    },
  },
  async mounted() {
    const result = await reqTopics()
    const persons = result.data
    this.persons = persons

    this.initUsers();
    this.inittatolPage();
  },
  watch: {
    $route: function(value) {
      const tab = value.query.tab;
      // 声明请求地址
      if (tab === "") {
        const url = "https://cnodejs.org/api/v1/topics";
        axios.get(url).then(response => {
            const result = response.data;
            const persons = result.data
            this.persons = persons;
          }).catch(error => {
            alert("请求失败");
          });
      } else if (tab === "share") {
        const url = "https://cnodejs.org/api/v1/topics?tab=share";
        axios.get(url).then(response => {
            const result = response.data;
            const persons = result.data
            this.persons = persons;
          }).catch(error => {
            alert("请求失败");
          });
      } else if (tab === "ask") {
        const url = "https://cnodejs.org/api/v1/topics?tab=ask";
        axios.get(url).then(response => {
            const result = response.data;
            const persons = result.data
            this.persons = persons;
          }).catch(error => {
            alert("请求失败");
          });
      } else if (tab === "job") {
        const url = "https://cnodejs.org/api/v1/topics?tab=job";
        axios.get(url).then(response => {
            const result = response.data;
            const persons = result.data
            this.persons = persons;
          }).catch(error => {
            alert("请求失败");
          });
      } else if (tab === "good") {
        const url = "https://cnodejs.org/api/v1/topics?tab=good";
        axios.get(url).then(response => {
            const result = response.data;
            const persons = result.data
            this.persons = persons;
          }).catch(error => {
            alert("请求失败");
          });
      }
    }
  }
};
</script>
<style>
.show-main-div{
  background-color: #e1e1e1;
}
.select-li{
  width: 60%;
  height:900px;
  margin-left: 20%;
  margin-top: 7px;
  background-color: white;
}
.pagination {
  width: 1088px;
  height:50px;
}
.el-page{
  float: right;
  margin:  10px -430px 12px 0 ;
}
.select-li li {
  display: inline-block;
  width: 98%;
  height: 40px;
  border-top: 1px solid #efeded;
  position: relative;
  padding: 10px;
}
.select-li :hover{
  background-color: rgb(212, 205, 205);
}
.userImg {
  position: absolute;
  top: 7px;
  left: 19px;
  border-radius: 10px;
}
.tab {
  position: absolute;
  top: 20px;
  left: 155px;
  font-size: 14px;
  display: inline-block;
  padding: 5px;
  border-radius: 4px;
}
.istop {
  background-color: greenyellow;
}
.isother {
  background-color: #999;
}
.answerAndvisit {
  position: absolute;
  top: 22px;
  left: 80px;
  color : #b4b4b4;
  font-size: 10px;
}
.replyCount{
  color : #9e78c0;
}

.title {
  position: absolute;
  left: 219px;
  top: 22px;
  color: #333;
  font-size: 16px;
  width: 800px;
}
.createtime {
  position: absolute;
  top: 33px;
  left: 1025px;
  color: #333;
  font-size: 14px;
}
.author {
  position: absolute;
  top: 40px;
  left: 12px;
  font-size: 12px;
}
</style>




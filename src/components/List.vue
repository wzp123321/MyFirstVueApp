<template>
    <div>
        <ul class="show-ul ">
            <li  class="show-ul-li" v-for="(option,id) in options" :key="id" @click="backlight(id),openFullScreen2()" v-bind:class="{on:id==backspan}">
                <router-link class="list-routerLi" :to="{path:'/main/list/item',query:{tab:option.tab}}" >{{option.title}}</router-link>
            </li>
        </ul>
        <div>
          <router-view v-wechat-title="$route.meta.title"></router-view>
        </div>
    </div>
</template>
<script>

export default {
data () {
    return {
        backspan : 0 ,//控制点亮状态 -1为默认不点亮
        options:[
            {id :1 , tab: '',title : '全部'},
            {id :2 , tab: 'share',title: '分享'},
            {id :3 , tab: 'ask',title : '问答'},
            {id :4 , tab: 'job',title: '工作'},
            {id :5 , tab: 'good',title:'精华'}
        ]
    }
},
methods : {
    backlight:function(id){  //当点击时候点亮，同级的span标签删除Class
        this.backspan = id;
    },
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
    }
}
}
</script>
<style>
.on{
    background-color: #bde701;
    color: white;
    border-radius: 5px;
}
.show-ul{
    margin-left: 385px;
}
.list-routerLi{
    color: #015ebd;
    font-size: 14px;
}
.show-ul-li{
    float: left;
    margin: 15px;
    padding: 3px;
}
</style>

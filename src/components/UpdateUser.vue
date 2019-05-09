<template>
    <div>
        <ul class="updateuser-ul">
            <li :class="{on: '/updateuser/persondata'===this.$route.path}"><router-link to="/updateuser/persondata" >个人资料</router-link></li>
            <li :class="{on: '/updateuser/updatepwd'===this.$route.path}"><router-link to="/updateuser/updatepwd">修改密码</router-link></li>
            <li :class="{on: '/updateuser/updateuserimg'===this.$route.path}"><router-link to="/updateuser/updateuserimg">修改头像</router-link></li>
        </ul>
        <div class="update-router-view">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
.updateuser-ul{
    margin-top: 15px;
    margin-left: 560px;
}
.updateuser-ul li{
    display: inline-block;
    padding: 15px;
    margin-left: 100px;
}
.update-router-view{
    margin: 40px 0 0 674px;
}
.on{
    background-color: #04d67f;
}
</style>


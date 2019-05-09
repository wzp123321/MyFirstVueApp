<template>
    <div class="persondata">
        <p><span class="sp">用户名</span><el-input placeholder="请输入内容" v-model="username" clearable style="width:220px"></el-input></p>
        <p><span class="sp">生日</span><el-input type="date" v-model="birthday" clearable style="width:220px"></el-input></p>
        <p><span class="sp">性别</span> <el-radio-group v-model="gender">
            <el-radio :label=1>男</el-radio>
            <el-radio :label=0>女</el-radio>
        </el-radio-group></p>
       <p><span class="sp">地区</span><el-input placeholder="请输入您所在的地区" v-model="address" clearable style="width:220px"></el-input></p>
        <p><span class="sp">自我评价</span></p>
        <el-input type="textarea" style="width:320px;margin-left:110px" :rows="2" placeholder="请输入内容" v-model="user_desc"></el-input>
        <p><el-button type="primary" style="width:250px;margin-left:45px" @click="updateInfo" >修改</el-button></p>
    </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'

export default {
data() {
    return {
    username: window.localStorage.getItem("loginusername") ,
    gender :  window.localStorage.getItem("gender") ,
    birthday : window.localStorage.getItem("birthday"),
    user_desc : window.localStorage.getItem("user_desc"),
    userId : window.localStorage.getItem("userId"),
    address : '',
    }
},
methods: {
    // 发送请求更新用户信息
    updateInfo (){
        let params = new URLSearchParams();
        params = qs.stringify({
            userId : this.userId ,
            username : this.username,
            birthday : this.birthday,
            gender : this.gender,
            address : this.address,
            user_desc : this.user_desc
        })
        axios.post("http://localhost:8082/updateinfo",
            params,
        ).then(response=>{
            if(response.data.status===200){
                this.username = response.data.data.username 
                this.$message.success('更新成功')
            }else{
                this.$message.error('更新失败')
            }
            console.log(response)
        })
    }
}
}
</script>
<style>
.sp{
    display: inline-block;
    width: 80px;
    text-align: center ;

}
.persondata p{
    margin-left: 100px ;
    margin-top: 35px;
}
</style>


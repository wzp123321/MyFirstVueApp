<template>
    <div>
        <div class="loginform">
            <h1>User Login</h1><br>
            <el-form  ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item class="uname-el" label="用户名" >
                    <el-input type="text" v-model="username" placeholder="USERNAME" ></el-input>
                </el-form-item>
                <el-form-item  label="密码">
                    <el-input type="password" v-model="password" placeholder="PASSWORD" ></el-input>
                </el-form-item>
                    <el-checkbox class="remberpwd"  v-model="flag" @click="!flag">记住密码</el-checkbox>
                <el-form-item>
                    <el-button style="width:100px" type="primary" @click="handleLogin">登录</el-button>
                    <el-button style="width:100px"  @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
import axios from 'axios'
export default {
    data(){
        return {
            // 读取本地数据
            username: window.localStorage.getItem("username") ,
            password: window.localStorage.getItem("password") ,
            // 用于判断记住密码是否被选中
            flag: false 
        }
    },
    methods:{
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleLogin(){
            // 处理跨域提交的数据
            let params = new URLSearchParams();
            params = qs.stringify({
                username : this.username ,
                password : this.password
            })
            // 发送请求
            axios.post(
                "http://localhost:8082/userlogin",
                params,
            ).then(response=>{
                if(response.data.status === 200){
                    this.$message.success('登录成功');
                    window.localStorage.setItem("userId",response.data.data.userId)
                    window.localStorage.setItem("loginusername",this.username)
                    window.localStorage.setItem("loginpassword",this.password)
                    window.localStorage.setItem("gender",response.data.data.gender)
                    window.localStorage.setItem("birthday",response.data.data.birthday)
                    window.localStorage.setItem("user_avatar",response.data.data.user_avatar)
                    window.localStorage.setItem("user_desc",response.data.data.user_desc)
                    if(this.flag){
                        // 将账号密码存到本地     这里是选择了保存到本地
                        window.localStorage.setItem("username",this.username)
                        window.localStorage.setItem("password",this.password)
                    }
                    // 回到首页
                    window.location = '/'
                }else{
                    this.$message.error(response.data.regMsg);
                }
                console.log(response)
            })
        }
    }

}
</script>
<style>
.remberpwd{
    margin-left: 60px;
    margin-bottom: 20px;
}
.loginform{
    width:410px;
    height: 330px;
    margin-top: 15px;
    margin-left:750px;
    border: 1px solid #e8e1e1;
    border-radius: 5px;
}
.loginform h1{
    margin: 50px 0 0 125px;
    font-size: 24px;
}
.loginform input{
    width:220px;
    height:30px;
    border-radius: 5px;
    border: 1px solid #999;
}

</style>


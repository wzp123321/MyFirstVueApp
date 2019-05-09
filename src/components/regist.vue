<template>
    <div>
        <div class="regform">
            <h1>User Regist</h1><br>
             <el-form  ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" >
                    <el-input v-model="username" placeholder="USERNAME" ></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="password" placeholder="PASSWORD"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button style="width:100px" type="primary" @click="handleReg">注册</el-button>
                    <el-button style="width:100px"  @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'

export default {
    data(){
        return {
            username: '' ,
            password: '' ,
        }
    },
    methods:{
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleReg(){
            let params = new URLSearchParams();
            params = qs.stringify({
                username : this.username,
                password : this.password
            })
            axios.post(
                "http://localhost:8082/userreg",
                params,
                {   headers: {'Content-Type':'application/x-www-form-urlencoded'}
            }).then((response)=>{
                if(response.data.status===200){
                    this.$message.success('注册成功');
                    this.$router.replace('/login');
                }else{
                     this.$message.error('注册失败'+response.data.regMsg);
                }
                console.log(response)
            }).catch((error)=>{
               
                console.log(error)
            })
        }
    }
    
}
</script>
<style>
.regform{
    width:420px;
    height: 300px;
    margin-top: 15px;
    margin-left:750px;
    border: 1px solid #e8e1e1;
    border-radius: 5px;
}
.regform h1{
    margin: 50px 0 0 125px;
    font-size: 24px;
}
.regform input{
    width:240px;
    height:30px;
    border-radius: 5px;
    border: 1px solid #999;
}

</style>


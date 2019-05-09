<template>
    <div>
         <div class="persondata">
        <p><span class="sp">原密码</span><el-input type="password" placeholder="请输入原密码" v-model="oldpassword" clearable style="width:220px"></el-input></p>
        <p><span class="sp">新密码</span><el-input type="password" placeholder="请输入新密码" v-model="newpassword" clearable style="width:220px"></el-input></p>
        <p><span class="sp">确认密码</span><el-input type="password" placeholder="请确认新密码" v-model="surenewpassword" clearable style="width:220px"></el-input>
        <span v-show="pwdissame" style="color:red">两次输入密码不一致！</span></p>
        <p><el-button type="primary" style="width:250px;margin-left:40px" @click="updateuserpwd" >修改</el-button></p>
    </div>
    </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'

export default {
    data(){
        return {
            userId : window.localStorage.getItem("userId"),
            oldpassword : '' ,
            newpassword : '' ,
            surenewpassword : '' ,
            pwdissame : false 
        }
       
    },
    methods: {
        updateuserpwd (){
            if(this.newpassword!==this.surenewpassword){
                const pwdissame = true ;
                this.pwdissame = pwdissame
            }else{
                let params = new URLSearchParams();
                params = qs.stringify({
                    userId : this.userId ,
                    oldpassword : this.oldpassword ,
                    newpassword : this.newpassword 
                })
                axios.post('http://localhost:8082/updateuserpwd',
                    params
                ).then(response=>{
                    if(response.data.status===200){
                        window.localStorage.setItem("loginpassword",response.data.data)
                        this.$message.success('修改成功')
                        const pwdissame = false 
                        this.pwdissame = pwdissame
                    }else{
                        this.$message.error('更新失败'+response.data.regMsg)
                    }
                })
            }
            
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


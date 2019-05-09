<template>
    <div>
        <img v-if="imgsrc" style="width:150px;height:150px;margin-left:170px" v-bind:src="imgsrc">
        <i v-if="imgsrc===''" class="iconfont icon-gerenzhongxin" style="font-size:100px;margin-left:180px"></i>
        <p><el-button type="primary" style="width:180px;height:35px;margin-left:150px;margin-top:15px" @click="showupImgs">修改头像</el-button></p>
        <div class="showupImg" v-show="showupImg">
            <p class="closeimg" @click="closeshowimg"><i class="iconfont icon-close"></i></p>
            <el-upload
                class="avatar-uploader"
                action="http://localhost:8082/updateuserimg"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                name="file">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    data (){
        return {
            imgsrc: window.localStorage.getItem("user_avatar") ,
            showupImg : false ,
            imageUrl: '' ,
            file : ''
        }
    },
    methods :{
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            if(res.data.status===200){
                console.log('上传成功！') 
            }else{
                console.log('上传失败')
            }
        },
        beforeAvatarUpload(file) {
            /// 要求图片格式
            const isJPG = file.type === 'image/jpeg' || 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG / PNG格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        showupImgs (){
            const showupImg = true;
            this.showupImg = showupImg
        },
        closeshowimg() {
            const showupImg = false;
            this.showupImg = showupImg
      }
    }
}
</script>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed #6f6969;
    border-radius: 6px;
    cursor: pointer;
    margin-left: 150px;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #0060c3;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
.showupImg{
    position: relative;
    width: 550px;
    margin-left: -90px;
    padding: 50px;
    margin-top: 35px;
    border: 1px solid #999;
}
.closeimg{
    position: absolute;
    top: 0px;
    right: 1px;
}
</style>


<template>
  <div style="margin-top:30px;position:relative">
    <a-upload :fileList="priviewFileList" :remove="handleImgsRemove" :beforeUpload="beforeImgsUpload">
      <a-button style="margin-left:30px;" >
        <a-icon type="upload"/>Select File
      </a-button>
    </a-upload>
    <a-button
      type="primary"
      @click="handleImgsPrepareUpload"
      :disabled="priviewFileList.length === 0"
      :loading="priviewLoad==='Uploading'"
      style="position:absolute;top:0px;left:260px"
    >{{priviewLoad}}</a-button>
    <div v-for="(img ,index) in this.imgs" :key="index">
      <img :src="img.url" style="min-width:150px;float:left;margin-left:35px;margin-top:15px">
    </div>
  </div>
</template>
<script>
import api from "@/assets/api/apiGateWay/index.js";
import axios from "axios";
import SparkMD5 from "spark-md5";

export default {
  data() {
    return {
      priviewFileList: [],
      imgs: [],
      priviewLoad: "Start Upload",
    };
  },
  methods: {
    handleImgsRemove(file) {
      const index = this.priviewFileList.indexOf(file);
      const newFileList = this.priviewFileList.slice();
      newFileList.splice(index, 1);
      this.priviewFileList = newFileList;
    },
    beforeImgsUpload(file) {
      this.imgs = []
      this.priviewFileList = [...this.priviewFileList, file];
      return false;
    },
    handleImgsPrepareUpload() {
      // 限制上传数量
      if(this.priviewFileList.length>6){
        this.$message.error('每次至多上传六张图片!')
        return
      }
      this.priviewFileList.forEach(img=>{
        var extension = img.name.slice(img.name.lastIndexOf(".") + 1);
        if (extension !== "png" && extension !== "jpg" && extension !=='gif') {
          this.$message.error("不支持该格式！");
          return;
        }
        this.priviewLoad = "Uploading";
        // 文件预上传
        api
          .getFilePrepare({ extension: extension })
          .then(response => {
          var params = response.data.data.uploads[0].params;
          var url = response.data.data.uploads[0].host;
          axios({
            url: url,
            method: "post",
            headers: {
              "Content-Type": "multipart/form-data"
            },
            data: {
              appKey: params.appKey,
              contextId: params.contextId,
              expires: params.expires,
              token: params.token,
              file: img
            },
            transformRequest: [
              function(oldData) {
                var form = new FormData();
                for (let item in oldData) {
                  form.append(item, oldData[item]);
                }
                return form;
              }
            ]
          })
            .then(response => {
                this.priviewLoad = "Loaded";
                this.imgs.push(response.data)
                if(this.imgs.length===this.priviewFileList.length){
                  this.priviewFileList = [] // 清空图片数组
                  for(let i=0;i<this.imgs.length;i++){
                    delete this.imgs[i].contextId
                    delete this.imgs[i].encrypted
                    this.imgs[i].size = this.imgs[i].length
                    delete this.imgs[i].length
                    delete this.imgs[i].filename
                    delete this.imgs[i].propertiesToken
                    delete this.imgs[i].status
                    this.imgs[i].sort = i+1
                  }
                  console.log(JSON.stringify(this.imgs))
                }
            })
          }).catch(error => {
            console.log(error);
          });
      })
    },
  }
};
</script>
<style>
</style>









<!--
<template>
  <div class="clearfix" style="position:relative">
    <a-upload :fileList="fileList" :remove="handleRemove" :beforeUpload="beforeUpload">
      <a-button>
        <a-icon type="upload"/>Select File
      </a-button>
    </a-upload>
    <span v-show="downloadaddress!==''">下载地址：{{downloadaddress}}</span>
    <a-button
      type="primary"
      @click="handlePrepareUpload"
      :disabled="fileList.length === 0"
      :loading="uploading"
      style="position:absolute;top:0;left:175px"
    >{{uploading ? 'Uploading' : 'Start Upload' }}</a-button>
  </div>
</template>
<script>
// import api from "@/assets/api/apiGateWay/index.js";
// import axios from "axios";
// import SparkMD5 from "spark-md5";

// export default {
//   data() {
//     return {
//       fileList: [],
//       uploading: false,
//       downloadaddress: "",
//       fileMD5: ""
//     };
//   },
//   methods: {
//     handleRemove(file) {
//       const index = this.fileList.indexOf(file);
//       const newFileList = this.fileList.slice();
//       newFileList.splice(index, 1);
//       this.fileList = newFileList;
//     },
//     beforeUpload(file) {
//       this.fileList = []
//       this.fileList = [...this.fileList, file];
//       return false;
//     },
    
//      //文件预上传
//        handlePrepareUpload() {
//          var file = this.fileList[0]
//         const fileSize = file.size; // 文件大小
//         const chunkSize = 1024 * 1024 * 10; // 切片的大小
//         const chunks = Math.ceil(fileSize / chunkSize); // 获取切片个数
//         const fileReader = new FileReader();
//         const spark = new SparkMD5.ArrayBuffer();
//         const bolbSlice =
//             File.prototype.slice ||
//             File.prototype.mozSlice ||
//             File.prototype.webkitSlice;
//         let currentChunk = 0;

//         fileReader.onload = e => {
//             const res = e.target.result;
//             spark.append(res);
//             currentChunk++;
//             if (currentChunk < chunks) {
//                 loadNext();
//             } else {
//                 const md5 = spark.end();
//                 this.getMd5Checked(md5)
//             }
//         };

//         const loadNext = () => {
//             const start = currentChunk * chunkSize;
//             const end =
//                 start + chunkSize > file.size ? file.size : start + chunkSize;
//             fileReader.readAsArrayBuffer(bolbSlice.call(file, start, end));
//         };
//         loadNext();
//     },
//     getMd5Checked(value){
//        api.getFileCheckByMd5({md5:value}).then(response=>{
//          if(response.data.data.md5 !==value){
//             const { fileList } = this;
//             this.uploading = true;
//             api
//               .getFilePrepare({
//                 extension: fileList[0].name.slice(
//                   fileList[0].name.lastIndexOf(".") + 1
//                 ),
//                 chunks: Math.ceil(this.fileList[0].size / 1024/1024/10)
//               })
//               .then(response => {
//                 const downloadaddress = response.data.data.url;
//                 this.downloadaddress = downloadaddress;
//                 this.handleUpload(response);
//               })
//               .catch(error => {
//                 console.log(error);
//               });
//          }else{
//            // 如果文件之前上传过 则返回数据
//            console.log("这个文件之前上传过了"+response.data.data.md5)
//          }
//         })
//     },
//     // 文件上传
//     handleUpload(res) {
//       var type = this.fileList[0].type; // 文件类型
//       var chunk = 1024 * 1024 * 10; // 每个文件切片大小定为10MB .
//       var blobs = [];
//       var start = 0;
//       //文件切割
//       for (var i = 0; i < Math.ceil(this.fileList[0].size / chunk); i++) {
//         var end = start + chunk;
//         blobs[i] = this.fileList[0].slice(start, end, type);
//         start = end;
//       }
//       var uploads = res.data.data.uploads;
//       var count = 0;
//       for (var i = 0; i < uploads.length; i++) {
//         var params = uploads[i].params;
//         var url = uploads[i].host;
//         axios({
//           url: url,
//           method: "post",
//           headers: {
//             "Content-Type": "multipart/form-data"
//           },
//           data: {
//             appKey: params.appKey,
//             contextId: params.contextId,
//             expires: params.expires,
//             token: params.token,
//             file: blobs[i]
//           },
//           transformRequest: [
//             function(oldData) {
//               var form = new FormData();
//               for (let item in oldData) {
//                 form.append(item, oldData[item]);
//               }
//               return form;
//             }
//           ]
//         })
//           .then(response => {
//             count++;
//             if (count === i) {
//               console.log({ contextId: response.data.contextId });
//               api.getFileComplete(params).then(response => {
//                 console.log(response);
//               });
//             }
//           })
//           .catch(error => {
//             console.log(error);
//           });
//       }
//     }
//   }
// };
// </script>
// <style>

// </style>


    <template>
  <div>
    <form class="bootstrap-frm">
      <h1>
        Create New Title
        <span>Please fill all the texts in the fields.</span>
      </h1>
      <label>
        <span>主题 :</span>
        <input id="title" type="title" name="title" placeholder="title" v-model="title" required>
      </label>
      <label>
        <span>内容 :</span>
        <textarea id="message" name="message" placeholder="content" v-model="content" required></textarea>
      </label>
      <label>
        <span>类别 :</span>
        <select name="selection" v-model="tab" required>
          <option value="job">job</option>
          <option value="ask">ask</option>
          <option value="dev">dev</option>
          <option value="good">good</option>
        </select>
      </label>
      <label>
        <span>&nbsp;</span>
        <input type="button" class="button" value="Send" :plain ="true" @click="testPost()">
      </label>
    </form>
  </div>
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
import {Message} from 'element-ui'
Vue.prototype.$message = Message;

export default {
  data (){
    return {
      title : '',
      content : '',
      tab : '',
    }
  },
   methods:{
     testPost (){
       axios.post('https://cnodejs.org/api/v1/topics', {
          accesstoken  : 'e272e7e6-d288-43ed-ad3f-ff8d1f98071e',
          title : this.title,
          content : this.content,
          tab : this.tab
        }).then((response)=>{
            this.$message.success('发送成功');
            console.log(response);
         }).catch((error)=>{
            this.$message.error('请求失败');
            console.log(error)
          });
     },
   }
   
}
</script>
<style>
.bootstrap-frm {
    margin: 20px 0 0 600px;
    max-width: 500px;
    background: #fff;
    padding: 20px 30px 20px 30px;
    font: 12px "Helvetica Neue", Helvetica, Arial, sans-serif;
    color: #888;
    text-shadow: 1px 1px 1px #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
}
.bootstrap-frm h1 {
    font: 25px "Helvetica Neue", Helvetica, Arial, sans-serif;
    padding: 0px 0px 10px 40px;
    display: block;
    border-bottom: 1px solid #dadada;
    margin: -10px -30px 30px -30px;
    color: #888;
}
.bootstrap-frm h1 > span {
    display: block;
    font-size: 11px;
}
.bootstrap-frm label {
  display: block;
  margin: 0px 0px 5px;
}

.bootstrap-frm label > span {
  float: left;
  width: 20%;
  text-align: right;
  padding-right: 10px;
  margin-top: 10px;
  color: #333;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: bold;
}

.bootstrap-frm input[type="text"],
.bootstrap-frm input[type="title"],
.bootstrap-frm textarea,
.bootstrap-frm select {
  border: 1px solid #ccc;
  color: #888;
  height: 20px;
  line-height: 15px;
  margin-bottom: 16px;
  margin-right: 6px;
  margin-top: 2px;
  outline: 0 none;
  padding: 5px 0px 5px 5px;
  width: 70%;
  border-radius: 4px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
}

.bootstrap-frm textarea {
  height: 100px;
  padding: 5px 0px 0px 5px;
  width: 70%;
}

.bootstrap-frm .button:hover {
  color: #333;
  background-color: #ebebeb;
  border-color: #adadad;
}
.bootstrap-frm .button {
  background: #fff;
  border: 1px solid #ccc;
  padding: 10px 25px 10px 25px;
  color: #333;
  border-radius: 4px;
  margin-left: 280px;
}

.bootstrap-frm select {
background: #FFF url('../assets/down-arrow.png') no-repeat right;
appearance:none;
-webkit-appearance:none;
-moz-appearance: none;
text-indent: 0.01px;
text-overflow: '';
width: 70%;
height: 35px;
line-height:15px;
}
</style>


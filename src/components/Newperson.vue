<template>
        <div class="newpeople">
         <ul>
            <h2>Node.js 入门</h2>
            <span @click="pushShowTitle('5433d5e4e737cbe96dcef312')">https://github.com/alsotang/node-lessons</span>
        </ul>
    </div>
</template>
<script>
export default {
    methods :{
        // 前往文章详情页面
        pushShowTitle (id) {
        this.$router.push("/article/"+id)
        },
    }
}
</script>
<style>
  .newpeople{
        width: 60%;
        margin-left: 20%;
        border: 1px solid #babaca;
        margin-top: 15px;
        padding: 10px;
    }
    .newpeople span{
        color: #08c;
        font-size: 15px;
    }
</style>


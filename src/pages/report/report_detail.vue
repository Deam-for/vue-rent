<template>
  <div class="top">
    <el-form  label-width="80px">
      <el-form-item label="举报人">
        <el-button type="text" @click="users_info">{{ content.nickname }}</el-button>
      </el-form-item>
       <el-form-item label="理由：">
        <div>{{ content.cause }}</div>
      </el-form-item>
      <el-form-item label="补充：">
        <div>
          {{content.content}}
        </div>
      </el-form-item>
      <el-form-item label="图片：" v-if="content.pic!=null">
        <div class="pic">
            <el-image :src="content.pic" style="width: 150px; height: 150px" :preview-src-list="[pic + o]"></el-image>
        </div>
      </el-form-item>
      <el-form-item label="结果：" v-if="content.result">
        <div>
          {{content.result}}
        </div>
      </el-form-item>
    </el-form>
    <el-button style="margin-left: 30px" @click="prev">返回</el-button>
    <el-button type="danger" 
      v-if="!content.result">违规下架</el-button
    >
    <el-button type="danger" 
      v-if="!content.result">举报不实</el-button
    >
  </div>
</template>
<script>
import axios from 'axios'
export default {
    created(){
        axios.post('http://127.0.0.1:3000/admin/report_detail',{id:this.$route.query.id})
        .then(res=>{
            this.content=res.data[0]
            if(this.content.pic!=null){this.content.pic='http://127.0.0.1:3000/uploads/'+this.content.pic}
            console.log(this.content);
        })
    },
    data(){
        return{
            content:{},
            pic:'http://127.0.0.1:3000/uploads/'
        }
    },
    methods:{
        prev() {
        this.$router.go(-1);
        },
        users_info(){
            this.$router.push({path:'/users/select',query:{id:this.content.openid}})
        }
    }
    
}
</script>
<style scoped>
.top {
  margin-top: 30px;
  width: 100%;
  margin-bottom: 80px;
  padding-bottom: 80px;
  background-color: #ffffff;
}
.pic {
  display: flex;
  flex-direction: row;
}
.pic-item {
  margin-left: 20px;
}
</style>
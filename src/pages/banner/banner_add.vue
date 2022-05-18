<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>新增轮播图</span>
      </div>
      <div class="text item">
        <el-form
          :label-position="labelPosition"
          label-width="80px"
        >
          <el-form-item label="标题">
            <el-input v-model="title"></el-input>
          </el-form-item>
          <el-form-item label="房源id">
            <el-input v-model="house_id"></el-input>
          </el-form-item>
          <el-form-item label="排序">
            <el-input v-model="sort"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload
              action="#"
              :limit="1"
              ref="upload"
              :multiple="true"
              :auto-upload="false"
              list-type="picture-card"
            >
            <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
     <el-button type="primary" @click="returns">返回</el-button>
     <el-button type="primary" @click="submitUpload">立即创建</el-button>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      labelPosition: "right",
      title:'',
      FileList:'',
      sort:'',
      house_id:''
    };
  },
  methods: {
    submitUpload() {
            let data={}
            data.title=this.title
            data.sort=this.sort
            data.house_id=this.house_id
            const fileArray = this.$refs.upload.uploadFiles;
            console.log(fileArray);
            const fd = new FormData();
            for(let i = 0; i < fileArray.length; i++) {
                fd.append('avatar', fileArray[i].raw);
            }
            console.log(fd);
            // 发送HTTP请求，发送数据
            axios({
                url: 'http://127.0.0.1:3000/publish_rent/banner',
                method: 'post',
                data: fd,
                params:data
            }).then(res => {
                if(res.data==200){
                   this.$message({
                    type: "success",
                    message:'创建成功',
                  });
                  this.$router.go(-1);
                }
            })
        },
        returns(){
          this.$router.go(-1);
        }
  },
};
</script>

<style>
.text {
  font-size: 14px;
  width: 400px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}
</style>
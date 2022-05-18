<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>新增轮播图</span>
      </div>
      <div class="text item">
        <el-form :label-position="labelPosition" label-width="80px">
          <el-form-item label="名称">
            <el-input v-model="tabledata.title"></el-input>
          </el-form-item>
          <el-form-item label="房源id">
            <el-input v-model="tabledata.house_id"></el-input>
          </el-form-item>
          <el-form-item label="排序">
            <el-input v-model="tabledata.sort"></el-input>
          </el-form-item>
          <el-form-item label="图片" v-if="tabledata.img_url">
            <div>
              <el-image :src="tabledata.img_url" class="avatar"></el-image>
              <div class="img">
                <div class="delete-img"></div>
                <div class="delete_icon" @click="delete_pic">
                  <i class="el-icon-delete-solid"></i>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="图片" v-else>
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
      <el-button type="primary" @click="submitUpload">更新</el-button>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      labelPosition: "right",
      tabledata: {},
      dialogVisible: false,
    };
  },
  created() {
    axios
      .post("http://127.0.0.1:3000/admin/banner_update", {
        id: this.$route.query.id,
      })
      .then((res) => {
        this.tabledata = res.data[0];
      });
  },
  methods: {
    submitUpload() {
        if(this.tabledata.img_url){
            axios.post('http://127.0.0.1:3000/admin/banner_updated',{data:this.tabledata,id:this.$route.query.id})
            .then(res=>{
                if(res.data==200){
                   this.$message({
                    type: "success",
                    message:'更新成功',
                  });
                }
            })
        }else{
            this.tabledata.id=this.$route.query.id
            const fileArray = this.$refs.upload.uploadFiles;
            const fd = new FormData();
            for(let i = 0; i < fileArray.length; i++) {
                fd.append('avatar', fileArray[i].raw);
            }
            // 发送HTTP请求，发送数据
            axios({
                url: 'http://127.0.0.1:3000/publish_rent/banner_update',
                method: 'post',
                data: fd,
                params:this.tabledata
            }).then(res => {
                if(res.data==200){
                   this.$message({
                    type: "success",
                    message:'更新成功',
                  });
                }
            })
        }
    },
    returns() {
      this.$router.go(-1);
    },
    delete_pic() {
      this.tabledata.img_url = "";
    },
  },
};
</script>

<style>
.text {
  font-size: 14px;
  width: 400px;
  padding-bottom: 20px;
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
.avatar {
  width: 300px;
  height: 200px;
  z-index: 1;
}
.delete_icon {
  display: none;
}
.avatar:hover + .img .delete-img {
  background: rgb(140, 143, 140);
  opacity: 0.4;
  width: 300px;
  height: 200px;
  margin-top: -215px;
  z-index: 998;
  position: absolute;
  line-height: 200px;
}
.avatar:hover + .img .delete_icon {
  display: flex;
  position: absolute;
  margin-top: -140px;
  margin-left: 140px;
  z-index: 999;
  font-size: 25px;
}
</style>
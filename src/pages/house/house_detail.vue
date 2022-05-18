<template>
  <div class="top">
    <el-form :label-position="labelPosition" label-width="80px">
      <el-form-item label="房主：">
        <el-button type="text" @click="users_info">{{ content.nickname }}</el-button>
      </el-form-item>
      <el-form-item label="标题：">
        <div>{{ content.title }}</div>
      </el-form-item>
      <el-form-item label="地址：">
        <div>
          {{
            content.province +
            content.city +
            content.district +
            content.location
          }}
        </div>
      </el-form-item>
      <el-form-item label="租金：">
        <div>{{ content.money }} 元/月</div>
      </el-form-item>
      <el-form-item label="描述：">
        <div>{{ content.decrible }}</div>
      </el-form-item>
      <el-form-item label="图片：">
        <div class="pic">
          <div v-for="o in content.pic" :key="o.id" class="pic-item">
            <img :src="pic + o" style="width: 150px; height: 150px" />
          </div>
        </div>
      </el-form-item>
      <el-form-item label="审核：" v-if="content.checks!='null'">
        <div class="pic">
          <div v-for="o in content.checks" :key="o.id" class="pic-item" >
            <img :src="pic + o" style="width: 150px; height: 150px" />
          </div>
        </div>
      </el-form-item>
    </el-form>
    <el-button style="margin-left: 30px" @click="prev">返回</el-button>
    <el-button type="danger" @click="cancel" v-if="sign == 'info'"
      >下架</el-button
    >
    <el-button type="success" @click="check('上架中')" v-if="sign == 'check'"
      >审核通过</el-button
    >
    <el-button type="danger"  data-toggle="modal" data-target="#exampleModal" data-whatever="@fat" v-if="sign == 'check'"
      >审核不通过</el-button
    >

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" style="display:flex;flex-direction:column">
        <p>请输入审核失败原因</p>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="textarea"></textarea>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
        <button type="button" class="btn btn-primary"  data-dismiss="modal" @click="check('审核不通过')">确定</button>
      </div>
    </div>
  </div>
</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      labelPosition: "right",
      content: {},
      pic: "http://127.0.0.1:3000/uploads/",
      sign: "",
      textarea:''
    };
  },
  created() {
    this.sign = this.$route.query.type;
    axios
      .post("http://127.0.0.1:3000/admin/house_detail", {
        id: this.$route.query.id,
      })
      .then((res) => {
        res.data[0].pic = res.data[0].pic.split(",");
        if(res.data[0].checks){
        res.data[0].checks = res.data[0].checks.split(",");
        }
        console.log(res.data);
        this.content = res.data[0];
      });
  },
  methods: {
    prev() {
      this.$router.go(-1);
    },
    cancel() {
      axios
        .post("http://127.0.0.1:3000/admin/house_cancel", {
          id: this.$route.query.id,
        })
        .then((res) => {
          if ((res.data.msg = 200)) {
            this.$message({
              showCloce: true,
              message: "下架成功",
              tyoe: "success",
            });
            this.$router.go(-1);
          }
        });
    },
    check(msg){
        axios.post('http://127.0.0.1:3000/admin/check_result',{id:this.$route.query.id,msg,textarea:this.textarea})
        .then(res=>{
            if ((res.data= 200 && msg=='上架中')) {
            this.$message({
              showCloce: true,
              message: "审核通过",
              type: "success",
            });
          }else{
              this.$message({
              showCloce: true,
              message: "审核不通过",
              type: "fail",
            });
          }
          this.$router.go(-1);
        })
    },
    users_info(){
            this.$router.push({path:'/users/select',query:{id:this.content.openid}})
        }
  },
};
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
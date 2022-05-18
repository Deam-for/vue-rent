<template>
<div>
  <h4 style="margin-left:12px">房源审核</h4>
    <el-divider></el-divider>
  <el-table
    :data="tableData"
    border
    style="width: 92%;margin-left:3%">
    <el-table-column
      fixed
      prop="id"
      label="id"
      width="80">
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      width="260">
    </el-table-column>
    <el-table-column
      prop="nickname"
      label="名字"
      width="110">
    </el-table-column>
    <el-table-column
      prop="province"
      label="房源省份"
      width="100">
    </el-table-column>
    <el-table-column
      prop="city"
      label="房源城市"
      width="90">
    </el-table-column>
    <el-table-column
      prop="district"
      label="房源县区"
      width="100">
    </el-table-column>
    <el-table-column
      prop="location"
      label="详细地址"
      width="200">
    </el-table-column>
    <el-table-column
      prop="money"
      label="租金"
      width="70">
    </el-table-column>
    <el-table-column
      label="操作"
      width="162">
      <template slot-scope="scope">
        <el-row>
          <el-button @click="look_detail(scope.row)" type="primary" icon="el-icon-edit" circle size="small"></el-button>
          <el-button type="success" icon="el-icon-check" circle @click="check_success(scope.row)" size="small"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="small" data-toggle="modal" data-target="#exampleModal" data-whatever="@fat" @click="rows=scope.row.id"></el-button>
        </el-row>
      </template>
    </el-table-column>
  </el-table>

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
        <button type="button" class="btn btn-primary"  data-dismiss="modal" @click="check_fail('审核不通过')">确定</button>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
import axios from 'axios'
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },

    data() {
      return {
        tableData: [],
        textarea:'',
        rows:1
      }
    },
    created(){
      this.look_content()
    },
    methods:{
      look_content(){
        axios.get('http://127.0.0.1:3000/admin/house_check')
      .then(res=>{
        this.tableData=res.data
      })
      },
      look_detail(row){
        console.log(row.id);
        this.$router.push({path:'/house/house_detail',query:{id:row.id,type:'check'}})
      },
      check_success(row){
        axios.post('http://127.0.0.1:3000/admin/check_result',{id:row.id,msg:'上架中',textarea:this.textarea})
        .then(res=>{
          this.look_content()
            if ((res.data= 200 && msg=='上架中')) {
            this.$message({
              showCloce: true,
              message: "审核通过",
              type: "success",
            });
          }
        })
    },
    check_fail(){
      axios.post('http://127.0.0.1:3000/admin/check_result',{id:this.rows,msg:'审核不通过',textarea:this.textarea})
        .then(res=>{
          this.look_content();
            if (res.data= 200) {
            this.$message({
              showCloce: true,
              message: "审核不通过",
              type: "fail",
            });
          }
        })
    }
    }
  }
</script>
<template>
  <div>
    <h4 style="margin: 15px 0 15px 15px;">用户信息查询结果</h4>
    <el-divider></el-divider>
    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="openid"
      label="openid"
      width="230">
    </el-table-column>
    <el-table-column
      prop="nickname"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="age"
      label="年龄"
      width="120">
    </el-table-column>
    <el-table-column
      prop="constellatory"
      label="星座"
      width="120">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="电话"
      width="200">
    </el-table-column>
    <el-table-column
      prop="weixin"
      label="微信"
      width="120">
    </el-table-column>
    <el-table-column
      prop="work"
      label="工作"
      width="120">
    </el-table-column>
    <el-table-column
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="unfreeze(scope.row)" type="danger" size="small" v-if="scope.row.status=='冻结中'">解冻</el-button>
        <el-button @click="handleClick(scope.row)" type="danger" size="small" v-else>冻结</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            tableData:[]
        }
    },
    created(){
        axios.post('http://127.0.0.1:3000/admin/search_users',{type:'openid',data:this.$route.query.id})
        .then(res=>{
          this.tableData=res.data
        })
    },
    methods: {
      handleClick(row) {
        axios.post('http://127.0.0.1:3000/admin/users_freeze',{openid:row.openid})
        .then(res=>{
          this.tableData=res.data
        })
      },
      unfreeze(row){
        axios.post('http://127.0.0.1:3000/admin/users_freeze',{openid:row.openid})
        .then(res=>{
          this.tableData=res.data
        })
      },
    },
}
</script>
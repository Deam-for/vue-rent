<template>
<div>
  <h4 style="margin: 15px 0 15px 15px;">举报管理</h4>
    <el-divider></el-divider>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      label="房源信息"
      width="150">
      <template slot-scope="scope">
        <el-button @click="look_detail(scope.row)" type="text" size="small">查看详情</el-button>
      </template>
    </el-table-column>
    <el-table-column
      prop="cause"
      label="举报原因"
      width="120">
    </el-table-column>
    <el-table-column
      prop="content"
      label="详情"
      width="320">
    </el-table-column>
    <el-table-column
      label="操作"
      width="280">
      <template slot-scope="scope">
        <div v-if="scope.row.result">
          <el-button @click="detail(scope.row)" type="primary" size="small" style="margin-right:8px">查看</el-button>
          已处理：{{scope.row.result}}
        </div>
        <div v-else>
          <el-button @click="detail(scope.row)" type="primary" size="small">查看</el-button>
          <el-button type="danger" size="small" @click="xiajia(scope.row)">违规下架</el-button>
          <el-button type="danger" size="small">举报不实</el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import axios from 'axios'
  export default {
    created(){
      axios.get('http://127.0.0.1:3000/admin/report')
      .then(res=>{
        console.log(res.data);
        this.tableData=res.data
      })
    },
    methods: {
      handleClick(row) {
        console.log(row);
      },
      look_detail(row){
        this.$router.push({path:'/house/house_detail',query:{id:row.house_id,type:'info'}})
      },
      detail(row){
        this.$router.push({path:'/report/detail',query:{id:row.id}})
      },
      xiajia(row){
        axios.post('http://127.0.0.1:3000/admin/report_result',{id:row.id,house_id:row.house_id,type:'success'})
        .then(res=>{
          this.tableData=res.data
        })
      }
    },

    data() {
      return {
        tableData: []
      }
    }
  }
</script>
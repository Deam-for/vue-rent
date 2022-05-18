<template>
  <div>
    <h4 style="margin: 15px 0 15px 15px;">区域管理</h4>
    <el-divider></el-divider>
    <el-input v-model="input" placeholder="请输入内容" style="width:200px;margin-right:15px"></el-input>
    <el-button type="primary" icon="el-icon-search">搜索</el-button>
    <el-button type="success" @click="open">新增</el-button>
    <el-table
    :data="tableData"
    border
    style="width: 100%;margin-top:10px">
    <el-table-column
      fixed
      prop="id"
      label="id"
      width="150">
    </el-table-column>
    <el-table-column
      fixed
      prop="city_name"
      label="城市"
      width="150">
    </el-table-column>
    <el-table-column
      
      label="操作"
      width="150">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small" >查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
        <el-button type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
  import Card from 'src/components/Cards/Card.vue'
  import axios from 'axios'
  import $ from 'jquery' ;
  export default {
    components: {
      Card
    },
    created(){
      axios.get('http://127.0.0.1:3000/admin/city_list')
      .then((res)=>{
        console.log(res)
        this.tableData=res.data
      })
    },
    methods: {
      open() {
        this.$prompt('请输入新增的城市名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          axios.post("http://127.0.0.1:3000/admin/addcity",{city:value})
          .then((Response)=>{
            this.tableData=Response.data
            this.$message({
            type: 'success',
            message: '你输入的城市是: ' + value
          });
          }).catch(()=>{})
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      },
      handleClick(a){
        this.$router.push({path:'/city/city_area',query:{id:a.id}})
        console.log(a.id)
      }
    },
     data() {
      return {
        input: '',
        tableData: []
      }
    }
  }

</script>
<style>

</style>

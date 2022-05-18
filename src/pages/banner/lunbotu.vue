<template>
  <div>
    <h4 style="margin: 15px 0 15px 15px;">轮播图筛选</h4>
    <el-divider></el-divider>
    <div class="top_button">
      <el-button type="success" @click="add_banner">新增</el-button>
      <el-button type="button"  class="shuaixuan" @click="filtrate">筛选</el-button>
      <el-button type="primary" @click="save">保存排序</el-button>
    </div>
    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="id"
      label="id"
      width="150">
    </el-table-column>
    <el-table-column
      prop="title"
      label="名称"
      width="120">
    </el-table-column>
    <el-table-column  label="图片" width="180">
        <template slot-scope="scope">
          <el-image style="width: 150px;height:60px" :src="scope.row.img_url" :preview-src-list="[scope.row.img_url]">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </template>
      </el-table-column>
    <el-table-column
      prop="sort"
      label="排序"
      width="150">
      <template slot-scope="scope">
        <el-input  v-model="scope.row.sort" style="width:120px"></el-input>
      </template>
    </el-table-column>
    <el-table-column
    prop="house_id"
      label="房源ID"
      width="120">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      width="120">
      <template slot-scope="scope">
          <div style="font-size:18px">
            <i class="el-icon-circle-check" v-if="scope.row.status=='启用'"></i>
            <i class="el-icon-circle-close" v-if="scope.row.status=='禁用'"></i>
          </div>
        </template>
    </el-table-column>
    <el-table-column
      label="操作"
      width="280">
      <template slot-scope="scope">
        <el-button
         @click="update(scope.row)"
         type="primary"
          size="small">
          编辑
        </el-button>
        <el-button
          v-if="scope.row.status=='启用'"
          @click="disable(scope.row)"
          type="info"
          size="small">
          禁用
        </el-button>
        <el-button
          v-else
          @click="enable(scope.row)"
          type="success"
          size="small">
          启用
        </el-button>
        <el-button
          size="mini"
          type="danger"
          @click="delete_banner(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      tableData: []
    };
  },
  created(){
    axios.get('http://127.0.0.1:3000/admin/banner')
    .then(res=>{
      this.tableData=res.data
    })
  },
  methods:{
    add_banner(){
      this.$router.push({path:'/banner/add'})
    },
    save(){
      axios.post('http://127.0.0.1:3000/admin/save_banner',{data:this.tableData})
      .then(res=>{
        if(res.data==200){
          this.$message({
          type: "success",
          message:'排序保存成功',
          });
        }
      })
    },
    update(row){
      this.$router.push({path:'/banner/update',query:{id:row.id}})
    },
    delete_banner(row){
      axios.post('http://127.0.0.1:3000/admin/banner_delete',{id:row.id,type:'delete'})
      .then(res=>{
        if(res.data.msg==200){
          this.$message({
          type: "success",
          message:'删除成功',
          });
          this.tableData=res.data.data
        }
      })
    },
    disable(row){
      console.log(row);
      axios.post('http://127.0.0.1:3000/admin/banner_delete',{id:row.id,type:'禁用'})
      .then(res=>{
        this.tableData=res.data.data
      })
    },
    enable(row){
      axios.post('http://127.0.0.1:3000/admin/banner_delete',{id:row.id,type:'启用'})
      .then(res=>{
        this.tableData=res.data.data
      })
    },
    filtrate(){
      this.$router.push({path:"/banner/filtrate"})
    }
  }
};
</script>
<style>
.top_button{
  padding: 0 20px 20px 20px;
}
.shuaixuan{
  background-color: #13bbc7;
  color: white;
}
.shuaixuan:hover{
  background-color: #13bbc7;
  color: white;
  opacity: 0.8;
}
</style>

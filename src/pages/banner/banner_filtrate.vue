<template>
    <div>
        <h4 style="margin: 15px 0 15px 15px;">轮播图筛选</h4>
        <el-divider></el-divider>
        <el-table
    :data="tableData"
    border
    style="width: 68%;margin-left:12px">
    <el-table-column
      fixed
      prop="id"
      label="id"
      width="150">
    </el-table-column>
    <el-table-column
      prop="title"
      label="名称"
      width="166">
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
        prop="house_id"
         label="房源ID"
        width="120">
      <template slot-scope="scope">
          <el-link type="primary" :underline="false" @click="house_info(scope.row)">{{ scope.row.house_id }}</el-link>
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      width="250">
      <template slot-scope="scope">
  <el-button v-if="scope.row.status == '启用'" type="info" size="small" @click="enable(scope.row)">
    禁用
  </el-button>
  <el-button v-else @click="enable(scope.row)" type="success" size="small">
    启用
  </el-button>
  <el-button size="mini" type="danger">删除</el-button>
    </template>
    </el-table-column>
  </el-table>
    </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.page_content()
  },
  methods:{
    page_content(){
        axios.get("http://127.0.0.1:3000/admin/banner_filtrate").then((res) => {
      this.tableData = res.data;
    });
    },
    house_info(row) {
    this.$router.push({
      path: "/house/house_detail",
      query: { id: row.house_id, type: "info" },
    });
  },
  enable(row){
      axios.post('http://127.0.0.1:3000/admin/banner_delete',{id:row.id,type:'启用'})
      .then(res=>{
          if(res.data.msg==200){
              this.$message({
                  type:'success',
                  message:'成功启用'
              })
          }
        this.page_content()
      })
    },
    delete_banner(row){
      axios.post('http://127.0.0.1:3000/admin/banner_delete',{id:row.id,type:'delete'})
      .then(res=>{
        if(res.data.msg==200){
          this.$message({
          type: "success",
          message:'删除成功',
          });
          this.page_content()
        }
      })
    },
  }
};
</script>
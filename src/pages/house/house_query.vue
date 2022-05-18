<template>
<div>
  <el-table
    :data="tableData"
    :default-sort = "{prop: 'money', order: 'descending'}"
    border
    style="width: 100%;">
    <el-table-column
      fixed
      prop="id"
      label="id"
      width="80">
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      width="280">
    </el-table-column>
    <el-table-column
      prop="nickname"
      label="名字"
      width="120">
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
      sortable
      width="80">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      width="120">
    </el-table-column>
    <el-table-column
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="look_detail(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small" @click="cancel(scope.row)">下架</el-button>
      </template>
    </el-table-column>
</el-table>
<pagination
class="footer"
        :page-index="currentPage"
        :total="count"
        :page-size="pageSize"
        @change="pageChange">
    </pagination>
</div>
</template>

<script>
import axios from 'axios'
import pagination from "../../components/pagination"
  export default {
      components:{
          pagination
      },
    data() {
      return {
        content:[],
        pageSize :5, //每页显示10条数据
        currentPage : 1, //当前页码
        count : 0, //总记录数
        tableData: [],
      }
    },
    methods:{
        page_content(){
             axios.post('http://127.0.0.1:3000/admin/house_users',{pageIndex:this.currentPage,pageSize:this.pageSize,openid:this.$route.query.openid,})
            .then(res=>{
            this.count=res.data.num
            this.tableData=res.data.content
        })
        },
        pageChange (page) {
      this.currentPage = page
      this.page_content();
        },
    },
    mounted() {
    this.page_content()
  }
  }
</script>
<style scoped>
.footer{
  position: fixed;
  bottom: 0;
  width: 100%;
  color: #f5f5f5;
  margin-left: 30%;
}
</style>
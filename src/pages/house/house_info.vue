<template>
<div>
  <h4 style="margin: 15px 0 15px 15px;">房源信息</h4>
    <el-divider></el-divider>
  <el-select v-model="status" placeholder="房源状态" style="width:120px" @change="status_select()" >
    <el-option
    @click="status_select()"
      v-for="item in house_status"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <el-select v-model="value" placeholder="请选择查询的条件">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :index="item.status">
    </el-option>
  </el-select>
    <el-input
      v-model="input"
      placeholder="请输入内容"
      style="width: 200px; margin-right: 15px"
    ></el-input>
    <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
  <el-table
    :data="tableData"
    :default-sort = "{prop: 'money', order: 'descending'}"
    border
    style="width: 100%;margin-top:6px">
    <el-table-column
      fixed
      prop="id"
      label="id"
      width="60">
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      width="280">
    </el-table-column>
    <el-table-column
      prop="nickname"
      label="名字"
      width="110" >
      <template slot-scope="scope">
        <el-link type="primary" :underline="false" @click="users_info(scope.row)">{{ scope.row.nickname }}</el-link></template>
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
      width="100">
    </el-table-column>
    <el-table-column
      label="操作"
      width="150">
      <template slot-scope="scope">
        <el-button @click="look_detail(scope.row)" type="primary" size="small">查看</el-button>
        <el-button type="danger"  size="small" @click="cancel(scope.row)" v-if="status=='上架中'">下架</el-button>
        <el-button type="success"  size="small" @click="cancel(scope.row)" v-if="status=='已下架'">上架</el-button>
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
        input:'',
        tableData: [],
        pageSize :5, //每页显示10条数据
        currentPage : 1, //当前页码
        count : 0, //总记录数
        options: [{
          value: 'nickname',
          label: '姓名'
        }, {
          value: 'id',
          label: 'id'
        }, {
          value: 'province',
          label: '省份'
        }, {
          value: 'city',
          label: '城市'
        },{
          value: 'district',
          label: '县区'
        },{
          value: 'location',
          label: '详细地址'
        },{
          value: 'status',
          label: '状态'
        }],
        value: '',
        house_status:[{
          value:'上架中',
          label:'上架中'
        },{
          value:'已下架',
          label:"已下架"
        },{
          value:'审核失败',
          label:'审核失败'
        }],
        status:'上架中'
      }
    },
    methods:{
      search(){
        axios.post('http://127.0.0.1:3000/admin/house_search',{type:this.value,data:this.input})
        .then(res=>{
          this.tableData=res.data
        })
      },
      look_detail(row){
        this.$router.push({path:'/house/house_detail',query:{id:row.id,type:'info'}})
      },
      cancel(row){
         axios.post("http://127.0.0.1:3000/admin/house_cancel",{id:row.id})
         .then(res=>{
            this.tableData=res.data.data
         })
     },
     users_info(row){
            this.$router.push({path:'/users/select',query:{id:row.openid}})
        },
        house_info(){
        axios.post('http://127.0.0.1:3000/admin/house_info',{pageIndex:this.currentPage,pageSize:this.pageSize,status:this.status})
        .then(res=>{
          this.count=res.data.num
          this.tableData=res.data.content
      })
        },
        pageChange (page) {
        this.currentPage = page
        this.house_info();
        },
        status_select(){
         axios.post('http://127.0.0.1:3000/admin/house_info',{pageIndex:this.currentPage,pageSize:this.pageSize,status:this.status})
        .then(res=>{
          this.count=res.data.num
          this.tableData=res.data.content
      })
        }
    },
    mounted(){
      this.house_info()
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
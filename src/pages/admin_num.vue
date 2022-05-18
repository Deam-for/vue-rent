<template>
  <div>
    <h4 style="margin: 15px 0 15px 15px;">管理员信息</h4>
    <el-divider></el-divider>
    <el-input
      v-model="input"
      placeholder="请输入内容"
      style="width: 200px; margin-left: 15px"
    ></el-input>
    <el-button type="primary" icon="el-icon-search" style="margin-left: 15px">搜索</el-button>
    <el-button type="success"  data-toggle="modal" data-target="#exampleModal">新增</el-button>
    <el-table :data="tableData" border style="width: 72%;margin-top:10px;margin-left: 15px">
      <el-table-column fixed prop="id" label="id" width="150">
      </el-table-column>
      <el-table-column fixed prop="name" label="名字" width="150">
      </el-table-column>
      <el-table-column fixed prop="users" label="账号" width="150">
      </el-table-column>
      <el-table-column fixed prop="province" label="省份" width="150">
      </el-table-column>
      <el-table-column fixed prop="city" label="城市" width="150">
      </el-table-column>
      <el-table-column label="操作" width="167">
        <template slot-scope="scope">
          <el-button type="danger" size="small" v-if="scope.row.status=='启用'">冻结</el-button>
          <el-button type="success" size="small" v-if="scope.row.status=='冻结'">启用</el-button>
          <el-button type="danger" size="small" @click="delete_admin(scope.row)">删除</el-button>
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
    <div class="modal fade" id="exampleModal" tabindex="-1"  aria-labelledby="exampleModalLabel" aria-hidden="true" style="margin-top:-80px">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">添加管理员</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="recipient-name" class="col-form-label" >名字:</label>
            <input type="text" class="form-control" id="recipient-name" v-model="name">
          </div>
          <div class="form-group">
            <label for="message-text" class="col-form-label">账户:</label>
            <input type="text" class="form-control" id="recipient-name" v-model="users">
          </div>
          <div class="form-group">
            <label for="message-text" class="col-form-label">密码:</label>
            <input type="password" class="form-control" id="recipient-name" v-model="password">
          </div>
          <div class="form-group" style="display:flex;flex-direction:column">
            <label for="message-text" >城市选择:</label>
            <el-cascader
                    v-model="selectedOptions"
                    :options="options"
                    filterable
                    clearable
                    style="width: 250px"
                    @change="handleChange"
                  />
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">取消 </button>
        <button type="button" class="btn btn-primary"  @click="resister" data-dismiss="modal">新增</button>
      </div>
    </div>
  </div>
</div>
  </div>
</template>
<script>
import axios from 'axios'
import {provinceAndCityData,CodeToText} from 'element-china-area-data'
import pagination from "../components/pagination"
export default {
  components:{
          pagination
      },
  data(){
    return {
      name:'',
      users:'',
      password:'',
      input:'',
      tableData:[],
      options: provinceAndCityData,
      selectedOptions: [],
      pageSize :5, //每页显示10条数据
      currentPage : 1, //当前页码
      count : 0, //总记录数
    }
  },
  mounted(){
    this.content();
  },
  methods:{
    content(){
      axios.post('http://127.0.0.1:3000/admin/admin_num',{pageIndex:this.currentPage,pageSize:this.pageSize,})
    .then(res=>{
      this.count=res.data.num
      this.tableData=res.data.content
    })
    },
    pageChange (page) {
      this.currentPage = page
      this.content();
        },
    resister(){
      axios.post('http://127.0.0.1:3000/admin/register',{name:this.name,users:this.users,password:this.password,province:this.province,city:this.city})
      .then(res=>{
        if(res.data.status==200){
          this.$message({
            type: "success",
            message:res.data.msg,
          });
          this.content()
        }else{
          this.$message({
            type: "fail",
            message:res.data.msg,
          });
        }
      })
    },
    handleClick(){

    },
    handleChange(value){
      // console.log(this.selectedOptions[0]);
      // console.log(CodeToText(this.selectedOptions[1]));
      let  a=`'${value[0]},${value[1]}'`
      let b=this.getCodeToText(a,value);
      this.province=b.split('/')[0];
      this.city=b.split('/')[1]
      // this.selectedOptions=b.split('/')[1]
    },
    getCodeToText(codeStr, codeArray) {
      if (null === codeStr && null === codeArray) {
        return null;
      } else if (null === codeArray) {
        codeArray = codeStr.split(",");
      }

      let area = "";
      switch (codeArray.length) {
        case 1:
          area += CodeToText[codeArray[0]];
          break;
        case 2:
          area += CodeToText[codeArray[0]] + "/" + CodeToText[codeArray[1]];
          break;
        case 3:
          area +=
            CodeToText[codeArray[0]] +
            "/" +
            CodeToText[codeArray[1]] +
            "/" +
            CodeToText[codeArray[2]];
          break;
        default:
          break;
      }
      return area;
    }
  }
};
</script>
<style scope>
.footer{
  position: fixed;
  bottom: 0;
  width: 100%;
  color: #f5f5f5;
  margin: 0;
  margin-left: 250px;
}
</style>

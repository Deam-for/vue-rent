<template>
  <div class="top">
    <h4 style="margin: 15px 0 15px 15px;">用户信息</h4>
    <el-divider></el-divider>
    <el-select v-model="value" placeholder="请选择查询的条件" class="top_select">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :index="item.status"
      >
      </el-option>
    </el-select>
    <el-input
      v-model="input"
      placeholder="请输入内容"
      style="width: 200px; margin-right: 15px"
    ></el-input>
    <el-button type="primary" icon="el-icon-search" @click="search"
      >搜索</el-button
    >
    <el-table
      :data="tableData"
      border
      style="width: 95%; margin-left: 1%; margin-top: 12px"
    >
      <el-table-column fixed prop="openid" label="openid" width="240">
      </el-table-column>
      <el-table-column prop="nickname" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="120"> </el-table-column>
      <el-table-column prop="constellatory" label="星座" width="120">
      </el-table-column>
      <el-table-column prop="phone" label="电话" width="160"> </el-table-column>
      <el-table-column prop="weixin" label="微信" width="120">
      </el-table-column>
      <el-table-column prop="work" label="工作" width="120"> </el-table-column>
      <el-table-column label="操作" width="210">
        <template slot-scope="scope">
          <el-button
            @click="house_info(scope.row)"
            type="success"
            size="small"
            >房源信息</el-button
          >
          <el-button
            @click="unfreeze(scope.row)"
            type="danger"
            size="small"
            v-if="scope.row.status == '冻结中'"
            >解冻</el-button
          >
          <el-button
            @click="handleClick(scope.row)"
            type="danger"
            size="small"
            v-else
            >冻结</el-button
          >
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
      input: "",
      tableData: [],
      status: "冻结 ",
      options: [
        {
          value: "nickname",
          label: "姓名",
        },
        {
          value: "age",
          label: "年龄",
        },
        {
          value: "constellatory",
          label: "星座",
        },
        {
          value: "phone",
          label: "电话",
        },
        {
          value: "weixin",
          label: "微信",
        },
        {
          value: "work",
          label: "工作",
        },
      ],
      value: "",
    };
  },
  created() {
    axios.get("http://127.0.0.1:3000/admin/users_info").then((res) => {
      console.log(res.data);
      this.tableData = res.data;
    });
  },
  methods: {
    handleClick(row) {
      axios
        .post("http://127.0.0.1:3000/admin/users_freeze", {
          openid: row.openid,
        })
        .then((res) => {
          this.tableData = res.data;
        });
    },
    house_info(row){
      this.$router.push({path:'/house/result',query:{openid:row.openid}})
    },
    unfreeze(row) {
      axios
        .post("http://127.0.0.1:3000/admin/users_unfreeze", {
          openid: row.openid,
        })
        .then((res) => {
          this.tableData = res.data;
        });
    },
    search() {
      axios
        .post("http://127.0.0.1:3000/admin/search_users", {
          type: this.value,
          data: this.input,
        })
        .then((res) => {
          this.tableData = res.data;
        });
    },
  },
};
</script>
<style>
/* .top {
  
} */
.top_select{
  margin-top: 10px;
  margin-left: 1%;
}
</style>

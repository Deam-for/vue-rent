<template>
  <div>
    <h4 style="margin: 15px 0 15px 15px;">租房圈信息</h4>
    <el-divider></el-divider>
    <el-cascader
      v-model="selectedOptions"
      :options="options"
      filterable
      clearable
      style="width: 250px;margin-left:12px"
      @change="handleChange"
    />
    <el-button
      type="primary"
      data-toggle="modal"
      data-target="#exampleModal"
      data-whatever="@fat"
      @click="new_add"
      >新增</el-button
    >

    <el-table :data="tableData" border style="width: 72%;margin-top:10px;margin-left:12px">
      <el-table-column fixed prop="id" label="id" width="150">
      </el-table-column>
      <el-table-column fixed prop="area" label="区域" width="150">
      </el-table-column>
      <el-table-column fixed prop="type" label="类型" width="150">
      </el-table-column>
      <el-table-column fixed prop="view_num" label="浏览量" width="150">
      </el-table-column>
      <el-table-column fixed prop="join_num" label="圈友量" width="150">
      </el-table-column>
      <el-table-column label="操作" width="166">
        <template slot-scope="scope">
          <el-button
            @click="handleClick(scope.row)"
            type="primary"
            size="small"
            data-toggle="modal"
            data-target="#exampleModal"
            >编辑</el-button
          >
          <el-button type="danger" size="small" @click="delete_area(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" style="display: flex; flex-direction: row">
            <input
              placeholder="请输入新增区域"
              style="width: 150px"
              class="form-control"
              v-model="area"
            />
            <select
              class="custom-select"
              id="inlineFormCustomSelectPref"
              v-model="area_value"
            >
              <option
                v-for="(item, index) in area_list"
                :key="index"
                :value="item.value"
              >
                {{ item.label }}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              关闭
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="submit"
              data-dismiss="modal"
            >
              {{ sign }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import $ from "jquery";
import { provinceAndCityData, CodeToText } from "element-china-area-data";
export default {
  data() {
    return {
      options: provinceAndCityData,
      selectedOptions: [],
      tableData: [],
      area_value: 1,
      value: "",
      area: "",
      sign: "新增",
      input: "",
      area_id: 0,
      area_list: [
        {
          value: "区域",
          label: "区域",
        },
        {
          value: "商圈",
          label: "商圈",
        },
      ],
    };
  },
  created() {
    
  },
  methods: {
    page_content(city){
      axios
      .post("http://127.0.0.1:3000/admin/city_area", {
        city
      })
      .then((res) => {
        this.tableData = res.data;
      });
    },
    new_add() {
      this.sign = "新增";
    },
    submit() {
      if (this.sign == "新增") {
        axios
          .post("http://127.0.0.1:3000/admin/add_cityArea", {
            area: this.area,
            type: this.area_value,
            city_id: this.$route.query.id,
          })
          .then((res) => {
            console.log(res.data);
            this.tableData = res.data;
          });
      } else {
        axios
          .post("http://127.0.0.1:3000/admin/update_cityArea", {
            area: this.area,
            type: this.area_value,
            id: this.area_id,
            city_id: this.$route.query.id,
          })
          .then((res) => {
            this.tableData = res.data;
            this.$message({
              showClose: true,
              message: "修改成功",
              type: "success",
            });
          });
      }
    },
    delete_area(a) {
      axios
        .post("http://127.0.0.1:3000/admin/delete_area", {
          id: a.id,
          city_id: this.$route.query.id,
        })
        .then((res) => {
          this.tableData = res.data;
          this.$message({
            showClose: true,
            message: "删除成功",
          });
        });
    },
    handleClick(a) {
      // axios.post('http://127.0.0.1:3000/admin/update_cityArea',{id:a.id})
      // .then((res)=>{
      //   console.log(res.data)
      // })
      this.area_id = a.id;
      this.area = a.area;
      this.area_value = a.type;
      this.sign = "修改";
    },
    handleChange(value) {
      let a = `'${value[0]},${value[1]}'`;
      let b = this.getCodeToText(a, value);
      let city= b.split("/")[1];
      this.page_content(city)
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
    },
  },
};
</script>
<style>
</style>

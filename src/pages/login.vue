<template>
  <div>
    <div class="background"></div>
    <div class="login">
      <div class="login-page">
        <div class="card">
          <div>
            <div class="content">
              <div class="header">歆租</div>
              <input
                v-model="users"
                placeholder="请输入账号"
                class="item_input"
              />
              <input
                placeholder="请输入密码"
                v-model="password"
                type="password"
                class="item_input"
              />
              <button class="item_button" @click="login">登录</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      users: "",
      password: "",
    };
  },
  methods: {
    login() {
      axios
        .post("http://127.0.0.1:3000/admin/login", {
          users: this.users,
          password: this.password,
        })
        .then((res) => {
          console.log(res);
          if (res.data.msg == "登陆成功") {
              this.$message({
            type: "success",
            message:res.data.msg,
          });
            this.$session.set('name',res.data.name)
            this.$router.push({ path: "/users/users" });
          }else{
              this.$message.error(res.data);
          }
        });
    },
  },
};
</script>

<style scoped>
.login {
  height: 100%;
  margin: 0 auto;
  display: table;
  position: relative;
  z-index: 1000;
}
.login-page {
  margin-top: 8%;
}
.background {
  background-image: unset;
  background-color: #f0f8ff;
  position: fixed;
  width: 100%;
  height: 100%;
}
.card {
  background: rgb(255, 255, 255);
  border-radius: 4px;
  background-image: url("https://xinhe.t4tstudio.com/Public/img/admin-login.png");
  background-size: auto 100%;
  background-repeat: no-repeat;
  border-radius: 9px;
  max-width: 970px;
  width: 970px;
  overflow: hidden;
  height: 555px;
  box-shadow: 0 12px 60px 0 rgb(114 110 212 / 20%);
}
.login-box {
  width: 50%;
  /* margin-left: 500px;
    margin-top: 200px; */
  float: left;
}
.content {
  position: relative;
  float: right;
  max-width: 360px;
  width: 360px;
  height: 550px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-right: 50px;
}
.item_input {
  height: 55px;
  width: 100%;
  border: 1px solid #ebecf0;
  border-radius: 30px;
  margin-top: 30px;
  background: #e8f0fe;
  padding-left: 20px;
}
.item_button {
  background-color: #0167f0;
  color: #ffffff;
  font-size: 18px;
  border-radius: 50px;
  margin-top: 40px;
  height: 55px;
  box-shadow: 0 12px 60px 0 rgb(119 117 183 / 20%);
  width: 100%;
  border: 1px solid transparent;
}
</style>

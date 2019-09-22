<style scoped>
.v-form {
  width: 620px;
  background-color: rgba(255, 255, 255, 0.6);
  height: auto;
  position: absolute;
  margin: 90px auto;
  right: 0;
  left: 0;
  z-index: 8;
  border-radius: 8px;
  padding: 20px 100px;
}
.v-btn {
  margin-right: 15px;
}
</style>

<template>
  <v-form
    status-icon
    ref="form"
    label-width="0px"
    class="demo-ruleForm"
    v-model="valid"
    :lazy-validation="lazy"
    :color="$store.state.sidecolor"
  >
    <h2>登录</h2>
    <!-- <el-form-item prop="username"> -->
    <v-text-field
      v-model="user.username"
      :counter="10"
      label="Name"
      :rules="nameRules"
      required
    ></v-text-field>
    <!-- </el-form-item> -->
    <!-- <el-form-item prop="pass"> -->
    <v-text-field
      type="password"
      label="Password"
      v-model="user.pass"
      :rules="passRules"
      required
    ></v-text-field>
    <!-- </el-form-item> -->

    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate"
      >提交</v-btn
    >
    <v-btn color="error" class="mr-4" @click="reset">重置</v-btn>
    <router-link
      class="mr-4 v-btn v-btn--contained theme--light v-size--default"
      tag="button"
      to="/"
      >取消</router-link
    >
    <router-link
      class="mr-4 v-btn v-btn--contained theme--light v-size--default"
      tag="button"
      to="/login"
      >没有账号?</router-link
    >
    <v-alert dense outlined v-show="alertflag" :type="isSuccess[issuc]">{{
      subtitle
    }}</v-alert>
  </v-form>
</template>
<script>
export default {
  name: "signin",
  data: () => ({
    alertflag: false,
    issuc: false,
    isSuccess: {
      true: "success",
      false: "error"
    },
    valid: true,
    subtitle: "",
    user: {
      username: "",
      pass: ""
    },
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    passRules: [v => !!v || "Pass is required"],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
    lazy: false
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.$axios
          .post("/signin", this.user)
          .then(res => {
            this.alertflag = true;
            if (res.data.length !== 0) {
              let Y = res.data[0];
              this.$store.state.user = Y;
              this.issuc = true;
              this.subtitle = "登录成功!";
              // let params = {
              //   delflag: "false",
              //   userId: this.$store.state.datacache.userId
              // };
              // this.$store.commit("readDataFromdb", params);
              setTimeout(() => {
                // this.$router.push({ path: "/" });
                this.$router.go(-1);
              }, 600);
            } else {
              this.issuc = false;
              this.subtitle = "登录失败!用户名或密码错误!";
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>

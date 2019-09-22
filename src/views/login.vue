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
  padding: 10px 100px;
}
.v-btn {
  margin-right: 15px;
}
</style>

<template>
  <v-form :color="$store.state.sidecolor" ref="form" v-model="valid" :lazy-validation="lazy">
    <h2>注册</h2>
    <v-text-field v-model="user.username" :counter="10" :rules="nameRules" label="Name" required></v-text-field>
    <v-text-field v-model="user.email" :rules="emailRules" label="E-mail" required></v-text-field>
    <!-- <v-text-field
      v-model="user.tel"
      :rules="telRules"
      label="tel"
      required
    ></v-text-field>-->
    <v-text-field
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show1 ? 'text' : 'password'"
      v-model="user.pass"
      :rules="passRules"
      hint="At least 8 characters"
      counter
      label="password"
      required
      @click:append="show1 = !show1"
    ></v-text-field>

    <!-- <v-text-field
      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show2 ? 'text' : 'password'"
      @click:append="show2 = !show2"
      v-model="user.checkpass"
      :rules="[passRules.check]"
      label="password"
      required
      @change="checkpassword"
    ></v-text-field>-->
    <p>| 注册表示同意本站的使用规则!</p>
    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
    ></v-checkbox>

    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">提交</v-btn>

    <v-btn color="error" class="mr-4" @click="reset">重置</v-btn>
    <router-link
      class="mr-4 v-btn v-btn--contained theme--light v-size--default"
      tag="button"
      to="/"
    >取消</router-link>
    <router-link
      class="mr-4 v-btn v-btn--contained theme--light v-size--default"
      tag="button"
      to="/signin"
    >已有账号?</router-link>
    <v-alert dense outlined v-show="alertflag" :type="isSuccess[issuc]">
      {{
      subtitle
      }}
    </v-alert>

    <!-- <v-btn color="warning" @click="resetValidation">Reset Validation</v-btn> -->
  </v-form>
</template>

<script>
export default {
  data: () => ({
    show2: false,
    show1: false,
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
      pass: "",
      email: "",
      age: "",
      tel: "",
      creationdate: new Date(),
      delflag: false,
      imgsrc: ""
    },

    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    passRules: [
      v => !!v || "password is required",
      v => (v && v.length > 5) || "password must be more than 5 characters"
    ],

    telRules: [
      v => !!v || "tel is required",
      v => /^1[3456789]\d{9}$/.test(v) || "请输入正确手机号码!"
    ],

    lazy: false,
    checkbox: false
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.$axios
          .post("/login", this.user)
          .then(res => {
            this.alertflag = true;
            this.issuc = true;
            this.subtitle = "注册成功";
            this.$store.state.user = res.data;
            setTimeout(() => {
              // this.$router.push({ path: "/" });
              this.$router.go(-1);
            }, 1000);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    checkpassword(e) {
      // console.log(e);
      if (e != this.pass) {
        // // console.log("两次输入密码不一致!");
        // let r = [v => false || "两次输入密码不一致!"];
        // this.checkPassRules = [...this.checkPassRules, ...r];
        // console.log(this.checkPassRules);
      } else {
        // let r = [v => false || "两次输入密码不一致!"];
        // this.checkPassRules.splice(1, 1);
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

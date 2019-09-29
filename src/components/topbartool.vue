<template>
  <v-toolbar dense flat>
    <v-btn
      v-show="$store.state.overlay || $store.state.carouselflag || showbackflag"
      :color="$store.state.sidecolor"
      text
      rounded
      @click="goBackUp()"
    >
      <v-icon left>mdi-arrow-left</v-icon>Back
    </v-btn>
    <v-text-field
      :color="$store.state.sidecolor"
      hide-details
      prepend-icon="mdi-magnify"
      single-line
      @change="searchpicture"
      v-model="picturename"
      placeholder="图片搜索"
    ></v-text-field>
    <v-switch
      :color="$store.state.sidecolor"
      class="switch-box my-auto"
      flat
      v-model="$store.state.switch1"
      :label="switchtitle[$store.state.switch1]"
    ></v-switch>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" icon>
          <v-icon :color="$store.state.sidecolor" @click="myEnshrine">mdi-heart</v-icon>
        </v-btn>
      </template>
      <span>查看已收藏的图片</span>
    </v-tooltip>
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      showbackflag: false,
      switchtitle: { true: "幻灯片", false: "电影胶片" },
      picturename: ""
    };
  },
  methods: {
    searchpicture(e) {
      let tJson = { title: { $regex: `${e}` } };
      if (!e) {
        this.$store.state.urls = this.$store.state.tempurls;
      } else {
        this.$axios.post("/picture", tJson).then(res => {
          this.$store.state.urls = res.data;
        });
      }
    },

    myEnshrine() {
      if (this.$store.state.user.username) {
        this.showbackflag = true;
        let userid = this.$store.state.user._id; //{badges:["black","blue"]},{"_id":1,badges:1}
        this.$axios.post("/picture", { user_id: userid }).then(res => {
          this.$store.state.urls = res.data;
        });
      } else {
        alert("你还没登录呢");
      }
    },

    goBackUp() {
      this.showbackflag = false;
      this.$store.state.urls = this.$store.state.tempurls;
      this.$store.state.overlay = this.$store.state.carouselflag = false;
    }
  }
};
</script>

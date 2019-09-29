<template>
  <v-card flat>
    <v-toolbar class="mt-4" :color="$store.state.sidecolor" dark flat>
      <div class="flex-grow-1"></div>
      <v-text-field single-line persistent-hint label="文章标题" v-model="articleTitle"></v-text-field>
      <div class="flex-grow-1"></div>
      <v-select
        class="v-select"
        dense
        single-line
        persistent-hint
        :items="items"
        v-model="articletype"
        label="选择文章类型"
      ></v-select>
    </v-toolbar>

    <mavon-editor @save="savedata" v-model="value" />
    <!-- <v-btn text class="mt-12" :color="$store.state.sidecolor" @click="savedata">提交</v-btn> -->
  </v-card>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      value: "",
      items: [
        "python",
        "java",
        "PHP",
        "JavaScript",
        "诗经",
        "古诗词",
        "小说",
        "散文",
        "素描",
        "水彩",
        "油画",
        "插画",
        "纯音乐",
        "古风",
        "流行",
        "photoshop",
        "painter",
        "AfterEfact"
      ],
      articleTitle: "",
      articletype: ""
    };
  },
  computed: {},
  methods: {
    closeBoard() {
      this.$router.push("/");
    },
    formatDate(date) {
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      let second = date.getSeconds();
      second = second < 10 ? "0" + second : second;
      return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
    },

    savedata(e) {
      // console.log(e);
      let date = new Date();

      if (this.content !== "") {
        // this.$store.state.topbarflag = false;
        let data = {
          userId: this.$store.state.user._id,
          username: this.$store.state.user.username,
          avatar: this.$store.state.user.imgsrc,
          articleTitle: this.articleTitle,
          articleComment: e,
          articletype: this.articletype,
          articleTime: this.formatDate(date),
          articleLike: 0,
          articleCollect: 0,
          articleSee: 0,
          articleReply: 0,
          delete: false
        };
        this.$axios
          .post("/blog/insert", data)
          .then(res => {
            this.$store.commit("addArticleItem", res.data.ops[0]);
          })
          .catch(err => {
            // eslint-disable-next-line no-console
            console.log(err);
          });
        this.closeBoard();
        this.articleComment = this.articleName = this.articleTitle = "";
      } else {
        alert("内容不能为空!");
      }
    }
  }
};
</script>

<style scoped>
.v-note-wrapper {
  position: static;
  min-height: 800px;
}
</style>

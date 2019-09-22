<template>
  <v-card class="pa-4" flat light>
    <v-img
      class="white--text"
      height="200px"
      src="https://i.loli.net/2019/09/21/lYfBxjFw1JucHvg.jpg"
    >
      <v-card-title class="align-end fill-height">自在飞花轻似梦</v-card-title>
    </v-img>
    <v-text-field
      @change="searkeywords"
      v-model="keywords"
      hide-details
      single-line
      placeholder="搜搜看"
    ></v-text-field>
    <div class="mt-10">
      <v-card-title class="pa-0 font-weight-black">近期文章</v-card-title>
      <v-divider></v-divider>

      <v-sheet
        tag="li"
        class="font-weight-light ma-1 pa-1 lighten-5"
        @click="showarticlepage(e)"
        :color="getColor(e.articletype)"
        :key="i"
        v-for="(e, i) in $store.state.ArticleData.slice(0, 5)"
      >{{ e.articleTitle }}</v-sheet>
    </div>

    <!-- <div class="mt-8">
      <v-card-title class="pa-0 font-weight-black">近期评论</v-card-title>
      <v-divider></v-divider>
    </div>-->

    <!-- <div class="mt-8">
      <v-card-title class="pa-0 font-weight-black">文章归档</v-card-title>
      <v-divider></v-divider>
      <p>2019年9月</p>
    </div>-->

    <div class="mt-8">
      <v-card-title class="pa-0 font-weight-black">活跃用户</v-card-title>
      <v-divider></v-divider>

      <v-chip
        @click="selectName(e)"
        class="ma-2"
        :key="i"
        v-for="(e, i) in $store.state.userlist"
      >{{ e }}</v-chip>
    </div>

    <div class="mt-8">
      <v-card-title class="pa-0 font-weight-black">文章标签</v-card-title>
      <v-divider></v-divider>

      <v-chip
        class="ma-2"
        dark
        :color="getColor(e)"
        :key="i"
        v-for="(e, i) in $store.state.artype"
        @click="selectType(e)"
      >{{ e }}</v-chip>
    </div>
  </v-card>
</template>

<script>
export default {
  props: { isartpage: Boolean },
  data() {
    return {
      keywords: ""
    };
  },
  methods: {
    showarticlepage(data) {
      if (!this.isartpage) {
        this.$router.push({ name: "articlepage", params: { content: data } });
      } else {
        this.$emit("changedata", data);
      }
    },
    async searkeywords(e) {
      if (!e) {
        let Json = { delete: false };
        this.$store.commit("readDataFormDB", Json);
      } else {
        let Json = {
          $or: [
            { articleTitle: { $regex: `${e}` } },
            { articleComment: { $regex: `${e}` } }
          ],
          delete: false
        };

        this.$store.commit("readDataFormDB", Json);
      }
    },
    selectName(e) {
      this.$router.push("/");
      let Json = {
        data: e,
        type: "username"
      };
      this.$store.commit("selectArticle", Json);
    },
    selectType(e) {
      let Json = {
        data: e,
        type: "articletype"
      };
      this.$store.commit("selectArticle", Json);
    },

    getColor(e) {
      switch (e) {
        case "python":
          return "red";

        case "JavaScript":
          return "pink accent-2";

        case "PHP":
          return "teal";

        case "java":
          return "purple";

        case "诗经":
          return "brown lighten-3";

        case "散文":
          return "cyan lighten-3";

        case "水彩":
          return "light-blue";

        case "古诗词":
          return "orange";

        case "小说":
          return "lime";
        case "素描":
          return "light-green";
        case "油画":
          return "amber";

        case "插画":
          return "blue-grey";

        case "photoshop":
          return "cyan accent-2";

        case "painter":
          return "pink accent-1";

        default:
          return "yellow";
      }
    }
  }
};
</script>

<style></style>

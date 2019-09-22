<style lang="scss"></style>
<template>
  <v-app-bar dense flat color="white">
    <!-- <v-icon
      :color="$store.state.sidecolor"
      @click="$store.state.sideflag = !$store.state.sideflag"
    >mdi-tilde</v-icon>-->
<!-- 
    <v-app-bar-nav-icon
      :color="$store.state.sidecolor"
      @click="$store.state.sideflag = !$store.state.sideflag"
    ></v-app-bar-nav-icon> -->
    <v-toolbar-title class="mx-2" >
      <v-btn :color="$store.state.sidecolor" to="/" icon>
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-toolbar-title>

    <topbartool v-if="this.$router.app._route.fullPath === '/picture'" />

    <v-text-field
    class="d-none d-sm-flex" 
    flat
      single-line
      @change="searkeywords"
      v-else
      :color="$store.state.sidecolor"
      prepend-icon="mdi-magnify"
      v-model="keywords"
      hide-details
  
      placeholder="文章搜索"
    ></v-text-field>

    <div class="flex-grow-1"></div>
    <weather />
    <div class="flex-grow-1"></div>

    <v-toolbar-title>
      <v-btn
        :color="$store.state.sidecolor"
        v-if="$store.state.user.username"
        v-text="$store.state.user.username"
        text
        rounded
        class="my-2"
      ></v-btn>
      <v-btn :color="$store.state.sidecolor" v-else text rounded class="my-2" to="/signin">登录</v-btn>
    </v-toolbar-title>
    <v-divider class="mx-4" inset vertical :color="$store.state.sidecolor"></v-divider>
    <v-avatar size="50px">
      <img v-if="$store.state.user.imgsrc" :src="$store.state.user.imgsrc" alt="avatar" />
      <img v-else src="https://i.loli.net/2019/08/31/QKl2uXoJa653HhC.jpg" alt="avatar" />
    </v-avatar>
    <!-- <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>-->

    <v-menu open-on-hover transition="slide-x-transition" bottom right>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" icon :color="$store.state.sidecolor">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in settingitems"
          :key="index"
          @click="Menufunc(item.func)"
        >
          <v-list-item-title v-html="item.title"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
<script>
import weather from "./weather";
import topbartool from "./topbartool";
export default {
  name: "topBar",
  components: { weather, topbartool },
  data() {
    return {
      keywords: "",
      settingitems: [
        { title: "更改头像", func: 0 },
        {
          title: "更改颜色",
          func: 1
        },
        {
          title: "文档管理",
          func: 2
        },
        {
          title: "写文章",
          func: 3
        },
        { title: "picture", func: 4 }
      ],
      colors: [
        "orange",
        "yellow",
        "purple",
        "blue",
        "teal",
        "red",
        "pink",
        "green"
      ]
    };
  },
  methods: {
    Menufunc(n) {
      if (n === 0) {
        this.searchflag = true;
        this.uploadfileflag = true;
      } else if (n === 1) {
        this.$store.state.sidecolor = this.colors[
          Math.round(Math.random() * 7)
        ];
        // console.log(this.$store.state.sidecolor);
      } else if (n === 2) {
        this.$router.push("/manage");
      } else if (n === 3) {
        if (this.$store.state.user.username) {
          // this.$store.commit("change");
          // this.$store.state.topbarflag = true;
          this.$router.push("/blackboard");
        } else {
          alert("你还没登陆呢?");
        }
      } else if (n === 4) {
        this.$router.push("/picture");
        // console.log(this.$router.app._route.fullPath)
      }
    },
    selectType(e) {
      let Json = {
        articletype: e,
        delete: false,
        count: this.$store.state.count
      };
      this.$store.commit("readDataFormDB", Json);
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
    }
  }
};
</script>

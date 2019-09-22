<style scoped>
.v-enter,
.v-leave-to {
  opacity: 0;

  transform: translateY(-100px);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.6s ease;
}
.v-move {
  transition: all 0.6s ease;
}
.v-leave-active {
  margin: auto;
  left: 0;
  right: 0;
  position: absolute !important;
}
.v-card__text {
  /* overflow: hidden; */
  width: 100%;
}
.v-note-wrapper {
  width: 100%;
  position: static;
  max-height: 200px;
  min-height: auto;
  border: none;
}
</style>

<template>
  <!-- <v-hover flat :open-delay="100" v-slot:default="{ hover }"> -->
  <v-card hover :open-delay="100" flat>
    <v-container>
      <!-- <v-card flat color="#385F73" dark> -->
      <v-card-text>
        <p>
          <v-icon :color="getColor(contentdata.articletype)" small>mdi-account-edit</v-icon>
          {{ contentdata.username ? contentdata.username : "未知用户" }}
          <v-icon :color="getColor(contentdata.articletype)" small>mdi-file</v-icon>
          {{ contentdata.articletype ? contentdata.articletype : "未分类" }}
          <v-icon :color="getColor(contentdata.articletype)" small>mdi-calendar-range</v-icon>
          {{ contentdata.articleTime }}
        </p>
        <div class="headline mb-2" v-html="contentdata.articleTitle"></div>

        <!-- <p
          v-html="
            contentdata.articleComment
              .split('')
              .splice(0, 250)
              .join('')
          "
        ></p>-->
        <mavon-editor
          :boxShadow="false"
          boxShadowStyle="none"
          class="md d-inline-block text-truncate"
          :value="contentdata.articleComment"
          defaultOpen="preview"
          :subfield="false"
          :toolbarsFlag="false"
          :editable="false"
          :scrollStyle="true"
        ></mavon-editor>
      </v-card-text>

      <!-- <v-expand-transition>
        <v-card v-show="show">
          <v-card-text v-html="contentdata.articleComment"></v-card-text>
        </v-card>
      </v-expand-transition>-->

      <v-card-actions flut>
        <v-btn class="mx-1 d-none d-sm-flex" text disabled>&copy;{{ contentdata.articleTime }}</v-btn>
        <!-- <div class="flex-grow-1"></div> -->

        <!-- <v-badge overlap class="mx-5"> -->
        <!-- <template v-slot:badge>{{contentdata.articleLike}}</template> -->
        <v-btn class="mx-3" icon @click="addLike">
          <v-icon small>mdi-heart</v-icon>
          <p>{{ contentdata.articleLike }}</p>
        </v-btn>
        <!-- </v-badge> -->
        <!-- 
          <v-badge overlap class="mx-5">
        <template v-slot:badge>{{contentdata.articleCollect}}</template>-->
        <v-btn class="mx-3" icon @click="addCollect">
          <v-icon small>mdi-star</v-icon>
          <p v-text="contentdata.articleCollect"></p>
        </v-btn>
        <!-- </v-badge> -->

        <!-- <v-badge overlap class="mx-5">
        <template v-slot:badge>{{contentdata.articleReply}}</template>-->
        <v-btn class="mx-3" icon @click="showMessageBoard">
          <v-icon small>mdi-chat-processing</v-icon>
          <p v-text="contentdata.articleReply"></p>
        </v-btn>
        <!-- </v-badge> -->

        <v-btn class="mx-3" icon @click="deleteitem">
          <v-icon small>mdi-delete</v-icon>
        </v-btn>
        <div class="flex-grow-1"></div>

        <v-btn
          :color="getColor(contentdata.articletype)"
          @click="showarticlepage(contentdata)"
          text
        >redmore</v-btn>
      </v-card-actions>
    </v-container>
    <!-- <transition appear> -->
    <messageboard
      :contdata="contentdata"
      :msgContents="msgContents"
      @addReply="addReply"
      class="MsgBoard"
      v-show="msgBoardFlag"
      @appendItem="appendItem"
    />
    <!-- </transition> -->
  </v-card>
  <!-- </v-hover> -->
</template>

<script>
import messageboard from "@/components/MessageBoard";
export default {
  components: { messageboard },
  props: { contentdata: {} },
  data() {
    return {
      msgBoardFlag: false,
      msgContents: []
    };
  },
  methods: {
    showarticlepage(data) {
      this.$router.push({ name: "articlepage", params: { content: data } });
    },
    showMessageBoard() {
      this.msgBoardFlag = !this.msgBoardFlag;
      let Json = {
        articleId: this.contentdata._id
      };
      this.$axios.post("/blog/msgSearch", Json).then(res => {
        this.msgContents = res.data;
      });
    },
    appendItem(e) {
      this.msgContents.unshift(e);
    },

    addReply() {
      this.contentdata.articleReply++;
      let _id = this.contentdata._id;
      let n = this.contentdata.articleReply;
      let Json = { _id, articleReply: n };
      this.$axios.post("/blog/update", Json).then(res => {
        // console.log(res.data);
      });
    },

    addLike() {
      this.contentdata.articleLike++;
      let _id = this.contentdata._id;
      let n = this.contentdata.articleLike;
      let Json = { _id, articleLike: n };
      this.$axios.post("/blog/update", Json).then(res => {
        // console.log(res.data);
      });
    },
    addCollect() {
      this.contentdata.articleCollect++;
      let _id = this.contentdata._id;
      let n = this.contentdata.articleCollect;
      let Json = { _id, articleCollect: n };
      this.$axios.post("/blog/update", Json).then(res => {
        // console.log(res.data);
      });
    },
    deleteitem() {
      if (this.$store.state.user.username) {
        let e = this.contentdata._id;
        this.$store.commit("deleteItem", e);
      } else {
        alert("你还没登录呢");
      }
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

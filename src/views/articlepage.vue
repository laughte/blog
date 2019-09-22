<template>
  <v-row justify="center">
    <v-col lg="8">
      <v-card flat v-if="contdata">
        <v-card-title>{{ contdata.articleTitle }}</v-card-title>
        <!-- <v-card-text v-html="cont.articleComment"></v-card-text> -->
        <mavon-editor
          :value="contdata.articleComment"
          :boxShadow="false"
          boxShadowStyle="none"
          class="md"
          :subfield="false"
          defaultOpen="preview"
          previewBackground="fff"
          :readmodel="true"
          :toolbarsFlag="false"
          :editable="false"
          :scrollStyle="true"
        ></mavon-editor>
        <v-card-actions>
          <v-btn class="mx-5" text disabled>&copy;{{ contdata.articleTime }}</v-btn>
          <!-- <div class="flex-grow-1"></div> -->

          <!-- <v-badge overlap class="mx-5"> -->
          <!-- <template v-slot:badge>{{contdata.articleLike}}</template> -->
          <v-btn class="mx-5" icon @click="addLike">
            <v-icon small>mdi-heart</v-icon>
            <p>{{ contdata.articleLike }}</p>
          </v-btn>
          <!-- </v-badge> -->
          <!-- 
          <v-badge overlap class="mx-5">
          <template v-slot:badge>{{contdata.articleCollect}}</template>-->
          <v-btn class="mx-5" icon @click="addCollect">
            <v-icon small>mdi-star</v-icon>
            <p v-text="contdata.articleCollect"></p>
          </v-btn>
          <!-- </v-badge> -->

          <!-- <v-badge overlap class="mx-5">
          <template v-slot:badge>{{contdata.articleReply}}</template>-->
          <v-btn class="mx-5" icon @click="showMessageBoard">
            <v-icon small>mdi-message-processing</v-icon>
            <p v-text="contdata.articleReply"></p>
          </v-btn>
          <!-- </v-badge> -->

          <v-btn class="mx-5" icon @click="deleteitem">
            <v-icon small>mdi-delete</v-icon>
          </v-btn>
          <div class="flex-grow-1"></div>
        </v-card-actions>

        <transition appear>
          <messageboard
            :contdata="contdata"
            :msgContents="msgContents"
            @addReply="addReply"
            class="MsgBoard"
            v-show="msgBoardFlag"
            @appendItem="appendItem"
          />
        </transition>
      </v-card>
    </v-col>
    <v-col lg="3">
      <v-row class="sidecard" justify="end">
        <v-col class="mr-0 pt-0" lg="10">
          <side :isartpage="artpage" @changedata="changedata" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import side from "../components/side.vue";
import messageboard from "@/components/MessageBoard";
export default {
  components: { side, messageboard },
  data() {
    return {
      artpage: true,
      msgBoardFlag: false,
      contdata: this.$route.params.content,
      msgContents: []
    };
  },
  methods: {
    changedata(e) {
      this.contdata = e;
    },
    showMessageBoard() {
      this.msgBoardFlag = !this.msgBoardFlag;
      let Json = {
        articleId: this.$route.params.content._id
      };
      this.$axios.post("/blog/msgSearch", Json).then(res => {
        this.msgContents = res.data;
      });
    },
    appendItem(e) {
      this.msgContents.unshift(e);
    },

    addReply() {
      this.$route.params.content.articleReply++;
      let _id = this.$route.params.content._id;
      let n = this.$route.params.content.articleReply;
      let Json = { _id, articleReply: n };
      this.$axios.post("/blog/update", Json).then(res => {
        // console.log(res.data);
      });
    },

    addLike() {
      this.$route.params.content.articleLike++;
      let _id = this.$route.params.content._id;
      let n = this.$route.params.content.articleLike;
      let Json = { _id, articleLike: n };
      this.$axios.post("/blog/update", Json).then(res => {
        // console.log(res.data);
      });
    },
    addCollect() {
      this.$route.params.content.articleCollect++;
      let _id = this.$route.params.content._id;
      let n = this.$route.params.content.articleCollect;
      let Json = { _id, articleCollect: n };
      this.$axios.post("/blog/update", Json).then(res => {
        // console.log(res.data);
      });
    },
    deleteitem() {
      if (this.$store.state.user.username) {
        let e = this.$route.params.content._id;
        this.$store.commit("deleteItem", e);
      } else {
        alert("你还没登录呢");
      }
    }
  },
  computed: {
    content: function() {
      return this.$route.params.content;
    }
  },
  watch: {
    content: function(n) {
      this.contdata = n;
    }
  }
};
</script>

<style>
.sidecard {
  position: sticky;
  top: 45px;
}
.v-card__text {
  /* overflow: hidden; */
  width: 100%;
}
.v-note-wrapper {
  width: 100%;
  position: static;
  border: none;
}
</style>

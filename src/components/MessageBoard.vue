<style lang="scss" scoped>
.messageboard {
  width: 100%;
  height: auto;
  background: rgb(250, 250, 250);
  //background: red;

  .msgform {
    width: 90%;
    height: 55px;
    margin: 15px auto;
    display: flex;
    justify-content: center;
    .msguserinfo {
      margin-left: 0;
      width: 65px;
      height: 65px;
      background: whitesmoke;
      // border: 1px solid rgba(255, 166, 0,0.2);
    }
    textarea {
      padding: 9px;
      height: 65px;
      margin-left: 10px;
      width: 90%;
      background: rgb(255, 255, 255);
      // border: 1px solid rgba(255, 166, 0,0.2);
      resize: none;
    }
  }
  hr {
    background-color: rgba(255, 255, 255, 1);
    height: 4px;
    border: none;
  }
  .msgbtn {
    margin: 15px auto;
    width: 90%;
    display: flex;
    justify-content: flex-end;
  }
  .msgcontent {
    height: auto;
    padding: 10px 0px;
    transition: all 0.1s;
  }
}
</style>
<template>
  <div class="messageboard">
    <v-sheet class="lighten-3" tile :color="getColor(contdata.articletype)" dark>
      <v-icon class="ml-2" small color="white">mdi-chat-processing</v-icon>评论
    </v-sheet>
    <div class="msgform">
      <!-- <div class="msguserinfo"> -->
      <v-avatar class="profile" size="60">
        <img :src="$store.state.user.imgsrc" alt />
      </v-avatar>
      <!-- </div> -->
      <textarea placeholder="请输入你想说的话吧 ! 5个字以上哦" v-model="msgcontent"></textarea>
    </div>
    <div class="msgbtn">
      <v-btn :disabled="btnabled" small color="warning" @click="addmsg">评论</v-btn>
    </div>
    <hr />
    <div class="msgcontent">
      <transition-group appear>
        <div :key="e.msg" v-for="(e, i) in msgContents">
          <Leavemsg @delmsg="delmsg(i)" :msg="e" :index="i" />
        </div>
      </transition-group>
    </div>
    <div class="msgfooter"></div>
  </div>
</template>
<script>
import Leavemsg from "./LeaveMsg.vue";
export default {
  components: { Leavemsg },
  props: { contdata: {}, msgContents: Array },
  data() {
    return {
      msgcontent: "",
      btnabled: true
    };
  },
  methods: {
    formatDate(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      var second = date.getSeconds();
      second = second < 10 ? "0" + second : second;
      return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
    },
    addmsg() {
      if (this.$store.state.user.username) {
        let date = new Date();

        let msgitem = {
          articleId: this.contdata._id,
          userId: this.$store.state.user._id,
          avatar: this.$store.state.user.imgsrc,
          username: this.$store.state.user.username,
          time: this.formatDate(date),
          msg: this.msgcontent,
          like: 0
        };
        this.$axios
          .post("/blog/msgInsert", msgitem)
          .then(res => {
            this.$emit("appendItem", res.data.ops[0]);
            this.$emit("addReply");
          })
          .catch(err => {
            console.log(err);
          });

        this.msgcontent = "";
      } else {
        alert("你还没登陆呢");
      }
    },
    delmsg(i) {
      let e = this.msgContents.splice(i, 1)[0];
      this.$axios
        .post("/blog/msgDel", e)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
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
  },
  computed: {
    listcontent() {
      return this.msgcontent.length;
    }
  },
  watch: {
    listcontent: function(n, o) {
      if (n > 4) {
        this.btnabled = false;
      } else {
        this.btnabled = true;
      }
    }
  },
  created() {}
};
</script>

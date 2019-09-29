<style lang="scss">
.leavemsg {
  transition: all 0.1s;
  margin: auto;
  margin-bottom: 4px;
  width: 90%;
  height: auto;
  display: flex;
  justify-content: center;

  //background: red;
  .usericon {
    height: 55px;
    width: 55px;
    background: rgb(190, 55, 55);
  }
  .leavemsgcontent {
    margin-left: 10px;
    width: 90%;
    // height: 80px;
    background: rgb(255, 255, 255);
    p {
      padding: 10px 35px;
      margin: 0;
      font-size: 16px;
      letter-spacing: 1.5px;
      word-spacing: 4px;
    }
    .msgboot {
      padding: 9px 35px;
      display: flex;
      justify-content: space-between;
      p {
        padding: 0;
        font-size: 14px;
      }
    }
  }
}
</style>
<template>
  <v-card flat class="mb-2">
    <v-list-item three-line>
      <v-list-item-avatar size="40">
        <v-img :src="msg.avatar"></v-img>
      </v-list-item-avatar>

      <v-list-item-content class="align-self-start">
        <v-list-item-title class="headline mb-2" v-text="msg.username"></v-list-item-title>

        <v-list-item-subtitle v-text="msg.msg"></v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <v-btn text v-text="msg.time"></v-btn>

      <v-btn class="mx-5" @click="addlike(msg._id)" icon>
        <v-icon small>mdi-thumb-up</v-icon>
        <p v-text="msg.like"></p>
      </v-btn>
      <v-icon small @click="deletemsgitem(index)">mdi-delete</v-icon>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    msg: {},
    index: Number
  },
  data() {
    return {};
  },
  methods: {
    deletemsgitem(i) {
      this.$emit("delmsg", i);
    },
    addlike(id) {
      this.msg.like++;
      let Json = { id, like: this.msg.like };
      this.$axios.post("/blog/msgUpdate", Json).then(res => {
        console.log(res.data);
      });
    }
  }
};
</script>

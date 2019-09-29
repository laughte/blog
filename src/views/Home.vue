<style lang='scss' scoped>
.box {
  min-height: 100%;
}
.sidecard {
  position: sticky;
  top: 45px;
}
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
.cardanimate {
  opacity: 0;
  animation: slide 0.1s; //
  animation-fill-mode: both;
}
@keyframes slide {
  from {
    opacity: 0;
    top: -10px;
  }

  to {
    opacity: 1;
    top: 0px;
  }
}
@for $i from 1 through 35 {
  div.cardanimate:nth-child(#{$i}) {
    animation-delay: ($i * 0.1) + s;
  }
}
</style>
<template>
  <v-row justify="center">
    <v-col class="box" md="8" lg="6">
      <!-- <transition-group apper> -->

      <v-timeline reverse align-top dense>
        <v-timeline-item
          v-for="(item, i) in $store.state.ArticleData.slice((page-1)*7,7*page)"
          :key="i"
          :color="item.color"
          :icon="item.icon"
        >
          <template v-slot:icon>
            <v-avatar>
              <img v-if="item.avatar" :src="item.avatar" />
            </v-avatar>
          </template>
          <template v-slot:opposite>
            <span>Tus eu perfecto</span>
          </template>

          <card class="mb-5 cardanimate" :contentdata="item" :key="i" :id="item._id" />
        </v-timeline-item>
      </v-timeline>

      <!-- </transition-group> -->
      <div class="text-center">
        <a href="#">
          <v-pagination
            circle
            v-model="page"
            :length="Math.ceil($store.state.ArticleData.length/7)"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
          ></v-pagination>
        </a>
      </div>
    </v-col>

    <v-col lg="3" md="4">
      <v-row class="sidecard" justify="end">
        <v-col class="mr-0 pt-0" lg="10">
          <side />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import side from "../components/side";
import card from "../components/card";

export default {
  name: "contentdetails",
  components: { card, side },
  data() {
    return {
      page: 1
    };
  },
  methods: {
    custormAnchor(n) {
      // 找到锚点
      let anchorElement = document.getElementById(n);
      if (anchorElement) {
        let total = anchorElement.offsetTop; //定位锚点
        //开始滚动
        // Chrome
        document.body.scrollTop = total;
        // Firefox
        document.documentElement.scrollTop = total;
        // Safari
        window.pageYOffset = total;
      }
    }
  },
  computed: {
    idcontent: function() {
      return this.$route.params.artid;
    }
  },
  watch: {
    idcontent: function(n) {
      this.custormAnchor(n);
    }
  }
  // methods: {
  //   setcontentdata(e) {
  //     this.contentdata = e;
  //     setTimeout(() => {
  //       this.$refs.contentcard.readMore(750);
  //     }, 10);
  //   }
  // }
};
</script>

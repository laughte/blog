<template>
  <v-app>
    <v-app-bar app dense flat :color="$store.state.sidecolor" v-show="!$store.state.topbarflag">
      <home-top-bar />
    </v-app-bar>

    <!-- <v-navigation-drawer app> -->
    <!-- -->
    <!-- </v-navigation-drawer> -->

    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- <v-container fluid> -->

      <!-- If using vue-router -->
      <transition appear>
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
          <router-view v-else></router-view>
        </keep-alive>
      </transition>
      <!-- </v-container> -->
    </v-content>

    <v-footer absolute app class="darken-2" :color="$store.state.sidecolor">
      <v-card
        flat
        tile
        width="100%"
        :color="$store.state.sidecolor"
        class="indigo white--text text-center darken-2"
      >
        <v-card-text>
          <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">心外无物,闲看庭前花开花落,去留无意,漫漫随天外云卷云舒</v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          &copy; {{ new Date().getFullYear() }} —
          <strong>香亦随风散</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import homeTopBar from "@/components/HomeTopBar.vue";
export default {
  name: "App",
  components: { homeTopBar },
  data() {
    return {
      icons: [
        "mdi-facebook",
        "mdi-twitter",
        "mdi-google-plus",
        "mdi-linkedin",
        "mdi-instagram"
      ]
    };
  },

  beforeCreate() {
    this.$store.commit("readAllDataFormDB", {
      delete: false
    });
  },
  created() {
    this.$store.commit("requestImg", {});
  }
};
</script>
<style>
.v-enter,
.v-leave-to {
  opacity: 0;

  transform: translateX(-100px);
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
</style>

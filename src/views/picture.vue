<template>
  <v-card :loading="loading">
    <v-container class="pa-2" fluid>
      <v-row>
        <v-col :key="src._id" v-for="src in $store.state.urls">
          <v-card flat hover width="200" justify="start">
            <v-img
              @click="switchshow(src)"
              class="white--text"
              width="auto"
              height="280px"
              :src="src.srclist[0]"
              :lazy-src="src.srclist[0]"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
              <v-list-item-subtitle class="align-end">{{
                src.title
              }}</v-list-item-subtitle>
            </v-img>
            <v-card-actions>
              <cardaction :src="src" />
            </v-card-actions>
          </v-card>
        </v-col>
        <v-overlay :value="$store.state.overlay" z-index="3">
          <v-btn icon color="red" @click="$store.state.overlay = false" right>
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-sheet light class="mx-auto" elevation="8" max-width="1920">
            <v-slide-group
              v-model="model"
              class="pa-4"
              center-active
              show-arrows
            >
              <v-slide-item
                v-for="(e, i) in srclists"
                :key="i"
                v-slot:default="{ active, toggle }"
              >
                <v-card
                  :color="active ? 'primary' : 'grey lighten-1'"
                  class="ma-2"
                  height="600"
                  width="400"
                  @click="toggle"
                >
                  <v-img width="auto" height="600px" :src="e">
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="grey lighten-5"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
        </v-overlay>
        <v-overlay :value="$store.state.carouselflag" z-index="4">
          <v-carousel
            hide-delimiters
            height="100%"
            hide-delimiter-background
            show-arrows-on-hover
          >
            <v-carousel-item v-for="(slide, i) in srclists" :key="i">
              <v-btn
                icon
                color="red"
                @click="
                  $store.state.carouselflag = $store.state.topbarflag = false
                "
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-sheet height="100%">
                <v-card>
                  <v-img height="950px" width="auto" :src="slide">
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="gray"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </v-card>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </v-overlay>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import cardaction from "../components/cardaction.vue";
export default {
  components: { cardaction },
  data() {
    return {
      loading: true,

      srclists: [],

      model: null,
      picturename: ""
    };
  },
  methods: {
    requestImg() {
      this.$axios.post(`/picture`, {}).then(res => {
        this.$store.state.urls = this.$store.state.tempurls = res.data;
        this.loading = false;
        // console.log(res.data);
      });
    },
    switchshow(src) {
      this.srclists = src.srclist;
      if (this.$store.state.switch1) {
        this.$store.state.carouselflag = true;
        this.$store.state.topbarflag = true;
      } else {
        this.$store.state.overlay = !this.$store.state.overlay;
      }
    }
  },
  created() {
    this.requestImg();
  }
};
</script>

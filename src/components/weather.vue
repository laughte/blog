<template>
  <v-menu
    :close-on-content-click="false"
    v-if="showweather"
    open-on-hover
    transition="slide-x-transition"
    bottom
    right
  >
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" icon :color="$store.state.sidecolor">
        <v-icon>{{ weatherstate[weathernow.now.cond_code] }}</v-icon>
        <p>{{ weathernow.basic.location }}</p>
        <p>{{ weathernow.now.fl }}°</p>
      </v-btn>
    </template>
    <v-card dark :color="$store.state.sidecolor">
      <v-card-title>
        {{ weathernow.basic.location }}
        <div class="flex-grow-1"></div>

        <v-icon>{{ weatherstate[weathernow.now.cond_code] }}</v-icon>
      </v-card-title>
      <v-text-field
        class="pa-4"
        placeholder="切换城市"
        single-line
        v-model="setlocation"
        @change="reqweather"
      ></v-text-field>
      <v-data-table
        light
        hide-default-header
        hide-default-footer
        :headers="headers"
        :items="weather"
        :items-per-page="12"
        class="elevation-1"
      >
        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2">{{ item.icon }}</v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      showweather: false,
      setlocation: "深圳",
      weather: [],
      weathernow: {},
      weatherstate: {
        "100": "mdi-white-balance-sunny",
        "101": "mdi-weather-cloudy",
        "302": "mdi-weather-lightning-rainy",
        "103": "mdi-weather-partly-cloudy",
        "304": "mdi-weather-hail",
        "307": "mdi-weather-pouring",
        "399": "mdi-weather-rainy",
        "400": "mdi-weather-snowy",
        "204": "mdi-weather-windy-variant"
        // night: "mdi-weather-night"
      },
      settingitems: [
        { title: "更改头像", func: 0 },
        {
          title: "更改颜色",
          func: 1
        },
        {
          title: "显示侧栏",
          func: 2
        },
        {
          title: "写文章",
          func: 3
        }
      ],
      headers: [
        {
          text: "name",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "value", value: "value" },
        { text: "Actions", value: "action", sortable: false }
        // { text: "icon", value: "icon" }
      ]
    };
  },
  methods: {
    reqweather() {
      if (this.setlocation === "") {
        this.setlocation = "深圳";
      }
      this.$axios
        .get(
          `https://free-api.heweather.net/s6/weather/now?location=${this.setlocation}&key=30824b77e0874a5f964ad63b96cd89f5`
        )
        .then(res => {
          this.showweather = "true";
          this.weathernow = res.data.HeWeather6[0];

          this.weather = [
            // { name: "天气状态码", value: this.weathernow.now.cond_code },
            {
              name: "体感温度",
              value: this.weathernow.now.fl,
              icon: "mdi-temperature-celsius"
            },
            {
              name: "温度",
              value: this.weathernow.now.tmp,
              icon: "mdi-temperature-celsius"
            },
            {
              name: "风向360角度",
              value: this.weathernow.now.wind_deg,
              icon: "mdi-weather-windy"
            },
            {
              name: "风向",
              value: this.weathernow.now.wind_dir,
              icon: "mdi-weather-windy-variant"
            },
            {
              name: "风力",
              value: this.weathernow.now.wind_sc,
              icon: "mdi-exponent"
            },
            {
              name: "风速",
              value: this.weathernow.now.wind_spd,
              icon: "mdi-speedometer"
            },
            {
              name: "相对湿度",
              value: this.weathernow.now.hum,
              icon: "mdi-water-percent"
            },
            {
              name: "降水量",
              value: this.weathernow.now.pcpn,
              icon: "mdi-water"
            },
            {
              name: "大气压强",
              value: this.weathernow.now.pres,
              icon: "mdi-weather-tornado"
            }
          ];
          // console.log(res.data.HeWeather6[0]);
        });
    }
  },
  created() {
    this.reqweather();
  }
};
</script>

<style></style>

/** { location: this.weathernow.basic.location }, { cond_txt:
this.weathernow.now.cond_txt }, { cond_code: this.weathernow.now.cond_code }, {
fl: this.weathernow.now.fl }, { tmp: this.weathernow.now.tmp }, { wind_deg:
this.weathernow.now.wind_deg }, { wind_dir: this.weathernow.now.wind_dir }, {
wind_sc: this.weathernow.now.wind_sc }, { wind_spd: this.weathernow.now.wind_spd
}, { hum: this.weathernow.now.hum }, { pcpn: this.weathernow.now.pcpn }, { pres:
this.weathernow.now.pres } */

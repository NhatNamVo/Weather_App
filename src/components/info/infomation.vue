<template>
  <div class="info-container">
    <div class="info-content" v-if="currentWeather">
      <b-row>
        <b-col sm="12">
          <b-row>
            <b-col cols="7">Áp suất</b-col
            ><b-col cols="5">{{ currentWeather.pressure }} hPa</b-col>
          </b-row>
        </b-col>
        <b-col sm="12">
          <b-row>
            <b-col cols="7">Độ ẩm</b-col
            ><b-col cols="5">{{ currentWeather.humidity }} %</b-col>
          </b-row>
        </b-col>
        <b-col sm="12">
          <b-row>
            <b-col cols="7">Mây mù</b-col
            ><b-col cols="5">{{ currentWeather.clouds }} %</b-col>
          </b-row>
        </b-col>
        <b-col sm="12">
          <b-row>
            <b-col cols="7">Chỉ số UV</b-col
            ><b-col cols="5">{{ currentWeather.uvi }}</b-col>
          </b-row>
        </b-col>
        <b-col sm="12">
          <b-row>
            <b-col cols="7">Tầm quan sát</b-col
            ><b-col cols="5">{{ currentWeather.visibility }} m</b-col>
          </b-row>
        </b-col>
        <b-col sm="12">
          <b-row>
            <b-col cols="7">Tốc độ gió</b-col
            ><b-col cols="5">{{ parseFloat(currentWeather.wind_speed).toFixed(1) }} m/s</b-col>
          </b-row>
        </b-col>
        <b-col sm="12" v-if="currentWeather.wind_gust">
          <b-row>
            <b-col cols="7">Gió giật mạnh</b-col
            ><b-col cols="5">{{ parseFloat(currentWeather.wind_gust).toFixed(1) }} m/s</b-col>
          </b-row>
        </b-col>
        <b-col sm="12" v-if="currentWeather.rain">
          <b-row>
            <b-col cols="7">Lượng mưa trung bình</b-col
            ><b-col cols="5">{{ currentWeather.rain['1h']}} mm/h</b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>
    <div>
      <DailyForcast />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DailyForcast from "../daily/daily-forcast.vue";
export default {
  name: "InforComponent",
  components: {
    DailyForcast,
  },
  computed: {
    ...mapGetters(["currentWeather"]),
  },
};
</script>

<style lang="scss" scoped>
@import "./infomation.scss";
</style>
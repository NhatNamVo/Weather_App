<template>
  <div class="info-container" v-if="currentWeather">
    <div class="info-content">
      <div>
        <h4>{{ location }}</h4>
        <TimeComponent />
      </div>
      <div>
        <ForecastIcon
          :dataForecast="currentWeather"
          :size="120"
          :sunRise="currentWeather.sunrise"
          :sunSet="currentWeather.sunset"
        />
      </div>
      <div class="temp">{{ Math.round(currentWeather.temp) }}<sup>o</sup>C</div>
      <div>
        <span>{{ currentWeather.weather[0].description }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import TimeComponent from "../time/time.vue";
import ForecastIcon from "../forecast/forecast-icon.vue";
export default {
  name: "EffectComponent",
  components: {
    TimeComponent,
    ForecastIcon,
  },
  computed: {
    ...mapGetters(["currentWeather", "todayData"]),
    ...mapState(["location"]),
  },
};
</script>

<style lang="scss" scoped>
@import "./effect.scss";
</style>
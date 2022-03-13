<template>
  <div>
      <div>
          <span>{{currentWeather.weather[0].description}}</span>
      </div>
      <div>
          <span>Nhiệt độ: </span><span>{{currentWeather.temp}}<sup>o</sup>C</span>
      </div>
      <div>
            <span>Tốc độ gió:</span><span>{{currentWeather.wind_speed }} m/s</span>
        </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "EffectComponent",
  computed: {
    ...mapGetters(["currentWeather"]),
  },
};
</script>

<style scoped>
</style>
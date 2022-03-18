<template>
  <div id="app">
    <div class="app-container">
      <b-row>
        <b-col cols="12" xl="7">
          <section class="location">
            <LocationSearch />
          </section>
          <section class="effect">
            <EffectComponent />
            <InforComponent />
          </section>
        </b-col>
        <b-col cols="12" xl="5">
          <section class="info">
            <DailyForecast />
          </section>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import EffectComponent from "./components/effect/effect.vue";
import InforComponent from "./components/info/infomation.vue";
import LocationSearch from "./components/location/location-search.vue";
import DailyForecast from "./components/daily/daily-forecast.vue";
export default {
  name: "App",
  components: {
    EffectComponent,
    InforComponent,
    LocationSearch,
    DailyForecast,
  },
  methods: {
    ...mapActions(["fetchWeatherData"]),
  },
  mounted() {
    this.fetchWeatherData();
  },
};
</script>

<style lang="scss">
@import './App.scss';
</style>

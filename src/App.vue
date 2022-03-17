<template>
  <div id="app">
    <section class="location">
      <LocationSearch />
    </section>
    <section class="effect">
      <EffectComponent />
      
      <InforComponent />
    </section>
     <section class="info">
        <DailyForecast />
      </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
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
    DailyForecast
  },
  methods: {
    ...mapActions(['fetchWeatherData'])
  },
  mounted() {
    this.fetchWeatherData();
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // height: 100vh;
  background-color: #000;
  overflow: hidden;
  .effect{
    background-color: #15C0F6;
  }
  .location{
    position: absolute;
    z-index: 5;
    width: 100%;
    top: 20px;
    margin: auto;
  }
  button{
    border: none;
    border-radius: 5px;
  }
}
</style>

<template>
  <div id="app">
    <section class="location">
      <LocationSearch />
    </section>
    <section class="effect">
      <EffectComponent />
      <section class="time">
        <TimeComponent />
      </section>
     
    </section>
     <section class="info">
        <InforComponent />
      </section>
    
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import EffectComponent from "./components/effect/effect.vue";
import InforComponent from "./components/info/infomation.vue";
import LocationSearch from "./components/location/location-search.vue";
import TimeComponent from "./components/time/time.vue";
export default {
  name: "App",
  components: {
    EffectComponent,
    InforComponent,
    LocationSearch,
    TimeComponent,
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
  background-color: #a2cff3;
  overflow: hidden;
  .effect{
    position: relative;
    z-index: 0;
    height: 250px;
    background-color: #9bfffa;
  }
  .time{
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 100%;
    transform: translate(-50%, 50%);
  }
  .location{
    position: absolute;
    z-index: 5;
    width: 100%;
    top: 20px;
    margin: auto;
  }
  .info{
    position: relative;
    z-index: 5;
  }
  button{
    border: none;
    border-radius: 5px;
  }
}
</style>

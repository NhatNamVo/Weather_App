<template>
  <div class="time-container">
    <div class="time-content">
      <p>
        {{ currentTime }}
      </p>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "TimeComponent",

  data() {
    return {
      width: 0,
      setTime: null,
      currentTime: null,
      currentDate: null,
      currentHour: null,
      isOpenCalendar: false,
      currentCalendarPosition: 0,
    };
  },
  methods: {
    ...mapActions(["fetchWeatherData"]),
    ...mapMutations(["setCurrentDay"]),
    activeTime() {
      // render real time
      const time = moment(new Date()).format("HH:mm:ss");
      const hour = new Date().getHours();
      // check hour before and after changed. Each of hour changed, will call api
      if (hour !== this.currentHour) {
        const day = new Date().getDate();
        // check day change. if is new day will be set current day.
        if(day !== this.currentDay) {
          this.setCurrentDay(day);
        }
        this.currentHour = hour;
        this.fetchWeatherData();
      }
      this.currentTime = time;
    },
  },
  computed: {
    ...mapState(['currentDay']),
  },
  created() {
    this.currentTime = moment(new Date()).format("hh:mm:ss");
    this.currentDate = moment(new Date()).format("DD/MM/YYYY");
    this.currentHour = new Date().getHours();
  },
  mounted() {
    this.setTime = setInterval(() => {
      this.activeTime();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.setTime);
  },
};
</script>

<style lang="scss" scoped>
@import "./time.scss";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
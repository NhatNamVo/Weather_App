<template>
  <div class="location-container">
    <b-col cols="6">
      <b-row class="search-content" align-h="start" align-v="center">
        <b-col cols="8">
          <input
            type="text"
            class="location-input"
            placeholder="Nhập tên thành phố"
            v-model="searchInput"
          />
        </b-col>
        <b-col cols="4" @click="handleSearchCity"
          ><button><b-icon icon="search" aria-hidden="true" /></button
        ></b-col>
      </b-row>
    </b-col>

    <b-col cols="6">
      <div class="date-content">
        <div class="date-item">
          {{ currentDate }}
          <span class="calendar-icon" @click="handleShowCalendar"
            ><b-icon icon="calendar2-date" aria-hidden="true"></b-icon
          ></span>
        </div>
      </div>
    </b-col>
    <!-- <div
      @click="handleShowCalendar"
      :style="{ zIndex: !!isOpenCalendar ? 10 : -2 }"
    >
      <transition name="fade">
        <CalendarComponent
          @click.stop="handleChangeDate"
          v-if="!!isOpenCalendar"
          :topPosition="currentCalendarPosition"
          @handleChangeDate="handleChangeDate"
        />
      </transition>
    </div> -->
  </div>
</template>

<script>
// import CalendarComponent from "../calendar/calendar.vue";
import moment from "moment";
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  name: "LocationSearch",
  components: {
    // CalendarComponent,
  },
  data() {
    return {
      currentDate: null,
      isOpenCalendar: false,
      currentCalendarPosition: 0,
      searchInput: "",
    };
  },
  methods: {
    ...mapActions(["fetchLocationSearch"]),
    ...mapMutations(["setCurrentDay"]),
    handleShowCalendar(e) {
      const calendarIcon = e.target.closest("span.calendar-icon");
      const calendarTable = e.target.closest(".calendar-table");
      if (calendarIcon) {
        this.currentCalendarPosition = e.y;
        this.isOpenCalendar = !this.isOpenCalendar;
      } else if (calendarTable) {
        e.stopPropagation();
      } else {
        if (this.isOpenCalendar) this.isOpenCalendar = false;
      }
    },
    handleChangeDate(value) {
      if (value.selectedFormatted.includes("/")) {
        this.currentDate = value.selectedFormatted;
        console.log("handleChangeDate:", value.selectedFormatted);
      }
    },
    handleSearchCity() {
      if (this.searchInput) {
        this.fetchLocationSearch(this.searchInput);
        this.searchInput = "";
      }
    },
  },
  computed: {
    ...mapGetters([
      "todayData",
      "currentWeather",
      "afterTomorowData",
      "tomorowData",
    ]),
  },
  beforeMount() {
    this.currentDate = moment(new Date()).format("DD/MM/YYYY");
    this.setCurrentDay(new Date().getDate());
  },
};
</script>

<style lang="scss" scoped>
@import "./location-search.scss";
</style>
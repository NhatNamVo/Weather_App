import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    apiBase: "https://api.openweathermap.org/data/2.5/",
    apiKey: "f656cec107ebd24fa72e126123df0622",
    currentHour: null,
    currentDay: null,
    lon: 106.6667,
    lat: 10.75,
    location: "Ho chi minh",
    search: "",
    isError: false,
    weatherData: {},
  },
  getters: {
    currentWeather(state) {
      const { current } = state.weatherData;
      return current;
    },
    todayData(state) {
      const data = state.weatherData?.hourly?.filter((time) => {
        const { dt } = time;
        const date = new Date(dt * 1000);
        const day = date.getDate();
        return day === state.currentDay;
      });
      return data;
    },
    tomorowData(state) {
      const tomorow = new Date();
      tomorow.setDate(state.currentDay + 1);
      const data = state.weatherData?.hourly?.filter((time) => {
        const { dt } = time;
        const date = new Date(dt * 1000);
        const day = date.getDate();
        return day === tomorow.getDate();
      });
      return data;
    },
    afterTomorowData(state) {
      const afterTomorow = new Date();
      afterTomorow.setDate(state.currentDay + 2);
      const data = state.weatherData?.hourly?.filter((time) => {
        const { dt } = time;
        const date = new Date(dt * 1000);
        const day = date.getDate();
        return day === afterTomorow.getDate();
      });
      return data;
    },
    currentLocation(state){
      return state.location;
    }

  },
  mutations: {
    ["SET_SEARCH"](state, search) {
      state.search = search.toLowerCase();
      state.location = search.toLowerCase();
    },
    ["SET_LOCATION_DATA"](state, data) {
      if (data?.lon) {
        state.lon = data.lon;
        state.lat = data.lat;
      }
    },
    ["SET_WEATHER_DATA"](state, data) {
      state.weatherData = { ...data };
    },
    ["SET_ERROR"](state, value) {
      state.isError = value;
    },
    setCurrentHour(state, hour) {
      state.currentHour = hour;
    },
    setCurrentDay(state, day) {
      state.currentDay = day;
    },
  },
  actions: {
    async fetchLocationSearch({ commit, dispatch, state }, search) {
      try {
        const querySearch = search.toLowerCase().replaceAll(" ", "+");
        commit("SET_SEARCH", search);
        const response = await axios.get(
          `${state.apiBase}weather?q=${querySearch}&appid=${state.apiKey}`
        );
        const { coord } = response.data;
        commit("SET_LOCATION_DATA", coord);
        commit("SET_ERROR", false);
        await dispatch("fetchWeatherData");
      } catch (error) {
        console.log(error);
        commit("SET_ERROR", true);
        commit("SET_LOCATION_DATA", {});
      }
    },
    async fetchWeatherData({ commit, state }) {
      try {
        const response = await axios.get(
          `${state.apiBase}onecall?lat=${state.lat}&lon=${state.lon}&exclude=daily&lang=vi&units=metric&appid=${state.apiKey}`
        );
        const { current, hourly } = response.data;
        commit("SET_WEATHER_DATA", { current, hourly });
        commit("SET_ERROR", false);
      } catch (error) {
        console.log(error);
        commit("SET_WEATHER_DATA", {});
        commit("SET_ERROR", true);
      }
    },
  },
});

export default store;

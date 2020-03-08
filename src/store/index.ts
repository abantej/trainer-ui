import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    workouts: [
      {
        id: 1,
        title: 'Pull ups',
        completed: false,
        editing: false,
      },
      {
        id: 2,
        title: 'Push ups',
        completed: false,
        editing: false,
      },
      {
        id: 3,
        title: 'Squats',
        completed: false,
        editing: false,
      },
      {
        id: 4,
        title: 'Sit ups',
        completed: false,
        editing: false,
      },
    ],
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});

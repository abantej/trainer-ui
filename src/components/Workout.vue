<template>
  <div class="hello">
    <input type="text" class="workout-input" placeholder="What needs to be done"
           v-model="newWorkout" @keyup.enter="addWorkout">
    <div v-for="workout in workouts" :key="workout.id" class="workout-item">
      {{ workout.title }}
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'Workout',
  props: {
    msg: String,
  },
  data() {
    return {
      newWorkout: '',
      idForWorkout: 3,
      workouts: [
        {
          id: 1,
          title: 'Pull ups',
          completed: false,
        },
        {
          id: 2,
          title: 'Push ups',
          completed: false,
        },
      ],
    };
  },
  methods: {
    addWorkout() {
      this.workouts.push({
        id: this.idForWorkout,
        title: this.newWorkout,
        completed: false,
      });
      this.newWorkout = '';
      this.idForWorkout += 1;
    },
  },
});
</script>

<style lang="scss">
  .workout-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;

    &:focus {
      outline: 0;
    }
  }
</style>

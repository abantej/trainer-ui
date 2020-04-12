<template>
  <div class="hello">
    <input type="text" class="workout-input" placeholder="What needs to be done"
           v-model="newWorkout" @keyup.enter="addWorkout">
    <transition-group name="fade" enter-active-class="animated fadeInUp"
                      leave-active-class="animated fadeOutDown">
    <div v-for="workout in workoutsFiltered" :key="workout.id" class="workout-item">
      <div class="workout-item-left">
        <input type="checkbox" v-model="workout.completed">
        <label>{{ workout.id }}</label>
        <div v-if="!workout.editing"
             @dblclick="editWorkout(workout)"
             class="workout-item-label"
             :class="{ completed : workout.completed }">
          {{ workout.title }}
        </div>
        <input v-else class="workout-item-edit"
               type="text"
               v-model="workout.title"
               @blur="doneEdit(workout)"
               @keyup.enter="doneEdit(workout)"
               @keyup.esc="cancelEdit(workout)"
               v-focus>
      </div>
      <div class="remove-item" @click="removeWorkout(workout)">
        &times;
      </div>
    </div>
    </transition-group>
    <div class="extra-container">
      <div>
        <label>
          <input type="checkbox" :checked="!anyRemaining"
          @change="checkAllWorkouts">
          Check All
        </label>
      </div>
      <div>{{ remaining }} items left</div>
    </div>

    <div class="extra-container">
      <div>
        <button :class="{ active: filter == 'all'}" @click="filter = 'all'">
          All
        </button>
        <button :class="{ active: filter == 'active'}" @click="filter = 'active'">
          Active
        </button>
        <button :class="{ active: filter == 'completed'}" @click="filter = 'completed'">
          Completed
        </button>
      </div>
      <div>
        <transition name="fade">
          <button v-if="showClearCompletedButton" @click="clearCompleted">
            Clear Completed
          </button>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';

const baseUrl = 'http://192.168.99.100:3000/workouts';

export default Vue.extend({
  name: 'Workout',
  props: {
    msg: String,
  },
  data() {
    return {
      newWorkout: '',
      beforeEditCache: '',
      filter: 'all',
      workouts: [],
    };
  },
  async created() {
    const res = await axios.get(baseUrl);
    this.workouts = res.data;
  },
  computed: {
    remaining() {
      return this.workouts.filter((workout) => !workout.completed).length;
    },
    anyRemaining() {
      return this.remaining !== 0;
    },
    workoutsFiltered() {
      if (this.filter === 'active') {
        return this.workouts.filter((workout) => !workout.completed);
      }
      if (this.filter === 'completed') {
        return this.workouts.filter((workout) => workout.completed);
      }
      return this.workouts;
    },
    showClearCompletedButton() {
      return this.workouts.filter((workout) => workout.completed).length > 0;
    },
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
  methods: {
    async addWorkout() {
      if (this.newWorkout.trim().length === 0) {
        return;
      }
      const res = await axios.post(baseUrl, {
        title: this.newWorkout,
        completed: false,
        editing: false,
      });
      this.workouts = [...this.workouts, res.data];
      this.newWorkout = '';
    },
    async editWorkout(pWorkout) {
      const workout = pWorkout;
      this.beforeEditCache = workout.title;
      // eslint-disable-next-line no-param-reassign
      workout.editing = true;
      const res = await axios.put(baseUrl, workout);
      this.workouts = [...this.workouts, res.data];
    },
    async doneEdit(pWorkout) {
      const workout = pWorkout;
      if (workout.title === '') {
        workout.title = this.beforeEditCache;
      }
      workout.editing = false;
      const res = await axios.put(baseUrl, workout);
      this.workouts = [...this.workouts, res.data];
    },
    async cancelEdit(pWorkout) {
      const workout = pWorkout;
      workout.title = this.beforeEditCache;
      workout.editing = false;
      const res = await axios.put(baseUrl, workout);
      this.workouts = [...this.workouts, res.data];
    },
    async removeWorkout(pWorkout) {
      const workout = pWorkout;
      this.workouts = this.workouts.filter((w) => w !== workout);
      const res = await axios.delete(`${baseUrl}/${workout.id}`);
      this.workouts = [...this.workouts, res.data];
    },
    async checkAllWorkouts() {
      // eslint-disable-next-line no-return-assign,no-param-reassign,no-restricted-globals
      this.workouts.forEach((workout) => workout.completed = event.target.checked);
      const res = await axios.put(baseUrl, this.workouts);
      this.workouts = [...this.workouts, res.data];
    },
    async clearCompleted() {
      this.workouts = this.workouts.filter((workout) => !workout.completed);
      const res = await axios.put(baseUrl, this.workouts);
      this.workouts = [...this.workouts, res.data];
    },
  },
});
</script>

<style lang="scss">
  @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css");

  .workout-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;

    &:focus {
      outline: 0;
    }
  }

  .workout-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation-duration: 0.3s;
  }

  .remove-item {
    cursor: pointer;
    margin-left: 14px;
    &:hover {
      color: black;
    }
  }

  .workout-item-left {
    display: flex;
    align-items: center;
  }

  .workout-item-label {
    padding: 5px 5px 5px 0px;
    border: 1px solid white;
    margin-left: 12px;
  }

  .workout-item-edit {
    font-size: 24px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;

    &:focus {
      outline: none;
    }
  }

  .completed {
    text-decoration: line-through;
    color: grey;
  }

  .extra-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid lightgrey;
    padding-top: 14px;
    margin-bottom: 14px;
  }

  button {
    font-size: 14px;
    background-color: white;
    appearance: none;

    &:hover {
      background: lightgreen;
    }

    &:focus {
      outline: none;
    }
  }

  .active {
    background: lightgreen;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>

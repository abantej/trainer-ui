<template>
  <div class="hello">
    <input type="text" class="workout-input" placeholder="What needs to be done"
           v-model="newWorkout" @keyup.enter="addWorkout">
    <transition-group name="fade" enter-active-class="animated fadeInUp"
                      leave-active-class="animated fadeOutDown">
    <div v-for="(workout, index) in workoutsFiltered" :key="workout.id" class="workout-item">
      <div class="workout-item-left">
        <input type="checkbox" v-model="workout.completed">
        <div v-if="!workout.editing"
             @dblclick="editWorkout(index)"
             class="workout-item-label"
             :class="{ completed : workout.completed }">
          {{ workout.title }}
        </div>
        <input v-else class="workout-item-edit"
               type="text"
               v-model="workout.title"
               @blur="doneEdit(index)"
               @keyup.enter="doneEdit(index)"
               @keyup.esc="cancelEdit(index)"
               v-focus>
      </div>
      <div class="remove-item" @click="removeWorkout(index)">
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

export default Vue.extend({
  name: 'Workout',
  props: {
    msg: String,
  },
  data() {
    return {
      newWorkout: '',
      beforeEditCache: '',
      idForWorkout: 3,
      filter: 'all',
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
      ],
    };
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
    addWorkout() {
      if (this.newWorkout.trim().length === 0) {
        return;
      }
      this.workouts.push({
        id: this.idForWorkout,
        title: this.newWorkout,
        completed: false,
      });
      this.newWorkout = '';
      this.idForWorkout += 1;
    },
    editWorkout(index) {
      this.beforeEditCache = this.workouts[index].title;
      this.workouts[index].editing = true;
    },
    doneEdit(index) {
      if (this.workouts[index].title === '') {
        this.workouts[index].title = this.beforeEditCache;
      }
      this.workouts[index].editing = false;
    },
    cancelEdit(index) {
      this.workouts[index].title = this.beforeEditCache;
      this.workouts[index].editing = false;
    },
    removeWorkout(index) {
      this.workouts.splice(index, 1);
    },
    checkAllWorkouts() {
      // eslint-disable-next-line no-return-assign,no-param-reassign,no-restricted-globals
      this.workouts.forEach((workout) => workout.completed = event.target.checked);
    },
    clearCompleted() {
      this.workouts = this.workouts.filter((workout) => !workout.completed);
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
    padding: 18px;
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

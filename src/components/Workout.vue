<template>
  <div class="hello">
    <input type="text" class="workout-input" placeholder="What needs to be done"
           v-model="newWorkout" @keyup.enter="addWorkout">
    <div v-for="(workout, index) in workouts" :key="workout.id" class="workout-item">
      <div class="workout-item-left">
        <div v-if="!workout.editing"
             @dblclick="editWorkout(index)"
             class="workout-item-label">
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
      this.workouts[index].editing = false;
    },
    removeWorkout(index) {
      this.workouts.splice(index, 1);
    },
    cancelEdit(index) {
      this.workouts[index].title = this.beforeEditCache;
      this.workouts[index].editing = false;
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

  .workout-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
</style>

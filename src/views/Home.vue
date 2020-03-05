<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.jpg" style="width: 10%; height: 10%;">
    <Workout msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Workout from '@/components/Workout.vue';

export default {
  name: 'Home',
  components: {
    Workout,
  },
};
</script>

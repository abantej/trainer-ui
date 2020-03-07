<template>
  <div class="home">
    <img alt="Workout logo" src="../assets/logo.jpg" class="logo">
    <workout></workout>
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

<template>
  <main>
    <Calendar v-model="input" />
    <input type="text" v-model="input" @input="changeDay()" />
    <select v-model="select">
      <option value="ru">Русский</option>
      <option value="en">English</option>
      <option value="es">Español</option>
      <option value="fr">Français</option>
    </select>
  </main>
</template>

<script lang="ts" setup>
  import Calendar from '../components/calendar/Calendar.vue';
  import { input, select, changeDay } from '../components/calendar/Calendar';
</script>

<style lang="scss" scoped>
  * {
    margin: 0;
    padding: 0;
  }

  main {
    display: flex;
    justify-content: center;
    align-items: start;
  }

  input {
    margin-left: 10px;
    padding-left: 3px;
  }
</style>
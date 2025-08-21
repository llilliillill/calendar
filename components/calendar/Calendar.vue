<template>
  <div class="calendar">
    <div class="calendar__title">
      <button class="calendar__button" @click="back">◄</button>
      <h2 class="calendar__month">{{ title }} {{ year }}</h2>
      <button class="calendar__button" @click="next">►</button>
    </div>
    <div class="calendar__days-of-week">
      <span v-for="day in daysWeek" :key="day">{{ day }}</span>
    </div>
    <div class="calendar__days">
      <span
        v-for="(day, i) in days" :key="i"
        :class="['calendar__day', { 'calendar__day--active': isActive(day.date) }]"
        @click="selectDay(day.date)"
      >
        {{ day.day }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { 
    year, days, back, next, title, 
    selectDay, daysWeek, isActive
  } from './Calendar';
</script>

<style lang="scss" scoped>
  @use './Calendar.scss';
</style>
<template>
  <q-card flat bordered class="stat-card q-hoverable" v-ripple>
    <div class="accent-bar" :style="{ backgroundColor: color }" />
    <q-card-section class="q-pa-md">
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-caption text-grey-7 text-uppercase text-weight-bold letter-spacing-1">
            {{ title }}
          </div>
          <div class="text-h5 text-weight-bolder q-mt-xs">
            {{ value }}
            <span v-if="suffix" class="text-subtitle2 text-grey-6 text-weight-medium">{{ suffix }}</span>
          </div>
        </div>
        <div class="col-auto">
          <q-avatar :icon="icon" :text-color="color" :style="{ backgroundColor: color + '15' }" size="48px" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  value: string | number;
  icon: string;
  color: string;
  suffix?: string;
}>();
</script>

<style scoped>
.stat-card {
  border-radius: 12px;
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.05);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}
body.body--dark .stat-card {
  background: rgba(30, 41, 59, 0.8);
  border-color: rgba(255, 255, 255, 0.05);
}
.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08) !important;
}
.accent-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
}
.letter-spacing-1 {
  letter-spacing: 1px;
}
</style>

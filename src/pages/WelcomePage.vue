<template>
  <q-page class="flex flex-center q-pa-md">
    <div class="text-center">
      <!-- Iconos agrupados con diseño Mobile First -->
      <div class="column items-center q-mb-xl">
        <div class="row items-center justify-center q-gutter-lg">
          <q-icon name="waving_hand" size="100px" color="primary" class="col-auto" />
          <q-avatar size="100px" class="col-auto shadow-3" style=" border: 2px solid rgba(0,0,0,0.05);">
            <img src="favicon.ico" alt="MisterSofts Logo" style="object-fit: contain; padding: 10px;" />
          </q-avatar>
        </div>
      </div>
      
      <!-- Textos adaptables -->
      <div class="text-h4 text-sm-h3 text-weight-bold text-primary q-mb-md">
        {{ $t('welcome.title') }}
      </div>
      <div class="text-subtitle1 text-sm-h6 text-grey-7">
        {{ $t('welcome.subtitle') }}
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
// Welcome page for users who don't have dashboard access
</script>

<style scoped>
</style>

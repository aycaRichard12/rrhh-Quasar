<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page 
        class="flex flex-center" 
        :class="$q.dark.isActive ? 'bg-dark-page text-white' : 'bg-grey-1 text-dark'"
      >
        <div class="column items-center q-gutter-y-xl text-center q-pa-md transition-fade">
          
          <!-- ─── ILLUSTRATION ─── -->
          <div class="relative-position brand-container">
            <!-- Background Glow -->
            <div 
              class="absolute-center opacity-10 rounded-full glow-effect" 
              :class="$q.dark.isActive ? 'bg-secondary' : 'bg-primary'"
            ></div>
            
            <div class="column items-center no-wrap relative-position">
              <div 
                class="text-weight-bolder error-code" 
                :class="$q.dark.isActive ? 'text-secondary' : 'text-primary'"
              >
                404
              </div>
              <q-icon 
                name="precision_manufacturing" 
                :size="$q.screen.lt.sm ? '80px' : '120px'" 
                :color="$q.dark.isActive ? 'secondary' : 'primary'" 
                class="absolute-center opacity-20 floating-animation"
              />
            </div>
          </div>

          <!-- ─── CONTENT ─── -->
          <div class="column q-gutter-y-sm z-top">
            <div 
              :class="[
                $q.screen.lt.sm ? 'text-h5' : 'text-h4',
                'text-weight-bold',
                $q.dark.isActive ? 'text-white' : 'text-dark'
              ]"
            >
              ¡Oops! Sección fuera de servicio
            </div>
            <div 
              :class="[
                $q.screen.lt.sm ? 'text-body2' : 'text-subtitle1',
                'q-px-md',
                $q.dark.isActive ? 'text-grey-4' : 'text-grey-7'
              ]"
              style="max-width: 480px; line-height: 1.5"
            >
              <template v-if="$q.screen.gt.xs">
                La ruta industrial que estás buscando no existe o ha sido reubicada. 
                Verifica la URL o regresa al centro de gestión.
              </template>
              <template v-else>
                La ruta no existe o fue reubicada. Regresa al centro de gestión.
              </template>
            </div>
          </div>

          <!-- ─── ACTIONS ─── -->
          <div class="row justify-center q-gutter-md q-mt-lg full-width z-top">
            <q-btn
              unelevated
              rounded
              :color="$q.dark.isActive ? 'secondary' : 'primary'"
              icon="keyboard_backspace"
              :label="$q.screen.lt.sm ? 'Dashboard' : 'Volver al Dashboard'"
              no-caps
              to="/dashboard"
              class="q-px-lg q-py-md text-weight-bold shadow-2 home-btn"
              :size="$q.screen.lt.sm ? 'md' : 'lg'"
            />
            
            <!-- <q-btn
              flat
              rounded
              :color="$q.dark.isActive ? 'secondary' : 'primary'"
              icon="support_agent"
              :label="$q.screen.lt.sm ? 'Soporte' : 'Soporte Técnico'"
              no-caps
              class="q-px-lg"
              @click="goToSupport"
            /> -->
          </div>

          <!-- ─── FOOTER ─── -->
          <div class="text-caption opacity-40 q-mt-xl">
              Sistema de Producción Quasar © {{ currentYear }}
          </div>

        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'

const $q = useQuasar()
// const errorId = Math.random().toString(36).substring(7).toUpperCase()
const currentYear = new Date().getFullYear()

// const goToSupport = () => {
//   window.open('https://mistersofts.com', '_blank', 'noopener,noreferrer')
// }
</script>

<style scoped>
.error-code {
  font-size: clamp(6rem, 20vw, 12rem);
  line-height: 1;
  letter-spacing: -4px;
  text-shadow: 4px 4px 0 rgba(0, 0, 0, 0.05);
  font-weight: 900;
}

.glow-effect {
  width: 300px; 
  height: 300px; 
  filter: blur(50px);
}

.brand-container {
  min-height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.floating-animation {
  animation: float 4s ease-in-out infinite;
  pointer-events: none;
}

@keyframes float {
  0% { transform: translate(-50%, -50%) translateY(0px); }
  50% { transform: translate(-50%, -50%) translateY(-20px); }
  100% { transform: translate(-50%, -50%) translateY(0px); }
}

.home-btn {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.home-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.2);
}

.transition-fade {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.rounded-full {
  border-radius: 50%;
}

.opacity-10 {
  opacity: 0.1;
}

.opacity-20 {
  opacity: 0.2;
}

.opacity-40 {
  opacity: 0.4;
}

.z-top {
  z-index: 10;
}
</style>
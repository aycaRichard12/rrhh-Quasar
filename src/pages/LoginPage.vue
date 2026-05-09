<template>
  <q-page class="login-page flex flex-center">
    <div class="row full-width window-height">

      <!-- ─── LEFT: Branding (Oculto en móvil) ─────────────────────────── -->
      <div class="col-12 col-md-6 flex flex-center bg-primary text-white login-left gt-sm">
        <div class="column items-center text-center q-gutter-md login-content">

          <q-icon
            name="precision_manufacturing"
            :size="$q.screen.lt.sm ? '56px' : '72px'"
            class="login-icon-main"
          />

          <div :class="$q.screen.lt.sm ? 'text-h4' : 'text-h3'" class="text-weight-bold">
            PRODUCCIÓN
          </div>

          <div class="text-caption text-uppercase text-weight-medium tracking-wide"
               style="letter-spacing: 0.15em; opacity: 0.75">
            Sistema de Control Empresarial
          </div>

          <div :class="$q.screen.lt.sm ? 'text-body2' : 'text-subtitle1'" class="text-grey-3" style="line-height: 1.6">
            <template v-if="$q.screen.gt.xs">
              Gestión operativa de planta, control de inventarios
              críticos y trazabilidad industrial en tiempo real.
            </template>
            <template v-else>
              Gestión operativa, control de inventarios y trazabilidad industrial.
            </template>
          </div>

          <q-separator dark spaced style="width: 60%" />

          <!-- Módulos del sistema -->
          <div class="row justify-center q-gutter-md q-col-gutter-md">
            <div class="col-auto">
              <div class="column items-center login-module-chip">
                <q-icon name="shopping_cart" :size="$q.screen.lt.sm ? '24px' : '28px'" />
                <div class="text-caption text-weight-medium q-mt-xs">Compras</div>
              </div>
            </div>

            <div class="col-auto">
              <div class="column items-center login-module-chip">
                <q-icon name="factory" :size="$q.screen.lt.sm ? '24px' : '28px'" />
                <div class="text-caption text-weight-medium q-mt-xs">Producción</div>
              </div>
            </div>

            <div class="col-auto">
              <div class="column items-center login-module-chip">
                <q-icon name="insights" :size="$q.screen.lt.sm ? '24px' : '28px'" />
                <div class="text-caption text-weight-medium q-mt-xs">Análisis</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- ─── RIGHT: Formulario ──────────────────────────────────────── -->
      <div class="col-12 col-md-6 flex flex-center q-pa-sm q-pa-md-md login-right">
        <q-card
          flat
          bordered
          :class="$q.screen.lt.sm ? 'q-pa-md' : 'q-pa-lg'"
          class="login-card"
        >

          <q-card-section class="text-center q-pb-sm">
            <q-avatar
              :size="$q.screen.lt.sm ? '50px' : '60px'"
              color="primary"
              text-color="white"
              icon="business"
              class="q-mb-md"
            />

            <div :class="$q.screen.lt.sm ? 'text-h6' : 'text-h5'" class="text-weight-bold">
              Bienvenido
            </div>

            <div class="text-caption text-grey-7 q-mt-xs">
              Ingresa a tu cuenta
            </div>
          </q-card-section>

          <q-card-section>
            <q-form @submit.prevent="handleLogin" class="q-gutter-md">

              <q-input
                v-model="form.usuario"
                outlined
                :dense="$q.screen.lt.md"
                label="Usuario"
                :rules="[val => !!val || 'Requerido']"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>

              <q-input
                v-model="form.password"
                outlined
                :dense="$q.screen.lt.md"
                :type="showPassword ? 'text' : 'password'"
                label="Contraseña"
                :rules="[val => !!val || 'Requerido']"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>

                <template v-slot:append>
                  <q-icon
                    :name="showPassword ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="showPassword = !showPassword"
                  />
                </template>
              </q-input>

              <q-btn
                label="Ingresar al sistema"
                type="submit"
                color="primary"
                class="full-width"
                :size="$q.screen.lt.sm ? 'md' : 'lg'"
                unelevated
                :loading="isLoading"
              />

              <!-- Botón de Instalación PWA (Solo aparece si es realmente instalable) -->
              <transition
                appear
                enter-active-class="animated fadeIn"
                leave-active-class="animated fadeOut"
              >
                <div v-if="pwaStore.isInstallable && !pwaStore.isStandalone" class="text-center q-mt-md">
                  <q-btn
                    label="Instalar Aplicación"
                    icon="get_app"
                    color="primary"
                    outline
                    no-caps
                    rounded
                    class="pwa-install-btn q-px-lg"
                    @click="pwaStore.install"
                  >
                    <q-tooltip class="bg-primary">Disfruta de una mejor experiencia instalando la App</q-tooltip>
                  </q-btn>
                </div>
              </transition>

            </q-form>
          </q-card-section>

          <!-- ─── Acceso Empresa/Admin ─────────────────────────── -->
          <q-card-section class="q-pt-none">
            <q-separator spaced />

            <div class="text-center">
              <div class="text-caption text-grey-6 q-mb-sm">
                ¿Eres administrador?
              </div>

              <q-btn
                flat
                dense
                no-caps
                color="primary"
                icon="admin_panel_settings"
                label="Acceso Empresa / Admin"
                class="full-width admin-access-btn"
                :size="$q.screen.lt.sm ? 'sm' : 'md'"
                @click="goToAdmin"
              />
            </div>
          </q-card-section>

        </q-card>

      </div>

    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth-store'
import { usePwaStore } from 'src/stores/pwa-store'
import { storeToRefs } from 'pinia'

const router = useRouter()
const $q = useQuasar()
const authStore = useAuthStore()
const pwaStore = usePwaStore()
const { loading: isLoading } = storeToRefs(authStore)

const showPassword = ref(false)

const form = reactive({
  usuario: '',
  password: ''
})

const handleLogin = async () => {
  console.log('Login result:', form)
  const result = await authStore.login({
    usuario: form.usuario,
    password: form.password
  })
  console.log('Login result:', result) // Debug: Ver resultado del login

  if (result.success) {
    $q.notify({
      type: 'positive',
      message: `Bienvenido, ${authStore.user?.nombre}`,

    })
    await router.replace('/dashboard')
  } else {
    $q.notify({
      type: 'negative',
      message: 'Fallo de acceso',
      caption: result.message ?? 'Credenciales inválidas',
      position: 'top'
    })
  }
}

const goToAdmin = () => {
  window.open('https://mistersofts.com/app/em/', '_blank')
}
</script>

<style scoped>


/* Left panel - Branding */
.login-left {
  min-height: 100vh;
  background: linear-gradient(135deg, #004d40 0%, #00251a 100%);
  position: relative;
  overflow: hidden;
}

/* Efecto de fondo decorativo mejorado */
.login-left::before {
  content: '';
  position: absolute;
  top: -20%;
  right: -20%;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%);
  filter: blur(80px);
  pointer-events: none;
}

.login-content {
  max-width: 460px;
  width: 90%;
  z-index: 1;
  padding: 2rem;
  animation: slideUp 0.8s ease-out;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Right panel - Formulario */
.login-right {
  min-height: 100vh;
  padding: 1.5rem;
  background-color: #f8fafc;
  transition: background-color 0.3s ease;
}

.body--dark .login-right {
  background-color: #0f172a;
}

.login-card {
  width: 100%;
  max-width: 440px;
  margin: 0 auto;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.body--dark .login-card {
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
}

.login-card:hover {
  transform: translateY(-5px);
}

/* Módulos del panel izquierdo - Glassmorphism */
.login-module-chip {
  padding: 12px 20px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;
  min-width: 90px;
}

.login-module-chip:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

/* PWA Button Polish */
.pwa-install-btn {
  transition: all 0.3s ease;
  border-width: 2px;
}

.pwa-install-btn:hover {
  background: rgba(0, 77, 64, 0.05);
  transform: scale(1.02);
}

.body--dark .pwa-install-btn:hover {
  background: rgba(255, 255, 255, 0.05);
}

/* Botón Admin */
.admin-access-btn {
  border: 1px dashed #cbd5e1;
  border-radius: 12px;
  color: #64748b !important;
  transition: all 0.2s ease;
}

.body--dark .admin-access-btn {
  border-color: #334155;
  color: #94a3b8 !important;
}

.admin-access-btn:hover {
  background: #f1f5f9 !important;
  color: var(--q-primary) !important;
  border-color: var(--q-primary);
}

.body--dark .admin-access-btn:hover {
  background: rgba(255, 255, 255, 0.05) !important;
  color: #5eead4 !important;
  border-color: #5eead4;
}

/* Responsive adjustments */
@media (max-width: 767px) {
  .login-left {
    min-height: auto;
    padding: 2rem 1rem !important;
  }

  .login-left::before {
    display: none;
  }

  .login-right {
    min-height: auto;
  }

  .login-card {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  }

  .login-module-chip {
    padding: 6px 10px;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .login-content {
    max-width: 360px;
  }

  .login-card {
    max-width: 360px;
  }
}

/* Para pantallas muy pequeñas */
@media (max-width: 380px) {
  .login-module-chip {
    min-width: 56px;
    padding: 6px 8px;
  }

  .login-module-chip .q-icon {
    font-size: 20px !important;
  }
}

/* Ajustes para landscape en móviles */
@media (max-width: 767px) and (orientation: landscape) {
  .login-left {
    padding: 1rem !important;
  }

  .login-content {
    max-width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .login-content .column {
    width: 100%;
  }
}
</style>

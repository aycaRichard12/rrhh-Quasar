<template>
  <q-page class="login-page flex flex-center">
    <div class="row full-width window-height">

      <!-- ─── LEFT: Branding (Oculto en móvil) ─────────────────────────── -->
      <div class="col-12 col-md-6 flex flex-center bg-primary text-white login-left gt-sm">
        <div class="column items-center text-center q-gutter-md login-content">

          <q-icon
            name="account_balance"
            size="80px"
            color="accent"
            class="login-icon-main q-mb-md"
          />

          <div :class="$q.screen.lt.sm ? 'text-h4' : 'text-h3'" class="text-weight-bolder" style="letter-spacing: -0.05em">
            GESTIÓN RRHH
          </div>

          <div class="text-caption text-uppercase text-weight-bolder tracking-widest q-mb-lg"
               style="letter-spacing: 0.3em; color: #f2c037">
            ESTRATEGIA ORGANIZACIONAL
          </div>

          <div :class="$q.screen.lt.sm ? 'text-body2' : 'text-subtitle1'" class="text-white opacity-80" style="line-height: 1.8; max-width: 420px;">
            Optimización del capital humano, gestión de talento y desarrollo organizacional de alto impacto.
          </div>

          <q-separator dark spaced="xl" style="width: 40%; background: rgba(255,255,255,0.2)" />

          <!-- Módulos del sistema con diseño elegante -->
          <div class="row justify-center q-gutter-lg">
            <div class="col-auto">
              <div class="column items-center login-module-chip">
                <q-icon name="groups" color="accent" size="32px" />
                <div class="text-caption text-weight-bold q-mt-xs text-white">Talento</div>
              </div>
            </div>

            <div class="col-auto">
              <div class="column items-center login-module-chip">
                <q-icon name="verified_user" color="accent" size="32px" />
                <div class="text-caption text-weight-bold q-mt-xs text-white">Legajos</div>
              </div>
            </div>

            <div class="col-auto">
              <div class="column items-center login-module-chip">
                <q-icon name="trending_up" color="accent" size="32px" />
                <div class="text-caption text-weight-bold q-mt-xs text-white">KPIs</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- ─── RIGHT: Formulario ──────────────────────────────────────── -->
      <div class="col-12 col-md-6 flex flex-center q-pa-md login-right">
        <div class="login-card-container">
          <!-- Línea decorativa oro -->
          <div class="accent-line"></div>

          <q-card flat class="login-card">
            <q-card-section class="text-center q-pt-xl q-pb-lg">
              <div class="avatar-container q-mb-lg">
                <q-avatar
                  size="80px"
                  color="primary"
                  text-color="white"
                  icon="account_circle"
                  class="shadow-10"
                />
              </div>

              <div class="text-h5 text-weight-bolder text-primary" style="letter-spacing: -0.02em">
                Portal de Gestión Humana
              </div>

              <div class="text-body2 text-grey-6 q-mt-sm">
                Ingresa tus credenciales de acceso
              </div>
            </q-card-section>

            <q-card-section class="q-px-xl">
              <q-form @submit.prevent="handleLogin" class="q-gutter-y-lg">

                <q-input
                  v-model="form.usuario"
                  outlined
                  label="Correo electrónico o usuario"
                  bg-color="white"
                  color="primary"
                  :rules="[val => !!val || 'El usuario es obligatorio']"
                >
                  <template v-slot:prepend>
                    <q-icon name="mail" color="primary" />
                  </template>
                </q-input>

                <q-input
                  v-model="form.password"
                  outlined
                  :type="showPassword ? 'text' : 'password'"
                  label="Contraseña"
                  bg-color="white"
                  color="primary"
                  :rules="[val => !!val || 'La contraseña es obligatoria']"
                >
                  <template v-slot:prepend>
                    <q-icon name="lock" color="primary" />
                  </template>

                  <template v-slot:append>
                    <q-icon
                      :name="showPassword ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      color="grey-6"
                      @click="showPassword = !showPassword"
                    />
                  </template>
                </q-input>

                <div class="q-pt-md">
                  <q-btn
                    label="Iniciar Sesión"
                    type="submit"
                    color="primary"
                    class="full-width btn-login"
                    size="lg"
                    unelevated
                    :loading="isLoading"
                  />
                </div>

                <!-- PWA Installation -->
                <transition appear enter-active-class="animated zoomIn">
                  <div v-if="pwaStore.isInstallable && !pwaStore.isStandalone" class="text-center q-mt-md">
                    <q-btn
                      flat
                      no-caps
                      dense
                      color="accent"
                      icon="cloud_download"
                      label="Instalar como App de Escritorio"
                      class="text-weight-bold"
                      @click="pwaStore.install"
                    />
                  </div>
                </transition>

              </q-form>
            </q-card-section>

            <!-- Acceso Admin -->
            <q-card-section class="text-center q-pb-xl">
              <q-separator inset class="q-mb-lg" />
              <div class="text-caption text-grey-6 q-mb-sm">¿Necesitas soporte técnico?</div>
              <q-btn
                flat
                no-caps
                label="Contactar Administración"
                color="primary"
                class="text-weight-bold"
                @click="goToAdmin"
              />
            </q-card-section>
          </q-card>
        </div>
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
  const result = await authStore.login({
    usuario: form.usuario,
    password: form.password
  })

  if (result.success) {
    $q.notify({
      type: 'positive',
      message: `Bienvenido al sistema, ${authStore.user?.nombre}`,
      position: 'top-right'
    })
    await router.replace('/dashboard')
  } else {
    $q.notify({
      type: 'negative',
      message: 'Acceso Denegado',
      caption: result.message ?? 'Verifique sus credenciales',
      position: 'top'
    })
  }
}

const goToAdmin = () => {
  window.open('https://mistersofts.com/app/em/', '_blank')
}
</script>

<style scoped>
.login-left {
  min-height: 100vh;
  background-color: #004d40;
  position: relative;
  overflow: hidden;
}

/* Efectos de fondo profesionales */
.login-left::before {
  content: '';
  position: absolute;
  top: -15%;
  right: -15%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(242, 192, 55, 0.15) 0%, transparent 70%);
  filter: blur(60px);
  animation: morph 20s linear infinite alternate;
}

.login-left::after {
  content: '';
  position: absolute;
  bottom: -10%;
  left: -10%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
  filter: blur(40px);
  animation: morph 15s linear infinite alternate-reverse;
}

@keyframes morph {
  0% { border-radius: 40% 60% 60% 40% / 40% 40% 60% 60%; }
  100% { border-radius: 60% 40% 40% 60% / 60% 60% 40% 40%; }
}

.login-content {
  max-width: 500px;
  z-index: 10;
  padding: 2rem;
}

.login-module-chip {
  padding: 16px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  min-width: 100px;
}

.login-module-chip:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-8px);
  border-color: #f2c037;
}

/* Formulario Estilo Corporativo */
.login-right {
  background-color: #f8fafc;
}

.body--dark .login-right {
  background-color: #1a202c;
}

.login-card-container {
  position: relative;
  width: 100%;
  max-width: 480px;
}

.accent-line {
  height: 6px;
  background: #f2c037;
  width: 80px;
  margin: 0 auto;
  border-radius: 10px 10px 0 0;
  position: relative;
  top: 1px;
  z-index: 10;
}

.login-card {
  border-radius: 24px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08) !important;
  border: 1px solid rgba(0,0,0,0.05);
}

.body--dark .login-card {
  background-color: #2d3748;
  border-color: rgba(255,255,255,0.05);
}

.avatar-container {
  position: relative;
  display: inline-block;
}

.avatar-container::after {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border: 2px dashed #f2c037;
  border-radius: 50%;
  opacity: 0.3;
}

.btn-login {
  height: 56px;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 14px;
  box-shadow: 0 10px 15px -3px rgba(0, 77, 64, 0.3);
}

@media (max-width: 599px) {
  .login-card {
    border-radius: 0;
    box-shadow: none !important;
  }
  .login-card-container {
    max-width: 100%;
  }
}
</style>

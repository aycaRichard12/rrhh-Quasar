<template>
  <q-page class="login-page flex flex-center">
    <div class="row full-width window-height">

      <!-- ─── LEFT: Branding (Oculto en móvil) ─────────────────────────── -->
      <div class="col-12 col-md-6 flex flex-center login-left gt-sm">
        <div class="login-left-bg" />

        <div class="column items-center text-center q-gutter-md login-content">

          <div class="brand-icon-wrapper q-mb-sm">
            <q-icon
              name="account_balance"
              size="64px"
              color="white"
              class="brand-icon"
            />
          </div>

          <div class="text-h3 text-white text-weight-bolder brand-title">
            GESTIÓN RECURSOS HUMANOS
          </div>

          <div class="brand-subtitle q-mb-lg">
            ESTRATEGIA ORGANIZACIONAL
          </div>

          <div class="text-subtitle1 brand-description">
            Optimización del capital humano, gestión de talento y desarrollo
            organizacional de alto impacto.
          </div>

          <q-separator dark spaced="xl" class="brand-separator" />

          <!-- Módulos -->
          <div class="row justify-center q-gutter-lg">
            <div v-for="mod in modules" :key="mod.label" class="col-auto">
              <div class="column items-center login-module-chip">
                <q-icon :name="mod.icon" color="white" size="28px" class="module-icon" />
                <div class="text-caption text-weight-bold q-mt-xs text-white module-label">
                  {{ mod.label }}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- ─── RIGHT: Formulario ──────────────────────────────────────── -->
      <div class="col-12 col-md-6 flex flex-center q-pa-md login-right">
        <div class="login-card-container">

          <q-card flat :class="['login-card', $q.dark.isActive ? 'login-card--dark' : 'login-card--light']">

            <!-- Header con gradiente sutil -->
            <div class="card-header-band" />

            <q-card-section class="text-center q-pt-lg q-pb-md">
              <div class="avatar-ring q-mb-md">
                <q-avatar
                  size="72px"
                  :color="$q.dark.isActive ? 'grey-8' : 'primary'"
                  text-color="white"
                  icon="account_circle"
                />
              </div>

              <div
                :class="['text-h5 text-weight-bolder q-mb-xs', $q.dark.isActive ? 'text-white' : 'text-primary']"
                style="letter-spacing: -0.02em"
              >
                Portal de Gestión Humana
              </div>

              <div :class="['text-body2', $q.dark.isActive ? 'text-grey-4' : 'text-grey-6']">
                Ingresa tus credenciales de acceso
              </div>
            </q-card-section>

            <q-card-section class="q-px-xl q-pt-sm">
              <q-form @submit="handleLogin" class="q-gutter-y-md">

                <!-- Usuario -->
                <q-input
                  v-model="form.usuario"
                  outlined
                  label="Correo electrónico o usuario"
                  :bg-color="inputBg"
                  :label-color="$q.dark.isActive ? 'grey-4' : 'grey-7'"
                  :color="$q.dark.isActive ? 'amber-4' : 'primary'"
                  :input-style="{ color: $q.dark.isActive ? '#f0f0f0' : 'inherit' }"
                  :rules="[val => !!val || 'El usuario es obligatorio']"
                  class="input-field"
                >
                  <template v-slot:prepend>
                    <q-icon name="mail" :color="$q.dark.isActive ? 'amber-4' : 'primary'" />
                  </template>
                </q-input>

                <!-- Contraseña -->
                <q-input
                  v-model="form.password"
                  outlined
                  :type="showPassword ? 'text' : 'password'"
                  label="Contraseña"
                  :bg-color="inputBg"
                  :label-color="$q.dark.isActive ? 'grey-4' : 'grey-7'"
                  :color="$q.dark.isActive ? 'amber-4' : 'primary'"
                  :input-style="{ color: $q.dark.isActive ? '#f0f0f0' : 'inherit' }"
                  :rules="[val => !!val || 'La contraseña es obligatoria']"
                  class="input-field"
                >
                  <template v-slot:prepend>
                    <q-icon name="lock" :color="$q.dark.isActive ? 'amber-4' : 'primary'" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="showPassword ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      :color="$q.dark.isActive ? 'grey-4' : 'grey-6'"
                      @click="showPassword = !showPassword"
                    />
                  </template>
                </q-input>

                <!-- Botón Login -->
                <div class="q-pt-sm">
                  <q-btn
                    label="Iniciar Sesión"
                    type="submit"
                    :color="$q.dark.isActive ? 'amber-7' : 'primary'"
                    :text-color="$q.dark.isActive ? 'grey-10' : 'white'"
                    class="full-width btn-login"
                    size="lg"
                    unelevated
                    :loading="isLoading"
                  />
                </div>

                <!-- PWA -->
                <transition appear enter-active-class="animated zoomIn">
                  <div v-if="pwaStore.isInstallable && !pwaStore.isStandalone" class="text-center q-mt-sm">
                    <q-btn
                      flat
                      no-caps
                      dense
                      :color="$q.dark.isActive ? 'amber-4' : 'accent'"
                      icon="cloud_download"
                      label="Instalar como App de Escritorio"
                      class="text-weight-bold"
                      @click="pwaStore.install"
                    />
                  </div>
                </transition>

              </q-form>
            </q-card-section>

            <!-- Footer -->
            <q-card-section class="text-center q-pb-lg q-pt-sm">
              <q-separator :dark="$q.dark.isActive" inset class="q-mb-md" />
              <div :class="['text-caption q-mb-xs', $q.dark.isActive ? 'text-grey-5' : 'text-grey-6']">
                ¿Necesitas soporte técnico?
              </div>
              <q-btn
                flat
                no-caps
                label="Contactar Administración"
                :color="$q.dark.isActive ? 'amber-4' : 'primary'"
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
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth-store'
import { usePwaStore } from 'src/stores/pwa-store'
import { storeToRefs } from 'pinia'

const router   = useRouter()
const $q       = useQuasar()
const authStore = useAuthStore()
const pwaStore  = usePwaStore()
const { loading: isLoading } = storeToRefs(authStore)

const showPassword = ref(false)

const form = reactive({ usuario: '', password: '' })

// ── Computed helpers ──────────────────────────────────────────────────────────
/** Fondo del input que se adapta al modo oscuro */
const inputBg = computed(() => $q.dark.isActive ? 'grey-9' : 'white')

const modules = [
  { icon: 'groups',        label: 'Talento'  },
  { icon: 'verified_user', label: 'Legajos'  },
  { icon: 'trending_up',   label: 'KPIs'     },
]

// ── Handlers ──────────────────────────────────────────────────────────────────
const handleLogin = async () => {
  const result = await authStore.login({
    usuario:  form.usuario,
    password: form.password,
  })

  if (result.success) {
    $q.notify({
      type: 'positive',
      message: `Bienvenido al sistema, ${authStore.user?.nombre}`,
      position: 'top-right',
    })
    await router.replace('/dashboard')
  } else {
    $q.notify({
      type: 'negative',
      message: 'Acceso Denegado',
      caption: result.message ?? 'Verifique sus credenciales',
      position: 'top',
    })
  }
}

const goToAdmin = () => {
  window.open('https://mistersofts.com/app/em/', '_blank')
}
</script>

<style scoped>
/* ── LEFT PANEL ──────────────────────────────────────────────────────────── */
.login-left {
  min-height: 100vh;
  background: linear-gradient(145deg, #004d40 0%, #00352b 60%, #001f19 100%);
  position: relative;
  overflow: hidden;
}

/* Fondo animado con blobs de luz */
.login-left-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.login-left-bg::before {
  content: '';
  position: absolute;
  top: -10%;
  right: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(242, 192, 55, 0.18) 0%, transparent 70%);
  filter: blur(70px);
  animation: blobMove 18s ease-in-out infinite alternate;
}
.login-left-bg::after {
  content: '';
  position: absolute;
  bottom: -10%;
  left: -10%;
  width: 380px;
  height: 380px;
  background: radial-gradient(circle, rgba(0, 188, 212, 0.1) 0%, transparent 70%);
  filter: blur(50px);
  animation: blobMove 14s ease-in-out infinite alternate-reverse;
}

@keyframes blobMove {
  0%   { transform: translate(0, 0) scale(1); }
  50%  { transform: translate(30px, -20px) scale(1.1); }
  100% { transform: translate(-20px, 30px) scale(0.95); }
}

.login-content {
  max-width: 480px;
  z-index: 10;
  padding: 2.5rem;
}

/* Ícono con anillo dorado */
.brand-icon-wrapper {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  border: 1.5px solid rgba(242, 192, 55, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 32px rgba(242, 192, 55, 0.15);
  transition: box-shadow 0.3s;
}
.brand-icon-wrapper:hover {
  box-shadow: 0 0 48px rgba(242, 192, 55, 0.3);
}

.brand-title {
  font-size: 2.4rem;
  letter-spacing: -0.04em;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.4);
}

.brand-subtitle {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: #f2c037;
}

.brand-description {
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.8;
  max-width: 380px;
}

.brand-separator {
  width: 36%;
  background: rgba(255, 255, 255, 0.15);
}

/* Chips de módulos */
.login-module-chip {
  padding: 14px 18px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  min-width: 90px;
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: default;
}
.login-module-chip:hover {
  background: rgba(242, 192, 55, 0.12);
  border-color: rgba(242, 192, 55, 0.5);
  transform: translateY(-6px);
}
.module-icon {
  opacity: 0.85;
}
.module-label {
  opacity: 0.85;
  font-size: 0.72rem;
  letter-spacing: 0.05em;
}

/* ── RIGHT PANEL ─────────────────────────────────────────────────────────── */
.login-right {
  background-color: #f0f4f8;
  transition: background-color 0.3s;
}
.body--dark .login-right {
  background-color: #111827;
}

.login-card-container {
  position: relative;
  width: 100%;
  max-width: 460px;
}

/* Barra de acento dorada superior */
.card-header-band {
  height: 4px;
  background: linear-gradient(90deg, #f2c037 0%, #ffda6a 50%, #f2c037 100%);
  border-radius: 24px 24px 0 0;
}

/* Tarjeta modo claro */
.login-card {
  border-radius: 0 0 24px 24px;
  overflow: hidden;
  transition: background-color 0.3s, box-shadow 0.3s;
}
.login-card--light {
  background-color: #ffffff;
  box-shadow: 0 20px 60px -12px rgba(0, 77, 64, 0.14),
              0 4px 16px -4px rgba(0, 0, 0, 0.06) !important;
  border: 1px solid rgba(0, 0, 0, 0.06);
}
/* Tarjeta modo oscuro */
.login-card--dark {
  background-color: #1f2937;
  box-shadow: 0 20px 60px -12px rgba(0, 0, 0, 0.5),
              0 4px 16px -4px rgba(0, 0, 0, 0.3) !important;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

/* Avatar con anillo punteado */
.avatar-ring {
  position: relative;
  display: inline-block;
}
.avatar-ring::after {
  content: '';
  position: absolute;
  top: -8px; left: -8px; right: -8px; bottom: -8px;
  border: 2px dashed #f2c037;
  border-radius: 50%;
  opacity: 0.35;
  animation: rotateDash 20s linear infinite;
}
@keyframes rotateDash {
  to { transform: rotate(360deg); }
}

/* Inputs */
.input-field {
  transition: all 0.2s;
}

/* Botón de login */
.btn-login {
  height: 52px;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 14px;
  letter-spacing: 0.03em;
  transition: transform 0.15s, box-shadow 0.15s;
}
.btn-login:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px -6px rgba(0, 77, 64, 0.35) !important;
}
.body--dark .btn-login:hover:not(:disabled) {
  box-shadow: 0 12px 24px -6px rgba(242, 192, 55, 0.4) !important;
}

/* Responsive */
@media (max-width: 599px) {
  .login-card {
    border-radius: 0;
    box-shadow: none !important;
  }
  .card-header-band {
    border-radius: 0;
  }
  .login-card-container {
    max-width: 100%;
  }
}
</style>

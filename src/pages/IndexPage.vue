<template>
  <q-page class="">
    <!-- Header -->
<!-- Header -->
<!-- Header -->
<div class="row items-center justify-between q-mb-md">

  <!-- Título con icono -->
  <div class="row items-center no-wrap">
    <q-avatar size="40px" color="primary" text-color="white" class="q-mr-sm">
      <q-icon name="dashboard" />
    </q-avatar>

    <div>
      <div class="text-h6 text-weight-bold text-primary">
        {{ $t('dashboard.title') }}
      </div>
      <div class="text-caption text-grey-7">
        {{ $t('dashboard.subtitle') }}
      </div>
    </div>
  </div>

  <!-- Filtros -->
  <div class="row items-center q-gutter-sm">
    <q-input
      v-model="fechaInicio"
      type="date"
      dense
      outlined
      :label="$t('dashboard.filters.from')"
    />

    <q-input
      v-model="fechaFin"
      type="date"
      dense
      outlined
      :label="$t('dashboard.filters.to')"
    />

    <q-btn
      color="primary"
      :label="$t('dashboard.filters.apply')"
      icon="check"
      no-caps
      @click="aplicarFiltros"
    />
  </div>

</div>
    <!-- Charts Section 1 -->
    <div class="row q-col-gutter-lg q-mb-lg">
      <!-- Tendencia Mensual de Producción -->
      <div class="col-12 col-md-8">
        <q-card flat bordered class="chart-card full-height">
          <q-card-section>
            <div class="text-subtitle1 text-weight-bold text-primary-dark">{{ $t('dashboard.charts.monthlyTrend') }}</div>
            <div class="text-caption text-grey-6 q-mb-md">{{ $t('dashboard.charts.monthlyTrendDesc') }}</div>
            <apexchart type="area" height="320" :options="monthlyTrendOptions" :series="monthlyTrendSeries" />
          </q-card-section>
        </q-card>
      </div>
       <!-- Índice de Aprobación de Calidad -->
      <div class="col-12 col-md-4">
        <q-card flat bordered class="chart-card full-height">
          <q-card-section>
            <div class="text-subtitle1 text-weight-bold text-primary-dark">{{ $t('dashboard.charts.qualityPassRate') }}</div>
            <div class="text-caption text-grey-6 q-mb-md">{{ $t('dashboard.charts.qualityPassRateDesc') }}</div>
            <div class="flex flex-center" style="height: 320px;">
              <apexchart type="donut" width="100%" height="320" :options="qualityPassRateOptions" :series="qualityPassRateSeries" />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Charts Section 2 -->
    <div class="row q-col-gutter-lg q-mb-lg">
      <!-- Costos por Categoría -->
      <div class="col-12 col-md-8">
        <q-card flat bordered class="chart-card full-height">
          <q-card-section>
            <div class="text-subtitle1 text-weight-bold text-primary-dark">{{ $t('dashboard.charts.costsByCategory') }}</div>
            <div class="text-caption text-grey-6 q-mb-md">{{ $t('dashboard.charts.costsByCategoryDesc') }}</div>
            <apexchart type="bar" height="320" :options="costsByCategoryOptions" :series="costsByCategorySeries" />
          </q-card-section>
        </q-card>
      </div>
 

          <!-- Eficiencia Operativa -->
      <div class="col-12 col-md-4">
        <q-card flat bordered class="chart-card full-height">
          <q-card-section>
            <div class="text-subtitle1 text-weight-bold text-primary-dark">{{ $t('dashboard.charts.efficiency') }}</div>
            <div class="text-caption text-grey-6 q-mb-md">{{ $t('dashboard.charts.efficiencyDesc') }}</div>
            <div class="flex flex-center" style="height: 320px;">
              <apexchart type="radialBar" height="350" :options="efficiencyOptions" :series="efficiencySeries" />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Charts Section 3 -->
    <div class="row q-col-gutter-lg">
      <!-- Top Productos -->
      <div class="col-12 col-md-6">
        <q-card flat bordered class="chart-card full-height">
          <q-card-section>
            <div class="text-subtitle1 text-weight-bold text-primary-dark">{{ $t('dashboard.charts.topProducts') }}</div>
            <div class="text-caption text-grey-6 q-mb-md">{{ $t('dashboard.charts.topProductsDesc') }}</div>
            <apexchart type="bar" height="320" :options="topProductsOptions" :series="topProductsSeries" />
          </q-card-section>
        </q-card>
      </div>
      <!-- Estado de Órdenes -->
      <div class="col-12 col-md-6">
        <q-card flat bordered class="chart-card full-height">
          <q-card-section>
            <div class="text-subtitle1 text-weight-bold text-primary-dark">{{ $t('dashboard.charts.orderStatus') }}</div>
            <div class="text-caption text-grey-6 q-mb-md">{{ $t('dashboard.charts.orderStatusDesc') }}</div>
            <div class="flex flex-center" style="height: 320px;">
              <apexchart type="pie" width="100%" height="320" :options="orderStatusOptions" :series="orderStatusSeries" />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';

const $q = useQuasar();
const { t } = useI18n();

const fechaInicio = ref('');
const fechaFin = ref('');

onMounted(() => {
  const today = new Date();
  fechaFin.value = today.toISOString().substring(0, 10);
  
  const pastDate = new Date(today);
  pastDate.setFullYear(today.getFullYear() - 3);
  fechaInicio.value = pastDate.toISOString().substring(0, 10);
});

const aplicarFiltros = () => {
  console.log('Aplicar filtros:', fechaInicio.value, fechaFin.value);
  // Aquí se llamaría a la API con los nuevos parámetros de fecha
};

// --- Configuración Global de Gráficos Adaptativa (Modo Claro / Oscuro) ---
const fontFamily = "'Inter', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif";
const primaryColor = '#008374';
const colors = ['#008374', '#31ccec', '#f2c037', '#21ba45', '#c10015', '#9c27b0'];

const commonOptions = computed(() => ({
  chart: {
    fontFamily: fontFamily,
    toolbar: { show: false },
    animations: { enabled: true, easing: 'easeinout', speed: 800 },
    background: 'transparent'
  },
  theme: {
    mode: $q.dark.isActive ? 'dark' : 'light'
  },
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth' as const, width: 2 },
  colors: colors,
  grid: {
    borderColor: $q.dark.isActive ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
    strokeDashArray: 4,
  }
}));

// 1. Tendencia Mensual (Area)
const monthlyTrendSeries = computed(() => [
  { name: t('dashboard.chartLabels.production'), data: [310, 400, 280, 510, 420, 1090, 1000] }
]);
const monthlyTrendOptions = computed(() => ({
  ...commonOptions.value,
  xaxis: { categories: [t('dashboard.chartLabels.months.jan'), t('dashboard.chartLabels.months.feb'), t('dashboard.chartLabels.months.mar'), t('dashboard.chartLabels.months.apr'), t('dashboard.chartLabels.months.may'), t('dashboard.chartLabels.months.jun'), t('dashboard.chartLabels.months.jul')] },
  fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.1, stops: [0, 90, 100] } }
}));

// 2. Eficiencia (Radial Bar)
const efficiencySeries = ref([85]);
const efficiencyOptions = computed(() => ({
  ...commonOptions.value,
  plotOptions: {
    radialBar: {
      hollow: { size: '70%' },
      track: { background: $q.dark.isActive ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' },
      dataLabels: {
        value: { fontSize: '30px', show: true, formatter: (val: number) => val + '%', color: $q.dark.isActive ? '#fff' : '#000' }
      }
    }
  },
  labels: [t('dashboard.chartLabels.efficiency')],
  colors: [primaryColor]
}));

// 3. Costos por Categoría (Bar)
const costsByCategorySeries = computed(() => [{ name: t('dashboard.chartLabels.cost'), data: [12000, 8000, 5000, 3000, 1500] }]);
const costsByCategoryOptions = computed(() => ({
  ...commonOptions.value,
  plotOptions: { bar: { borderRadius: 4, columnWidth: '50%' } },
  xaxis: { categories: [t('dashboard.chartLabels.categories.rawMaterial'), t('dashboard.chartLabels.categories.labor'), t('dashboard.chartLabels.categories.packaging'), t('dashboard.chartLabels.categories.energy'), t('dashboard.chartLabels.categories.others')] },
  dataLabels: { 
    enabled: true,
    formatter: function (val: number) { return 'Bs. ' + val.toFixed(2); },
    style: { colors: [$q.dark.isActive ? '#fff' : '#000'] }
  },
  tooltip: {
    y: { formatter: function (val: number) { return 'Bs. ' + val.toFixed(2); } }
  },
  colors: ['#31ccec']
}));

// 4. Aprobación de Calidad (Donut)
const qualityPassRateSeries = ref([94.5, 5.5]);
const qualityPassRateOptions = computed(() => ({
  ...commonOptions.value,
  labels: [t('dashboard.chartLabels.approved'), t('dashboard.chartLabels.rejected')],
  colors: ['#21ba45', '#c10015'],
  stroke: { width: 0 },
  plotOptions: { pie: { donut: { size: '65%' } } }
}));

// 5. Top Productos (Barra Horizontal)
const topProductsSeries = computed(() => [{ name: t('dashboard.chartLabels.units'), data: [540, 470, 448, 430, 400] }]);
const topProductsOptions = computed(() => ({
  ...commonOptions.value,
  plotOptions: { bar: { horizontal: true, borderRadius: 4 } },
  xaxis: { categories: [t('dashboard.chartLabels.products.prodE'), t('dashboard.chartLabels.products.prodD'), t('dashboard.chartLabels.products.prodC'), t('dashboard.chartLabels.products.prodB'), t('dashboard.chartLabels.products.prodA')] },
  colors: [primaryColor]
}));

// 6. Estado de Órdenes (Pie)
const orderStatusSeries = ref([40, 30, 30]);
const orderStatusOptions = computed(() => ({
  ...commonOptions.value,
  labels: [t('dashboard.chartLabels.inProcess'), t('dashboard.chartLabels.pending'), t('dashboard.chartLabels.completed')],
  colors: ['#31ccec', '#f2c037', '#21ba45'],
  stroke: { width: 0 }
}));

</script>

<style scoped>


.text-primary-dark {
  color: #1e293b;
}
body.body--dark .text-primary-dark {
  color: #f8fafc;
}

/* Modificaciones al contenedor de filtros para modo oscuro */
body.body--dark .filter-container {
  background-color: #1e293b !important;
  border: 1px solid rgba(255,255,255,0.05);
}

.chart-card {
  border-radius: 12px;
  background: white;
  border: 1px solid rgba(0,0,0,0.05);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
}
body.body--dark .chart-card {
  background: #1e293b;
  border-color: rgba(255,255,255,0.05);
}
.chart-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
body.body--dark .chart-card:hover {
  box-shadow: 0 10px 15px -3px rgba(255, 255, 255, 0.1), 0 4px 6px -2px rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.2);
}
</style>

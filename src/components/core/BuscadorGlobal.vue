<template>
  <q-input dense outlined
    :model-value="modelValue"
    @update:model-value="actualizarValor"
    class="componente-buscador"
    :placeholder="$t('common.actions.search')"
  >
   	<template v-slot:prepend>
   		<q-icon
				name="search"
			/>
   	</template>
   	
		<template v-slot:append>
   		<q-icon
   			v-if="modelValue !== ''"
   			name="close"
   			class="cursor-pointer"
   			@click="limpiarBusqueda"
   		/>
   	</template>
  </q-input>
</template>
 
<script setup lang="ts">

defineProps<{
	modelValue: string;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', valor: string): void;
}>();

const actualizarValor = (valor: string | number | null): void => {
	emits('update:modelValue', String(valor || ''));
};

const limpiarBusqueda = (): void => {
	emits('update:modelValue', '');
};
</script>